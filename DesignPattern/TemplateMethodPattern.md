# Template Method Pattern

## 템플릿 메서드 패턴이란?

템플릿 메서드 패턴이란 **어떤 작업을 처리하는 일부분을 서브 클래스로 캡슐화해 전체 일을 수행하는 구조는 바꾸지 않으면서 특정 단계에서 수행하는 내역을 바꾸는 패턴**이다.

개발을 하다보면 구체적인 구현은 다르지만 기본적인 기능은 비슷한 경우가 종종있는데, 두개 이상의 프로그램이 기본적으로 동일한 골격 하에서 동작할 때, 기본 골격에 해당하는 알고리즘을 일괄적으로 관리하면서 각 프로그램마다 달라지는 부분들에 대해서 따로 만들고 싶을 때 템플릿 메서드 패턴을 사용하면 좋다. 즉, **전체적으로 동일하면서 부분적으로는 다른 구문으로 구성된 메서드의 코드 중복을 최소화 할 때 유용**하다.

- 동일한 기능을 상위 클래스에서 정의하면서 확장/변화가 필요한 부분만 서브 클래스에서 구현
- 전체적인 알고리즘은 상위 클래스에서 구현하면서 다른 부분은 하위 클래스에서 구현할 수 있도록해서 전체적인 알고리즘 코드를 재사용할 때 유용하다.
- 상속을 통해 클래스의 기능을 확장하는데 용이하다. 변하지 않는다. 기능은 상위 클래스에 만들어두고, 자주 변경하며 확장할 기능은 하위 클래스에서 만들 수 있다.

## 템플릿 메서드 패턴 장단점

### 장점

- 중복 코드를 줄일 수 있다.
- 자식 클래스의 역할을 줄여 핵심 로직의 관리가 용이하다.

### 단점

- 추상 메서드가 많아지면서 클래스 관리가 복잡해진다.
- 클래스 간의 관계와 코드가 꼬여버릴 염려가 있다.

## 템플릿 메서드 패턴 사용 예제

```tsx
// 템플릿 메서드를 정의하며, 하위 클래스에서 알맞게 확장할 수 있는 메서드인 훅 메서드를 제공
abstract class Teacher {
  // 템플릿 메서드
  startClass(): void {
    this.enter();
    this.takeAttendance();
    this.teach();
    this.leave();
  }

  enter(): void {
    console.log("선생님이 강의실로 들어옵니다.");
  }

  takeAttendance(): void {
    console.log("선생님이 출석을 부릅니다.");
  }

  leave(): void {
    console.log("선생님이 강의실에서 나가십니다.");
  }

  // 훅 메서드
  abstract teach(): void;
}

class KoreanTeacher extends Teacher {
  // Teacher를 상속 받아 추상 메서드를 재정의
  teach() {
    console.log("선생님이 국어를 가르칩니다.");
  }
}

class MathTeacher extends Teacher {
  // Teacher를 상속 받아 추상 메서드를 재정의
  teach() {
    console.log("선생님이 수학을 가르칩니다.");
  }
}

class EnglishTeacher extends Teacher {
  // Teacher를 상속 받아 추상 메서드를 재정의
  teach() {
    console.log("선생님이 영어를 가르칩니다.");
  }
}

const koreanTeacher = new KoreanTeacher();
const mathTeacher = new MathTeacher();
const englishTeacher = new EnglishTeacher();

console.log("||---------- 1교시 ----------||");
koreanTeacher.startClass();
console.log("||---------- 2교시 ----------||");
mathTeacher.startClass();
console.log("||---------- 3교시 ----------||");
englishTeacher.startClass();
```

## 정리

템플릿 메서드 패턴은 알고리즘의 뼈대를 맞추는 것을 목표로한다. 즉, 전체적인 레이아웃은 통일하지만, 상속받은 클래스는 훅 메서드를 이용하여 확장할 수 있도록 **유연성**을 주는 디자인 패턴이다.

## 참고

[[Design Pattern] 템플릿 메서드 패턴이란 - Heee's Development Blog](https://gmlwjd9405.github.io/2018/07/13/template-method-pattern.html)

[[디자인 패턴] 템플릿 메소드(Template Method) 패턴이란?](https://steady-coding.tistory.com/384)
