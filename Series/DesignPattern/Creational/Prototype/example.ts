class Prototype {
  public primitive: any;
  public component: object | undefined;
  public circularReference: ComponentWithBackReference | undefined;

  clone(): this {
    // const clone = Object.assign({}, this)와 같은 역할;
    const clone = Object.create(this);

    // clone.component = Object.assign({}, this.component)와 같은 역할;
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
