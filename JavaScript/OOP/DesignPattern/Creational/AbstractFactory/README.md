# 추상 팩토리 패턴(Abstract Factory Pattern)

## 추상 팩토리 패턴이란?

추상 팩토리 패턴이란 **구체적인 클래스에 의존하지 않고, 서로 관련성이 있거나 독립적인 여러 객체의 그룹을 만드는 인터페이스를 제공하는 패턴**입니다. 즉, 연관된 여러 종류의 객체를 일관된 방식으로 생성하는 경우에 유용합니다.

각각의 객체를 생성하기 위한 인터페이스를 정의하지만, 실제 객체의 생성은 구체적인 팩토리(특정 객체를 만들어 주는) 클래스에 맡깁니다. 추상 팩토리 패턴은 **생성자 호출**(`new` 연산자)**로 직접 제품을 생성하는 대신 팩토리의 생성 메서드를 호출**하게 합니다.

팩토리 메서드 패턴과 비슷해 보이지만, 추상 팩토리 패턴은 **팩토리 메서드 패턴을 조금 더 캡슐화한 방식**으로 볼 수 있습니다.

## 추상 팩토리 패턴의 구조

![https://refactoring.guru/images/patterns/diagrams/abstract-factory/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/abstract-factory/structure-indexed-2x.png)

[출처: [https://refactoring.guru/images/patterns/diagrams/abstract-factory/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/abstract-factory/structure-indexed-2x.png)]

- **Abstract Products**: 제품(Product)의 공통 인터페이스로 제품군을 구성하는 별개의 연관된 제품들에 대한 인터페이스입니다.
- **Concrete Products**: 구체적인 팩토리에서 구현되는 구체적인 제품입니다. 이 제품들은 각 타입별로 Abstract Products 인터페이스를 구현합니다.
- **Abstract Factory**: 실제 팩토리 클래스의 공통 인터페이스로, 각각의 추상적인 제품을 생성하기 위한 메서드를 선언합니다.
- **Concrete Factory**: 추상 팩토리의 생성 방법(추상 메서드)을 재정의(오버라이딩)합니다. 각각의 구체적인 팩토리는 제품의 특정 변형에 해당하며, 변형된 구체적인 제품을 생성합니다.

Concrete Factory는 제품 객체를 생성하지만, 반환 타입은 추상 제품입니다. 이로써 팩토리를 사용하는 클라이언트 코드가 팩토리에서 가져온 제품의 특정 변형에 의존하지 않습니다. 클라이언트는 인터페이스를 통해 객체와 소통합니다.

### 문제

가구 매장 시뮬레이터를 만들고 있다고 상상해봅시다. 이 가구 매장에는 브랜드(제품 그룹) 별로 `의자`, `소파`, `커피 테이블`이라는 제품이 있습니다. 브랜드는 `Modern`, `Victorian`, `ArtDeco`라는 세 브랜드가 있습니다.

고객들은 같은 브랜드의 제품이 아니면 어울리지 않는다고 화를 내기 때문에, 같은 브랜드 내의 다른 제품(객체)와 일치하도록 개별 가구 객체를 작성하는 방법이 필요합니다. 또, 프로그램에 새 제품이나 브랜드를 추가할 때, 기존 코드를 변경하고 싶지 않습니다.

### 해결책

첫 번째로 브랜드(제품군)의 개별 제품(예: 의자, 소파 또는 커피 테이블)에 대한 인터페이스를 명시적으로 선언해줍니다. 이제 생성하는 제품들은 모두 이 인터페이스를 따릅니다.

```tsx
interface Chair {}
interface Sofa {}
interface CoffeeTable {}
```

다음 단계는 제품군의 모든 제품에 대한 생성 메서드 목록을 가진 인터페이스인 추상 팩토리를 선언합니다. 여기에 선언된 생성 메서드는 위에서 만든 제품에 대한 인터페이스의 타입을 반환해야 합니다.

```tsx
interface FurnitureFactory {
  createChair(): Chair;
  createSofa(): Sofa;
  createCoffeeTable(): CoffeeTable;
}
```

위의 인터페이스들을 통해 실제 클라이언트 코드를 손상시키지 않고, 클라이언트 코드에 전달하는 팩토리 타입과 제품 타입을 변경할 수 있습니다.

## 예시 코드

```tsx
/**
 * 추상 팩토리 인터페이스는 각기 다른 추상 제품들에 대한 반환 타입을 가진 메서드를 선언합니다.
 * 이 제품들은 패밀리라고 불리고, 높은 수준의 개념과 연관되어 있습니다. 한 패밀리의 제품들은
 * 대개 그들끼리 협업이 가능합니다. 제품들의 패밀리는 몇몇의 다양성을 가지지만, 한 변형의 제품들은
 * 다른 제품들과 공존할 수 없습니다.
 */
interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

/**
 * 구체적인 팩토리는 한가지 변형이 이루어진 제품들의 패밀리를 생산합니다.
 * 팩토리에서 생성한 제품들이 호환되는 것을 보장합니다. 구체적인 팩토리가
 * 구체적인 제품을 생성하지만, 이 메서드의 반환 타입이 추상 제품이라는 것을 기억합시다.
 */
class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

/**
 * 각 구체적인 팩토리는 그에 상응하는 제품의 변형을 가집니다.
 */
class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

/**
 * 제품 패밀리의 각 개별 제품에는 기본 인터페이스가 필요합니다.
 * 제품의 모든 변형은 이 인터페이스를 구현해야 합니다.
 */
interface AbstractProductA {
  usefulFunctionA(): string;
}

/**
 * 이 구체적인 제품들은 해당 구체적인 팩토리에서 생성됩니다.
 */
class ConcreteProductA1 implements AbstractProductA {
  usefulFunctionA(): string {
    return "The result of the product A1.";
  }
}

class ConcreteProductA2 implements AbstractProductA {
  usefulFunctionA(): string {
    return "The result of the product A2.";
  }
}

/**
 * 다른 제품의 기본 인터페이스입니다. 모든 제품들은 서로 상호작용할 수 있지만,
 * 이는 오직 같은 구체적인 변형의 제품들 사이에서만 가능합니다.
 */
interface AbstractProductB {
  usefulFunctionB(): string;
  // 추상 팩토리에서 만드는 모든 제품이 동일한 변종이기 때문에 호환이 가능합니다.
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
 * 이 구체적인 제품들은 해당 구체적인 팩토리에서 생성됩니다.
 */
class ConcreteProductB1 implements AbstractProductB {
  usefulFunctionB(): string {
    return "The result of the product B1.";
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B1 collaborating with the (${result})`;
  }
}

class ConcreteProductB2 implements AbstractProductB {
  usefulFunctionB(): string {
    return "The result of the product B2.";
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B2 collaborating with the (${result})`;
  }
}

/**
 * 클라이언트 코드는 추상 팩토리 및 추상 제품과 같은 추상적 유형을 통해서만 팩토리 및 제품과
 * 함께 동작합니다. 이렇게 함으로 팩토리 및 제품 하위 클래스를 변경하지 않고, 클라이언트
 * 코드로 전달할 수 있습니다.
 */
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

/**
 * 클라이언트 코드는 아무 구체적인 팩토리 클레스와 함게 작동할 수 있습니다.
 */
console.log("Client: Testing client code with the first factory type...");
clientCode(new ConcreteFactory1());

console.log("");

console.log('Client: Testing the same client code with the second factory type...'); // prettier-ignore
clientCode(new ConcreteFactory2());

// Client: Testing client code with the first factory type...
// The result of the product B1.
// The result of the B1 collaborating with the (The result of the product A1.)

// Client: Testing the same client code with the second factory type...
// The result of the product B2.
// The result of the B2 collaborating with the (The result of the product A2.)
```

- [다른 예시 1](./elevator.ts)
- [다른 예시 2](./furniture.ts)

## 언제 사용해야할까?

- **제품과 관련된 다양한 타입의 객체과 함께 작동해야 하지만, 해당 제품의 구체적인 클래스에 의존하고 싶지 않을 때**
- **클래스가 여러 객체 타입을 처리하는 경우** 단일 책임 원칙에 의해 팩토리 메서드를 독립형 팩토리 클래스 또는 추상 팩토리로 구현하는 것이 좋습니다.

## 구현 방법

1. 모든 제품 유형에 대해 추상 제품 인터페이스를 선언한 후에, 모든 구체적인 제품 클래스가 이러한 인터페이스를 구현하도록 합니다.
2. 모든 추상 제품에 대한 생성 메서드를 가진 추상 팩토리 인터페이스를 선언합니다.
3. 각 제품의 변형에 대해 하나씩 구체적인 팩토리 클래스를 구현합니다.
4. 팩토리 초기화 코드를 만듭니다. 애플리케이션 구성 또는 현재 환경에 따라 구체적인 팩토리 클래스 중 하나를 인스턴스화해야합니다. 이 팩토리 객체를 제품을 구성하는 모든 클래스에 전달합니다.
5. 코드에서 제품 생성자에 대한 모든 직접 호출을 찾습니다. 팩토리 객체에 대한 적절한 생성 메서드에 대한 호출로 교체합니다.

## 장점과 단점

### 장점

- 팩토리로부터 가져온 제품들이 서로 호환되는지 확인할 수 있습니다.
- 클라이언트 코드와 구체화된 제품(product) 간의 긴밀한 결합을 피한다. 즉, **결합도가 낮아진다**.
- **단일 책임 원칙을 준수**합니다. 객체 생성 코드를 분리시킴으로 **코드가 간결**해진다.
- **개방 폐쇄 원칙을 준수**합니다. **객체 생성 코드 분리시키기 때문에 기존 코드의 변경없이 객체를 추가/수정이 일어나더라도 객체를 생성하는 코드만 수정**하면 된다.

### 단점

- 많은 새로운 인터페이스와 클래스가 패턴과 함께 도입되기 때문에 코드가 복잡해집니다.

## 다른 패턴과의 관계

- 많은 소프트웨어 설계가 [팩토리 메서드](../FactoryMethod/)(덜 복잡하고 하위 클래스를 통해 사용자 정의가 가능)를 사용하기 시작해서 [추상 팩토리](../AbstractFactory/), [프로토타입](../Prototype/) 또는 [빌더](../Builder/)(더 유연하지만 복잡함)로 발전합니다.
- [빌더](../Builder/)는 복잡한 객체를 단계별로 구성하는 데 중점을 둡니다. [추상 팩토리](../AbstractFactory/)는 관련 객체의 연관성에 중점을 둡니다. 추상 팩토리는 제품을 즉시 반환하지만, 빌더를 사용하면 제품을 가져오기 전에 몇 가지 추가 구성 단계를 실행할 수 있습니다.
- [추상 팩토리 클래스](../AbstractFactory/)는 [팩토리 메서드](../FactoryMethod/)를 기반으로 하지만, 프로토타입을 사용해서 구성할 수도 있습니다.
- [추상 팩토리 클래스](../AbstractFactory/)는 클라이언트 코드에서 서브 객체가 생성되는 방식만 숨기고 싶을 때, Facade 패턴의 대안으로 사용할 수 있습니다.
- [브릿지](../../Structural/Bridge/) 패턴과 함께 [추상 팩토리 클래스](../AbstractFactory/)를 사용할 수 있습니다.
- [추상 팩토리 클래스](../AbstractFactory/), [빌더](../Builder/) 및 [프로토타입](../Prototype/) 패턴은 모두 [싱글톤](../Singleton/) 패턴으로 구현될 수 있습니다.
