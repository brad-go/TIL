/**
 * 엘리베이터 부품 업체 변경하기
 * 엘리베이터가 여러 제조 업체의 부품을 사용하더라도 같은 동작을 지원해야 합니다.
 * 즉, 엘리베이터 프로그램의 변경을 최소화해야 합니다.
 */

// asbtract factory
interface ElevatorCompany {
  createMotor(): Motor;
  createDoor(): Door;
}

// concrete factory1
class HyundaiElevator implements ElevatorCompany {
  createMotor(): Motor {
    return new HyundaiMotor();
  }
  createDoor(): Door {
    return new HyundaiDoor();
  }
}

// concrete factory2
class LGElevator implements ElevatorCompany {
  createMotor(): Motor {
    return new LGMotor();
  }
  createDoor(): Door {
    return new LGDoor();
  }
}

enum Direction {
  UP,
  DOWN,
}

enum MotorStatus {
  ON,
  OFF,
}

// abstract product A
interface Motor {
  getMotorStatus(): MotorStatus;
  move(direction: Direction, door: Door): void;
}

// concrete product A1
class HyundaiMotor implements Motor {
  private motorStatus: MotorStatus = MotorStatus.OFF;

  getMotorStatus(): MotorStatus {
    return this.motorStatus;
  }

  setMotorStatus(motorStatus: MotorStatus): void {
    this.motorStatus = motorStatus;
  }

  move(direction: Direction, door: Door): void {
    console.log("현대 모터가 동작합니다.");
    this.setMotorStatus(MotorStatus.ON);

    if (direction === Direction.UP) {
      door.open();
    } else {
      door.close();
    }
  }
}

// concrete product A2
class LGMotor implements Motor {
  private motorStatus: MotorStatus = MotorStatus.OFF;

  getMotorStatus(): MotorStatus {
    return this.motorStatus;
  }

  setMotorStatus(motorStatus: MotorStatus): void {
    this.motorStatus = motorStatus;
  }

  move(direction: Direction, door: Door): void {
    console.log("엘지 모터가 동작합니다.");
    this.setMotorStatus(MotorStatus.ON);

    if (direction === Direction.UP) {
      door.open();
    } else {
      door.close();
    }
  }
}

enum DoorStatus {
  OPENED,
  CLOSED,
}

// abstract product B
interface Door {
  getDoorStatus(): DoorStatus;
  open(): void;
  close(): void;
}

// concrete product B1
class HyundaiDoor implements Door {
  private doorStatus: DoorStatus = DoorStatus.CLOSED;

  getDoorStatus() {
    return this.doorStatus;
  }

  open(): void {
    if (this.doorStatus === DoorStatus.OPENED) return;

    console.log("현대 엘리베이터 문이 열립니다.");
    this.doorStatus = DoorStatus.OPENED;
  }

  close(): void {
    if (this.doorStatus === DoorStatus.CLOSED) return;

    console.log("현대 엘리베이터 문이 닫힙니다.");
    this.doorStatus = DoorStatus.CLOSED;
  }
}

// concrete product B2
class LGDoor implements Door {
  private doorStatus: DoorStatus = DoorStatus.CLOSED;

  getDoorStatus() {
    return this.doorStatus;
  }

  open(): void {
    if (this.doorStatus === DoorStatus.OPENED) return;

    console.log("엘지 엘리베이터 문이 열립니다.");
    this.doorStatus = DoorStatus.OPENED;
  }

  close(): void {
    if (this.doorStatus === DoorStatus.CLOSED) return;

    console.log("엘지 엘리베이터 문이 닫힙니다.");
    this.doorStatus = DoorStatus.CLOSED;
  }
}

// CLIENT CODE
function client(company: ElevatorCompany) {
  const door = company.createDoor();
  const motor = company.createMotor();

  door.open();
  motor.move(Direction.DOWN, door);
  motor.move(Direction.UP, door);
}

client(new HyundaiElevator());
console.log("");
client(new LGElevator());
