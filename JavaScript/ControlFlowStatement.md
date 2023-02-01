# 제어문

**제어문(control flow statement)은 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용**합니다. 일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행되지만, 제어문을 사용하면 **코드의 실행 흐름을 인위적으로 제어**할 수 있습니다. 그러나 제어문은 위에서 아래로 흐르는 **코드의 흐름을 이해하기 어렵게 만들어 가독성을 해치는 단점**이 있습니다.

하지만 제어문 없이 코드를 작성한다는 것은 정말 어려운 일이죠. 제어문을 제대로 이해해서 더 나은 코드를 작성할 수 있도록 어떤 제어문들이 있는지 알아보겠습니다.

## 목차

1. [블록문](#1-블록문)
2. [조건문](#2-조건문)
3. [반복문](#3-반복문)
4. [break문](#4-break-문)
5. [continue문](#5-continue-문)

# 1. 블록문

**블록문(block statement/compound statement)은 0개 이상의 문을 중괄호로 묶은 것으로, 코드 블록 또는 블록**이라고 부릅니다. 자바스크립트는 이 **블록문을 하나의 실행 단위로 취급**합니다. 블록문은 단독으로 사용할 수도 있지만, 일반적으로 제어문이나 함수를 정의할 때 사용하는 것이 일반적입니다.

```jsx
// 블록문 단독 사용
{
  var foo = 10;
}

// 제어문
var x = 1;
if (x < 10) {
  x++;
}

// 함수 선언문
function sum(a, b) {
  return a + b;
}
```

[⬆ Back to top](#목차)
<br />

# 2. 조건문

**조건문(conditional statement)은 주어진 조건식(conditional expression)의 평가 결과에 따라 코드 블록(블록문)의 실행**을 결정합니다. **조건식은 불리언 값으로 평가될 수 있는 표현식**입니다.

## 2-1. if … else 문

`if … else` **문은 주어진 조건식의 평가 결과, 즉 논리적 참 또는 거짓에 따라 실행할 코드 블록을 결정**합니다.

```jsx
if (조건식) {
  // 조건식이 참이면 if문 내의 코드 블록이 실행됩니다.
} else {
  // 조건식이 거짓이면 else문 내의 코드 블록이 실행됩니다.
}
```

`if` 문의 조건식은 불리언 값으로 평가되어야 합니다. 만약 `if` 문의 **조건식이 불리언 값이 아닌 값으로 평가되면 자바스크립트 엔진에 의해 암묵적으로 불리언 값으로 강제 변환**되어 실행할 코드 블록을 결정합니다.

조건식을 추가하여 조건에 따라 실행될 코드 블록을 늘리고 싶으면 `else if` 문을 사용합니다.

```jsx
if (조건식1) {
  // 조건식1이 참이면 이 코드 블록이 실행됩니다.
} else if (조건식2) {
  // 조건식2가 참이면 이 코드 블록이 실행됩니다.
} else {
  // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행됩니다.
}
```

`else if` 문과 `else` 문은 옵션입니다. 즉, 사용할 수도 있고 사용하지 않을 수도 있습니다. `else if` 문은 여러 번 사용해서 조건을 원하는 만큼 추가할 수 있습니다.

대부분의 `if … else` 문은 삼항 조건 연산자로 바꿔쓸 수 있습니다.

```jsx
var x = 2;
var result;

if (x % 2) {
  result = "홀수";
} else {
  result = "짝수";
}

console.log(result); // 짝수
```

위 예제를 아래와 같은 삼항 연산자로 바꿀 수 있습니다.

```jsx
var x = 2;

// 2 % 2는 0 이지만, 조건식은 boolean값으로 타입이 강제 변환됩니다.
var result = x % 2 ? "홀수" : "짝수";

console.log(result); // 짝수
```

## 2-2. switch 문

`switch` **문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case문으로 실행 흐름을 옮깁니다**. `case` **문은 상황(case)을 의미하는 표현식을 지정하고 콜론으로 마칩니다**. 그리고 그 뒤에 실행할 문들을 위치시킵니다.

`switch` 문의 표현식과 일치하는 `case` 문이 없다면 실행 순서는 `default` 문으로 이동합니다. `default` 문은 선택사항으로, 사용할 수도 있고 사용하지 않을 수도 있습니다.

```jsx
switch (표현식) {
	case 표현식1:
		표현식과 표현식1이 일치하면 실행될 문;
		break;
	case 표현식2:
		표현식과 표현식2가 일치하면 실행될 문;
		break;
	default:
		표현식과 일치하는 case 문이 없을 때 실행될 문;
}
```

`if … else` 문의 조건식이 불리언 값으로 평가되어야 하는 것과 달리, `switch` 문의 표현식은 불리언 값보다는 문자열이나 숫자 값인 경우가 많습니다. `switch` **문은 논리적 참, 거짓보다는 다양한 상황(case)에 따라 실행할 코드 블록을 결정할 때 사용**합니다.

```jsx
var season = 4;
var seasonName;

switch (season) {
  case 1:
    seasonName = "Spring";
  case 2:
    seasonName = "Summer";
  case 3:
    seasonName = "Autumn";
  case 4:
    seasonName = "Winter";
  default:
    seasonName = "Invalid season";
}

console.log(seasonName); // Invalid season
```

위 예제를 실행하면 ‘Winter’가 나와야 할 것 같지만, ‘Invalid season’이 출력됩니다. 이것은 **폴스루(fall through)**라는 현상 때문인데, 이는 `switch` 문의 표현식의 평가 결과와 일치하는 `case` 문으로 실행 흐름이 이동하여 문을 실행한 것은 맞지만 문을 실행한 후 `switch` 문을 탈출하지 않고 `switch` 문이 끝날 때까지 이후의 모든 `case` 문과 `default` 문을 실행했기 때문입니다.

이러한 결과가 나온 것은 `case` 문에 해당하는 문의 마지막에 `break` 문을 사용하지 않았기 때문입니다. `**break` 문이 없다면 `case` 문의 표현식과 일치하지 않더라도 실행 흐름이 다음 `case` 문으로 연이어 이동\*\*합니다. 따라서 위 코드의 올바른 실행을 위해서는 다음과 같이 고쳐야 합니다.

```jsx
var season = 4;
var seasonName;

switch (season) {
  case 1:
    seasonName = "Spring";
    break;
  case 2:
    seasonName = "Summer";
    break;
  case 3:
    seasonName = "Autumn";
    break;
  case 4:
    seasonName = "Winter";
    break;
  default:
    seasonName = "Invalid season";
}

console.log(seasonName); // 'Winter'
```

`default` 문에는 `break` 문을 생략하는 것이 일반적입니다. 어차피 맨 마지막에 위치해서 `default` 문이 종료되면 `swtich` 문을 빠져나가기 때문입니다.

[⬆ Back to top](#목차)
<br />

# 3. 반복문

**반복문(loop statement)은 조건식의 평가 결과가 참인 경우 코드 블록을 실행하고, 조건식을 다시 평가하여 여전히 참인 경우 코드 블록을 다시 실행합니다. 이는 조건식이 거짓일 때까지 반복**됩니다.

## 3-1. for문

`for` **문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행**합니다. for문의 형태는 다음과 같습니다.

```jsx
for (변수 선언문 또는 할당문; 조건식; 증감식) {
	조건식이 참인 경우 반복 실행될 문;
}
```

`for` 문은 어떤식으로 동작할까요? 동작 순서를 알아보겠습니다.

1. 변수 선언문 또는 할당문이 실행됩니다. 이 과정은 한 번만 실행됩니다.
2. 조건식이 참인지, 거짓인지 평가합니다. 참이라면 코드 블록을 실행합니다.
3. 코드 블록을 실행한 후에 증감식을 실행합니다.
4. 다시 조건식을 평가해서 참이라면 코드 블록을 실행하고, 거짓이라면 반복문을 빠져나갑니다.

느낌이 좀 오시나요? 코드를 통해서 위 과정을 머릿속으로 한 번더 정리해보세요.

```jsx
for (let i = 0; i < 2; i++) {
  console.log(i);
}

// 0
// 1
```

## 3-2. while 문

`while` **문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행**합니다. `**for` 문은 반복횟수가 명확할 때 주로 사용하고 `while` 문은 반복 횟수가 불명확할 때 주로 사용\*\*합니다.

`while` **문은 조건문의 평가 결과가 거짓이 되면 코드 블록을 실행하지 않고 종료**합니다. 만약 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 강제 변환하여 논리적 참, 거짓을 구별합니다.

```jsx
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행합니다.
while (count < 3) {
  console.log(count); // 0 1 2
  count++;
}
```

조건식의 평가 결과가 언제나 참이면 무한 루프가 됩니다.

```jsx
while (true) { ... }
```

무한 루프를 탈출하기 위해서는 `if` 문을 통해 탈출 조건을 만들고, `break` 문으로 코드 블록을 탈출할 수 있습니다.

```jsx
var count = 0;

while (true) {
  if (count === 3) break;

  count++;
}
```

## 3-3. do … while 문

`do … while` **문은 코드 블록을 먼저 실행하고 조건식을 평가**합니다. 따라서 **코드 블록은 무조건 한 번 이상 실행**됩니다.

```jsx
var count = 0;

do {
  console.log(count); // 0 1 2
  count++;
} while (count < 3);
```

[⬆ Back to top](#목차)
<br />

# 4. break 문

`break` 문은 **코드 블록을 탈출할 때 사용**합니다. 좀 더 정확히 표현하자면 **레이블 문, 반복문 또는 `switch` 문의 코드 블록을 탈출**합니다. 이 문들의 코드 블록 외에 `break`문을 사용하면 문법 에러가 발생합니다.

참고로 **레이블 문(label statement)은 식별자가 붙은 문**을 말합니다. 레이블 문은 프로그램의 실행 순서를 제어하는 데 사용됩니다. `switch` 문의 `case`문과 `default` 문은 레이블 문이며, 이를 탈출하려면 `break` 문에 레이블 식별자를 지정해야 합니다.

중첩된 `for` 문의 내부 `for` 문에서 `break` 문을 실행하면 내부 `for` 문을 탈출하여 외부 `for` 문으로 진입합니다. 이때 내부 `for` 문이 아닌 외부 `for` 문을 탈출하려면 레이블 문을 사용합니다.

```jsx
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    // i + j가 3이면 outer라는 식별자가 붙은 레이블 for문을 탈출합니다.
    if (i + j === 3) break outer;
  }
}
```

레이블 문은 중첩된 `for` 문 외부로 탈출할 때 유용하지만, 프로그램의 흐름이 복잡해져서 가독성이 나빠지고 오류를 발생시킬 가능성이 높아지기 때문에 사용을 권장하지 않습니다.

`break` 문은 레이블 문뿐 아니라 반복문, `switch` 문에서도 사용할 수 있습니다. 이 경우에는 break 문에 레이블 식별자를 지정하지 않습니다. `break` **문은 반복문을 더 이상 진행하지 않아도 될 때, 불필요한 반복을 피할 수 있어서 유용**합니다.

```jsx
var string = "Hello world";
var target = "l";
var index;

for (let i = 0; i < string.length; i++) {
  // 문자열의 개별 문자가 'l'이면
  if (string[i] === target) {
    index = i;
    break; // 반복문을 탈출해서 불필요한 반복을 피하기
  }
}

console.log(index); // 2
```

[⬆ Back to top](#목차)
<br />

# 5. continue 문

`continue` **문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동**시킵니다. `break` 문처럼 반복문을 탈출하지는 않습니다.

```jsx
var string = "Hello world";
var target = "l";
var count = 0;

for (let i = 0; i < string.length; i++) {
  // 'l'이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동합니다.
  if (string[i] !== target) continue;

  count++; // continue 문이 실행되면 이 문은 실행되지 않습니다.
}

console.log(count); // 3
```

[⬆ Back to top](#목차)
<br />
