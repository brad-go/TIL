class Employee {
  protected wash: Wash;
  protected breakfast: Breakfast;
  protected move: Move;

  /**
   * 어플리케이션의 필요에 따라 기존 하위 시스템 객체를 퍼사드 클래스에 제공하거나
   * 퍼사드 클래스에 직접 작성할 수 있습니다.
   */
  constructor(wash?: Wash, breakfast?: Breakfast, move?: Move) {
    this.wash = wash || new Wash();
    this.breakfast = breakfast || new Breakfast();
    this.move = move || new Move();
  }

  goToWork(): void {
    this.wash.brushTeeth();
    this.wash.shower();
    this.breakfast.eat();
    this.breakfast.water();
    this.move.bus();
  }
}

class Wash {
  brushTeeth(): void {
    console.log("Brush my teeth");
  }

  shower(): void {
    console.log("Take a shower");
  }
}

class Breakfast {
  eat(): void {
    console.log("Have breakfast");
  }

  water(): void {
    console.log("Drink water");
  }
}

class Move {
  bus(): void {
    console.log("Take the bus");
  }
}

function client() {
  const employee = new Employee();
  employee.goToWork();
}

client();
