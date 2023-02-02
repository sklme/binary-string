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
