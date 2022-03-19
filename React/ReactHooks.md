# ReactHooks

리액트 공식문서를 보고 정리한 글입니다.

## 목차

1. [리액트 훅이란?](#question-리액트-훅이란)
2. [Hook 사용 규칙](#v-hook-사용-규칙)
3. [useState](#pushpin-usestate)
4. [useEffect](#zap-useeffecteffect-hook)

## :question: 리액트 훅이란?

훅(Hook)이 무엇인지에 대한 의문이 먼저들 수 있다. 훅은 함수 컴포넌트에서 React **state**와 **생명주기 기능**(Lifecycle features)을 '**연동(hook into)**'할 수 있게 해주는 **함수**다. 훅은 클래스 안에서 동작하지 않지만, 클래스 없이 리액트를 사용할 수 있게 해준다.

리액트는 `useState`, `useEffect`와 같은 내장 훅을 몇가지 제공하고, 컴포넌트 간에 상태 관련 로직을 재사용하기 위해 훅을 직접 만드는 것도 가능하다.

[:arrow_up: Back to the top](#목차)
<br />

## :v: Hook 사용 규칙

Hook은 그냥 JavaScript 함수이지만, 두 가지 규칙을 준수해야 한다.

```jsx
// 화살표 함수로 작성
const Example = (props) => {
  // 여기서 훅을 사용할 수 있다!
  return <div />;
};

// 일반 함수로 작성
function Example(props) {
  // 여기서 훅을 사용할 수 있다!
  return <div />;
}
```

- '**최상위(at the top level)**'에서만 훅을 호출해야 한다. 반복문, 조건문, 중첩된 함수 내에서 훅을 실행할 수 없다.
- **함수형 컴포넌트** 내에서만 훅을 호출해야 한다. 일반 JavaScript 함수에서는 훅을 호출해서는 안된다. (예외로 커스텀 훅에서는 훅을 호출할 수 있다.)

[:arrow_up: Back to the top](#목차)
<br />

## :pushpin: useState

```jsx
import React, { useState } from "react";

const Example = () => {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleCount}>Click me</button>
    </div>
  );
};

export default App;
```

<details><summary><b>클래스 형</b></summary>
<div markdown="1">

```jsx
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleCount = () => {
    this.setState((state) => ({
      count: state.count + 1,
    }));
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleCount}>Click me</button>
      </div>
    );
  }
}

export default App;
```

</div>
</details>
<br />

- React는 해당 변수를 리렌더링할 때 기억하고, 가장 최근에 갱신된 값을 제공한다.
- 배열 구조 분해 문법을 통해 호출된 `state` 변수들을 다른 변수명으로 할당할 수 있다.
- 함수 컴포넌트는 `this`를 가질 수 없기 때문에 `this.state`를 할당하거나 읽을 수 없다. 대신, `useState`의 훅을 직접 컴포넌트에 호출한다.
- class의 `this.setState`와 유사하지만 차이점이 있다.
  - 이전 `state`와 새로운 `state`를 합치지 않는다.
  - 객체일 필요가 없다.

### state 변수 선언하기

```js
import React, { useState } from "react";

const Example = () => {
  // 새로운 state 변수를 선언하고, 이것을 count라 부를것임.
  const [count, setCount] = useState(0);
};
```

<details><summary><b>클래스 형</b></summary>
<div markdown="1">

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
```

</div>
</details>
<br />

#### useState를 호출하는 것은 무엇을 의미할까?

- state의 이름은 위에서 `count`였지만 `banana`처럼 아무 이름으로 지어도 된다.
- `useState`는 클래스 컴포넌트의 `this.state`가 제공하는 기능과 똑같다.
- 일반 변수는 함수가 끝날 때 사라지지만, state 변수는 React에 의해 사라지지 않는다.

#### useState의 인자로 무엇을 넘겨야 할까?

- `useState()` 훅의 인자로 넘겨주는 값은 state의 초기 값이다.
- 함수 컴포넌트의 state는 클래스와 달리 객체일 필요가 없고, 숫자 타입과 문자 타입을 가질 수 있다.

#### useState는 무엇을 반환할까?

- state변수, 해당 변수를 갱신할 수 있는 함수 이 두가지 쌍을 반환한다.

### state 가져오기

```js
<p>You clicked {count} times</p>
```

함수형 컴포넌트는 `count`를 직접 사용한다.

```js
<p>You clicked {this.state.count} times</p>
```

반면 클래스 컴포넌트는 count를 보여주기 위해 `this.state.count`를 사용한다.

### state 갱신하기

```js
<button onClick={() => setCount(count + 1)}>Click me</button>
```

함수 컴포넌트는 `setCount`와 `count` 변수를 가지고 있으므로 `this`를 호출하지 않아도 된다.

```js
<button onClick={() => this.setState({ count: this.state.count + 1 })}>
  Click me
</button>
```

반면 클래스 컴포넌트는 `count`를 갱신하기 위해 `this.setState()`를 호출한다.

### 요약

```js
const [state, setState] = useState(initialState);
```

- `useState`는 상태 유지 값과 그 값을 갱신하는 함수를 반환하다.
- 최초로 렌더링을 하는 동안, 반환된 `state`는 첫 번째 전달된 인자(`initialState`)의 값과 같다.
- `setState` 함수는 state를 갱신할 때 사용된다. 새 state 값을 받아 컴포넌트 리렌더링을 큐에 등록한다.

[:arrow_up: Back to the top](#목차)

<br />

## :zap: useEffect(Effect Hook)

Effect Hook을 사용하면 함수 컴포넌트에서 side effect를 수행할 수 있다.

```js
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount, componentDidUpdate와 같은 방식으로
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

리액트 컴포넌트 안에서 데이터를 가져오거나 구독하고, DOM을 직접 조작하는 작업을 해봤을 것이다. 이런 동작을 모두 '**side effects**'(또는 짧게 'effects')라고 한다. 왜냐하면 이것은 다른 컴포넌트에 영향을 줄 수도 있고, 렌더링 과정에서는 구현할 수 없는 작업이기 때문이다.

> useEffect 훅을 componentDidMount와 componentDidUpdate, componentWillUnmount가 합쳐진 것으로 생각해도 좋다.

리액트 컴포넌트에는 일반적으로 두 종류의 side effects가 있다. **정리(clean-up)가 필요한 것과 그렇지 않은 것**. 이 둘에 대해 알아보자.

### 정리(Clean-up)를 이용하지 않는 Effects

**리액트가 DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우가 있다.** 네트워크 요청, DOM 수동 조작, 로깅 등은 정리(clean-up)가 필요 없는 경우들이다. 이러한 예들은 실행 이후 신경 쓸 것이 없기 때문이다. class와 hook이 이러한 side effects를 어떻게 다르게 구현하는지 비교해보자.

#### Class를 사용하는 예시

리액트의 클래스 컴포넌트에서 `render` 메서드 그 자체는 side effect를 발생시키지 않는다. 이 때는 아직 이른 시기로서 이러한 effect를 수행하는 것은 리액트가 DOM을 업데이트하고 난 이후이다.

리액트 클래스에서 side effect를 `componentDidMount`와 `componentDidUpdate`에 두는 것이 바로 이 때문이다.

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

위 코드에서 **class 안의 두 개의 생명주기 메서드에 같은 코드가 중복된다.**

이는 컴포넌트가 이제 막 마운트된 단계인지, 아니면 업데이트 되는 것인지에 상관없이 같은 side effect를 수행해야 하기 때문이다. 개념적으로는 렌더링 이후에는 항상 같은 코드가 수행 되기를 바라는 것이다. 하지만 리액트 클래스 컴포넌트는 그러한 메서드를 가지고 있지 않기 때문에 함수를 별개의 메서드를 뽑아낸다고 해도 여전히 두 장소에서 함수를 불러내야 한다.

#### Hook을 이용하는 예시

```js
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

##### useEffect가 하는 일은 무엇일까?

- useEffect 훅을 이용하여 우리는 리액트에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야하는 지를 말할 수 있다.
- 리액트는 우리가 넘긴 함수를 기억했다가(이 함수를 'effect'라고 부른다) DOM 업데이트를 수행한 이후에 불러낼 것이다.
- 위의 경우에는 effect를 통해 문서 타이틀을 지정하지만, 이 외에도 데이터를 가져오거나 다른 명령형(imperative) API를 불러내는 일도 할 수 있다.

##### useEffect를 컴포넌트 안에서 불러내는 이유는?

- `useEffect`를 컴포넌트 내부에 둠으로써 effect를 통해 `count` state 변수(또는 그 어떤 prop에도)에 접근할 수 있게 된다.
- 함수 범위 안에 존재하기 때문에 특별한 API 없이도 값을 얻을 수 있는 것이다!

##### useEffect는 렌더링 이후에 매번 수행되는 걸까?

- 기본적으로 첫번째 렌더링과 이후의 모든 업데이트에서 수행된다. (필요에 맞게 수정할 수 있다.)
- 마운팅과 업데이트라는 방식으로 생각하는 대신 effect를 렌더링 이후에 발생하는 것으로 생각하는 것이 더 쉬울 것이다.
- 리액트는 effect가 수행되는 시점에 이미 DOM이 업데이트 되었음을 보장한다.

#### 추가

`useEffect`에 전달되는 함수는 모든 렌더링에서 다르다. 이는 `state`가 제대로 업데이트 되는지에 대한 걱정 없이 effect 내부에서 그 값을 읽을 수 있게 해준다. 리렌더링하는 때마다 모두 이전과 다른 effect로 교체하여 전달한다. 이 점이 렌더링의 결과의 한 부분이 되게 만드는 점인데, 각각의 effect는 특정한 렌더링에 속한다.

> 브라우저가 화면을 그리기 이전에 동기적 실행이 필요한 경우에는 useEffect와 동일한 API를 사용하는 `useLayoutEffect`라는 별도의 훅을 사용한다.

### 정리(clean-up)를 이용하는 Effects

위에서 정리(clean-up)가 필요하지 않은 side effect를 보았지만, 정리가 필요한 effect도 있다. 외부 데이터에 **구독(subscription)을 설정해야 하는 경우**를 생각해보자. 이런 경우에 메모리 누수가 발생하지 않도록 정리하는 것은 매우 중요하다.

#### Class를 사용하는 예시

클래스 컴포넌트에서는 흔히 `componentDidMount`에 구독(subscription)을 설정한 뒤 `componentWillUnmount`에서 이를 정리(clean-up)한다.

```js
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentDidWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline,
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return "Loading...";
    }
    return this.state.isOnline ? "Online" : "Offline";
  }
}
```

`componentDidMount`와 `componentWillUnmout`가 어떻게 대칭을 이루고 있는지 보자. 두 개의 메서드 내에 개념상 똑같은 effect에 대한 코드가 있음에도 불구하고 생명주기 메서드는 이를 분리하게 만든다.

> 사실 이 예시가 완전하기 위해서는 `componentDidUpdate`가 필요하다.

### Hook을 이용하는 예시

정리(clean-up)의 실행을 위해 별개의 effect가 필요하다고 생각할 수도 있다. 하지만 구독(subscription)의 추가와 제거를 위한 코드는 결합도가 높기 때문에 useEffect는 이를 함께 다루도록 고안되었다. effect가 함수를 반환하면 리액트는 그 함수를 정리가 필요한 때에 실행시킬 것이다.

```js
import React, { useState, useEffect } from 'react';

const FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    const handleStatusChange = (status) => {
      setIsOnline(status.isOnline)
    };
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatausChange);
    // effect 이후에 어떻게 정리(clean-up)할 것인지 표시한다.
    return function cleanup() {
      ChatAPI.unsubscribeToFriendStatus(props.friend.id, handleStatausChange);
    };
  });

  if (isOnline === null) return 'Loading...';
  return isOnline ? 'Online' : 'Offline';
}
```

#### effect에서 함수를 반환하는 이유는 무엇일까?

이는 effect를 위한 추가적인 정리(clean-up) 메커니즘이다. 모든 effect는 정리르 ㄹ위한 함수를 반환할 수 있다. 이 점이 구독(subscription)의 추가와 제거를 위한 로직을 가까이 묶어둘 수 있게 한다. 구독(subscription)의 추가와 제거가 모두 하나의 effect를 구성하는 것이다.

#### 리액트가 effect를 정리(clean-up)하는 시점은 정확히 언제일까?

리액트는 컴포넌트가 마운트 해제되는 때에 정리(clean-up)를 실행한다. 하지만 위의 예시에서 봤듯이 effect는 한 번이 아니라 렌더링이 실행되는 때마다 실행된다. 리액트가 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect 또한 정리하는 이유가 바로 이 때문이다. 이것은 **버그를 방지하는데 도움이 되고**, **성능 저하 문제가 발생할 경우 effect를 건너뛸** 수도 있다.

> effect에서 반드시 유명함수(named function)를 반환해야 하는 것은 아니다. 목적을 분명히 하기 위해 `정리(clean-up)`라고 부르고 있지만 화살표 함수르 ㄹ반환하가너 다른 이름으로 불러도 무방하다.

### 요약

- 기본적으로 동작은 브라우저의 모든 렌더링이 완료된 후에 수행되지만, 특정 값이 변경되었을 때만 실행되게 할 수도 있다. (브라우저가 화면을 그리기 이전 시점에 동기적으로 시행하려면 `useLayoutEffect`를 사용)
- useEffect는 함수 컴포넌트 내에서 [side effects](#⚡️-useeffecteffect-hook)를 수행할 수 있게 해준다. 클래스 컴포넌트에서 사용하는 componentDidMount, componentDidUpdate, componentWillUnmount와 같은 목적으로 제공되지만, 하나의 API로 통합된 것이다.

<br />

### useEffect를 이용하는 팁

#### 팁: 관심사를 구분하려고 한다면 Multiple Effect를 사용한다.

훅의 탄생 동기 중 하나가 클래스 컴포넌트의 생명주기 메서드가 관련 없는 로직들은 모아두고, 관련이 있는 로직들은 여러 개의 메서드에 나누어 놓는 경우가 자주 있었기 때문이다. 위의 예시를 다시 보자.

```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

