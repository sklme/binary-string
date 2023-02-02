export function stringToArrayBuffer(str: string) {
  // 因为js字符串是16位，使用Uint16Array转为成arrayBuffer
  const codeUnits = new Uint16Array(str.length);

  for (let i = 0; i < codeUnits.length; i++) {
    console.log(str.charCodeAt(i));
    codeUnits[i] = str.charCodeAt(i);
  }

  return codeUnits.buffer;
}
