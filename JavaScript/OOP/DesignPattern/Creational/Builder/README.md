# 빌더 패턴(Builder Pattern)

## 빌더 패턴이란?

빌더 패턴은 **복잡한 객체를 단계별로 구성할 수 있는 디자인 패턴**입니다. 이는 **복잡한 객체를 생성하는 클래스와 표현하는 클래스를 분리하여 동일한 절차에서도 객체의 다양한 타입과 서로 다른 표현을 생성하는 방법을 제공**합니다.

### 문제

빌더 패턴은 객체 생성시에 생성자(constructor)만 사용할 때 발생할 수 있는 문제를 개선하기 위해 고안되었습니다. 생성자에 넘겨야 할 매개변수가 많을 경우 다음과 같은 이슈가 있습니다.

- 클라이언트 프로그램에서 팩토리 클래스를 호출할 때 선택적인 인자가 많아지면, **타입과 순서에 대한 관리가 어려워져** 에러가 발생할 확률이 높아집니다.
- 경우에 따라 **필요 없는 파라미터들에 대해** 팩토리 클래스에 **일일이 null 값**을 넘겨줘야 합니다.
- 생성해야 하는 하위 클래스가 무거워지고 복잡해짐에 따라 팩토리 클래스 또한 복잡해집니다.

### 해결책

이러한 문제를 해결하기 위해 빌더 패턴은 **별도의 Builder 클래스를 만들어 필수 값에 대해서는 생성자를 통해, 선택적인 값들에 대해서는 메서드를 통해 단계적으로 값을 입력받은 후에 최종적으로 하나의 인스턴스를 return 하는 방식**입니다.

다른 생성 패턴과 달리 빌더는 생성할 객체에 공통 인터페이스가 필요하지 않습니다. 따라서 동일한 절차를 통해 다양한 객체를 생성할 수 있습니다.

## 빌더 패턴의 구조

