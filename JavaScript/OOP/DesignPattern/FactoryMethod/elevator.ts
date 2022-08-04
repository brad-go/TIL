/*
여러 대의 엘리베이터를 관리하는 프로그램을 만든다고 해보죠. 
초기에 엘리베이터는 처리량을 최대화하기 위한 전략으로 엘리베이터들을 조작합니다. 
그러나 사용자의 대기 시간을 최소화하는 전략으로 변경할 수 있게하려면? 낮에는 
엘리베이터를 대기 시간을 최소화하고, 저녁에는 처리량을 최대화하는 동적 스케줄링이
필요하다면 어떻게 코드를 작성해야 할까요?

팩토리 메서드 패턴을 이용해 클래스 생성 작업을 별도의 클래스/메서드로 분리시켜야 합니다. 
이를 분리시킴으로 객체 생성의 변화에 대비할 수 있도록 합니다. 
*/

enum Direction {
  UP,
  DOWN,
}

// Creator
abstract class ElevatorManager {
  private controllers: ElevatorController[];

  constructor(controllerCount: number) {
    this.controllers = new Array(controllerCount);

    // 주어진 수 만큼 elevator controller 객체 생성
    for (let i = 0; i < controllerCount; i++) {
      // 엘리베이터의 이동을 책임지는 elevator controller 객체
      const controller: ElevatorController = new ElevatorController(i + 1);
      this.controllers[i] = controller;
    }
  }

  // 팩토리 메서드
  abstract getScheduler(): ElevatorScheduler;

  // 요청(가려는 층, 방향)에 따라 엘리베이터를 선택하고 이동시킴
  requestElevator(floor: number, direction: Direction): void {
    const scheduler = this.getScheduler();
    console.log(scheduler);
    // throughput scheduler를 이용해 엘리베이터를 선택
    const selectedElevator = scheduler.selectElevator(this, floor, direction); // prettier-ignore
    // 선택된 엘리베이터를 이동시킴
    this.controllers[selectedElevator].gotoFloor(floor);
  }
}

// Concrete Creator - 대기 시간 최소화 전략 하위 클래스
class ResponseTimeSchedulingElevatorManager extends ElevatorManager {
  // constructor (...args) { super(...args) }

  getScheduler(): ElevatorScheduler {
    return new ResponseTimeScheduler();
  }
}

// Concrete Creator - 처리량 최대화 전략 하위 클래스
class ThroughputManagerSchedulingElevatorManger extends ElevatorManager {
  getScheduler(): ElevatorScheduler {
    return new ThroughputScheduler();
  }
}

// Concrete Creator - 동적 스케줄링 전략 하위 클래스
class DynamicSchedulingElevatorManger extends ElevatorManager {
  getScheduler(): ElevatorScheduler {
    const hour = new Date().getHours();

    if (hour < 12) {
      return new ResponseTimeScheduler();
    } else {
      return new ThroughputScheduler();
    }
  }
}

interface ElevatorScheduler {
  // prettier-ignore
  selectElevator(manager: ElevatorManager, floor: number, direction: Direction): number;
}

class ResponseTimeScheduler implements ElevatorScheduler {
  // prettier-ignore
  selectElevator(manager: ElevatorManager, floor: number, direction: Direction): number {
    return 1;
  }
}

// 엘리베이터 작업 처리량의 최대화를 다루는 클래스
class ThroughputScheduler implements ElevatorScheduler {
  // prettier-ignore
  selectElevator(manager: ElevatorManager, floor: number, direction: Direction): number { 
    return 0; // 임의 선택
  }
}

class ElevatorController {
  // id: 엘리베이터 번호, currentFloor: 현재 층
  constructor(private id: number, private currentFloor: number = 1) {}

  gotoFloor(floor: number): void {
    console.log(`Elevator [${this.id}] Floor: ${this.currentFloor}`);
    // 현재 층 갱신, 주어진 목적지 층(floor)으로 엘리베이터가 이동함
    this.currentFloor = floor;
    console.log(` ==> ${this.currentFloor}`);
  }
}

function client(
  manager: ElevatorManager,
  floor: number,
  direction: Direction
): void {
  manager.requestElevator(floor, direction);
}

client(new ResponseTimeSchedulingElevatorManager(2), 10, Direction.UP);
client(new ThroughputManagerSchedulingElevatorManger(2), 10, Direction.UP);
client(new DynamicSchedulingElevatorManger(2), 10, Direction.UP);

// ResponseTimeScheduler {}
// Elevator [2] Floor: 1
//  ==> 10
// ThroughputScheduler {}
// Elevator [1] Floor: 1
//  ==> 10
// ResponseTimeScheduler {}
// Elevator [2] Floor: 1
//  ==> 10
