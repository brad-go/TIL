# JavaScript의 클래스 (Class)

## 목차

1. [클래스란](#1-클래스란)
2. [클래스 정의하기](#2-클래스-정의하기)
3. [클래스 호이스팅](#3-클래스-호이스팅)
4. [인스턴스 생성하기](#4-인스턴스-생성하기)
5. [메서드 정의하기](#5-메서드-정의하기)
6. [프로퍼티 정의하기](#6-프로퍼티-정의하기)
7. [상속에 의한 클래스 확장](#7-상속에-의한-클래스-확장)

## 1. 클래스란?

클래스는 객체 지향 프로그래밍에서 **특정 객체를 생성하기 위해 변수와 메서드를 정의하는 일종의 틀**로, 객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성됩니다. 즉, 클래스는 데이터와 이를 조작하는 코드를 하나로 **추상화**합니다.

ES6 이전의 자바스크립트에서는 객체를 생성하기 위해 생성자 함수와 프로토타입을 사용했지만, 다른 문법과 의미를 가집니다.

[⬆ Back to top](#목차)

## 2. 클래스 정의하기

**사실 클래스는 “특별한 함수"입니다**. 함수를 함수 표현식과 함수 선언으로 정의할 수 있듯이, class 문법도 class 표현식과 class 선언 두가지 방법으로 정의할 수 있습니다.

#### 클래스 선언

클래스는 `class` 키워드를 사용해 정의할 수 있습니다. 클래스 이름은 생성자 함수와 마찬가지로 파스칼 케이스를 사용하는 것이 일반적입니다.

```tsx
// 클래스 선언문
class Person {}
```

#### 클래스 표현식

클래스 표현식은 class를 정의하는 또 다른 방법으로 이름을 가질 수도 있고, 갖지 않을 수도 있습니다. 이름을 가진 클래스에서 클래스 이름은 몸체 내부에 한해 유효한 식별자입니다. 이는 클래스의 name 속성을 통해 찾을 수 있습니다.

```tsx
// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class MyClass {};
```

이처럼 클래스가 표현식으로 정의할 수 있는 특별한 함수이기 때문에, 클래스가 일급 객체라는 것을 알 수 있습니다. 즉, **클래스는 일급 객체로서 다음과 같은 특징을 갖습니다**.

- **무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능이 가능하다.**
- **변수나 자료구조(객체, 배열) 등에 저장할 수 있다.**
- **함수의 매개변수에 전달할 수 있다.**
- **함수의 반환값으로 사용할 수 있다.**

[⬆ Back to top](#목차)

## 3. 클래스 호이스팅

```tsx
class Person {}

// 클래스는 함수로 평가됩니다.
console.log(typeof Person); // function
```

클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 런타임 이전에 먼저 평가되어 함수 객체를 생성합니다. 이때 클래스가 평가되어 생성된 함수 객체는 생성자 함수로서 호출할 수 있는 함수 constructor입니다.

프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍(pair)로 존재하기 때문에 생성자 함수로서 호출할 수 있는 함수는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성됩니다.

단, 클래스는 클래스 정의 이전에 참조할 수 없습니다.

```tsx
console.log(Person); // ReferenceError: Cannot access 'Person' before initialization

class Person {}
```

에러가 발생하기 때문에 클래스는 호이스팅이 발생하지 않는 것처럼 보입니다. 그러나 **클래스 선언문도 변수 선언, 함수 정의와 마찬가지로 호이스팅이 발생**합니다. 단, 클래스는 let, const 키워드로 선언한 변수처럼 **일시적 사각지대(Temporal Dead Zone; TDZ)에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작**합니다.

[⬆ Back to top](#목차)

## 4. 인스턴스 생성하기

**클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성**합니다.

```tsx
class Person {}

const me = new Person();
console.log(me); // Person {}

const you = Person(); // TypeError: Class constructor Person cannot be invoked without 'new'
```

함수는 new 연산자의 사용 여부에 따라 일반 함수로 호출되거나 인스턴스 생성을 위한 생성자 함수로 호출되지만, 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 new 연산자와 함께 호출해야 합니다.

### 4.1 인스턴스 생성 과정

```tsx
class Person {
	// new 연산자로 클래스 호출 시 constructor 내부 코드가 실행된다.
	constructor(name) {
		// 1. 암묵적으로 인스턴스(빈 객체)가 생성되고 this에 바인딩된다.
		console.log(this);
		// 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 된다.
		console.log(Object.getPrototypeOf(this) === Person.prototype); // true

		// 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
		this.name = name;

		// 3. 완성된 인스턴스가 바인딩된 this를 암묵적으로 반환한다.
}
```

[⬆ Back to top](#목차)

## 5. 메서드 정의하기

클래스 몸체에는 0개 이상의 메서드만 선언할 수 있습니다. 클래스 몸체에서 정의할 수 있는 메서드는 constructor(생성자), 프로토타입 메서드, 정적 메서드 세 가지가 있습니다.

### 5.1 constructor (생성자)

**constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드**입니다. constructor는 이름을 변경할 수 없습니다.

```tsx
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
}

// 인스턴스 생성
const me = new Person("Brad");
console.log(me); // Person { name: 'Brad' }
```

Person 클래스의 constructor 내부에서 this에 추가한 name 프로퍼티가 클래스가 생성한 인스턴스의 프로퍼티로 추가된 것을 볼 수 있습니다. 즉, 생성자 함수와 마찬가지로 constructor 내부에서 this에 추가한 프로퍼티는 인스턴스 프로퍼티가 됩니다. **constructor 내부의 this는 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스를 가리킵니다**.

흥미로운 것은 클래스 내부에 consructor라는 메서드를 정의했지만, 클래스가 평가되어 생성된 함수 객체나 클래스가 생성한 인스턴스 어디에도 constructor메서드가 보이지 않는다는 것입니다. 이는 constructor가 단순한 메서드가 아니라는 것을 의미합니다.

**constructor는 메서드로 해석되는 것이 아니라 클래스가 평가되어 생성한 함수 객체 코드의 일부가 됩니다**. 다시 말해, 클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수 객체가 생성됩니다.

> 클래스의 constructor 메서드와 프로토타입의 construcor 프로퍼티는 이름이 같아 혼동하기 쉽지만, 직접적인 관련이 없습니다. 프로토타입의 constructor 프로퍼티는 모든 프로토타입이 가지고 있는 프로퍼티이며, 생성자 함수를 가리킵니다.

constructor와 생성자 함수는 유사하지만 몇가지 차이가 있습니다.

#### constructor는 클래스 내에 최대 한 개만 존재할 수 있습니다.

```tsx
class Person {
  constructor() {}
  constructor() {}
}
// SyntaxError: A class may only have one constructor
```

#### constructor는 생략 가능합니다.

constructor를 생략하면 클래스에 빈 constructor가 암묵적으로 정의됩니다.

```tsx
class Person {}

const me = new Person();
console.log(me); // Person {}
```

#### 프로퍼티가 추가되어 초기화된 인스턴스 생성하기

constructor 내부에서 this에 인스턴스 프로퍼티를 추가함으로 프로퍼티가 추가되어 초기화된 인스턴스를 생성할 수 있습니다.

```tsx
class Person {
  constructor(name, age) {
    this.name = "Brad";
    this.age = 28;
  }
}

const me = new Person();
console.log(me); // Person { name: 'Brad', age: 28 }
```

인스턴스를 생성할 때, **외부에서 인스턴스 프로퍼티의 초기값을 전달하려면 다음과 같이 constructor에 매개변수를 선언하고 인스턴스를 생성할 때 초기값을 전달**합니다. 이때 초기값은 constructor의 매개변수에게 전달됩니다.

```tsx
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const me = new Person("Brad", 28);
console.log(me); // Person { name: 'Brad', age: 28 }
```

이처럼 constructor 내에서는 인스턴스 생성과 동시에 인스턴스 프로퍼티 추가를 통해 인스턴스의 초기화를 실행합니다. 따라서 인스턴스를 초기화하려면 constructor를 생략해서는 안됩니다.

#### constructor의 반환문

**constructor는 별도의 반환문을 갖지 않아야 합니다**. new 연산자와 함께 클래스가 호출되면 생성자 함수와 동일하게 암묵적으로 this, 즉 인스턴스를 반환하기 때문입니다.

만약 this가 아닌 다른 객체를 명시적으로 반환하면 인스턴스가 반환되지 못하고 return문에 명시한 객체가 반환됩니다.

```tsx
class Person {
  constructor(name, age) {
    this.name = name;

    // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시됩니다.
    return {};
  }
}

const me = new Person("Brad");
console.log(me); // {}
```

생성자 함수의 인스턴스 생성과정과 마찬가지로 원시값을 반환할 경우 원시값 반환은 무시되고 암묵적으로 this가 반환됩니다.

```tsx
class Person {
  constructor(name, age) {
    this.name = name;

    // 명시적으로 원시값을 반환하면 원시값 반환은 무시되고, 암묵적으로 this 반환됩니다.
    return 100;
  }
}

const me = new Person("Brad");
console.log(me); // { name: 'Brad' }
```

이처럼 **constructor 내부에서 명시적으로 this가 아닌 다른 값을 반환하는 것은 클래스의 기본 동작을 훼손합니다**. 따라서 constructor 내부에서 return문을 반드시 생략해야 합니다.

[⬆ Back to top](#목차)

### 5.2 프로토타입 메서드

클래스 몸체에서 정의한 메서드는 생성자 함수에 의한 객체 생성 방식과는 다르게 클래스의 prototype 프로퍼티에 메서드를 추가하지 않다도 기본적으로 프로토타입 메서드가 됩니다.

```tsx
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

생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 됩니다.

```tsx
// me 객체의 프로토타입은 Person.prototype
Object.getPrototypeOf(me) === Person.prototype; // -> true
me instanceof Person; // -> true

// Perosn.prototype의 프로토타입은 Object.prototype
Object.getPrototypeOf(Person.prototype) === Object.prototype; // -> true
me instanceof Object; // -> true

// me 객체의 constructor는 Person 클래스
me.constructor === Person; // -> true

// 다음과 같은 프로토타입 체인을 형성합니다.
// me -> Person.prototype -> Object.prototype
// Person -> Function.prototype -> Object.prototype
```

이처럼 **클래스 몸체에서 정의한 메서드는 인스턴스의 프로토타입에 존재하는 프로토타입 메서드가 됩니다.**

프로토타입 체인은 기존의 모든 객체 생성 방식뿐만 아니라 클래스에 의해 생성된 인스턴스에도 동일하게 적용됩니다. 생성자 함수의 역할을 클래스가 할 뿐입니다.

결국 **클래스는 생성자 함수와 같이 인스턴스를 생성하는 생성자 함수**라고 볼 수 있습니다. 다시 말해, 클래스는 생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 메커니즘입니다.

[⬆ Back to top](#목차)

### 5.3 정적 메서드

정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있는 메서드를 말합니다. 클래스에서는 **메서드에** `static` **키워드를 붙임으로써 정적 메서드(클래스 메서드)를 생성**할 수 있습니다.

```tsx
class Person {
  constructor(name) {
    this.name = name;
  }

  static sayHi() {
    console.log(`Hi!`);
  }
}
```

정적 메서드는 클래스에 바인딩된 메서드가 됩니다. 클래스는 함수 객체로 평가되므로 자신의 프로퍼티/메서드를 소유할 수 있습니다. 클래스는 클래스 정의가 평가되는 시점에 함수 객체가 되므로 인스턴스와 달리 별다른 생성과정이 필요없습니다.

따라서 정적 메서드는 클래스 정의 이후 인스턴스를 생성하지 않아도 호출할 수 있습니다.

```tsx
Person.sayHi(); // Hi!
```

하지만 정적 메서드는 인스턴스로 호출할 수 없습니다. 정적 메서드가 바인딩된 클래스는 인스턴스의 프로토타입 체인 상에 존재하지 않기 때문입니다. 다시 말해, 인스턴스의 프로토타입 체인 상에는 클래스가 존재하지 않기 때문에 인스턴스로 클래스의 메서드를 상속받을 수 없습니다.

```tsx
const me = new Person("Brad");
me.sayHi(); // TypeError: me.sayHi is not a function
```

[⬆ Back to top](#목차)

### 5.4 정적 메서드와 프로토타입 메서드의 차이

정적 메서드와 프로토타입 메서드의 차이는 무엇이 다르며, 무엇을 기준으로 구분하여 정의해야 할까요? 정적 메서드와 프로토타입 메서드의 차이는 다음과 같습니다.

- 정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다릅니다.
- 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출합니다.
- 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만, 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있습니다.

```tsx
class Square {
  // 정적 메서드
  static area(width, height) {
    return width * height;
  }
}

console.log(Square.area(10, 10)); // 100
```

정적 메서드는 인스턴스 프로퍼티를 참조하지 않습니다. 만약 인스턴스 프로퍼티를 참조해야 한다면, 정적 메서드 대신 프로토타입 메서드를 사용해야 합니다.

```tsx
class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const square = new Square(10, 10);
console.log(square.area()); // 100
```

위 두 예제에서 볼 수 있듯이 프로토타입 메서드 내부의 this는 프로토타입 메서드를 호출한 인스턴스를 가리킵니다. 반면에 정적 메서드 내부의 this는 인스턴스가 아닌 클래스를 가리킵니다. 즉, **프로토타입 메서드와 정적 메서드 내부의 this 바인딩이 다릅니다**.

따라서 메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 있다면 this를 사용해야 하며, 프로토타입 메서드로 정의해야 합니다. 하지만 this를 사용하지 않는다면 인스턴스를 생성한 다음 인스턴스를 호출해야 하므로 this를 사용하지 않는 메서드는 정적 메서드로 정의하는 것이 좋습니다.

정적 메서드는 애플리케이션을 위한 유틸리티(utility) 함수를 생성하는 데 주로 사용됩니다. 이들을 사용해 인스턴스와 상관없이 애플리케이션 전역에서 사용할 수 있습니다.

```tsx
// 표준 빌트인 객체의 정적 메서드
Math.max(1, 2, 3); // -> 3
Number.isNan(NaN); // -> true
JSON.stringify({ a: 1 }); // -> "{"a":1}"
Object.is({}, {}); // -> false
Reflect.has({ a: 1 }, "a"); // -> true
```

[⬆ Back to top](#목차)

### 5.5 클래스에서 정의한 메서드의 특징

클래스에서 정의한 메서드는 다음과 같은 특징을 갖습니다.

1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요없다.
3. 암묵적으로 strict mode로 실행된다.
4. for…in 문이나 Object.keys 메서드 등으로 열거할 수 없다. 즉, 프로퍼티의 열거 가능 여부를 나타내며, 불리언 값을 갖는 프로퍼티 어트리뷰트 \[[Enumerable]]의 값이 false다.
5. 내부 메서드 \[[Construct]]를 갖지 않는 non-constructor다. 따라서 new 연산자와 함께 호출할 수 없다.

[⬆ Back to top](#목차)

## 6. 프로퍼티 정의하기

### 6.1 인스턴스 프로퍼티

인스턴스 프로퍼티는 cosntructor 내부에서 정의해야 합니다.

```tsx
class Person {
  constructor(name) {
    this.name = name;
  }
}

const me = new Person("Brad");
console.log(me); // Person { name: 'Brad' }
```

constructor 내부 코드가 실행되기 이전에 cosntructor 내부의 this에는 이미 클래스가 암묵적으로 생성한 인스턴스인 빈 객체가 바인딩되어 있습니다.

생성자 함수와 마찬가지로 생성할 인스턴스의 프로퍼티를 정의하기 위해 constructor 내부의 this에 인스턴스 프로퍼티를 추가합니다. 이로써 클래스가 생성한 인스턴스에 프로퍼티가 추가되어 초기화됩니다.

[⬆ Back to top](#목차)

### 6.2 접근자 프로퍼티

**접근자 프로퍼티는 자체적으로는 값을 갖지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(getter, setter)로 구성되어 있습니다**.

#### getter

- 인스턴스 프로퍼티에 **접근**할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용합니다.
- 메서드 이름 앞에 `get` 키워드를 사용해 정의합니다.
- 무언가를 취득할 때 사용하므로 **반드시 무언가를 반환**해야 합니다.

#### setter

- 인스턴스 프로퍼티에 **값을 할당**할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용합니다.
- 메서드 이름 앞에 `set` 키워드를 사용해 정의합니다.
- 무언가를 프로퍼티에 할당해야 할 때 사용하므로 **반드시 매개변수가 필요**합니다.
- 단 하나의 값만 할당받기 때문에 **단 하나의 매개변수**만 선언할 수 있습니다.

getter와 setter 이름은 **인스턴스 프로퍼티처럼 사용**됩니다. 다시 말해 이들은 호출하는 것이 아니라 프로퍼티처럼 참조 및 값을 할당하는 형식으로 사용하며, 참조시에 내부적으로 getter/setter가 호출됩니다.

```tsx
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // fulllname은 접근자 함수로 구성된 접근자 프로퍼티
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
}

const me = new Person("Brad", "Go");

// 데이터 프로퍼티를 통한 프로티 값의 참조
console.log(`${me.firstName} ${me.lastName}`); // Brad Go

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullNmae에 값을 저장하면 setter 함수 호출
me.fullName = "DongHyun Go";
console.log(me); // Person { firstName: 'DongHyun', lastName: 'Go' }

// 접근자 프로퍼티를 통한 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수 호출
console.log(me.fullName); // DongHyun Go

// fullName은 접근자 프로퍼티
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 가짐
console.log(Object.getOwnPropertyDescriptor(Person.prototype, "fullName"));
// { get: f, set: f, enumerable: false, configurable: true }
```

클래스의 메서드는 기본적으로 프로토타입 메서드가 된다고 했습니다. 그러므로 클래스의 접근자 프로퍼티 또한 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티가 됩니다.

```tsx
// Object.getOwnPropertyNames는 비열거형(non-enumerable)을 포함한 모든 프로피티 이름을 반환
Object.getOwnPropertyNames(me); // -> ['firstName', 'lastName']
Object.getOwnPropertyNames(Object.getPrototypeOf(me)); // -> ['constructor', 'fullName']
```

[⬆ Back to top](#목차)

### 6.3 클래스 필드 정의하기

클래스 필드(필드 또는 멤버)란 클래스 기반 객체지향 언어에서 **클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어**입니다. 자바의 클래스 정의를 보면 자바의 클래스 필드는 마치 클래스 내부에서 변수처럼 사용됩니다.

자바스크립트의 클래스에서 인스턴스 프로퍼티를 선언하고 초기화하려면 반드시 constructor 내부에서 this에 프로퍼티를 추가해야 합니다. 하지만 자바와 같이 생성자 외부에 필드를 선언할 수 있을까요?

본래 자바스크립트 클래스의 몸체에는 메서드만 선언할 수 있습니다. 따라서 클래스 몸체에 자바와 유사하게 클래스 필드를 선언하면 문법 에러가 발생해야 합니다.

```java
class Person {
  name = "Brad";
}

const me = new Person();
console.log(me); // Person { name: 'Brad' }
```

하지만 에러가 발생하지 않습니다. 아직 ECMAScript의 정식 표준 사양으로 승급되지 않았지만, 최신 브라우저와 Node.js는 표준 사양으로 승급이 확실시되는 이 제안을 선제적으로 구현해두었기 때문에 위 예제와 같이 클래스 필드를 몸체에 정의할 수 있습니다.

클래스 몸체에서 클래스 필드를 정의할 경우에는 다음과 같은 주의사항이 있습니다.

- **this에 클래스 필드를 바인딩해서는 안됩니다. this는 클래스의 constructor와 메서드 내에서만 유효합니다.**
- **클래스 필드를 참조할 경우 this를 반드시 사용해야 합니다.**
- **클래스 필드에 초기값을 할당하지 않으면 undefined를 가집니다.**
- **인스턴스를 생성할 때, 외부의 초기값으로 클래스 필드를 초기화해야 할 필요가 있다면 constructor에서 클래스 필드를 초기화해야 합니다.**

결과적으로 인스턴스 프로퍼티를 정의하는 방식은 두 가지가 되었습니다.

1. 외부 초기값으로 클래스 필드를 초기화할 필요가 있다면 constructor에서 인스턴스 프로퍼티를 정의하는 기존 방식을 사용합니다.
2. 외부 초기값으로 클래스 필드를 초기화할 필요가 없다면 기존의 constructor에서 인스턴스 프로퍼티를 정의하는 방식과 클래스 필드 정의를 모두 사용할 수 있습니다.

#### private 필드 정의하기

자바스크립트에서는 private, public, protected 키워드와 같은 접근 제한자를 지원하지 않습니다. 따라서 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있습니다. 즉, 언제나 public입니다.

```java
class Person {
	gender = 'male'; // 클래스 필드는 기본적으로 public
	constructor(name) {
		this.name = name; // 인스턴스 프로퍼티는 기본적으로 public
	}
}

const me = new Perosn('Brad');
console.log(me.name); // Brad
console.log(me.gender); // male
```

이처럼 자바스크립트의 클래스에서 프로퍼티는 외부에 그대로 노출됩니다. 그러나 private 필드를 정의할 수 있는 새로운 표준 사양이 제안되어 있고, 표준 사양으로 승급이 확실되기 때문에 최신 브라우저 및 Node.js에 이미 구현되어 있기에 사용할 수 있습니다.

```jsx
class Person {
  #name = ""; // private 필드 정의

  constructor(name) {
    this.#name = name; // privae 필드 참조
  }
}

const me = new Person("Brad");

// private 필드 #name은 클래스 외부에서 참조할 수 없습니다.
console.log(me.#name); // SyntaxError: Private field '#name' must be declared in an enclosing class
```

**private 필드의 선두에는 #을 붙여줘야하고**, 위 코드와 같이 **private 필드는 값을 할당하면서 만들어질 수 없습니다**. 따라서 private 필드는 사용전에 선언되어야 하며, constructor 내부에 정의할 수 없습니다.

**private 필드는 클래스 내부에서만 참조가 가능**합니다. 다만 접근자 프로퍼티를 통해 간접적으로 접근할 수 있습니다.

```jsx
class Person {
  #name = "";

  constructor(name) {
    this.#name = name;
  }

  // 접근자 프로퍼티를 통해 private 필드를 반환
  get name() {
    return this.#name;
  }
}

const me = new Person("Brad");
```

#### static 필드 정의하기

static 키워드를 사용하여 정적 메서드는 정의할 수 있지만, static 키워드를 통해 정적 필드를 정의할 수는 없었습니다. 하지만 아직 표준 사양은 아니지만, stataic public 필드, static private 필드, static private 메서드를 정의할 수 있는 새로운 표준 사양이 제안되어 있고, 미리 구현되어 있어 사용이 가능합니다.

```jsx
class MyMath {
  // static pulbic 필드 정의
  static PI = 22 / 7;

  // static private 필드 정의
  static #num = 10;

  // static 메서드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
```

[⬆ Back to top](#목차)

## 7. 상속에 의한 클래스 확장

### 7.1 extends 키워드

**상속을 통해 클래스를 확장하려면 extends 키워드를 사용하여 상속받을 클래스를 정의합니다**.

```jsx
// 수퍼(베이스/부모) 클래스
class Base {}

// 서브(파생/자식) 클래스
class Derived extends Base {}
```

- 슈**퍼 클래스(super class)**: 서브 클래스에게 상속해준 클래스. 베이스 클래스(base class) 혹은 부모 클래스(parent class)라고도 부릅니다.
- **서브 클래스(sub class)**: 상속을 통해 확장 된 클래스. 파생 클래스(derived class), 자식 클래스(child class)라고도 부릅니다.

  **extends 키워드의 역할은 슈퍼 클래스와 서브 클래스 가의 상속 관계를 설정하는 것**입니다. 클래스도 프토타입을 통해 상속 관계를 구현합니다.

슈퍼 클래스와 서브 클래스는 인스턴스의 프로토타입 체인뿐 아니라 클래스 간의 프로토타입 체인도 생성합니다. 이를 통해 프로토타입 메서드, 정적 메서드 모두 상속이 가능합니다.

#### 동적 상속

extends 키워드는 클래스뿐만 아니라 생성자 함수를 상속받아 클래스를 확장할 수도 있습니다. 단, extends 키워드 앞에는 반드시 클래스가 와야 합니다.

```jsx
function Base(a) {
  this.a = a;
}

class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived { a: 1 }
```

extends 키워드 다음에는 클래스뿐만이 아니라 \[[Construct]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있습니다. 이를 통해 동적으로 상속받을 대상을 결정할 수 있습니다.

```jsx
function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브 클래스
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}

console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false
```

[⬆ Back to top](#목차)

### 7.2 super 키워드

super 키워드는 함수처럼 호출할 수도 있고 this와 같이 식별자처럼 참조할 수 있는 특별한 키워드입니다. super는 다음과 같이 동작합니다.

- super를 호출하면 슈퍼 클래스의 constructor(super-constructor)를 호출합니다.
- super를 참조하면 슈퍼 클래스의 메서드를 호출할 수 있습니다.

#### super 호출

**super를 호출하면 슈퍼 클래스의 constructor(super-constructor)를 호출합니다.**

슈퍼 클래스의 constructor 내부에서 추가한 프로퍼티를 그대로 갖는 인스턴스를 생성한다면 서브 클래스의 constructor를 생략할 수 있습니다. 이때 new 연산자와 함께 서브 클래스를 호출하며서 전달한 인수는 모두 서브 클래스에 암묵적으로 정의된 constructor의 super 호출을 통해 슈퍼 클래스의 constructor에 전달됩니다.

```jsx
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

class Derived extends Base {
  // 다음과 같이 암묵적으로 constructor가 정의됨
  // constructor(...args) { super(...args); }
}

const derived = new Derived(1, 2);
console.log(derived);
```

슈퍼 클래스에서 추가한 프로퍼티와 서브 클래스에서 추가한 프로퍼티를 갖는 인스턴스를 생성한다면 서브 클래스의 constructor를 생략할 수 없습니다.

```jsx
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

class Derived extends Base {
  constructor(a, b, c) {
    super(a, b); // super class에게 일부 인수 전달
    this.c = c;
  }
}

const derived = new Derived(1, 2, 3);
console.log(derived); // Derived { a: 1, b: 2, c: 3 }
```

super를 호출할 때는 다음과 같은 사항을 주의해야 합니다.

1. 서브 클래스에서 constructor를 생략하지 않는 경우 서브 클래스의 consructor에서는 반드시 super를 호출해야 합니다.
2. 서브 클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없습니다.
3. supr는 반드시 서브 클래스의 constructor에서만 호출해야 합니다. 서브 클래스가 아닌 클래스의 constructor나 함수에서 super를 호출하면 에러가 발생합니다.

#### super 참조

**메서드 내에서 super를 참조하면 슈퍼 클래스의 메서드를 호출할 수 있습니다.**

```jsx
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  sayHi() {
    // 서브 클래스의 프로토타입 메서드 내의 super.sayHi는 슈퍼 클래스의 프로토타입 메서드 sayHi를 가리킵니다.
    return `${super.sayHi()}. How are you doing?`;
  }
}

const derived = new Derived("Brad");
console.log(derived.sayHi()); // Hi! Brad. How are you doing?
```

super 참조를 통해 슈퍼 클래스의 메서드를 참조하려면 super가 슈퍼 클래스의 메서드가 바인딩된 객체인 슈퍼 클래스의 prototype 프로퍼티에 바인딩된 프로토타입을 참조할 수 있어야 합니다. 위 예제는 다음과 동일합니다.

```jsx
...
class Derived extends Base {
  sayHi() {
    // __super는 Base.prototype을 가리킴
    const __super = Object.getPrototypeOf(Derived.prototype);
    return `${__super.sayHi.call(this)} how are you doing?`;
  }
}
```

**super는 자신을 참조하고 있는 메서드(Derived의 sayHi)가 바인딩되어 있는 객체(Derived.prototype)의 프로토타입(Base.prototype)을 가리킵니다.** 따라서 super.sayHI는 Base.prototype.sayHi를 가리킵니다. 단, super.sayHi를 호출할 때 call 메서드를 사용해 this를 전달해야 합니다.

call 메서드를 사용해 this를 전달해줘야 super.sayHi를 통해 Base.prototype.sayHi가 호출될 때, 메서드 내부의 this가 Base.prototype이 아닌 인스턴스를 가리키게 할 수 있기 때문입니다.

이처럼 super 참조가 동작하기 위해서는 super를 참조하고 있는 메서드가 바인딩되어 있는 객체의 프로토타입을 찾을 수 있어야 합니다. 이를 위해 메서드는 내부 슬롯 \[[HomeObject]]를 가지며, 자신을 바인딩하고 있는 객체를 가리킵니다.

super 참조를 의사 코드로 표현하면 다음과 같습니다.

```jsx
// [[HomeObject]]는 메서드 자신을 바인딩하고 있는 객체를 가리킵니다.
// [[HomeObject]]를 통해 메서드 자신을 바인딩하고 있는 객체의 프로토타입을 찾을 수 있습니다.
super = Object.getPrototypeOf([[HomeObject]]);
```

**주의할 것은 ES6의 메서드 축약 표현으로 정의된 함수만이 \[[HomeObject]]를 갖는다는 것입니다.**

\[[HomeObject]]를 가지는 함수만이 super를 참조할 수 있습니다. 따라서 \[[HomeObject]]를 가지는 ES6의 메서드 축약 표현으로 정의된 함수 만이 super를 참조할 수 있습니다. 단, super 참조는 슈퍼 클래스의 메서드를 참조하기 위해 사용하므로 서브 클래스의 메서드에서 사용해야 합니다.

super 참조는 클래스의 전유물은 아닙니다.객체 리터럴에서도 super를 참조할 수 있습니다. 단, ES6의 메서드 축약 표현으로 정의된 함수만 가능합니다.

```jsx
const base = {
  name: "Brad",
  sayHi() {
    return `Hi! ${this.name}`;
  },
};

const derived = {
  __proto__: base,
  sayHi() {
    return `${super.sayHi()}. How are you doing?`;
  },
};

console.log(derived.sayHi()); // Hi! Brad. How are you doing?
```

[⬆ Back to top](#목차)

### 7.3 상속 클래스의 인스턴스 생성 과정

```jsx
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  toString() {
    return `width = ${this.width}, height = ${this.height}`;
  }
}

class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);
    this.color = color;
  }

  // 메서드 오버라이딩
  toString() {
    return super.toString() + `, color = ${this.color}`;
  }
}

// 프로토타입 체인
// ColorRectangle -> Rectangle -> Function.prototype -> Object.prototype
// colorRectangle -> ColorRectangle.prototype -> Rectangle.prototype -> Object.prototype

const colorRectangle = new ColorRectangle(2, 4, "red");
console.log(colorRectangle); // ColorRectangle { width: 2, height: 4, color: 'red' }

// 상속을 통해 getArea 메서드를 호출
console.log(colorRectangle.getArea()); // 8
// 오버라이딩된 toString 메서드를 호출
console.log(colorRectangle.toString()); // width = 2, height = 4, color = red
```

서브 클래스의 ColorRectangle이 new 연산자와 함께 호출되면 다음 과정을 통해 인스턴스를 생성한다.

#### 1. 서브 클래스의 호출

자바스크립트 엔진은 클래스를 평가할 때, 슈퍼 클래스와 서브 클래스를 구분하기 위해 “base” 혹은 “derived” 값을 갖는 내부 슬롯 \[[ConstructorKind]]를 가집니다. 이를 통해 슈퍼 클래스와 서브 클래스는 new 연산자와 함께 호출되었을 때의 동작이 구분됩니다.

일반적으로 클래스는 new 연산자와 함께 호출되었을 때 암묵적으로 빈 객체, 즉 인스턴스를 생성하고 이를 this에 바인딩합니다.

하지만 **서브 클래스는 자신이 직접 인스턴스를 생성하지 않고 슈퍼 클래스에게 인스턴스 생성을 위임합니다. 이것이 바로 서브 클래스의 constructor에서 반드시 super를 호출해야 하는 이유**입니다.

#### 2. 슈퍼 클래스의 인스턴스 생성과 this 바인딩

```jsx
// 슈퍼 클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle
  }
  ...
}
```

위에서 말했듯이 new 연산자와 함께 서브 클래스를 호출되면 서브 클래스 constructor 내부의 super가 호출되고, super가 호출되면 슈퍼 클래스의 constructor가 호출됩니다. 즉, 슈퍼 클래스가 평가되어 생성된 함수 객체의 코드가 실행됩니다.

슈퍼 클래스의 constructor는 인스턴스를 생성할 것입니다. 하지만 new 연산자와 함께 호출된 클래스는 서브 클래스입니다. 즉, new 연산자와 함께 호출된 함수를 가리키는 new.target은 서브클래스를 가리킵니다. 따라서 **인스턴스는 new.target이 가리키는 서브 클래스가 생성한 것으로 처리됩니다.**

따라서 생성된 인스턴스의 프로토타입은 new.target이 가리키는 서브 클래스의 prototype 프로퍼티가 가리키는 객체(ColorRectangle.prototype)입니다.

```jsx
// 슈퍼 클래스
class Rectangle {
	constructor(width, height) {
		...
		// 생성된 인스턴스의 프로토타입으로 ColorRectangle.prototype이 설정됩니다.
		console.log(Object.getPrototypeOf(this) === ColorRectangle.prototype); // true
		console.log(this instanceof ColorRectangle); // true
		console.log(this instanceof Rectangle); // true
...
```

#### 3. 슈퍼 클래스의 인스턴스 초기화

슈퍼 클래스의 constructor가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화합니다. 즉, this에 바인딩 되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화합니다.

```jsx
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    console.log(this); // ColorRectangle { width: 2, height: 4 }
  }
}
```

#### 4. 서브 클래스 constructor로의 복귀와 this 바인딩

super 호출이 종료되고, 제어 흐름이 서브 클래스의 constructor로 돌아옵니다. **이때 super가 반환한 인스턴스가 this에 바인딩됩니다. 서브 클래스는 별도의 인스턴스를 생성하지 않고, super가 반환한 인스턴스르 this에 바인딩하여 그대로 사용합니다.**

서브 클래스가 인스턴스를 생성하지 않기 때문에, 서브 클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없는 것입니다.

```jsx
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);

		// super가 반환한 인스턴스가 this에 바인딩 됩니다.
		console.log(this); // ColorRectangle { width: 2, height: 4 }
  }
...
```

#### 5. 서브 클래스의 인스턴스 초기화

super 호출 이후, 서브 클래스의 cosntructor에 기술되어 있는 인스턴스 초기화가 실행됩니다. 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화합니다.

#### 6. 인스턴스 반환

클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환됩니다.

```jsx
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);
		// 인스턴스 초기화
		this.color = color;
		// 완성된 인스턴스가, 즉 바인딩된 this가 암묵적으로 반환됩니다.
		console.log(this); // ColorRectangle { width: 2, height: 4, color: 'red' }
  }
```

[⬆ Back to top](#목차)

### 7.4 Species

동적 상속에서 보았듯이 extends 키워드 다음에는 클래스뿐만이 아니라 \[[Construct]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있습니다. String, Number, Array 같은 표준 빌트인 객체도 \[[Construct]] 내부 메서드를 갖는 생성자 함수이므로 extends 키워드를 사용하여 확장할 수 있습니다.

```jsx
class MyArray extends Array {
  uniq() {
    return this.filter((v, i, self) => self.indexOf(v) === i);
  }

  average() {
    return this.reduce((pre, cur) => pre + cur, 0) / this.length;
  }
}

const myArray = new MyArray(1, 1, 2, 3);
console.log(myArray);

console.log(myArray.uniq()); // MyArray(3) [1, 2, 3]
console.log(myArray.average()); // 1.75
```

이때 주의할 것은 Array.prototype의 메서드 중에서 map, filter와 같이 **새로운 배열을 반환하는 메서드가 MyArray 클래스의 인스턴스를 반환한다**는 것입니다. 만약 새로운 배열을 반환하는 메서드가 MyArray 클래스의 인스턴스를 반환하지 않고 Array의 인스턴스를 반환하면 MyArray 클래스의 메서드와 메서드 체이닝이 불가능합니다.

```jsx
// 메서드 체이닝
console.log(
  myArray
    .filter((v) => v % 2)
    .uniq()
    .average()
); // 2
```

하지만 myArray 클래스의 uniq 메서드가 MyArray 클래스가 생성한 인스턴스가 아닌 Array가 생성한 인스턴스를 반환하게 하려면 다음과 같이 Symbol.species를 사용하여 정적 접근자 프로퍼티를 추가합니다.

```jsx
class MyArray extends Array {
  // 모든 메서드가 Array 타입의 인스턴스를 반환하도록 한다.
  static get [Symbol.species]() {
    return Array;
  }

  uniq() {
    return this.filter((v, i, self) => self.indexOf(v) === i);
  }

  average() {
    return this.reduce((pre, cur) => pre + cur, 0) / this.length;
  }
}

const myArray = new MyArray(1, 1, 2, 3);

console.log(myArray.uniq() instanceof MyArray); // false;
console.log(myArray.uniq() instanceof Array); // true;
```

이처럼 **Species 패턴은 기본 생성자를 덮어쓰도록 해줍니다**.

[⬆ Back to top](#목차)
