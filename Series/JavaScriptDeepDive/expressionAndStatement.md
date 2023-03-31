# 표현식과 문

## 목차

1. [값](#1-값)
2. [리터럴](#2-리터럴)
3. [표현식](#3-표현식)
4. [문](#4-문)
5. [표현식인 문과 표현식이 아닌문](#5-표현식인-문과-표현식이-아닌-문)

## 1. 값

**값(value)** 은 **식(표현식, expression)이 평가(evalutate)되어 생성된 결과**를 말합니다. 여기서 평가는 식을 해석해서 값을 생성하거나 참조하는 것을 의미합니다.

```jsx
// 10 + 20은 평가되어 숫자 값 30을 생성합니다.
10 + 20; // 30
```

모든 값은 데이터 타입을 가지며, 메모리에 2진수, 즉 비트(bit)의 나열로 저장됩니다. 메모리에 저장된 값은 데이터 타입에 따라 다르게 해석될 수 있습니다. 예를 들어 메모리에 저장된 값 `0100 0001`을 숫자로 해석하면 65지만, 문자로 해석하면 ‘A’입니다.

변수는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위한 이름입니다. 그러므로 변수에 할당되는 것은 값입니다.

```jsx
// 변수 sum에는 10 + 20이 평가되어 생성된 숫자 값 30이 할당됩니다.
var sum = 10 + 20;
```

주의할 것은 sum 변수에 할당되는 것은 10 + 20이라는 표현식이 아니라 이 식이 평가된 값 30이라는 것입니다. 즉, 변수 sum이 기억하는 메모리 공간에는 숫자 값 30이 저장됩니다. 따라서 10 + 20은 할당 이전에 평가되어 값을 생성해야 합니다.

값은 다양한 방법으로 생성이 가능합니다. 위 예제처럼 식으로 생성할 수도 있지만, 기본적인 방법으로는 리터럴을 사용할 수 있습니다.

[⬆ Back to top](#목차)
<br />

## 2. 리터럴

**리터럴(literal)** 은 **사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기법(expression)** 을 말합니다.

```jsx
// 숫자 리터럴 3
3;
```

위 예제처럼 사람이 이해할 수 있는 아라비아 숫자 3을 사용해 숫자 리터럴 3을 코드에 기술하면 자바스크립트 엔진은 이를 평가해 숫자 값 3을 생성합니다.

이처럼 리터럴은 숫자 뿐만 아니라 알파벳, 한글 또는 약속된 기호(””, ‘’, ., [], {}, // 등)로 표기한 코드입니다. 자바스크립트 엔진은 런타임에 리터럴을 평가해 값을 생성합니다. 즉, **리터럴은 값을 생성하기 위해 미리 약속한 표기법**이라고 할 수 있습니다.

| 리터럴             | 예시                              | 비고      |
| ------------------ | --------------------------------- | --------- |
| 정수 리터럴        | 100                               |           |
| 부동소수점 리터럴  | 10.5                              |           |
| 2진수 리터럴       | 0b01000001                        | 0b로 시작 |
| 8진수 리터럴       | 0o101                             | 0o로 시작 |
| 16진수 리터럴      | 0x41                              | 0x로 시작 |
| 문자열 리터럴      | ‘Hello’, “World”                  |           |
| 불리언 리터럴      | true, false                       |           |
| null 리터럴        | null                              |           |
| undefined 리터럴   | undefined                         |           |
| 객체 리터럴        | { name: ‘Lee’, address: ‘Seoul’ } |           |
| 배열 리터럴        | [ 1, 2, 3 ]                       |           |
| 함수 리터럴        | function () {}                    |           |
| 정규 표현식 리터럴 | /[A-Z]+/g                         |           |

[⬆ Back to top](#목차)
<br />

## 3. 표현식

**표현식(expression)은 값으로 평가될 수 있는 문(statement**)입니다. **표현식이 평가되면 새로운 값을 생성하거나 기존의 값을 참조**합니다.

```jsx
var score = 100;
```

위 코드의 100은 리터럴입니다. 리터럴 100은 자바스크립트 엔진에 의해 평가되어 값을 생성하므로 리터럴은 그 자체로 표현식이라고 할 수 있습니다. 다른 예제도 보겠습니다.

```jsx
var score = 50 + 50;
```

이번엔 어떨까요? 50 + 50은 리터럴과 연산자로 이루어져 있습니다. 하지만 50 + 50도 평가되어 숫자 값 100을 생성하므로 표현식입니다.

```jsx
score; // 100;
```

위에서 선언한 score 변수를 참조하면 어떨까요? 변수 식별자를 참조하면 변수 값으로 평가됩니다. 식별자 참조는 값을 생성하지는 않지만, 값으로 평가되므로 표현식입니다.

이처럼 표현식은 리터럴, 식별자(변수, 함수 등의 이름), 연산자, 함수 호출 등의 조합으로 이루어질 수 있습니다. 다음과 같이 다양한 표현식이 있지만, 값으로 평가된다는 점에서 모두 동일합니다. 즉, **값으로 평가될 수 있는 문은 모두 표현식**입니다.

```jsx
// 리터럴 표현식
10;
("Hello");

// 식별자 표현식(선언이 이미 존재한다고 가정)
sum;
person.name;
arr[1];

// 연산자 표현식
10 + 20;
sum = 10;
sum !== 10;

// 함수/메서드 호출 표현식(선언이 이미 존재한다고 가정)
sqaure();
person.getName();
```

**표현식은 값으로 평가**됩니다. 이때 **표현식과 표현식이 평가된 값은 동등한 관계, 즉 동치(equivalent)** 입니다. 예를 들어 1 + 2와 3이 동등한 것처럼요. 따라서 **표현식은 값처럼 사용할 수 있습니다**. 이는 **문법적으로 값이 위치할 수 있는 자리에는 표현식도 위치할 수 있다**는 것을 말합니다.

예를 들어 산술 연산자 +의 좌항과 우항에는 숫자 값이 위치해야 합니다. 이때 숫자 값으로 평가될 수 있는 표현식이라면 숫자 값 대신 사용할 수 있습니다.

```jsx
var x = 1 + 2;

// 식별자 표현식 x는 3으로 평가됩니다.
x + 3; // 6
```

이처럼 **표현식은 다른 표현식의 일부가 되어 새로운 값을 만들어낼 수 있습니다**.

[⬆ Back to top](#목차)
<br />

## 4. 문

지금까지 표현식(expression)과 문(statement)이라는 용어가 자주 등장했을 겁니다. 표현식은 위에서 설명했지만, 문은 뭘까요?

문과 표현식을 구별하고 해석할 수 있다면 자바스크립트 엔진의 입장에서 코드를 읽을 수 있고, 실행 결과를 예측하는데 도움이 될 것입니다. 이는 버그를 줄이고 코드의 품질을 높여줄 수 있겠죠.

**문(statement)** 은 **프로그램을 구성하는 기본 단위이자 최소 실행 단위**를 말합니다. 그러므로 문의 집합으로 이루어진 것이 프로그램이며, 문을 작성하고 순선에 맞게 나열하는 것이 프로그래밍이라고 할 수 있습니다.

문은 여러 토큰으로 구성됩니다. **토큰(token)** 이란 문법적인 의미를 가지며, **문법적으로 더 이상 나눌 수 없는 프로그램의 기본 요소**를 말합니다. 예를 들어 키워드, 식별자, 연산자, 리터럴, 세미콜론이나 마침표 등의 특수 기호는 문법적인 의미를 가지며, 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소이므로 모두 토큰입니다.

```jsx
var sum = 1 + 2;
```

위 예제를 보면 위 코드 자체는 문입니다. 그리고 var라는 키워드, sum이라는 식별자, = 연산자, 리터럴 1, 2, + 연산자는 각각 토큰이라고 할 수 있습니다.

**문은 명령문이라고도 부릅니다**. 즉, **문은 컴퓨터에 내리는 명령**입니다. 문이 실행되면 명령이 실행되고 무슨 일인가 일어나게 됩니다.

문은 선언문, 할당문, 조건문, 반복문 등으로 구분할 수 있습니다. 변수 선언문을 실행하면 변수가 선언되고, 할당문을 실행하면 값이 할당됩니다. 조건문을 실행하면 지정한 조건에 따라 실행할 코드 블록({ … })이 결정되어 실행되고, 반복문을 실행하면 특정 코드 블록이 반복 실행됩니다.

```jsx
// 변수 선언문
var x;

// 할당문
x = 5;

// 함수 선언문
function foo() {}

// 조건문
if (x > 1) {
  console.log(x);
}

// 반복문
for (var i = 0; i < 2; i++) {
  console.log(i);
}
```

세미콜론(;)은 문의 종료를 나타냅니다. 자바스크립트 엔진은 세미콜론으로 문이 종료한 위치를 파악하고 순차적으로 하나씩 문을 실행합니다. 따라서 문을 끝낼 때는 세미콜론을 붙여야 합니다.

단, 0개 이상의 문을 중괄호로 묶은 코드 블록({ … }) 뒤에는 세미콜론을 붙이지 않습니다. 예를 들어 if 문, for 문, 함수 등의 코드 블록 뒤에는 세미콜론을 붙이지 않습니다. 이러한 코드 블록은 언제나 문의 종료를 의미하는 자체 종결성(self closing)을 갖기 때문입니다.

[⬆ Back to top](#목차)
<br />

## 5. 표현식인 문과 표현식이 아닌 문

표현식은 문의 일부일 수도 있고, 그 자체로 문이 될 수도 있습니다.

```jsx
// 변수 선언문은 값으로 평가될 수 없으므로 표현식이 아닙니다.
var x;
// 1, 2, 1 + 2, x = 1 + 2는 모두 표현식입니다.
// x = 1 + 2는 표현식이면서 완전한 문이기도 합니다.
x = 1 + 2;
```

이처럼 표현식과 문은 비슷해서 구별하기 어렵다고 느낄 수도 있습니다. 하지만 표현식과 문은 의외로 쉽게 구별할 수 있습니다.

문에는 표현식인 문과 표현식이 아닌 문이 있습니다. 표현식인 문은 값으로 평가될 수 있는 문이며, 표현식이 아닌 문은 값으로 평가될 수 없는 문을 말합니다. 예를 들어 변수 선언문은 값으로 평가될 수 없으므로 표현식이 아닌 문이고, 할당문은 값으로 평가될 수 있으므로 표현식인 문입니다.

**표현식인 문과 표현식이 아닌 문을 구별하는 가장 간단하고 명료한 방법은 변수에 할당해보는 것**입니다. 표현식인 문은 값으로 평가되므로 변수에 할당할 수 있습니다. 하지만 표현식이 아닌 문은 값으로 평가할 수 없으므로 변수에 할당하면 에러가 발생합니다.

```jsx
// 변수 선언문은 값처럼 사용할 수 없습니다. 즉, 변수 선언문은 표현식이 아닌 문입니다.
var foo = var x; // SyntaxError: Unexpected token var

// 할당문은 값처럼 사용할 수 있습니다. 즉, 할당문은 표현식인 문입니다.
var foo = x = 100; // 100
```

[⬆ Back to top](#목차)
<br />