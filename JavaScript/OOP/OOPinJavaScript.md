# 자바스크립트와 객체지향 프로그래밍

프로그래밍을 하다보면 필연적으로 객체지향 프로그래밍에 대해서 듣게 될 것입니다. 자바나 C++ 등이 대표적으로 객체지향 프로그래밍을 지원하는 언어이죠. 그러나 객체지향 프로그래밍이 어떤 것인지 이해하기는 쉽지 않습니다. 단순히 객체를 만들고 그것을 사용하기만 한다고 객체 지향 프로그래밍이 아니니까요.

자바스크립트도 물론 객체지향 프로그래밍을 지원합니다. 그러나 일반적인 객체지향과는 약간의 차이가 있습니다. 자바스크립트의 객체지향 프로그래밍이란 뭘까요? 이번 글을 통해서 객체지향 프로그래밍에 대해서 알아보도록 하겠습니다.

## 목차

1. [객체 지향 프로그래밍](#1-객체-지향-프로그래밍object-oriented-programming)
2. [객체 지향의 프로그래밍의 핵심 개념](#2-객체지향-프로그래밍의-핵심-개념)
3. [자바스크립의 객체 지향 프로그래밍](#3-자바스크립트의-객체-지향-프로그래밍)

## 1. 객체 지향 프로그래밍(Object Oriented Programming)

객체 지향 프로그래밍이란 프로그램을 단순히 데이터와 처리 방법으로 나눈 것이 아니라, **프로그램을 수많은 ‘객체(object)’라는 기본 단위로 나누고, 이들의 상호작용으로 서술하는 방식**입니다. 객체란 하나의 역할을 수행하는 메서드와 변수의 묶음으로 봐야합니다.

### 1.1 절차적 프로그래밍

초기 프로그래밍 방식은 [절차적 프로그래밍](https://namu.wiki/w/%EC%A0%88%EC%B0%A8%EC%A0%81%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D) 방식이었습니다. **절차적 프로그래밍이란 단순히 순차적인 명령 수행이 아니라 루틴, 서브 루틴, 메서드, 함수 등(이를 통틀어 프로시저라고 함)을 이용한 프로그래밍 패러다임**을 뜻합니다.

이름 때문에 **절차적으로 실행하는 것**이 중점이 되는 것처럼 보이지만, 여기서의 **절차는 프로시저(함수)를 의미**합니다. 즉, 이 패러다임에서는 **함수 호출을 통해서 추상화와 재사용성을 얻어내는 것이 본질**입니다.

즉, 절차적 프로그래밍은 데이터와 데이터를 처리하는 동작을 **함수 단위로 코드를 분리하고 재사용하는 형태로 프로그래밍을 하는 방식**이 됩니다. 이는 우리에게 아주 익숙한 방식으로, 대개 간단한 코드들을 작성할 때는 이러한 방식으로 프로그래밍을 합니다.

그러나 절차적 프로그래밍은 간단한 알고리즘이면 모를까 조금만 복잡해지면 유지보수에 어려움을 겪기 쉬웠고, 코드의 흐름을 파악하기도 힘들며, 중복 코드의 대처도 쉽지 않았습니다. 또, 전역 네임스페이스의 포화(변수 이름을 이미 다 지어서 짓기도 힘든 상황) 문제도 발생했습니다.

이러한 문제들을 지역 변수나 [구조체(struct)](https://namu.wiki/w/%EA%B5%AC%EC%A1%B0%EC%B2%B4) 등으로 힘들게 제어하고 있지만 근본적인 해결책이 필요했습니다.

<details><summary><b>절차적 프로그래밍 vs 객체지향 프로그래밍</b></summary><div markdown="1">

: 객체지향 프로그래밍이 절차적 프로그래밍의 반대 개념처럼 생각될 수 있습니다. 그러나 둘다 명령형 프로그래밍의 하위 개념이고, **절차적 프로그래밍의 관점이 프로시저에서 객체로 확장된 것**이 객체지향 프로그래밍에 가깝습니다.

</div></details>

<details><summary><b>절차적 프로그래밍 vs 함수형 프로그래밍</b></summary><div markdown="1">

: 절차적 프로그래밍에서 절차의 의미가 함수라고 했습니다. 그렇다면 함수형 프로그래밍과 차이가 무엇이냐는 생각을 가질 수 있습니다. 그러나 **함수형 프로그래밍**의 관점은 **순수 함수와 일급 객체인 함수**에 관심이 있는 것이고, **절차적 프로그래밍**은 **함수(+ 이를 관리하는 모듈)에 의한 재사용성**에 초점을 둔 것이기에 두 개념은 차이가 있습니다.

</div></details><br />

[⬆ Back to top](#목차)

### 1.2 객체지향 프로그래밍의 등장

구조체가 생기면서 산재해 있는 데이터들을 의미있는 데이터로 구조화 시켜서 프로그래밍을 하니, **동작보다는 데이터를 중심으로 코드를 작성하게 되면 코드의 덩치가 커져도 일관성을 유지하기 좋다**는 것을 깨닫게 됩니다.

그런데 구조체를 통해 코드를 한데 모으다보니 특정 구조체만 가지고 동작을 하는 함수 군들이 만들어진다는 것을 알게되었고, 구조체와 구조체에 항상 쓰이는 함수들을 하나로 합치는 것을 생각하게 됩니다.

어딘가 저희가 사용하는 객체와 비슷하다는 느낌이 비슷하지 않나요? 맞습니다. 이렇게 **구조체와 구조체에 항상 쓰이는 함수들을 하나로 묶어서 포함하는 개념인 class가 탄생**하게 됩니다.

```jsx
class Person {
  name = "Brad";
  age = 28;

  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

const me = new Person();
me.sayHi(); // Hi! My name is Brad
```

기존의 **구조체와 함수를 합쳐서 선언하는 것**을 `class`라 부르기로 했고, class를 통해 만들어진 결과물을 **값(상태)과 동작을 함께 가지고 있는 것이고 주위 사물과 유사하다**고 하여 `object`라고 부르기로 합니다.

클래스가 탄생하면서 기존의 데이터와 처리 방법을 분리해서 개발하던 절차식 프로그래밍과 달리 **데이터와 처리방식을 하나의 모듈로 관리**하게 되었습니다. 이로 인해 큰 프로그램을 만들더라도 **작은 부품들을 미리 만들어두고 이를 조립하고 결합하는 방식**으로 개발할 수 있다는 것을 알게됩니다.

이런식으로 **작은 문제를 해결하는 것들을 모아서 하나의 큰 문제를 해결하는 프로그램 개발 방식**을 `Bottom-up` 방식이라고 하며, **작은 문제를 해결하는 독립된 객체를 먼저 만들고 조립하자는 개발 방식**은 다음과 같은 개념을 확장시킵니다.

> 프로그램은 모두 객체로 만들어져있고, 객체들 간의 메시지를 주고받는 상호작용으로 이루어진다.

</aside>

이처럼 **프로그램을 객체로 바라보는 관점**으로 프로그래밍 하는 것을 **객체지향 프로그래밍(Object Oriented Programming; OOP)** 이라고 합니다.

[⬆ Back to top](#목차)

## 2. 객체지향 프로그래밍의 핵심 개념

객체지향 프로그래밍에서 **재사용이 가능한 객체들을 많이 만들어 놓는 것이 중요하다**는 것을 알게 되었고, 객체의 **재사용성**을 높이기 위해서 몇가지 핵심 개념들이 등장했습니다.

### 2.1 캡슐화(encapsulation)와 정보 은닉(information hiding)

**캡슐화**란 클래스를 통해 **변수와 함수를 하나의 단위로 묶는 것**을 의미합니다. 다시 말해, **객체의 속성(데이터)과 행위(메서드)를 하나로 묶는 것**으로 클래스를 통한 데이터의 번들링을 의미합니다.

그렇다면 클래스를 생성하는 것과 어떤 차이가 있는 걸까요? 캡슐화에는 한가지 파생된 개념이 더 존재합니다. 우리는 접근 제한을 통해서 **실제 구현 내용 일부를 내부에 감추어 은닉**할 수 있는데, 이를 **정보 은닉**이라고 합니다.

#### 캡슐화가 필요한 이유

위에서 캡슐화와 정보 은닉의 개념에 대해서 말했습니다. 그런데 왜 캡슐화가 필요할까요? 캡슐화를 통해 얻는 이점을 생각해보면 됩니다. 다음은 캡슐화를 통해 얻는 이점입니다.

- **캡슐화를 통해 데이터와 함수를 한 곳에서 관리할 수 있게 되므로 유지보수성이 향상됩니다.**
- **접근 제한을 통해 부적절한 데이터의 노출과 조작을 막아 안정성이 높아집니다.**

일반적으로 접근 제한은 public, protected, private이지만 자바스크립트에서는 모두 public입니다. 하지만 현재 private은 #이란 접두사로 표준 사양은 아니지만, 표준으로 거의 확정되어 사용할 수 있습니다.

```jsx
class Person {
  name = "Brad";
  #age;
}

const me = new Person();
console.log(person.name); // public 필드는 외부에서 수정이 가능한 잠재적 위험이 있습니다.

// pirvate을 이용하면 외부에서 참조할 수 없게 됩니다.
console.log(person.#age); // SyntaxError: Private field '#age' must be declared in an enclosing class
```

> 캡슐화를 통해 객체의 속성(데이터)과 행위(메서드)를 하나로 묶고, 실제 구현 내용 일부를 내부에 감추어 은닉한다.

[⬆ Back to top](#목차)

### 2.2 상속(Inheritance)과 추상화(Abstraction)

상속이란 **자식 클래스가 부모 클래스의 특성과 기능을 물려받는 것**을 말합니다. 기능의 일부분을 변경해야 할 경우 자식 클래스에서 부모 클래스에게 상속 받은 기능만을 수정해서 다시 정의하게 되는데, 이러한 작업을 오버라이딩(overriding)이라고 합니다. 상속은 클래스의 캡슐화를 유지하면서도 클래스의 재사용을 용이하게 해줍니다.

> 상속에서 주의할 점은 has a 관계가 아닌, is a 관계여야 한다는 것!

#### 상속이 필요한 이유

객체를 재사용하는 것은 좋지만, 객체는 여러 개의 변수와 여러 개의 함수가 섞여 있다보니 일부는 재사용을 하고, 일부는 달라져야하는 경우가 빈번합니다. 그래서 우리는 **객체의 일부분만 재사용을 하는 방법이 필요**합니다.

예제를 통해 상속을 통해 중복을 피하는 방법에 대해 알아보겠습니다. 아래와 같은 개발자 클래스를 만들었습니다.

```jsx
class Developer {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  work() {
    console.log(`${this.name} develop something`);
  }
}
```

그리고 이제 디자이너를 만들어보려고 합니다. 그런데 디자이너를 만들다보니 개발자와 동일한 로직이 너무 많습니다. 이름과 나이를 가지며 일을 합니다. 하지만 업무 내용이 다르죠.

그래서 **객체에서 공통된 부분만 따로 만들어서 그 코드를 같이 상속 받아서 활용**하고 나머지 달라지는 것들만 각자 코드를 작성하는 방식으로 만들어보려고 합니다.

```jsx
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  work() {
    console.log("do something...");
  }
}

class Developer extends Person {
  // 오버라이딩
  work() {
    console.log(`${this.name} develop something`);
  }
}

class Designer extends Person {
  // 오버라이딩
  work() {
    console.log(`${this.name} design something`);
  }
}
```

개발자도 디자이너도 모두 사람이므로 Person이라는 클래스를 만들어줍니다. Person 클래스를 통해 개별 객체를 정의해서 같은 코드를 몇번이고 다시 쓰는 중복을 피할 수 있었습니다.

위 코드의 Person이 개발자와 디자이너의 사용될 공통 부분을 가지고 있듯이, **공통적인 부분을 모아서 상위의 개념으로 새롭게 이름을 붙이는 것을 추상화**라고 합니다.

[⬆ Back to top](#목차)

### 2.3 다형성

자바스크립트에서는 데이터의 타입을 명시하지 않지만, 다른 프로그래밍 언어에서는 데이터 타입을 미리 작성해야 합니다. 함수와 메서드에서도 마찬가지로 매개변수와 리턴 타입 모두 명시해주지 않는다면 에러가 발생하게 됩니다.

그러나 자바스크립트는 인터페이스와 추상 클래스, 타입 체크 등의 다형성과 관련된 문법을 지원하지 않습니다. 그렇기 때문에 자바스크립트에서는 다형성을 지원한다는 가정하에 그에 맞춰 코드를 작성해야합니다.

회사에서 개발자, 디자이너, 프로덕트 매니저들이 팀이되어 일을한다고 가정해보겠습니다. 팀이지만 각각 서로 다른 업무를 볼 것입니다. 하지만 위 코드와 같이 상속과 추상화를 통해 우리는 이들을 모두 사람으로 취급하여 같은 타입으로 취급할 수 있게 됩니다.

```jsx
const developer = new Developer("Brad", 28);
const designer = new Designer("Anne", 26);
const productManager = new ProductManger("Albert", 31);

const team = [developer, designer, productManager];
// 모두 같은 work 메서드를 호출하지만 각자의 업무를 본다.
team.forEach((member) => member.work());

// Brad develop something.
// Anne design something.
// Albert manage something.
```

이렇듯 추상화된 Person이라는 타입은 개발자, 디자이너, 프로덕트 매니저 등 하위 타입인 여러가지 타입으로 참조할 수 있다는 개념이 바로 다형성입니다. 즉, **하나의 변수가 다양한 종류의 클래스로 만든 여러 객체를 가리킬 수 있다**는 것을 의미합니다.

결과적으로 상속과 추상화를 통해 같은 Person 메서드를 사용하지만, 각자 정의딘 방식이 있다면 각각의 방식대로 동작할 수 있도록 하는 **다형성을 통해서 객체의 일부분만 재사용이 가능하도록** 설계 되었습니다.

[⬆ Back to top](#목차)

## 3. 자바스크립트의 객체 지향 프로그래밍

객체지향에 대해 알게되었으나 이를 자바스크립트에 적용하려면 어려움을 겪습니다. 자바스크립트가 객체지향을 지원하지 않아서가 아닙니다. 자바스크립트는 강력한 객체지향 프로그래밍 언어입니다. 그러나 자바스크립트는 일반적인 객체지향과는 조금 다른 방식으로 객체 지향을 풀어냅니다.

### 3.1 객체 생성 방식

객체에 대해 다시 한번 정리하고 가볼까요? **객체란 현실의 무언가에 대응하는 개념을 추상적으로 표현한 것**이라고 할 수 있습니다. 그러므로 꼭 클래스만이 객체가 아닙니다. **클래스는 객체를 표현하는 하나의 수단일 뿐**입니다.

자바스크립트에서는 객체를 생성하기 위한 몇 가지 방법을 제공합니다.

```jsx
// 1. 객체 리터럴
const obj1 = {
  name: "Lee",
};

// 2. Object() 생성자 함수
const obj2 = new Object();
obj2.name = "Lee";

// 3. 생성자 함수
function F() {
  this.name = "Lee";
}
const obj3 = new F();
```

[⬆ Back to top](#목차)

### 3.2 프로토타입 기반 언어

ES6 이후 클래스를 사용할 수 있게 되었지만, 원래 자바스크립트는 클래스가 없었습니다. 자바스크립트가 다른 클래스 기반 객체지향 언어들과 달리 **프로토타입 기반 객체지향 언어**이기 때문입니다. 즉, **자바스크립트는 클래스가 필요없는(class-free) 객체지향 프로그래밍 언어**입니다.

```jsx
// 생성자 함수와 프로토타입을 통해 클래스 구현
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수 반환
  return Person;
})();

// 인스턴스 생성
const me = new Person("Brad");
me.sayHi(); // Hi! My name is Brad
```

자바스크립트는 이미 생성된 인스턴스의 자료구조와 기능을 동적으로 변경할 수 있다는 특징이 있습니다. 객체 지향의 상속, 캡슐화(정보 은닉) 등의 개념은 프로토타입 체인과 클로저 등으로 구현할 수 있습니다.

하지만 ES6에 이르러 사람들의 필요에 의해 클래스를 사용할 수 있게 되었습니다. 위 코드는 아래의 코드와 같은 역할을 합니다.

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

const me = new Person("Brad");
me.sayHi(); // Hi! My name is Brad
```

#### 클래스

ES6의 클래스가 기존의 프로토타입 기반 객체지향 모델을 폐지하고, 새롭게 클래스 기반 객체지향 모델을 제공하는 것은 아닙니다. 사실 **클래스도 함수**이며, **기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 편의 문법(문법적 설탕, syntactic sugar)** 라고 볼 수 있습니다.

[⬆ Back to top](#목차)

### 3.3 상속

상속(또는 확장)은 코드 재사용의 관점에서 매우 유용합니다. 새롭게 정의할 클래스가 기존에 있는 클래스와 매우 유사하다면, 상속을 통해 다른 점만 구현하면 됩니다.

자바나 C++같은 일반적인 클래스 기반 객체지향 언어에서 객체는 클래스의 인스턴스이며, 클래스는 다른 클래스로 상속될 수 있습니다. 하지만 **자바스크립트는 기본적으로 프로토타입을 통해 상속을 구현합니다**. 이 말은 프로토타입을 통해 **객체가 다른 객체로 직접 상속된다**는 의미입니다.

```jsx
const superObject = {
  superValue: "super",
};

// superObject를 상속 받기.
// subObject.__proto__ = superObject 혹은 Object.setPrototypeOf(subObject, superObejct)와 같은 역할
const subObject = Object.create(superObject);
subObject.subValue = "sub";

console.log("subObject.subValue: ", subObject.subValue); // sub
console.log("subObject.superValue: ", subObject.superValue); // super
```

객체와 객체가 상속된다니 놀랍지 않나요? 프로토타입도 사실 객체고, 원시값을 제외한 모든 것이 객체기 때문에 사실 거의 모든 것이 상속이 가능합니다. 그만큼 자바스크립트는 자유롭습니다!

자바스크립트는 클래스에서 클래스 상속, 객체가 객체를 상속, 런타임 실행 중에 상속받을 객체를 변경하는 등 일반적인 객체지향의 상속보다는 조금 더 다양한 방법으로 상속을 지원합니다. 그러나 이러한 자유로움은 언제나 독이될 수 있기 때문에 주의해야 합니다.

#### 의사 클래스 패턴 상속

자바스크립트는 클래스 기반 언어가 아닌 프로토타입 기반 언어입니다. 그래서인지 생성자 함수를 사용하여 상속에 의한 클래스 확장을 흉내내기도 했습니다.

```jsx
const Animal = (function () {
  function Animal(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  Animal.prototype.eat = function () {
    return "eat";
  };

  Animal.prototype.move = function () {
    return "move";
  };

  return Animal;
})();

// Animal 생성자 함수를 상속하여 확장한 Bird 생성자 함수
const Bird = (function () {
  function Bird() {
    // Animal 생성자 함수에게 this와 인수를 전달하면서 호출.
    // class의 super()와 비슷한 역할을 한다.
    Animal.apply(this, arguments);
  }

  // 아직 Animal의 eat, move 메서드를 가지고 있지 않기 때문에 Animal.prototype을 가리키게 합니다.
  // Bird.prototype을 Animal.prototype을 프로토타입으로 갖는 객체로 교체
  Bird.prototype = Object.create(Animal.prototype);
  // Bird.prototype.constructor를 Animal에서 Bird로 교체해서 파괴된 연결을 되살림
  Bird.prototype.constructor = Bird;

  Bird.prototype.fly = function () {
    return "fly";
  };

  return Bird;
})();

// bird -> Bird.prototype -> Animal.prototype -> Object.prototype
const bird = new Bird(1, 5);
console.log(bird); // Bird { age: 1, weight: 5 }
console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly
```

하지만 클래스의 등장으로 위 코드와 같은 패턴은 더이상 필요하지 않습니다. 위 코드는 아래의 코드와 같습니다.

```jsx
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() {
    return "eat";
  }

  move() {
    return "move";
  }
}

class Bird extends Animal {
  fly() {
    return "fly";
  }
}

const bird = new Bird(1, 5);
console.log(bird); // Bird { age: 1, weight: 5 }
console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly
```

[⬆ Back to top](#목차)

# 참고

- [나무위키](https://namu.wiki/w/%EA%B0%9D%EC%B2%B4%20%EC%A7%80%ED%96%A5%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)
- [객체지향 프로그래밍과 javascript (약간의 역사를 곁들인...)](https://velog.io/@teo/oop)
