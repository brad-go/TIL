/**
 * 컴포지트 패턴을 사용하면 그래픽 편집기에서 기하학적 모양의 스택을 구현할 수 있습니다.
 *
 * CompoundGraphic 클래스는 다른 합쳐진 모양들을 포함한 여러 하위 모양을 포함할 수 있는
 * 컨테이너 입니다. 합쳐진 모양은 단순한 모양과 같은 메서드를 가집니다. 그러나 자체적으로
 * 수행하는 대신 합쳐진 모양은 요청을 재귀적으로 그들의 자식에게 전달하고 결과를 요약합니다.
 *
 * 클라이언트 코드는 모든 모양 클래스에 대한 단일 인터페이스를 통해 모든 모양과 작업할 수 있습니다.
 * 그러므로 클라이언트는 단순하거나 복잡한 모양에 대해 알 필요가 없습니다. 클라이언트는 해당 구조를
 * 형성하는 매우 구체적인 클래스들과 결합되지 않고도 복잡한 객체 구조를 사용할 수 있습니다.
 */

/**
 * 컴포넌트 인터페이스는 단순하거나 복잡한 합성 객체를 위한 동작을 선언합니다.
 */
interface Graphic {
  move(x: number, y: number): void;
  draw(): void;
}

/**
 * 리프 클래스는 합성 객체의 마지막을 나타냅니다. 리프 객체는 어떠한 하위 객체도
 * 가질 수 없습니다. 대개 실제 작업을 수행하는 것은 리프 객체이지만, 합성 객체는
 * 그들의 하위 구성요소들에게 작업을 위임합니다.
 */
class Dot implements Graphic {
  constructor(private x: number, private y: number) {}

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  draw() {
    // X, Y에 점을 그린다.
  }
}

/**
 * 모든 구성요소 클래스들은 다른 구성 요소를 확장할 수 있습니다.
 */
class Circle extends Dot {
  constructor(x: number, y: number, private radius: number) {
    super(x, y);
  }

  draw(): void {
    // X, Y 점에 반지름 R을 갖는 원을 그린다.
  }
}

/**
 * 합성 클래스는 자식들을 가질 수 있는 복잡한 요소를 뜻합니다. 복잡한
 * 객체들은 대개 그들의 작업을 그들의 자식들에게 위임하고 결과를 요약합니다.
 */
class CompoundGraphic implements Graphic {
  private children: Graphic[] = [];

  /**
   * 복잡한 객체는 그들의 자식 리스트에 단순하거나 복잡한 구성 요소를
   * 추가하거나 제거할 수 있습니다.
   */
  add(child: Graphic): void {
    this.children.push(child);
  }

  remove(child: Graphic): void {
    this.children = this.children.filter((graphic) => graphic !== child);
  }

  move(x: number, y: number) {
    this.children.forEach((child) => child.move(x, y));
  }

  /**
   * 합성 객체는 특정한 방법으로 그들의 주요 로직을 실행합니다. 그들의 자식들을
   * 재귀적으로 순회하면서 그들의 결과 수집하고 압축해서 보여줍니다. 합성 객체의
   * 자식들의 이 호출을 그들의 자식들에게도 그대로 전달하기 때문에 결과적으로
   * 전체 객체 트리를 순회하게 됩니다.
   */
  draw() {
    this.children.forEach((child) => child.draw());
  }
}

/**
 * 클라이언트 코드는 인터페이스를 통해 모든 컴포넌트들과 함께 작업을 수행하빈다.
 * 이 방법은 클라이언트 코드가 단순 리프 요소 부터 복잡한 합성 요소까지 다룰 수 있게 합니다.
 */
class ImageEditor {
  private all!: CompoundGraphic;

  load() {
    this.all = new CompoundGraphic();
    this.all.add(new Dot(1, 2));
    this.all.add(new Circle(5, 3, 10));
    // ...
  }

  /**
   * 선택된 구성 요소들을 복잡한 합성 요소로 결합합니다.
   */
  groupSelected(components: Graphic[]) {
    const group = new CompoundGraphic();

    components.forEach((component) => {
      group.add(component);
      this.all.remove(component);
    });

    this.all.add(group);
    // 모든 컴포넌트가 그려집니다.
    this.all.draw();
  }
}