`document.title`을 설정하는 로직이 `componentDidMount`와 `componentDidUpdate`로 나누어져 있다. 구독(subscription)로직 또한 `componentDidUpdate`와 `componentDidUpdate`에 나누어져 있다. `componentDidUpdate`가 두 가지의 작업을 위한 코드를 모두 가지고 있다.

훅을 이용하여 이 문제를 어떻게 해결할 수 있을까? `useState`를 여러 번 사용할 수 있는 것처럼 effect 또한 여러 번 사용할 수 있다. Effect를 이용하여 서로 관련이 없는 로직들을 갈라 놓을 수 있다.

```js
const FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    const handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

훅을 이용하면 생명주기 메서드에 따라서가 아니라 **코드가 무엇을 하는지에 따라** 나눌 수가 있다. 리액트는 컴포넌트에 사용된 모든 effect를 지정된 순서에 맞춰 적용한다.

#### 부가 설명: effect가 업데이트 시마다 실행되는 이유

왜 useEffect의 정리(clean-up)가 마운트 해제되는 때에 한 번만이 아니라 모든 리렌더링 시에 실행될까? 이러한 디자인이 버그가 적은 컴포넌트를 만드는 데에 도움이 되기 때문이다.

위에서 다뤘던 친구가 온라인인지 아닌지 표시하는 `FriendStatus` 컴포넌트 예시를 생각해보자. 클래스는 `this.props`로부터 `friend.id`를 읽어내고 컴포넌트가 마운트된 이후에 친구의 상태를 구독하며 컴포넌트가 마운트를 해제할 때에 구독을 해지한다.

```js
componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentDidWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

