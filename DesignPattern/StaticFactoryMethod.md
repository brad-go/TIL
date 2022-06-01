# 정적 팩토리 메서드(static factory method)

클린 코드 책을 공부하던 중, 자바로 쓰여진 책이라 클래스에 대한 이야기가 많이 나왔다. 하지만 나는 클래스에 대해 기초적인 문법은 알았지만, **정적 팩토리 메서드**란 것은 정말 처음 듣는 이야기였다. 검색해봤지만, 자바스크립트의 경우에는 제대로된 글을 찾기가 힘들었다. 그래서 정확한 지식이라고는 할 수는 없지만, 이런저런 글을 참고해 정리한 글이다.

디자인 패턴의 기초가 없는 자바스크립트 개발자로서 정적 팩토리 메서드는 코드를 더 깔끔하게 만들 수 있다. 대부분의 사람들은 클래스를 생성하고 `new` 연산자를 통해 객체의 인스턴스를 만들어서 사용할 것이다.

```tsx
class Diary {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
}

const diary = new Diary("Today's diary", new Date());
console.log(diary.date); // 2022-03-18T13:01:03.705Z
```

그러나 우리가 `Diary` 클래스의 인스턴스를 생성할 때, 유닉스 타임스탬프가 아닌 연, 월, 일만을 출력하고 싶다고 해보자.

쉽지만 좋지 않은 방법은 `constructor()`함수를 조작하는 것이다.

```tsx
class Diary {
  constructor(title, date) {
    this.title = title;
    this.date = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
  }
}

const diary = new Diary("Today's diary", new Date());
console.log(diary); // 2022-3-18
```

하지만 우리가 원하는 것은 이것이 아니다. 우리는 메서드를 생성할 수 있다.

```tsx
class Diary {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  setDateFormat() {
    this.date = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
  }
}

const diary = new Diary("Today's diary", new Date());
console.log(diary.date); // 2022-3-18
```

규칙적인 흐름과 모든 것이 정상적이다. 하지만 `formatting()`과 같은 메서드를 사용하지 않고, 날짜의 출력 형식의 결과를 만들고 싶다면? 우리는 이 메서드를 다른 사람들이 사용할 수 있게 노출시키고 싶지 않다면?

우리는 정적 팩토리 메서드 생성을 통해 생성하는 로직을 숨길 수 있다. 하지만 위와 같이 똑같이 날짜의 출력 형식을 명확하게 변경할 수 있다. 우린 `static`을 사용한 정적 메서드로 `Diary`의 생성은 클래스에 **캡슐화**할 수 있다.

```tsx
class Diary {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static createDiary() {
    const date = new Date();
    return new this(
      "Today's diary",
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }
}

const diary = Diary.createDiary();
console.log(diary.title, diary.date); // Today's diary 2022-3-18
```

앞서 말했듯이 일반적으로 `new` 연산자를 사용해 클래스의 인스턴스를 만들고, 내부의 메서드에 접근한다. 하지만 **정적 메서드를 사용하면 `new`를 통한 새로운 객체 생성 없이, 바로 내부의 메서드에 접근할 수 있다.**

이렇게 **생성자를 사용하지 않고, 정적 메서드를 사용하여 인스턴스화 하는 디자인 패턴**이다. 즉, 공장(팩토리)처럼 하나의 객체를 이용하여 반복적으로 반환하여 재사용할 때, 정적 메서드가 매우 편리하게 활용된다고 한다.

## 정적 팩토리 메서드를 사용하는 이유

### 1. 이름을 가질 수 있다.

객체는 생성 목적과 과정에 따라 생성자를 구별해서 사용할 필요가 있다. `new` 라는 키워드를 통해 객체를 생성하는 생성자는 내부 구조를 잘 알고 있어야 목적에 맞게 객체를 생성할 수 있다. 하지만 정적 팩토리 메서드를 사용하면 메서드 이름에 객체의 생성 목적을 담아낼 수 있다.

```tsx
class Diary {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static createDiary() {
    const date = new Date();
    return new this(
      "Today's diary",
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }
  static createParticularDateDiary(date) {
    return new this(
      "Today's diary",
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }
}

const diary = Diary.createDiary();
console.log(diary.title, diary.date); // Today's diary 2022-3-18

const particularDateDiary = Diary.createParticularDateDiary(
  new Date("2022-04-16")
);
console.log(particularDateDiary.title, particularDateDiary.date);
// Today's diary 2022-4-16
```

`createDiary`와 `createParticularDateDiary` 모두 새로운 일기를 생성하고 반환하는 정적 팩토리 메서드이다. 메서드의 이름만 봐도 일기를 생성하는지, 특정 일의 일기를 생성하는지 이해할 수 있다. 이처럼 정적 팩토리 메서드를 사용하면 **해당 객체 생성의 목적을 이름에 표현할 수 있어 가독성이 좋아지는 효과**가 있다.

### 2. 호출할 때마다 새로운 객체를 생성할 필요가 없다.

빈 일기장 여러개를 만들어야 한다고 해보자. 일반적으로 생성자를 사용한다면 다음과 같이 만들 수 있다.

```tsx
const diary = new Diary("Today's diary", new Date());
```

위와 같이 new 연산자를 통해서 객체를 매번 생성해서 사용해야 한다. 하지만 동일한 객체를 사용한다면 static을 통해 하나의 객체로 반복적으로 반환하여 활용할 수 있다.

```tsx
const diary = Diary.createDiary();
```

### 3. 캡슐화를 통해 내부 로직을 숨길 수 있다.

```tsx
class Diary {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static createDiary() {
    const date = new Date();
    return new this(
      "Today's diary",
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }
}

const diary = Diary.createDiary();
console.log(diary.title, diary.date); // Today's diary 2022-3-18
```

다음과 같이 static을 통해 객체를 생성하지만 createDiary()의 로직이 어떻게 구성되어있는지 모르게 할 수 있다.

## 정리

- 객체 생성을 캡슐화하는 기법이다.
- static 메서드로 객체 생성을 캡슐화 한다.
- 객체를 생성하는 메서드를 만들고, `static`으로 선언하는 기법이다.
- 주로 생성자를 여러번 반복적으로 사용하여 새로운 객체를 계속 생성하는 번거로움 등을 해소하고자 할 때 사용한다.

## 참고

- [Static Factory Methods](https://dev.to/adtm/static-factory-methods-nnb)
