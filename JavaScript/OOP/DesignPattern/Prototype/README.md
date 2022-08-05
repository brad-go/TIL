# 프로토타입 패턴(Prototype Pattern)

## 프로토타입 패턴이란?

프로토타입 패턴이란 **코드를 클래스에 의존하게 하지 않고, 기존 객체를 복사할 수 있는 디자인 패턴**입니다. 즉, **원본 객체를 새로운 객체에 복사하여 필요에 따라 수정하는 메커니즘을 제공**합니다.

### 문제

객체가 있고, 객체의 정확한 복사본을 만들고 싶다고 생각해보죠. 일반적으로 동일한 클래스의 새 객체를 생성하고, 원본 객체의 필드를 살펴본 후 해당 값을 새 객체에 복사할 수 있습니다. 하지만 객체의 필드 중 일부가 비공개이고, 객체의 외부에서 접근할 수 없기 때문에 모든 객체를 위의 방식으로 복사할 수는 없습니다.

한 가지 문제가 더 있다면, 객체의 클래스를 알아야 하므로 코드가 해당 클래스에 의존하게 됩니다. 거기다가 연관된 문제로, 예를 들어 메서드의 매개 변수가 일부 인터페이스를 따르는 객체를 받는다면 객체의 인터페이스는 알아도, 객체의 클래스는 알 수 없습니다.

### 해결책

프로토타입 패턴은 복제되는 실사 객체에 복사 작업을 위임합니다. 이 작업을 위해 모든 객체에 대한 공통 인터페이스가 필요하며, 이를 통해 코드를 해당 객체의 클래스에 연결하지 않고 객체를 복사할 수 있습니다. 일반적으로 이러한 인터페이스에는 단일 `clone` 메서드만 포함됩니다.

`clone` 메서드의 구현은 모든 클래스에서 비슷합니다. 이 메서드는 현재 클래스의 객체를 만들고 이전 객체의 모든 필드 값을 새 객체로 전달합니다. 대부분의 프로그래밍 언어는 객체가 동일한 클래스에 속한 다른 객체의 필드에 접근할 수 있도록 하기 때문에 필드를 복사할 수도 있습니다.

이러한 복사를 지원하는 객체를 프로토타입이라고 하며, 객체가 수십 개의 필드와 수백 개의 설정을 가질 정도로 크다면 하위 클래스를 만드는 것의 대안이 될 수 있습니다.

각각의 방식으로 설정된 몇 객체들을 생성했고 이미 구성한 것과 같은 객체가 필요할 때, 새 객체를 생성하는 대신 프로토타입을 복사하기만 하면 됩니다.

## 프로토타입 패턴의 구조

### 기본 구현

