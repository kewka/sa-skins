export class RwStream {
  static BEG = 0;
  static CUR = 1;

  private offset = 0;
  private readonly view: DataView;

  constructor(buffer: ArrayBufferLike) {
    this.view = new DataView(buffer);
  }

  tell() {
    return this.offset;
  }

  seek(value: number, dir = RwStream.CUR) {
    if (dir === RwStream.BEG) {
      this.offset = value;
    } else {
      this.offset += value;
    }
  }

  readUint8() {
    const value = this.view.getUint8(this.offset);
    this.offset += 1;
    return value;
  }

  readUint16() {
    const value = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return value;
  }

  readUint32() {
    const value = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return value;
  }

  readInt32() {
    const value = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return value;
  }

  readFloat32() {
    const value = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return value;
  }

  read(size: number) {
    const value = this.view.buffer.slice(this.offset, this.offset + size);
    this.offset += size;
    return value;
  }

  readString(size: number) {
    const data = new Uint8Array(this.read(size));
    let value = '';
    for (const code of data) {
      if (code === 0) {
        break;
      }
      value += String.fromCharCode(code);
    }
    return value;
  }
}
