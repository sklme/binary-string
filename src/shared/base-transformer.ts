import { SourceType } from '../type';

export abstract class BaseTransformer {
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

  abstract arrayBufferToBase64(buffer: ArrayBufferLike): string;
  abstract arrayBufferToString(buffer: ArrayBufferLike): string;
  abstract stringToArrayBuffer(str: string): ArrayBufferLike;
  abstract base64ToArrayBuffer(str: string): ArrayBufferLike;
  abstract _encode(str: string): string;
  abstract _decode(base64String: string): string;

  encode() {
    if (this.#base64String) return this.#base64String;

    if (this.#sourceType === 'string') {
      return (this.#base64String = this._encode(this.#source as string));
    } else if (this.#sourceType === 'arrayBuffer') {
      return (this.#base64String = this.arrayBufferToBase64(
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
      return (this.#string = this.arrayBufferToString(
        this.#source as ArrayBufferLike,
      ));
    } else if (this.#sourceType === 'base64String') {
      return (this.#string = this._decode(this.#source as string));
    }

    return undefined;
  }

  getArrayBuffer() {
    if (this.#arrayBuffer.byteLength) return this.#arrayBuffer;

    if (this.#sourceType === 'string') {
      return (this.#arrayBuffer = this.stringToArrayBuffer(
        this.#source as string,
      ));
    } else if (this.#sourceType === 'arrayBuffer') {
      return (this.#arrayBuffer = this.#source as ArrayBufferLike);
    } else if (this.#sourceType === 'base64String') {
      return (this.#arrayBuffer = this.base64ToArrayBuffer(
        this.#source as string,
      ));
    }

    return undefined;
  }
}
