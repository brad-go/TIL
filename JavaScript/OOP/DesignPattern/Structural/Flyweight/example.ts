/**
 * 플라이웨이트는 다수의 비즈니스 객체에 속하는 상태(intrinsic state, 고유한 상태
 * 혹은 내적인 상태)의 공통 부분을 저장합니다. 플라이웨이트는 메서드의 파라미터를 통해
 * 나머지 상태(extrinsic state, 한 객체마다 고유한 값인 외적인 상태)를 받습니다.
 */
class Flyweight {
  constructor(private sharedState: any) {}

  operation(uniqueState: any): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}

/**
 * 플라이웨이트 팩토리는 플라이웨이트 객체를 생성하고 관리합니다. 이는 플라이웨이트들이
 * 올바르게 공유될 수 있도록 해줍니다. 클라이언트가 플라이웨이트를 요청할 때, 팩토리는
 * 존재하는 인스턴스를 반환하거나 존재하지 않는다면 새로 생성해서 반환합니다.
 */
class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  /**
   * 주어진 상태에 대한 플라이웨이트의 문자열 해시값을 반환합니다.
   */
  private getKey(state: string[]): string {
    return state.join("_");
  }

  /**
   * 주어진 상태에 맞는 존재하는 플라이웨이를 반환하거나 새로 생성한 플라이웨이트를 반환합니다.
   */
  getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log("FlyweightFactory: Can't find a flyweight, creating new one");
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log("FlyweightFactory: Reusing existing flyweight");
    }

    return this.flyweights[key];
  }

  listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);

    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}

/**
 * 클라이언트 코드는 대개 어플리케이션의 초기화 단계에서 미리 채워진
 * 플라이웨이트를 생성합니다.
 */
const factory = new FlyweightFactory([
  ["Chevrolet", "Camaro2018", "pink"],
  ["Mercedes Benz", "C300", "black"],
  ["Mercedes Benz", "C500", "red"],
  ["BMW", "M5", "red"],
  ["BMW", "X6", "white"],
  // ...
]);
factory.listFlyweights();

// ...

function addCarToPoliceDatabase(
  ff: FlyweightFactory,
  plates: string,
  owner: string,
  brand: string,
  model: string,
  color: string
) {
  console.log("\nClient: Adding a car to database");
  const flyweight = ff.getFlyweight([brand, model, color]);

  // 클라이언트 코드는 외적인 상태를 저장하거나 계산하고 플라이웨이트의 메서드로 전달합니다.
  flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "M5", "red");
addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "X1", "red");

factory.listFlyweights();
