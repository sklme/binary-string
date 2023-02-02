import test from 'ava';
import { stringToArrayBuffer } from '.';

test('dom字符串转为arrayBuffer', (t) => {
  const r = stringToArrayBuffer('一二三123abc⑴⑵⑶');

  console.log(r);
  t.is(1, 1);
});
