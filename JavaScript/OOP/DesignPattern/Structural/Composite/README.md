# 컴포지트 패턴(Composite Pattern)

## 컴포지트 패턴이란?

컴포지트 패턴은 객체 트리 패턴으로도 알려져 있으며, **객체를 트리 구조로 구성하여 전체-부분 계층을 표현하며, 이 구조를 개별 객체인 것처럼 사용할 수 있게 해주는 구조적 디자인 패턴**입니다.

컴포지트 패턴은 여러 개의 **객체들로 구성된 복합 객체와 단일 객체를 클라이언트에서 구별 없이 다루게 해줍니다. 전체-부분(예: 디렉토리-파일)의 관계를 갖는 객체들 사이의 관계를 정의할 때 유용**합니다. 또한 클라이언트가 전체와 부분을 구분하지 않고, 동일한 인터페이스를 사용할 수 있게 해줍니다.

컴포지트 패턴은 트리 구조를 구축해야 하는 대부분의 문제에 대해 인기 있는 솔루션입니다. 컴포지트 패턴에는 전체 트리 구조에 대해 재귀적으로 메서드를 실행하고 결과를 요약하는 뛰어난 기능이 있습니다. 타입스크립트에서 UI 구성 요소의 계층 구조나 그래프와 함께 동작하는 코드를 나타내는데 자주 사용됩니다.

### 문제

컴포지트 패턴을 사용하는 것은 앱의 핵심 모델을 트리로 나타낼 수 있는 경우에만 가능합니다.

예를 들어, 두 가지 타입의 객체 `Products` 및 `Boxes`가 있다고 가정합니다. `Box`에는 `Products`들이나 더 작은 `Boxes`들을 담을 수 있습니다. 이 작은 `Boxes`들에는 `Products`들을 담거나 더 작은 `Boxes`들을 담을 수 있습니다.

이러한 클래스를 사용하는 주문 시스템을 만들기로 결정했다고 생각해보죠. 주문에는 포장이 없는 단순한 제품과 제품으로 채워진 상자 및 기타 상자가 포함될 수 있습니다. 이러한 주문은 더 큰 상자에 포함된 다양한 제품으로 구성될 수 있습니다. 전체 구조는 거꾸로 된 나무처럼 보이게 됩니다. 그렇다면 주문의 총 가격을 어떻게 결정할까요?

모든 상자의 포장을 풀고 모든 제품을 살펴본 다음 총 가격을 계산하는 직접 접근 방식을 사용할 수 있습니다. 현실에서는 쉽게 가능하지만, 프로그램에서는 생각보다 간단하지 않습니다. 이러한 방식을 사용하려면 Products들과 Boxes들의 클래스들을 뿐만 아니라 중첩 수준 및 기타 세부 사항들도 미리 알아야 한다는 문제가 있습니다.

### 해결책

컴포지트 패턴은 총 가격을 계산하는 방법을 선언하는 공통 인터페이스를 통해 `Products` 및 `Boxes`를 다루는 방식으로 문제를 해결합니다.

이 메서드가 어떻게 동작할 수 있을까요? 제품에 있어서는 간단히 그 제품의 가격만을 반환하면 됩니다. 박스에 있어서는 박스가 가지고 있는 각 물건들을 조사해서 그것의 가격을 묻고 이 박스에 대한 전총 가격을 반환하면 됩니다. 만약 물건들 중 더 작은 박스가 있다면 가격이 반환될 때까지 위 과정을 반복하면 됩니다. 거기다가 최종 가격에 포장 비용과 같은 추가 비용을 추가할 수도 있습니다.

즉, **컴포지트 패턴을 사용하면 객체 트리의 모든 구성 요소에 대해 재귀적으로 동작을 실행할 수 있습니다**. 이 접근 방식의 가장 큰 이점은 트리를 구성하는 구체적인 객체 클래스에 대해 신경 쓸 필요가 없다는 것입니다. 물건이 단순한 제품인지 정교한 상자인지 알 필요가 없습니다. 공통 인터페이스를 통해 모두 동일하게 처리할 수 있습니다. 메서드를 호출하면 객체 자체가 요청을 트리 아래로 전달합니다.

