interface PersonPrototype {
  clone(): Person;
}

class Person implements PersonPrototype {
  public name: string | undefined;
  public age: number | undefined;
  public hobby: string | undefined;

  clone(): this {
    // const clone = Object.assign({}, this); - 이건 클래스 자체가 아닌 객체를 복사함
    const clone = Object.create(this);

    clone.name = this.name;
    clone.age = this.age;
    clone.hobby = this.hobby;

    return clone;
  }
}

function clonePerson() {
  const john: Person = new Person();
  john.name = "john";
  john.age = 30;
  john.hobby = "programming";

  const jane = john.clone();
  jane.name = "jane";
  jane.hobby = "drawing";

  console.log(john);
  console.log(jane);
}

clonePerson();
