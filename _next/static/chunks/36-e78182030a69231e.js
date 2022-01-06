"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[36],{3036:function(t,e,r){r.d(e,{rL:function(){return ve}});var n={};r.r(n),r.d(n,{CHUNK_2DFX:function(){return gt},CHUNK_ADCPLG:function(){return vt},CHUNK_ALTPIPE:function(){return tt},CHUNK_ANIMANIMATION:function(){return B},CHUNK_ANIMDATABASE:function(){return L},CHUNK_ATOMIC:function(){return S},CHUNK_ATOMICSECT:function(){return b},CHUNK_BINMESH:function(){return wt},CHUNK_CAMERA:function(){return I},CHUNK_CHUNKGROUPEND:function(){return it},CHUNK_CHUNKGROUPSTART:function(){return nt},CHUNK_CLUMP:function(){return _},CHUNK_COLLISIONMODEL:function(){return Nt},CHUNK_COLLTREE:function(){return st},CHUNK_COREPLUGINIDMAX:function(){return ut},CHUNK_CROWD:function(){return G},CHUNK_ENVIRONMENT:function(){return ot},CHUNK_EXTENSION:function(){return C},CHUNK_FRAME:function(){return Et},CHUNK_FRAMELIST:function(){return H},CHUNK_GEOMETRY:function(){return R},CHUNK_GEOMETRYLIST:function(){return j},CHUNK_HANIM:function(){return lt},CHUNK_HANIMANIMATION:function(){return z},CHUNK_IMAGE:function(){return W},CHUNK_LIGHT:function(){return K},CHUNK_MATERIAL:function(){return A},CHUNK_MATERIALEFFECTS:function(){return pt},CHUNK_MATLIST:function(){return N},CHUNK_MATRIX:function(){return k},CHUNK_MESHEXTENSION:function(){return Tt},CHUNK_MORPH:function(){return ht},CHUNK_MTEFFECTDICT:function(){return Z},CHUNK_MTEFFECTNATIVE:function(){return Y},CHUNK_NAOBJECT:function(){return w},CHUNK_NATIVEDATA:function(){return yt},CHUNK_NIGHTVERTEXCOLOR:function(){return At},CHUNK_PARTICLES:function(){return ft},CHUNK_PATCHMESH:function(){return rt},CHUNK_PDSPLG:function(){return mt},CHUNK_PIPEDS:function(){return et},CHUNK_PIPELINESET:function(){return Ct},CHUNK_PITEXDICTIONARY:function(){return q},CHUNK_PLANESECT:function(){return T},CHUNK_PRTSTDGLOBALDATA:function(){return Q},CHUNK_REFLECTIONMAT:function(){return bt},CHUNK_RIGHTTORENDER:function(){return X},CHUNK_SKIN:function(){return dt},CHUNK_SKINANIMATION:function(){return D},CHUNK_SKYMIPMAP:function(){return ct},CHUNK_SPECULARMAT:function(){return It},CHUNK_SPLINE:function(){return F},CHUNK_STRING:function(){return x},CHUNK_STRUCT:function(){return y},CHUNK_TEAM:function(){return V},CHUNK_TEAMDICTIONARY:function(){return $},CHUNK_TEXDICTIONARY:function(){return P},CHUNK_TEXTURE:function(){return g},CHUNK_TEXTURENATIVE:function(){return O},CHUNK_TOC:function(){return J},CHUNK_UNICODESTRING:function(){return M},CHUNK_UVANIMDICT:function(){return at},CHUNK_UVANIMPLG:function(){return Ut},CHUNK_VERTEXFORMAT:function(){return xt},CHUNK_WORLD:function(){return E}});var i=r(5893),a=r(2212),s=r(9365),o=r(7294),u=r(6242),h=r(3946),c=r(6447),d=r(5861),f=r(1023),l=r(3619),p=r(8520),m=r.n(p),v=r(7011),U=r(6023),w=0,y=1,x=2,C=3,I=5,g=6,A=7,N=8,b=9,T=10,E=11,F=12,k=13,H=14,R=15,_=16,K=18,M=19,S=20,O=21,P=22,L=23,W=24,D=25,j=26,B=27,z=27,V=28,G=29,X=31,Y=32,Z=33,$=34,q=35,J=36,Q=37,tt=38,et=39,rt=40,nt=41,it=42,at=43,st=44,ot=45,ut=46,ht=261,ct=272,dt=278,ft=280,lt=286,pt=288,mt=305,vt=308,Ut=309,wt=1294,yt=1296,xt=1296,Ct=39056115,It=39056118,gt=39056120,At=39056121,Nt=39056122,bt=39056124,Tt=39056125,Et=39056126,Ft=4,kt=8,Ht=128,Rt=16777216;function _t(){}_t.prototype={constructor:_t.prototype,parse:function(t){for(this.data=new DataView(t),this.position=0;this.position<t.byteLength;){var e=this.readChunk(_);if(e)return e}return null},readHeader:function(t){var e={};this.position;return e.type=this.readUInt32(),e.name=this.getChunkName(e.type),e.length=this.readUInt32(),e.build=this.readUInt32(),e.version,4294901760&e.build?e.version=e.build>>14&261888|e.build>>16&63|196608:e.version=e.build<<8,void 0!==t&&(e.parent=t),e},getChunkName:function(t){for(var e in n)if(n[e]==t)return e;return"CHUNK_UNKNOWN"},readInt32:function(){var t=this.data.getInt32(this.position,!0);return this.position+=4,t},readUInt32:function(){var t=this.data.getUint32(this.position,!0);return this.position+=4,t},readUInt16:function(){var t=this.data.getUint16(this.position,!0);return this.position+=2,t},readUInt8:function(){var t=this.data.getUint8(this.position,!0);return this.position+=1,t},readFloat32:function(){var t=this.data.getFloat32(this.position,!0);return this.position+=4,t},readString:function(t){for(var e="",r=-1,n=this.position+t;this.position<n;){if(0==(r=this.data.getUint8(this.position++,!0))){this.position=n;break}e+=String.fromCharCode(r)}return e.trim()},readChunk:function(t,e){var r=this.position,n=this.readHeader(e);if(t!=n.type)return t!=_&&console.error('DFFLoader: Chunk "'+this.getChunkName(t)+'" not found at position '+r),this.position+=n.length,null;r=this.position;var i=this.readData(n);if(this.position<r+n.length)console.warn("DFFLoader: Chunk "+n.name+" not readed to end"),this.position=r+n.length;else if(this.position>r+n.length)throw"DFFLoader: Offset is outside the bounds of the chunk "+n.name;return i},readData:function(t){var e=null;switch(t.type){case _:var r=this.readHeader(),n=this.readUInt32();12==r.length&&(this.readUInt32(),this.readUInt32()),(e={}).RWFrameList=this.readChunk(H),e.RWGeometryList=this.readChunk(j),e.RWAtomicList=new Array(n);for(var i=0;i<n;i++)e.RWAtomicList[i]=this.readChunk(S);this.readExtension(e);break;case H:r=this.readHeader();var a=this.readUInt32();e=new Array(a);for(i=0;i<a;i++){var s={};s.rotationMatrix=[this.readFloat32(),this.readFloat32(),this.readFloat32(),this.readFloat32(),this.readFloat32(),this.readFloat32(),this.readFloat32(),this.readFloat32(),this.readFloat32()],s.position=[this.readFloat32(),this.readFloat32(),this.readFloat32()],s.parentIndex=this.readInt32(),s.flags=this.readUInt32(),e[i]={RWFrame:s}}for(i=0;i<a;i++)this.readExtension(e[i]);break;case j:r=this.readHeader();var o=this.readUInt32();e=new Array(o);for(i=0;i<o;i++)e[i]=this.readChunk(R);break;case R:r=this.readHeader();(e={}).format=this.readUInt32(),e.numTriangles=this.readUInt32(),e.numVertices=this.readUInt32(),e.numMorphTargets=this.readUInt32();var u=(1044480&e.format)>>16;if(e.format&Ft&&(u=1),r.version<212992&&(e.ambient=this.readFloat32(),e.specular=this.readFloat32(),e.diffuse=this.readFloat32()),0==(e.format&Rt)){if(e.format&kt){e.prelitcolor=new Array(e.numVertices);for(i=0;i<e.numVertices;i++)e.prelitcolor[i]={r:this.readUInt8(),g:this.readUInt8(),b:this.readUInt8(),a:this.readUInt8()}}if(e.format&(Ft|Ht)){e.texCoords=new Array(u);for(i=0;i<u;i++){e.texCoords[i]=new Array(e.numVertices);for(var h=0;h<e.numVertices;h++)e.texCoords[i][h]={u:this.readFloat32(),v:this.readFloat32()}}}e.triangles=new Array(e.numTriangles);for(i=0;i<e.numTriangles;i++)e.triangles[i]={vertex2:this.readUInt16(),vertex1:this.readUInt16(),materialId:this.readUInt16(),vertex3:this.readUInt16()}}e.morphTargets=new Array(e.numMorphTargets);for(i=0;i<e.numMorphTargets;i++){if(e.morphTargets[i]={boundingSphere:{x:this.readFloat32(),y:this.readFloat32(),z:this.readFloat32(),radius:this.readFloat32()},hasVertices:this.readUInt32(),hasNormals:this.readUInt32()},e.morphTargets[i].hasVertices){e.morphTargets[i].vertices=new Array(e.numVertices);for(h=0;h<e.numVertices;h++)e.morphTargets[i].vertices[h]={x:this.readFloat32(),y:this.readFloat32(),z:this.readFloat32()}}if(e.morphTargets[i].hasNormals){e.morphTargets[i].normals=new Array(e.numVertices);for(h=0;h<e.numVertices;h++)e.morphTargets[i].normals[h]={x:this.readFloat32(),y:this.readFloat32(),z:this.readFloat32()}}}e.RWMaterialList=this.readChunk(N),this.readExtension(e);break;case N:r=this.readHeader();var c=this.readUInt32();e=new Array(c);for(i=0;i<c;i++)e[i]={id:this.readUInt32()};for(i=0;i<c;i++)e[i].RWMaterial=this.readChunk(A);break;case A:r=this.readHeader();(e={}).flags=this.readUInt32(),e.color={r:this.readUInt8(),g:this.readUInt8(),b:this.readUInt8(),a:this.readUInt8()},this.readUInt32(),e.isTextured=this.readUInt32(),r.version>197632&&(e.ambient=this.readFloat32(),e.specular=this.readFloat32(),e.diffuse=this.readFloat32()),e.isTextured&&(e.RWTexture=this.readChunk(g)),this.readExtension(e);break;case g:r=this.readHeader();(e={}).filterFlags=this.readUInt16(),this.readUInt16(),e.name=this.readChunk(x),e.maskName=this.readChunk(x),this.readExtension(e);break;case x:e=this.readString(t.length);break;case S:r=this.readHeader();(e={}).frameIndex=this.readUInt32(),e.geometryIndex=this.readUInt32(),e.flags=this.readUInt32(),this.readUInt32(),this.readExtension(e);break;case C:e={};for(var d=this.position+t.length;this.position<d;){r=this.readHeader();var f={},l=this.position;switch(r.type){case lt:if(f.hAnimVersion=this.readUInt32(),f.nodeId=this.readUInt32(),f.numNodes=this.readUInt32(),f.numNodes){f.flags=this.readUInt32(),f.keyFrameSize=this.readUInt32(),f.nodes=new Array(f.numNodes);for(i=0;i<f.numNodes;i++)f.nodes[i]={nodeId:this.readUInt32(),nodeIndex:this.readUInt32(),flags:this.readUInt32()}}break;case Et:f=this.readString(r.length);break;case wt:f.faceType=this.readUInt32();var p=this.readUInt32();f.numIndices=this.readUInt32(),f.splits=new Array(p);var m=r.length>12+8*p;for(i=0;i<p;i++){var v=this.readUInt32();if(f.splits[i]={},f.splits[i].matIndex=this.readUInt32(),m){f.splits[i].indices=new Array(v);for(h=0;h<v;h++)f.splits[i].indices[h]=this.readUInt32()}}break;case dt:f.numBones=this.readUInt8(),f.numUsedBones=this.readUInt8(),f.maxWeightsPerVertex=this.readUInt8(),f.padding=this.readUInt8(),f.bonesUsed=new Array(f.numUsedBones);for(i=0;i<f.numUsedBones;i++)f.bonesUsed[i]=this.readUInt8();f.vertexBoneIndices=new Array(t.parent.numVertices);for(i=0;i<t.parent.numVertices;i++)f.vertexBoneIndices[i]={x:this.readUInt8(),y:this.readUInt8(),z:this.readUInt8(),w:this.readUInt8()};f.vertexBoneWeights=new Array(t.parent.numVertices);for(i=0;i<t.parent.numVertices;i++)f.vertexBoneWeights[i]={x:this.readFloat32(),y:this.readFloat32(),z:this.readFloat32(),w:this.readFloat32()};f.skinToBoneMatrix=new Array(f.numBones);for(i=0;i<f.numBones;i++){0==f.numUsedBones&&(this.position+=4),f.skinToBoneMatrix[i]=new Array(16);for(h=0;h<16;h++)f.skinToBoneMatrix[i]=this.readFloat32()}0!=f.numUsedBones&&(this.position+=12);break;case Tt:if(0==this.readUInt32())break;throw"DFFLoader: Not implemented";default:this.position+=r.length,console.warn("DFFLoader: Skipped "+r.name+" extension")}this.position<l+r.length&&console.warn("DFFLoader: Extension "+r.name+" not readed to end"),e[r.name]&&console.error("DFFLoader: Rewrite of extension "+r.name),e[r.name]=f}break;default:throw"DFFLoader: Not implemented"}return e},readExtension:function(t){t.RWExtension=this.readChunk(C,t)}};var Kt=_t,Mt=1280,St=8192,Ot=16384;function Pt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Lt(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function Wt(t,e,r){return(Wt=Lt()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var i=new(Function.bind.apply(t,n));return r&&zt(i,r.prototype),i}).apply(null,arguments)}function Dt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function jt(t){return(jt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function Bt(t,e){return!e||"object"!==Vt(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function zt(t,e){return(zt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var Vt=function(t){return t&&"undefined"!==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function Gt(t){var e="function"===typeof Map?new Map:void 0;return(Gt=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!==typeof t)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return Wt(t,arguments,jt(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),zt(n,t)})(t)}function Xt(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=jt(t);if(e){var i=jt(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return Bt(this,r)}}var Yt=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&zt(t,e)}(r,t);var e=Xt(r);function r(){return Pt(this,r),e.apply(this,arguments)}return r}(Gt(Error)),Zt=function(){function t(e){Pt(this,t),this.id=e.readUint32(),this.size=e.readUint32(),this.build=e.readUint32(),this.version=4294901760&this.build?this.build>>14&261888|this.build>>16&63|196608:this.build<<8}var e,r,n;return e=t,n=[{key:"assert",value:function(e,r){var n=new t(e);if(n.id!==r)throw new Yt("expected: ".concat(r," actual: ").concat(n.id));return n}}],(r=null)&&Dt(e.prototype,r),n&&Dt(e,n),t}();function $t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var qt=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.offset=0,this.view=new DataView(e)}var e,r,n;return e=t,(r=[{key:"tell",value:function(){return this.offset}},{key:"seek",value:function(e,r){(void 0===r?t.CUR:r)===t.BEG?this.offset=e:this.offset+=e}},{key:"readUint8",value:function(){var t=this.view.getUint8(this.offset);return this.offset+=1,t}},{key:"readUint16",value:function(){var t=this.view.getUint16(this.offset,!0);return this.offset+=2,t}},{key:"readUint32",value:function(){var t=this.view.getUint32(this.offset,!0);return this.offset+=4,t}},{key:"readInt32",value:function(){var t=this.view.getInt32(this.offset,!0);return this.offset+=4,t}},{key:"readFloat32",value:function(){var t=this.view.getFloat32(this.offset,!0);return this.offset+=4,t}},{key:"read",value:function(t){var e=this.view.buffer.slice(this.offset,this.offset+t);return this.offset+=t,e}},{key:"readString",value:function(t){var e=new Uint8Array(this.read(t)),r="",n=!0,i=!1,a=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done);n=!0){var u=s.value;if(0===u)break;r+=String.fromCharCode(u)}}catch(h){i=!0,a=h}finally{try{n||null==o.return||o.return()}finally{if(i)throw a}}return r}}])&&$t(e.prototype,r),n&&$t(e,n),t}();qt.BEG=0,qt.CUR=1;function Jt(t,e,r,n,i,a,s){try{var o=t[a](s),u=o.value}catch(h){return void r(h)}o.done?e(u):Promise.resolve(u).then(n,i)}function Qt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function te(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function ee(t,e,r){return e&&te(t.prototype,e),r&&te(t,r),t}function re(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var ne=function(){function t(e){Qt(this,t),this.textures=[],Zt.assert(e,P),Zt.assert(e,y);var r=e.readUint16();e.seek(2);for(var n=0;n<r;n++)this.textures.push(new ie(e))}return ee(t,null,[{key:"load",value:function(e){return(r=m().mark((function r(){var n;return m().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,fetch(e).then((function(t){return t.arrayBuffer()}));case 2:return n=r.sent,r.abrupt("return",new t(new qt(n)));case 4:case"end":return r.stop()}}),r)})),function(){var t=this,e=arguments;return new Promise((function(n,i){var a=r.apply(t,e);function s(t){Jt(a,n,i,s,o,"next",t)}function o(t){Jt(a,n,i,s,o,"throw",t)}s(void 0)}))})();var r}}]),t}(),ie=function(){function t(e){Qt(this,t),this.hasAlpha=0,this.width=[],this.height=[],this.paletteSize=0,this.palette=new Uint8Array(0),this.dataSizes=[],this.texels=[],Zt.assert(e,O),Zt.assert(e,y),this.platform=e.readUint32(),this.filterFlags=e.readUint32(),this.name=e.readString(32),this.maskName=e.readString(32),this.rasterFormat=e.readUint32();var r=new Uint8Array(5);9===this.platform?r=new Uint8Array(re(new Uint8Array(e.read(4))).concat([0])):this.hasAlpha=e.readUint32(),this.width.push(e.readUint16()),this.height.push(e.readUint16()),this.depth=e.readUint8(),this.mipmapCount=e.readUint8(),e.seek(1),this.dxtCompression=e.readUint8(),9===this.platform&&(this.hasAlpha=1&this.dxtCompression,8&this.dxtCompression?this.dxtCompression=r[3]-"0".charCodeAt(0):this.dxtCompression=0),(this.rasterFormat&St||this.rasterFormat&Ot)&&(this.paletteSize=this.rasterFormat&St?256:16,this.palette=new Uint8Array(e.read(4*this.paletteSize)));for(var n=0;n<this.mipmapCount;n++){n>0&&(this.width.push(this.width[n-1]/2),this.height.push(this.height[n-1]/2),this.dxtCompression&&(this.width[n]<4&&0!==this.width[n]&&(this.width[n]=4),this.height[n]<4&&0!==this.height[n]&&(this.height[n]=4)));var i=e.readUint32();0===i&&(this.width[n]=this.height[n]=0),this.dataSizes.push(i),this.texels.push(new Uint8Array(e.read(i)))}e.seek(Zt.assert(e,C).size)}return ee(t,[{key:"tga",value:function(){if(32!==this.depth)throw new Error("Invalid depth for tga image");for(var t=[0,0,2].concat(re(new Uint8Array(new Uint16Array([0,0]).buffer)),[0],re(new Uint8Array(new Uint16Array([0,0]).buffer)),re(new Uint8Array(new Uint16Array([this.width[0],this.height[0]]).buffer)),[32,40]),e=0;e<this.width[0]*this.height[0];e++)t.push(this.texels[0][4*e+0]),t.push(this.texels[0][4*e+1]),t.push(this.texels[0][4*e+2]),t.push(this.texels[0][4*e+3]);return new Uint8Array(t)}},{key:"convertTo32Bit",value:function(){if(this.rasterFormat&St||this.rasterFormat&Ot){for(var t=0;t<this.mipmapCount;t++){for(var e=this.width[t]*this.height[t]*4,r=new Uint8Array(e),n=0;n<this.width[t]*this.height[t];n++)r[4*n+2]=this.palette[4*this.texels[t][n]+0],r[4*n+1]=this.palette[4*this.texels[t][n]+1],r[4*n+0]=this.palette[4*this.texels[t][n]+2],r[4*n+3]=this.palette[4*this.texels[t][n]+3];this.texels[t]=r,this.dataSizes[t]=e}this.palette=new Uint8Array,this.rasterFormat&=-24577,this.depth=32}else if(256===(240&this.rasterFormat)){for(var i=0;i<this.mipmapCount;i++){for(var a=this.width[i]*this.height[i]*4,s=new Uint8Array(a),o=0;o<this.width[i]*this.height[i];o++){var u=new Uint16Array(this.texels[i].buffer.slice(2*o))[0];s[4*o+0]=255*((31&u)>>0)/31,s[4*o+1]=255*((992&u)>>5)/31,s[4*o+2]=255*((31744&u)>>10)/31,s[4*o+3]=255*((32768&u)>>15)}this.texels[i]=s,this.dataSizes[i]=a}this.rasterFormat=Mt,this.depth=32}else if(512===(240&this.rasterFormat)){for(var h=0;h<this.mipmapCount;h++){for(var c=this.width[h]*this.height[h]*4,d=new Uint8Array(c),f=0;f<this.width[h]*this.height[h];f++){var l=new Uint16Array(this.texels[h].buffer.slice(2*f))[0];d[4*f+0]=255*((31&l)>>0)/31,d[4*f+1]=255*((2016&l)>>5)/63,d[4*f+2]=255*((63488&l)>>11)/31,d[4*f+3]=255}this.texels[h]=d,this.dataSizes[h]=c}this.rasterFormat=1536,this.depth=32}else if(768===(240&this.rasterFormat)){for(var p=0;p<this.mipmapCount;p++){for(var m=this.width[p]*this.height[p]*4,v=new Uint8Array(m),U=0;U<this.width[p]*this.height[p];U++){var w=new Uint16Array(this.texels[p].buffer.slice(2*U))[0];v[4*U+0]=255*((15&w)>>0)/15,v[4*U+1]=255*((240&w)>>4)/15,v[4*U+2]=255*((3840&w)>>8)/15,v[4*U+3]=255*((61440&w)>>12)/15}this.texels[p]=v,this.dataSizes[p]=m}this.rasterFormat=Mt,this.depth=32}}},{key:"decompressDxt",value:function(){0!==this.dxtCompression&&(1===this.dxtCompression?this.decompressDxt1():3===this.dxtCompression?this.decompressDxt3():4===this.dxtCompression?this.decompressDxt4():console.log("dxt",this.dxtCompression,"not supported"))}},{key:"decompressDxt1",value:function(){for(var t=0;t<this.mipmapCount;t++){for(var e=0,r=0,n=this.width[t]*this.height[t]*4,i=new Uint8Array(n),a=0;a<this.width[t]*this.height[t]/2;a+=8){var s=new Uint16Array(this.texels[t].buffer.slice(a+0))[0],o=new Uint16Array(this.texels[t].buffer.slice(a+2))[0],u=[new Uint32Array(4),new Uint32Array(4),new Uint32Array(4),new Uint32Array(4)];u[0][0]=255*(31&s)/31,u[0][1]=255*((2016&s)>>5)/63,u[0][2]=255*((63488&s)>>11)/31,u[0][3]=255,u[1][0]=255*(31&o)/31,u[1][1]=255*((2016&o)>>5)/63,u[1][2]=255*((63488&o)>>11)/31,u[1][3]=255,s>o?(u[2][0]=(2*u[0][0]+1*u[1][0])/3,u[2][1]=(2*u[0][1]+1*u[1][1])/3,u[2][2]=(2*u[0][2]+1*u[1][2])/3,u[2][3]=255,u[3][0]=(1*u[0][0]+2*u[1][0])/3,u[3][1]=(1*u[0][1]+2*u[1][1])/3,u[3][2]=(1*u[0][2]+2*u[1][2])/3,u[3][3]=255):(u[2][0]=(u[0][0]+u[1][0])/2,u[2][1]=(u[0][1]+u[1][1])/2,u[2][2]=(u[0][2]+u[1][2])/2,u[2][3]=255,u[3][0]=0,u[3][1]=0,u[3][2]=0,512&this.rasterFormat?u[3][3]=255:u[3][3]=0);for(var h=new Uint32Array(this.texels[t].buffer.slice(a+4))[0],c=new Uint8Array(16),d=0;d<16;d++)c[d]=3&h,h>>=2;for(var f=0;f<4;f++)for(var l=0;l<4;l++)i[(r+l)*this.width[t]*4+4*(e+f)+0]=u[c[4*l+f]][0],i[(r+l)*this.width[t]*4+4*(e+f)+1]=u[c[4*l+f]][1],i[(r+l)*this.width[t]*4+4*(e+f)+2]=u[c[4*l+f]][2],i[(r+l)*this.width[t]*4+4*(e+f)+3]=u[c[4*l+f]][3];(e+=4)>=this.width[t]&&(r+=4,e=0)}this.texels[t]=i,this.dataSizes[t]=n}this.depth=32,this.rasterFormat+=1024,this.dxtCompression=0}},{key:"decompressDxt4",value:function(){for(var t=0;t<this.mipmapCount;t++){for(var e=0,r=0,n=this.width[t]*this.height[t]*4,i=new Uint8Array(n),a=0;a<this.width[t]*this.height[t];a+=16){var s=new Uint16Array(this.texels[t].buffer.slice(a+8))[0],o=new Uint16Array(this.texels[t].buffer.slice(a+10))[0],u=[new Uint32Array(4),new Uint32Array(4),new Uint32Array(4),new Uint32Array(4)];u[0][0]=255*(31&s)/31,u[0][1]=255*((2016&s)>>5)/63,u[0][2]=255*((63488&s)>>11)/31,u[1][0]=255*(31&o)/31,u[1][1]=255*((2016&o)>>5)/63,u[1][2]=255*((63488&o)>>11)/31,u[2][0]=(2*u[0][0]+1*u[1][0])/3,u[2][1]=(2*u[0][1]+1*u[1][1])/3,u[2][2]=(2*u[0][2]+1*u[1][2])/3,u[3][0]=(1*u[0][0]+2*u[1][0])/3,u[3][1]=(1*u[0][1]+2*u[1][1])/3,u[3][2]=(1*u[0][2]+2*u[1][2])/3;var h=new Uint32Array(8);h[0]=this.texels[t][a+0],h[1]=this.texels[t][a+1],h[0]>h[1]?(h[2]=(6*h[0]+1*h[1])/7,h[3]=(5*h[0]+2*h[1])/7,h[4]=(4*h[0]+3*h[1])/7,h[5]=(3*h[0]+4*h[1])/7,h[6]=(2*h[0]+5*h[1])/7,h[7]=(1*h[0]+6*h[1])/7):(h[2]=(4*h[0]+1*h[1])/5,h[3]=(3*h[0]+2*h[1])/5,h[4]=(2*h[0]+3*h[1])/5,h[5]=(1*h[0]+4*h[1])/5,h[6]=0,h[7]=255);for(var c=new Uint32Array(this.texels[t].slice(a+12))[0],d=new Uint8Array(16),f=0;f<16;f++)d[f]=3&c,c>>=2;for(var l=Number(new BigUint64Array(this.texels[t].buffer.slice(a+2))[0]),p=new Uint8Array(16),m=0;m<16;m++)p[m]=7&l,l>>=3;for(var v=0;v<4;v++)for(var U=0;U<4;U++)i[(r+U)*this.width[t]*4+4*(e+v)+0]=u[d[4*U+v]][0],i[(r+U)*this.width[t]*4+4*(e+v)+1]=u[d[4*U+v]][1],i[(r+U)*this.width[t]*4+4*(e+v)+2]=u[d[4*U+v]][2],i[(r+U)*this.width[t]*4+4*(e+v)+3]=h[p[4*U+v]];(e+=4)>=this.width[t]&&(r+=4,e=0)}this.texels[t]=i,this.dataSizes[t]=n}this.depth=32,this.rasterFormat=Mt,this.dxtCompression=0}},{key:"decompressDxt3",value:function(){for(var t=0;t<this.mipmapCount;t++){for(var e=0,r=0,n=this.width[t]*this.height[t]*4,i=new Uint8Array(n),a=0;a<this.width[t]*this.height[t];a+=16){var s=new Uint16Array(this.texels[t].buffer.slice(a+8))[0],o=new Uint16Array(this.texels[t].buffer.slice(a+10))[0],u=[new Uint32Array(4),new Uint32Array(4),new Uint32Array(4),new Uint32Array(4)];u[0][0]=255*(31&s)/31,u[0][1]=255*((2016&s)>>5)/63,u[0][2]=255*((63488&s)>>11)/31,u[1][0]=255*(31&o)/31,u[1][1]=255*((2016&o)>>5)/63,u[1][2]=255*((63488&o)>>11)/31,u[2][0]=(2*u[0][0]+1*u[1][0])/3,u[2][1]=(2*u[0][1]+1*u[1][1])/3,u[2][2]=(2*u[0][2]+1*u[1][2])/3,u[3][0]=(1*u[0][0]+2*u[1][0])/3,u[3][1]=(1*u[0][1]+2*u[1][1])/3,u[3][2]=(1*u[0][2]+2*u[1][2])/3;for(var h=new Uint32Array(this.texels[t].buffer.slice(a+12))[0],c=new Uint8Array(16),d=0;d<16;d++)c[d]=3&h,h>>=2;for(var f=Number(new BigUint64Array(this.texels[t].buffer.slice(a+0))[0]),l=new Uint8Array(16),p=0;p<16;p++)l[p]=17*(15&f),f>>=4;for(var m=0;m<4;m++)for(var v=0;v<4;v++)i[(r+v)*this.width[t]*4+4*(e+m)+0]=u[c[4*v+m]][0],i[(r+v)*this.width[t]*4+4*(e+m)+1]=u[c[4*v+m]][1],i[(r+v)*this.width[t]*4+4*(e+m)+2]=u[c[4*v+m]][2],i[(r+v)*this.width[t]*4+4*(e+m)+3]=l[4*v+m];(e+=4)>=this.width[t]&&(r+=4,e=0)}this.texels[t]=i,this.dataSizes[t]=n}this.depth=32,this.rasterFormat+=512,this.dxtCompression=0}}]),t}(),ae=r(650);function se(t,e,r,n,i,a,s){try{var o=t[a](s),u=o.value}catch(h){return void r(h)}o.done?e(u):Promise.resolve(u).then(n,i)}function oe(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var a=t.apply(e,r);function s(t){se(a,n,i,s,o,"next",t)}function o(t){se(a,n,i,s,o,"throw",t)}s(void 0)}))}}var ue=function(t){this.manager=t||a.tEQ,this.textures={}};function he(t,e,r,n,i,a,s){try{var o=t[a](s),u=o.value}catch(h){return void r(h)}o.done?e(u):Promise.resolve(u).then(n,i)}function ce(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var a=t.apply(e,r);function s(t){he(a,n,i,s,o,"next",t)}function o(t){he(a,n,i,s,o,"throw",t)}s(void 0)}))}}ue.prototype={constructor:ue,load:function(t,e,r,n){var i=oe(m().mark((function t(e,r,n,i){var s,o,u;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=this,(o=new a.hH6(this.manager)).setResponseType("arraybuffer"),void 0!==this.path&&o.setPath(this.path),t.next=6,ne.load(e.replace(".dff",".txd"));case 6:return u=t.sent,t.next=9,Promise.all(u.textures.map(oe(m().mark((function t(e){var r,n;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.decompressDxt(),e.convertTo32Bit(),r=URL.createObjectURL(new Blob([e.tga()])),t.next=5,(new ae.U).loadAsync(r);case 5:n=t.sent,URL.revokeObjectURL(r),this.textures[e.name]=n,this.textures[e.maskName]=n;case 9:case"end":return t.stop()}}),t,this)})).bind(this)).bind(this)));case 9:o.load(e,(function(t){r(s.read(t))}),n,i);case 10:case"end":return t.stop()}}),t,this)})));return function(){return i.apply(this,arguments)}}(),setPath:function(t){return this.path=t,this},read:function(t){var e=new Kt,r=new a.ZAu,n=e.parse(t),i=[];return n.RWGeometryList.forEach((function(t){var e=new a.u9r,r=[];t.triangles.forEach((function(t){void 0===r[t.materialId]&&(r[t.materialId]=[]),r[t.materialId].push([t.vertex1,t.vertex2,t.vertex3])}));var n=Object.keys(r).reduce((function(t,e){return t+r[e].length}),0),s=new a.TlE(new Float32Array(3*n*3),3),o=t.morphTargets[0].hasNormals&&new a.TlE(new Float32Array(3*n*3),3,!0),u=t.prelitcolor&&new a.TlE(new Uint8Array(3*n*3),3,!0),h=t.texCoords&&new a.TlE(new Float32Array(3*n*2),2,!0),c=0,d={},f=!0,l=!1,p=void 0;try{for(var m,v=Object.keys(r)[Symbol.iterator]();!(f=(m=v.next()).done);f=!0){var U=m.value,w=r[U];e.addGroup(c,3*w.length,Number(U));var y=!0,x=!1,C=void 0;try{for(var I,g=w[Symbol.iterator]();!(y=(I=g.next()).done);y=!0){var A=I.value,N=!0,b=!1,T=void 0;try{for(var E,F=A[Symbol.iterator]();!(N=(E=F.next()).done);N=!0){var k=E.value,H=t.morphTargets[0].vertices[k];if(s.setXYZ(c,H.x,H.y,H.z),d[k]=d[k]||[],d[k].push(c),o){var R=t.morphTargets[0].normals[k];o.setXYZ(c,R.x,R.y,R.z)}if(h){var _=t.texCoords[0][k];h.setXY(c,_.u,1-_.v)}if(u)throw"DFFLoader: Not implemented";c+=1}}catch(W){b=!0,T=W}finally{try{N||null==F.return||F.return()}finally{if(b)throw T}}}}catch(W){x=!0,C=W}finally{try{y||null==g.return||g.return()}finally{if(x)throw C}}}}catch(W){l=!0,p=W}finally{try{f||null==v.return||v.return()}finally{if(l)throw p}}e.dynamic=!1,e.addAttribute("position",s),o?e.addAttribute("normal",o,!0):e.computeFaceNormals(),u&&e.addAttribute("color",u,!0),h&&e.addAttribute("uv",h),e.computeBoundingSphere();var K=t.RWMaterialList.map((function(t){var e=new a.Wid({vertexColors:u?a.jSK:a.XeA,roughness:t.RWMaterial.diffuse});if(t.RWMaterial.isTextured){if(t.RWMaterial.RWTexture.name){var r=this.textures[t.RWMaterial.RWTexture.name];r&&(e.map=r,t.needsUpdate=!0,e.map.wrapS=a.rpg,e.map.wrapT=a.rpg)}var n;if(t.RWMaterial.RWTexture.maskName)e.alphaMap=null!==(n=this.textures[t.RWMaterial.RWTexture.maskName])&&void 0!==n?n:this.textures[t.RWMaterial.RWTexture.name],e.needsUpdate=!0,e.alphaMap.wrapS=a.rpg,e.alphaMap.wrapT=a.rpg,e.transparent=!0,e.alphaTest=.05}return e}),this);if(t.RWExtension.CHUNK_SKIN){for(var M=function(t){d[t].forEach((function(e){O.setXYZW(e,S.vertexBoneIndices[t].x,S.vertexBoneIndices[t].y,S.vertexBoneIndices[t].z,S.vertexBoneIndices[t].w),P.setXYZW(e,S.vertexBoneWeights[t].x,S.vertexBoneWeights[t].y,S.vertexBoneWeights[t].z,S.vertexBoneWeights[t].w)}))},S=t.RWExtension.CHUNK_SKIN,O=new a.a$l(4*s.count,4),P=new a.a$l(4*s.count,4),L=0;L<t.numVertices;L++)M(L);e.addAttribute("skinIndex",O),e.addAttribute("skinWeight",P)}i.push({geometry:e,materials:K})}),this),n.RWAtomicList.forEach((function(t){i[t.geometryIndex].geometry,i[t.geometryIndex].materials;var e=new Array(n.RWFrameList.length),r=null,s=null;if(n.RWFrameList.forEach((function(t,n){var i=t.RWFrame,o=new a.N$j;o.name=t.RWExtension.CHUNK_FRAME;var u=new a.yGw;u.set(i.rotationMatrix[0],i.rotationMatrix[3],i.rotationMatrix[6],i.position[0],i.rotationMatrix[1],i.rotationMatrix[4],i.rotationMatrix[7],i.position[1],i.rotationMatrix[2],i.rotationMatrix[5],i.rotationMatrix[8],i.position[2],0,0,0,1),o.applyMatrix(u),i.parentIndex>=0&&e[i.parentIndex].add(o);var h=t.RWExtension.CHUNK_HANIM;h&&(o.nodeId=h.nodeId,o.nodeIndex=n,h.numNodes>0&&(s=o,r=h.nodes.map((function(t,e){return{id:t.nodeId,index:e,flags:t.flags,frame:null}})))),e[n]=o})),r){var o=new Array(r.length);function n(t,i){return t?t.nodeId>=0&&t.nodeId==i&&-1==function(t){for(var e=0;e<r.length;e++)if(r[e].node==t)return e;return-1}(t)?t:n(t.children[0],i)||n(e[t.nodeIndex+1],i):null}for(var u=0;u<r.length;u++)r[u].node=n(s,r[u].id),o[u]=r[u].node;i[t.geometryIndex].skeleton=new a.OdW(o)}})),i.forEach((function(t){var e;t.skeleton?(t.materials.forEach((function(t){t.skinning=!0})),(e=new a.TUv(t.geometry,t.materials)).add(t.skeleton.bones[0]),e.bind(t.skeleton)):e=new a.Kj0(t.geometry,t.materials),e.rotation.set(0,Math.PI,Math.PI/2),r.add(e)})),r}};var de=["truth","bbthin","bb","emmet","bfori","dwmolc1","dwmolc2","swmotr1","ryder3","wmori","dnfolc2","dnmolc1","suzie","ryder","wuzimu","ryder2"];function fe(){return(fe=ce(m().mark((function t(e){var r;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){"cj"===e?(new U.v).load("/skins/".concat(e,".mtl"),(function(r){r.preload();var n=new v.L;n.setMaterials(r),n.load("/skins/".concat(e,".obj"),t)})):(new ue).load("/skins/".concat(e,".dff"),t)}));case 2:return r=t.sent,de.includes(e)?r.rotation.x=Math.PI/2:r.rotation.y=-Math.PI/2,t.abrupt("return",r);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function le(t){var e=t.skin,r=t.onPrev,n=t.onNext,p=(0,o.useRef)(null),m=(0,o.useRef)(),v=(0,o.useRef)(),U=(0,o.useRef)(),w=(0,o.useRef)(),y=(0,o.useRef)(),x=(0,o.useRef)(),C=(0,o.useCallback)((function(){if(p.current){var t=p.current,e=t.clientWidth,r=t.clientHeight;m.current=new a.xsS,v.current=new a.cPb(75,e/r,.1,1e3),v.current.position.z=2,U.current=new a.CP7({alpha:!0,antialias:!0}),U.current.setSize(e,r),m.current.add(new a.Mig),y.current=new s.z(v.current,U.current.domElement),y.current.enablePan=!1,p.current.appendChild(U.current.domElement)}}),[]),I=(0,o.useCallback)((function(){m.current&&function(t){return fe.apply(this,arguments)}(e.model).then((function(t){w.current=t,m.current.add(w.current)}))}),[e.model]),g=(0,o.useCallback)((function(){U.current&&m.current&&v.current&&U.current.render(m.current,v.current),x.current=requestAnimationFrame(g)}),[]),A=(0,o.useCallback)((function(){p.current&&U.current&&x.current&&(p.current.removeChild(U.current.domElement),cancelAnimationFrame(x.current))}),[]);return(0,o.useEffect)((function(){return C(),I(),g(),A}),[g,A,I,C]),(0,o.useEffect)((function(){window.addEventListener("resize",(function(){if(p.current&&U.current&&v.current){var t=p.current,e=t.clientWidth,r=t.clientHeight;U.current.setSize(e,r),v.current.aspect=e/r,v.current.updateProjectionMatrix()}}))}),[]),(0,i.jsxs)(u.Z,{sx:{width:"100%",minHeight:"100%",position:"relative",flex:1,"& > canvas":{cursor:"move"}},ref:p,children:[r&&(0,i.jsx)(h.Z,{size:"small",onClick:r,sx:{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)"},children:(0,i.jsx)(f.Z,{})}),n&&(0,i.jsx)(h.Z,{size:"small",onClick:n,sx:{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)"},children:(0,i.jsx)(l.Z,{})}),(0,i.jsxs)(c.Z,{sx:{position:"absolute",left:0,top:0,"& > img":{maxWidth:50,maxHeight:80,objectFit:"contain",objectPosition:"left"}},direction:"row",spacing:1,children:[(0,i.jsx)("img",{src:e.image,alt:e.model}),(0,i.jsx)(c.Z,{children:(0,i.jsxs)(d.Z,{variant:"caption",children:[e.model," (",e.id,")"]})})]})]})}var pe=r(9008),me=r(1163);function ve(t){var e=t.getSkinUrl;return function(t){var r=t.prev,n=t.next,a=t.skin,s=(0,me.useRouter)();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(pe.default,{children:(0,i.jsxs)("title",{children:[a.model," (",a.id,")"]})}),(0,i.jsx)(le,{onPrev:r?function(){return s.push(e(r))}:void 0,onNext:n?function(){return s.push(e(n))}:void 0,skin:a},a.id)]})}}}}]);