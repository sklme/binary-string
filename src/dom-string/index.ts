export function stringToArrayBuffer(str: string) {
  // 因为js字符串是16位，使用Uint16Array转为成arrayBuffer
  const codeUnits = new Uint16Array(str.length);

  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = str.charCodeAt(i);
  }

  return codeUnits.buffer;
}

export function arrayBufferToBase64(buffer: ArrayBufferLike) {
  // base64的转换只接受占一个字节的字符，所以要把arrayBuffer读取为unu8Array，然后转为字符，最后转成base16
  // 1. arrayBuffer读取为unu8Array
  const u8 = new Uint8Array(buffer);
  // 2. 转为字符
  const oneByteChars = String.fromCharCode(...u8);
  // 3. 转为base64
  const b64 = btoa(oneByteChars);
  return b64;
}

export function encode(str: string) {
  return arrayBufferToBase64(stringToArrayBuffer(str));
}

export function base64ToArrayBuffer(base64: string) {
  // 获取到base64的字符串
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  return bytes.buffer;
}

export function arrayBufferToString(buffer: ArrayBufferLike) {
  return String.fromCharCode(...new Uint16Array(buffer));
}

export function decode(base64: string) {
  return arrayBufferToString(base64ToArrayBuffer(base64));
}

export type SourceType = 'string' | 'arrayBuffer' | 'base64String';

export class DomStringEncoder {
  // 缓存
  #base64String = '';
  #string = '';
  #arrayBuffer: ArrayBufferLike = new ArrayBuffer(0);

  // 数据类型
  #sourceType: SourceType;
  #source: string | ArrayBufferLike = '';

  constructor(source: string | ArrayBuffer, sourceType?: SourceType) {
    // 判断数据来源的类型
    this.#source = source;

    if (sourceType) {
      this.#sourceType = sourceType || '';
    } else {
      if (source instanceof ArrayBuffer) {
        this.#sourceType = 'arrayBuffer';
      } else {
        this.#sourceType = 'string';
      }
    }
  }

  encode() {
    if (this.#base64String) return this.#base64String;

    if (this.#sourceType === 'string') {
      return (this.#base64String = encode(this.#source as string));
    } else if (this.#sourceType === 'arrayBuffer') {
      return (this.#base64String = arrayBufferToBase64(
        this.#source as ArrayBufferLike,
      ));
    } else if (this.#sourceType === 'base64String') {
      return (this.#base64String = this.#source as string);
    }

    return undefined;
  }

  decode() {
    if (this.#string) return this.#string;

    if (this.#sourceType === 'string') {
      return (this.#string = this.#source as string);
    } else if (this.#sourceType === 'arrayBuffer') {
      return (this.#string = arrayBufferToString(
        this.#source as ArrayBufferLike,
      ));
    } else if (this.#sourceType === 'base64String') {
      return (this.#string = decode(this.#source as string));
    }

    return undefined;
  }

  getArrayBuffer() {
    if (this.#arrayBuffer.byteLength) return this.#arrayBuffer;

    if (this.#sourceType === 'string') {
      return (this.#arrayBuffer = stringToArrayBuffer(this.#source as string));
    } else if (this.#sourceType === 'arrayBuffer') {
      return (this.#arrayBuffer = this.#source as ArrayBufferLike);
    } else if (this.#sourceType === 'base64String') {
      return (this.#arrayBuffer = base64ToArrayBuffer(this.#source as string));
    }

    return undefined;
  }
}
