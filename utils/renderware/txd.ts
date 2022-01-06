// https://github.com/aap/rwtools/blob/f00a861451371fe1435e21b0404722eff7389686/src/txdread.cpp#L18

import {
  RASTER_PAL4,
  RASTER_PAL8,
  RASTER_MASK,
  RASTER_1555,
  RASTER_8888,
  RASTER_565,
  RASTER_888,
  RASTER_4444,
} from './raster';
import { Header } from './header';
import { RwStream } from './stream';
import {
  CHUNK_EXTENSION,
  CHUNK_STRUCT,
  CHUNK_TEXDICTIONARY,
  CHUNK_TEXTURENATIVE,
} from './chunks';
import { PLATFORM_D3D9 } from './platforms';

export class TextureDictionary {
  textures: Texture[] = [];

  constructor(rw: RwStream) {
    Header.assert(rw, CHUNK_TEXDICTIONARY);
    Header.assert(rw, CHUNK_STRUCT);
    const count = rw.readUint16();
    rw.seek(2);
    for (let i = 0; i < count; i++) {
      this.textures.push(new Texture(rw));
    }
  }

  static async load(url: string) {
    const buffer = await fetch(url).then((res) => res.arrayBuffer());
    return new TextureDictionary(new RwStream(buffer));
  }
}

export class Texture {
  platform: number;
  filterFlags: number;
  name: string;
  maskName: string;
  rasterFormat: number;
  hasAlpha: number = 0;

  width: number[] = [];
  height: number[] = [];
  depth: number;

  mipmapCount: number;
  dxtCompression: number;

  paletteSize: number = 0;
  palette = new Uint8Array(0);

  dataSizes: number[] = [];
  texels: Uint8Array[] = [];

  constructor(rw: RwStream) {
    // only supports d3d8/d3d9 platform
    Header.assert(rw, CHUNK_TEXTURENATIVE);
    Header.assert(rw, CHUNK_STRUCT);

    this.platform = rw.readUint32();
    this.filterFlags = rw.readUint32();
    this.name = rw.readString(32);
    this.maskName = rw.readString(32);
    this.rasterFormat = rw.readUint32();

    let fourcc = new Uint8Array(5);

    if (this.platform === PLATFORM_D3D9) {
      fourcc = new Uint8Array([...new Uint8Array(rw.read(4)), 0]);
    } else {
      this.hasAlpha = rw.readUint32();
    }

    this.width.push(rw.readUint16());
    this.height.push(rw.readUint16());
    this.depth = rw.readUint8();
    this.mipmapCount = rw.readUint8();
    rw.seek(1); // raster type (always 4)
    this.dxtCompression = rw.readUint8();

    if (this.platform === PLATFORM_D3D9) {
      this.hasAlpha = this.dxtCompression & 0x1;

      if (this.dxtCompression & 0x8) {
        this.dxtCompression = fourcc[3] - '0'.charCodeAt(0);
      } else {
        this.dxtCompression = 0;
      }
    }

    if (this.rasterFormat & RASTER_PAL8 || this.rasterFormat & RASTER_PAL4) {
      this.paletteSize = this.rasterFormat & RASTER_PAL8 ? 0x100 : 0x10;
      this.palette = new Uint8Array(rw.read(this.paletteSize * 4));
    }

    for (let i = 0; i < this.mipmapCount; i++) {
      if (i > 0) {
        this.width.push(this.width[i - 1] / 2);
        this.height.push(this.height[i - 1] / 2);
        // DXT compression works on 4x4 blocks,
        // no smaller values allowed
        if (this.dxtCompression) {
          if (this.width[i] < 4 && this.width[i] !== 0) {
            this.width[i] = 4;
          }
          if (this.height[i] < 4 && this.height[i] !== 0) {
            this.height[i] = 4;
          }
        }
      }

      const dataSize = rw.readUint32();
      if (dataSize === 0) {
        this.width[i] = this.height[i] = 0;
      }

      this.dataSizes.push(dataSize);
      this.texels.push(new Uint8Array(rw.read(dataSize)));
    }

    rw.seek(Header.assert(rw, CHUNK_EXTENSION).size);
  }

