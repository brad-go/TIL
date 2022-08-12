/**
 * 이 예제에서 플라이웨이트 패턴은 캔버스에서 수백만의 트리 객체를
 * 렌더링할 때 메모리 사용을 줄이는데 도움을 줍니다.
 *
 * 메인 Tree 클래스에서 반복되는 고유한 상태(intrinsic)를 추출하고
 * TreeType이라는 플라이웨이트 클래스로 이동시킵니다.
 *
 * 이제 다수의 객체에서 동일한 데이터를 저장하는 대신에, 그저 몇 개의
 * 플라이웨이트 객체를 가지고 컨텍스트 역할을 하는 적절한 Tree 객체에 연결합니다.
 * 클라이언트 코드는 검색 기준에 맞춰 올바른 객체를 찾고 필요한 경우 재사용하는 복잡성을
 * 캡슐화하는 플라이웨이트 팩토리를 사용해서 새로운 트리 객체를 생성합니다.
 */

/**
 * 플라이웨이트 클래스는 트리 상태의 일부를 포함합니다. 이 필드는 각각의 트리에
 * 대해 고유한 값을 저장합니다. 예를 들어 여기에서 트리 객체의 좌표를 찾을 수 없지만, 많은
 * 트리 객체 사이에서 공유되는 질감과 색상을 가집니다. 이 데이터는 일반적으로 크기 때문에
 * 각 트리 객체에 보관하면 많은 메모리를 낭비하게 됩니다. 대신 질감, 색상 및 기타 반복
 * 데이터를 많은 개별 트리 객체가 참조할 수 있는 별도의 객체로 추출할 수 있습니다.
 */
class TreeType {
  constructor(
    public name: string,
    public color: string,
    public texture: string
  ) {}

  draw(canvas: HTMLCanvasElement, x: number, y: number): void {
    // 1. 주어진 타입, 색상과 질감으로 비트맵을 생성합니다.
    // 2. 캔버스의 x, y 좌표 위에 비트맵을 그립니다.
  }
}

/**
 * 플라이웨이트 팩토리는 플라이웨이트를 재사용할지 새 객체를 생성할지를 결정합니다.
 */
class TreeFactory {
  static treeTypes: TreeType[];
  static getTreeType(name: string, color: string, texture: string) {
    let type: TreeType | undefined = TreeFactory.treeTypes.find(
      (treeType) =>
        treeType.name === name &&
        treeType.color === color &&
        treeType.texture === texture
    );

    if (type === undefined) {
      type = new TreeType(name, color, texture);
      this.treeTypes.push(type);
    }

    return type;
  }
}

/**
 * 컨텍스트 객체는 트리의 외부 상태를 포함합니다. 어플리케이션은 두 개의
 * 정수 좌표와 하나의 참조 필드 등 매우 작기 때문에 수십억 객의 이 객체를
 * 생성할 수 있습니다.
 */
class Tree {
  constructor(private x: number, private y: number, private type: TreeType) {}

  draw(canvas: HTMLCanvasElement) {
    this.type.draw(canvas, this.x, this.y);
  }
}

/**
 * 트리와 나무 포레스트 클래스는 플라이웨이트의 클라이언트입니다.
 * 트리 클래스를 더 개발할 계획이 없다면 이들을 합칠 수 있습니다.
 */
class Forest {
  private trees: Tree[];

  plantTree(
    x: number,
    y: number,
    name: string,
    color: string,
    texture: string
  ) {
    const type: TreeType = TreeFactory.getTreeType(name, color, texture);
    const tree: Tree = new Tree(x, y, type);
    this.trees.push(tree);
  }

  draw(canvas: HTMLCanvasElement) {
    this.trees.forEach((tree) => tree.draw(canvas));
  }
}
