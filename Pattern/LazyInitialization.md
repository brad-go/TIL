# Lazy Initialization (초기화 지연)

클린 코드 책을 읽는데, 초기화 지연이란 개념이 나왔다. 구글을 열심히 검색해봐도 이 개념에 대해 이해가 될만한 설명될 글을 찾지 못해서 애먹었지만, 생각보다 이 개념은 간단한 개념이었다. 말 그대로 초기화를 천천히 하는 기법이다.

## 목차

1. [Lazy Initialization이란?](#lazy-initialization이란)
2. [초기화 지연 그래서 어떻게 하는 건데?](#초기화-지연-그래서-어떻게-하는-건데)
3. [초기화 지연 패턴 구현하기](#초기화-지연-패턴-구현하기)
4. [useState 지연 초기화](#usestate-지연-초기화)

## Lazy Initialization이란?

**초기화 지연(lazy initialization)** 이란 초기화 시점을 그 값이 처음 필요할 때까지 객체 생성, 값 계산 또는 기타 값비싼 프로세스를 지연시키는 기법으로 일종의 **지연 평가(lazy evaluation)** 이라고 할 수 있다.
그러므로 값이 쓰이지 않으면 초기화도 결코 일어나지 않으며, **객체의 거의 사용되지 않는 속성이 있는 경우 시작 속도를 향상** 시킬 수 있다. 주로 최적화 용도로 사용되지만, 클래스와 인스턴스 초기화 때 발생하는 위험한 순환 문제를 해결하는 효과도 있다.

- **한번만 생성하거나 정보를 요청하고, 즉시 필요하지 않을 수 있는 항목의 초기화에 적합한 기법**이다.
- 자원을 많이 사용하는 복잡한 서비스 혹은 당장 필요하지 않은 요소에 대한 접근을 제공하기 위해 사용될 수 있다.

### 장점

1. 실제 필요시까지 객체를 생성하지 않으므로 불필요한 부하가 걸리지 않는다. 즉, 어플리케이션 시작 시간이 빨라진다.
2. 어떤 경우에도 null 포인터를 반환하지 않는다.

### 단점

**지연 초기화는 필요할 때까지 하지 않는 게 좋다.**

1. 클래스 혹은 인스턴스 생성 시의 초기화 비용은 줄지만, 그 대신 지연 초기화하는 필드에 접근하는 비용은 커진다.
2. 지연 초기화하려는 필드들 중 결국 초기화가 이뤄지는 비율, 실제 초기화에 드는 비용, 초기화 된 각 필드의 호출빈도에 따라 지연 초기화가 실제로는 성능을 느려지게 할 수 있다.

## 초기화 지연 그래서 어떻게 하는 건데?

기본적인 개념을 읽어봐도 이해가 안될 수 있다. 나도 그랬다. 그렇다면 지연 초기화가 어떤 방식인지 코드로 알아보자.

```js
class Fruit {
  private static types: ObjType = {};

  constructor(type: FruitType) {}

  // 객체가 가진 프로퍼티 수 확인하기
  static count(obj: Object) {
    return Object.keys(obj).length;
  }

  // 개인 멤버 초기화 여부 확인
  static getFruit(type: FruitType) {
    // 없다면 새 인스턴스가 만들어져 멤버 변수에 배치
    if (!this.types[type]) this.types[type] = new Fruit(type);

    // 멤버가 있는 경우 즉시 반환
    return this.types[type];
  }

  static printCurrentTypes() {
    console.log("Number of instances made " + this.count(this.types));
    for (let type in this.types) {
      console.log(type);
    }
  }
}

Fruit.getFruit("Apple");
Fruit.printCurrentTypes();
Fruit.getFruit("Banana");
Fruit.printCurrentTypes();
Fruit.getFruit("Apple");
Fruit.printCurrentTypes();

// Number of instances made 1
// Apple
// Number of instances made 2
// Apple
// Banana
// Number of instances made 2
// Apple
// Banana
```

위 코드는 위키피디아에서 제공하는 코드를 타입스크립트와 클래스를 이용해서 재구현한 코드이다.

```ts
class Fruit {
  private static types: ObjType = {};
  ...
  // 개인 멤버 초기화 여부 확인
  static getFruit(type: FruitType) {
    // 없다면 새 인스턴스가 만들어져 멤버 변수에 배치
    if (!this.types[type]) this.types[type] = new Fruit(type);

    // 멤버가 있는 경우 즉시 반환
    return this.types[type];
  }
  ...
}
```

이 부분을 자세히 보자. 지금 `types는` 정적 멤버로 선언되었으며, 빈 객체이다. 즉, 이 `types`는 아무런 프로퍼티를 가지고 있지 않으며, 각 프로퍼티는 초기화되지 않은 상태이다.
각 개인 멤버가 이미 초기화되어있는지 여부를 우리는 접근자 메서드를 살짝 보강해서 확인할 수 있다. `types`에 멤버가 있는지를 확인하고 없다면 새 인스턴스가 만들어져 멤버 변수에 배치되고, 호출자에게 반환된다. 멤버가 있는 경우는 즉시 반환된다.

조금 느낌이 오는가? 지금 `types`란 객체에 각 프로퍼티에 대한 초기화를 지연시킨 코드를 본 것이다. `types`의 각 프로퍼티는 getter 함수를 통해 접근할 때 초기화 되고 반환된다.

```js
console.log(Fruit.types); // {}
```

참고로 직접 접근 시 아무것도 얻을 수 없다. 초기화되지 않았으니까! 그러므로 초기화 지연은 한번만 생성하거나 정보를 요청하고, 즉시 필요하지 않은 항목의 초기화에 적합한 기법이란 것을 알 수 있다.

## 초기화 지연 패턴 구현하기

다시 한번 예시를 보면서 초기화 지연에 대해 조금 더 알아보자. 초기화 지연 패턴을 구현하는 방법은 다음과 같다.

```ts
export interface LazyInitializer<T> {
  (): T;
}

export class Lazy<T> {
  // 초기화 되지 않은 상태
  private instance: T | null = null;
  private initializer: LazyInitializer<T>;

  constructor(initializer: LazyInitializer<T>) {
    this.initializer = initializer;
  }

  // getter를 이용해서 initailizer를 통해 얻은 반환 값을 instance 변수에 초기화
  get value(): T {
    if (this.instance === null) {
      this.instance = this.initializer();
    }

    return this.instance;
  }
}

const lazy = new Lazy(() => "My lazy value");
console.log(lazy); // Lazy { instance: null, initializer: [Function (anonymous)] }
console.log(lazy.value); // My lazy value
```

콘솔에 출력값을 보자. `instance`는 여전히 초기화되어있지 않다. 하지만 getter `value`를 호출하는 순간 객체는 초기화 되며 값을 반환한다.

이 패턴에 지금 간단한 함수가 들어왔지만, 클래스 혹은 DOM 객체 등 다양한 값이 들어올 수 있다.

## useState 지연 초기화

위에서 본 지연 초기화 기법을 리액트에서도 사용할 수 있다. 리액트를 사용해봤다면 `useState`의 사용법을 알 것이다. 간단한 예시를 보자.

```tsx
const Counter = () => {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((prev) => prev + 1);
  return <button onClick={increment}>{count}</button>;
};
```

Counter 컴포넌트는 함수다. 이 함수 안에 `console.log()`를 하면 버튼을 클릭할 때마다 함수가 실행되는 것을 알 수 있다. 카운터 기능이 모든 렌더링 단계에서 실행되고 버튼을 클릭하면 다시 렌더링을 트리거하는 상태 업데이트가 일어난다.
한 가지 명심해야 할 것은 **함수 본문이 실행되면 그 안에 있는 모든 코드도 함께 실행된다는 것**이다. 즉, 모든 변수 또는 전달하는 인자가 렌더링될 때마다 생성되고 평가된다. 자바스크립트 엔진은 매우 빠르며 이런 종류의 작업을 최적화할 수 있기 때문에 일반적으로는 큰 문제가 아니다.

```tsx
const initialState = 0;
const [count, setCount] = React.useState(initialState);
```

그러나 상태의 초기 값의 계산 비용이 많이 든다면???

```tsx
const initialState = calculateSomethingExpensive(props);
const [count, setCount] = React.useState(initialState);
```

`localStorage` 또는 입출력 작업이 무엇인지 읽어야 하는 경우에는?

```tsx
const initialState = Number(window.localStorage.getItem("count"));
const [count, setCount] = React.useState(initialState);
```

위처럼 자원이 많이 소모되는 작업의 경우 초기화 지연을 사용해서 성능을 최적화할 수 있다. React가 초기 상태를 필요로 하는 때는 유일하게 첫 번째 렌더링에서 초기 상태만 필요로 한다. 그러나 구성 요소를 다시 **렌더링할 때마다 함수 본문이 실행되므로 값이 사용되지 않거나 필요하지 않더라도 모든 렌더링에서 해당 코드를 실행하게 된다**.

```tsx
const getInitialState = () => Number(window.localStorage.getItem("count"));
const [count, setCount] = React.useState(getInitialState);
```

함수가 하는 일이 자원이 많이 소모되더라도 함수를 생성하는 것은 빠르게 할 수 있다. 리액트는 함수를 호출할 때만 성능 패널티를 지불하게 된다. 따라서 함수를 **useState의 초기값으로 전달하면 리액트는 초기 값이 필요할 때만 함수를 호출**한다. (컴포넌트가 처음 렌더링될 때)

이러한 방법을 초기화 지연이라고 하며, 성능 최적화 방법이다. 많이 사용할 필요는 없지만 상황에 따라 유용할 수 있으니 알아두자.

## 참고

- [DotNetNerd님의 블로그](https://blog.dotnetnerd.dk/post/2017/07/12/TypeScript-patterns-Lazy.aspx)
- [켄트 C.도즈님의 블로그](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates)
