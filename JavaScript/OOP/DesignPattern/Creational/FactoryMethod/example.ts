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
