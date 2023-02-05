import { BaseTransformer } from '../shared/base-transformer';

/**
 * 那字符串转换成代表着utf8的编码的arrayBuffer
 * 假设有 '一二三abc'。
 * 先用encodeUri 转成: `%E4%B8%80%E4%BA%8C%E4%B8%89abc`。
 * 然后再转成[228, 184, 128, 228, 186, 140, 228, 184, 137, 97, 98, 99]， 1字节的abc会取其charCode: 97，98，99。
 * 然后将数组转成arrayBuffer
 *
 * @param str 需要转换的字符串
 */
export function stringToArrayBuffer(str: string) {
  const encoded = encodeURIComponent(str);
  const charCodes: number[] = [];
  let i = 0;
  while (encoded[i]) {
    if (encoded[i] === '%') {
      const substr = encoded.slice(i, i + 3);
      charCodes.push(parseInt(substr.slice(-2), 16));
      i += 3;
    } else {
      charCodes.push(encoded[i].charCodeAt(0));
      i++;
    }
  }

  return Uint8Array.from(charCodes).buffer;
}

export function arrayBufferToBase64(buffer: ArrayBufferLike) {
  const u8 = new Uint8Array(buffer);
  const oneByteChars = String.fromCharCode(...u8);
  return btoa(oneByteChars);
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
  const u8 = new Uint8Array(buffer);

  const str = [...u8]
    .map((o) => {
      return `%${o.toString(16)}`;
    })
    .join('');

  return decodeURIComponent(str);
}

export function decode(base64: string) {
  return arrayBufferToString(base64ToArrayBuffer(base64));
}

export class Transformer extends BaseTransformer {
  _decode = decode;
  _encode = encode;
  arrayBufferToString = arrayBufferToString;
  base64ToArrayBuffer = base64ToArrayBuffer;
  arrayBufferToBase64 = arrayBufferToBase64;
  stringToArrayBuffer = stringToArrayBuffer;
}
