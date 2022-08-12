# 플라이웨이트 패턴(Flyweight Pattern)

## 플라이웨이트 패턴이란?

플라이웨이트 패턴은 **각 객체의 모든 데이터를 유지하는 대신 여러 객체 간에 공통 상태 부분을 공유하여 사용 가능한 RAM 공간을 더 호율적으로 사용할 수 있게 하는 구조적 디자인 패턴**입니다. 여러 객체 간에 객체 상태의 일부를 공유하여 이를 달성하는데, 플라이웨이트는 다를 객체에서 사용하는 동일한 데이터를 캐싱하여 RAM을 절약합니다.

플라이웨이트 패턴은 공통으로 사용하는 클래스(Flyweight)를 생성하는 팩토리 클래스(FlyweightFactory)를 만들어, 인스턴스를 최초 1개만 생성하고 공유하여 재사용할 수 있도록 합니다. 또, **자주 변하는 속성(=외적인 속성, extrinsit)과 변하지 않는 속성(=내적인 속성, intrinsit)을 분리**하여 메모리 사용을 줄입니다.

### 문제

긴 근무 시간 후에 재미를 느끼기 위해 간단한 비디오 게임을 만들기로 결정했다고 해보시다. 플레이어는 지도를 돌아다니며 서로를 쏘게 됩니다. 사실적인 입자 시스템을 구현하고 이를 게임의 독특한 기능으로 만들기로 결정했습니다. 폭발로 인한 방대한 양의 총알, 미사일 및 파편이 맵 전체를 날아다니며 플레이어에게 스릴 넘치는 경험을 선사해야 합니다.

완료되면 마지막 커밋을 푸시하고 게임을 빌드하고 테스트 드라이브를 위해 친구에게 보냈습니다.게임이 당신의 컴퓨터에서 완벽하게 실행되고 있었지만, 당신의 친구는 오랫동안 게임을 할 수 없었습니다. 그의 컴퓨터에서 게임은 몇 분의 게임 플레이 후에도 계속 충돌했습니다. 디버그 로그를 파헤치는 데 몇 시간을 보낸 후 RAM이 충분하지 않아 게임이 중단되었음을 발견했습니다. 당신 친구의 장비가 당신의 컴퓨터보다 훨씬 덜 강력하다는 것이 밝혀졌고, 그래서 그의 컴퓨터에서 문제가 너무 빨리 나타났습니다.

실제 문제는 입자 시스템과 관려되었습니다. 총알, 미사일 또는 파편 조각과 같은 각 입자는 많은 데이터가 포함된 별도의 객체로 표시되지만, 어느 시점에서 플레이어 화면의 대학살이 절정에 이르렀을 때, 새로 생성된 입자가 들어갈 나머지 RAM공간이 모자라 프로그램이 충돌하는 것이 문제였습니다.