![https://refactoring.guru/images/patterns/diagrams/prototype/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/prototype/structure-indexed-2x.png)

[출처: [https://refactoring.guru/images/patterns/diagrams/prototype/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/prototype/structure-indexed-2x.png)]

- **Prototype**: 프로토타입 인터페이스에 복사 메서드를 선언합니다. 대부분 `clone`이란 메서드 하나를 선언합니다.
- **Concrete Prototype**: 인터페이스에서 선언한 복사 메서드를 구현합니다. 원본 객체의 데이터를 복사하는 것 외에도, 이 메서드는 연결된 객체의 복사, 재귀 의존성 풀기 등과 관련된 복제 프로세스의 일부 경계 조건을 다룰 수도 잇습니다.
- **Client**: 프로토타입 인터페이스를 따르는 모든 객체의 복사본을 생성할 수 있습니다.

### 프로토타입 저장소 구현

![https://refactoring.guru/images/patterns/diagrams/prototype/structure-prototype-cache-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/prototype/structure-prototype-cache-indexed-2x.png)

[출처 :[https://refactoring.guru/images/patterns/diagrams/prototype/structure-prototype-cache-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/prototype/structure-prototype-cache-indexed-2x.png)]

- **Prototype Registry**: 자주 사용하는 프로토타입에 쉽게 접근할 수 있는 방법을 제공합니다. 여기에는 복사할 준비가 된 미리 생성된 객체들을 저장합니다.

## 예시 코드

```ts
class Prototype {
  public primitive: any;
  public component: object | undefined;
  public circularReference: ComponentWithBackReference | undefined;

  clone(): this {
    // const clone = Object.assign({}, this)
    const clone = Object.create(this);

    // clone.component = Object.assign({}, this.component)
    clone.component = Object.create(this.component!);
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  constructor(public prototype: Prototype) {}
}

function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();

  if (p1.primitive === p2.primitive) {
    console.log("원시값의 필드가 복사본으로 이동되었습니다. 야호!");
  } else {
    console.log("원시 값의 필드가 복사되지 않았습니다. 이런...");
  }

  if (p1.component === p2.component) {
    console.log("간단한 컴포넌트가 복사되지 않았습니다. 이런...");
  } else {
    console.log("간단한 컴포넌트가 복사되었습니다. 야호!");
  }

  if (p1.circularReference === p2.circularReference) {
    console.log(
      "역참조(back reference)가 있는 컴포넌트가 복제되지 않았습니다. 이런..."
    );
  } else {
    console.log(
      "역참조(back reference)를 가진 컴포넌트가 복사되었습니다. 야호!"
    );
  }

  if (p1.circularReference.prototype === p2.circularReference?.prototype) {
    console.log(
      "역참조를 가진 컴포넌트가 본래의 객체와 연결되어 있습니다. 이런..."
    );
  } else {
    console.log(
      "역참조를 가진 컴포넌트가 복사된 객체와 연결되어 있습니다. 야호!"
    );
  }
}

clientCode();

// 원시값의 필드가 복사본으로 이동되었습니다. 야호!
// 간단한 컴포넌트가 복사되었습니다. 야호!
// 역참조(back reference)를 가진 컴포넌트가 복사되었습니다. 야호!
// 역참조를 가진 컴포넌트가 복사된 객체와 연결되어 있습니다. 야호!
```

- [다른 예시 보기](./customer.ts)

## 언제 사용해야할까?

- 객체를 생성하는데 비용이 많이 들고, 비슷한 객체가 이미 있는 경우
- 코드가 객체 클래스에 의존하지 않아야 하는 경우
- 각각의 객체를 초기화하는 방식만 다른 하위 클래스의 줄이려는 경우

## 구현 방법

1. 프로토타입 인터페이스를 만들고 그 안에 `clone` 메서드를 선언합니다. 또는 기존 클래스 계층 구조의 모든 클래스에 `clone` 메서드를 추가합니다.
2. 프로토타입 클래스는 해당 클래스의 객체를 인자로 받아들이는 대체 생성자를 정의해야 합니다. 생성자는 클래스로 전달받은 객체에 정의된 모든 필드의 값을 새로 생성된 인스턴스로 복사해야 합니다.
   프로그래밍 언어가 메서드 오버로딩을 지원하지 않는다면, 별도의 프로토타입 생성자를 만들 수 없습니다. 따라서 객체의 데이터를 새로 생성된 클론에 복사하는 작업은 `clone` 메서드 내에서 수행되어야 합니다.
3. `clone` 메서드는 일반적으로 생성자의 프로토타입 버전으로 `new` 연산자를 실행하는 한 줄로 구성됩니다. 모든 클래스는 `clone` 메서드를 명시적으로 재정의하고 `new` 연산자와 함께 자체 클래스 이름을 사용해야 합니다. 그렇지 않으면 부모 클래스의 객체를 생성하게 됩니다.
4. 선택적으로, 자주 사용하는 프로토타입의 목록을 저장할 중앙 프로토타입 저장소를 사용하는 것도 좋습니다.

## 장점과 단점

### 장점

- 복사하려는 객체의 클래스를 몰라도 객체를 복사할 수 있습니다.
- 미리 생성된 프로토타입을 복사함으로 반복되는 초기화 코드를 제거할 수 있스빈다.
- 복잡한 객체를 좀 더 편리하게 생성할 수 있습니다.

### 단점

- 순환 참조가 있는 복잡한 객체를 복사하는 것은 매우 까다로울 수 있습니다.

## 다른 패턴과의 관계

- 많은 소프트웨어 설계가 [팩토리 메서드](../FactoryMethod/)(덜 복잡하고 하위 클래스를 통해 사용자 정의가 가능)를 사용하기 시작해서 [추상 팩토리](../AbstractFactory/), [프로토타입](../Prototype/) 또는 [빌더](../Builder/)(더 유연하지만 복잡함)로 발전합니다.
- [추상 팩토리 클래스](../AbstractFactory/)는 [팩토리 메서드](../FactoryMethod/)를 기반으로 하지만, [프로토타입](../Prototype/)을 사용해서 구성할 수도 있습니다.
- [프로토타입](../Prototype/)은 명령 패턴의 복사를 기록하려고 할 때 도움이 될 수 있습니다.
- 컴포지트 및 데코레이터 패턴을 많이 사용하는 설계의 경우 [프로토타입](../Prototype/)을 사용하여 이점을 얻을 수도 있습니다. 프로토타입 패턴을 적용하면 복잡한 구조를 처음부터 다시 구성하는 대신 복사할 수 있기 때문입니다.
- [프로토타입](../AbstractFactory/) 패턴은 상속을 기반으로 하지 않지만, 복제된 객체의 복잡한 초기화를 필요로 합니다. [팩토리 메서드](../FactoryMethod/) 패턴은 상속을 기반으로 하지만, 초기화 단계가 필요하지 않습니다.
- 때때로 [프로토타입](../Prototype/) 패턴은 메멘토 패턴의 간단한 대안이 될 수 있습니다.
- [추상 팩토리 클래스](../AbstractFactory/), [빌더](../Builder/) 및 [프로토타입](../Prototype/) 패턴은 모두 싱글톤 패턴으로 구현될 수 있습니다.