![https://refactoring.guru/images/patterns/diagrams/builder/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/builder/structure-indexed-2x.png)

[출처: [https://refactoring.guru/images/patterns/diagrams/builder/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/builder/structure-indexed-2x.png)]

- **Builder**: 모든 타입의 빌더에 대한 공통적인 제품 구성 단계를 선언
- **Concrete Builder**: 생성 단계의 다양한 구현을 제공하며, 공통 인터페이스를 따르지 않는 제품도 생산할 수 있습니다.
- **Product**: 빌더에 의해 생성될 객체입니다. 다른 빌더에 의해 생성된 제품은 동일한 클래스 계층 또는 인터페이스에 속할 필요가 없습니다.
- **Director**: 구성 단계를 호출하는 순서를 정의하므로 제품의 특정 구성을 만들고 재사용할 수 있습니다.

클라이언트 코드에서는 빌더 객체 중 하나를 감독(director)와 연결해야 합니다. 일반적으로 감독의 생성자 매개변수를 통해 한 번만 수행됩니다. 그런 다음 감독은 모든 추가 구성에 해당 빌더 객체를 사용합니다.

## 예시 코드

```tsx
/**
 * 빌더 인터페이스는 생성할 제품(결과 객체)의 다른 부분을 만드는 방법을 지정합니다.
 */
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

/**
 * 구체적인 빌더 클래스들은 빌더 인터페이스를 따라 특정 구현 단계를 제공합니다.
 * 프로그램이 몇가지 다른 빌더들을 가지고 있다면, 다르게 구현됩니다.
 */
class ConcreteBuilder1 implements Builder {
  private product!: Product1;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.product = new Product1();
  }

  // 동일한 제품 객체에 모든 생성 단계가 동일하게 적용됩니다.
  producePartA(): void {
    this.product.parts.push("PartA1");
  }

  producePartB(): void {
    this.product.parts.push("PartB1");
  }

  producePartC(): void {
    this.product.parts.push("PartC1");
  }

  /**
   * 구체적인 빌더 클래스는 결과를 가져오기 위한 그들 스스로 메서드를 제공합니다. 이는 빌더들의
   * 다양한 타입들이 동일한 인터페이스를 따르지 않는 다른 제품 객체를 생성할 수 있기 때문입니다.
   * 그러므로 이 메서드는 빌더 인터페이스에 선언될 수 없습니다.
   *
   * 대개, 클라이언트에 결과 객체를 반환한 후에 빌더 객체는 다른 제품 객체를 생성할 준비를 합니다.
   * 그러므로 getProduct 메서드의 마지막에 reset 메서드를 호출하는 것이 일반적입니다. 그러나
   * 이 동작은 필수는 아니며, 이전 결과를 처리하기 전에 빌더가 클라이언트 코드의 명시적 reset
   * 호출을 기다리게 할 수 있습니다.
   */
  getProduct(): Product1 {
    const reuslt = this.product;
    this.reset();
    return reuslt;
  }
}

/**
 * 빌더 패턴은 오직 제품들이 꽤나 복잡하고 자원이 많이 사용될 때 사용하는 것이 타당합니다.
 *
 * 다른 생성 패턴들과 달리, 다른 구체 빌더들은 관계없는 제품들을 생성할 수 있습니다.
 * 다른 말로, 다양한 빌더의 결과물들은 항상 동일한 인터페이스를 따르지 않습니다.
 */
class Product1 {
  public parts: string[] = [];

  listParts(): void {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  }
}

/**
 * 감독(Director)은 특정 순서로 빌딩 단계를 실행하는 것만을 책임집니다.
 * 이는 특정한 순서나 설정을 따라서 제품을 생성할 때 도움이 됩니다.
 * 엄밀히 말하면, 클라이언트 코드에서 빌더를 직접 제어할 수 있기 때문에 감독 클래스는 선택적입니다.
 */
class Director {
  private builder!: Builder;

  /**
   * 감독은 클라이언트 코드에서 전달한 빌더 객체와 함께 동작합니다.
   * 이 방법으로 클라이언트 코드는 새로 조립한 제품의 최종 타입을 변경할 수 있습니다.
   */
  setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  /**
   * 감독은 동일한 빌딩 단계를 사용하여 몇가지 제품의 변형을 생성할 수 있습니다.
   */
  buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

/**
 * 클라이언트 코드는 빌더 객체를 만들어 감독에게 전달하고 생성 프로세스를 시작합니다.
 * 최종 결과는 빌더 객체로 회수됩니다.
 */
function clientCode(director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  console.log("Standard basic product:");
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log("Standard full featured product:");
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  console.log("Custom product:");
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
```

- [다른 예시 1](./request.ts)
- [다른 예시 2](./tour.ts)

## 언제 사용해야할까?

- **많은 선택적 매개변수를 가지고, 매개변수에 따라 다른 초기화가 필요한 코드를 고치려고 할 때**
- **객체의 표현과 생성과정을 분리해서 좀 더 클래스마다 역할 분리를 명확히 하고 싶은 경우**
- **코드의 가독성을 높이고 싶은 경우**

## 구현 방법

1. 사용 가능한 모든 제품 표현을 작성하기 위한 공통 구성 단계를 명확하게 정의할 수 있는지 확인해야 합니다.
2. 빌더 인터페이스에서 공통 구성 단계를 선언합니다.
3. 각 제품 표현에 대한 구체적인 빌더 클래스를 만들고 해당 구성 단계를 구현합니다.
4. 감독 클래스를 만드는 것에 대해 생각해봅니다. 동일한 빌더 객체를 사용하여 제품을 구성하는 다양한 방법을 캡슐화 할 수 있습니다.
5. 클라이언트 코드는 빌더 및 감독 객체를 모두 생성합니다. 구성이 시작되기 전에 클라이언트는 빌더 객체를 감독에게 전달해야 합니다. 일반적으로 클라이언트는 감독 클래스 생성자의 매개변수를 통해 이 작업을 한 번만 수행합니다. 감독은 모든 추가 구성에서 빌더 객체를 사용합니다.
6. 모든 제품이 동일한 인터페이스를 따르는 경우에만 디렉토리로부터 직접 구축 결과를 얻을 수 있습니다. 그렇지 않다면 클라이언트는 빌더에서 결과를 가져와야 합니다.

## 장점과 단점

### 장점

- 코드 **가독성**이 올라갑니다.
- 객체의 **생성과 표현의 관심사 분리**가 가능합니다.
- 객체를 **단계별로 생성**하거나 **생성 단계를 연기**하거나 **재귀적으로 생성 단계를 실행**할 수 있습니다.

### 단점

- 여러 개의 새 클래스를 생성해야 하기 때문의 코드의 전반적인 복잡성이 증가합니다.

## 다른 패턴과의 관계

- 많은 소프트웨어 설계가 [팩토리 메서드](../FactoryMethod/)(덜 복잡하고 하위 클래스를 통해 사용자 정의가 가능)를 사용하기 시작해서 [추상 팩토리](../AbstractFactory/), [프로토타입](../Prototype/) 또는 [빌더](../Builder/)(더 유연하지만 복잡함)로 발전합니다.
- [빌더](../Builder/)는 복잡한 객체를 단계별로 구성하는 데 중점을 둡니다. [추상 팩토리](../AbstractFactory/)는 관련 객체의 연관성에 중점을 둡니다. 추상 팩토리는 제품을 즉시 반환하지만, 빌더를 사용하면 제품을 가져오기 전에 몇 가지 추가 구성 단계를 실행할 수 있습니다.
- [빌더](../Builder/) 패턴에서 재귀적으로 작동하도록 구성 단계를 프로그래밍할 수 있으므로, 복잡한 [컴포지트](../../Structural/Composite/) 트리를 만들 때 사용할 수 있습니다.
- [빌더](../Builder/)와 [브릿지](../../Structural/Bridge/)를 결합할 수 있습니다. 감독 클래스는 추상화 역할을 하고 다른 빌더는 구현 역할을 합니다.
- [추상 팩토리 클래스](../AbstractFactory/), [빌더](../Builder/) 및 프로토타입 패턴은 모두 [싱글톤](../Singleton/) 패턴으로 구현될 수 있습니다.

## 참고

- [Builder in TypeScript](https://refactoring.guru/design-patterns/builder/typescript/example)
- [빌더 패턴(Builder Pattern)](https://dev-youngjun.tistory.com/197)
- [빌더 패턴(Builder Pattern)](https://dev-momo.tistory.com/entry/%EB%B9%8C%EB%8D%94-%ED%8C%A8%ED%84%B4-Builder-Pattern)