  tga(): Uint8Array {
    if (this.depth !== 32) {
      throw new Error('Invalid depth for tga image');
    }

    const data = [
      0,
      0,
      2,
      ...new Uint8Array(new Uint16Array([0, 0]).buffer),
      0,
      ...new Uint8Array(new Uint16Array([0, 0]).buffer),
      ...new Uint8Array(
        new Uint16Array([this.width[0], this.height[0]]).buffer
      ),
      0x20,
      0x28,
    ];

    for (let j = 0; j < this.width[0] * this.height[0]; j++) {
      data.push(this.texels[0][j * 4 + 0]);
      data.push(this.texels[0][j * 4 + 1]);
      data.push(this.texels[0][j * 4 + 2]);
      data.push(this.texels[0][j * 4 + 3]);
    }

    return new Uint8Array(data);
  }

  convertTo32Bit() {
    // depth is always 8 (even if the palette is 4 bit)
    if (this.rasterFormat & RASTER_PAL8 || this.rasterFormat & RASTER_PAL4) {
      for (let j = 0; j < this.mipmapCount; j++) {
        const dataSize = this.width[j] * this.height[j] * 4;
        const newtexels = new Uint8Array(dataSize);
        for (let i = 0; i < this.width[j] * this.height[j]; i++) {
          // swap r and b
          newtexels[i * 4 + 2] = this.palette[this.texels[j][i] * 4 + 0];
          newtexels[i * 4 + 1] = this.palette[this.texels[j][i] * 4 + 1];
          newtexels[i * 4 + 0] = this.palette[this.texels[j][i] * 4 + 2];
          newtexels[i * 4 + 3] = this.palette[this.texels[j][i] * 4 + 3];
        }
        this.texels[j] = newtexels;
        this.dataSizes[j] = dataSize;
      }
      this.palette = new Uint8Array();
      this.rasterFormat &= ~(RASTER_PAL4 | RASTER_PAL8);
      this.depth = 0x20;
    } else if ((this.rasterFormat & RASTER_MASK) === RASTER_1555) {
      for (let j = 0; j < this.mipmapCount; j++) {
        const dataSize = this.width[j] * this.height[j] * 4;
        const newtexels = new Uint8Array(dataSize);
        for (let i = 0; i < this.width[j] * this.height[j]; i++) {
          const col = new Uint16Array(this.texels[j].buffer.slice(i * 2))[0];
          newtexels[i * 4 + 0] = (((col & 0x001f) >> 0x0) * 0xff) / 0x1f;
          newtexels[i * 4 + 1] = (((col & 0x03e0) >> 0x5) * 0xff) / 0x1f;
          newtexels[i * 4 + 2] = (((col & 0x7c00) >> 0xa) * 0xff) / 0x1f;
          newtexels[i * 4 + 3] = ((col & 0x8000) >> 0xf) * 0xff;
        }
        this.texels[j] = newtexels;
        this.dataSizes[j] = dataSize;
      }
      this.rasterFormat = RASTER_8888;
      this.depth = 0x20;
    } else if ((this.rasterFormat & RASTER_MASK) === RASTER_565) {
      for (let j = 0; j < this.mipmapCount; j++) {
        const dataSize = this.width[j] * this.height[j] * 4;
        const newtexels = new Uint8Array(dataSize);
        for (let i = 0; i < this.width[j] * this.height[j]; i++) {
          const col = new Uint16Array(this.texels[j].buffer.slice(i * 2))[0];
          newtexels[i * 4 + 0] = (((col & 0x001f) >> 0x0) * 0xff) / 0x1f;
          newtexels[i * 4 + 1] = (((col & 0x07e0) >> 0x5) * 0xff) / 0x3f;
          newtexels[i * 4 + 2] = (((col & 0xf800) >> 0xb) * 0xff) / 0x1f;
          newtexels[i * 4 + 3] = 255;
        }
        this.texels[j] = newtexels;
        this.dataSizes[j] = dataSize;
      }
      this.rasterFormat = RASTER_888;
      this.depth = 0x20;
    } else if ((this.rasterFormat & RASTER_MASK) === RASTER_4444) {
      for (let j = 0; j < this.mipmapCount; j++) {
        const dataSize = this.width[j] * this.height[j] * 4;
        const newtexels = new Uint8Array(dataSize);
        for (let i = 0; i < this.width[j] * this.height[j]; i++) {
          const col = new Uint16Array(this.texels[j].buffer.slice(i * 2))[0];
          // swap r and b
          newtexels[i * 4 + 0] = (((col & 0x000f) >> 0x0) * 0xff) / 0xf;
          newtexels[i * 4 + 1] = (((col & 0x00f0) >> 0x4) * 0xff) / 0xf;
          newtexels[i * 4 + 2] = (((col & 0x0f00) >> 0x8) * 0xff) / 0xf;
          newtexels[i * 4 + 3] = (((col & 0xf000) >> 0xc) * 0xff) / 0xf;
        }

        this.texels[j] = newtexels;
        this.dataSizes[j] = dataSize;
      }
      this.rasterFormat = RASTER_8888;
      this.depth = 0x20;
    }
  }

