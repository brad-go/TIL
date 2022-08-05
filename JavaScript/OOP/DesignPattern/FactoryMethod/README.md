# 팩토리 메서드 패턴(Factory Method Pattern)

## 목적

**상위 클래스에서 객체를 생성하기 위한 인터페이스를 제공하고, 하위 클래스에서 생성될 객체(인스턴스)의 유형을 결정하는 디자인 패턴**입니다. 즉, 객체 생성 처리를 서브 클래스로 분리해 처리하도록 캡슐화하는 패턴입니다.

팩토리 메서드 패턴은 **객체 생성 호출을 팩토리 메서드의 호출로 대체**합니다. 객체의 생성 코드를 별도의 클래스/메서드로 분리함으로써 **객체 생성의 변화에 대비하는 데 유용**합니다.

## 구조

![팩토리 메서드 패턴 구조](https://refactoring.guru/images/patterns/diagrams/factory-method/structure-indexed-2x.png)
[출처: https://refactoring.guru/design-patterns/factory-method]

- **Product**: Creator와 해당 하위 클래스가 생성할 수 있는 모든 객체에 공통적인 인터페이스
- **Concrete Product**: Product 인터페이스의 각기 다른 구현으로 구체적으로 객체가 생성되는 클래스
- **Creator**: 새 Product 객체를 반환하는 팩토리 메서드를 선언, 메서드의 반환 타입은 Product 인터페이스와 일치
- **Concrete Creator**: 팩토리 메서드를 재정의해서 구현하는 클래스로 Concrete Product 객체를 생성

## 적용 가능성

- 코드에서 작업해야 하는 **객체의 정확한 타입과 의존성을 알지 못하는 경우**
- 라이브러리 또는 프레임워크의 사용자에게 **내부 구성 요소를 확장하는 방법을 제공**하려는 경우
- 매번 재구축하는 대신 **기존 객체를 재사용하여 시스템 자원을 절약**하려는 경우

## 구현 방법

1. 모든 product가 동일한 인터페이스를 따르도록 합니다. 이 인터페이스에는 모든 product에서 의미가 있는 메서드를 선언합니다.
2. Creator 클래스 내부에 빈 팩토리 메서드를 추가합니다. 메서드의 반환 유형은 공통 product 인터페이스와 일치해야 합니다.
3. Creator의 코드에서 product 생성자에 대한 모든 참조를 찾습니다. Product 생성 코드를 팩토리 메서드로 추출하면서 하나씩 팩토리 메서드에 대한 호출로 교체합니다.
4. 팩토리 메서드에 나열된 각 product 타입에 대한 creator 하위 클래스를 생성합니다. 하위 클래스에서 팩토리 메서드를 재정의하고, 본래의 팩토리 메서드에서 적절한 생성 코드 약간을 추출합니다.
5. Product 타입이 너무 많고 모든 product에 대한 하위 클래스를 만드는 것이 적합하지 않다고 판단되는 경우, 하위 클래스의 부모 클래스에서 매개변수를 통해 제어할 수 있습니다.
6. 모든 추출이 끝나면, 본래의 팩토리 메서드는 비게 될 것이고 추상화할 수 있습니다. 하지만 남아 있는 코드가 있다면 팩토리 메서드의 기본 동작으로 만들 수 있습니다.

## 장단점

### 장점

- Creator와 구체화된 product 간의 긴밀한 결합을 피한다. 즉, **결합도가 낮아진다**.
- **단일 책임 원칙을 준수**합니다. 객체 생성 코드를 분리시킴으로 **코드가 간결**해진다.
- **개방 폐쇄 원칙을 준수**합니다. **객체 생성 코드 분리시키기 때문에 기존 코드의 변경없이 객체를 추가/수정이 일어나더라도 객체를 생성하는 코드만 수정**하면 된다.
- 객체 생성 호출을 팩토리 메서드로 대체하고, 하위 클래스의 팩토리 메서드에서 오버라이딩을 통해 생성될 객체를 변경할 수 있으면서 같은 타입을 사용할 수 있습니다.

### 단점

- 패턴을 구현하기 위해 하위 클래스가 많아지기에 코드가 복잡해질 수 있습니다.
- 하위 클래스를 아우르는 공통 인터페이스가 필요하고, 상위 클래스의 팩토리 메서드의 반환 타입이 이 인터페이스여야 합니다.

## 다른 패턴과의 관계

- 많은 소프트웨어 설계가 [팩토리 메서드](../FactoryMethod/)(덜 복잡하고 하위 클래스를 통해 사용자 정의가 가능)를 사용하기 시작해서 [추상 팩토리](../AbstractFactory/), 프로토타입 또는 [빌더](../Builder/)(더 유연하지만 복잡함)로 발전합니다.
- [추상 팩토리 클래스](../AbstractFactory/)는 [팩토리 메서드](../FactoryMethod/)를 기반으로 하지만, 프로토타입을 사용해서 구성할 수도 있습니다.
- 프로토타입 패턴은 상속을 기반으로 하지 않지만 복제된 객체의 복잡한 초기화가 필요합니다. 반면에 [팩토리 메서드 패턴](../FactoryMethod/)은 상속을 기반으로 하지만 초기화 단계가 필요하지 않습니다.
- [팩토리 메서드 패턴](../FactoryMethod/)은 템플릿 메서드 패턴을 특수화한 버전입니다. 동시에 팩토리 메서드는 큰 템플릿 메서드 패턴의 한 단계가 될 수 있습니다.

## 예시 코드

```ts
// 제품 클래스의 객체를 반환하는 팩토리 메서드를 정의하는 Creator 클래스
// Creator의 하위 클래스들은 대개 이 메서드의 구현을 제공한다.
abstract class Creator {
  // Creator가 팩토리 메서드의 기본 구현을 제공할 수도 있다.
  abstract factoryMethod(): Product;

  // Creator란 이름에도 불구하고 주된 책임이 제품의 생성이 아니란 것을 기억하자.
  // 대개 이것은 팩토리 메서드에 의해 반환된 제품 객체들에 의존하는 핵심 비즈니스 로직을 가지고 있다.
  // 하위 클래스는 팩토리 메서드를 오버라이딩하고 팩토리 메서드에서 다른 유형의 제품을 반환함으로써 간접적으로 비즈니스 로직을 변경할 수 있다.
  someOperation(): string {
    // 제품 객체를 생성하기 위해 팩토리 메서드를 호출한다.
    const product = this.factoryMethod();
    // 제품 사용
    return `Creator: 같은 creator의 코드는 ${product.operation()}과 함께 동작한다.`;
  }
}

class ConcreteCreator1 extends Creator {
  // 비록 구체적인 제품은 실제로 이 메서드로붙 반환되지만, 이 메서드의 특징은 추상 제품 타입을 사용한다는 것이다.
  // 이러한 방법으로 Creator가 구체적인 제품 클래스들로부터 독립적일 수 있다.
  factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

interface Product {
  operation(): string;
}

class ConcreteProduct1 implements Product {
  operation(): string {
    return `{Result of the ConcreteProduct1}`;
  }
}

class ConcreteProduct2 implements Product {
  operation(): string {
    return `{Result of the ConcreteProduct2}`;
  }
}

// 클라이언트 코드는 비록 인터페이스를 기반으로 하더라도, 구체적인 creator의 인스턴스와 함께 동작한다.
// 클라이언트가 비록 인터페이스 기반일지라도 creator와 함께 동작하는 동안, 당신은 어떤 creator의 하위 클래스를 매개변수로 전달할 수 있다.
function clientCode(creator: Creator) {
  // ...
  console.log(
    "Client: 나는 creator의 클래스를 인식하지 못하지만 여전히 동작한다."
  );
  console.log(creator.someOperation());
  // ...
}

// 어플리케이션은 환경이나 설정에 의존해 creator의 타입을 고른다.
console.log("App: Launched with the ConcreteCreator1.");
clientCode(new ConcreteCreator1());
console.log(" ");

console.log("App: Launched with the ConcreteCreator2.");
clientCode(new ConcreteCreator2());
```

[⬆ Back to top](https://www.notion.so/Design-Pattern-be5c2addc0d14f49a58bc4c20643a41b)

# 참고

- [Factory Method](https://refactoring.guru/design-patterns/factory-method)
- [[Design Pattern] 팩토리 메서드 패턴이란 - Heee's Development Blog](https://gmlwjd9405.github.io/2018/08/07/factory-method-pattern.html)
