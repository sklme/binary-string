import test, { ExecutionContext } from 'ava';
import {
  stringToArrayBuffer,
  arrayBufferToBase64,
  encode,
  base64ToArrayBuffer,
  arrayBufferToString,
  decode,
  DomStringEncoder,
} from '.';

const str = '一二三123abc⑴⑵⑶☆★✓';
const charCodeArray = [
  19968, 20108, 19977, 49, 50, 51, 97, 98, 99, 9332, 9333, 9334, 9734, 9733,
  10003,
];
const b64 = 'AE6MTglOMQAyADMAYQBiAGMAdCR1JHYkBiYFJhMn';

test('dom字符串转为arrayBuffer', (t) => {
  const buffer = stringToArrayBuffer(str);
  const u16 = new Uint16Array(buffer);

  t.deepEqual([...u16], charCodeArray);
});

test('arrayBuffer转为base64', (t) => {
  const { buffer } = Uint16Array.from(charCodeArray);

  const base64 = arrayBufferToBase64(buffer);

  t.is(b64, base64);
});

test('dom字符串encode', (t) => {
  t.is(b64, encode(str));
});

test('base64转为arrayBuffer', (t) => {
  const buffer = base64ToArrayBuffer(b64);

  t.deepEqual([...new Uint16Array(buffer)], charCodeArray);
});

test('arrayBufferToString', (t) => {
  const { buffer } = Uint16Array.from(charCodeArray);

  t.is(arrayBufferToString(buffer), str);
});

test('dom字符串decode', (t) => {
  t.is(decode(b64), str);
});

function testEncoder(encoder: DomStringEncoder, t: ExecutionContext) {
  t.is(encoder.decode(), str);
  t.is(encoder.encode(), b64);

  const arrayBuffer = encoder.getArrayBuffer();

  if (!arrayBuffer) {
    t.fail();
  } else {
    t.deepEqual([...new Uint16Array(arrayBuffer)], charCodeArray);
  }

  // return {
  //   encoded: encoder.encode(),
  //   decoded: encoder.decode(),
  //   arrayBuffer: encoder.getArrayBuffer(),
  // };
}

test('encoder: 来源为string', (t) => {
  const encoder = new DomStringEncoder(str);
  const passTypeEncoder = new DomStringEncoder(str, 'string');

  testEncoder(encoder, t);
  testEncoder(passTypeEncoder, t);
});

test('encoder: 来源为base64String', (t) => {
  const encoder = new DomStringEncoder(b64, 'base64String');
  testEncoder(encoder, t);
});

test('encoder: 来源为arrayBuffer', (t) => {
  const { buffer } = Uint16Array.from(charCodeArray);
  const encoder = new DomStringEncoder(buffer);
  const passTypeEncoder = new DomStringEncoder(buffer, 'arrayBuffer');

  testEncoder(encoder, t);
  testEncoder(passTypeEncoder, t);
});
