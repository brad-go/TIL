# 데코레이터 패턴(Decorator Pattern)

데코레이터 패턴은 **동작(행위, 메서드)을 포함하는 특수한 포장(wrapper) 객체 내부에 기존 객체를 배치하여 객체에 새로운 동작을 추가할 수 있는 구조적 디자인 패턴**입니다.

**객체의 결합을 통해 기능을 동적으로 유연하게 확장할 수 있게 해주는 패턴**으로 기본 기능에 추가할 수 있는 많은 종류의 부가 기능에서 파생되는 다양한 조합을 동적으로 구현할 수 있게 해줍니다. 기본 기능에 추가할 수 있는 기능의 종류가 많은 경우에 각 **추가 기능을 데코레이터 클래스로 정의**한 후 필요한 데코레이터 객체를 조합함으로써 **추가 기능의 조합을 설계**하는 방식입니다.

### 문제

다른 프로그램이 중요한 이벤트에 대해 사용자에게 알림을 전하는 알림 라이브러리를 작업하고 있다고 생각해봅시다.

라이브러리의 초기 버전은 몇 개의 필드만을 가진 `Notifier` 클래스를 기반으로 하고, 생성자와 하나의 `send` 메서드를 가지고 있습니다. 메서드는 사용자로부터 메시지 인자를 받고, 생성자를 통해 notifier에게 전달된 이메일 목록으로 메시지를 보낼 수 있습니다. 사용자 역할을 하는 타사 앱은 notifier 객체를 처음 한 번 생성한 후, 중요한 일이 발생할 때마다 사용하도록 되어 있습니다. 즉, 프로그램은 `Notifier` 클래스를 사용하여 미리 정의된 이메일 목록에 중요한 이벤트에 대한 알림을 보낼 수 있습니다.

후에 라이브러리 사용자는 이메일 알림 이상의 기능을 원하게 됩니다. 그들 중 많은 사람들이 중요한 문제에 대한 SMS를 받기 원합니다. 다른 사람들은 Facebook에서 알림 받기를 원하고, 기업 사용자는 Slack에서 알림 받기를 원합니다.

Notifier 클래스를 확장하고 추가 알림 메서드를 새 하위 클래스에 넣었고, 이제 사용자는 원하는 알림 클래스를 인스턴스화하고 모든 추가 알림을 사용할 수 있게 되었습니다. 그런데 누군가가 모든 알림 방식을 통해 알림을 받기를 원합니다.

하나의 클래스 내에서 여러 알림 메서드를 결합한 특수 하위 클래스를 만들어 이 문제를 해결하려고 했습니다. 그러나 이 접근 방식은 라이브러리 코드뿐만 아니라 클라이언트 코드에서도 코드를 엄청나게 부풀리게 한다는 것을 알게되었습니다. 어떻게 알림 클래스가 엄청나게 거대해지지 않게 하면서 위 문제를 해결할 수 있을까요?

### 해결책

객체의 동작을 변경해야 할 때 가장 먼저 떠오르는 것은 클래스 확장입니다. 그러나 상속에는 꼭 알아야 하는 몇 가지 심각한 문제가 있습니다.

- 상속은 정적입니다. 런타임 시에 기존 객체에 동작을 변경할 수 없습니다. 전체 객체를 다른 하위 클래스에서 생성된 객체로만 바꿀 수 있습니다.
- 대부분의 언어에서 하위 클래스는 하나의 상위 클래스만 가질 수 있습니다. 즉, 상속은 하나의 상위 클래스로부터만 받을 수 있습니다.

이러한 문제는 해결 방법 중 하나는 상속 대신 *Aggregation*이나 *Composition*을 사용하는 것입니다.

- **Aggregation(집합)**: 객체 A가 객체 B를 포함하지만, B는 A와 다른 생명 주기를 갖습니다.
- **Composition(구성)**: 객체 A가 객체 B로 이루어져있으며, A와 B는 동일한 생명 주기를 가지며 A가 B의 생명 주기를 관리합니다.

두 해결책은 **한 객체는 또다른 객체를 참조하고 특정한 동작을 위임**하는 동일한 방식을 가집니다. 반면 상속을 사용하면 객체 자체가 상위 클래스로에서 동작을 상속받아 해당 작업을 수행합니다.

이 새로운 접근 방식을 사용하면 중간 다리 역할을 하는 “도우미" 객체를 다른 객체로 쉽게 대체하여 런타임 시 컨테이너의 동작을 변경할 수 있습니다. 그러므로 객체는 여러 객체에 대한 참조를 갖고 모든 종류의 작업을 위임하는 다양한 클래스의 동작을 사용할 수 있게 됩니다. Aggregation/Composition은 데코레이터를 비롯한 많은 디자인 패턴의 핵심 원칙이므로 중요합니다!

