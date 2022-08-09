# 퍼사드 패턴(Facade Pattern)

퍼사드 패턴은 **라이브러리, 프레임워크 또는 기타 복잡한 클래스들에 대한 단순화된 인터페이스를 제공하는 구조적 디자인 패턴**입니다. **서브시스템들의 공통적인 기능을 정의하는 단순화된 인터페이스를 정의하는 패턴이며, 서브시스템들 사이의 의존성을 줄일수 있습니다**. 즉, 애플리케이션의 전반적인 복잡성을 줄이는 동시에 불필요한 의존성을 분리하는데 도움이 됩니다.

예를 들어 전화 주문을 하기 위해 상점에 전화를 걸면, 교환원은 상점의 모든 서비스와 부서에 대한 퍼사드(facade)로 볼수 있습니다. 교환원은 주문 시스템, 지불 및 다양한 배송 서비스에 대한 간단한 음성 인터페이스를 제공합니다.

### 문제

정교한 라이브러리나 프레임워크에 속하는 광범위한 객체들로 코드를 작동시켜야 한다고 생각해봅시다. 일반적으로 이러한 객체들을 모두 초기화하고 의존성을 추적하며, 올바른 순서로 메서드를 실행하는 등의 작업이 필요합니다.

결과적으로 클래스의 비즈니스 논리가 타사 클래스의 세부 구현 정보와 밀접하게 연결되므로 코드의 이해 및 유지보수가 어려워집니다.

### 해결책

퍼사드 패턴은 많은 동적인 부분을 포함하는 복잡한 서브 시스템들을 위한 단순한 인터페이스를 제공합니다. 퍼사드 패턴은 하위 시스템으로 직접 작업하는 것과 비교하여 제한된 기능을 제공할 수 있습니다. 그러나 여기에는 클라이언트가 정말로 중요하게 생각하는 기능들을 포함할 수 있습니다.

퍼사드 패턴은 수많은 기능을 가진 복잡한 라이브러리를 앱에 통합시켜야 하지만 기능은 일부만 필요할 때 유용합니다.

예를 들어, 고양이와 함께 짧은 재미있는 비디오를 소셜 미디어에 업로드하는 앱은 전문적인 비디오 변환 라이브러리를 사용할 수 있습니다. 그러나 실제로 필요한 것은 단일 메서드 `encode(filename, format)`가 있는 클래스뿐입니다. 이러한 클래스를 만들고 비디오 변환 라이브러리와 연결하면 처음으로 퍼사드 패턴을 이용하게 된 것입니다.

## 구조

