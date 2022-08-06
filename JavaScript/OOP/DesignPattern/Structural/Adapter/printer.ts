/**
 * Target
 * 글자를 출력해주는 프린터 클래스가 있다고 해봅시다.
 * pushText(text): 출력할 글자들을 저장
 * print(): 입력받은 글자들을 공백으로 이어붙여 출력
 */
class Printer {
  private textArray: string[] = [];

  pushText(text: string): void {
    this.textArray.push(text);
  }

  print(): string {
    return this.textArray.join(" ");
  }
}

/**
 * Adaptee
 * 해시태그를 붙여서 출력하는 프린터로 교체가 하고 싶다
 * 새로운 프린터는 인터페이스도 현재와 다르다.
 */
class HashTagPrinter {
  private textArray: string[] = [];

  pushText(text: string) {
    this.textArray.push(text);
  }

  // 기존 프린터와 다른 메서드를 가지고 있어 호환이 불가능!!
  printWithHashTag() {
    return this.textArray.map((text) => `#${text}`).join(" ");
  }
}

/**
 * Adapter
 */
class HashTagPrinterAdapter extends Printer {
  private hashTagPrinter: HashTagPrinter;

  constructor(hashTagPrinter: HashTagPrinter) {
    super();
    this.hashTagPrinter = hashTagPrinter;
  }

  pushText(text: string): void {
    this.hashTagPrinter.pushText(text);
  }

  print(): string {
    return this.hashTagPrinter.printWithHashTag();
  }
}

/**
 * client 코드
 */
function print(printer: Printer) {
  printer.pushText("Hello");
  printer.pushText("Design");
  printer.pushText("Pattern");

  console.log(printer.print());
}

const printer = new Printer();
print(printer); // Hello Design Pattern

const hashTagPrinter = new HashTagPrinter();
// print(new HashTagPrinter()); // Error!

const hashTagAdapter = new HashTagPrinterAdapter(hashTagPrinter);
print(hashTagAdapter); // #Hello #Design #Pattern
