/**
 * 프린터 하나를 10명이 공유해서 사용한다고 해봅시다.
 */
class Printer {
  private static instance: Printer;
  /**
   * 프린터가 하나이기 때문에 프린터를 이용하려면 클라이언트
   * 프로그램에서 프린터가 단 한번만 생성되도록 해야 합니다.
   * 이를 해결하기 위해 외부에서 생성자를 호출할 수 없게 합니다.
   */
  private constructor() {}

  static getPrinter(): Printer {
    if (!Printer.instance) {
      Printer.instance = new Printer();
    }

    return Printer.instance;
  }

  print(string: string): void {
    console.log(string);
  }
}

class User {
  constructor(private name: string) {}

  print() {
    const printer: Printer = Printer.getPrinter();
    printer.print(`${this.name} use printer.`);
  }
}

function client() {
  const USER_NUMBER = 5;
  const users: User[] = new Array(USER_NUMBER);

  for (let i = 0; i < USER_NUMBER; i++) {
    users[i] = new User(`user ${i + 1}`);
    users[i].print();
  }
}

client();
