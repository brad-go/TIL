# 배열에서의 중복값

## 목차

- [배열에서 중복값 제거하기](#배열에서-중복값-제거하기)
- [배열에서 중복값 개수 구하기](#배열에서-중복값-개수-구하기)
  - [중복값 개수 응용](#중복값-개수-응용)

## 배열에서 중복값 제거하기

배열에서 중복되는 값을 제거하고 고유값만을 가진 배열로 만들기

1. `filter()`와 `indexOf()`로 제거하기
2. `Set` 객체와 `spread` 연산자
3. `filter()`와 객체의 `hasOwnProperty()` 사용하기

#### filter와 indexOf로 중복값 제거하기

##### 코드

```javascript
const arr = [1, 2, 3, 3, 3, 3, 4, 4];

const uniqueArr = arr.filter((value, index) => {
  return arr.indexOf(value) === index;
});

console.log(uniqueArr); // [1, 2, 3, 4]
```

##### 설명

- `filter()`에 하나씩 들어가는 배열 요소의 index를 구하기 위해 `indexOf()`사용
- `indexOf()`의 동일한 요소가 존재할 경우 맨 앞의 index를 반환하는 특징 이용
  ```javascript
  const uniqueArr = arr.filter((value, idx) => {
    console.log(arr.indexOf(value));
  }
  // 0, 1, 2, 2, 2, 2, 6, 6
  ```
- `filter()`를 돌고 있는 **item의 index**와 **indexOf()값**을 비교
- 두 값이 같다면 uniqueArr에 현재 배열 요소(item)를 추가하고, 다르다면 추가하지 않는다!

#### Set 객체와 spread 연산자

##### 코드

```javascript
const arr = [1, 2, 3, 3, 3, 3, 4, 4];

const setObj = new Set(arr);
const uniqueArr = [...setObj];

console.log(uniqueArr); // [1, 2, 3, 4]
```

##### 설명

- Set 객체는 고유한 값을 가지는 객체이다.
  `console.log(setObj) // Set(4) { 1, 2, 3, 4 }`
- Set객체를 통해 얻은 고유한 값을 spread 연산자를 이용해 배열에 넣어준다.

#### filter와 객체의 hasOwnProperty 사용하기

##### 코드

```javascript
const arr = [1, 2, 3, 3, 3, 3, 4, 4];

const obj = {};
const uniqueArr = arr.filter((item) => {
  return obj.hasOwnProperty(item) ? false : (obj[item] = true);
});

console.log(uniqueArr); // [1, 2, 3, 4]
```

##### 설명

- `hasOwnProperty()`는 객체의 메소드 중 하나로, 객체의 프로퍼티가 존재하는 지 확인하는 메소드이다.
  - **프로퍼티**: `key`-`value` 값을 가지는 데이터
  - 이 메소드는 **숫자와 문자열을 구분하지 않는다**.
  - 프로퍼티의 `value`가 아닌 `key`를 체크한다.
- `filter()`에 의해서 item이 하나씩 들어가서 조건에 부합하는지 확인한다.
- `obj.hasOwnProperty(item)`은 아이템이 있을 때 **true**
  - 전체 return 문은 **false**가 되고 다음 item으로 넘어간다.
- `obj.hasOwnProperty(item)`은 아이템이 없을 때 **false**
  - 전체 return 문은 **true**가 되고 uniqueArr에 item을 넣는다. 그리고 obj의 `key`값으로 `item`을 넣어주고 `value`로 `true`를 넣어준다.

## 배열에서 중복값 개수 구하기

배열에서 중복되는 값을 찾으려면 어떻게 해야할까?

1. `forEach()`로 중복값 개수 찾기
2. `reduce()`로 중복값 개수 찾기
3. `map()`으로 중복값 개수 찾기

#### forEach로 중복값 개수 찾기

##### 코드

```javascript
const arr = [1, 2, 3, 3, 3, 3, 4, 4];

const result = {};
arr.forEach((item) => {
  result[item] = result[item || 0] + 1;
});
console.log(result);
```

##### 설명

- 중복된 값의 개수를 저장할 객체 `result`
- 배열의 원소들을 순서대로 콜백함수에 전달해주는 `forEach()`
- ```js
  result[item] = result[item || 0] + 1;
  ```

  이 코드를 풀어쓰면 아래와 같다.

  ```javascript
  if (result[item]) {
    result[item] += 1;
  } else {
    result[item] = 0 + 1;
  }
  ```

  &nbsp;배열의 첫 번째 값 1이 들어오면 `result[item]`(= `result.item`)은 `undefined`이다. 그래서 `result`에 프로퍼티의 key 값으로 item을 넣어주고 value로 1을 넣어준다. (하나가 들어온 거니까)

  &nbsp;두번째, 세번재 값 2, 3도 마찬가지이고, 네번째 값인 3이 들오면 `result.3`(=`result[3]`)의 값이 이미 세팅 되어 있으므로 조건에 부합하고 `result[item] += 1`이 되어 value에 1이 더해진다.

  객체에 프로퍼티의 key값을 동적으로 추가하기 위해 _점 표기법_ 대신에 **대괄호 표기법**을 사용한 것에 주의하자!

#### reduce로 중복값 개수 찾기

##### 코드

```
const result = arr.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0 + 1);
  return acc;
}, {})
```

##### 설명

- `forEach()`를 `reduce()`에 맞게 그대로 변경한 것이다.
- `reduce()`는 배열의 값을 순회하면서 배열의 값을 특정 형태로 누적하는데 사용한다.
  ```
  { '1': 1 }
  { '1': 1, '2': 1 }
  { '1': 1, '2': 1, '3': 1 }
  { '1': 1, '2': 1, '3': 2 }
  { '1': 1, '2': 1, '3': 3 }
  { '1': 1, '2': 1, '3': 4 }
  { '1': 1, '2': 1, '3': 4, '4': 1 }
  { '1': 1, '2': 1, '3': 4, '4': 2 }
  { '1': 1, '2': 1, '3': 4, '4': 2 }
  ```
- `reduce()`의 두번째 인자에 초깃값으로 빈 객체를 넣어서 객체라는 것을 알렸다.

#### map으로 중복값 개수 찾기

##### 코드

```js
const result = arr.reduce((acc, cur) => {
  acc.set(cur, (acc.get(cur) || 0) + 1);
  return acc;
}, new Map());
console.log(result);
```

##### 설명

- `reduce()`를 응용한 것으로 중요한 점은 **Map()은 객체를 key로 저장할 수도 있다**는 것!
- `set()`을 통해 현재 item(cur)이 저장되어 있는지 확인하고 없다면 value를 1로 저장, 있다면 value에 1을 추가
- `get()`은 현재 item(cur)이 key값으로 있다면 값을 가져온다.

## 중복값 개수 응용

배열에 중복값이 있는지 확인하고 그 중복값의 개수만 출력하기

#### Version #1

```js
// 중복값이 있다면 개수를 세서 반환하는 함수
function countOf(arr, value) {
  let count = 0;
  arr.forEach((item) => {
    if (item === value) count++;
  });
  return count;
}

// 중복값의 개수를 담을 배열
const answer = [];

const set = new Set([]);
arr.forEach((item) => {
  // set에 item이 있다면 다음 item으로 넘어감
  if (set.has(item)) return;
  // 없다면 set에 item을 넣고
  set.add(item);
  // 위에 정의한 함수를 통해서 arr배열에 몇 개나 있는지 확인
  count = countOf(arr, item);
  // 중복값이라면 answer 배열에 넣어주기
  if (count > 1) answer.push(count);
});
// 중복되는 값이 없다면 -1을 넣어줌
if (answer.length === 0) answer.push(-1);

console.log(answer);
```

#### Version #2

```js
const answer = [];
const map = new Map();
arr.forEach((item) => {
  map.set(item, (map.get(item) || 0) + 1);
  // if (map.has(item)) {
  //   map.set(item, map.get(item) + 1);
  // } else {
  //   map.set(item, 1)
  // }
});
map.forEach((value) => {
  if (value > 1) {
    answer.push(value);
  }
});
if (answer.length === 0) answer.push(-1);

console.log(answer);
```

## 참고

- [배열 중복 값 개수 구하기](https://hianna.tistory.com/459)
