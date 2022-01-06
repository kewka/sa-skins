// @ts-nocheck
import * as ChunkType from './chunks';

var GeometryFlag = {
  rwTRISTRIP: 0x00000001,
  rwPOSITIONS: 0x00000002,
  rwTEXTURED: 0x00000004,
  rwPRELIT: 0x00000008,
  rwNORMALS: 0x00000010,
  rwLIGHT: 0x00000020,
  rwMODULATE_MATERIAL_COLOR: 0x00000040,
  rwTEXTURED2: 0x00000080,
  rwNATIVE: 0x01000000,
  rwNATIVE_INSTANCE: 0x02000000,
  rwFLAGS_MASK: 0x000000ff,
  rwNATIVE_FLAGS_MASK: 0x0f000000,
};

function DFFReader() {}

DFFReader.prototype = {
  constructor: DFFReader.prototype,

  parse: function (arraybuffer) {
    this.data = new DataView(arraybuffer);
    this.position = 0;

    while (this.position < arraybuffer.byteLength) {
      var clump = this.readChunk(ChunkType.CHUNK_CLUMP);
      if (clump) return clump;
    }

    return null;
  },

  readHeader: function (parent) {
    var header = {};
    var position = this.position;

    header.type = this.readUInt32();
    header.name = this.getChunkName(header.type);
    header.length = this.readUInt32();
    header.build = this.readUInt32();
    header.version;

    if (header.build & 0xffff0000)
      header.version =
        ((header.build >> 14) & 0x3ff00) |
        ((header.build >> 16) & 0x3f) |
        0x30000;
    else header.version = header.build << 8;

    if (parent !== undefined) header.parent = parent;

    return header;
  },

  getChunkName: function (type) {
    for (var i in ChunkType) {
      if (ChunkType[i] == type) return i;
    }
    return 'CHUNK_UNKNOWN';
  },

  readInt32: function () {
    var v = this.data.getInt32(this.position, true);
    this.position += 4;
    return v;
  },

  readUInt32: function () {
    var v = this.data.getUint32(this.position, true);
    this.position += 4;
    return v;
  },

  readUInt16: function () {
    var v = this.data.getUint16(this.position, true);
    this.position += 2;
    return v;
  },

  readUInt8: function () {
    var v = this.data.getUint8(this.position, true);
    this.position += 1;
    return v;
  },

  readFloat32: function () {
    var v = this.data.getFloat32(this.position, true);
    this.position += 4;
    return v;
  },

  readString: function (length) {
    var v = '';
    var val = -1;
    var end = this.position + length;

    while (this.position < end) {
      var val = this.data.getUint8(this.position++, true);
      if (val == 0) {
        this.position = end;
        break;
      }
      v += String.fromCharCode(val);
    }

    return v.trim();
  },

  readChunk: function (type, parent) {
    var position = this.position;
    var header = this.readHeader(parent);

    if (type != header.type) {
      if (type != ChunkType.CHUNK_CLUMP)
        console.error(
          'DFFLoader: Chunk "' +
            this.getChunkName(type) +
            '" not found at position ' +
            position
        );
      this.position += header.length;
      return null;
    }

    position = this.position;
    var chunk = this.readData(header);

    if (this.position < position + header.length) {
      console.warn('DFFLoader: Chunk ' + header.name + ' not readed to end');
      this.position = position + header.length;
    } else if (this.position > position + header.length) {
      throw (
        'DFFLoader: Offset is outside the bounds of the chunk ' + header.name
      );
    }
    return chunk;
  },

  readData: function (chunkHeader) {
    var data = null;
    switch (chunkHeader.type) {
      case ChunkType.CHUNK_CLUMP:
        var header = this.readHeader();
        var numAtomics = this.readUInt32();
        var numLights = 0;
        var numCameras = 0;

        if (header.length == 0xc) {
          numLights = this.readUInt32();
          numCameras = this.readUInt32();
        }

        data = {};
        data.RWFrameList = this.readChunk(ChunkType.CHUNK_FRAMELIST);
        data.RWGeometryList = this.readChunk(ChunkType.CHUNK_GEOMETRYLIST);

        data.RWAtomicList = new Array(numAtomics);
        for (var i = 0; i < numAtomics; i++) {
          data.RWAtomicList[i] = this.readChunk(ChunkType.CHUNK_ATOMIC);
        }

        this.readExtension(data);
        break;
      case ChunkType.CHUNK_FRAMELIST:
        var header = this.readHeader();
        var numFrames = this.readUInt32();

        data = new Array(numFrames);
        for (var i = 0; i < numFrames; i++) {
          var frame = {};

          frame.rotationMatrix = [
            this.readFloat32(),
            this.readFloat32(),
            this.readFloat32(),
            this.readFloat32(),
            this.readFloat32(),
            this.readFloat32(),
            this.readFloat32(),
            this.readFloat32(),
            this.readFloat32(),
          ];

          frame.position = [
            this.readFloat32(),
            this.readFloat32(),
            this.readFloat32(),
          ];

          frame.parentIndex = this.readInt32();
          frame.flags = this.readUInt32();

          data[i] = { RWFrame: frame };
        }

        for (var i = 0; i < numFrames; i++) {
          this.readExtension(data[i]);
        }
        break;
      case ChunkType.CHUNK_GEOMETRYLIST:
        var header = this.readHeader();
        var numGeometries = this.readUInt32();
        data = new Array(numGeometries);
        for (var i = 0; i < numGeometries; i++) {
          data[i] = this.readChunk(ChunkType.CHUNK_GEOMETRY);
        }
        break;
      case ChunkType.CHUNK_GEOMETRY:
        var header = this.readHeader();

        data = {};
        data.format = this.readUInt32();
        data.numTriangles = this.readUInt32();
        data.numVertices = this.readUInt32();
        data.numMorphTargets = this.readUInt32();

        var numUVs = (data.format & 0x000ff000) >> 16;
        if (data.format & GeometryFlag.rwTEXTURED) numUVs = 1;

        if (header.version < 0x34000) {
          data.ambient = this.readFloat32();
          data.specular = this.readFloat32();
          data.diffuse = this.readFloat32();
        }

        if ((data.format & GeometryFlag.rwNATIVE) == 0) {
          if (data.format & GeometryFlag.rwPRELIT) {
            data.prelitcolor = new Array(data.numVertices);
            for (var i = 0; i < data.numVertices; i++) {
              data.prelitcolor[i] = {
                r: this.readUInt8(),
                g: this.readUInt8(),
                b: this.readUInt8(),
                a: this.readUInt8(),
              };
            }
          }

          if (
            data.format &
            (GeometryFlag.rwTEXTURED | GeometryFlag.rwTEXTURED2)
          ) {
            data.texCoords = new Array(numUVs);
            for (var i = 0; i < numUVs; i++) {
              data.texCoords[i] = new Array(data.numVertices);
              for (var j = 0; j < data.numVertices; j++) {
                data.texCoords[i][j] = {
                  u: this.readFloat32(),
                  v: this.readFloat32(),
                };
              }
            }
          }

          // faces
          data.triangles = new Array(data.numTriangles);
          for (var i = 0; i < data.numTriangles; i++) {
            data.triangles[i] = {
              vertex2: this.readUInt16(),
              vertex1: this.readUInt16(),
              materialId: this.readUInt16(),
              vertex3: this.readUInt16(),
            };
          }
        }

        data.morphTargets = new Array(data.numMorphTargets);
        for (var i = 0; i < data.numMorphTargets; i++) {
          data.morphTargets[i] = {
            boundingSphere: {
              x: this.readFloat32(),
              y: this.readFloat32(),
              z: this.readFloat32(),
              radius: this.readFloat32(),
            },
            hasVertices: this.readUInt32(),
            hasNormals: this.readUInt32(),
          };

          if (data.morphTargets[i].hasVertices) {
            data.morphTargets[i].vertices = new Array(data.numVertices);
            for (var j = 0; j < data.numVertices; j++) {
              data.morphTargets[i].vertices[j] = {
                x: this.readFloat32(),
                y: this.readFloat32(),
                z: this.readFloat32(),
              };
            }
          }

          if (data.morphTargets[i].hasNormals) {
            data.morphTargets[i].normals = new Array(data.numVertices);
            for (var j = 0; j < data.numVertices; j++) {
              data.morphTargets[i].normals[j] = {
                x: this.readFloat32(),
                y: this.readFloat32(),
                z: this.readFloat32(),
              };
            }
          }
        }

        data.RWMaterialList = this.readChunk(ChunkType.CHUNK_MATLIST);
        this.readExtension(data);
        break;
      case ChunkType.CHUNK_MATLIST:
        var header = this.readHeader();
        var numMaterials = this.readUInt32();
        data = new Array(numMaterials);

        for (var i = 0; i < numMaterials; i++) {
          data[i] = {
            id: this.readUInt32(),
          };
        }
        for (var i = 0; i < numMaterials; i++) {
          data[i].RWMaterial = this.readChunk(ChunkType.CHUNK_MATERIAL);
        }
        break;
      case ChunkType.CHUNK_MATERIAL:
        var header = this.readHeader();
        data = {};
        data.flags = this.readUInt32();
        data.color = {
          r: this.readUInt8(),
          g: this.readUInt8(),
          b: this.readUInt8(),
          a: this.readUInt8(),
        };
        this.readUInt32(); // unused
        data.isTextured = this.readUInt32();
        if (header.version > 0x30400) {
          data.ambient = this.readFloat32();
          data.specular = this.readFloat32();
          data.diffuse = this.readFloat32();
        }

        if (data.isTextured)
          data.RWTexture = this.readChunk(ChunkType.CHUNK_TEXTURE);

        this.readExtension(data);
        break;
      case ChunkType.CHUNK_TEXTURE:
        var header = this.readHeader();
        data = {};
        data.filterFlags = this.readUInt16();
        this.readUInt16(); // unused
        data.name = this.readChunk(ChunkType.CHUNK_STRING);
        data.maskName = this.readChunk(ChunkType.CHUNK_STRING);
        this.readExtension(data);
        break;
      case ChunkType.CHUNK_STRING:
        data = this.readString(chunkHeader.length);
        break;
      case ChunkType.CHUNK_ATOMIC:
        var header = this.readHeader();
        data = {};
        data.frameIndex = this.readUInt32();
        data.geometryIndex = this.readUInt32();
        data.flags = this.readUInt32();
        this.readUInt32(); // unused
        this.readExtension(data);
        break;
      case ChunkType.CHUNK_EXTENSION:
        data = {};
        var chunkEnd = this.position + chunkHeader.length;
        while (this.position < chunkEnd) {
          var header = this.readHeader();
          var extension = {};
          var position = this.position;
          switch (header.type) {
            case ChunkType.CHUNK_HANIM:
              extension.hAnimVersion = this.readUInt32();
              extension.nodeId = this.readUInt32();
              extension.numNodes = this.readUInt32();
              if (extension.numNodes) {
                extension.flags = this.readUInt32();
                extension.keyFrameSize = this.readUInt32();
                extension.nodes = new Array(extension.numNodes);
                for (var i = 0; i < extension.numNodes; i++) {
                  extension.nodes[i] = {
                    nodeId: this.readUInt32(),
                    nodeIndex: this.readUInt32(),
                    flags: this.readUInt32(),
                  };
                }
              }
              break;
            case ChunkType.CHUNK_FRAME:
              extension = this.readString(header.length);
              break;
            case ChunkType.CHUNK_BINMESH:
              extension.faceType = this.readUInt32(); // index ?
              var numSplits = this.readUInt32();
              extension.numIndices = this.readUInt32();
              extension.splits = new Array(numSplits);
              var hasData = header.length > 12 + numSplits * 8;
              for (var i = 0; i < numSplits; i++) {
                var numIndices = this.readUInt32();
                extension.splits[i] = {};
                extension.splits[i].matIndex = this.readUInt32();
                if (hasData) {
                  extension.splits[i].indices = new Array(numIndices);
                  for (var j = 0; j < numIndices; j++)
                    extension.splits[i].indices[j] = this.readUInt32();
                }
              }
              break;
            case ChunkType.CHUNK_SKIN:
              extension.numBones = this.readUInt8();
              extension.numUsedBones = this.readUInt8(); // specialIndexCount
              extension.maxWeightsPerVertex = this.readUInt8();
              extension.padding = this.readUInt8(); // unused
              extension.bonesUsed = new Array(extension.numUsedBones); //specialIndices
              for (var i = 0; i < extension.numUsedBones; i++) {
                extension.bonesUsed[i] = this.readUInt8();
              }
              extension.vertexBoneIndices = new Array(
                chunkHeader.parent.numVertices
              );
              for (var i = 0; i < chunkHeader.parent.numVertices; i++) {
                extension.vertexBoneIndices[i] = {
                  x: this.readUInt8(),
                  y: this.readUInt8(),
                  z: this.readUInt8(),
                  w: this.readUInt8(),
                };
              }
              extension.vertexBoneWeights = new Array(
                chunkHeader.parent.numVertices
              );
              for (var i = 0; i < chunkHeader.parent.numVertices; i++) {
                extension.vertexBoneWeights[i] = {
                  x: this.readFloat32(),
                  y: this.readFloat32(),
                  z: this.readFloat32(),
                  w: this.readFloat32(),
                };
              }
              extension.skinToBoneMatrix = new Array(extension.numBones);
              for (var i = 0; i < extension.numBones; i++) {
                if (extension.numUsedBones == 0)
                  // todo - and version < 3.7.0.0
                  this.position += 4; // skip 0xDEADDEAD
                extension.skinToBoneMatrix[i] = new Array(16);
                for (var j = 0; j < 16; j++) {
                  extension.skinToBoneMatrix[i] = this.readFloat32();
                }
              }

              // skip some zeroes
              if (extension.numUsedBones != 0) this.position += 0x0c;

              break;
            case ChunkType.CHUNK_MESHEXTENSION:
              var magicNumber = this.readUInt32();
              if (magicNumber == 0) break;
              throw 'DFFLoader: Not implemented';
            default:
              this.position += header.length;
              console.warn('DFFLoader: Skipped ' + header.name + ' extension');
              break;
          }

          if (this.position < position + header.length)
            console.warn(
              'DFFLoader: Extension ' + header.name + ' not readed to end'
            );

          if (data[header.name])
            console.error('DFFLoader: Rewrite of extension ' + header.name);

          data[header.name] = extension;
        }
        break;
      default:
        throw 'DFFLoader: Not implemented';
    }

    return data;
  },

  readExtension: function (chunk) {
    chunk.RWExtension = this.readChunk(ChunkType.CHUNK_EXTENSION, chunk);
  },
};

export default DFFReader;
