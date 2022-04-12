# [React] 리액트에서 좋은 코드란?

## 목차

- [리액트로 사고하기](#리액트로-사고하기)
  - [컴포넌트 분리](#컴포넌트-분리)
  - [컴포넌트 내 변수 위치](#컴포넌트-내-변수-위치)
- [state 설계하기](#state-설계하기)
- [클린 코드를 위한 몇가지 방법들]()

## 리액트로 사고하기

[공식 문서: React로 사고하기](https://ko.reactjs.org/docs/thinking-in-react.html)

위 링크를 들어가서 리액트로 사고하는 방식에 대해 공부해보자. 아주 친절하고 자세하게 설명되어 있다. 위 글에서 핵심을 뽑아내자면 다음과 같다.

### 컴포넌트 분리

최근에 면접에서 이런 질문을 받은 적이 있다. **"어떤 기준으로 컴포넌트를 분리하시나요?"** 그렇게 공부했고 당연한 것인데, 나는 대답하지 못했다. 면접이라 긴장해서라고 핑계대고 싶지만, 한 마디로 대답할 수 없을 정도의 수준이었던 것이다.
그렇다면 어떤 것이 컴포넌트가 되고, 언제 컴포넌트를 분리해야 할까? 함수나 객체를 만들 때처럼 만들면 된다. 가장 주의를 두어야 할 것은 단일 책임 원칙<sup>[[1]](#footnote_1)</sup>이다. 이는 **하나의 컴포넌트는 한 가지 일을 하는게 이상적이라는 원칙**이다. 하나의 컴포넌트가 커지게 된다면 다른 기능을 하는 작은 것을 다른 하위 컴포넌트로 분리해내야 한다.

### 컴포넌트 내 변수 위치

> 유지보수에 가장 시간이 많이 드는 것은 동료, 그리고 미래의 내가 '나의 코드를 한 번에 흐름을 파악하기 어려울 때'

위의 말이 공감이 가는가? 코드의 흐름을 한번에 파악할 수 있게 코드를 작성하는 것은 정말 중요한 일이다. 코드를 리팩토링 해야되는데, 코드를 이해하기 위해 매번 시간을 낭비할 수 없다. 그러므로 우리는 가독성을 위해 서로 간단한 약속을 한다.

```jsx
// 1. import

// 2. propType

// 3. 컴포넌트 정의

// 4. Styled Component

// 5. 간단한 상수 설정 (웬만하면 외부로)

// 6. 해당 컴포넌트에서만 사용할 함수 (2번 이상 사용하면 utils 함수로 만들기)
```

#### 1. import

import 문을 통해 이 파일에서는 어떤 것들이 필요한지 알 수 있다. 그러므로 한 눈에 파악할 수 있도록 작성한다. 가독성을 위해 분류별로 한줄 띄워도 괜찮다.

- node modules 먼저
- utils 같은 함수
- 멀리 있는 컴포넌트
- 근처에 있는 컴포넌트
- style 관련

#### 2. propType

TypeScript를 사용하지 않는 경우 있으면 좋다.

- 타입 오류를 막아준다.
- propType만 보고 컴포넌트 내에서 어떤 형식의 값을 관리하고 있는지 알기 좋다.

#### 3. 컴포넌트 정의

리액트는 컴포넌트 중심으로 코드를 작성한다. 상단에 상수 설정이나 styled-component가 정의되어 있다면, 이 컴포넌트가 어떤 역할을 하는지 바로 알기 어렵다.

**컴포넌트부터 정의하여, 이 컴포넌트가 어떤 역할을 하는지 한 번에 알아볼 수 있도록 하자!**

#### 4. styled-component

앞서 말한 것과 같다. 컴포넌트가 먼저오고 다음에 정의한다.

#### 5. 간단한 상수 설정

간단한 상수나 data 등을 정의할 수 있다. data가 객체에 너무 길면 외부 파일로 분리하자. 상수의 사용을 알고 시작하기 위해 2번 다음에 쓰이는 경우도 많다.

#### 6. 함수

컴포넌트의 상태와 props에 독립적인 로직인 경우 밖으로 빼자.

> 5, 6번을 밖으로 빼는 이유는 컴포넌트 내부에서 state, props와 상관없는 코드가 있을 때, 렌더링 시마다 불필요한 생성이 일어나는데, 이를 피할 수 있어서 성능에 더 좋다.

**[⬆ Back to top](#목차)**
<br />

## state 설계하기

`state`는 오직 상호작용을 위해, 즉 **시간이 지남에 따라 데이터가 바뀌는 것에 사용**해야 한다.

어플리케이션을 올바르게 만들기 위해서는 필요로 하는 변경 가능한 state의 최소 집합을 생각해봐야 한다. 여기서 핵심은 중복배제원칙<sup>[[2]](#footnote_2)</sup>이다.

**어플리케이션이 필요로 하는 가장 최소한의 state를 찾고 이를 통해 나머지 모든 것들이 필요에 따라 그때그때 계산되도록 만들자.**

예를 들어 TODO 리스트를 만든다고 하면, TODO 아이템을 저장하는 배열만 유지하고 TODO 아이템의 개수를 표현하는 상태를 별도로 만들 필요 없다. TODO 개수를 렌더링해야한다면 TODO 아이템 배열의 길이를 가져오면 된다.

### state란?

아직 state에 대해 감이 오지 않는다면 다음을 생각해보자.

- props를 통해 부모로부터 전달되는가?
- 시간이 지나도 변하지 않는가?
- 컴포넌트의 다른 state 또는 props를 기반으로 계산할 수 있는가?

위 세가지 질문에 각각 yes라고 답할 수 있다면 그것은 state가 아니다.

**[⬆ Back to top](#목차)**
<br />

## 클린 코드를 위한 몇가지 방법들

### 1. 조건부 렌더링

삼항 연산자는 중첩되면 파악하기 힘들며, 요소 길이가 길어질 때가 많아서 흐름을 놓친다.

만약 상태가 true일때만 무언가를 렌더링하고 false일때는 아무것도 하고싶지 않을 때, `&&` 연산자를 사용하자.

#### Bad:

```jsx
import React, { useState } from "react";

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={handleClick}>Toggle Modal</button>
      {isOpen ? <div>Modal is Open!</div> : null} // 굳이 필요없는 null을 넣지 말자
    </>
  );
};
```

#### Good:

```jsx
import React, { useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={handleClick}>Toggle Modal</button>
      {isOpen && <div>Modal is Open!</div>}
    </>
  );
};
```

### 2. Boolean 프로퍼티

boolean으로 사용되는 props는 true 값을 할당하지 않아도 이름만으로 할당이 가능하다!

#### Bad:

```jsx
import React from "react";

const HungryMessage = ({ isHungry }) => (
  <span>{isHungry ? "Iam hungry" : "I am full"}</span>
);

const Hungry = () => {
  return (
    <>
      <p>This person is hungry: </p>
      <HungryMessage isHungry={true} />
      <p>This person is full: </p>
      <HungryMessage isHungry={false} />
    </>
  );
};
```

#### Good:

```jsx
import React from "react";

const HungryMessage = ({ isHungry }) => (
  <span>{isHungry ? "Iam hungry" : "I am full"}</span>
);

const Hungry = () => {
  return (
    <>
      <p>This person is hungry: </p>
      <HungryMessage isHungry />
      <p>This person is full: </p>
      <HungryMessage isHungry={false} />
    </>
  );
};
```

**[⬆ Back to top](#목차)**
<br />

## 각주

<a name="footnote_1">1. [단일 책임 원칙](https://ko.wikipedia.org/wiki/%EB%8B%A8%EC%9D%BC%EC%B1%85%EC%9E%84%EC%9B%90%EC%B9%99)</a>

객체 지향 프로그래밍에서 단일 책임 원칙이란 모든 클래스는 하나의 책임만 가지며, 클래스는 그 책임을 완전히 캡슐화해야 함을 일컫는다. 클래스가 제공하는 모든 기능은 이 책임과 주의 깊게 부합해야 한다.
한 클래스를 한 관심사에 집중하도록 유지하는 것이 중요한 이유는, 이것이 클래스를 더욱 튼튼하게 만들기 때문이다.

<a name="footnote_2">2. [중복 배제 원칙](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)</a>

소프트웨어 패턴의 반복을 줄이는 것을 목표로 하는 소프트웨어 개발원칙. 중복을 피하기 위해 추상화로 대체하거나 데이터 정규화를 사용한다.

**[⬆ Back to top](#목차)**
<br />

## 참고

- [React로 생각하기](https://ko.reactjs.org/docs/thinking-in-react.html)
- [useState 과도하게 사용하지 않기](https://www.zigae.com/useState-dont-over/)
- [리액트 클린 코드 - 깔끔하고 더 나은 코드를 쓸 수 있는 간단한 방법들](https://jae04099.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%81%B4%EB%A6%B0-%EC%BD%94%EB%93%9C-%EA%B9%94%EB%81%94%ED%95%98%EA%B3%A0-%EB%8D%94-%EB%82%98%EC%9D%80-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%93%B8-%EC%88%98-%EC%9E%88%EB%8A%94-%EA%B0%84%EB%8B%A8%ED%95%9C-%EB%B0%A9%EB%B2%95%EB%93%A4)