## 구조

![https://refactoring.guru/images/patterns/diagrams/composite/structure-en-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/composite/structure-en-indexed-2x.png)

[출처: [https://refactoring.guru/images/patterns/diagrams/composite/structure-en-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/composite/structure-en-indexed-2x.png)]

1. Component: 컴포넌트 인터페이스는 트리의 단순 요소와 복잡한 요소 모두에 공통적인 메서드를 선언합니다.
2. Leaf: 리프는 하위 요소가 없는 트리의 기본 요소를 뜻합니다. 트리의 마지막 노드로 볼 수 있는 리프 구성 요소는 작업을 위임할 사람이 없기 때문에 대부분의 실제 작업을 수행하게 됩니다.
3. Container(Composite): 컨테이너는 하위 요소(Leaf 또는 기타 컨테이너)가 있는 요소입니다. 컨테이너는 자식의 구체적인 클래스를 알지 못합니다. 컴포넌트 인터페이스를 통해서만 모든 하위 요소와 함께 동작합니다.
   요청을 받으면 컨테이너는 작업을 하위 요소에게 위임하고 중간 결과를 처리한 다음, 최종 결과를 클라이언트에 반환합니다.
4. Client: 클라이언트는 컴포넌트 인터페이스를 통해 모든 요소와 함께 동작합니다. 결과적으로 클라이언트는 트리의 단순하거나 복잡한 모든 요소에 대해 동일한 방식으로 사용할 수 있습니다.

## 예시 코드

```tsx
/**
 * 최상위 컴포넌트 클래스에는 단순 요소나 복잡한 요소에 대해 공통 작업을 선언합니다.
 */
abstract class Component {
  protected parent!: Component | null;

  /**
   * 추가적으로 기본 컴포넌트는 트리 구조에서 컴포넌트의 부모 요소에 접근하기 위한
   * 인터페이스를 선언할 수 있습니다. 또한 이러한 메서드에 대한 몇 가지 기본 구현을
   * 제공할 수도 있습니다.
   */
  getParent(): Component | null {
    return this.parent;
  }

  setParent(parent: Component | null) {
    this.parent = parent;
  }

  /**
   * 몇몇 경우에 상위 컴포넌트 클래스에 자식 요소를 관리하는 작업을 정의하는 것이 좋을
   * 수도 있습니다. 이 방법을 통해 트리르 조립 중에도 여느 구체적인 컴포넌트 클래스를
   * 클라이언트 코드에 노출시킬 필요가 없어집니다. 단점은 리프 수준의 구성 요소에는
   * 이 메서드가 비게 되어 인터페이스 분리의 원칙을 위반하게 되는 것입니다.
   */
  add(component: Component): void {}
  remove(component: Component): void {}

  /**
   * 클라이언트 코드가 구성 요소가 자식을 가질 수 있는 지 여부를 확인하는 메서드를
   * 제공할 수 있습니다.
   */
  isComposite(): boolean {
    return false;
  }

  /**
   * 상위 컴포넌트에서 기본 행위를 구현하거나 구체 클래스에게 구현을 남길 수 있습니다.
   */
  abstract operation(): string;
}

/**
 * 리프 클래스는 합성 객체의 마지막 객체를 나타냅니다. 리프는 자식을 가질 수 없습니다.
 *
 * 대개 리프 객체들이 실제 작업을 수행하는 반면 합성 객체들은 그들의 하위 컴포넌트들에게
 * 작업을 위임하빈다.
 */
class Leaf extends Component {
  public operation(): string {
    return "Leaf";
  }
}

/**
 * 컴포지트 클래스는 자식을 가진 복잡한 구성 요소를 나타냅니다.
 * 대개 합성 객체들은 자식들에게 작업을 위임하고 그들의 결과를 요약합니다.
 */
class Composite extends Component {
  protected children: Component[] = [];

  /**
   * 합성 객체는 그들의 자식 리스트에 다른 구성 요소들(단순하거나 복잡한)을
   * 추가하거나 삭제할 수 있습니다.
   */
  add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  isComposite(): boolean {
    return true;
  }

  /**
   * 컴포지트는 특정한 방법으로 그들의 주요 로직을 실행합니다. 그들의 모든 자식들을
   * 재귀적으로 순회하면서 그들의 결과를 수집하고 요약합니다. 컴포지트의 자식 요소들이
   * 이 호출을 그들의 자식 요소들에게도 전달하기 때문에, 결과적으로 모든 객체 트리를
   * 순회할 수 있습니다.
   */
  operation(): string {
    const results: string[] = [];
    this.children.forEach((child) => results.push(child.operation()));

    return `Branch(${results.join("+")})`;
  }
}

/**
 * 클라이언트 코드는 공통 인터페이스를 통해 모든 컴포넌트와 함께 작업을 수행합니다.
 */
function clientCode(component: Component) {
  console.log(`RESULT: ${component.operation()}`);
}

/**
 * 이러한 방식으로 클라이언트 코드는 단순한 리프 및 복잡한 합성 구성 요소를 사용할 수 있습니다.
 */
const simple = new Leaf();
console.log("Client: I've got a simple component: ");
clientCode(simple);

const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());

const branch2 = new Composite();
branch2.add(new Leaf());

const tree = new Composite();
tree.add(new Leaf());
tree.add(branch1);
tree.add(branch2);

console.log("Client: Now I've got a composite tree: ");
clientCode(tree);
console.log("");

/**
 * 자식 관리 동작이 상위 컴포넌트 클래스에서 선언되었으므로, 클라이언트 코드는
 * 구체적인 클래스에 의존하지 않고 단순 및 복잡 구성 요소의 사용이 가능합니다.
 */
function clientCode2(component1: Component, component2: Component) {
  if (component1.isComposite()) {
    component1.add(component2);
  }
  console.log(`RESULT: ${component1.operation()}`);
}

console.log(
  "Client: I don't need to check the comonents classes even when managing the tree"
);
clientCode2(tree, simple);

// Client: I've got a simple component:
// RESULT: Leaf

// Client: Now I've got a composite tree:
// RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf))

// Client: I don't need to check the components classes even when managing the tree:
// RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf)+Leaf)
```

- [다른 예시 1](./graphic.ts)
- [다른 예시 2](./army-interface.ts)
- [다른 예시 3](./army-abstract-class.ts)
- [다른 예시 4](./composite.ts)

## 언제 사용해야할까?

- **트리와 같은 객체 구조를 구현해야 하는 경우** 컴포지트 패턴을 사용합니다. 컴포지트 패턴은 공통 인터페이스를 공유하는 두 기본 요소 타입 단순한 리프와 복잡한 컨테이너를 제공합니다. 컨테이너는 리프나 다른 컨테이너들로 구성될 수 있습니다. 이를 통해 트리와 닮은 중첩된 재귀적인 객체 구조를 생성할 수 있습니다.
- **클라이언트 코드가 단순한 요소와 복잡한 요소를 모두 균일하게 다루게 해야 하는 경우** 컴포지트 패턴을 사용합니다. 컴포지트 패턴에 의해 정의된 모든 요소는 공통 인터페이스를 공유하기 때문에 구체적인 클래스를 알 필요가 없습니다.

## 구현 방법

1. 앱의 핵심 모델이 트리 구조로 표현될 수 있는지 확인하고 간단한 요소와 컨테이너로 분해합니다. 컨테이너는 단순 요소와 다른 컨테이너를 모두 포함할 수 있어야 합니다.
2. 단순 구성 요소와 복합 구성 요소 모두에 적합한 메서드 목록을 사용하여 컴포넌트(구성 요소) 인터페이스를 선언합니다.
3. 간단한 요소를 나타내는 리프 클래스를 만듭니다. 프로그램에는 여러 개의 서로 다른 리프 클래스가 있을 수 있습니다.
4. 복잡한 요소를 나타내는 컨테이너 클래스를 만듭니다. 이 클래스에서 하위 요소에 대한 참조를 저장하기 위한 배열 필드를 제공합니다. 배열은 잎과 컨테이너를 모두 저장할 수 있어야 하므로 컴포넌트 인터페이스 타입으로 선언되었는지 확인합니다.
   컴포넌트 인터페이스의 메서드를 구현하는 동안 컨테이너는 대부분의 작업을 하위 요소에 위임해야 한다는 점을 잊지 말아야 합니다.
5. 마지막으로 컨테이너에서 자식 요소를 추가 및 제거하는 방법을 정의합니다. 이 작업을 컴포넌트 인터페이스 선언할 수 있지만, 이는 리프 클래스에서 메서드가 비어있기 때문에 인터페이스 분리의 원칙을 위반합니다. 그러나 클라이언트는 트리를 구성할 때에도 모든 요소를 동등하게 처리할 수 있습니다.

## 장점과 단점

### 장점

- 복잡한 트리 구조에서 다형성과 재귀적인 이점을 통해 더 편하게 작업할 수 있습니다.
- 객체 트리를 통해 작업하면서 기존 코드의 변경 없이 새로운 타입의 요소를 추가할 수 있으므로 개방 폐쇄의 원칙을 지킵니다.

### 단점

- 기능적으로 너무 다른 클래스들이라면 공통 인터페이스를 정의하기 어려울 수 있습니다. 최악의 경우 컴포넌트 인터페이스를 과도하게 일반화하여 이해하기 어렵게 만들어야 합니다.

## 다른 패턴과의 관계

- 재귀적으로 작동하도록 구성 단계를 프로그래밍할 수 있으므로, 복잡한 [컴포지트](../Composite/) 트리를 만들 때 [빌더](../../Creational/Builder/) 패턴을 사용할 수 있습니다.
- 책임연쇄 패턴은 종종 [컴포지트](../Composite/) 패턴과 결합되어 사용됩니다. 이 경우에 리프 컴포넌트가 요청을 받으면 모든 상위 구성 요소들의 체인을 통해 루트까지 전달될 수 있습니다.
- Iterator를 사용하여 [컴포지트](../Composite/) 트리를 순회할 수 있습니다.
- 전체 [컴포지트](../Composite/) 트리에 대해 작업을 실행하기 위해 방문자 패턴을 사용할 수 있습니다.
- [컴포지트](../Composite/) 트리의 공유 리프 노드를 플라이웨이트 패턴으로 구현하여 RAM을 절약할 수 있습니다.
- [컴포지트](../Composite/) 패턴와 데코레이터 패턴은 끝이 정해지지 않은(open-ended) 객체를 조직화하기 위해 재귀적인 구성에 의존하기 때문에 비슷한 구조를 가집니다.
  - 데코레이터 패턴은 컴포지트 패턴과 비슷하지만 하위 구성 요소를 하나만 가집니다.
  - 데코레이터 패턴은 감싸진 객체에 추가적인 책임을 추가하는 반면, 컴포지트 패턴은 자식들의 결과를 요약합니다.
  - 그러나 이 두 패턴을 합칠 수 있습니다. 데코레이터 패턴을 사용해서 컴포지트 트리에서 특정 객체의 동작을 확장할 수 있습니다.
- [컴포지트](../Composite/) 및 데코레이터 패턴을 많이 사용하는 설계의 경우 [프로토타입](../../Creational/Prototype/)을 사용하여 이점을 얻을 수도 있습니다. 프로토타입 패턴을 적용하면 복잡한 구조를 처음부터 다시 구성하는 대신 복사할 수 있기 때문입니다.
