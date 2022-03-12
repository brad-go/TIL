# [JavaScript] 배열 객체 내 중복값 제거하기

프로젝트를 진행하다가 배열 내 객체 프로퍼티 값 중에 중복으로 들어간 것을 제거하는 과정이 필요했다. 그래서 찾아보고 정리하게 되었다.

## 예시

```js
const list = [
  { id: 11110, name: "월평동" },
  { id: 11110, name: "월평동" },
  { id: 11110, name: "월평동" },
  { id: 11111, name: "둔산동" },
  { id: 11111, name: "둔산동" },
  { id: 11112, name: "봉명동" },
  { id: 11112, name: "봉명동" },
  { id: 11112, name: "봉명동" },
];
```

간략히 요약했지만, 이러한 객체를 이용해 화면에 렌더링 중이었는데, 중복된 값을 제거하고 싶었다.

## 해결 방안

### 1. reduce

여러 방법을 시도 중에 reduce를 이용해서 해결할 수 있었다.

```js
list.reduce((acc, cur) => {
  if (acc.findIndex(({ id }) => id === cur.id) === -1) {
    acc.push(cur);
  }
  return acc;
}, []);

// [{id: 11110, name: '월평동'}, {id: 11111, name: '둔산동'}, {id: 11112, name: '봉명동'}]
```

- 누산기(accumulator)를 이용해서 중복을 제거하는 방법이다.
- [findIndex()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)는 주어진 판별함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환한다. 만족하는 요소가 없으면 **-1**을 반환한다.
- list의 각 객체가 가진 id값을 비교해서 만족하는 요소가 없는 경우에만 `push()`해서 결과를 반환한다.

```js
list.reduce((acc, cur) => {
  if (acc.findIndex(({ name }) => name === cur.name) === -1) {
    acc.push(cur);
  }
  return acc;
}, []);
```

이렇게 작성해서 이름 값을 비교해도 같은 결과를 반환한다!

### 2. filter

#### 첫번째

```js
list.filter((item, i) => {
  return (
    list.findIndex((li) => {
      return item.id === li.id;
    }) === i
  );
});
```

### 두번째

```js
list.filter(
  (arr, idx, callback) => idx === callback.findIndex((li) => li.id === arr.id)
);
```

- 필터의 3번째 인자로 callback함수를 전달해서 중복 제거하기

### 3. Set

```js
[...new Set(list.map(JSON.stringify))].map(JSON.parse);
```

- Set을 이용하여 중복을 제거한다.
- Set은 반복 가능한 객체가 전달된 경우, 그 요소는 모두 새로운 Set에 추가된다.
- list가 객체이기 때문에 `JSON.stringify`를 이용해 배열로 만들어주고, Set 객체에 넣어서 고유 값으로 변경 후 다시 파싱해준다.

#### 주의사항

```js
const list = [
  { id: 11110, name: "월평동" },
  { id: 11110, name: "둔산동" },
  { id: 11110, name: "봉명동" },
];

console.log([...new Set(list.map(JSON.stringify))].map(JSON.parse));
// [{id: 11110, name: '월평동'}, {id: 11110, name: '둔산동'}, {id: 11110, name: '봉명동'}]
```

- 위와 같이 id가 같아도 다른 속성이 있다면 중복이라 생각하지 않고 반환한다.
- **객체의 속성이 1개만 있거나, 객체 값이 완전히 같은 것에서 중복을 제거 할 경우만 `new Set`을 써야 한다!**
