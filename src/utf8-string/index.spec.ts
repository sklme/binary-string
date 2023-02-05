import test, { ExecutionContext } from 'ava';
import {
  stringToArrayBuffer,
  arrayBufferToBase64,
  encode,
  base64ToArrayBuffer,
  arrayBufferToString,
  decode,
  Transformer,
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
  t.is(decode(base64Str), str);
});

function testEncoder(transformer: Transformer, t: ExecutionContext) {
  t.is(transformer.decode(), str);
  t.is(transformer.encode(), base64Str);

  const arrayBuffer = transformer.getArrayBuffer();

  if (!arrayBuffer) {
    t.fail();
  } else {
    t.deepEqual([...new Uint8Array(arrayBuffer)], charCodeArray);
  }
}

test('Transformer, 来源是原始字符串', (t) => {
  // 默认sourceType
  const transformer = new Transformer(str);
  // 指定sourceType
  const passTypeTransformer = new Transformer(str, 'string');

  testEncoder(transformer, t);
  testEncoder(passTypeTransformer, t);
});

test('Transformer, 来源是ArrayBuffer', (t) => {
  // 默认sourceType
  const transformer = new Transformer(Uint8Array.from(charCodeArray).buffer);
  // 指定sourceType
  const passTypeTransformer = new Transformer(
    Uint8Array.from(charCodeArray).buffer,
    'arrayBuffer',
  );

  testEncoder(transformer, t);
  testEncoder(passTypeTransformer, t);
});

test('Transformer, 来源是base64', (t) => {
  // 默认sourceType
  const transformer = new Transformer(base64Str, 'base64String');

  testEncoder(transformer, t);
});
