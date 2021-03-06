# 익명 함수를 사용하는 이유

클린 코드 스터디를 진행하던 중 의문이 생겼다. 나는 코드를 짤 때, 화살표 함수와 익명함수를 많이 사용하는 편인데, 이를 사용하게 되면 클린 코드 규칙에 위배된다. 익명함수는 이름을 통해 이름을 알 수 없기 때문이다. 책에서는 if문 안의 조건 조차 함수나 메서드로 분리해 이름을 표시한다. 과연 익명 함수를 사용하는 것이 올바른 코드 작성법일까?

## 익명 함수 (Anonymous Function)

익명 함수는 일반 함수와 다르게 **이름이 존재하지 않으며**, **람다식**(Lambda Expression) 이라고도 부른다. 그래서 일반 함수와 다르게 함수명을 제외한 채 선언한다.

```tsx
// 일반 함수
function sayHello() {
  console.log("Hello");
}

// 익명 함수
const anonymous = function () {
  console.log("Who am I?");
};
```

익명 함수는 ‘**재사용 하지 않고 한 번만 사용할 함수**'를 위한 개념으로 **함수의 이름을 갖지 않고, 리터럴(Literal) 방식으로 변수에 담겨 사용되는 함수**이다.

> **리터럴 (Literal) 방식이란?**
> Literal은 ‘문자 그대로 정확한' 이라는 뜻을 가진 것처럼 말그대로 일반적으로 **변수에 데이터를 넣을 때 사용하는 방식**이다.

위처럼 익명 함수를 사용하게 되면, **익명 함수는 변수에 저장**된다.

```tsx
const anonymous = function () {
  console.log("Who am I?");
};

anonymous(); // Who am I
```

익명함수의 이름은 변수와 다르다. **`함수의 이름 ≠ 변수`** 이것은 자바스크립트의 특징인 **호이스팅**에서 알아볼 수 있다.

> **호이스팅이란?**
> 호이스팅은 코드를 실행하기 전 **변수 및 함수 선언이 해당 스코프의 최상단으로 끌어 올려놓는 것**이라고 생각해도 좋다. 실제로는 실행 컨텍스트의 Lexical environment의 environmentRecord에 현재 컨텍스트와 관련된 코드의 식별자 정보들이 수집되고 저장되는데, 이 수집과정에서 변수(var)의 식별자나 함수 자체가 수집된다.

<br />

### 일반 함수와 익명 함수의 사용

일반 함수의 경우 호이스팅 시 함수 전체가 전부 맨 위로 올라가기 때문에 함수를 호출하는 위치에 상관없이 사용할 수 있다. 반면에 **리터럴 방식으로 사용하는 익명 함수의 경우에는 함수를 담는 변수의 선언부만 위로 올라가고 익명 함수 자체는 변수가 호출되었을 때 실행** 되기 때문에, **선언부가 호출 위치보다 위에 있어야 정상적으로 사용 가능**하다.

```tsx
namedFunc();

function namedFunc() {
  console.log("I have name");
}

// I have name
```

일반 함수의 경우 선언부보다 호출 위치가 위에 있어도 함수가 동작한다.

```tsx
anonymous();

const anonymous = function () {
  console.log("Who am I?");
};

// ReferenceError: Cannot access 'anonymous' before initialization at Object.<anonymous>
```

익명 함수의 경우 선언부보다 호출 위치가 위에 있다면 `error`가 발생한다. 에러 코드의 내용은 초기화 하기 전에는 `anonymous` 함수에 접근할 수 없다는 뜻이다.

<br />

### 일반 함수와 익명 함수의 실행 비교

다른 예시를 보자.

```tsx
console.log("---첫 번째 실행---");
func();

// 화살표 함수로 작성해도 마찬가지
var func = function () {
  console.log("익명 함수");
};

function func() {
  console.log("일반 함수");
}

console.log("---두 번째 실행---");
func();

// ---첫 번째 실행---
// 일반 함수
// ---두 번째 실행---
// 익명 함수
```

출력 결과를 예상할 수 있었는가? 익명 함수와 일반 함수(기명 함수, 선언 함수)의 가장 큰 차이점은 **선언되는 시점이 완전히 다르다**는 점이다. 위에서 볼 수 있듯이 같은 이름으로 함수를 선언하고 호출했을 때, **어떤 선언함수보다도 익명 함수가 무조건 늦게 실행된다.**

> 물론 위의 경우 **`var`**를 사용해서 가능한 코드다. **`let`**이나 **`const`**를 사용하게 되면 호이스팅이 마찬가지로 일어나지만, 참조 에러가 발생한다. 스코프 시작에서 변수의 선언까지 **일시적 사각지대(TDZ; Temporal Dead Zone)**에 빠지기 때문이다.