![https://refactoring.guru/images/patterns/diagrams/facade/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/facade/structure-indexed-2x.png)

- **Facade**: 하위 시스템이 가진 기능의 특정 부분에 대한 편리한 접근을 제공합니다. 클라이언트의 요청을 어디로 지시해야 하는지, 동적인 부분을 어떻게 작동시켜야하 하는지 알고 있습니다.
- **Additional Facade**: 관련없는 기능으로 단일 퍼사드를 오염시켜 또 다른 복잡한 구조를 만들 수 있는 것을 방지하기 위해 생성될 수 있습니다.
- **Complex Subsystem**: 수십 개의 다양한 객체로 구성되며, 모두 의미 있는 작업을 수행하려면 올바른 순서로 객체를 초기화하고, 적절한 형식의 데이터를 제공하는 것과 같은 하위 시스템의 세부 구현 정보를 자세히 알아야 합니다. 하위 시스템은 퍼사드의 존재를 인식하지 못합니다. 그들은 시스템 내에서 작동하고 서로 직접 작동합니다.
- **Client**: 하위 시스템 객체를 직접 호출하는 대신 퍼사드를 사용합니다.

## 예시 코드

```tsx
/**
 * 퍼사드 클래스는 하나 이상의 서브 시스템들의 복잡한 로직에 대한 간단한
 * 인터페이스를 제공합니다. 퍼사드 패턴은 하위 시스템 안의 적절한 객체들에게
 * 클라이언트의 요청을 위임하고, 그들의 생명주기를 관리합니다. 이 모든 것은
 * 클라이언트를 클라이언트가 원하지 않는 하위 시스템의 복잡성으로부터 보호해줍니다.
 */
class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  /**
   * 어플리케이션의 필요에 따라 기존 하위 시스템 객체를 퍼사드 클래스에 제공하거나
   * 퍼사드 클래스에 직접 작성할 수 있습니다.
   */
  constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  /**
   * 퍼사드 클래스의 메서드는 서브 시스템의 복잡한 기능에 대한 손쉽게 사용할 수 있도록
   * 합니다. 그러나 클라이언트는 서브시스템에서 사용가능한 것들중 일부만을 사용할 수 있습니다.
   */
  operation(): string {
    let result = "Facade initializes subsystems:\n";
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += "Facade orders subsystems to perform the action:\n";
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();

    return result;
  }
}

/**
 * 서브 시스템은 퍼사드나 클라이언트로부터 직접 요청을 받을 수 있습니다.
 * 어쨋든 Subsystem에게 퍼사드는 또다른 클라이언트이지 서브 시스템의 일부가 아닙니다.
 */
class Subsystem1 {
  operation1(): string {
    return "Subsystem1: Ready!\n";
  }

  // ...

  operationN(): string {
    return "Subsystem1: Go!\n";
  }
}

/**
 * 퍼사드는 다수의 서브 시스템과 동시에 작업할 수도 있습니다.
 */
class Subsystem2 {
  operation1(): string {
    return "Subsystem2: Get ready!\n";
  }

  // ...

  operationZ(): string {
    return "Subsystem2: Fire!";
  }
}

/**
 * 클라이언트 코드는 퍼사드로부터 제공된 단순한 인터페이스를 통해 복잡한
 * 하위 시스템을 사용합니다. 퍼스다가 하위 시스템의 생명 주기를 관리할 때,
 * 클라이언트는 하위 시스템의 존재를 알지 못할 수 있습니다. 이 접근은 제어를
 * 복잡하지 않게 해줍니다.
 */
function clientCode(facade: Facade) {
  // ...
  console.log(facade.operation());
  // ...
}

/**
 * 클라이언트 코드는 이미 생성된 하위 시스템을 가지고 있을 수도 있습니다.
 * 이 경우에는 퍼사드가 새 인스턴스를 만드는 대신에 이 객체들로 초기화를
 * 진행하게 하는 것이 좋습니다.
 */
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);

// Facade initializes subsystems:
// Subsystem1: Ready!
// Subsystem2: Get ready!
// Facade orders subsystems to perform the action:
// Subsystem1: Go!
// Subsystem2: Fire!
```

- [다른 예시 1](./video.ts)
- [다른 예시 2](./employee.ts)

## 언제 사용해야할까?

- **퍼사드 패턴은 복잡한 서브 시스템을 간단한 인터페이스로 제한된 사용을 하려고 할때** 유용합니다. 대체로 서브 시스템은 시간이 갈수록 더 복잡해지고, 디자인 패턴을 적용하더라도 일반적으로 더 많은 클래스가 생성됩니다. 서브 시스템은 다양한 컨텍스트에서 더 유연해지고 쉽게 재사용할 수 있지만, 클라이언트에게 요구하는 코드의 양은 점점 더 거대해집니다. 퍼사드 패턴은 대부분의 클라이언트 요구 사항에 맞는 서브 시스템에서 가장 많이 사용되는 기능에 대한 인터페이스를 제공하여 이 문제를 해결합니다.
- **서브 시스템을 계층적으로 구성하려는 경우 퍼사드 패턴을 사용**합니다. 서브 시스템의 각 계층에 대한 진입점을 정의하기 위해 퍼사드 클래스를 만들 수 있습니다. 퍼사드를 통해서만 통신하도록 요구함으로써 여러 하위 시스템 간의 결합도를 줄일 수 있습니다.
  예를 들어 비디오 변환 프레임워크에서 비디오 및 오디오 관련 두 가지 계층으로 나눌 수 있습니다. 각 레이어에 대해 퍼사드를 만든 다음 각 레이어의 클래스가 해당 퍼사드를 통해 서로 통신하도록 할 수 있습니다. 이 접근 방식은 중재자 패턴과 유사합니다.

## 장점과 단점

### 장점

- 복잡한 하위 시스템에서 코드를 분리할 수 있어 결합도를 낮출 수 있습니다.

### 단점

- 퍼사드는 앱의 모든 클래스에 결합된 [신 객체](https://en.wikipedia.org/wiki/God_object)가 될 수 있습니다.

## 다른 패턴과의 관계

- [퍼사드](https://www.notion.so/Facade-Pattern-28d1c943d4f04637b5e139cef0b6bc13) 패턴은 기존 객체에 대한 새 인터페이스를 정의하는 반면 [어댑터 패턴](https://www.notion.so/Adapter-Pattern-1ce7fce07b2a4c28a1dd10d4938b9ccd)은 기존 인터페이스를 사용 가능하게 만들려고 합니다. 어댑터는 일반적으로 하나의 객체만 감싸는 반면, 퍼사드는 객체의 전체 하위 시스템과 함께 동작합니다.
- [추상 팩토리 클래스](https://www.notion.so/Design-Pattern-be5c2addc0d14f49a58bc4c20643a41b)는 클라이언트 코드에서 서브 객체가 생성되는 방식만 숨기고 싶을 때, [퍼사드](https://www.notion.so/Facade-Pattern-28d1c943d4f04637b5e139cef0b6bc13) 패턴의 대안으로 사용할 수 있습니다.
- 플라이급 패턴은 많은 작은 객체를 만드는 방법을 보여주는 반면, [퍼사드](https://www.notion.so/Facade-Pattern-28d1c943d4f04637b5e139cef0b6bc13) 패턴은 전체 하위 시스템을 나타내는 단일 객체를 만드는 방법을 보여줍니다.
- [퍼사드](https://www.notion.so/Facade-Pattern-28d1c943d4f04637b5e139cef0b6bc13) 패턴과 중재자 패턴은 비슷한 역할을 합니다. 둘 다 밀접하게 연결된 많은 클래스 간의 협업을 구성하려고 합니다.
  - 퍼사드 패턴은 객체의 하위 시스템에 대한 단순화된 인터페이스를 정의하지만, 새로운 기능을 도입하지는 않습니다. 하위 시스템 자체는 퍼사드를 인식하지 못합니다. 하위 시스템 내의 객체는 직접 통신할 수 있습니다.
  - 중재자 패턴은 시스템 구성 요소 간의 통신을 중앙 집중화합니다. 구성 요소는 중재자 객체에 대해서만 알고 직접 통신하지 않습니다.
- 대부분의 경우 [퍼사드](https://www.notion.so/Facade-Pattern-28d1c943d4f04637b5e139cef0b6bc13) 패턴은 단일 퍼사드 객체로 충분하기 때문에 [싱글톤](https://www.notion.so/Singleton-Pattern-9e6d45cff1e34428a7b6fdd8d5de8199)으로 변환될 수 있습니다.
- [퍼사드](https://www.notion.so/Facade-Pattern-28d1c943d4f04637b5e139cef0b6bc13)는 복잡한 엔티티로부터의 완충장치 역할을 하고, 자체적으로 초기화한다는 점에서 프록시 패턴과 유사합니다. 그러나 퍼사드 패턴과 달리 프록시 패턴은 서비스 객체와 동일한 인터페이스를 가지고 있어 상호 교환이 가능합니다.
