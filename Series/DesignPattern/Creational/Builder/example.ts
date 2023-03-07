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
