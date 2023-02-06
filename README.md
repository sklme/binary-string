二进制与字符串互转。

因为 js 的字符编码其实是一个 UTF16String，不是 utf8。所以在 js 内部自己转换，与传输到其他地方的转换是不一样的（因为传输到其他地方一般是 utf8 编码的 base64）。

可以获取到三种状态

1. 原始字符串
2. 中间状态的 arrayBuffer
3. 转换后可以直接传输的 base64

api 文档：https://sklme.github.io/binary-string/

# 安装

```shell
npm install @iskl/binary-string
yarn add @iskl/binary-string
pnpm add @iskl/binary-string
```

# 使用方法

## 实例化

### uf8string

将字符串作为 utf8 编码转换

```typescript
import { UTF8Transformer } from '@iskl/binary-string';

const utf8Transformer = new UTF8Transformer('一二三123abc⑴⑵⑶☆★✓');
// 传入数据类型
const base64SourceDomTransformer = new UTF8Transformer(
  '5LiA5LqM5LiJMTIzYWJj4pG04pG14pG24piG4piF4pyT',
  'base64String',
);

utf8Transformer.encode(); // 5LiA5LqM5LiJMTIzYWJj4pG04pG14pG24piG4piF4pyT
utf8Transformer.decode(); // 一二三123abc⑴⑵⑶☆★✓
utf8Transformer.getArrayBuffer();

base64SourceDomTransformer.encode(); // 5LiA5LqM5LiJMTIzYWJj4pG04pG14pG24piG4piF4pyT
base64SourceDomTransformer.decode(); // 一二三123abc⑴⑵⑶☆★✓
base64SourceDomTransformer.getArrayBuffer();
```

### dom-string

将字符串作为 UTF16 编码转换

```typescript
import { DomStringTransformer } from '@iskl/binary-string';

const domTransformer = new DomStringTransformer('一二三123abc⑴⑵⑶☆★✓');
// 传入数据类型
const base64SourceDomTransformer = new DomStringTransformer(
  'AE6MTglOMQAyADMAYQBiAGMAdCR1JHYkBiYFJhMn',
  'base64String',
);

domTransformer.encode(); // AE6MTglOMQAyADMAYQBiAGMAdCR1JHYkBiYFJhMn
domTransformer.decode(); // 一二三123abc⑴⑵⑶☆★✓
domTransformer.getArrayBuffer();

base64SourceDomTransformer.encode(); // AE6MTglOMQAyADMAYQBiAGMAdCR1JHYkBiYFJhMn
base64SourceDomTransformer.decode(); // 一二三123abc⑴⑵⑶☆★✓
base64SourceDomTransformer.getArrayBuffer();
```

## 简单使用

### uf8string

将字符串作为 utf8 编码转换

```typescript
import {
  stringToArrayBuffer, // 原始字符串转为中间二进制
  arrayBufferToBase64, // 中间二进制转为base64字符串
  base64ToArrayBuffer, // base64字符串转为中间二进制
  arrayBufferToString, // 中间二进制转为原始字符串
  encode, // 原始字符串转为base64字符串
  decode, // base64字符串转为原始字符串
} from '@iskl/binary-string/utf8-string';

encode('一二三123abc⑴⑵⑶☆★✓'); // < 5LiA5LqM5LiJMTIzYWJj4pG04pG14pG24piG4piF4pyT
decode('5LiA5LqM5LiJMTIzYWJj4pG04pG14pG24piG4piF4pyT'); // 一二三123abc⑴⑵⑶☆★✓
```

### dom-string

将字符串作为 UTF16 编码转换

```typescript
import {
  stringToArrayBuffer, // 原始字符串转为中间二进制
  arrayBufferToBase64, // 中间二进制转为base64字符串
  base64ToArrayBuffer, // base64字符串转为中间二进制
  arrayBufferToString, // 中间二进制转为原始字符串
  encode, // 原始字符串转为base64字符串
  decode, // base64字符串转为原始字符串
} from '@iskl/binary-string/dom-string';

encode('一二三123abc⑴⑵⑶☆★✓'); // < AE6MTglOMQAyADMAYQBiAGMAdCR1JHYkBiYFJhMn
decode('AE6MTglOMQAyADMAYQBiAGMAdCR1JHYkBiYFJhMn'); // 一二三123abc⑴⑵⑶☆★✓
```
