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
