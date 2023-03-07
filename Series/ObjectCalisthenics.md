# 객체지향 생활체조(Object Calisthenics)

객체지향 생활체조(Object Calisthenics)는 Jeff Bay가 The ThoughtWorks Anthology(SW공학 에세이 모음집)에서 처음 소개했습니다.

객체지향 생활체조의 주요 목적은 특정 [SOLID 원칙](./SOLID.md)을 적용하기 위함입니다. SOLID 원칙은 종속성 관리에 초점을 맞추고, 객체지향 생활체조는 종속성 관리를 가능하게 하는 솔루션에 중점을 두어 이 목표를 달성하기 위한 단계를 제공합니다. 그러므로 **객체지향 생활체조를 적용하게 되면, 객체의 설계를 이해, 유지보수 및 확장하기 쉬운 코드를 작성할 수 있게 됩니다**.

## 객체지향 생활체조의 9가지 원칙

1. [메서드당 한 단계 들여쓰기만 사용하라](#1-메서드당-한-단계-들여쓰기만-사용하라)
2. [else 예약어를 사용하지 마라](#2-else-예약어를-사용하지-마라)
3. [모든 원시값과 문자열을 포장하라](#3-모든-원시값과-문자열을-포장하라)
4. [한 줄에 한 개의 점만 사용하라](#4-한-줄에-한-개의-점만-사용하라)
5. [축약하지 마라](#5-축약하지-마라)
6. [모든 엔티티를 작게 유지하라](#6-모든-엔티티를-작게-유지하라)
7. [클래스의 인스턴스 변수는 두 개를 넘지 않게 하라](#7-클래스의-인스턴스-변수는-두-개를-넘지-않게-하라)
8. [일급 컬렉션을 사용하라](#8-일급-컬렉션을-사용하라)
9. [Getter/Setter를 사용하지 마라](#9-gettersetter를-사용하지-마라)

## 1. 메서드당 한 단계 들여쓰기만 사용하라

> Use only one level of indentation per method

메서드는 하나의 역할만 담당해야 합니다. **여러 수준의 들여쓰기 있는 메서드의 경우 여러 수준의 추상화를 가질 수 있기 때문에, 메서드를 분리하는 것이 좋습니다**.

코드 라인 수가 줄어드는 것은 아니지만, **가독성이 향상** 되고, 더 작은 메서드를 사용하면 코드를 **재사용**하고 **중복 코드를 제거**할 수 있는 더 많은 기회가 될 수 있습니다.

### BAD:

```js
class Refrigerator {
  #fridge;
  #freezer;

  constructor(items = []) {
    this.#fridge = [];
    this.#freezer = [];
  }

  fill(items = []) {
    items.forEach((item) => {
      if (item.isFresh()) {
        this.#fridge.push(item);
      }
      if (item.isFrozen()) {
        this.#freezer.push(item);
      }
    }
  }
}
```

### GOOD:

```js
class Refrigerator {
  #fridge;
  #freezer;

  constructor(items = []) {
    this.#fridge = [];
    this.#freezer = [];
  }

  fill(items = []) {
    items.forEach((item) => this.#addItem(item));
  }

  #addItem(item) {
    this.#addFreshItem(this.#fridge, item);
    this.#addFrozenItem(this.#freezer, item);
  }

  #addFreshItem(fridge, item) {
    if (item.isFresh()) {
      fridge.push(item);
    }
  }

  #addFrozenItem(freezer, item) {
    if (item.isFrozen()) {
      freezer.push(item);
    }
  }
}
```

[⬆ Back to top](#객체지향-생활체조의-9가지-원칙)
<br />

## 2. else 예약어를 사용하지 마라

> Don’t use the else keyword

`else`는 최대한 지양하고, `ealry return`을 사용하자. `if-else`에 해당하는 모든 로직을 수정하는 것보다, 조건을 추가하는 것이 유지보수에 더 용이하다.

### BAD:

```js
function addNumber(array, number) {
  if (number % 2 === 0) {
    return;
  } else {
    array.push(number);
  }
}
```

### GOOD:

```js
function addNumber(array, number) {
  if (number % 2 === 0) {
    return;
  }

  array.push(number);
}
```

[⬆ Back to top](#객체지향-생활체조의-9가지-원칙)
<br />

## 3. 모든 원시값과 문자열을 포장하라

> Wrap all primitives and strings

원시값을 사용한다면 이 데이터에 동작이 없는지 확인해봐야 합니다. 원시값 변수에 동작(예: 유효성 검사 등)이 있다면, 객체나 클래스로 감싸서 의도를 나타낼 수 있고, 안티패턴인 **Primitive Obsession(강박적 기본 타입 사용)** 을 피할 수 있습니다.

### BAD:

```js
const CREDIT_SCORE = Object.freeze({
  min: 0,
  max: 1000,
});

class EvaluateService {
  // ...

  evaluateCustomerCreditRate(score) {
    if (score < CREDIT_SCORE.min || score > CREDIT_SCORE.max) {
      throw new Error(
        `신용 점수는 ${CREDIT_SCORE.min}점 이상, ${CREDIT_SCORE.max}점 이하여야 합니다.`
      );
    }
    // 검증 로직
  }
}
```

- 코드 출처: [https://limdingdong.tistory.com/9](https://limdingdong.tistory.com/9)

`EvaluateService` 클래스는 신용점수를 기반으로 고객을 심사해주는 역할을 합니다. 문제는 `score`에 대한 검증을 지금은 `EvaluateService` 클래스만 할 수 있다는 것입니다. 다른 클래스에서 신용 점수를 사용해야 한다면 동일한 로직을 구현해줘야 합니다.

`CreditScoreValidator`라는 클래스를 만들어 `validate` 메서드를 통해 검증할 수도 있지만, 이 방법은 객체가 스스로 자신의 상태를 관리하지 못하는 형태입니다. **상태를 갖는 객체는 상태에 대한 책임을 스스로 져야 합니다**.

### GOOD:

```js
const CREDIT_SCORE = Object.freeze({
  min: 0,
  max: 1000,
});

// 기존의 number 타입의 score 변수를 CreditScore 클래스로 포장
class CreditScore {
  #score;

  constructor(score) {
    if (score < CREDIT_SCORE.min || score > CREDIT_SCORE.max) {
      throw new Error(
        `신용 점수는 ${CREDIT_SCORE.min}점 이상, ${CREDIT_SCORE.max}점 이하여야 합니다.`
      );
    }

    this.#score = score;
  }
}

class EvaluateService {
  // ...

  evaluateCustomerCreditRate(creditScore) {
    // 검증 로직
  }
}
```

- 코드 출처: [https://limdingdong.tistory.com/9](https://limdingdong.tistory.com/9)

이렇게 값을 사용하면 EvaluateService 클래스에 의존하는 프로그램에서는 반드시 CreditScore 클래스의 인스턴스를 생성해야 합니다. 생성 과정에서 자연스럽게 값에 대한 유효성 체크를 할 수 있게 되고, 다른 곳에서 ‘신용점수’라는 ‘정보’가 사용되더라도 검증 로직을 일관되게 관리할 수 있게 됩니다.

[⬆ Back to top](#객체지향-생활체조의-9가지-원칙)
<br />

## 4. 한 줄에 한 개의 점만 사용하라

> Use only one dot per line

코드를 작성할 때, 한 라인에 점만 사용하면 기차 충돌을 제거(**디미터 법칙**)하여 코드를 더욱 쉽게 읽을 수 있습니다. 그러나 [Fluent Interface](https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A3%A8%EC%96%B8%ED%8A%B8_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4)와 [Method Chaining Pattern](https://github.com/brad-go/clean-code-study/blob/main/docs/06_Object%20vs%20DataStructure/brad_javascript.md#%EB%A9%94%EC%84%9C%EB%93%9C-%EC%B2%B4%EC%9D%B4%EB%8B%9D) 구현에는 적용되지 않습니다.

이 원칙은 단순히 한 줄에 존재하는 점의 개수를 줄이라는 의미라기보다는 점을 찍는 행위에 대해 생각해봐야 합니다. 점을 찍는 행위는 필드나 메서드를 통해 인스턴스에 접근하는 행위를 의미합니다. 점의 개수가 많다는 것은 대상 객체의 내부에 깊이 접근하겠다는 의도를 드러내게 되고, 이는 호출자와 피호출자 사이에 강한 결합도가 형성되었다는 것을 의미합니다.

### BAD:

```js
class PaymentService {
  #memberRepository;

  constructor() {
    this.#memberRepository = new MemberRepository();
  }

  payment(memberId, accountSequenceNumber, statement) {
    const member = this.#memberRepository.findById(memberId);
    member
      .getAccounts()
      .get(accountSequenceNumber)
      .getStatements()
      .push(statement);
    // ...
  }
}
```

- 코드 출처: [https://limdingdong.tistory.com/10](https://limdingdong.tistory.com/10)

위 코드는 회원의 특정 계좌에 입출금 내역을 추가하기 위한 로직을 담고 있습니다. `Member` 클래스의 인스턴스가 `getter` 메서드를 반복 호출해서 거래내역을 표현하기 위한 `StatementList`를 찾아내어 추가하는 구조로 구성되어 있습니다.

문제는 이런 패턴을 반복해서 작성할 경우, 연계된 클래스의 레이아웃이 변경되는 순간 모든 코드에 영향을 줄 수 있다는 것입니다. `Member`, `Account`, `Statement` 클래스가 강하게 결합되어, 독립적인 클래스 인스턴스의 기능을 할 수 없도록 방해하게 됩니다.

**클래스 간의 결합도가 높아지는 가장 큰 원인은 도메인 구조의 이해 부족**에서 시작할 때가 많습니다. 위 코드에서 “회원의 특정 계좌를 찾아 입출금 내역을 추가한다.”라는 문장은 요구사항으로 자연스럽습니다. 그런데 문장을 조금 쪼개서 생각해 볼 필요가 있습니다. 보통의 뱅킹 프로세스에서는 입출금 내역을 추가하는 시점에, 해당 계좌를 알고있는 경우가 일반적입니다. 설계 상에서 “회원의 몇 번째 계좌를 찾아라” 라는 프로세스를 한 번에 구현할 필요가 없다는 의미입니다.

### GOOD:

```js
class AccountService {
  #accountRepository;

  constructor() {
    this.#accountRepository = new AccountRepository();
  }

  payment(accountNumber, statement) {
    const account = accountRepository.findByAccountNumber(accountNumber);
    account.addStatement(statement);
  }
}
```

- 코드 출처: [https://limdingdong.tistory.com/10](https://limdingdong.tistory.com/10)

위 코드에서 Member 클래스는 보이지 않습니다. 회원의 계좌번호는 이미 앞선 프로세스(조회결과 화면 또는 송금화면)을 통해 파악이 되어있을 것이기 때문입니다.

처음 이 원칙을 접하는 경우에 하나만 찍어야 한다는 문장에 사로잡힌 나머지, 지역변수를 활용해 문장을 쪼개거나 로직을 풀어서 최대한 점을 없애기 위해 노력해야 하는 경우가 많습니다. 그런데 이 규칙을 지키기 위해 가장 먼저 생각해 보아야 할 것은, **요구사항과 인스턴스들의 역할**입니다.

이 원칙은 디미터 법칙이 이야기하는 ‘낯선 사람과 대화하지 말아라. 친구하고만 대화해라’라는 문장과 통하는 내용입니다. **좋은 객체지향 설계일수록 getter와 setter의 사용을 지양**합니다. getter/setter를 호출하는 행위는 점을 찍음으로써, 객체의 내부 필드에 접근하도록 합니다. 이는 현재 사용중인 객체와 대화하지 않고, 내부에 존재하는 다른 객체에 접근해 대화를 하겠다는 것을 의미합니다.

클래스의 필드에 접근할 때 `배열`이나 `Map`과 같은 `Collection`객체들을 `getter`로 불러와 처리하는 경우가 많습니다. 이렇게 자료구조에 접근을 할 때에도 생활체조 원칙을 위반하는 경우가 많은데, 이런 경우에는 일급 컬렉션과 같은 도메인 객체 설계를 활용하는 것이 좋습니다.

[⬆ Back to top](#객체지향-생활체조의-9가지-원칙)
<br />

## 5. 축약하지 마라

> Don’t abbreviate

이 원칙은 클래스, 메서드, 변수의 이름을 지을 때 축약을 하지 말라는 규칙입니다. 그런데 왜 축약하지 말라고 하는 걸까요? 축약하려고 하는 이유에 대해서 한 번 생각해봅시다.

대개 **이름이 너무 길고 복잡하기 때문에** 축약하려고 하는 욕심이 생기게 됩니다. 복잡하고 긴 이름은 읽기 어려울 수 있으니까요. 그러나 이러한 방법은 **프로젝트에서 용어의 일관성과 명확한 의미 전달을 하지 못하게 만듭니다**. 그렇다면 **긴 이름**을 그대로 사용해야할까요? 일반적으로 긴 이름을 가졌을 경우, **변수나 메서드가 너무 많은 일을 하고 있을 확률이 높습니다**. 이는 **단일 책임의 원칙을 위반**하므로 설계를 다시 한 번 고민해볼 필요가 있습니다.

**같은 이름이 반복**되어 사용되어서 코드가 지저분하다면, **코드나 메서드가 중복**되어 사용되고 있는지 의심해봅시다.

**적당한 이름을 찾기 힘든 경우**, 그 클래스나 메서드가 정말 필요한 지 한 번 다시 생각해봅시다. 적당한 이름이 생각나지 않는다면, **무언가 잘못 만들었다는 신호**일 수 있습니다. 이런 경우 메서드나 클래스의 존재 의미부터 다시 고민해보고 더 나은 설계를 생각해보는 것이 좋습니다.

### BAD:

```js
class ShoppingBasket {
  #basket;

  constructor() {
    this.#basket = [];
  }

  addItemAndSortBasket(item) {
    this.#basket.push(item);
    this.#basket.sort((a, b) => a.priority - b.priority);
  }
}
```

### GOOD:

```js
class ShoppingBasket {
  #basket;

  constructor() {
    this.#basket = [];
  }

  addItem(item) {
    this.#basket.push(item);
  }

  sortBasket() {
    this.#basket.sort((a, b) => a.priority - b.priority);
  }
}
```

[⬆ Back to top](#객체지향-생활체조의-9가지-원칙)
<br />

## 6. 모든 엔티티를 작게 유지하라

> Keep all entities small

이 원칙에서 말하는 엔티티는 클래스, 패키지 등을 통틀어 업무적 구분을 갖는 단위를 의미합니다. 이 원칙에서는 **클래스는 50줄, 패키지(디렉토리)는 파일 10개를 넘기지 않아야 한다**고 말합니다. 이유는 간단합니다. **긴 파일은 읽기 어렵고, 이해하기 어렵고, 유지보수하기 어렵기 때문**입니다.

무엇이든지 길어지면 **단일 책임 원칙을 위반하지 않았는지 고민**해 볼 필요가 있습니다. 클래스의 크기를 줄여 응집도를 높이고, 메서드의 크기를 줄여 역할을 나누고, 작은 역할을 통해 이루려는 하나의 목적으로 도출한다면, 그 목적을 이루기 위한 클래스들을 모아 하나의 패키지로 구성할 수 있습니다.

### BAD:

```js
class Dashboard {
  getLanguage(): string {
    /* ... */
  }
  setLanguage(language: string): void {
    /* ... */
  }
  showProgress(): void {
    /* ... */
  }
  hideProgress(): void {
    /* ... */
  }
  isDirty(): boolean {
    /* ... */
  }
  disable(): void {
    /* ... */
  }
  enable(): void {
    /* ... */
  }
  addSubscription(subscription: Subscription): void {
    /* ... */
  }
  removeSubscription(subscription: Subscription): void {
    /* ... */
  }
  addUser(user: User): void {
    /* ... */
  }
  removeUser(user: User): void {
    /* ... */
  }
  goToHomePage(): void {
    /* ... */
  }
  updateProfile(details: UserDetails): void {
    /* ... */
  }
  getVersion(): string {
    /* ... */
  }
  // ...
}
```

### GOOD:

```js
class Dashboard {
  disable(): void {
    /* ... */
  }
  enable(): void {
    /* ... */
  }
  getVersion(): string {
    /* ... */
  }
}

// 나머지 다른 메서드들은 다른 클래스로 나눠 책임을 분산합니다.
```

[⬆ Back to top](#객체지향-생활체조의-9가지-원칙)
<br />

## 7. 클래스의 인스턴스 변수는 두 개를 넘지 않게 하라

> Don’t use any classes with more than two instance variables

클래스의 인스턴스 변수를 제한하라는 원칙입니다. **클래스의 인스턴스 변수는 클래스가 관리하는 ‘상태’를 의미**합니다. 이러한 상태가 많다는 것은 클래스가 여러 종류의 정체성을 가지고 설계되었다는 것을 의미합니다.

정말 지키기 어려운 규칙이지만, **높은 응집력과 캡슐화를 위해서 이 규칙은 필수**적입니다. 객체지향 생활체조 원칙의 세 번째 원칙인 “모든 원시값과 문자열을 포장하라"와 같은 맥락으로 이어지는 원칙입니다. 세번째 원칙에서는 상태에 도메인적 의미를 부여하라는 이야기를 한다면, 이 원칙에서는 **의미를 갖는 상태를 어떻게 관리하는 것이 좋은 지**에 대한 내용을 이야기하고 있습니다.

### BAD:

```js
class User {
  #firstName;
  #lastName;
  #age;

  constructor(firstName, lastName, age) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#age = age;
  }
}
```

### GOOD:

```js
class User {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }
}

class Name {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }
}

class FirstName {
  #value;

  constructor(value) {
    this.#value = value;
  }
}

class LastName {
  #value;

  constructor(value) {
    this.#value = value;
  }
}

class Age {
  #value;

  constructor(value) {
    this.#value = value;
  }
}
```

이 코드가 이 원칙이 말하는 이상적인 형태일 것입니다. 이렇게 모든 클래스의 인스턴스를 두개 이하로 유지하며, 분류를 세분화하는 것입니다. 그러나 과도한 세분화는 부작용을 불러일으킬 수도 있습니다. 위의 예시를 보면 높은 응집력과 캡슐화를 이뤄냈지만, 불필요할 정도로 세분화했다고 생각할 수도 있습니다.

그러므로 클래스를 계층적으로 분류하고 인스턴스 변수의 수를 최소화하는 것도 좋지만, 도메인 요소들을 어떻게 묶고 구성할 것인지 그 설계에 대해 충분히 고민하여 클래스를 구성하고, 리팩토링 해보라는 지침이되는 원칙이라고 생가하면 좋을 것 같습니다.

[⬆ Back to top](#객체지향-생활체조의-9가지-원칙)
<br />

## 8. 일급 컬렉션을 사용하라

> Use first-calss collections

일급 컬렉션은 하나의 컬렉션(배열이나 객체, Map, Set 객체 등) 외에 다른 멤버 변수를 두지 않는 클래스를 말합니다. 일급 컬렉션을 사용하라는 이유가 뭘까요? 일급 컬렉션을 사용하는 것에는 몇 가지 장점이 있습니다.

1. **자료구조가 도메인 로직에 종속됩니다**.

   컬렉션을 이용해 새로운 자료구조를 만들거나 정렬을 할 수도 있습니다.

2. **컬렉션을 불변성이 보장된 불변객체로 사용할 수 있습니다.**

   `private` 변수를 사용하고 `setter`를 노출하지 않음으로써 기존 컬렉션 메서드를 사용해 함부로 컬렉션의 내용을 조작할 수 없게 됩니다.

3. **상태와 행위 한 곳에서 관리할 수 있습니다**.

   응집도를 높이고 결합도를 낮출 수 있습니다.

### BAD:

```js
const LOTTO_NUMBERS_SIZE = 6;

class LottoService {
  createLottoNumber() {
    const lottoNumbers = createNonDuplicateNumbers();

    this.#validateSize(lottoNumbers);
    this.#validateDuplicate(lottoNumbers);

    // ...
  }

  #validateSize(lottoNumbers) {
    if (lottoNumbers.length !== LOTTO_NUMBERS_SIZE) {
      throw new Error("로또 번호는 6개여야 합니다.");
    }
  }

  #validateDuplicate(lottoNumbers) {
    if (new Set(lottoNumbers).size !== LOTTO_NUMBERS_SIZE) {
      throw new Error("로또 번호들은 중복될 수 없습니다.");
    }
  }
}
```

### GOOD:

```js
const LOTTO_NUMBERS_SIZE = 6;

class LottoTicket {
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#validateSize(lottoNumbers);
    this.#validateDuplicate(lottoNumbers);
    this.#lottoNumbers = lottoNumbers;
  }

  #validateSize(lottoNumbers) {
    if (lottoNumbers.length !== LOTTO_NUMBERS_SIZE) {
      throw new Error("로또 번호는 6개여야 합니다.");
    }
  }

  #validateDuplicate(lottoNumbers) {
    if (new Set(lottoNumbers).size !== LOTTO_NUMBERS_SIZE) {
      throw new Error("로또 번호들은 중복될 수 없습니다.");
    }
  }
}

class LottoService {
  createLottoNumber() {
    const nonDuplicateNumbers = createNonDuplicateNumbers();
    const lottoTicket = new LottoTicket(nonDuplicateNumbers);
  }
}
```

[⬆ Back to top](#객체지향-생활체조의-9가지-원칙)
<br />

## 9. Getter/Setter를 사용하지 마라

객체는 객체답게 사용해야 한다는 말이 있습니다. 객체의 **역할**과 **책임**이라는 핵심 가치를 잘 유지할 때 객체지향 프로그래밍의 의미가 살아나는데, 객체의 상태를 밖으로 꺼내 밖에서 무언가 처리를 하기보다는 **객체에 메시지를 보내 스스로 상태에 대한 처리 로직을 수행하도록 해야합니다**. 이 원칙은 DTO나 프로세스 처리를 목적으로 하는 컨트롤러 클래스 등을 대상으로 하지 않습니다.

### BAD:

```js
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }
}

class LottoGame {
  play() {
    const nonDuplicateNumbers = createNonDuplicateNumbers();
    const lotto = new Lotto(nonDuplicateNumbers);

    // 숫자가 포함되어 있는지 확인
    lotto.getNumbers().includes(number);

    // 당첨 번호와 몇 개가 일치하는지 확인한다.
    const winningNumberSet = new Set(winningNumbers);
    lotto.getNumbers().filter((number) => winningNumberSet.has(number));
  }
}
```

### GOOD:

```js
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  contains(number) {
    // 숫자가 포함되어있는지 확인한다.
    return this.#numbers.includes(number);
  }

  matchCount(winningNumbers) {
    // 당첨 번호와 몇 개가 일치하는지 확인한다.
    const winningNumberSet = new Set(winningNumbers);
    const matchNumbers = this.#numbers.filter((number) =>
      winningNumberSet.has(number)
    );

    return matchNumbers.length;
  }
}

class LottoGame {
  play() {
    const nonDuplicateNumbers = createNonDuplicateNumbers();
    const lotto = new Lotto(nonDuplicateNumbers);

    lotto.contains(number);
    lotto.matchCount(winningNumbers);
  }
}
```

[⬆ Back to top](#객체지향-생활체조의-9가지-원칙)
<br />

## 참고

[Object Calisthenics: Principles for Better Object-Oriented Code](https://blog.avenuecode.com/object-calisthenics-principles-for-better-object-oriented-code)

[[객체지향 생활체조 원칙] 규칙 3. 모든 원시값과 문자열을 포장한다](https://limdingdong.tistory.com/9)
