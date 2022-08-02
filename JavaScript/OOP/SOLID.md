# 객체지향 5원칙(SOLID)

객체지향 프로그래밍에 관해 공부해도 막상 적용해보려고 하면 어떻게 해야 할지 감이 안 올 수 있습니다. 이에 대해 해결책을 주지는 못하지만, **객체지향 프로그래밍의 설계에서 코드를 조금 더 나은 방향으로 이끌어줄 원칙 5가지**가 있습니다. 그것이 바로 **SOLID 원칙**입니다.

그러나 SOLID 원칙이 자바스크립트에 적용하기 더 어려울 수 있습니다. 자바나 C++과 같은 클래스 기반 객체지향 언어들과 달리 자바스크립트는 **함수형이면서 동시에 객체지향의 성격을 동시에 지니고 있기 때문**에 적용하기 어렵기 때문입니다.

SOLID원칙은 객체지향 프로그래밍의 설계라는 패러다임을 토대로 만들어지긴 했습니다. 그러나 객체지향에서만 적용되는 개념이라고는 볼 수 없습니다. SOLID 원칙은 클래스나 클래스와의 관계에 대한 원칙이지만, 이는 더 나아가 모든 프로그래밍에서도 고려해볼만한 원칙을 다룹니다.

# 1. SOLID 원칙이란?

SOLID 원칙이란 **객체 지향 프로그램 및 설계의 다섯 가지 기본 원칙**의 각 앞 글자를 딴 것을 말합니다. 프로그래머가 **시간이 지나도 유지 보수와 확장이 쉬운 시스템을 만들고자 할 때**, 이 원칙들을 함께 적용할 수 있습니다.

SOLI 원칙들은 프로그래머가 코드가 읽기 쉽고 확장하기 쉽게 될 때까지 리팩터링하여 코드의 악취를 제거하기 위해 적용할 수 있는 지침입니다. 이 원칙들은 애자일 소프트웨어 개발과 적응적 소프트웨어 개발의 전반전 전략의 일부입니다.

## 1.1 SOLID 원칙

객체 지향 프로그밍 설계의 5가지 원칙은 다음과 같습니다. 이 원칙들의 앞글자를 따서 SOLID라고 부릅니다.

- **S**RP(Single Responsiblility Principle, 단일 책임의 원칙)
- **O**CP(Open Closed Principle, 개방 폐쇄의 원칙)
- **L**SP(Liskov Substitution Principle, 리스코프 치환의 원칙)
- **I**SP(Interface Segregation Principle, 인터페이스 분리의 원칙)
- **D**IP(Dependency Inversion Principle, 의존성 역전의 원칙)

## 1.2 SOLID 원칙이 필요한 이유

SOLID 원칙은 **시간이 지나도 유지 보수와 확장이 쉬운 시스템을 목표**로 하고 있습니다. 왜 이러한 목표를 가지고 있을까요? 개발자들이 만드는 소프트웨어는 한 번 만들고 끝나는 것이 아니라 지속적인 변경이 필요하기 때문입니다.

우리가 작성한 코드는 **요구사항과 환경이 계속 달라질 것이고, 그에 따라 소프트웨어도 변화에 대응하고 성장해야합니다**. 하지만 코드를 변경하는 것은 쉬운 일이 아닙니다. 작은 변경 하나가 소프트웨어를 동작하지 못하게 할 수도 있고, 동작은 한다는 이유로 깨끗하지 않은 코드 몇번의 추가가 소프트웨어 자체를 망칠 수도 있으니까요.

이러한 문제를 최소화하기 위해 **변경에 유연한 구조를 만들기 위한 원칙이 SOLID 원칙**입니다. **변경이 발생했을 때, 다른 영역에 영향을 주지 않고 변경할 수 있다면 코드의 변경이 두렵지 않게 될 것**입니다. 자바스크립트에서도 이러한 원칙을 적용해서 프로그래밍 한다면 훨씬 더 나은 코드를 작성할 수 있겠죠?

