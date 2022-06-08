# 객체와 배열 복사하기

## 목차

1. [객체 및 배열의 복사](#객체와-배열-복사하기)
2. [얕은 복사와 깊은 복사](#2-얕은-복사shallow-copy와-깊은-복사deep-copy)
3. [객체(Object) 복사하기](#3-객체object-복사하기)
4. [배열(Array) 복사하기](#4-배열array-복사하기)
5. [제대로 깊은 복사하기](#5-제대로-깊은-복사deep-copy하기)

## 1. 객체 및 배열의 복사

자바스크립트에서 객체를 복사하려고 하면 어떻게 해야할까? 우선 자바스크립트의 데이터 타입에 대해 알아보자.

이 데이터 타입은 크게 `객체`(객체, 배열)와 객체가 아닌 `원시값`으로 구분할 수 있다. 객체가 아닌 데이터 타입에는 `문자`, `숫자`, `boolean` 등이 있으며 이러한 원시값에는 **참조**의 개념이 존재하지 않는다.

그러나 객체에는 데이터 불변성을 유지시키기 위해 참조의 개념이 존재한다. 객체에서 원시값을 `=`(대입 연산자)를 통해 복사하게 된다면, 복사가 아닌 참조가 된다.

```js
const arr = [1, 2, 3, 4];
const arr_copy = arr;

arr_copy[0] = "a";

console.log(arr); // ['a', 2, 3, 4]
console.log(arr === arr_copy); // true
```

위의 코드와 같이 **객체의 복사본을 수정하게 되면 원본도 함께 수정**된다. 그 이유는 객체는 값을 복사하는 것이 아니라 **참조**를 하기 때문이다. 즉, 같은 메모리 주소를 가리키고 있다는 말이며 이는 **얕은 복사(shallow copy)** 를 의미한다.. 그러므로 `arr`과 `arr_copy`는 완전히 동일한 객체가 되면서 `arr === arr_copy`가 `true`가 된다.

[⬆ Back to top](#목차)
<br />

## 2. 얕은 복사(Shallow Copy)와 깊은 복사(Deep Copy)

### 얕은 복사란?

```js
const obj1 = { a: 1, b: 2 };
const obj2 = obj1;

console.log(obj1 === obj2); // true;

obj2.a = 100;

console.log(obj1.a); // 100
```

- 위의 예시처럼 **객체를 직접 대입**하는 경우 **참조에 의한 할당**이 이루어지므로 **둘은 같은 데이터 주소를 가지게 된다**.
- 같은 주소를 참조하기 때문에 한 쪽의 데이터를 수정하면, 다른 한 쪽의 데이터도 변경된다.
- 이것을 **얕은 복사**라고 한다.

### 깊은 복사란?

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj };

console.log(obj1 === obj2); // false;

obj2.a = 100;

console.log(obj1.a); // 1
```

- 얕은 복사처럼 주소를 복사해서 공유하는 것이 아니라, **객체의 속성(property)을 복사**해 **새로운 객체를 생성**한다.
- 이것을 **깊은 복사**라고 한다.

[⬆ Back to top](#목차)
<br />

## 3. 객체(Object) 복사하기

### 3-1. Spread(...) 연산자를 이용한 객체 복사

```js
const user1 = { name: "brad", age: 18 };
const user2 = { ...user1 };

console.log(user1 === user2); // false
user2.name = "john";

console.log(user1); // { name: "brad", age: 18 };
console.log(user2); // { name: "john", age: 18 };
```

#### 참고: spread 연산자로 2레벨 깊이까지 복사하기

```js
const obj1 = { a: { b: 1, c: 1 }, d: 2 };
const obj2 = { ...obj1, a: { ...obj1.a } };

obj1.a.b = 100;

console.log(obj1 === obj2); // false
console.log(obj2.a.b); // 1
```

이는 사실 객체의 깊은 복사가 이루어지는 것이 아니라 객체의 프로퍼티만을 복사해 새로운 객체를 반환하는 것이다. 다른 말로 객체의 얕은 복사본을 새로운 객체에 대입해준다. 2레벨에서는 얕은 복사가 이루어지므로, 완전한 깊은 복사라고는 할 수 없다.

### 3-2. Object.assign을 이용한 객체 복사

첫번째 인자 값으로 빈 객체를 전달함으로 객체가 가진 속성의 값들의 복사가 가능하다.

```js
const user1 = { name: "brad", age: 18 };
const user2 = Object.assign({}, user1);

console.log(user1 === user2); // false
user2.name = "john";

console.log(user1); // { name: "brad", age: 18 };
console.log(user2); // { name: "john", age: 18 };
```

#### 참고: Ojbect.assing(obj1, obj2)

Object.assign은 객체 메서드로써, 첫번째 인자로 넘긴 객체에 두번째 인자로 넘기는 객체를 덮어쓸 때 사용된다.

```js
const user1 = { name: "brad", age: 18 };
const user2 = { age: 26, job: "student" };

Object.assign(user1, user2); // { name: 'brad', age: 26, job: 'student' };
```

위의 `spread 연산자`나 `Object.assign()` 통해서 객체의 복사를 할 수 있다. 같은 주소를 참조하지 않기 때문에, 한 쪽의 값을 변경해도 다른 한 쪽의 값이 변경되지 않는다. 그러나 MDN의 설명을 보면, 이는 **1레벨 깊이에서만 제대로 동작한다. 2레벨 깊이부터는 얕은 복사가 이루어진다.** 왜 이렇게 동작하는 것일까?

> 얕은 복사란 객체를 복사할 때 위의 예들처럼 기존 값과 복사된 값이 같은 참조를 가리키고 있는 것을 말한다. 위의 예시는 깊은 복사로 볼 수 있다. 그러나 제대로 사용하지 않는 경우 2레벨의 객체부터는 제대로 복사가 되지 않는다. 같은 주소값을 참조하고 있기 때문이다. 이처럼 **객체 안에 객체가 있을 경우 한 개의 객체라도 원본 객체를 참조하고 있다면 이를 얕은 복사**라고 한다.

[⬆ Back to top](#목차)
<br />

## 4. 배열(Array) 복사하기

### 4-1. Array.slice를 이용한 배열 복사

`slice` 메서드에 인자를 전달하지 않으면, 배열의 복사가 가능하다. **원본 배열에서 요소의 얕은 복사본을 반환해서 새 배열로 복사한다.**

```js
const arr = [1, 2, 3];
const arr_copy = arr.slice();

console.log(arr === arr_copy);

arr_copy[0] = 100;

console.log(arr); // [1, 2, 3]
console.log(arr_copy); // [100, 2, 3]
```

#### 참고: Array.prototype.slice(begin, end)

slice 메서드는 index값을 통해 begin부터 end 전까지 배열의 복사가 가능하다. **원본 배열에서 요소의 얕은 복사본을 반환해서 새 배열로 복사한다.**

```js
const arr = [0, 1, 2, 3, 4, 5];

console.log(arr.slice(2, 4)); // [2, 3]
console.log(arr.slice(3)); // [3, 4, 5]
```

### 4-2. Array.concat을 이용한 배열 복사

`slice` 메서드에 인자를 전달하지 않으면, 배열의 복사가 가능하다.

```js
const arr = [1, 2, 3];
const arr_copy = arr.concat();

console.log(arr === arr_copy);

arr_copy[0] = 100;

console.log(arr); // [1, 2, 3]
console.log(arr_copy); // [100, 2, 3]
```

#### 참고: Array.prototype.slice(arr)

concat 메서드는 기존 배열 뒤에 새로운 배열을 이어 붙혀서, 새로운 배열을 반환한다.

```js
const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5];

console.log(arr1.concat(arr2)); // [0, 1, 2, 3, 4, 5]
```

### 4-3. Spread(...) 연산자를 이용한 배열 복사

```js
const arr = [1, 2, 3];
const arr_copy = [...arr];

console.log(arr === arr_copy);

arr_copy[0] = 100;

console.log(arr); // [1, 2, 3]
console.log(arr_copy); // [100, 2, 3]
```

[⬆ Back to top](#목차)
<br />

## 5. 제대로 깊은 복사(Deep Copy)하기

위처럼 위의 방법들은 완벽한 깊은 복사를 수행하지 않는다. 완벽한 Deep Copy를 하는 방법으로는 다음이 있다.

### 5-1. 메서드를 활용해 깊은 복사하기

얕은 복사 메서드를 여러번 사용해서 깊은 복사를 할 수 있다. 아래 예시에서 `b`는 배열이므로 해당 중첩 계층에서 얕은 복사 메서드를 활용해서 재복사를 해주면 된다.

```js
const obj1 = { a: 0, b: [0, 1, 2] };
const obj2 = Object.assign({}, obj1);
obj2.b = obj1.b.slice();

console.log(obj1.b === obj2.b); // false

obj2.a = 100;
obj2.b[0] = 100;

console.log(obj1); // { a: 0, b: [ 0, 1, 2 ] }
console.log(obj2); // { a: 100, b: [ 100, 1, 2 ] }
```

### 5-2. 재귀 함수로 깊은 복사하기

최하단 계층까지 내려가서 직접 복사를 재귀 함수를 만들면 된다.

```js
const copyObject = (obj) => {
  let copy = {};

  if (typeof obj === "object" && obj !== null) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = copyObject(obj[key]);
      }
    }
  } else {
    copy = obj;
  }

  return copy;
};

const obj2 = copyObject(obj1);
console.log(obj1 === obj2);
```

위처럼 객체의 객체는 깊은 복사는 가능하지만, **객체의 배열은 불가능**하다는 단점이 존재한다.

```js
const obj1 = [
  { a: 0, b: 0, c: 0 },
  { a: 1, b: 1, c: 1 },
];

const obj2 = copyObject(obj1);
console.log(obj2); // { '0': { a: 0, b: 0, c: 0 }, '1': { a: 1, b: 1, c: 1 } }
```

### 5-3. JSON.parse와 JSON.stringify를 이용해 깊은 복사하기

```js
const obj1 = { a: 0, b: { c: 0 } };
const obj2 = JSON.parse(JSON.stringify(obj1));

obj1.a = 4;
obj1.b.c = 4;

console.log(obj2); // { a: 0, b: { c: 0 } }
```

깊은 복사이므로 당연히 복사본에 대한 수정 시, 원본의 불변성은 유지시킬 수 있다. 그러나 JSON 객체 메서드 역시 완벽하지 않다. 함수나 정규표현식 등 특정 데이터 타입에는 지원이 되지 않는다. 그리고 성능 자체도 그리 좋지 못하다.

### 5-4. 라이브러리 사용하기

- [Lodash의 cloneDeep 함수](https://lodash.com/docs/#cloneDeep) 사용하기
- [immutable.js](https://immutable-js.com/) 사용하기

[⬆ Back to top](#목차)

## 참고

- [holymoly.jun님 블로그](https://velog.io/@jun094/JS-%EA%B0%9D%EC%B2%B4-%EB%B0%B0%EC%97%B4-%EB%B3%B5%EC%82%AC-%ED%95%98)
- [HANAMON님 블로그](https://hanamon.kr/javascript-shallow-copy-deep-copy/)