![https://refactoring.guru/images/patterns/diagrams/decorator/solution1-en-2x.png](https://refactoring.guru/images/patterns/diagrams/decorator/solution1-en-2x.png)

다시 데코레이터 패턴으로 돌아와서

다시 데코레이터 패턴으로 돌아와서 “Wrapper”는 패턴의 주요 아이디어를 명확하게 표현하는 데코레이터 패턴의 또다른 이름입니다. Wrapper는 일부 대상 객체와 연결할 수 있는 객체입니다. 여기에는 대상 객체와 동일한 메서드 집합이 포함되어 있으며 받는 모든 요청을 대상 객체에게 위임합니다.그러나 Wrapper는 요청을 대상에게 전달하기 전이나 후에 특정한 동작을 수행하여 결과를 변경할 수 있습니다.

**Wrapper는 감싸진 객체와 동일한 인터페이스를 구현합니다**. 그렇기 때문에 사용자의 관점에서 이 두 객체는 동일합니다. Wrapper의 참조 필드가 해당 인터페이스를 따르는 모든 객체를 허용하도록 합니다. 이렇게 해서 여러 Wrapper를 통해 객체를 감싸고 모든 Wrapper의 결합된 동작을 객체에 추가할 수 있습니다.

알림 예제에서는 기본 클래스 `Notifier` 내부에 간단한 이메일 알림 동작을 그대로 두고, 다른 모든 알림 메서드를 데코레이터로 바꿀 수 있습니다. 클라이언트 코드는 기본 알림 객체를 클라이언트의 기본 설정과 일치하는 데코레이터들로 감싸야 합니다. 결과 객체는 스택과 같이 데코레이터들이 쌓인 모습을 가지게 됩니다.

스택의 마지막 데코레이터는 클라이언트가 실제로 사용하는 객체가 됩니다. 모든 데코레이터가 동일한 Notifier 인터페이스로 구현되기 때문에, 클라이언트 코드는 순수한 Notifier 객체인지 데코레이터로 감싸진 객체인지 신경쓸 필요가 없습니다.

메시지 타입 지정 또는 수신자 목록 작성과 같은 다른 동작에도 동일한 접근 방식을 적용할 수 있습니다. 클라이언트는 다른 사용자와 동일한 인터페이스를 따르는 한 모든 사용자 지정 데코레이터로 객체를 장식할 수 있습니다.

## 구조

![https://refactoring.guru/images/patterns/diagrams/decorator/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/decorator/structure-indexed-2x.png)

[출처: [https://refactoring.guru/images/patterns/diagrams/decorator/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/decorator/structure-indexed-2x.png)]

1. **Component**: Wrapper와 감싸진 객체 모두에 대한 공통 기능을 정의할 공통 인터페이스를 선언합니다.
2. **Concrete Component**: 감싸지는 객체의 클래스입니다. 데코레이터가 변경할 수 있는 기능을 정의합니다.
3. **Base Decorator**: 감싸진 객체를 참조하기 위한 필드를 가집니다. 필드의 타입은 ConcreteComponent와 Decorator를 모두 포함할 수 있도록 Component인터페이스로 선언되어야 합니다. 기본 데코레이터는 모든 작업을 감싸진 객체에게 위임합니다.
4. **Concrete Decorator**: Component에 동적으로 추가할 수 있는 추가 동작을 정의합니다. 기본 데코레이터의 메서드를 재정의(오버라이딩)하고, 부모 메서드를 호출하기 전이나 후에 해당 동작을 실행합니다.
5. **Client**: Component 인터페이스를 통해 모든 객체와 함께 동작하는 한 여러 계층의 데코레이터로 Comopnent를 감쌀 수 있습니다.

## 예시 코드

```tsx
/**
 * 기본 컴포넌트 인터페이스는 데코레이터에 의해 변경될 수 있는 메서드를 정의합니다.
 */
interface Component {
  operation(): string;
}

/**
 * 구체적인 컴포넌트는 메서드(동작)의 기본 구현을 제공합니다. 이 클래스의
 * 몇가지 변형이 있을 수 있습니다.
 */
class ConcreteComponent implements Component {
  operation(): string {
    return "ConcreteComponent";
  }
}

/**
 * 기본 데코레이터 클래스는 다른 컴포넌트와 같이 동일한 인터페이스를 따릅니다.
 * 이 클래스의 주된 목적은 모든 구체적인 데코레이터들을 위한 인터페이스를 정의하는 것입니다.
 * 감싸는 코드의 기본 구현에서 감쌀 컴포넌트를 저장할 필드를 포함하고, 이것은
 * 초기화를 의미합니다.
 */
class Decorator implements Component {
  constructor(protected component: Component) {}

  /**
   * 데코레이터는 모든 작업을 감싼 구성 요소에게 위임합니다.
   */
  operation(): string {
    return this.component.operation();
  }
}

/**
 * 구체적인 데코레이터는 감싼 객체를 호출하고 그 결과를 특정한 방법으로 변경합니다.
 */
class ConcreteDecoratorA extends Decorator {
  /**
   * 데코레이터들은 감싼 객체를 직접 호출하는 것 대신 부모가 구현한 동작을 호출할 수 있습니다.
   * 이 접근을 통해 데코레이트 클래스들의 확장을 단순화 합니다.
   */
  operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

/**
 * 데코레이터들은 그들의 행동을 감싼 객체를 호출하기 전이나 후에 실행합니다.
 */
class ConcreteDecoratorB extends Decorator {
  operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

/**
 * 클라이언트 코드는 컴포넌트 인터페이스를 통해 모든 객체를 사용할 수 있습니다.
 * 이 방법으로 구성 요소(컴포넌트)의 구체적인 클래스들로부터 독립적일 수 있습니다.
 */
function clientCode(component: Component) {
  console.log(`RESULT: ${component.operation()}`);
}

/**
 * 이 방식으로 클라이언트 코드가 두 가지 간단한 구성 요소를 모두 지원할 수 있습니다.
 */
const simple = new ConcreteComponent();
console.log("Client: I've got a simple component");
clientCode(simple);
console.log("");

/**
 * 뿐만 아니라 데코레이터로 감싸진 것도 가능합니다.
 *
 * 데코레이터가 간단한 컴포넌트 뿐만 아니라 다른 데코레이터도 감쌀 수 있다는 것을 기억하십시오
 */
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log("Client: Now I've got a decorated component");
clientCode(decorator2);

// Client: I've got a simple component:
// RESULT: ConcreteComponent

// Client: Now I've got a decorated component:
// RESULT: ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))
```

- [다른 예시 1](./file.ts)
- [다른 예시 2](./road.ts)
- [다른 예시 3](./comment.ts)

## 언제 사용해야할까?

- **객체를 사용하는 코드를 변경하지 않고, 런타임 시에 객체에 추가 동작을 할당할 필요가 있을 경우** 데코레이터 패턴을 사용합니다. 데코레이터 패턴을 사용하면 비즈니스 로직을 레이어 안에 구성하고, 각 레이어에 대한 데코레이터를 만들고, 런타임 시에 이 로직의 다양한 조합을 사용하여 객체를 구성할 수 있습니다. 클라이언트 코드는 모두 공통 인터페이스를 따르므로 이 모든 객체를 동일한 방식으로 처리할 수 있습니다.
- **상속을 사용하여 객체의 동작을 확장하는 것이 어색하거나 불가능할 때** 이 패턴을 사용합니다.

## 구현 방법

1. 비즈니스 도메인이 여러 개의 선택적 계층이 있는 주된 구성요소로 표현될 수 있는지 확인합니다.
2. 주요 구성요소와 선택적 계층에서 어떤 메서드가 공통으로 사용되는지 찾아내고, 공통 인터페이스를 생성하고 이 메서드들을 정의합니다.
3. 구체적인 궝요소 클래스를 생성하고 기본 동작을 정의합니다.
4. 기본 데코레이터 클래스를 생성합니다. 여기에는 감싸진 객체에 대한 참조를 저장할 필드가 있어야 합니다. 필드는 구체적인 구성요소뿐만 아니라 데코레이터와 연결할 수 있도록 공통 인터페이스 타입으로 선언되어야 합니다.
5. 모든 클래스가 공통 인터페이스로 구현되게 합니다.
6. 기본 데코레이터를 확장한 구체적인 데코레이터를 생성합니다. 이는 부모의 메서드(항상 감싼 객체에게 위임)를 호출하기 전이나 후에 이 데코레이터 만의 동작을 실행해야 합니다.
7. 클라이언트 코드는 클라이언트가 필요한 방식대로 데코레이터를 만들고 구성하는 역할을 담당합니다.

## 장단점

### 장점

- **새로운 하위 클래스의 생성없이 객체의 행동을 확장(기존 기능의 조합)** 시킬 수 있습니다.
- **런타임 시에 객체에게 책임을 부여하거나 제거(기능 변경)** 할 수 있습니다.
- 여러 개의 데코레이터로 객체를 감싸는 것으로 여러 동작들을 결합시킬 수 있습니다.
- 많은 동작의 변형을 구현하는 거대한 하나의 클래스를 여러 개의 작은 클래스들로 나눌 수 있으므로 **단일 책인의 원칙을 준수**합니다.

### 단점

- 여러 개의 데코레이터들로 감싼 후에 특정한 데코레이터를 제거하는 것은 어렵습니다.
- 동작이 데코레이터가 쌓인 순서에 의존하지 않는 방식으로 데코레이터를 구현하는 것은 어렵습니다.
- 레이어의 초기 구성 코드는 꽤나 복잡한 코드일 수 있습니다.

## 다른 패턴과의 관계

- [어댑터 패턴](https://www.notion.so/Adapter-Pattern-1ce7fce07b2a4c28a1dd10d4938b9ccd)은 기존 객체의 인터페이스를 변경하는 반면, [데코레이터](https://www.notion.so/Decorator-Pattern-9e34cba6d95a42dc8a6846cd64ca9093) 패턴은 인터페이스를 변경하지 않고 객체를 향상시킵니다. 또한 데코레이터는 재귀적인 결합을 지원하는데, 어댑터는 불가능합니다.
- [어댑터 패턴](https://www.notion.so/Adapter-Pattern-1ce7fce07b2a4c28a1dd10d4938b9ccd)은 감싸진 객체에 대해 다른 인터페이스를 제공하고, 프록시 패턴은 동일한 인터페이스를 제공하며 [데코레이터](https://www.notion.so/Decorator-Pattern-9e34cba6d95a42dc8a6846cd64ca9093) 패턴은 향상된 인터페이스를 제공합니다.
- 책임 연쇄 패턴과 [데코레이터](https://www.notion.so/Decorator-Pattern-9e34cba6d95a42dc8a6846cd64ca9093) 패턴은 매우 비슷한 클래스 구조를 가집니다. 두 패턴 모두 일련의 객체를 통해 실행을 전달하기 위해 재귀적인 구성에 의존합니다. 그러나 몇 가지 결정적인 차이가 있습니다.
  - 책임 연쇄 패턴의 핸들러는 서로 독립적으로 임의 동작들을 실행할 수 있습니다. 또한 언제든지 요청을 더이상 전달하지 않을 수 있습니다.
  - 데코레이터 패턴은 기본 인터페이스와 일관성을 유지하면서 객체의 동작을 확장할 수 있습니다. 그리고 데코레이터 패턴은 요청의 흐름을 멈추는 것이 불가능합니다.
- [컴포지트](https://www.notion.so/Composite-Pattern-4f1b24e1205e477c905835cfd46e325f) 패턴와 [데코레이터](https://www.notion.so/Decorator-Pattern-9e34cba6d95a42dc8a6846cd64ca9093) 패턴은 끝이 정해지지 않은(open-ended) 객체를 조직화하기 위해 재귀적인 구성에 의존하기 때문에 비슷한 구조를 가집니다.
  - 데코레이터 패턴은 컴포지트 패턴과 비슷하지만 하위 구성 요소를 하나만 가집니다.
  - 데코레이터 패턴은 감싸진 객체에 추가적인 책임을 추가하는 반면, 컴포지트 패턴은 자식들의 결과를 요약합니다.
  - 그러나 이 두 패턴을 합칠 수 있습니다. 데코레이터 패턴을 사용해서 컴포지트 트리에서 특정 객체의 동작을 확장할 수 있습니다.
- [컴포지트](https://www.notion.so/Composite-Pattern-4f1b24e1205e477c905835cfd46e325f) 및 [데코레이터](https://www.notion.so/Decorator-Pattern-9e34cba6d95a42dc8a6846cd64ca9093) 패턴을 많이 사용하는 설계의 경우 [프로토타입](https://www.notion.so/Prototype-Pattern-9ed885596b184d9aaae4984b0569e73f)을 사용하여 이점을 얻을 수도 있습니다. 프로토타입 패턴을 적용하면 복잡한 구조를 처음부터 다시 구성하는 대신 복사할 수 있기 때문입니다.
- [데코레이터](https://www.notion.so/Decorator-Pattern-9e34cba6d95a42dc8a6846cd64ca9093) 패턴은 객체의 겉표면을 변경할 수 있게 해주고, 전략 패턴은 객체의 내부를 변경하게 해줍니다.
- [데코레이터](https://www.notion.so/Decorator-Pattern-9e34cba6d95a42dc8a6846cd64ca9093) 패턴과 프록시 패턴은 비슷한 구조를 가지지만 매우 다른 목적으로 사용됩니다. 두 패턴은 조합(composition) 원칙에 기초하고 있으며, 이 원칙에서 한 객체는 작업의 일부를 다른 객체에 위임해야 합니다. 차이는 프록시 패턴은 일반적으로 서비스 객체의 생명 주기를 스스로 관리하는 반면, 데코레이터들의 조합은 항상 클라이언트에 의해 제어됩니다.

## 참고

- [Decorator](https://refactoring.guru/design-patterns/decorator)
- [[Design Pattern] 데코레이터 패턴이란 - Heee's Development Blog](https://gmlwjd9405.github.io/2018/07/09/decorator-pattern.html)
- [[구조 패턴] 데코레이터 패턴](https://dev-youngjun.tistory.com/213?category=937057)
