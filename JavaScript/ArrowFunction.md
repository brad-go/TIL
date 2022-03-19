# 화살표 함수를 사용하는 이유와 다른 점

ES6 문법 이후부터는 자바스크립트에서는 함수를 만들 수 있는 문법이 새롭게 하나 등장했다. arrow function 이라는 문법인데 이걸 이용하면 함수를 만들 수 있다. 기존 `function() {}` 이 있는데, 왜 새로 추가한 걸까?

또한 익명함수 포스팅에서 다루지 못한 화살표 함수와 익명 함수에서 this의 차이도 같이 다뤄보려고 한다. 우선 화살표 함수에 대해 알아보자.

## 화살표 함수 Arrow function

```tsx
// 기존 함수 선언
function 함수명() {
  // ...
}

// 익명 함수 선언
const 함수명 = function () {
  // ...
};

// 화살표 함수 선언 - 새로운 문법!
const 함수명 = () => {
  // ...
};
```

위에서 볼 수 있듯이 자바스크립트에서는 세가지 방식으로 함수를 선언할 수 있다. 기존 함수 선언과 달리 익명 함수와 화살표 함수는 조금 다르게 동작하는데, 자바스크립트 런타임의 컴파일 과정에서 동적으로 선언된다는 것이다. 그러나 이 둘 마저도 약간의 차이가 있다.

## 왜 사용할까?

### **함수 본연의 기능을 아주 잘 표현하는 문법이기 때문**이다.

우선 function 문법을 왜 사용하는지 생각해보자.

1. 여러가지 기능을 하는 코드를 한 단어로 묶고 싶을 때 (그리고 나중에 재사용할 때)
2. 입출력 기능을 만들 때

우리는 이러한 상황에서 함수를 사용한다. 이 때, **arrow function을 사용하면 함수 본연의 입출력 기능을 아주 직관적으로 잘 표현해준다**.

<details><summary><b>함수의 입출력 기능</b></summary><div>

![https://codingapple.com/wp-content/uploads/2020/03/black.png](https://codingapple.com/wp-content/uploads/2020/03/black.png)

위 그림처럼 input을 집어 넣으면 output을 출력해주는 박스가 바로 함수이다.

수학 시간을 떠올려보자.

> 문제) f(x) = x + 2 이다. 그럼 f(2)는 뭘까?

답은 4다.

f(x) 이게 함수다. input으로 2가 들어갔고, 함수는 output으로 4를 내놓는다. 프로그래밍에선 어떨까?

```tsx
function add(x) {
  return x + 2;
}
```

이러한 문법을 만들어서 사용한다. 함수의 소괄호 안에는 input 역할을 하는 파라미터(매개변수)가 있고, 함수 내에 return 이라는 것은 output 역할을 하는 키워드다. **소괄호에 뭔가 집어 넣으면 return을 이용해 뭔가 뱉어내는 것** 이게 바로 함수의 입출력 기능이다.

다시 화살표 함수를 보자.

```tsx
const double = (x) => {
  return x * 2;
};

console.log(double(4)); // 8
console.log(double(8)); // 16
```

아주 직관적으로 입출력 기능을 나타내고 있다. 이렇게 코드의 가독성을 높여주는 역할을 한다.

위와 같이 매개 변수가 하나라면 소괄호를 생략할 수 있다.

```tsx
const double = (x) => x * 2;
```

또 위의 코드와 다른 점이 있는데, 중괄호와 return이 없다. 이를 **Implict return**(암묵적 return)이라고 한다. 중괄호 안에 함수 내용이 **한 줄뿐이라면**, 중괄호를 생략해서 위와 같이 생략할 수 있다. 이때 `return`은 생략된 것으로 간주한다.

</div></details>
    
<br />

## 화살표 함수의 다른 점

### 화살표 함수에서의 this

화살표 함수는 키워드의 값 측면에서 매우 다르게 행동한다. 코드를 보자.

```tsx
const person = {
  name: "Brad",
  age: 26,
  getInfo: function () {
    return `${this.name}는 ${this.age}살입니다.`;
  },
};

person.getInfo();
```

위 코드를 실행하면 어떤 결과가 나올까? this가 가리키는 것은 무엇일까? 익명 함수를 사용했을 때는 함수를 가지고 있는 객체인 person의 name과 age가 출력될 것이다.

```tsx
// Brad는 26살입니다.
```

이제 화살표 함수를 사용했을 때를 보자.

