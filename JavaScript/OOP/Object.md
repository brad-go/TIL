# JavaScript의 객체(Object)

## 목차

1. [객체(Object)란?](#1-객체object란)
2. [객체 생성 방법](#2-객체-생성-방법)
3. [프로퍼티](#3-프로퍼티)
4. [메서드](#4-메서드)

## 1. 객체(Object)란?

### 1.1 자바스크립트 객체의 실체

자바스크립트에서 객체를 생각한다면 흔히 다음과 같은 코드를 생각할 수 있습니다.

```tsx
const person = {
  name: "Brad",
  age: 28,
};
```

일반적으로 중괄호로 감싸져서, 그 안에 프로퍼티나 메서드를 가진 모습을 하고 있습니다. 그러나 **사실 우리가 자주 사용하는 함수도 객체**입니다. 엄밀히 말하자면, 함수는 자바스크립트의 일급 객체이고, 일반 객체와는 달리 호출할 수 있는 객체(callable)라는 차이가 있습니다.

함수가 객체라니? 이게 무슨 소리야?! 라고 할 수 있지만, 다음의 코드를 한 번 보겠습니다.

```tsx
function foo() {}

foo(); // 일반적인 함수 호출
new foo(); // 에러가 나지 않습니다.
```

새로운 객체를 생성하기 위한 키워드 `new`를 사용해도 에러가 나지 않고 동작합니다. 함수가 객체가 가지는 내부 메서드 \[[Construct]]를 가지고 있기 때문입니다. 즉, 함수는 객체로 볼 수 있습니다. (화살표 함수의 경우 \[[Construct]]를 가지지 않습니다.)

그렇다면 함수만 객체일까요? 사실 **자바스크립트는 객체 기반의 프로그래밍 언어이며, 자바스크립트를 구성하는 거의 “모든 것"이 객체**입니다. 원시 값을 제외한 나머지 값(함수, 배열, 정규 표현식 등)은 모두 객체입니다.

[⬆ Back to top](#목차)

### 1.2 원시 값과 객체의 비교

자바스크립트가 제공하는 데이터 타입(숫자, 문자열, 불리언, null, undefined, 심벌, 객체 타입)은 크게 **원시 타입(primitive)** 과 **객체 타입(object/referece type)** 으로 구분할 수 있습니다.

원시 타입은 단 하나의 값만 나타내지만, 객체 타입(object/reference type) 은 다양한 타입의 값(원시 값 또는 다른 객체)을 하나의 단위로 구성한 복합적인 자료구조입니다. 이렇게 구분하는 이유가 뭘까요? 원시 타입과 객체 타입은 크게 세 가지 측면에서 다른 점을 찾을 수 있습니다.

- **원시 값(원시 타입의 값)은 변경 불가능한 값(immutable value)** 이지만, **객체(참조) 타입의 값은 변경 가능한 값(mutable value)** 입니다.
- **원시 값을 변수에 할당하면 변수(확보된 메모리 공간)에는 실제 값이 저장**되지만, **객체를 변수에 할당하면 변수(확보된 메모리 공간)에는 참조 값이 저장**됩니다.
- 원시 값을 갖는 변수를 다른 변수에 할당하면 원본의 **원시 값이 복사되어 전달**됩니다. 이를 **값에 의한 전달(pass by value)** 라고 합니다. 이에 비해 객체를 가리키는 변수를 다른 변수에 할당하면 원본의 **참조 값이 복사되어 전달**됩니다. 이를 **참조에 의한 전달(pass by reference)** 이라고 합니다.

|           | 원시 값                       | 객체                                |
| --------- | ----------------------------- | ----------------------------------- |
| 구성      | 단 하나의 값                  | 복합적인 자료구조                   |
| 변경      | 불가능(immutable value)       | 가능(mutable value)                 |
| 저장 방식 | 실제 값                       | 참조 값                             |
| 할당 방식 | 값에 의한 전달(pass by value) | 참조에 의한 전달(pass by reference) |

[⬆ Back to top](#목차)

### 1.3 객체 알아보기

위에서 본 person 객체를 다시 한 번 살펴보겠습니다. **자바스크립트의 객체는 키(key)과 값(value)으로 구성된 프로퍼티(Property)들의 집합입니다.**

```tsx
const person = {
  name: "Brad", // 프로퍼티 키(name)와 값('Brad')
  age: 28,
  growOld: function () {
    // 메서드
    this.age++;
  },
};
```

자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있습니다. 위에서 말했듯이, 자바스크립트의 함수는 일급 객체이므로 값으로 취급할 수 있습니다. 위의 `growOld`처럼 **프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메서드(method)** 라고 부릅니다.

이처럼 객체는 프로퍼티와 메서드로 구성된 집합체입니다. 프로퍼티와 메서드의 역할은 다음과 같으며, 객체는 프로퍼티와 메서드를 모두 포함할 수 있기 때문에 **상태와 동작을 하나의 단위로 구조화할 수 있어서 유용**합니다.

- **프로퍼티**: 객체의 상태를 나타내는 값(data)
- **메서드**: 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작(behavior)

[⬆ Back to top](#목차)

## 2. 객체 생성 방법

자바와 같은 클래스 기반 객체 지향 언어는 클래스를 사전에 정의하고 필요한 시점에 new 연산자를 사용하여 인스턴스를 생성하는 방식으로 객체를 생성하빈다. 하지만 자바스크립트는 프로토타입 기반 객체지향 언어로서 클래스 기반 객체지향 언어와는 달리 다양한 객체 생성 방법을 지원합니다.

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

Object.create와 클래스 방식은 다음에 다루기로 하고, 지금은 위 세 가지 생성 방식에 대해서 알아보겠습니다.

### 2.1 객체 리터럴

객체 생성 방법 중에 가장 일반적이고 간단한 방법으로 객체 리터럴은 자바스크립트의 유연함과 강력함을 대표하는 객체 생성 방식입니다.

클래스 기반 객체 지향 언어와 비교할 때, 매우 간편하게 객체를 생성할 수 있습니다. 객체를 생성하기 위해 클래스를 먼저 정의하고 new 연산자와 함께 생성자를 호출할 필요가 없습니다. 숫자 값이나 문자열을 만드는 것과 유사하게 리터럴로 객체를 생성합니다.

객체 리터럴에 프로퍼티를 포함시켜 객체를 생성함과 동시에 프로퍼티를 만들 수도 있고, 객체를 생성한 이후에 프로퍼티를 동적으로 추가할 수도 있습니다.

중괄호({})를 사용하여 객체를 생성하는데, 중괄호 내에 0개 이상의 프로퍼티를 정의합니다. 변수에 할당되는 시점에 자바스크립트 엔진은 객체 리터럴을 해석해 객체를 생성합니다.

```tsx
const person = {
  name: "Brad",
  age: 28,
  growOld() {
    this.age++;
  },
};

console.log(typeof person); // object
console.log(person); // { name: 'Brad', age: 28, growOld: [Function: growOld] }

const empty = {}; // 프로퍼티를 정의하지 않으면 빈 객체가 생성됩니다.
console.log(typeof empty); // object
```

주의할 점은 **객체 리터럴의 중괄호는 코드 블록을 의미하지 않는다**는 것입니다. 코드 블록의 닫는 중괄호 뒤에는 세미 콜론을 붙이지 않지만, 객체 리터럴은 값으로 평가되기 때문에 닫는 중괄호 뒤에 세미콜론을 붙여줍니다.

[⬆ Back to top](#목차)

### 2.2 Object 생성자 함수

new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환합니다. 빈 객체를 생성한 이후 프로퍼티 또는 메서드를 추가하여 객체를 완성할 수 있습니다.

```tsx
const person = new Object(); // 빈 객체의 생성

// 프로퍼티 추가
person.name = "Brad";
person.age = 28;
person.growOld = function () {
  this.age++;
};

console.log(person); // { name: 'Brad', age: 28, growOld: [Function: growOld] }
```

Object 생성자 함수의 인자로 값을 넘겨서 객체를 생성할 수도 있습니다. 하지만 그렇게 객체를 생성하는 방법은 객체 리터럴을 사용하는 것이 더 간편합니다. Object 생성자 함수 방식은 특별한 이유가 없다면 그다지 유용해보이지 않습니다.

사실 **객체 리터럴 방식으로 생성된 객체는 결국 빌트인(Built-in) 함수인 Object 생성자 함수로 객체를 생성하는 것을 단순화시킨 축약 표현(short-hand)** 입니다. 다시 말해, 자바스크립트 엔진은 객체 리터럴로 객체를 생성하는 코드를 만나면 내부적으로 Object 생성자 함수를 사용하여 객체를 생성합니다. 따라서 개발자가 일부러 Object 생성자 함수를 사용해 객체를 생성해야 할 일은 거의 없다고 볼 수 있습니다.

[⬆ Back to top](#목차)

### 2.3 생성자 함수

#### 객체 리터럴에 의한 객체 생성 방식의 문제점

객체 리터럴에 의한 객체 생성 방식은 직관적이고 간편했습니다. 하지만 객체 리터럴에 의한 객체 생성 방식은 단 하나의 객체만 생성합니다. 따라서 **동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야하므로 비효율적**입니다.

```tsx
const person1 = {
  name: "Brad",
  age: 28,
  greeting() {
    return `Hi! My name is ${this.name}. I'm ${this.age} years old.`;
  },
};

console.log(person1.greeting()); // Hi! My name is Brad. I'm 28 years old.

const person2 = {
  name: "Anne",
  age: 24,
  greeting() {
    return `Hi! My name is ${this.name}. I'm ${this.age} years old.`;
  },
};

console.log(person2.greeting()); // Hi! My name is Anne. I'm 24 years old.
```

객체는 프로퍼티를 통해 객체 고유의 상태(state)를 표현합니다. 그리고 메서드를 통해 프로퍼티를 참조하고 조작하는 동작(behavior)을 표현합니다. 따라서 **프로퍼티는 객체마다 값이 다를 수 있지만, 메서드는 내용이 동일한 경우가 일반적**입니다.

위의 사람을 표현한 객체인 person1과 person2는 프로퍼티 구조가 동일합니다. 객체 고유의 상태 데이터인 `name`과 `age`는 다를 수 있지만, `greeting` 메서드는 완전히 동일합니다.

하지만 객체 리터럴에 의해 객체를 생성하는 경우 프로퍼티 구조가 동일함에도 불구하고, 매번 같은 프로퍼티와 메서드를 기술해야합니다. 객체가 한두 개라면 괜찮겠지만, 만약 수백 개의 객체를 생성해야 한다면 어떻게 해야할까요?

#### 생성자 함수에 의한 객체 생성

생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 **프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성**할 수 있습니다.

```tsx
function Person(name, age) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킵니다.
  this.name = name;
  this.age = age;
  this.greeting = function () {
    return `Hi! My name is ${this.name}. I'm ${this.age} years old.`;
  };
}

const person1 = new Person("Brad", 28);
const person2 = new Person("Anne", 24);

console.log(person1.greeting()); // Hi! My name is Brad. I'm 28 years old.
console.log(person2.greeting()); // Hi! My name is Anne. I'm 24 years old.
```

- 생성자 함수의 이름은 일반적으로 대문자로 시작하는 Pascal Case를 사용해서 생성자 함수임을 인식하도록 도움을 줍니다.
- 프로퍼티 또는 메서드 명 앞에 기술한 `this`는 생성자 함수가 생성할 **인스턴스(instance)** 를 가리킵니다.
- this에 연결(바인딩)되어 있는 프로퍼티와 메서드는 `public`(외부에서 참조 가능)합니다.
- 생성자 함수 내에서 선언된 일반 변수는 `private`(외부에서 참조 불가능)합니다. 즉, 생성자 함수 내부에서는 자유롭게 접근이 가능하나 외부에서 접근할 수 없습니다.

```tsx
function Person(name, age) {
  const married = false; // private
  this.name = name; // public
  this.age = age; // public
  this.greeting = function () {
    // public
    return `Hi! My name is ${this.name}. I'm ${this.age} years old.`;
  };
}

const person = new Person("Brad", 28);

console.log(person); // Person { name: 'Brad', age: 28, greeting: [Function (anonymous)] }
console.log(person.name); // 'Brad'
console.log(person.married); // undefined
```

생성자 함수는 이름 그대로 **객체(인스턴스)를 생성하는 함수**입니다. 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 **new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작**합니다. 만약 new 연산자 없이 호출한다면 일반 함수로 동작합니다.

```tsx
// new 연산자 없이 호출 시, 일반 함수로 동작
const person3 = Person("Albert", 31);

// 일반 함수로 호출된 Person은 반환문이 없으므로 암묵적으로 undefiend를 반환한다.
console.log(person3); // undefined

// 일반 함수로 호출된 Person 내의 this는 전역 객체를 가리킨다.
console.log(name, age); // 'Albert', 31
```

#### 생성자 함수의 인스턴스 생성 과정

위에서 생성자 함수가 객체(인스턴스)를 생성할 수 있다는 것을 알아보았습니다. 그렇다면 함수가 어떻게 객체를 생성할 수 있는 걸까요?

먼저 생성자 함수의 함수 몸체에서 수행해야 하는 것이 무엇인지 생각해봅시다. 생성자 함수는 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로서 동작하여 다음과 같은 일을 합니다.

- **인스턴스를 생성**
- **생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)**

생성자 함수가 인스턴스를 생성하는 것은 필수이고, 생성된 인스턴스를 초기화하는 것은 옵션입니다.

```tsx
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greeting = function () {
    return `Hi! My name is ${this.name}. I'm ${this.age} years old.`;
  };
}

const person = new Person("Brad", 28); // 이름이 Brad고, 나이가 28인 Person 객체 생성
```

생성자 함수 내부의 코드를 살펴보면 this에 프로퍼티를 추가하고, 필요에 따라 전달된 인수를 프로퍼티의 초기값으로서 할당하여 인스턴스를 초기화합니다. 하지만 인스턴스를 생성하고 반환하는 코드는 보이지 않습니다.

자바스크립트 엔진은 **암묵적인 처리를 통해 인스턴스를 생성하고 반환**합니다. new 연산자와 함께 생성자 함수를 호출하면 자바스크립트 엔진은 다음과 같은 과정을 거쳐 암묵적으로 인스턴스를 생성하고 인스턴스를 초기화한 후 암묵적으로 인스턴스를 반환합니다.

> **바인딩**
> 바인딩이란 식별자와 값을 연결하는 과정을 의미합니다. 예를 들어, 변수 선언은 변수 이름(식별자)과 확보된 메모리 공간의 주소를 바인딩하는 것입니다. this 바인딩은 this(키워드로 분류되지만 식별자 역할을 합니다)와 this가 가리킬 객체를 바인딩하는 것입니다.

```tsx
function Person(name, age) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩 됩니다.
  console.log(this); // Person {}

  // 2. this에 바인딩되어 있는 인스턴스를 초기화합니다.
  this.name = name;
  this.age = age;
  this.greeting = function () {
    return `Hi! My name is ${this.name}. I'm ${this.age} years old.`;
  };

  // 3. 완성된 인스턴스(바인딩된 this)가 암묵적으로 반환됩니다.
}
```

만약 this가 아닌 다른 객체를 명시적으로 반환하면 this가 반환되지 못하고 return 문에 명시한 객체가 반환됩니다.

```tsx
function Person(name, age) {
	...
	return {};
}

const person = new Person('Brad', 28);
console.log(person); // {}
```

그러나 명시적으로 원시 값을 반환하면 원시 값은 무시되고 암묵적으로 this가 반환됩니다.

```tsx
function Person(name, age) {
	...
	return 'Brad';
}

const person = new Person('Brad', 28);
console.log(person); // Person { name: 'Brad', age: 28, greeting: [Function (anonymous)] }
```

이처럼 생성자 함수 내부에서 명시적으로 this가 아닌 다른 값을 반환하는 것은 생성자 함수의 기본 동작을 훼손합니다. 따라서 **생성자 함수 내부에서 return 문을 반드시 생략해야 합니다**.

[⬆ Back to top](#목차)

## 3. 프로퍼티

**객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다**고 했습니다.

```tsx
const person = {
  name: "Brad", // 프로퍼티 키는 name, 프로퍼티 값은 'Brad'
  age: 28, // 프로퍼티 키는 age, 프로퍼티 값은 28
};
```

프로퍼티를 나열할 때는 쉼표(,)로 구분합니다. 일반적으로 마지막 프로퍼티 뒤에는 쉼표를 사용하지 않으나 사용해도 좋습니다.

프로퍼티 키와 프로퍼티 값으로 사용할 수 있는 값은 다음과 같습니다.

- **프로퍼티 키**: 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- **프로퍼티 값**: 자바스크립트에서 사용할 수 있는 모든 값

### 3.1 프로퍼티 키

프로퍼티 키는 **프로퍼티 값에 접근할 수 있는 이름으로서 식별자 역할**을 합니다. 프로퍼티 키에 문자열이나 심벌 값 이외의 값을 지정하면 암묵적으로 타입이 변환되어 문자열이 됩니다. 프로퍼티 키는 웬만하면 식별자 네이밍 규칙을 따르는 것이 좋습니다. 반드시 식별자 네이밍 규칙을 따라야 하는 건 아니지만, **식별자 네이밍 규칙을 따르지 않는 이름에는 따옴표를 사용**해야 합니다.

아래 예제의 경우 last-name은 식별자 네이밍 규칙을 준수하지 않습니다. 자바스크립트 엔진은 따옴표를 생략한 last-name을 - 연산자가 있는 표현식으로 해석합니다.

```tsx
const person = {
	// 식별자 네이밍 규칙을 준수하는 프로퍼티 키
	firstName: 'Brad',
	// 식별자 네이밍 규칙을 준수하지 않는 프로퍼티 키
	last-name: 'Go' // SyntaxError: Unexpected token -
};
```

[⬆ Back to top](#목차)

### 3.2 프로퍼티 값 읽기

객체의 프로퍼티 값에 접근하는 방법은 **마침표(.) 표기법**과 **대괄호([]) 표기법**이 있습니다.

```tsx
const person = {
  name: "Brad",
};

console.log(person.name); // Brad
console.log(person["name"]); // Brad
```

프로퍼티 키가 유효한 자바스크립트 이름이고 예약어가 아닌 경우 프로퍼티 값은 마침표 표기법, 대괄호 표기법 모두 사용할 수 있습니다. 대괄호 표기법을 사용하는 경우 **대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열**이어야 합니다.

[⬆ Back to top](#목차)

### 3.3 프로퍼티 값 갱신

객체가 소유하고 있는 프로퍼티에 새로운 값을 할당하면 프로퍼티 값은 갱신됩니다.

```tsx
const person = {
  name: "Brad",
};

// person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티의 값이 갱신됩니다.
person.name = "Albert";

console.log(person);
{
  name: "Albert";
}
```

[⬆ Back to top](#목차)

### 3.4 프로퍼티 동적 생성

객체가 소유하고 있지 않은 프로퍼티 키에 값을 할당하면 주어진 키와 값으로 프로퍼티를 생성하여 객체에 추가합니다.

```tsx
const person = {
  name: "Brad",
};

person.age = 28;

console.log(person); // { name: 'Brad', age: 28 }
```

[⬆ Back to top](#목차)

### 3.5 프로퍼티 삭제

delete 연산자를 사용하면 객체의 프로퍼티를 삭제할 수 있습니다. 이때 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야 합니다. 만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러 없이 무시됩니다.

```tsx
const person = {
  name: "Brad",
  age: 28,
};

delete person.age; // person 객체 내에 age 프로퍼티가 존재하므로 삭제 가능
delete person.address; // person 객체에 address가 존재하지 않으므로 삭제 불가능. 에러 발생 x

console.log(person); // { name: 'Brad' }
```

[⬆ Back to top](#목차)

## 4. 메서드

자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티가 사용할 수 있다고 했습니다. 또, 자바스크립트의 함수는 일급 객체라고 했습니다. 따라서 함수는 값으로 취급할 수 있기 때문에 프로퍼티 값으로 사용할 수 있습니다.

### 4.1 메서드 정의

프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드(method)라고 부릅니다. 즉, 메서드는 객체에 묶여 있는 함수를 의미합니다.

```tsx
const person = {
  name: "Brad", // 프로퍼티
  greeting: function () {
    // 메서드
    return `Hi! My name is ${this.name}.`; // this는 person을 가리킴
  },
};

console.log(person.greeting()); // Hi! My name is Brad.
```

[⬆ Back to top](#목차)

### 4.2 메서드 축약 표현

ES5 까지는 위와 같이 프로퍼티 값으로 함수를 할당해서 메서드를 정의했습니다. 그러나 ES6에서는 메서드를 정의할 때, function 키워드를 생략한 축약 표현을 사용할 수 있습니다.

사실 ES6 이전에는 메서드에 대한 명확한 정의가 없었습니다. 위에서 말했듯이 객체에 바인딩된 함수를 일컫는 의미로 사용했지만, **ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미**합니다.

```tsx
const person = {
  name: "Brad",
  greeting() {
    return `Hi! My name is ${this.name}.`;
  },
};

console.log(person.greeting()); // Hi! My name is Brad.
```

[⬆ Back to top](#목차)

### 4.3 ES6에서 정의한 메서드

갑자기 메서드가 아니라니 당황스러울 수 있습니다. 다음 코드를 보면 foo나 bar나 똑같이 동작하는데, 어떤 차이가 있는걸까요?

```tsx
const obj = {
  x: 1,
  foo() {
    // 메서드
    return this.x;
  },
  bar: function () {
    // 메서드가 아닌 일반 함수
    return this.x;
  },
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

우선 함수에 대해 조금 더 알아봅시다. 앞서 함수는 객체라고 했습니다. 함수는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드는 물론, 함수 객체만을 위한 내부 슬롯과 \[[Call]], \[[Constructor]] 같은 내부 메서드를 추가로 가지고 있습니다.

내부 메서드 \[[Call]]을 갖는 함수 객체를 callbale이라 하며, \[[Constructor]]를 가지는 함수 객체를 constructor, 갖지 않는 함수 객체를 non-constructor라고 부릅니다. callble은 호출할 수 있는 객체, 즉 함수를 말하며, constructor는 생성자 함수로서 호출할 수 있는 함수, non-constructor는 객체를 생성자 함수로서 호출할 수 없는 함수를 의미합니다.

호출할 수 없는 객체는 함수가 아니므로 함수로서 기능하는 객체, 즉 함수 객체는 반드시 callble이어야 합니다. 따라서 모든 함수 객체는 내부 메서드 \[[Call]]을 가지고 있으므로 호출할 수 있습니다. 하지만 모든 함수 객체가 \[[Contructor]]를 가지진 않으므로, 함수 객체는 constructor 이거나 non-constructor일 수 있습니다.

- **constructor**: 함수 선언문, 함수 표현식, 클래스(클래스도 함수)
- **non-constructor**: 메서드(ES6 메서드 축약 표현), 화살표 함수

#### 생성자 함수로서의 호출

느낌이 오시나요? 위의 코드에서 bar가 메서드가 아닌 이유는 **ES6 사양에서 정의한 메서드는 인스턴스를 생성할 수 없는 non-constructor**이기 때문입니다. 따라서 ES6 메서드는 생성자 함수로서 호출할 수 없습니다.

```tsx
new obj.foo(); // TypeError: obj.foo is not a constructor
new obj.bar(); // bar {}
```

#### 프로토타입의 생성

ES6 메서드는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않습니다.

```tsx
obj.foo.hasOwnProperty("prototype"); // false;
obj.bar.hasOwnProperty("prototype"); // true;
```

#### super 키워드의 사용

ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 \[[HomeObject]]를 갖습니다. super 참조는 내부 슬롯 \[[HomeObject]]를 사용하여 수퍼 클래스의 메서드를 참조하므로 내부 슬롯 \[[HomeObject]]를 갖는 ES6 메서드는 super 키워드를 사용할 수 있습니다.

```tsx
const base = {
  name: "Brad",
  greeting() {
    return `Hi! My name is ${this.name}.`;
  },
};

const derived = {
  __proto__: base,
  greeting() {
    return `${super.greeting()} How are you doing?`;
  },
};

console.log(derived.greeting()); // Hi! My name is Brad. How are you doing?
```

그러나 ES6 메서드가 아닌 함수는 super 키워드를 사용할 수 없습니다. ES6 메서드가 아닌 함수는 내부 슬롯 \[[HomeObject]]를 갖지 않기 때문입니다.

```tsx
const derived = {
  __proto: base,
  gretting: function () {
    return `${super.greeting()} How are you doing?`;
  },
};
```

이처럼 ES6 메서드는 본연의 기능(super)을 추가하고 의미적으로 맞지 않는 기능(contructor)은 제거했습니다. 따라서 **메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES6 이전의 방식은 사용하지 않는 것이 좋습니다**.

[⬆ Back to top](#목차)