  decompressDxt() {
    if (this.dxtCompression === 0) {
      return;
    }

    if (this.dxtCompression === 1) {
      this.decompressDxt1();
    } else if (this.dxtCompression === 3) {
      this.decompressDxt3();
    } else if (this.dxtCompression === 4) {
      this.decompressDxt4();
    } else {
      console.log('dxt', this.dxtCompression, 'not supported');
    }
  }
  decompressDxt1() {
    for (let i = 0; i < this.mipmapCount; i++) {
      /* j loops through old texels
       * x and y loop through new texels */
      let x = 0;
      let y = 0;
      const dataSize = this.width[i] * this.height[i] * 4;
      const newtexels = new Uint8Array(dataSize);
      for (let j = 0; j < (this.width[i] * this.height[i]) / 2; j += 8) {
        /* calculate colors */
        const col0 = new Uint16Array(this.texels[i].buffer.slice(j + 0))[0];
        const col1 = new Uint16Array(this.texels[i].buffer.slice(j + 2))[0];
        const c = [
          new Uint32Array(4),
          new Uint32Array(4),
          new Uint32Array(4),
          new Uint32Array(4),
        ];
        // uint32 c[4][4];
        // swap r and b
        c[0][0] = ((col0 & 0x1f) * 0xff) / 0x1f;
        c[0][1] = (((col0 & 0x7e0) >> 5) * 0xff) / 0x3f;
        c[0][2] = (((col0 & 0xf800) >> 11) * 0xff) / 0x1f;
        c[0][3] = 0xff;

        c[1][0] = ((col1 & 0x1f) * 0xff) / 0x1f;
        c[1][1] = (((col1 & 0x7e0) >> 5) * 0xff) / 0x3f;
        c[1][2] = (((col1 & 0xf800) >> 11) * 0xff) / 0x1f;
        c[1][3] = 0xff;
        if (col0 > col1) {
          c[2][0] = (2 * c[0][0] + 1 * c[1][0]) / 3;
          c[2][1] = (2 * c[0][1] + 1 * c[1][1]) / 3;
          c[2][2] = (2 * c[0][2] + 1 * c[1][2]) / 3;
          c[2][3] = 0xff;

          c[3][0] = (1 * c[0][0] + 2 * c[1][0]) / 3;
          c[3][1] = (1 * c[0][1] + 2 * c[1][1]) / 3;
          c[3][2] = (1 * c[0][2] + 2 * c[1][2]) / 3;
          c[3][3] = 0xff;
        } else {
          c[2][0] = (c[0][0] + c[1][0]) / 2;
          c[2][1] = (c[0][1] + c[1][1]) / 2;
          c[2][2] = (c[0][2] + c[1][2]) / 2;
          c[2][3] = 0xff;

          c[3][0] = 0x00;
          c[3][1] = 0x00;
          c[3][2] = 0x00;
          if (this.rasterFormat & 0x0200) c[3][3] = 0xff;
          // 0x0100
          else c[3][3] = 0x00;
        }

        /* make index list */
        let indicesint = new Uint32Array(this.texels[i].buffer.slice(j + 4))[0];
        const indices = new Uint8Array(16);
        for (let k = 0; k < 16; k++) {
          indices[k] = indicesint & 0x3;
          indicesint >>= 2;
        }

        /* write bytes */
        for (let k = 0; k < 4; k++)
          for (let l = 0; l < 4; l++) {
            // wtf?
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 0] =
              c[indices[l * 4 + k]][0];
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 1] =
              c[indices[l * 4 + k]][1];
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 2] =
              c[indices[l * 4 + k]][2];
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 3] =
              c[indices[l * 4 + k]][3];
          }
        x += 4;
        if (x >= this.width[i]) {
          y += 4;
          x = 0;
        }
      }
      this.texels[i] = newtexels;
      this.dataSizes[i] = dataSize;
    }
    this.depth = 0x20;
    this.rasterFormat += 0x0400;
    this.dxtCompression = 0;
  }

  decompressDxt4() {
    for (let i = 0; i < this.mipmapCount; i++) {
      /* j loops through old texels
       * x and y loop through new texels */
      let x = 0;
      let y = 0;
      const dataSize = this.width[i] * this.height[i] * 4;
      const newtexels = new Uint8Array(dataSize);
      for (let j = 0; j < this.width[i] * this.height[i]; j += 16) {
        /* calculate colors */
        const col0 = new Uint16Array(this.texels[i].buffer.slice(j + 8))[0];
        const col1 = new Uint16Array(this.texels[i].buffer.slice(j + 10))[0];
        const c = [
          new Uint32Array(4),
          new Uint32Array(4),
          new Uint32Array(4),
          new Uint32Array(4),
        ];
        // swap r and b
        c[0][0] = ((col0 & 0x1f) * 0xff) / 0x1f;
        c[0][1] = (((col0 & 0x7e0) >> 5) * 0xff) / 0x3f;
        c[0][2] = (((col0 & 0xf800) >> 11) * 0xff) / 0x1f;

        c[1][0] = ((col1 & 0x1f) * 0xff) / 0x1f;
        c[1][1] = (((col1 & 0x7e0) >> 5) * 0xff) / 0x3f;
        c[1][2] = (((col1 & 0xf800) >> 11) * 0xff) / 0x1f;

        c[2][0] = (2 * c[0][0] + 1 * c[1][0]) / 3;
        c[2][1] = (2 * c[0][1] + 1 * c[1][1]) / 3;
        c[2][2] = (2 * c[0][2] + 1 * c[1][2]) / 3;

        c[3][0] = (1 * c[0][0] + 2 * c[1][0]) / 3;
        c[3][1] = (1 * c[0][1] + 2 * c[1][1]) / 3;
        c[3][2] = (1 * c[0][2] + 2 * c[1][2]) / 3;

        const a = new Uint32Array(8);
        a[0] = this.texels[i][j + 0];
        a[1] = this.texels[i][j + 1];
        if (a[0] > a[1]) {
          a[2] = (6 * a[0] + 1 * a[1]) / 7;
          a[3] = (5 * a[0] + 2 * a[1]) / 7;
          a[4] = (4 * a[0] + 3 * a[1]) / 7;
          a[5] = (3 * a[0] + 4 * a[1]) / 7;
          a[6] = (2 * a[0] + 5 * a[1]) / 7;
          a[7] = (1 * a[0] + 6 * a[1]) / 7;
        } else {
          a[2] = (4 * a[0] + 1 * a[1]) / 5;
          a[3] = (3 * a[0] + 2 * a[1]) / 5;
          a[4] = (2 * a[0] + 3 * a[1]) / 5;
          a[5] = (1 * a[0] + 4 * a[1]) / 5;
          a[6] = 0;
          a[7] = 0xff;
        }

        /* make index list */
        let indicesint = new Uint32Array(this.texels[i].slice(j + 12))[0];
        const indices = new Uint8Array(16);
        for (let k = 0; k < 16; k++) {
          indices[k] = indicesint & 0x3;
          indicesint >>= 2;
        }
        // actually 6 bytes
        let alphasint = Number(
          new BigUint64Array(this.texels[i].buffer.slice(j + 2))[0]
        );

        const alphas = new Uint8Array(16);
        for (let k = 0; k < 16; k++) {
          alphas[k] = alphasint & 0x7;
          alphasint >>= 3;
        }

        /* write bytes */
        for (let k = 0; k < 4; k++)
          for (let l = 0; l < 4; l++) {
            // wtf?
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 0] =
              c[indices[l * 4 + k]][0];
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 1] =
              c[indices[l * 4 + k]][1];
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 2] =
              c[indices[l * 4 + k]][2];
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 3] =
              a[alphas[l * 4 + k]];
          }
        x += 4;
        if (x >= this.width[i]) {
          y += 4;
          x = 0;
        }
      }

      this.texels[i] = newtexels;
      this.dataSizes[i] = dataSize;
    }
    this.depth = 0x20;
    this.rasterFormat = RASTER_8888;
    this.dxtCompression = 0;
  }

  decompressDxt3() {
    for (let i = 0; i < this.mipmapCount; i++) {
      /* j loops through old texels
       * x and y loop through new texels */
      let x = 0;
      let y = 0;
      const dataSize = this.width[i] * this.height[i] * 4;
      const newtexels = new Uint8Array(dataSize);
      for (let j = 0; j < this.width[i] * this.height[i]; j += 16) {
        /* calculate colors */
        const col0 = new Uint16Array(this.texels[i].buffer.slice(j + 8))[0];
        const col1 = new Uint16Array(this.texels[i].buffer.slice(j + 10))[0];
        const c = [
          new Uint32Array(4),
          new Uint32Array(4),
          new Uint32Array(4),
          new Uint32Array(4),
        ];
        // swap r and b
        c[0][0] = ((col0 & 0x1f) * 0xff) / 0x1f;
        c[0][1] = (((col0 & 0x7e0) >> 5) * 0xff) / 0x3f;
        c[0][2] = (((col0 & 0xf800) >> 11) * 0xff) / 0x1f;

        c[1][0] = ((col1 & 0x1f) * 0xff) / 0x1f;
        c[1][1] = (((col1 & 0x7e0) >> 5) * 0xff) / 0x3f;
        c[1][2] = (((col1 & 0xf800) >> 11) * 0xff) / 0x1f;

        c[2][0] = (2 * c[0][0] + 1 * c[1][0]) / 3;
        c[2][1] = (2 * c[0][1] + 1 * c[1][1]) / 3;
        c[2][2] = (2 * c[0][2] + 1 * c[1][2]) / 3;

        c[3][0] = (1 * c[0][0] + 2 * c[1][0]) / 3;
        c[3][1] = (1 * c[0][1] + 2 * c[1][1]) / 3;
        c[3][2] = (1 * c[0][2] + 2 * c[1][2]) / 3;

        /* make index list */
        let indicesint = new Uint32Array(
          this.texels[i].buffer.slice(j + 12)
        )[0];
        const indices = new Uint8Array(16);
        for (let k = 0; k < 16; k++) {
          indices[k] = indicesint & 0x3;
          indicesint >>= 2;
        }

        let alphasint = Number(
          new BigUint64Array(this.texels[i].buffer.slice(j + 0))[0]
        );
        const alphas = new Uint8Array(16);
        for (let k = 0; k < 16; k++) {
          alphas[k] = (alphasint & 0xf) * 17;
          alphasint >>= 4;
        }

        /* write bytes */
        for (let k = 0; k < 4; k++)
          for (let l = 0; l < 4; l++) {
            // wtf?
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 0] =
              c[indices[l * 4 + k]][0];
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 1] =
              c[indices[l * 4 + k]][1];
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 2] =
              c[indices[l * 4 + k]][2];
            newtexels[(y + l) * this.width[i] * 4 + (x + k) * 4 + 3] =
              alphas[l * 4 + k];
          }
        x += 4;
        if (x >= this.width[i]) {
          y += 4;
          x = 0;
        }
      }
      this.texels[i] = newtexels;
      this.dataSizes[i] = dataSize;
    }
    this.depth = 0x20;
    this.rasterFormat += 0x0200;
    this.dxtCompression = 0;
  }
}
