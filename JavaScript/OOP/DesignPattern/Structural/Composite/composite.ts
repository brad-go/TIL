// 리프 클래스와 컴포지트 클래스의 분리가 되어 있지 않음. 좋은 예시인지 모르겠음

export interface Component<T> {
  children: Component<T>[];
  name: string;
  props: T | undefined;

  addChild(...components: Component<T>[]): boolean;
  traverse(callbackfn: (component: Component<T>) => void): void;
}

export class CompositeComponent<T> implements Component<T> {
  children: Component<T>[];
  name: string;
  props: T | undefined;

  constructor(name: string, props?: T) {
    this.children = [];
    this.name = name;
    this.props = props;
  }

  addChild(...components: Component<T>[]): boolean {
    components.forEach((component) => this.children.push(component));
    return true;
  }

  traverse(callbackfn: (component: Component<T>) => void): void {
    if (this.children.length > 0) {
      this.children.forEach((child) => child.traverse(callbackfn));
    }
    callbackfn(this);
  }
}

// Test

interface HouseComponent {
  color: string;
}

const myHouse: CompositeComponent<HouseComponent> = new CompositeComponent("My house"); // prettier-ignore
const myBedroom: CompositeComponent<HouseComponent> = new CompositeComponent("My bedroom"); // prettier-ignore
const myLivingroom: CompositeComponent<HouseComponent> = new CompositeComponent("My livingroom"); // prettier-ignore

myHouse.addChild(myBedroom);
console.log(myHouse.children[0].name); // My bedroom
console.log("");

myBedroom.addChild(new CompositeComponent("My bed", { color: "white" }));
myLivingroom.addChild(new CompositeComponent("My sofa", { color: "red" }));
myHouse.addChild(myLivingroom);

const names: string[] = [];

myHouse.traverse((current: CompositeComponent<HouseComponent>) => {
  names.push([current.name, current.props?.color].join(" ").trim());
});

console.log(names.reverse()); // ["My house", "My livingroom", "My sofa red", "My bedroom", "My bed white"];
