# 연산자

**연산자(operator)는 하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입, 지수 연산 등을 수행해 하나의 값을 만드는 역할**을 합니다. 이때 **연산의 대상을 피연산자(operand)** 라고 합니다. 피연산자는 값으로 평가될 수 있는 표현식이어야 하며, 피연산자와 연산자의 조합으로 이뤄진 연산자 표현식도 값으로 평가될 수 있는 표현식입니다.

```jsx
// 산술 연산자
5 * 4; // -> 20

// 문자열 연결 연산자
"My name is" + "Brad"; // -> 'My name is Brad'

// 할당 연산자
color = "red"; // -> red

// 비교 연산자
3 > 5; // -> false

// 논리 연산자
true && false; // -> false

// 타입 연산자
typeof "Hi"; // -> string
```

피연산자가 “값”이라는 명사의 역할을 한다면, 연산자는 “피연산자를 연산하여 새로운 값을 만든다”라는 동사의 역할을 한다고 볼 수 있습니다.

## 목차

1. [산술 연산자](#1-산술-연산자)
2. [할당 연산자](#2-할당-연산자)
3. [비교 연산자](#3-비교-연산자)
4. [삼항 조건 연산자](#4-삼항-조건-연산자)
5. [논리 연산자](#5-논리-연산자)
6. [쉼표 연산자](#6-쉼표-연산자)
7. [그룹 연산자](#7-그룹-연산자)
8. [typeof 연산자](#8-typeof-연산자)
9. [지수 연산자](#9-지수-연산자)
10. [연산자 우선순위](#10-연산자-우선순위)
11. [연산자 결합 순서](#11-연산자-결합-순서)

# 1. 산술 연산자

**산술 연산자(arithmetic operator)는 피연산자를 대상으로 수학적 계산을 수행해 새로운 숫자 값을 만듭니다**. 산술 연산이 불가능한 경우, `NaN`을 반환합니다.

산술 연산자는 피연산자의 개수에 따라 이항 산술 연산자와 단항 산술 연산자로 나눌 수 있습니다.

## 1-1. 이항 산술 연산자

**이항(binary) 산술 연산자는 2개의 피연산자를 산술 연산하여 숫자 값을 만듭니다**.

모든 이항 산술 연산자는 **피연산자의 값을 변경하는 부수 효과(side effect)가 없습니다**. 다시 말해, **어떤 산술 연산을 해도 피연산자의 값이 바뀌는 경우는 없고 언제나 새로운 값을 만들 뿐**입니다.

| 이항 산술 연산자 | 의미   | 부수 효과 |
| ---------------- | ------ | --------- |
| `+`              | 덧셈   | x         |
| `-`              | 뺄셈   | x         |
| `*`              | 곱셉   | x         |
| `/`              | 나눗셈 | x         |
| `%`              | 나머지 | x         |

```jsx
5 + 2; // -> 7
5 - 2; // -> 3
5 * 2; // -> 10
5 / 2; // -> 2.5
5 % 2; // -> 1
```

## 1-2. 단항 산술 연산자

**단항(unary) 산술 연산자는 1개의 피연산자를 산술 연산하여 숫자 값을 만듭니다.**

| 단항 산술 연산자 | 의미                                                 | 부수 효과 |
| ---------------- | ---------------------------------------------------- | --------- |
| `++`             | 증가                                                 | o         |
| `--`             | 감소                                                 | o         |
| `+`              | 어떠한 효과도 없다. 음수를 양수로 반전하지도 않는다. | x         |
| `-`              | 양수를 음수로, 음수를 양수로 반전한 값을 반환한다.   | x         |

이항 산술 연산자와는 달리 **증가/감소(++/—) 연산자는 피연산자의 값을 변경하는 부수 효과가 있습니다**. 다시 말해, **증가/감소 연산을 하며 피연산자의 값을 변경하는 암묵적 할당이 이뤄집니다**.

```jsx
var x = 1;

// ++연산자는 피연산자의 값을 변경하는 암묵적 할당이 이뤄진다.
x++; // x = x + 1;
console.log(x); // 2

// --연산자는 피연산자의 값을 변경하는 암묵적 할당이 이뤄진다.
x--; // x = x - 1;
console.log(x); // 1
```

증가/감소(++/—) 연산자는 위치에 따라 전위, 후위 증가/감소 연산자로 나뉩니다.

- **전위 증가/감소 연산자**: 피연산자의 값을 증가/감소 시킨 후, 다른 연산을 수행합니다.
- **후위 증가/감소 연산자**: 다른 연산을 수행한 후, 피연산자의 값을 증가 감소/시킵니다.

```jsx
var x = 5;
var result;

// 선할당 후증가(postfix increment operator)
result = x++;
console.log(result, x); // 5 6

// 선증가 후할당(prefix increment operator)
result = ++x;
console.log(result, x); // 7 7

// 선할당 후감소(postfix decrement operator)
result = x--;
console.log(result, x); // 7 6

// 선감소 후할당(prefix decrement operator)
result = --x;
console.log(result, x); // 5 5
```

`+` 단항연산자는 피연산자에 어떠한 효과도 없습니다. 음수를 양수로 반전하지도 않습니다.

```jsx
+10; // -> 10
+-10; // -> -10
```

그러나 숫자 타입이 아닌 피연산자에 `+` 단항 연산자를 사용하면 **피연산자를 숫자 타입으로 변환하여 반환**합니다. 이때 **피연산자를 변경하는 것은 아니고, 숫자 타입으로 변환한 값을 생성해서 반환**합니다. 따라서 부수 효과는 없습니다.

```jsx
var x = "1";

// 문자열을 숫자로 타입 변환합니다.
console.log(+x); // 1
// 부수 효과는 없습니다.
console.log(x); // '1'

x = "Hello";

// 문자열을 숫자로 타입 변환할 수 없으므로 NaN을 반환합니다.
console.log(+x); // NaN
// 부수 효과는 없습니다.
console.log(x); // '1'
```

`-` 단항 연산자는 피연산자의 **부호를 반전한 값을 반환**합니다. `+` 단항 연산자와 마찬가지로 **숫자 타입이 아닌 피연산자에 사용하면 피연산자를 숫자 타입으로 변환**합니다. 이때 피연산자를 변경하는 것은 아니고, **부호를 반전한 숫자 타입의 값을 생성해 반환**합니다. 따라서 부수 효과는 없습니다.

```jsx
// 부호를 반전합니다.
-(-10); // -> 10

// 문자열을 숫자로 타입 변환합니다.
-"10"; // -> -10

// 불리언 값을 숫자로 타입 변환합니다.
-true; // -> -1

// 문자열은 숫자로 타입 변환할 수 없으므로 NaN을 반환합니다.
-"Hello"; // -> NaN
```

## 1-3. 문자열 연결 연산자

`+` 연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작합니다.

```jsx
"1" + 2; // -> '12'
1 + "2"; // -> '12'
```

이때 주목할 것은 **개발자의 의도와는 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환**되었다는 것입니다. 이를 **암묵적 타입 변환(implict coercion)** 또는 **타입 강제 변환(type coercion)**이라고 합니다.

위에서 봤던 `+`, `-` 단항 연산자도 암묵적 타입 변환이 발생한 것이며, 이러한 경우가 몇 가지 더 있습니다.

```jsx
// true는 1로 타입 변환됩니다.
1 + true; // -> 2

// false는 0으로 타입 변환됩니다.
1 + false; // -> 1

// null은 0으로 타입 변환됩니다.
1 + null; // -> 1

// undefined는 숫자로 타입 변환되지 않습니다.
+undefined; // -> NaN
1 + undefined; // -> NaN
```

[⬆ Back to top](#목차)
<br />

# 2. 할당 연산자

**할당 연산자(assignment operator)는 우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당**합니다. 할당 연산자는 **좌항의 변수에 값을 할당하므로 변수 값이 변하는 부수 효과**가 있습니다.

| 할당 연산자 | 예      | 동일 표현  | 부수 효과 |
| ----------- | ------- | ---------- | --------- |
| `=`         | x = 5   | x = 5      | o         |
| `+=`        | x += 5  | x = x + 5  | o         |
| `-=`        | x -= 5  | x = x - 5  | o         |
| `*=`        | x \*= 5 | x = x \* 5 | o         |
| `/=`        | x /= 5  | x = x / 5  | o         |
| `%=`        | x %= 5  | x = x % 5  | o         |

```jsx
var x;

x = 10;
console.log(x); // 10

x += 5; // x = x + 5;
console.log(x); // 15

x -= 5; // x = x - 5;
console.log(x); // 10

x *= 5; // x = x * 5;
console.log(x); // 50

x /= 5; // x = x / 5;
console.log(x); // 10

x %= 5; // x = x % 5;
console.log(x); // 0
```

할당문은 변수에 값을 할당하는 부수 효과만 있을 뿐 값으로 평가되지 않을 것처럼 보입니다. 하지만 **할당문은 값으로 평가되는 표현식인 문으로서 할당된 값으로 평가**됩니다.

```jsx
var x;

console.log((x = 10)); // 10
```

할당문이 값으로 평가되는 표현식이므로 값과 동치(equivalent)입니다. 그러므로 할당문은 다른 변수에 할당할 수도 있습니다. 이러한 특징을 활용하면 여러 변수에 동일한 값을 연쇄 할당할 수도 있습니다.

```jsx
var a, b, c;

// 연쇄 할당. 오른쪽에서 왼쪽으로 진행됩니다.
a = b = c = 0;

console.log(a, b, c); // 0 0 0
```

[⬆ Back to top](#목차)
<br />

# 3. 비교 연산자

**비교 연산자(comparison operator)는 좌항과 우항의 피연산자를 비교한 다음 그 결과를 불리언 값으로 반환**합니다.

## 3-1. 동등/일치 비교 연산자

**동등 비교(loose equality)와 일치 비교(strict equality) 연산자는 좌항과 우항의 피연산자가 같은 값으로 평가되는지 비교해 불리언 값을 반환**합니다. 하지만 이 둘은 엄격성의 정도가 다릅니다.

| 비교 연산자 | 의미        | 사례    | 설명                     | 부수 효과 |
| ----------- | ----------- | ------- | ------------------------ | --------- |
| `==`        | 동등 비교   | x == y  | x와 y의 값이 같음        | x         |
| `===`       | 일치 비교   | x === y | x와 y의 값과 타입이 같음 | x         |
| `!=`        | 부동등 비교 | x != y  | x와 y의 값이 다름        | x         |
| `!==`       | 불일치 비교 | x !== y | x와 y의 값이 타입이 다름 | x         |

동등 비교(==) 연산자는 좌항과 우항의 피연산자를 비교할 때, 먼저 **암묵적 타입 변환을 통해 타입을 일치시킨 후 같은 값인지 비교**합니다.

```jsx
5 == 5; // -> true
5 == "5"; // -> true
```

동등 비교 연산자는 편리한 경우도 있지만, 결과를 예측하기 어렵고 실수하기 쉽습니다.

```jsx
"0" == ""; // -> false
0 == ""; // -> true
0 == "0"; // -> true
false == "false"; // -> false
false == "0"; // -> true
false == null; // -> false
false == undefined; // -> false
```

이처럼 동등 비교는 예측하기 어려운 결과를 만들어냅니다. 따라서 동등 비교 연산자는 사용하지 않는 편이 좋습니다.

**일치 비교 연산자는 좌항과 우항의 피연산자가 타입도 같고 값도 같은 경우에 한하여 true를 반환**합니다. **암묵적 타입 변환을 하지 않고 값을 비교**하므로 일치 비교 연산자는 예측하기 쉽습니다.

```jsx
5 === 5; // -> true
5 === "5"; // -> false
```

일치 비교 연산자에서 주의할 것은 `NaN`입니다.

```jsx
NaN === NaN; // -> false
```

`NaN`은 자신과 일치하지 않는 유일한 값입니다. 따라서 숫자가 `NaN`인지 조사하려면 빌트인 함수 `Number.isNaN`을 사용해야 합니다.

```jsx
Number.isNaN(NaN); // -> true
Number.isNaN(10); // -> false
Number.isNaN(1 + undefined); // -> true
```

숫자 0도 주의해야 합니다. 자바스크립트에는 양의 0과 음의 0이 있는데, 이들을 비교하면 true를 반환합니다.

```jsx
0 === -0; // -> true
0 == -0; // true
```

조금 더 예측 가능하고, 정확한 비교 결과를 반환받고 싶다면 빌트인 함수 `Object.is`를 사용할 수 있습니다.

```jsx
-0 === +0; // -> true
Object.is(-0, +0); // -> false

NaN === NaN; // -> false
Object.is(NaN, NaN); // -> true
```

## 3-2. 대소 관계 비교 연산자

**대소 관계 비교 연산자는 피연산자의 크기를 비교하여 불리언 값을 반환**합니다.

| 대소 관계 비교 연산자 | 예제   | 설명                  | 부수 효과 |
| --------------------- | ------ | --------------------- | --------- |
| `>`                   | x > y  | x가 y보다 크다        | x         |
| `<`                   | x < y  | x가 y보다 작다        | x         |
| `>=`                  | x >= y | x가 y보다 크거나 같다 | x         |
| `<=`                  | x <= y | x가 y보다 작거나 같다 | x         |

```jsx
5 > 0; // -> true
5 > 5; // -> false
5 >= 5; // -> true
5 <= 5; // -> true
```

[⬆ Back to top](#목차)
<br />

# 4. 삼항 조건 연산자

**삼항 조건 연산자(ternary operator)는 조건식의 평가 결과에 따라 반환할 값을 결정**합니다. 자바스크립트의 유일한 삼항 연산자이며, 부수 효과는 없습니다. 삼항 조건 연산자 표현식은 다음과 같이 사용합니다.

```jsx
조건식 ? 조건식이 true일 때 반환할 값 : 조건식이 false일 때 반환할 값
```

삼항 연산자는 첫 번째 피연산자가 `true`로 평가되면 두 번째 피연산자를 반환하고, 첫 번째 피연산자가 `false`로 평가되면 세 번째 피연산자를 반환합니다. 즉, **삼항 조건 연산자는 두 번째 피연산자 또는 세 번재 피연산자로 평가되는 표현식**입니다.

물음표(?) 앞의 **첫 번째 피연산자는 조건식, 즉 불리언 타입의 값으로 평가될 표현식**입니다. 만약 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 암묵적 타입 변환됩니다.

```jsx
var x = 2;

// 2 % 2는 0이므로 false로 암묵적 타입 변환됩니다.
var result = x % 2 ? "홀수" : "짝수";

console.log(result); // 짝수
```

`if … else` 문을 사용해도 삼항 조건 연산자 표현식과 유사하게 처리할 수 있지만, 삼항 조건 연산자 표현식은 값처럼 사용할 수 있지만, `if … else` 문은 값처럼 사용할 수 없다는 차이가 있습니다.

```jsx
var x = 10;

var result = if (x % 2) { result = '홀수'; } else { result = '짝수'; };
// SyntaxError: Unexpected token if
```

**삼항 조건 연산자 표현식은 값으로 평가할 수 있는 표현식인 문**입니다. 따라서 삼항 조건 연산자 표현식은 값처럼 다른 표현식의 일부가 될 수 있어 매우 유용합니다.

```jsx
var x = 10;

// 삼항 조건 연산자 표현식은 표현식인 문입니다. 따라서 값처럼 사용할 수 있습니다.
var result = x % 2 ? "홀수" : "짝수";
console.log(result); // 짝수
```

[⬆ Back to top](#목차)
<br />

# 5. 논리 연산자

**논리 연산자(logical operator)는 우항과 좌항의 피연산자(부정 논리 연산자의 경우 우항의 피연산자)를 논리 연산합니다**.

| 논리 연산자 | 의미        | 부수 효과 |
| ----------- | ----------- | --------- | ---------- | --- |
| `           |             | `         | 논리합(OR) | x   |
| `&&`        | 논리곱(AND) | x         |
| `!`         | 부정(NOT)   | x         |

```jsx
// 논리합(||) 연산자
true || true; // -> true
true || false; // -> true
false || true; // -> true
false || false; // -> false

// 논리곱(&&) 연산자
true && true; // -> true
true && false; // -> false
false && true; // -> false
false && false; // -> false

// 논리 부정(!) 연산자
!true; // -> false
!false; // -> true
```

**논리 부정(!) 연산자는 언제나 불리언 값을 반환**합니다. 단, 피연산자가 반드시 불리언 값일 필요는 없습니다. 만약 **피연산자가 불리언 값이 아니면 불리언 타입으로 암묵적 타입 변환**됩니다.

```jsx
!0; // -> true
!"Hello"; // -> false
```

**논리합(||) 또는 논리곱(&&) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있습니다**. 이 두 연산자 표현식은 언제나 **2개의 피연산자 중 어느 한쪽으로 평가**됩니다.

```jsx
"Cat" && "Dog"; // -> 'Dog'
```

[⬆ Back to top](#목차)
<br />

# 6. 쉼표 연산자

**쉼표(,) 연산자는 왼쪽 피연산자부터 차례대로 피연산자를 평가하고 마지막 피연산자의 평가가 끝나면 마지막 피연산자의 평가 결과를 반환**합니다.

```jsx
var x, y, z;

(x = 1), (y = 2), (z = 3); // 3
```

[⬆ Back to top](#목차)
<br />

# 7. 그룹 연산자

소괄호(’()’)로 피연산자를 감싸는 **그룹 연산자는 자신의 피연산자인 표현식을 가장 먼저 평가**합니다. 따라서 **그룹 연산자를 사용하면 연산자의 우선순위를 조절할 수 있습니다**. 그룹 연산자는 연산자 우선순위가 가장 높습니다.

```jsx
10 * 2 + 3; // -> 23

// 그룹 연산자를 통한 연산 우선순위 조절
10 * (2 + 3); // -> 50
```

[⬆ Back to top](#목차)
<br />

# 8. typeof 연산자

**typeof 연산자는 피연산자의 데이터 타입을 문자열로 반환**합니다. 이때 typeof 연산자가 반환하는 문자열은 7개의 데이터 타입과 정확히 일치하지 않습니다.

```jsx
typeof ""; // -> "string"
typeof 1; // -> "number"
typeof NaN; // -> "number"
typeof true; // -> "boolean"
typeof undefined; // -> "undefined"
typeof Symbol(); // -> "symbol"
typeof null; // -> "object"
typeof []; // -> "object"
typeof {}; // -> "object"
typeof new Date(); // -> "object"
typeof /test/gi; // -> "object"
typeof function () {}; // -> "function"
```

**typeof 연산자로 null 값을 연산하면 “null”이 아닌 “object”를 반환한다는 것에 주의**해야 합니다. 자바스크립트의 자체 버그이므로, 값이 null인지 확인할 때는 typeof 연산자가 아닌 일치 연산자(===)를 사용해줘야 합니다.

[⬆ Back to top](#목차)
<br />

# 9. 지수 연산자

**지수 연산자는 좌항의 피연산자를 밑(base)으로, 우항의 피연산자를 지수(exponent)로 거듭 제곱하여 숫자 값을 반환**합니다.

```jsx
2 ** 2; // -> 4
2 ** 2.5; // -> 5.65685424949238
2 ** 0; // -> 1
2 ** -2; // -> 0.25
```

음수를 거듭제곱의 밑으로 사용해 계산하려면 다음과 같이 괄호로 묶어야 하며, 지수 연산자는 이항 연산자 중에서 우선 순위가 가장 높습니다.

```jsx
(-5) ** 2; // -> 25
2 * 5 ** 2; // -> 50
```

[⬆ Back to top](#목차)
<br />

# 10. 연산자 우선순위

**연산자 우선순위란 여러 개의 연산자로 이뤄진 문이 실행될 때, 연산자가 실행되는 순서**를 말합니다. 우선순위가 높을수록 먼저 실행됩니다.

| 우선순위 | 연산자                                                                                      |
| -------- | ------------------------------------------------------------------------------------------- | --- | --- |
| 1        | `()`(그룹 연산자)                                                                           |
| 2        | `new`(매개변수 존재), `.`, `[]`(프로퍼티 접근), `()`(함수 호출), `?.`(옵셔널 체이닝 연산자) |
| 3        | `new`(매개변수 미존재)                                                                      |
| 4        | `++`, `--` (후위 증가/감소 연산자)                                                          |
| 5        | `!`, `+`, `-`(단항 연산자), `++`, `--` (전위 증가/감소 연산자), `typeof`, `delete`          |
| 6        | `**`                                                                                        |
| 7        | `*`, `/`, `%`                                                                               |
| 8        | `+`, `-`                                                                                    |
| 9        | `<`, `<=`, `>`, `>=`, `in`, `instanceof`                                                    |
| 10       | `==`, `!=`, `===`, `!==`                                                                    |
| 11       | `??`(null 병합 연산자)                                                                      |
| 12       | `&&`                                                                                        |
| 13       | `                                                                                           |     | `   |
| 14       | `? … : …` (삼항 연산자)                                                                     |
| 15       | 할당 연산자(`=`, `+=`, `-=`, …)                                                             |
| 16       | `,`                                                                                         |

[⬆ Back to top](#목차)
<br />

# 11. 연산자 결합 순서

**연산자 결합 순서란 연산자의 어느 쪽(좌항 또는 우항)부터 평가를 수행할 것인지를 나타내는 순서**를 말합니다.

| 결합 순서   | 연산자                                                                                                          |
| ----------- | --------------------------------------------------------------------------------------------------------------- | --- | -------------------------------------------------- |
| 좌항 → 우항 | `+`, `-`, `/`, `%`, `<`, `<=`, `>`, `>=`, `&&`, `                                                               |     | `, `.`, `[]`, `()`, `??`, `?.`, `in`, `instanceof` |
| 우항 → 좌항 | `++`, `--`, 할당 연산자(`=`, `+=`, `-=`, …), `!`x, `+`x, `-`x, `++`x, `—`x, `typeof`, `delete`, `? … : …`, `**` |

[⬆ Back to top](#목차)
<br />
