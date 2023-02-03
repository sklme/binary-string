export function stringToArrayBuffer(str: string) {
  // 先转为utf8编码所代表的字符串
  const encoded = encodeURIComponent(str);
  // 将%E4%B8的utf8字符串转换成0xE40xD8这样的16进制字符串，然后转成arrayBuffer
  const bytes = [...encoded.matchAll(/%(?<hex>[0-9A-F]{2})/g)].map(([, p1]) => {
    console.log(p1);
    return parseInt(`0x${p1}`, 16);
  });

  return Uint8Array.from(bytes).buffer;
}

export function arrayBufferToBase64(buffer: ArrayBufferLike) {
  const u8 = new Uint8Array(buffer);

  // 将这些二进制转成对应的字符串
  const utf8Str = [...u8]
    .map((n) => {
      return String.fromCharCode(n);
    })
    .join();

  return btoa(utf8Str);
}
