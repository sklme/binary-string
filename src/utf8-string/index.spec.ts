import test from 'ava';
import { stringToArrayBuffer, arrayBufferToBase64 } from '.';

const str = '一二三123abc⑴⑵⑶☆★✓';
const charCodeArray = [
  228, 184, 128, 228, 186, 140, 228, 184, 137, 226, 145, 180, 226, 145, 181,
  226, 145, 182, 226, 152, 134, 226, 152, 133, 226, 156, 147,
];

test('stringToArrayBuffer', (t) => {
  const buffer = stringToArrayBuffer(str);

  const u8 = new Uint8Array(buffer);

  t.deepEqual([...u8], charCodeArray);
});

test.skip('arrayBufferToBase64', () => {
  const b64 = arrayBufferToBase64(Uint8Array.from(charCodeArray).buffer);

  console.log(b64);
});

// function b64EncodeUnicode(str) {
//   // first we use encodeURIComponent to get percent-encoded UTF-8,
//   // then we convert the percent encodings into raw bytes which
//   // can be fed into btoa.
//   return btoa(
//     encodeURIComponent(str).replace(
//       /%([0-9A-F]{2})/g,
//       function toSolidBytes(match, p1) {
//         return String.fromCharCode('0x' + p1);
//       },
//     ),
//   );
// }

// console.log(1);
// console.log(b64EncodeUnicode(str));
// console.log(1);
