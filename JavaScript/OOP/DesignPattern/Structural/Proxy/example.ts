/**
 * RealSubject 클래스와 프록시 둘 다에서 사용되는 동작을 선언합니다.
 * 클라이언트가 이 인터페이스롤 RealSubject를 사용하는 한, RealSubject 객체
 * 대신 프록시를 사용할 수 있습니다.
 */
interface Subject {
  request(): void;
}

/**
 * RealSubject는 핵심 비즈니스 로직을 가지고 있습니다. 대개, RealSubject는
 * 입력 데이터 수정과 같이 매우 느리거나 민감한 일부 유용한 작업을 수행할 수
 * 있습니다. 프록시는 RealSubject의 코드를 변경하지 않고, 이러한 문제를 해결할
 * 수 있습니다.
 */
class RealSubject implements Subject {
  request(): void {
    console.log("RealSubject: Handling request.");
  }
}

/**
 * 프록시는 RealSubject와 동일한 인터페이스를 가집니다.
 */
class Proxy implements Subject {
  private realSubject: RealSubject;

  /**
   * 프록시는 RealSubject 객체에 대한 참조를 유지합니다. 이것은 지연 초기화 되거나
   * 클라이언트에 의해 프록시로 전달될 수 있습니다.
   */
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  /**
   * 프록시 패턴의 가장 흔한 사용은 지연 초기화, 캐싱, 접근 제어, 로깅 등입니다.
   * 프록시는 이러한 작업 중 하나를 수해한 다음 결과에 따라 연결된 RealSubject
   * 객체의 동일한 메서드로 실행을 전달할 수 있습니다.
   */
  request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    // 진짜 체크하는 코드가 여기에 들어갑니다.
    console.log("Proxy: Checking access prior to firing a real requesst");

    return true;
  }

  private logAccess(): void {
    console.log("Proxy: Logging the time of request");
  }
}

/**
 * 클라이언트 코드는 RealSubject와 프록시를 모두 사용하기 위해 Subject 인터페이스를
 * 통해 모든 객체(Subject와 프록시 모두)와 소통해야 합니다. 그러나 실생활에서
 * 클라이언트들은 대부분 RealSubject를 직접 사용합니다. 이 경우 패턴을 보다 쉽게 구현하기
 * 위해 RealSubject 클래스에서 프록시를 확장할 수 있습니다.
 */
function clientCode(subject: Subject) {
  // ...
  subject.request();
  //. ..
}

console.log("Client: Executing the client code with a real subject: ");
const realSubject = new RealSubject();
clientCode(realSubject);

console.log("");

console.log("Client: Executing the same client code with a proxy: ");
const proxy = new Proxy(realSubject);
clientCode(proxy);

export {};