그너데 **컴포넌트가 화면에 표시되어 있는 동안 friend props이 변한다면** 무슨 일이 일어날까? 컴포넌트는 다른 친구의 온라인 상태를 계속 표시할 것이다. 바로 버그다! 또한 마운트 해제가 일어날 동안에는 구독 해지 호출이 다른 친구 ID를 사용하여 메모리 누수나 충돌이 발생할 수 있다.

클래스 컴포넌트는 이런 경우를 다루기 위해 `componentDidUpdate`를 사용한다.

```js
componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate(prevProps) {
    // 이전 friend.id에서 구독을 해지합니다.
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // 다음 friend.id를 구독합니다.
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
```

리액트 애플리케이션의 흔한 버그 중 하나가 componentDidUpdate를 제대로 다루지 않는 것이다.

이번에는 훅을 사용하는 컴포넌트를 생각해보자.

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

이 경우에는 버그에 시달리지 않는다.

**useEffect가 기본적으로 업데이트를 다루기 때문에 더는 업데이트를 위한 특별한 코드가 필요없다**. 다음의 effect를 적용하기 전에 이전의 effect는 정리(clean-up)한다. 구독과 구독 해지 호출을 반복해서 만들어 내는 컴포넌트를 통해 이를 가시화 해보자.

