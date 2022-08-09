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
