import test from 'ava';
import {
  stringToArrayBuffer,
  arrayBufferToBase64,
  encode,
  base64ToArrayBuffer,
  arrayBufferToString,
  docode,
} from '.';

const str = '一二三123abc⑴⑵⑶☆★✓';
const charCodeArray = [
  228, 184, 128, 228, 186, 140, 228, 184, 137, 49, 50, 51, 97, 98, 99, 226, 145,
  180, 226, 145, 181, 226, 145, 182, 226, 152, 134, 226, 152, 133, 226, 156,
  147,
];
const base64Str = '5LiA5LqM5LiJMTIzYWJj4pG04pG14pG24piG4piF4pyT';

test('stringToArrayBuffer', (t) => {
  const buffer = stringToArrayBuffer(str);

  const u8 = new Uint8Array(buffer);

  t.deepEqual([...u8], charCodeArray);
});

test('arrayBufferToBase64', (t) => {
  const b64 = arrayBufferToBase64(Uint8Array.from(charCodeArray).buffer);

  t.is(b64, base64Str);
});

test('encode', (t) => {
  const b64 = encode(str);

  t.is(b64, base64Str);
});

test('base64ToArrayBuffer', (t) => {
  const buffer = base64ToArrayBuffer(base64Str);
  const u8 = new Uint8Array(buffer);

  t.deepEqual([...u8], charCodeArray);
});

test('arrayBufferToString', (t) => {
  t.is(arrayBufferToString(Uint8Array.from(charCodeArray).buffer), str);
});

test('decode', (t) => {
  t.is(docode(base64Str), str);
});