```js
// { friend: { id: 100 } } state을 사용하여 마운트합니다.
ChatAPI.subscribeToFriendStatus(100, handleStatusChange); // 첫번째 effect가 작동합니다.

// { friend: { id: 200 } } state로 업데이트합니다.
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 이전의 effect를 정리(clean-up)합니다.
ChatAPI.subscribeToFriendStatus(200, handleStatusChange); // 다음 effect가 작동합니다.

// { friend: { id: 300 } } state로 업데이트합니다.
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 이전의 effect를 정리(clean-up)합니다.
ChatAPI.subscribeToFriendStatus(300, handleStatusChange); // 다음 effect가 작동합니다.

// 마운트를 해제합니다.
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 마지막 effect를 정리(clean-up)합니다.
```

이러한 방식으로 동작하는 것이 일관성을 유지해주며 클래스 컴포넌트에서는 흔히 업데이트 로직을 빼먹으면서 발생할 수 있는 버그를 예방한다!

#### 팁: Effect를 건너뛰어 성능 최적화하기

모든 렌더링 이후에 effect를 정리(clean-up)하거나 적용하는 것이 때때로 성능 저하를 발생시키는 경우도 있다. 클래스 컴포넌트의 경우에는 `componentDidUpdate`에서 `prevProps`나 `prevState`와의 비교를 통해 이러한 문제를 해결할 수 있다.

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

