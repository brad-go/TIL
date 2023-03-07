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
