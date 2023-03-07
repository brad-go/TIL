/**
 * 싱글톤 클래스에는 getInstance 메서드를 정의합니다.
 * 이 메서드는 클라이언트 코드에서 유일한 싱글톤 객체를 접근할 수 있게 해줍니다.
 */
class Singleton {
  private static instance: Singleton;

  /**
   * 싱글톤의 생성자는 new 연산자를 이용한 직접 생성 호출을 막기 위해
   * 항상 private이어야 합니다.
   */
  private constructor() {}

  /**
   * 싱글톤 객체로의 접근을 제어하기 위한 정적 메서드입니다.
   *
   * 이 구현을 통해 싱글톤 클래스의 각 하위 클래스들의 인스턴스를 하나로 유지하면서
   * 싱글톤 클래스를 하위 클래스화할 수 있습니다.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  /**
   * 싱글톤 인스턴스에서 실행될 비즈니스 로직을 정의합니다.
   */
  public someBuisnessLogic() {
    // ...
  }
}

function clientCode() {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    console.log(
      "싱글톤이 동작합니다. 두 변수에는 같은 인스턴스가 담겨 있습니다."
    );
  } else {
    console.log(
      "싱글톤이 실패했습니다. 변수들이 다른 인스턴스를 가지고 있습니다."
    );
  }
}

clientCode(); // 싱글톤이 동작합니다. 두 변수에는 같은 인스턴스가 담겨 있습니다.