```tsx
const person = {
  name: "Brad",
  age: 26,
  getInfo: () => {
    return `${this.name}는 ${this.age}살입니다.`;
  },
};

person.getInfo();
```

위 코드와 동일한 로직을 가지고 있다. 바뀐 것은 function() 키워드가 화살표 함수로 바뀐 것 뿐이다. 여기서의 this는 무엇을 가리킬까?

```tsx
// undefined는 undefined살입니다.
```

함수 표현 방식만 달라졌을 뿐인데, 결과가 undefined가 됐다. 왜 `this`가 person을 가리키지 않을까? `this`는 무조건 앞에 객체가 있으면 객체를 가리킨다고 알고 있는데 말이다. 여기서 `this`를 출력해보면 window 객체 혹은 global 객체를 가리킨다.

이유는 간단하다. **화살표 함수가 외부에 있던 `this`를 그대로 내부로 가져와서 사용하는 하는 함수이기 때문**이다. 즉, 화살표 함수는 내부의 **this**값을 변화시키지 않는다. 이래서 화살표 함수에서 **this**를 사용할 때는 주의해야 한다. 내가 생각한 this값과 달라질 수도 있으니 단점이 될 수 있다.

화살표 함수는 함수를 선언할 때 **this에 바인딩할 객체가 정적으로 결정**된다. 화살표 함수의 this는 **언제나 상위 스코프의 this**를 가리킨다. (**Lexical this**) 또한 `call`, `apply`, `bind` 메서드를 사용하여 this를 변경할 수 없다.

### 생성자 함수로 사용 가능 여부

```tsx
function increase() {
  this.num = 1234;
}

const numbers = new increase();
console.log(numbers.num); // 1234
```

일반 함수는 생성자 함수로 사용할 수 있다.

```tsx
const increase = () => {
  this.num = 1234;
};

const numbers = new increase(); // Error
```

화살표 함수는 생성자 함수로 사용할 수 없다. 생성자 함수는 `prototype` 프로퍼티를 가지며 prototype 프로퍼티가 가리키는 프로토타입 객체의 `constructor`를 사용한다. 하지만 화살표 함수는 **prototype 프로퍼티를 가지고 있지 않기 때문에 생성자 함수로 사용할 수 없다**.

```tsx
const Poo = function() {};
const Foo = () => {};

console.log(Poo.hasOwnProperty('prototype'); // true
console.log(Foo.hasOwnProperty('prototype'); // false
```

### arguments 사용 가능 여부

arguments 객체를 모른다면 아래의 설명을 읽어보자. mdn에 정의된 글이다.

> arguments란 어떤 함수로 전달되는 인자들의 값을 가지고 있는 배열과 유사한 형태의 객체로 그 함수의 내부에서 접근할 수 있다.

```tsx
function args() {
  console.log(arguments); // Arguments(3) [1, 2, 3, callee: f, ...]
}

args(1, 2, 3);
```

일반 함수는 arguments 변수가 전달되어 [1, 2, 3]이 찍히지만,

```tsx
const args = () => {
  console.log(arguments); // Uncaught ReferenceError: arguments is not defined
};

args(1, 2, 3);
```

화살표 함수는 arguments가 바인딩 되지 않아 정의할 수 없다고 뜬다.

```tsx
const args = (...arguments) => {
  console.log(arguments);
  [1, 2, 3];
};

args(1, 2, 3);
```

사용하려면 다음과 같이 spread 문법을 이용해서 파라미터를 받아줘야 한다.

## 결론

화살표 함수를 보기에 깔끔하고, 직관적이어서 많이 사용하고 있었다. this가 다르다는 것은 알고 있었고, 어떻게 사용해야 하는지 알고 있었다. 하지만 오늘 이 글을 정리하면서 화살표 함수는 prototype이 없어서 생성자 함수로 사용할 수 없다는 것을 알게 되었다.

또, arguments 객체에 대해서도 알게 되어서 좋은 공부였던 것 같다. 앞으로 화살표 함수를 남용하기보다는 적절한 곳에 사용하고, 지원하지 않는 기능에 대해 해결할 수 있는 방법에 대해 찾아봐야 겠다.

## 참고

- [화살표 함수와 일반 함수의 차이](https://hhyemi.github.io/2021/06/09/arrow.html)
- [Arrow function은 function을 대체하는 신문법이 아님](https://codingapple.com/unit/es6-3-arrow-function-why/)