![https://refactoring.guru/images/patterns/diagrams/flyweight/problem-en-2x.png](https://refactoring.guru/images/patterns/diagrams/flyweight/problem-en-2x.png)

### 해결책

Particle 클래스를 자세히 살펴보면 색상과 스프라이트(입자를 나타내는 이미지) 필드는 다른 필드보다 훨씬 더 많은 메모리를 소비합니다. 더 나쁜 점은 이 두 필드가 모든 입자에 걸쳐 거의 동일한 데이터를 저장한다는 것입니다. 예를 들어, 모든 총알은 동일한 색상과 스프라이트를 갖습니다.

![https://refactoring.guru/images/patterns/diagrams/flyweight/solution1-en-2x.png](https://refactoring.guru/images/patterns/diagrams/flyweight/solution1-en-2x.png)

좌표, 이동 벡터 및 속도와 같은 입자 상태의 다른 부분은 각 입자에 고유합니다. 결국 이러한 필드의 값은 시간이 지남에 따라 변경됩니다. 이 데이터는 입자가 존재하는 항상 변화하는 컨텍스트를 나타내며, 색상과 스프라이트는 각 입자에 대해 일정하게 유지됩니다.

객체의 이 상수 데이터를 일반적으로 **intrinsic state(내적인 혹은 고유한 상태)** 라고 합니다. 이는 다른 객체들은 읽을 수만 있고, 변화시킬 수는 없으며 객체 내부에 존재합니다. 다른 객체에 의해 “외부로 부터” 변경되는 나머지 객체의 상태를 **extrinsic state(외적인 상태)** 라고 합니다.

플라이웨이트 패턴은 **객체 내부에 외부 상태의 저장을 하지 않습니다. 대신 이 상태를 의존하는 특정 메서드에 이 상태를 전달**합니다. **고유한 상태(instrinsic state)만 객체 내에 유지되므로 다른 컨텍스트에서 재사용**할 수 있습니다. 결과적으로 이러한 객체는 외부보다 변형이 훨씬 적은 고유 상태에서만 다르기 때문에 더 적은 수의 객체만 필요하게 됩니다.

다시 게임으로 돌아와서 입자 클래스로부터 외부 상태를 추출했다고 가정하면 총알, 미사일 및 파편의 세 가지 다른 객체만 게임의 모든 입자를 나타내기에 충분합니다. 짐작하셨겠지만, **고유한 상태(intrinsic state)만을 저장한 객체를 플라이웨이트 패턴**이라고 부릅니다.

### 외적인 상태(extrinsic state)의 저장

그렇다면 외적인 상태(extrinsic state)를 어디로 옮겨야 할까요? 일부 클래스는 이 상태를 저장해야 합니다. 대부분의 경우 패턴을 적용하기 전에 객체를 종합하는 컨테이너 객체로 이동합니다.

우리의 경우 `particles` 필드에 모든 입자를 저장하는 메인 객체 `Game`을 말합니다. 외부 상태를 이 클래스로 이동시키려면 각 개별 입자의 좌표, 벡터 및 속도를 저장하기 위한 여러 배열 필드를 만들어야 합니다. 하지만 입자를 나타내는 특정 플라이웨이트 객체에 대한 참조를 저장하기 위해 다른 배열도 필요합니다. 동일한 인덱스를 사용하여 입자의 모든 데이터에 접근할 수 있도록 이 배열은 동기화되어야 합니다.

![https://refactoring.guru/images/patterns/diagrams/flyweight/solution2-en-2x.png](https://refactoring.guru/images/patterns/diagrams/flyweight/solution2-en-2x.png)

더 나은 솔루션은 플라이웨이트 객체에 대한 참조와 함께 외부 상태를 저장할 별도의 컨텍스트 클래스를 만드는 것입니다. 이 접근 방식을 사용하려면 컨테이너 클래스에 `particles` 배열만 있으면 됩니다.

그러나 초기 모습과 비슷하게 이런 컨텍스트 객체를 많이 가져야할까요? 기술적으로 그렇습니다. 그러나 중요한 것은 이전보다 이 객체들이 훨씬 작다는 것입니다. 가장 메모리를 많이 사용하는 필드가 몇 개의 플라이웨이트 객체로 이동되었습니다. 이제 수천 개의 작은 컨텍스트 객체가 데이터 복사본 수천 개를 저장하는 대신 하나의 플라이웨이트 객체를 사용할 수 있습니다.

### 플라이웨이트와 불변성

동일한 플라이웨이트 객체가 다른 컨텍스트에서 사용될 수 있으므로, 해당 상태를 수정할 수 없는지 확인해야 합니다. **플라이웨이트 클래스는 생성자 매개변수를 통해 상태를 한 번만 초기화해야 합니다. setter 또는 public 필드를 다른 객체 노출해서는 안됩니다**.

### 플라이웨이트 팩토리

다양한 플라이웨이트 객체에 보다 편리하게 접근하기 위해 기존 플라이웨이트 객체 풀을 관리하는 팩토리 메서드를 만들 수 있습니다. 이 메서드는 클라이언트에서 원하는 플라이웨이트의 고유 상태를 입력 받고, 이 상태와 일치하는 기존 플라이웨이트 객체를 찾고 발견되면 반환합니다. 그렇지 않은 경우 새 플라이웨이트 객체를 생성하여 풀에 추가합니다.

이 메서드를 위치시킬 몇가지 방법이 있습니다. 가장 확실한 곳은 플라이웨이트 컨테이너입니다. 또는 새 팩토리 클래스를 생성할 수 있습니다. 또는 팩토리 메서드를 정적으로 만들고 실제 플라이웨이트 클래스 안에 넣을 수 있습니다.

## 구조

![https://refactoring.guru/images/patterns/diagrams/flyweight/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/flyweight/structure-indexed-2x.png)

플라이웨이트 패턴은 그저 **최적화** 과정입니다. 이 패턴을 적용하기 전에, 메모리 안에서 동시에 엄청난 수의 비슷한 객체들이 존재하는지에 관련된 문제로 RAM 소비가 일어나는지 확인해야 합니다. 이 문제가 다른 더 나은 방법으로 해결되지 않는지도 확인합니다.

- **Flyweight**: 플라이웨이트 클래스는 기존 객체의 다수의 객체들 사이에서 공유될 수 있는 상태 부분을 가집니다. 즉, **공유에 사용할 클래스(또는 API)** 입니다. 동일한 플라이웨이트 객체는 다양한 상황에서 사용될 수 있으며, 내부에 저장된 상태를 **고유한 상태(intrinsic)** 라고 합니다. 플라이웨이트 클래스의 메서드에 전달된 상태를 **외적인 상태(extrinsic)** 라고 합니다.
- **Context**: 컨텍스트 클래스는 모든 원본 객체에서 고유한 외부 상태를 포함합니다. 컨텍스트 클래스가 플라이웨이트 객체 중 하나와 연결되면 원래 객체의 전체 상태를 나타내게 됩니다.

일반적으로 원래 객체의 동작은 플라이웨이트 클래스에 남아 있습니다. 이 경우 플라이웨이트의 메서드를 호출하는 사람은 외부 상태도 적절하게 메서드의 매개변수로 전달해야 합니다. 반면에, 동작은 연결된 플라이웨이트 객체를 단순히 데이터 객체로 사용하는 컨텍스트 클래스로 이동할 수 있습니다.

- **Client**: 클라이언트는 플라이웨이트 객체의 외부 상태를 계산하거나 저장합니다. 클라이언트의 관점에서 플라이웨이트 객체는 일부 컨텍스트 데이터를 메서드의 매개변수에 전달하여 런타임에 구성할 수 있는 템플릿 객체입니다.
- **FlyweightFactory**: 기존 플라이웨이트 객체 풀을 관리합니다. 팩토리에서 클라이언트는 플라이웨이트 객체를 직접 만들지 않습니다. 대신에 원하는 플라이웨이트 객체의 고유 상태를 전달하여 팩토리를 호출합니다. 팩토리는 이전에 생성된 플라이웨이트 객체를 살펴보고 검색 기준과 일치하는 기존 **플라이웨이트 객체를 반환하거나 존재하지 않는다면 새 플라이웨이트 객체를 생성**합니다.

## 예시 코드

```tsx
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

// FlyweightFactory: I have 5 flyweights:
// Chevrolet_Camaro2018_pink
// Mercedes Benz_C300_black
// Mercedes Benz_C500_red
// BMW_M5_red
// BMW_X6_white

// Client: Adding a car to database
// FlyweightFactory: Reusing existing flyweight
// Flyweight: Displaying shared (["BMW","M5","red"]) and unique (["CL234IR","James Doe"]) state.

// Client: Adding a car to database
// FlyweightFactory: Can't find a flyweight, creating new one
// Flyweight: Displaying shared (["BMW","X1","red"]) and unique (["CL234IR","James Doe"]) state.

// FlyweightFactory: I have 6 flyweights:
// Chevrolet_Camaro2018_pink
// Mercedes Benz_C300_black
// Mercedes Benz_C500_red
// BMW_M5_red
// BMW_X6_white
// BMW_X1_red
```

- [다른 예시 1](./tree.ts)
- [다른 예시 2](./font.ts)

## 언제 사용해야할까?

- **프로그램이 사용 가능한 RAM을 초과하는 엄청난 수의 객체를 사용해야하는 경우**에만 플라이웨이트 패턴을 사용합니다.
- 패턴 적용의 이점은 패턴을 사용하는 방법과 위치에 따라 크게 달라집니다. 다음과 같은 경우가 가장 유용합니다.
  - 응용 프로그램이 수많은 유사한 객체를 생성해야 할 때
  - 이 객체들이 기기에서 사용 가능한 RAM을 대부분 소모할 때
  - 객체에는 여러 객체 간에 추출 및 공유할 수 있는 중복 상태가 포함될 때

## 구현 방법

1. 플라이웨이트가 될 클래스의 필드를 두 부분으로 나눕니다.
   - **내적인 상태(intrinsic state)**: 여러 객체 걸쳐 복제된 변경되지 않는 데이터를 포함하는 필드
   - **외적인 상태(extrinsic state)**: 각 객체에 고유한 컨텍스트 데이터를 포함하는 필드
2. 클래스의 고유 상태를 나타내는 필드를 그대로 두되, 변경 불가능한지 확인합니다. 생성자 내에서만 초기값을 가져와야 합니다.
3. 외부 상태의 필드를 사용하는 메서드를 확인합니다. 메서드에 사용된 각 필드에 대해 새 매개변수를 도입하고 필드 대신 사용합니다.
4. 선택적으로 플라이웨이트 풀을 관리하기 위한 팩토리 클래스를 생성합니다. 새 플라이웨이트를 만들기 전에 기존 플라이웨이트를 확인합니다. 팩토리를 생성했다면, 클라이언트는 팩토리를 통해서만 플라이웨이트를 요청해야 합니다. 클라이언트는 팩토리에 고유 상태를 전달하여 원하는 플라이웨이트를 요청합니다.
5. 클라이언트는 플라이웨이트 객체의 메서드를 호출할 수 있도록 외부 상태(컨텍스트) 값을 저장하거나 계산해야 합니다. 편의상, 플라이웨이트 참조 필드와 함께 외부 상태는 별도의 컨텍스트 클래스로 이동될 수 있습니다.

## 장점과 단점

### 장점

- 프로그램에 유사한 객체가 많이 있다고 가정하면 많은 RAM을 절약할 수 있습니다.

### 단점

- 플라이웨이트 메서드를 호출할 때마다 일부 컨텍스트 데이터를 다시 계산해야 하는 경우 CPU 사이클을 넘어서 RAM을 요청하게 될 수 있습니다.
- 코드가 더 복잡해질 수 있습니다. 새로 팀에 합류한 멤버는 항상 왜 객체의 상태를 이러한 방법으로 나누었는지 궁금해 할 것입니다.

## 다른 패턴과의 관계

- [컴포지트](../Composite/) 트리의 공유 리프 노드를 [플라이웨이트](../Flyweight/) 패턴으로 구현하여 RAM을 절약할 수 있습니다.
- [플라이웨이트](../Flyweight/) 패턴은 많은 작은 객체를 만드는 방법을 보여주는 반면, [퍼사드](../Facade/) 패턴은 전체 하위 시스템을 나타내는 단일 객체를 만드는 방법을 보여줍니다.
- [플라이웨이트](../Flyweight/) 패턴은 객체의 모든 공유 상태를 단 하나의 플라이급 객체로 줄일 수 있다면, [싱글톤](../../Creational/Singleton/)과 비슷할 수 있습니다. 하지만 두 가지 차이가 있습니다.
  1. 단 하나의 싱글톤 인스턴스가 있어야 하는 반면, 플라이웨이트 클래스는 고유 상태가 다른 여러 인스턴스를 가질 수 있습니다.
  2. 싱글톤 객체는 변경할 수 있지만, 플라이웨이트 객체는 변경할 수 없습니다.

## 참고

- [Flyweight](https://refactoring.guru/design-patterns/flyweight)
- [[구조 패턴] 플라이웨이트 패턴](https://dev-youngjun.tistory.com/217?category=937057)
