# Test

### 1. Jest 설치하기

```bash
npm i -D jest || yarn add -D jest

// 타입스크립트라면
npm i -D @types/jest ts-jest || yarn add -D @types/jest ts-jest
```

### 2. 테스트할 함수 및 파일 만들기

#### JavaScript

```js
// sum.js
const sum = (a, b) => {
  return a + b;
};
module.exports = sum;
```

#### TypeScript

```ts
// sum.ts
export const sum = (a: number, b: number) => {
  return a + b;
};
```

### 3. 실제 테스트가 담길 테스트 파일 만들기

```js
const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

```ts
import { sum } from "./sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

### 4. package.json 수정하기

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### 4-1. jest설정하기

타입스크립트를 사용한다면 jest가 ts-jest를 사용하고, ts파일을 테스트 한다고 알려야 한다. 최상위 레벨에 jest.config.js 파일을 만들어주자.

```js
// jest.config.js
module.exports = {
  preset: "ts-jest", // ts-jest를 사용한다고 알림
  testEnvironment: "node", // 노드js 환경에서 테스트
  testMatch: ["**/test/*.test.(ts|tsx)"], // test 폴더 안에 test.ts|tsx 파일을 테스트
};
```

### 5. npm test나 yarn test를 실행해서 확인하기

```bash
npm run test

// 결과
PASS  test/sum.test.ts
✓ adds 1 + 2 to equal 3 (2 ms)
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.106 s
```

제대로 완료했다면 다음과 같은 결과를 볼 수 있다.