# 2. SOLID 원칙

각 원칙들을 찾아보면 아주 자세한 정보들이 많습니다. 이 글에서는 간단히 teo님의 [Javascript에서도 SOLID 원칙이 통할까?](https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C)와 [clean-code-typescript](https://github.com/labs42io/clean-code-typescript#functions-should-do-one-thing)를 참고해서 정리해보려고 합니다.

자바스크립트에서 일반적으로 함수를 더 많이 다루기 때문에 기본적인 객체지향 관점의 SOLID보다는 함수형 프로그래밍에서 어떻게 적용할 수 있을지에 대해 다룹니다. 객체 지향 패러다임에 따른 SOLID 원칙에 대해 모르신다면 [여기](https://github.com/labs42io/clean-code-typescript#solid)를 참고하시면 좋을 것 같습니다!

## 2.1 단일 책임의 원칙(Single Responsibility Principle, SRP)

> **객체는 오직 하나의 책임을 가져야 한다. (객체는 오직 하나의 변경의 이유만을 가져야 한다.)**

### 객체지향 프로그래밍의 관점

**클래스는 책임, 즉 변경할 이유가 하나여야 한다**는 클래스나 모듈을 변경할 이유가 두가지 이상일 수 없다는 원칙입니다. 클래스에 많은 기능을 부여해 큰 클래스를 만든다면, 클래스가 개념적으로 **응집**되지 못할 것이고, **변경**해야할 많은 이유가 생길 것입니다.

클래스 변경에 필요한 시간을 최소화하는 것은 중요한데, 크기가 큰 다목적 클래스는 시스템 변경 시에 당장 알 필요가 없는 코드의 이해를 요구하고, 다른 종속 모듈에 어떤 영향을 미치는지 이해하기도 어렵게 만듭니다.

그러므로 **체계적인 정리를 통해 개발자가 무엇이 어디있는지 쉽게 찾을 수 있게 하고, 변경 시에 직접 영향이 미치는 컴포넌트만 이해할 수 있게 만들어야 합니다**. 즉, **큰 클래스 몇 개가 아니라 작은 클래스 여럿으로 이루어진 시스템**을 만들어야 합니다.

작은 클래스는 각자 맡은 **책임이 하나**며, **변경할 이유가 하나**고 **다른 작은 클래스와 협력**해 **시스템에 필요한 동작을 수행**합니다.

### 함수형 프로그래밍의 관점

함수형 프로그래밍에서는 함수에 이 원칙을 적용할 수 있습니다. **하나의 함수가 하나의 기능을 수행해야 한다**는 것은 정말 중요한 원칙으로, 하나의 함수가 많은 일을 하고 있다면 함수를 분리해야 합니다.

함수가 한 가지 기능을 하도록 나눈다면 테스트가 쉬워지고, 리팩토링이 쉬워지며 가독성이 높아집니다. 즉 시스템의 변경이 요구될 때, 확인해야하는 코드의 양이 줄어들게 됩니다.

함수를 어떤 기준으로 분리해야하는지 헷갈릴 수 있습니다. **함수를 분리할 때는 매개함수로 쓰일 수 있는 것들을 쪼개 주는 것이 좋습니**다. 하지만 무조건적으로 함수를 나누는 것은 좋지 못할 수도 있으므로, **가독성과 응집도를 기준으로 적절히 인라인 함수를 사용**하는 것도 필요합니다.

또, 클래스를 쓰지 않고 함수만 사용한다고 함수형 프로그래밍이라고 할 수 없습니다. 함수형 프로그래밍이 되기 위해서는 **순수 함수(pure function)와 부수 효과(side effect)를 분리하는 구조**가 되어야 합니다. 순수 함수에 대해서는 [여기](https://maxkim-j.github.io/posts/js-pure-function)를 참고하면 좋을 것 같습니다.

### Bad:

```jsx
const emailClients = (clients: Client[]): void => {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) email(client);
  });
};
```

### Good:

```tsx
const emailClients = (clients: Client[]): void => {
  clients.filter(isActiveClient).forEach(email);
};

const isActiveClient = (client: Client): boolean => {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
};
```

## 2.2 개방 폐쇄의 원칙(Open Closed Principle, OCP)

> **소프트웨어 요소(클래스, 함수 등)는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.**

### 객체지향 프로그래밍의 관점

개방 폐쇄의 원칙은 **기존 코드를 변경하지 않고, 새 기능을 추가할 수 있도록 해야한다**는 원칙입니다. 이는 새 기능을 수정하거나 기존 기능을 변경할 때, 건드릴 코드가 최소인 시스템 구조를 목표로 합니다. 이상적인 시스템이라면 새 기능을 추가할 때, 시스템을 확장할 뿐 기존 코드를 변경하지 않습니다.

### 함수형 프로그래밍의 관점

이 원칙은 함수형 프로그래밍에서도 동일하게 적용됩니다. 함수형 프로그래밍에서는 map, filter, reduce와 같은 **고차함수(Higherorder Function)**와 webpack loader와 같은 **플러그인(plugin)** 또는 **미들웨어(middleware)**에서 개방 폐쇄의 원칙을 가장 잘 느낄 수 있습니다.

하나의 함수의 기능이 여러가지 옵션들로 인해 내부에서 분기가 많이 발생하고 있다면, **함수를 매개 변수로 받는 방법**을 통해 **공통된 매커니즘 코드와 새로운 기능에 대한 코드를 분리**해서 다룰 수 있게 할 수 있습니다.

**버그 수정이 아닌 새로운 기능을 개발할 때, 기존에 개발된 함수를 수정하면서 코드를 개발하고 있다면 개방 폐쇄의 원칙을 위배한 코드를 작성하고 있을 가능성이 높습니다**. 그러므로 작성한 함수가 크고 매개변수에 옵션이나 flag가 많은 코드가 있다면 SRP와 OCP 원칙을 기반으로 함수를 점검해보는 것이 좋습니다.

### Bad:

```tsx
const getMultipliedArray = (array: number[], option: string): number[] => {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    if (option === "double") result[i] = array[i] * 2;
    if (option === "tripled") result[i] = array[i] * 3;
    if (option === "half") result[i] = array[i] / 2;
  }

  return result;
};
```

위 코드의 경우 옵션으로 분기는 가능하나 새로운 기능을 추가하려면 함수 내에서 변경이 되야 합니다.

### Good:

```tsx
const map = <T extends {}>(
  callbackfn: (value: T, index: number, array: T[]) => T,
  array: T[]
): T[] => {
  const result: T[] = [];

  for (let i = 0; i < array.length; i++) {
    result[i] = callbackfn(array[i], i, array);
  }

  return result;
};

const getDoubledArray = (array: number[]) => map((x) => x * 2, array);
const getTripledArray = (array: number[]) => map((x) => x * 3, array);
const getHalfArray = (array: number[]) => map((x) => x / 2, array);
```

위 코드처럼 옵션이 아니라 함수를 받는다면 어떨까요? 새로운 배열을 만든다는 매커니즘은 변경되지 않고(닫혀있고), 만드는 방식은 얼마든지 추가할 수 있습니다(확장에 열려 있다).

## 2.3 리스코프 치환의 원칙(Liskov Substitution Principle, LSP)

> **자식 클래스는 언제나 자신의 부모 클래스를 대체할 수 있어야 한다.**

### 객체지향 프로그래밍의 관점

리스코프 치환의 원칙은 **상위 타입의 객체(클래스)를 하위 타입의 객체(클래스)로 치환해도 상위 타입을 사용하는 프로그램은 정상적으로 동작해야 한다**는 원칙입니다. 즉, 부모 클래스가 들어갈 자리에 자식 클래스를 넣어도 정상적으로 동작할 수 있어야 한다는 뜻입니다.

리스코프 치환의 원칙을 지키지 않으면 개방 폐쇄의 원칙도 지키지 않게되기 때문에 확장을 어렵게 합니다. 따라서 **상속을 잘 정의하여 치환 가능성에 위배되지 않도록 설계**해야 합니다.

가장 대표적인 예로 ‘직사각형-정사각형' 문제가 있습니다. 직사각형은 정사각형이 아니지만, 정사각형은 직사각형입니다. 그러나 직사각형을 상속받아 정사각형을 만드는 경우 상속의 is-a관계가 깨지게 되고 다형성을 지킬 수 없게 됩니다.

### 함수형 프로그래밍의 관점

함수형 프로그래밍에서는 **동일한 방식으로 동작한다고 선언된 경우 한 함수를 다른 함수로 대체할 수 있어야 한다**고 볼 수 있습니다. 고차 함수에 사용되는 **매개 변수로 사용되는 함수나 제네릭(Generic)** 타입에 적용해볼 수 있습니다. 매개변수로 사용되는 함수는 기존 코드의 변경 없이 동일한 기능의 수행을 보장할 수 있어야 합니다.

### Bad:

```tsx
const getOddNumbers = (array: number[]) => {
  const oddNumbers: number[] = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 1) oddNumbers.push(array[i]);
  }

  return oddNumbers;
};

const getEvenNumbers = (array: number[]) => {
  const evenNumbers: number[] = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 0) evenNumbers.push(array[i]);
  }

  return evenNumbers;
};
```

### Good:

```tsx
const filter = <T extends {}>(
  callbackfn: (value: T, index: number, array: T[]) => boolean,
  array: T[]
) => {
  const filterdArray: T[] = [];

  for (let i = 0; i < array.length; i++) {
    if (callbackfn(array[i], i, array)) filterdArray.push(array[i]);
  }

  return filterdArray;
};

const getOddNumbers = (array: number[]) => filter((x) => x % 2 === 1, array);
const getEvenNumbers = (array: number[]) => filter((x) => x % 2 === 0, array);
```

## 2.4 인터페이스 분리의 원칙(Interface Segregation Principle, ISP)

> **클라이언트가 사용하지 않는 인터페이스에 의존하도록 강요해서는 안된다.**

### 객체지향 프로그래밍의 관점

인터페이스는 해당 인터페이스를 사용하는 클라이언트를 기준으로 분리해야하며, 클라이언트 입장에서 사용하는 기능만 제공하도록 인터페이스를 분리해야 한다는 원칙입니다. 즉, **사용자가 필요하지 않은 것들에 의존하게 되지 않도록, 인터페이스를 작게 유지**해야합니다.

이 원칙은 단일 책임 원칙과 관련이 있는데, 시스템 간의 결합을 줄이고 클라이언트가 사용할 의도가 없는 기능에 대해 알거나 의존할 필요가 없도록 하는 것입니다.

- 한 기능에 대한 변경의 여파를 최소화할 수 있게 됩니다.
- **특정 클라이언트르 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫습니다**.
- 인터페이스를 분리하게 되면 인터페이스가 명확해지고, 대체 가능성이 높아집니다.

### 함수형 프로그래밍의 관점

함수형 프로그래밍에서는 인터페이스당 함수가 1:1의 관계이기 때문에 ISP의 원칙을 위배하기 쉽지 않습니다. 그러므로 사용자에게 불필요한 데이터를 노출시키지 않고, 사용할 수 있도록 한다는 원칙을 기억하고 프로그래밍을 한다면 좋을 것 같습니다.

## 2.5 의존성 역전의 원칙(Dependency Inversion Principle, DIP)

> **구체화가 아닌 , 추상화에 의존해야 한다.**

### 객체지향 프로그래밍의 관점

이 원칙은 두 가지 기본 사항을 명시합니다.

1. 상위 레벨의 모듈은 하위 레벨 모듈에 의존해서는 안된다. 둘 다 추상화에 의존해야 한다.
2. 추상화는 세부 사항에 의존해서는 안된다. 세부 사항은 추상화에 따라 달라져야 한다.

다시 말해 의존 관계를 맺을 때, 변하기가 어려운 것에 의존해야 합니다. 즉, **구체화된 클래스에 직접적인 의존 관계를 맺지 않고, 인터페이스나 추상 클래스에 의존 관계를 맺는 것**을 말합니다.

이해하기 어려울 수 있지만, DIP는 상위 레벨 모듈이 하위 레벨 모듈의 세부 정보를 알고 설정하는 것을 방지합니다. 의존성 주입(DI)를 통해 이를 해결할 수 있는데, 모듈 간의 결합도를 줄일 수 있는 큰 장점을 가지고 잇습니다. 높은 결합도는 코드를 리팩터링하기 어렵기 때문에 매우 나쁜 개발 패턴으로 볼 수 있습니다.

### 함수형 프로그래밍

함수형 프로그래밍에서도 같은 원칙을 적용할 수 있습니다. **구체화된 하위 모듈에 의존하지 않고, 인터페이스에 의존 관계를 맺음을 통해 추상화에 의존**하게 해야 합니다. 이는 DI(의존성 주입)이나 IoC를 통해 해결이 가능합니다.

### Bad:

```tsx
import axios from "axios";

const HttpClient = {
  createUser: async (user: User) => {
    return axios.post(/* ... */);
  },
  getUserByEmail: async (email: string) => {
    return axios.get(/* ... */);
  },
};

async function signup(email: string, password: string) {
  const existingUser = await HttpClient.getUserByEmail(email);

  if (existingUser) throw new Error("Email already used");

  return HttpClient.createUser({ email, password });
}

signup("bob@bob.com", "pwd123");
```

위 코드는 `signup` 함수가 `HttpCilent`라는 구현 세부 사항에 결합되어 있습니다. 이는 의존성 규칙을 위반합니다. 그러므로 의존성을 분리해줄 필요가 있습니다.

### Good:

```tsx
import axios from "axios";

// 의존성 역할을 위해 추상화
interface ApiClient {
  createUser: (user: User) => Promise<void>;
  getUserByEmail: (email: string) => Promise<User>;
}

// HttpClient 구현
function HttpClient(): ApiClient {
  return {
    createUser: async (user: User) => {
      return axios.post(/* ... */);
    },
    getUserByEmail: async (email: string) => {
      return axios.get(/* ... */);
    },
  };
}

// 추상화된 ApiClient를 사용하기
function SignupService(client: ApiClient) {
  return async (email: string, password: string) => {
    const existingUser = await client.getUserByEmail(email);

    if (existingUser) throw new Error("Email already used");

    return client.createUser({ email, password });
  };
}

// HttpClient라는 의존성 주입 - 얼마든지 다른 ApiClient로 대체 가능
const signup = SignupService(HttpClient());
signup("bob@bob.com", "pwd123");
```

# 참고

- [SOLID (객체 지향 설계) - 위키백과, 우리 모두의 백과사전](<https://ko.wikipedia.org/wiki/SOLID_(%EA%B0%9D%EC%B2%B4_%EC%A7%80%ED%96%A5_%EC%84%A4%EA%B3%84)>)
- [나무위키](https://namu.wiki/w/%EA%B0%9D%EC%B2%B4%20%EC%A7%80%ED%96%A5%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/%EC%9B%90%EC%B9%99)
- [자바스크립트에서도 SOLID 원칙이 통할까? - teo님 블로그](https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C)
- [Clean Code concepts adapted for TypeScript](https://github.com/labs42io/clean-code-typescript#solid)
- [Dependency Inversion Principle in Functional TypeScript | Alex Nault](https://alexnault.dev/dependency-inversion-principle-in-functional-typescript)