이러한 요구 조건은 흔하기 때문에 useEffect 훅 API에 이미 내재되어 있다. 특정 값들이 리렌더링 시에 변경되지 않는다면 리액트로 하여금 effect를 건너뛰도록 할 수 있다. useEffect의 선택적 인수인 두 번째 인수로 배열을 넘기면 된다.

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // count가 바뀔 때에만 effect를 재실행한다.
```

위의 예시를 보자. `count`가 `5`이고 컴포넌트가 리렌더링된 이후에도 여전히 `count`는 변함없이 `5`라면 리액트는 이전 렌더링 시의 값 `[5]`를 그 다음 렌더링 때의 `[5]`와 비교한다. 배열 내의 모든 값이 같기 때문에(`5 === 5`) 리액트는 effect를 건너뛰게 된다. 이런 식으로 최적화가 가능하다.

> 이 최적화 방법을 사용한다면 배열이 **컴포넌트 범위 내에서 바뀌는 값들과 effect에 의해 사용되는 값들을 모두 포함하는 것**을 기억하자! 그렇지 않으면 현재 값이 아닌 이전의 렌더링 때의 값을 참고하게 된다.
> effect를 실행하고 이를 정리(clean-up)하는 과정을 (마운트와 마운트 해제 시에) 딱 한번씩만 실행하고 싶다면, 빈 배열(`[]`)을 두 번째 인수로 넘기면 된다. 이렇게 함으로 리액트가 우리 effect가 prop이나 state의 그 어떤 값에도 의존하지 않으며 따라서 재실행되어야 할 필요가 없음을 알게 하는 것이다.
> exhaustive-deps 규칙을 eslint-plugin-react-hooks 패키지에 포함하는 것을 추천한다. 이 패키지는 의존성이 바르지 않게 지정되었을 때 경고하고 수정하도록 알려준다.

[:arrow_up: Back to the top](#목차)
<br />
