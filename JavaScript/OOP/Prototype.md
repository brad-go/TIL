# Javascript의 프로토타입 (Prototype)

이번 장에서는 객체에 대한 기본 개념과 생성자 함수에 대한 이해를 하고 있다는 기반으로 글을 작성합니다. 객체와 생성자 함수에 대한 이해가 필요하다면 [[JavaScript] 객체](https://www.notion.so/Object-982c5dff95aa480c814addc55c91bfaf)를 먼저 읽고, 다음 글을 읽어주시면 감사하겠습니다!

## 목차

1. [프로토타입이란?](#1-프로토타입이prototype란)
2. [프로토타입에 접근하기](#2-프로토타입에-접근하기)
3. [프로토타입의 constructor 프로퍼티와 생성자 함수](#3-프로토타입의-constructor-프로퍼티와-생성자-함수)
4. [프로토타입의 생성시점](#4-프로토타입의-생성-시점)
5. [프로토타입 체인](#5-프로토타입-체인)
6. [프로토타입의 교체](#6-프로토타입의-교체)
7. [직접 상속](#7-직접-상속)

## 1. 프로토타입이(Prototype)란?

자바스크립트를 공부하거나 사용하다보면 **자바스크립트가 프로토타입 기반 언어(prototype based language)** 라는 말을 들어보셨을 겁니다. 그만큼 자바스크립트에서 이 프로토타입이란 개념은 중요합니다. 따라서 자바스크립트의 동작 원리를 이해하기 위해서는 프로토타입의 개념을 잘 이해하고 있어야 합니다.

### 1.1 자바스크립트의 프로토타입(Prototype)

프로토타입이란 사전적 의미로 원형, 사물의 공통된 모습, 본래의 모습이란 뜻을 가지고 있습니다. 혹은 우리가 흔히 사용하는 어플리케이션 같은 제품 혹은 정보 시스템의 미완성 버전 또는 중요한 기능들이 포함되어 있는 시스템의 초기모델이라고도 이해할 수 있습니다.

조금 더 명확히 이야기해보자면, 자바스크립트의 모든 객체는 자신을 생성한 객체 원형에 대한 숨겨진 연결을 갖습니다. 이때 **자기 자신을 생성하기 위해 사용된 객체 원형(혹은 부모 역할을 담당하는 객체)** 을 프로토타입이라고 합니다. 즉, **어떠한 객체가 만들어지기 위해 그 객체의 기본 구조가 되는 객체를 프로토타입**이라고 합니다.

[⬆ Back to top](#목차)

### 1.2 프로토타입이 필요한 이유?

프로토타입에 대해 느낌이 좀 오시나요? 아직 감이 오지 않으셔도 괜찮습니다. 프로토타입이 어떠한 객체를 만들기 위해 사용된다는 것만 기억하고 다음을 읽어도 좋습니다.

그렇다면 객체를 만들기 위해 왜 프로토타입이 필요할까요? 프로토타입이 어떤 일을 해주길래? 다음 코드를 보면서 알아보겠습니다.

```tsx
function Person(name) {
  this.name = name;
  this.greet = function () {
    return `Hi! My name is ${this.name}.`;
  };
}

const person1 = new Person("Brad");
const person2 = new Person("Anne");

console.log(person1.greet === person2.greet); // false

console.log(person1.greet()); // Hi! My name is Brad.
console.log(person2.greet()); // Hi! My name is Anne.
```

위의 Person 생성자 함수에는 한가지 문제가 있습니다. 바로 **Person 생성자 함수를 통해 객체(인스턴스)를 생성할 때마다 greet 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다**는 것입니다.

생성자 함수로 생성한 객체들은 프로퍼티 구조가 동일합니다. 해당 객체들의 구별은 상태를 나타내는 프로퍼티를 통해서 다른 객체라고 구별할 수 있습니다. 그러나 메서드의 경우 일반적으로 모든 인스턴스가 동일한 내용을 사용하므로, 단 하나만 생성하는 것이 바람직합니다. 위의 코드는 다음과 같은 단점이 있습니다.

- **동일한 메서드를 중복 소유하므로 메모리를 불필요하게 낭비합니다.**
- **인스턴스를 생성할 때마다 메서드를 생성하므로 퍼포먼스에도 악영향을 줍니다.**

이 문제를 프로토타입을 통해 해결할 수 있습니다. **자바스크립트는 프로토타입(Prototype)을 기반으로 상속(Inheritance)을 구현합니다**.

```tsx
function Person(name) {
  this.name = name;
}

// Person 생성자 함수의 prototype 프로퍼티에 greet 메서드를 정의
Person.prototype.greet = function () {
  return `Hi! My name is ${this.name}.`;
};

const person1 = new Person("Brad");
const person2 = new Person("Anne");

console.log(person1.greet === person2.greet); // true

console.log(person1.greet()); // Hi! My name is Brad.
console.log(person2.greet()); // Hi! My name is Anne.
```

모든 인스턴스에서 동일하게 사용할 메서드를 상위(부모) 객체 역할을 하는 프로토타입에 정의해주면, 상속을 통해 중복을 피할 수 있습니다. 즉, 자신의 상태를 나타내는 name 프로퍼티만 개별적으로 소유하고, 내용이 동일한 메서드는 상속을 통해 공유하여 사용하는 것입니다.

이처럼 상속은 코드의 재사용이란 관점에서 매우 유용합니다. 생성자 함수가 생성할 모든 **인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해두면, 생성자 함수가 생성할 모든 인스턴스는 별도의 구현 없이 상위(부모) 객체인 프로토타입의 자산을 공유하여 사용할 수 있습니다.**

[⬆ Back to top](#목차)

# 2. 프로토타입에 접근하기

위에서 프로토타입에 대한 기본 개념과 필요한 이유에 대해 알아봤습니다.

- 프로토타입 객체(또는 줄여서 프로토타입)는 **객체 간의 상속을 구현하기 위해 사**용됩니다.
- 프로토타입은 **어떤 객체의 상위(부모) 객체 역할을 하는 객체로서 다른 객체에 공유 프로퍼티 및 메서드를 제공**합니다.
- 프로토타입을 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있습니다.

이제 프로토타입에 어떻게 접근할 수 있는지에 대해 알아보겠습니다.

**모든 객체는 하나의 프로토타입을 갖습니다**. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있습니다. 즉, 객체와 프로토타입과 생성자 함수는 다음 그림과 같이 연결되어 있습니다.

추가적으로 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype 프로토타입을 통해 프로토타입에 접근할 수 있습니다.

![https://velog.velcdn.com/images/starrypro/post/576356b6-0541-4f36-8f2c-0f2427c9ec27/image.png](https://velog.velcdn.com/images/starrypro/post/576356b6-0541-4f36-8f2c-0f2427c9ec27/image.png)

**프로토타입은 객체 생성 방식에 의해 결정되고, 모든 객체의 \[[Prototype]]이라는 내부 슬롯에 프로토타입의 참조가 저장**됩니다. \[[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입에 접근할 수 있습니다. 정확히 말하자면 자신의 \[[Prototype]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근합니다.

함수도 객체이므로 \[[Prototype]] 내부 슬롯을 갖습니다. 그러나 함수 객체는 일반 객체와는 달리 `prototype` 프로퍼티도 갖습니다. 주의해야할 것은 **prototype 프로퍼티와 프로토타입 객체를 가리키는 \[[Prototype]] 내부 슬롯은 다르다**는 것입니다. 둘다 모두 프로토타입 객체를 가리키지만, 관점의 차이가 있습니다.

### 2.1 \_\_proto\_\_

**모든 객체는 \_\_proto\_\_ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 \[[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있습니다**.

#### \_\_proto\_\_ 접근자 프로퍼티

접근자 프로퍼티는 자체적으로 값을 갖지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티입니다. 자바스크립트는 원칙적으로 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않지만, 일부는 간접적으로 접근이 가능합니다.

Object.prototype의 접근자 프로토타입인 \_\_proto\_\_는 getter/setter 함수라고 부르는 접근자 함수를 통해 \[[Prototype]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당합니다.

```tsx
const obj = {};
const parent = { x: 1 };

// setter 함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;
console.log(obj.x); // 1
```

#### \_\_proto\_\_ 접근자 프로퍼티는 상속을 통해 사용됩니다.

\_\_proto** 접근자 프로퍼티는 각 객체가 직접 소유하는 프로퍼티가 아닌 Object.prototype의 프로퍼티입니다. 모든 객체는 상속을 통해 Object.prototype.\_\_proto** 접근자 프로퍼티를 사용합니다.

자바스크립트의 객체는 자신의 부모 역할을 하는 객체인 프로토타입을 가진다고 했습니다. 그런데 그 프로토타입 객체도 객체이므로 프로토타입을 가집니다. 즉, 모든 객체는 프로토타입의 계층 구조인 프로토타입 체인을 형성하는데, Object.prototype은 프로토타입 체인의 종점입니다.

즉, 프로토타입 체인의 최상위 객체는 Object.prototype이며, 이 객체의 프로퍼티와 메서드는 모든 객체에 상속됩니다.

```tsx
const person = { name: "Brad" };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty("__proto__")); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__")); // { get: f, set: f, enumerable: false, configurable: true }

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true
```

#### \_\_proto\_\_ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

프로토타입에 접근하기 위해 왜 접근자 프로퍼티를 사용해야 할까요?

```tsx
const parent = {};
const child = {};

child.__proto__ = parent;
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
```

**서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 생성되는 것을 방지하기 위해서**입니다. 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 합니다. 즉, 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 합니다.

위 코드 처럼 순환 참조하는 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 프로토타입 체인에서 프로퍼티를 검색할 때 무한 루프에 빠지게 됩니다.

#### \_\_proto\_\_ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장되지 않습니다.

\_\_proto\_\_ 접근자 프로퍼티는 ES5까지 비표준이었지만, 대부분의 브라우저에서 동작했습니다. 그래서 ES6에서 이를 표준으로 채택했습니다.

하지만 코드 내에서 \_\_proto** 접근자 프로퍼티를 직접 사용하는 것은 권장되지 않습니다. 모든 객체가 \_\_proto** 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문입니다. 직접 상속을 통해 다음과 같이 Object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문입니다.

```tsx
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);
console.log(obj.__proto__); // undefined

// 따라서 __proto__보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```

따라서 프로토타입의 참조를 취득하고 싶은 경우 `Object.getPrototypeOf` 메서드와 `Object.setPrototypeOf` 메서드를 사용하는 것이 좋습니다.

```tsx
const obj = {};
const parent = { x: 1 };

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;

// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
```

그러나 MDN에 따르면 사실 \[[Prototype]] 객체 변경은 최신 자바스크립트 엔진이 속성 액세스를 최적화하는 방식의 특성에 따라 모든 브라우저 및 자바스크립트 엔진에서 매우 느린 작업입니다. **성능을 생각한다면 객체 설정을 피하고** `Object.create()`**를 사용하여 새 객체를 만드는 것이 권장**됩니다.

```tsx
const parent = { x: 1 };
const obj = Object.create(parent); // obj.__proto__ = parent;

console.log(Object.getPrototypeOf(obj)); // obj.__proto__;
console.log(obj.x); // 1
```

[⬆ Back to top](#목차)

### 2.2 prototype 프로퍼티

함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킵니다.

```tsx
// 함수 객체는 prototype 프로퍼티를 소유합니다.
(function () {}.hasOwnProperty("prototype")); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않습니다.
({}.hasOwnProperty("prototype")); // false
```

생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드도 prototype 프로퍼티를 소유하지 않으며, 프로토타입도 생성하지 않습니다.

```tsx
const Person = (name) => {
  this.name = name;
};

console.log(Person.hasOwnProperty("prototype")); // false
console.log(Person.prototype); // undefined

const obj = {
  foo() {},
};

console.log(obj.foo.hasOwnProperty("prototype")); // false
console.log(obj.foo.prototype); // undefined
```

[⬆ Back to top](#목차)

### 2.3 \_\_proto\_\_ vs prototype 프로퍼티

모든 객체가 가지고 있는(엄밀히 말하면 Object.prototype으로부터 상속받은) \_\_proto\_\_ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킵니다. 하지만 프로퍼티를 사용하는 주체가 다릅니다.

```tsx
function Person(name) {
  this.name = name;
}

const person = new Person("Brad");
console.log(Person.prototype === person.__proto__); // true
```

- prototype 프로퍼티는 함수 객체가 생성자로 사용될 때 이 함수를 통해 생성된 객체의 부모 역할을 하는 객체, 즉 프로토타입 객체를 가리킵니다.
- \_\_proto\_\_는 객체의 입장에서 자신의 부모 역할을 하는 객체, 즉 프로토타입 객체를 가리킵니다.

| 구분                                | 소유        | 값                | 사용 주체   | 사용 목적                                                                    |
| ----------------------------------- | ----------- | ----------------- | ----------- | ---------------------------------------------------------------------------- |
| \_\_proto\_\_<br /> 접근자 프로퍼티 | 모든 객체   | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용                      |
| prototype<br /> 프로퍼티            | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

[⬆ Back to top](#목차)

# 3. 프로토타입의 constructor 프로퍼티와 생성자 함수

모든 프로토타입은 constructor 프로퍼티를 갖습니다. 이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킵니다. 이 **연결은** **생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이루어집니다**.

```tsx
// 생성자 함수
function Person(name) {
  this.name = name;
}

const person = new Person("Brad");

// Person 생성자 함수에 의해 생성된 객체를 생성한 객체는 Person 생성자 함수다.
console.log(Person.prototype.constructor === Person); // true

// person 객체의 생성자 함수는 Person이다.
console.log(person.constructor === Person); // true
```

결과적으로 **생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결**됩니다.

```tsx
const obj = {};

console.log(obj.constructor === Object); // true
```

리터럴 표기법에 의해 객체를 생성할 경우에도 물론 프로토타입이 존재합니다. 하지만 리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 무엇인지 알 수 없습니다.

그러나 리터럴 표기법에 의해 생성된 객체도 역시 상속을 위해 프로토타입이 필요합니다. 따라서 리터럴 표기법에 의해 생성된 객체도 **가상적인 생성자 함수**를 가집니다. 프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 때문입니다. 다시 말해, **프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍(pair)으로 존재합니다.**

| 리터럴 표기법      | 생성자 함수 | 프로토타입         |
| ------------------ | ----------- | ------------------ |
| 객체 리터럴        | Object      | Object.prototype   |
| 함수 리터럴        | Function    | Function.prototype |
| 배열 리터럴        | Array       | Array.prototype    |
| 정규 표현식 리터럴 | RegExp      | RegExp.prototype   |

[⬆ Back to top](#목차)

# 4. 프로토타입의 생성 시점

**프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성됩니다**. 위에서 말했듯이 프로토타입과 생성자 함수는 단독으로 존재할 수 없고, 언제나 쌍(pair)로 존재하기 때문입니다.

### 4.1 사용자 정의 생성자 함수

**생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성**됩니다.

```tsx
console.log(Person.prototype); // { constructor: f }

function Person(name) {
  this.name = name;
}
```

Person 생성자 함수는 호이스팅에 의해 다른 코드보다 먼저 평가되어 함수 객체가 되고, 이때 프로토타입도 더불어 생성됩니다. 생성된 프로토타입은 Person 생성자 함수의 prototype 프로퍼티에 바인딩됩니다.

생성된 프로토타입은 오직 constructor 프로퍼티만 갖는 객체입니다. 프로토타입도 객체이고, 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 가집니다. 생성된 프로토타입의 프로토타입은 Obejct.prototype입니다.

이처럼 빌트인 생성자 함수가 아닌 **사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입도 더불어 생성**되며, 생성된 프로토타입의 프로토타입은 언제나 `Object.prototype`입니다.

[⬆ Back to top](#목차)

### 4.2 빌트인 생성자 함수와 프로토타입 생성 시점

Object, String, Number, Function, Array, RegExp, Date, Promise 등과 같은 빌트인 생성자 함수도 일반 함수와 마찬가지로 **빌트인 생성자 함수가 생성되는 시점**에 프로토타입이 생성됩니다. 모든 빌트인 생성자 함수는 **전역 객체가 생성되는 시점에 생성**됩니다. 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩됩니다.

이처럼 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재합니다. 이후 **생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 \[[Prototype]] 내부 슬롯에 할당**됩니다. 이로써 생성된 객체는 프로토타입을 상속받습니다.

[⬆ Back to top](#목차)

# 5. 프로토타입 체인

```tsx
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Brad");

// hasOwnProperty는 Object.prototype의 메서드
console.log(me.hasOwnProperty("name")); // true
```

위 코드를 보면 생성된 me 객체는 Person 생성자 함수에 의해 생성되었기에, Person.prototype을 프로토타입으로 가집니다. 그러나 me 객체는 hasOwnProperty라는 Object.prototype이 가진 메서드를 호출할 수 있습니다. 이는 me 객체가 Person.prototype 뿐만 아니라 Object.prototype도 상속받았다는 것을 의미합니다.

```tsx
console.log(Object.getPrototypeOf(person) === Person.prototype); // true
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // tru
```

**자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때, 해당 객체에 접근하려는 프로퍼티가 없다면 \[[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색**합니다.

즉, **프로토타입 상속을 통해 만들어지는 객체들 간의 연관관계**를 **프로토타입 체인**이라고 하며, **프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘**입니다.

### 5.1 프로토타입 체인의 동작 과정

위 코드의 경우 다음과 같은 과정을 거쳐서 메서드를 검색합니다.

1. 먼저 hasOwnProperty 메서드를 호출한 person 객체에서 hasOwnProperty 메서드를 검색합니다. me 객체에는 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라, 다시 말해 \[[Prototype]] 내부 슬롯에 바인딩 되어있는 프로토타입(Person.prototype)으로 이동하여 hasOwnProperty 메서드를 검색합니다.
2. Person.prototype에도 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라, 다시 말해 \[[Prototype]] 내부 슬롯에 바인딩되어 있는 프로토타입(Object.prototype)으로 이동하여 hasOwnProperty 메서드를 검색합니다.
3. Object.prototype에는 hasOwnProperty 메서드가 존재합니다. 자바스크립트 엔진은 Object.prototype.hasOwnProperty 메서드를 호출합니다. 이때 Object.prototype.hasOwnProperty 메서드의 this에는 me 객체가 바인딩됩니다.

```tsx
Object.prototype.hasOwnProperty.call(me, "name");
```

프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype입니다. 따라서 모든 객체는 Object.prototype을 상속받습니다. Object.prototype을 프로토타입 체인의 종점(end of prototype chain)이라고 합니다. Object.prototype의 프로토타입, 즉 \[[Prototype]] 내부 슬롯의 값은 null입니다.

프로토타입 체인의 종점인 Object.prototype에서도 프로퍼티를 검색할 수 없는 경우 `undefined`를 반환하는데, 이때 에러가 발생하지 않는 것에 주의해야 합니다.

```tsx
console.log(person.foo); // undefined
```

이처럼 자바스크립트 엔진은 프로토타입 체인을 따라 프로퍼티/메서드를 검색합니다. 다시 말해, **자바스크립트 엔진은 객체 간의 상속 관계로 이루어진 프로토타입의 계층적인 구조에서 객체의 프로퍼티를 검색**합니다. 따라서 **프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘**이라고 할 수 있습니다.

[⬆ Back to top](#목차)

### 5.2 프로토타입 체인과 스코프 체인

프로토타입 체인이 프로토타입의 계층적인 구조에서 객체의 프로퍼티를 검색하는데 반해, 프로퍼티가 아닌 **식별자는 스코프 체인에서 검색**합니다.다시 말해, **자바스크립트 엔진은 함수의 중첩 관계로 이루어진 스코프의 계층적 구조에서 식별자를 검색**합니다. 따라서 스코프 체인은 검색을 위한 메커니즘이라고 할 수 있습니다.

```tsx
me.hasOwnProperty("name");
```

위 예제의 경우 먼저 스코프 체인에서 me 식별자를 검색합니다. me 식별자는 전역에서 선언되었으므로 전역 스코프에서 검색됩니다. me 식별자를 검색한 다음, me 객체의 프로토타입 체인에서 hasOwnProperty 메서드를 검색합니다.

이처럼 **스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용**됩니다.

[⬆ Back to top](#목차)

# 6. 프로토타입의 교체

프로토타입은 임의의 다른 객체로 변경이 가능합니다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미합니다. 이러한 특징을 활용하여 객체 간의 상속 관계를 동적으로 변경할 수 있습니다. 프로토타입은 생성자 함수 또는 인스턴스에 의해 교체할 수 있습니다.

### 6.1 생성자 함수에 의한 프로토타입의 교체

```tsx
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");

console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

Person.prototype에 객체 리터럴을 할당했습니다. 이는 Person 생성자 함수가 생성할 객체의 프로토타입을 객체 리터럴로 교체한 것입니다.

프로토타입으로 교체한 객체 리터럴에는 constructor 프로퍼티가 없습니다. constructor 프로퍼티는 자바스크립트 엔진이 프로토타입을 생성할 때 암묵적으로 추가한 프로퍼티입니다. 따라서 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나오는 것입니다.

위처럼 **프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴됩니다**. 파괴된 constructor 프로퍼티와 생성자 함수 간의 연결을 되살리기 위해선, 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하여 프로토타입의 constructor 프로퍼티를 되살립니다.

```tsx
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype = {
    constructor: Person,
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");

console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```

[⬆ Back to top](#목차)

### 6.2 인스턴스에 의한 프로토타입의 교체

프로토타입은 생성자 함수의 prototype 프로퍼티뿐만 아니라 인스턴스의 \_\_proto** 접근자 프로퍼티(또는 Object.getPrototypeOf 메서드)를 통해 접근할 수 있습니다. 따라서 인스턴스의 \_\_proto** 접근자 프로퍼티를 통해 프로토타입을 교체할 수 있습니다.

생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것입니다. \_\_proto\_\_ 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것입니다.

```tsx
function Person(name) {
  this.name = name;
}

const me = new Person("Brad");

// 프로토타입으로 교체할 객체
const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

// me 객체의 프로토타입을 parent 객체로 교체
Object.setPrototypeOf(me, parent); // me.__proto__ = parent

me.sayHello(); // Hi! My name is Brad
```

생성자 함수에 의해 프로토타입을 교체할 때와 마찬가지로 프로토타입으로 교체한 객체에는 constructor 프로퍼티가 없으므로 **constructor 프로퍼티와 생성자 함수 간의 연결이 파괴**됩니다. 따라서 프로토타입의 cosntructor 프로퍼티로 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나옵니다.

```tsx
console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

생성자 함수에 의한 프로토타입 교체 때와 달리 Person 생성자 함수의 **prototype 프로퍼티가 교체된 프로토타입을 가리키지 않기 때문에**, 객체 리터럴에 constructor 프로퍼티를 추가하고, 생성자 함수의 prototype 프로퍼티도 재설정해서 생성자 함수와 프로토타입 간의 연결을 되살려야 합니다.

```tsx
function Person(name) {
  this.name = name;
}

const me = new Person("Brad");

// 프로토타입으로 교체할 객체
const parent = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체
Object.setPrototypeOf(me, parent); // me.__proto__ = parent

me.sayHello(); // Hi! My name is Brad

console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킴
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```

프로토타입을 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는 것은 꽤나 번거롭습니다. 따라서 프로토타입은 직접 교체하지 않는 것이 좋습니다. 상속 관계를 인위적으로 설정하려면 뒤에서 다룰 **직접 상속**을 이용하는 것이 더 편리하고 안전합니다.

[⬆ Back to top](#목차)

# 7. 직접 상속

### 7.1 Object.create에 의한 직접 상속

Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성합니다.

```tsx
/**
 * @param {Object} prototype - 생성할 객체의 프로토타입으로 지정할 객체
 * @param {Object} [propertiesObject] - 생성할 객체의 프로퍼티를 갖는 객체
 * @returns {Object} 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체
**/
Object.create(prototype[, propertiesObject])
```

Object.create 메서드의 첫번째 매개변수에는 생성할 객체의 프로토타입으로 지정할 객체를 전달합니다. 두 번째 매개변수에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객체를 전달합니다. 이 객체의 형식은 Object.defineProperties 메서드의 두 번째 인수와 동일합니다. 두 번째 인수는 옵션이므로 생략 가능합니다.

예제를 보면서 더 알아보겠습니다.

```tsx
// 프로토타입이 null인 객체를 생성. 생성된 객체는 프로토타입 체인의 종점에 위치
// obj -> null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true
// Object.prototype을 상속받지 못해서 빌트인 메서드 사용 불가
// console.log(obj.toString());

// obj -> Object.prototype -> null
// obj = {}; 와 동일
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj -> Object.prototype -> null
// obj = { x: 1 }; 와 동일
obj = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true },
});
// 위 코드는 아래와 동일
// obj = Object.create(Object.prototype);
// obj.x = 1;
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = { x: 10 };
// 임의의 객체를 직접 상속 받음
// obj -> myProto -> Object.prototype -> null
obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

function Person(name) {
  this.name = name;
}
// obj -> Person.prototype -> Obejct.prototype -> null
// obj = new Person('Brad')와 동일하다
obj = Object.create(Person.prototype);
obj.name = "Brad";
console.log(obj.name); // Brad
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```

이처럼 Object.create 메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성합니다. 즉, 객체를 생성하면서 직접적으로 상속을 구현하는 것입니다. 다음과 같은 장점이 있습니다.

- **new 연산자 없이 객체 생성**
- **프로토타입을 지정하면서 객체 생성**
- **객체 리터럴에 의해 생성된 객체도 상속받을 수 있습니다.**

추가적으로 Object.prototype의 빌트인 메서드는 모든 객체의 프로토타입 체인의 종점, 즉 Object.prototype의 메서드이므로 모든 객체가 상속받아 호출할 수 있습니다.

```tsx
const obj = { a: 1 };
obj.hasOwnProperty("a"); // true
obj.propertyIsEnumerable("a"); // true
```

하지만 Object.prototype의 빌트인 메서드를 객체가 직접 호출하는 것은 권장되지 않습니다. Object.create를 통해 프로토타입 체인의 종점에 위치하는 객체를 생성할 수 있기 때문입니다. 프로토타입 체인의 종점에 위치하는 객체는 Object.prototype의 빌트인 메서드를 사용할 수 없습니다.

```tsx
const obj = Object.create(null);
obj.a = 1;

console.log(Object.getPrototypeOf(obj) === null); // true

// obj는 프로토타입 체인의 종점에 위치해서 Object.prototype의 빌트인 메서드를 사용할 수 없음
console.log(obj.hasOWnProperty("a")); // TypeError: obj.hasOwnProperty is not a function
```

따라서 위와 같은 에러를 발생시킬 위험을 없애기 위해 Object.prototype의 빌트인 메서드는 다음과 같이 간접적으로 호출하는 것이 좋습니다.

```tsx
const obj = Object.create(null);
obj.a = 1;

console.log(Object.prototype.hasOwnProperty.call(obj, 'a'); // true
```

[⬆ Back to top](#목차)

### 7.2 객체 리터럴 내부에서 \_\_proto\_\_에 의한 직접 상속

Object.create 메서드에 의한 직접 상속은 여러 장점이 있지만, 두 번째 인자로 프로퍼티를 정의하는 것은 번거롭습니다. 일단 객체를 생성한 이후 프로퍼티를 추가하는 방법도 있으나 이또한 깔끔한 방법은 아닙니다.

ES6에서는 객체 리터럴 내부에서 \_\_proto\_\_ 접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있습니다.

```tsx
const myProto = { x: 10 };

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속
const obj = {
  y: 20,
  // 객체를 직접 상속
  // obj -> myProto -> Object.prototype -> null
  __proto__: myProto,
};
// const obj = Object.create(myProto, {
//   y: { value: 20, writable: true, enumerable: true, configurable: true },
// });

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

[⬆ Back to top](#목차)

### 참고

- [Javascript 기초 - Object prototype 이해하기](http://insanehong.kr/post/javascript-prototype/#toc_291)
- [Prototype | PoiemaWeb](https://poiemaweb.com/js-prototype)