이렇게 실행된 이유가 무엇일까? 위에서 말했듯이 호이스팅 때문이다. 첫번째 `func()`를 실행했을 때는 `func()`자체가 선언되어있지 않다. 그러나 호이스팅 시에 일반 함수는 선언부 뿐만 아니라 함수 자체가 호이스팅 된다. 즉, 일반 함수는 브라우저 런타임 이전에 선언이 완료되어 있다.

<br />

### 일반 함수와 익명 함수의 메모리 차이

일반 함수는 컴파일 단계에서 모두 호이스팅 되는데(environmentRecord가 수집할 때), 전체 스크립트 내에서 **단 한번만 쓰이는 함수가 일반 함수로 구현되어 있다면**, 이 함수는 사용될 단 한번을 기다리며 불필요하게 메모리를 차지하게 된다. 즉, **메모리를 낭비**하게 된다!

하지만 **익명 함수**를 사용할 경우 **호출되기 전까지 불필요한 시간동안 메모리를 차지하지 않고**, 해당 함수의 위치에서 함수가 구현되고 사라지면서 메모리를 아낄 수 있게 된다!

 <br />

### 그래서 익명함수는 왜 쓰는데?

1. 함수가 한 곳에서만 호출되기 때문에 이름이 필요하지 않다면, 함수를 선언해 이름 공간(name space)을 차지하고 메모리를 낭비할 필요가 없다.
2. 익명 함수는 인라인으로 선언되며 인라인 함수는 상위 범위의 변수에 접근할 수 있다는 장점이 있다.
3. 핸들러를 호출하는 코드 내부에 핸들러를 정의할 때 코드가 더 독립적이고 **가독성**이 좋다. 이름을 가진 함수를 찾지 않고, 순차적인 방식으로 코드를 읽을 수 있다. (함수가 짧을 경우)

<br />

## 정리

### 일반 함수

- 전역적이며, 함수 자체가 호이스팅 되므로 선언과 호출의 위치가 상관이 없다.
- 재사용 될 기능에 주로 사용된다.
- 컴파일 시점에 함수 자체가 실행 컨텍스트에 수집된다.

### 익명 함수

- 선언부만 호이스팅되며 호출의 위치가 선언 위치보다 뒤에 있어야 한다.
- 한번만 사용하는 기능에 주로 사용된다.
- 컴파일 시점에 변수 선언부가 수집되지만, 함수는 할당되지 않고 실행 시점에 동적으로 선언된다.

<br />

## 결론

클린 코드 책을 읽으면서 이름을 통해 코드의 이름을 밝히라는 주제가 있었다. 나도 그 말에는 동의한다. 코드 맥락에 맞는 적합한 이름은 코드의 가독성에 도움을 주고, 정보를 줄 수 있다. 하지만 깨끗한 코드는 보기에 좋은 코드만을 의미하지는 않는다. 코드의 효율이나 에러 처리, 메모리 누수 등도 생각해야 한다.

이런 점에서 일반 함수 보다는 익명 함수를 사용하는 것이 더 좋아보인다. 익명 함수의 단점으로 호이스팅이 되지 않는다는 것을 꼽는 사람들이 있다. 나는 이것에 반대한다. 오히려 이것은 제대로된 코드의 흐름으로 이끌어주는 장점인 것 같다. 이는 **함수의 실행 흐름을 예측하기 쉬워진다**는 것이다.

그리고 위의 글에서 말했듯이, 메모리 측면에서도 더 나은 모습을 보인다. 일반 함수는 브라우저 최상위 객체인 window 객체가 **일반 함수** 정의 방식을 사용하게 되면 **메모리상에 함수를 저장해 두기 때문에 메모리를 계속 사용한다**는 단점을 해결해준다.

또, 일반 함수 선언 방식을 사용하게 되면 함수 사용 후 선언을 찾아가게 되는데, 이때 호이스팅이 발생하여 메모리를 사용하게 된다. 즉, **익명함수를 사용하면 메모리 낭비를 방지할 수 있으므로 익명 함수를 사용한다!**

<br />

## 참조

- [익명 함수에 대하여](https://daklee.tistory.com/entry/%EC%9D%B5%EB%AA%85-%ED%95%A8%EC%88%98Anonymouse-Function%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC)
- [익명 함수와 선언적 함수의 차이](https://velog.io/@hyo123/%EC%9D%B5%EB%AA%85-%ED%95%A8%EC%88%98%EC%99%80-%EC%84%A0%EC%96%B8%EC%A0%81-%ED%95%A8%EC%88%98%EC%9D%98-%EC%B0%A8%EC%9D%B4)
