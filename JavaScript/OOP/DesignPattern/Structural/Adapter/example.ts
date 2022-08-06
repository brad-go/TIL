/**
 * 타겟에는 클라이언트 코드에서 사용하는 도메인 별 인터페이스를 정의합니다.
 */
class Target {
  request(): string {
    return "타겟: 기본 타겟의 동작";
  }
}

/**
 * Adaptee(서드 파티, 레거시 등)에는 유용한 동작이 있지만, 인터페이스가 기존의
 * 클라이언트 코드와 호환되지 않습니다. Adaptee는 클라이언트 코드를 사용하기 전에
 * 변환이 필요합니다.
 */
class Adaptee {
  specificRequest(): string {
    return "동작 한별특 의eetpadA";
  }
}

/**
 * 어댑터는 Adaptee의 인터페이스를 타겟의 인터페이스와 호환될 수 있도록 해줍니다.
 */
class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  request(): string {
    const result = this.adaptee.specificRequest().split("").reverse().join("");
    return `어댑터: (변환됨) ${result}`;
  }
}

/**
 * 클라이언트 코드는 타겟 인터페이스를 따르는 모든 클래스를 지원합니다.
 */
function clientCode(target: Target) {
  console.log(target.request());
}

console.log("클라이언트: 타겟 객체와 함께 동작할 수 있습니다.");
const target = new Target();
clientCode(target);

console.log("");

const adaptee = new Adaptee();
console.log(
  "클라이언트: Adaptee 클래스는 이상한 인터페이스를 가져서 이해할 수 없습니다."
);
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log("");

console.log("클라이언트: 하지만 어댑터를 통해 함께 동작할 수 있습니다.");
const adapter = new Adapter(adaptee);
clientCode(adapter);
