# 자바스크립트에서 문자열 잘라내기

자바스크립트에서 문자열을 잘라내는 방법으로 `slice()`, `substring()`이 있다. 모두 비슷한 함수인데, 어떻게 다를까?

> 참고: `substr()`은 제거될 수 있고, 잘 사용되지 않는다.

## 목차

1. [slice](#slice)
2. [substring](#substring)
3. [slice와 substring의 차이](#slice와-substring의-차이)

## slice

`slice()` 메서드는 문자열의 일부를 추출하면서 새로운 문자열을 반환한다. 문자열의 각 문자들을 배열의 각 요소라고 생각하면 된다. 배열과 마찬가지로 인덱스 0부터 시작된다.

```js
str.slice(beginIndex, endIndex);
```

- 시작 인덱스(`beginIndex`)를 필수적으로 입력받으며, 마지막 인덱스는 선택적이다.
- 시작 인덱스가 `undefined`인 경우에는, `0`번 인덱스부터 잘라낸다.
- 시작 인덱스가 문자열의 길이보다 큰 경우에는, 빈 문자열을 반환합니다.
- 마지막 인덱스(`endIndex`)가 생략되면 문자열의 마지막까지 추출한다.
- 마지막 인덱스를 매개변수로 전달하면 해당 인덱스는 추출에 포함되지 않고, 그 전까지의 문자열을 반환한다.
- 만약 마지막 인덱스 값이 배열의 길이보다 크다면, `slice()`는 배열의 끝까지(arr.length) 추출한다.
- 전달한 인덱스가 음수라면 `문자열의 길이 + endIndex`로 취급된다. (예를 들어 마지막 문자를 출력하려면 `str.slice(-1)`)

```js
const str = "Hello World";

console.log(str.slice(0, 5)); // Hello
console.log(str.slice(6, 11)); // World
console.log(str.slice()); // Hello World
console.log(str.slice(12)); //
console.log(str.slice(-1)); // d
```

## substring

`substring()` 메서드는 string 객체의 시작 인덱스로부터 종료 인덱스 전까지 문자열의 부분 문자열을 반환한다.

```js
str.substring(indexStart, indexEnd);
```

- 시작 인덱스(`indexStart`)를 필수적으로 입력받으며, 마지막 인덱스는 선택적이다.
- 마지막 인덱스(`indexEnd`)가 생략되면 문자열의 마지막까지 추출한다.
- 만약 `indexStart` 가 `indexEnd`와 같을 경우, 빈 문자열을 반환한다.
- 만약 `indexStart` 가 `indexEnd`보다 큰 경우, substring() 메서드는 마치 두 개의 인자를 바꾼 듯 작동하게 된다.
- `0`보다 작은 인자 값을 가지는 경우에는 `0`으로, `stringName.length` 보다 큰 인자 값을 가지는 경우, `stringName.length` 로 처리된다. `NaN` 값은 `0`으로 처리된다.

```js
const str = "Hello World";

console.log(str.substring(0, 5)); // Hello
console.log(str.substring(6, 11)); // World
console.log(str.substring(6, 6)); //
console.log(str.substring(11, 6)); // World
console.log(str.substring(13, -1)); // Hello World
```

## slice와 substring의 차이

둘은 거의 비슷하게 작동하지만 약간의 차이가 있다.

#### 시작인덱스가 마지막 인덱스보다 클 때

- `slice()`는 빈 문자열을 반환한다.
- `substring()`은 두 인덱스의 위치를 바꾼 듯 작동한다.

```js
const str = "Hello World";

console.log(str.slice(11, 6)); //
console.log(str.substring(11, 6)); // World
```

#### 음수가 주어졌을 때

- `slice()`는 음수 값이 주어지면 인덱스를 찾기 위해 문자열의 끝에서 역방향으로 계산한다.
- `substring()`은 음수를 0으로 처리한다.

```js
const str = "Hello World";

console.log(str.slice(-11, 6)); // Hello
console.log(str.slice(-11, -6)); // Hello

console.log(str.substring(-11, 6)); // Hello
console.log(str.substring(-11, -6)); //
```

## 참고

- [MDN](https://developer.mozilla.org/ko/)
