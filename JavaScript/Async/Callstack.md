# [JavaScript] 콜 스택(Call Stack)

: 자바스크립트 엔진이 다중 함수를 호출하는 스크립트에서 **위치를 추적하기 위해 사용하는 메커니즘**(동작 원리, 구조)

- 프로그램이 함수 호출(Function call)을 추적할 때 사용하는 것

## 스택이란?

: 가장 최근에 들어온 데이터가 가장 먼저 제거되는 **LIFO(Last In First Out)** 구조로 동작하는 기초적인 자료구조

[스택과 큐 이해하기](../DataStructure&Algorithm/DataStructure/StackQueue.md)

## 콜 스택의 동작

- 한 스크립트가 함수를 호출할 때, 인터프리터(JS 해석기)는 그것을 콜스택에 더한 후에 함수를 실행한다.
- 해당 함수에 의해 호출된 모든 함수는 호출 스택을 위로 계속 쌓은 후, 호출에 도달한 곳에서 실행됩니다.
- 현재 함수가 종료되었을 때, 인터프리터는 스택에서 그것을 떼어내고 마지막 코드 목록에서 중단된 곳에서 실행을 재개한다.

아래의 코드를 보면서 콜 스택의 동작을 조금 더 자세히 알아보자.

```javascript
function multiply(x, y) {
  return x * y;
}

function square(x) {
  return multiply(x, x);
}

function isRightTriangle(a, b, c) {
  return square(a) + square(b) === square(c);
}

isRightTriangle(3, 4, 5);
```

위의 코드를 보고 함수가 스택에 어떻게 들어가는지 알 수 있는가? 잘 모르겠다면 아래의 사이트에서 `Save + Run`을 눌러서 동작하는 것을 살펴보자.

[코드 동작 살펴보기](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbXVsdGlwbHkoeCx5KSB7CiAgICByZXR1cm4geCAqIHk7Cn0KCmZ1bmN0aW9uIHNxdWFyZSh4KSB7CiAgICByZXR1cm4gbXVsdGlwbHkoeCx4KTsKfQoKZnVuY3Rpb24gaXNSaWdodFRyaWFuZ2xlKGEsYixjKXsKICAgIHJldHVybiBzcXVhcmUoYSkgKyBzcXVhcmUoYikgPT09IHNxdWFyZShjKTsKfQoKaXNSaWdodFRyaWFuZ2xlKDMsNCw1KQ%3D%3D!!!)

### 개발자 도구 source 탭에서 살펴보기

크롬 개발자 도구의 source 탭에 들어가서 breakpoint를 설정하면 내 함수가 어떤 순서로 동작하는지 알 수 있다. 동작 순서에 문제가 있거나, 헷갈릴 때 들어가서 확인해보자!
