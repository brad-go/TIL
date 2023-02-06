# 객체 리터럴

# 1. 객체란?

자바스크립트는 객체(object)기반의 프로그래밍 언어이며, 자바스크립트를 구성하는 거의 “모든 것”이 객체입니다. 원시 값을 제외한 나머지 값(함수, 배열, 정규 표현식 등)은 모두 객체입니다.

원시 타입(기본형)은 단 하나의 값만 나타내지만, 객체 타입(참조형)은 **다양한 타입의 값(원시값 또는 다른 객체)을 하나의 단위로 구성한 복합적인 자료구조**입니다. 또한 **원시 타입의 값은 변경 불가능한 값(immutable value)** 이지만 **객체 타입의 값, 즉 객체는 변경 가능한 값(mutable value)** 입니다.

**객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키(key)와 값(value)으로 구성됩니다**.

```jsx
var person = {
  name: "Brad",
  age: 29,
};
```

자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있습니다. 심지어 함수도 일급 객체이므로 값으로 취급이 가능해 프로퍼티 값으로 사용할 수 있습니다. **프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메서드(method)라고 부릅니다**.

이처럼 **객체는 프로퍼티와 메서드로 구성된 집합체**입니다. 프로퍼티와 메서드의 역할은 다음과 같습니다.

- **프로퍼티**: 객체의 상태를 나타내는 값(data)
- **메서드**: 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작(behavior)

따라서 **객체는 상태(프로퍼티)와 동작(메서드)을 하나의 단위로 구조화할 수 있어 유용**합니다.

# 2. 객체 리터럴에 의한 객체 생성

자바스크립트는 프로토타입 기반 객체지향 언어로서 클래스 기반 객체지향 언어와 달리 다양한 객체 생성 방법을 지원합니다.

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스

위처럼 여러가지 생성 방법이 있지만, 이번에는 가장 일반적이고 간단한 객체 리터럴을 사용하는 방법에 대해 알아보겠습니다.

**객체 리터럴은 중괄호(**`{ … }`**) 내에 0개 이상의 프로퍼티를 정의**합니다. 변수에 할당되는 시점에 자바스크립트 엔진은 객체 리터럴을 해석해 객체를 생성합니다.

```jsx
var person = {
  name: 'Brad',
  sayHello: function() {
    console.log(`Hello! My name is ${this.name}.`);
  },
};

console.log(typeof person); // object
console.log(person); { name: 'Brad', sayHello: f };
```

주의할 것은 **객체 리터럴의 중괄호는 코드 블록을 의미하지 않는다**는 것입니다. **객체 리터럴은 값으로 평가되는 표현식**이기 때문에 중괄호 뒤에 세미콜론을 붙여줘야 합니다.

# 3. 프로퍼티

**객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구분됩니다**.

```jsx
var person = {
  // 프로퍼티 키는 name, 프로퍼티 값은 'Brad'
  name: "Brad",
  // 프로퍼티 키는 age, 프로퍼티 값은 29
  age: 29,
};
```

프로퍼티 키와 프로퍼티 값으로 사용할 수 있는 값은 다음과 같습니다.

- **프로퍼티 키**: 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- **프로퍼티 값**: 자바스크립트에서 사용할 수 있는 모든 값

**프로퍼티 키는 프로퍼티 값에 접근할 수 있는 이름으로서 식별자 역할을 합니다**. 만약 **식별자 네이밍 규칙을 따르지 않는다면 해당 프로퍼티 키는 따옴표로 감싸줘야 합니다**. 식별자 네이밍 규칙을 따르지 않는 프로퍼티 키를 사용하면 번거로운 일이 발생하므로 가급적 식별자 네이밍 규칙을 준수해서 사용하는 것이 권장됩니다.

```jsx
var person = {
  firstName: "Brad",
  "last-name": "Go",
};

console.log(person); // { firstName: 'Brad', last-name: 'Go' };
```

**문자열 또는 문자열로 평가할 수 있는 식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있습니다**. 이 경우에는 프로퍼티 키로 사용할 표현식을 대괄호([…])로 감싸야 합니다.

```jsx
var obj = {};
var key = "hello";

// es5. 프로퍼티 키 동적으로 생성
obj[key] = "world";
// es6. 계산된 프로퍼티 이름
// var obj = { [key]: 'world' };

console.log(obj); // { hello: "world" }
```

**프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 됩니다**. 예를 들어, 프로퍼티 키로 숫자 리터럴을 사용하면 따옴표는 붙지 않지만 내부적으로는 문자열로 변환됩니다.

```jsx
var foo = {
  0: 1,
  1: 2,
  2: 3,
};

console.log(foo); // { 0: 1, 1: 2, 2: 3 }
```

# 4. 메서드

**프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메서드라고 부릅니다**. 즉, 메서드는 객체에 묶여 있는 함수를 의미합니다.

