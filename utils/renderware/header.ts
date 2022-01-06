import { RwStream } from './stream';

export class HeaderAssertionError extends Error {}

export class Header {
  readonly id: number;
  readonly size: number;
  readonly build: number;
  readonly version: number;

  constructor(rw: RwStream) {
    this.id = rw.readUint32();
    this.size = rw.readUint32();
    this.build = rw.readUint32();
    this.version =
      this.build & 0xffff0000
        ? ((this.build >> 14) & 0x3ff00) | ((this.build >> 16) & 0x3f) | 0x30000
        : this.build << 8;
  }

  static assert(rw: RwStream, expected: number): Header {
    const header = new Header(rw);
    if (header.id !== expected) {
      throw new HeaderAssertionError(
        `expected: ${expected} actual: ${header.id}`
      );
    }
    return header;
  }
}
