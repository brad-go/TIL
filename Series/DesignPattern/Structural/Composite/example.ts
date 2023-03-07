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