```jsx
var circle = {
  radius: 5, // 프로퍼티
  getDiameter: function () {
    // 메서드
    return 2 * this.radius; // this는 circle을 가리킵니다.
  },
};

console.log(circle.getDiameter()); // 10
```

# 5. 프로퍼티 접근

프로퍼티에 접근하는 방법은 다음과 같이 두 가지입니다.

- 마침표 프로퍼티 접근 연산자(.)를 사용하는 **마침표 표기법(dot notation)**
- 대괄호 프로퍼티 접근 연산자([ … ])를 사용하는 **대괄호 표기법(bracket notation)**

프로퍼티 키가 식별자 네이밍 규칙을 준수하는 이름, 즉 자바스크립트에서 사용 가능한 유효한 이름이라면 마침표 표기법과 대괄호 표기법을 모두 사용해 값에 접근할 수 있습니다.

```jsx
var person = {
  name: 'Brad',
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Brad

// 대괄호 표기법에 의한 프로퍼티 접근
// 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 합니다.
console.log(person['name']; // Brad
```

그러나 **프로퍼티 키가 식별자 네이밍 규칙을 준수하지 않는 이름, 즉 자바스크립트에서 사용 가능한 유효한 이름이 아니면 반드시 대괄호 표기법을 사용해야 합니다**. 단, 프로퍼티 키가 숫자로 이뤄진 문자열의 경우 따옴표를 생략할 수 있습니다.

```jsx
var person = {
  'first-name': 'Brad',
  1: 10,
};

person.'first-name';  // -> SyntaxError: Unexpected string
person.frist-name;    // -> 브라우저 환경: NaN
										  // -> Node.js 환경: ReferenceError: name is not defined
person[first-name];   // -> ReferenceError: last is not defined
person['first-name']; // -> Brad

person.1;    // -> SyntaxError: Unexpected number
person.'1';  // -> SyntaxError: Unexpected string
person[1];   // -> 10
person['1']; // -> 10
```

**객체에 존재하지 않는 프로퍼티에 접근하면 undefined를 반환**합니다. 이때 ReferenceError가 발생하지 않는 것에 주의해야 합니다.

```jsx
var person = {
  name: "Brad",
};

console.log(person.age); // undefined
```

# 6. 프로퍼티 값 갱신

**이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신됩니다**.

```jsx
var person = {
  name: "Brad",
};

// person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티의 값이 갱신됩니다.
person.name = "James";

console.log(person); // { name: 'James' }
```

# 7. 프로퍼티 동적 생성

**존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당됩니다**.

```jsx
var person = {
  name: "Brad",
};

// person 객체에는 age 프로퍼티가 존재하지 않습니다.
// 따라서 person 객체에 age 프로퍼티가 동적으로 생성되고 값이 할당됩니다.
person.age = 29;

console.log(person); // { name: 'Brad', age: 29 }
```

# 8. 프로퍼티 삭제

**delete 연산자는 객체의 프로퍼티를 삭제합니다**. 이때 delete 연산자의 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야 합니다. 만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러 없이 무시됩니다.

```jsx
var person = {
  name: "Brad",
  age: 29,
};

// person 객체에 age 프로퍼티가 존재합니다.
// 따라서 delete 연산자로 age 프로퍼티를 삭제할 수 있습니다.
delete person.age;

// person 객체 내에 address 프로퍼티가 존재하지 않으므로 무시됩니다.
delete person.address;

console.log(person); // { name: 'Brad' }
```

# 9. ES6에서 추가된 객체 리터럴의 확장 기능

## 9-1. 프로퍼티 축약 표현

**프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때, 프로퍼티 키를 생략(property shorthand)할 수 있습니다. 이때 프로퍼티 키는 변수 이름으로 자동 생성됩니다**.

```jsx
let x = 1;
let y = 2;

// 프로퍼티 축약 표현
const obj = { x, y };

console.log(obj); // { x: 1, y: 2 }
```

## 9-2. 계산된 프로퍼티 이름

**문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성**할 수도 있습니다. 단, 프로퍼티 키로 사용할 표현식을 대괄호([ … ])로 묶어야 합니다. 이를 **계산된 프로퍼티 이름(computed property name)** 이라고 합니다.

```jsx
const prefix = "prop";
let i = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생석
const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
};

// 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생석
obj[`${prefix}-${++i}`] = i;

console.log(obj); // { prop-1: 1, prop-2: 2, prop-3: 3 }
```

## 9-3. 메서드 축약 표현

**메서드를 정의할 때, function 키워드를 생략한 축약 표현을 사용할 수 있습니다**.

```jsx
const obj = {
  name: "Brad",
  // 메서드 축약 표현
  sayHi() {
    console.log("Hi! " + this.name);
  },
};

obj.sayHi(); // Hi! Brad
```
