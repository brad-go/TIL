/**
 * 브릿지 패턴은 비즈니스 로직이나 거대한 클래스를 독립적으로 개발할 수 잇는 별도의
 * 클래스 계층으로 나누는 구조적 디자인 패턴입니다.
 *
 * 이러한 계층 중 하나(종종 추상화라고 함)는 두 번째 계층(구현 계층)의 객체에 대한 참조를
 * 가집니다. 추상화 계층은 호출의 일부(혹은 대부분)를 구현 객체에 위임할 수 있습니다. 모든
 * 구현 계층은 공통 인터페이스를 가지므로 추상화 계층 내에서 상호 교환이 가능합니다.
 *
 * 플랫폼 간 앱을 처리하거나 여러 유형의 데이터베이스 서버를 지원하거나 특정 종류(클라우드,
 * 플랫폼, 소셜 네트워크 등)의 여러 API 공급자와 작업할 때 유용합니다.
 */

/**
 * 추상화 계층에는 두 클래스 계층의 "제어" 부분에 대한 인터페이스를 정의합니다. 구현 계층의
 * 객체에 대한 참조를 유지 관리하고 모든 실제 작업을 이 객체에 위임합니다.
 */
class Abstraction {
  constructor(protected implementation: Implementation) {}

  operation(): string {
    const result = this.implementation.operationImplementation();
    return `Aabstraction: Base operation with:\n${result}`;
  }
}

/**
 * 구현 계층의 클래스들의 변경 없이 추상화 계층을 확장할 수 있습니다.
 * 추상화 계층의 인터페이스와 일치할 필요는 없습니다.
 * 사실, 두 인터페이스들은 완전히 다를 수 잇습니다. 대체적으로 구현 인터페이스는
 * 원시적인 동작을 제공하는 반면에, 추상 계층에는 이 원시적인 동작들을 기반으로 한
 * 고수준의 동작들을 정의합니다.
 */
class ExtendAbstraction extends Abstraction {
  operation(): string {
    const result = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

/**
 * 구현 계층에는 모든 구현 클래스들을 위한 인터페이스를 정의합니다.
 */
interface Implementation {
  operationImplementation(): string;
}

/**
 * 각 구체적인 구현 클래스는 특정한 플랫폼과 일치하고 플랫폼의 API를 사용하여
 * 구현 인터페이스를 구현합니다.
 */
class ConcreteImplementaionA implements Implementation {
  operationImplementation(): string {
    return `ConcreteImplementationA: Here\'s the result on the platform A.`;
  }
}

class ConcreteImplementaionB implements Implementation {
  operationImplementation(): string {
    return `ConcreteImplementationB: Here\'s the result on the platform B.`;
  }
}

/**
 * 추상화 객체가 특정 구현 객체와 연결되는 초기화 단계를 제외하고 클라이언트 코드는
 * 추상화 클래스에 의존해야 합니다.이러한 방식으로 클라이언트 코드는 모든 추상화-
 * 구현 조합을 지원합니다.
 */
function clientCode(abstraction: Abstraction) {
  // ...
  console.log(abstraction.operation());
  // ...
}

/**
 * 클라이언트 코드는 어떤 사전 설정된 추상화-구현 조합과도 함께 동작이 가능해야 합니다.
 */
let implementation = new ConcreteImplementaionA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log("");

implementation = new ConcreteImplementaionB();
abstraction = new ExtendAbstraction(implementation);
clientCode(abstraction);
