# 빌더 패턴(Builder Pattern)

## 빌더 패턴이란?

빌더 패턴은 **복잡한 객체를 단계별로 구성할 수 있는 디자인 패턴**입니다. 이는 **복잡한 객체를 생성하는 클래스와 표현하는 클래스를 분리하여 동일한 절차에서도 객체의 다양한 타입과 서로 다른 표현을 생성하는 방법을 제공**합니다.

빌더 패턴은 객체 생성시에 생성자(constructor)만 사용할 때 발생할 수 있는 문제를 개선하기 위해 고안되었습니다. 생성자에 넘겨야 할 매개변수가 많을 경우 다음과 같은 이슈가 있습니다.

- 클라이언트 프로그램에서 팩토리 클래스를 호출할 때 선택적인 인자가 많아지면, **타입과 순서에 대한 관리가 어려워져** 에러가 발생할 확률이 높아집니다.
- 경우에 따라 **필요 없는 파라미터들에 대해** 팩토리 클래스에 **일일이 null 값**을 넘겨줘야 합니다.
- 생성해야 하는 하위 클래스가 무거워지고 복잡해짐에 따라 팩토리 클래스 또한 복잡해집니다.

이러한 문제를 해결하기 위해 빌더 패턴은 **별도의 Builder 클래스를 만들어 필수 값에 대해서는 생성자를 통해, 선택적인 값들에 대해서는 메서드를 통해 단계적으로 값을 입력받은 후에 최종적으로 하나의 인스턴스를 return 하는 방식**입니다.

다른 생성 패턴과 달리 빌더는 생성할 객체에 공통 인터페이스가 필요하지 않습니다. 따라서 동일한 절차를 통해 다양한 객체를 생성할 수 있습니다.

## 빌더 패턴의 구조

![https://refactoring.guru/images/patterns/diagrams/builder/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/builder/structure-indexed-2x.png)

[출처: [https://refactoring.guru/images/patterns/diagrams/builder/structure-indexed-2x.png](https://refactoring.guru/images/patterns/diagrams/builder/structure-indexed-2x.png)]

- **Builder**: 모든 타입의 빌더에 대한 공통적인 제품 구성 단계를 선언
- **Concrete Builder**: 생성 단계의 다양한 구현을 제공하며, 공통 인터페이스를 따르지 않는 제품도 생산할 수 있습니다.
- **Product**: 빌더에 의해 생성될 객체입니다. 다른 빌더에 의해 생성된 제품은 동일한 클래스 계층 또는 인터페이스에 속할 필요가 없습니다.
- **Director**: 구성 단계를 호출하는 순서를 정의하므로 제품의 특정 구성을 만들고 재사용할 수 있습니다.

클라이언트 코드에서는 빌더 객체 중 하나를 감독(director)와 연결해야 합니다. 일반적으로 감독의 생성자 매개변수를 통해 한 번만 수행됩니다. 그런 다음 감독은 모든 추가 구성에 해당 빌더 객체를 사용합니다.

## 예시 코드

```tsx
/**
 * 빌더 인터페이스는 생성할 제품(결과 객체)의 다른 부분을 만드는 방법을 지정합니다.
 */
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

/**
 * 구체적인 빌더 클래스들은 빌더 인터페이스를 따라 특정 구현 단계를 제공합니다.
 * 프로그램이 몇가지 다른 빌더들을 가지고 있다면, 다르게 구현됩니다.
 */
class ConcreteBuilder1 implements Builder {
  private product!: Product1;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.product = new Product1();
  }

  // 동일한 제품 객체에 모든 생성 단계가 동일하게 적용됩니다.
  producePartA(): void {
    this.product.parts.push("PartA1");
  }

  producePartB(): void {
    this.product.parts.push("PartB1");
  }

  producePartC(): void {
    this.product.parts.push("PartC1");
  }

  /**
   * 구체적인 빌더 클래스는 결과를 가져오기 위한 그들 스스로 메서드를 제공합니다. 이는 빌더들의
   * 다양한 타입들이 동일한 인터페이스를 따르지 않는 다른 제품 객체를 생성할 수 있기 때문입니다.
   * 그러므로 이 메서드는 빌더 인터페이스에 선언될 수 없습니다.
   *
   * 대개, 클라이언트에 결과 객체를 반환한 후에 빌더 객체는 다른 제품 객체를 생성할 준비를 합니다.
   * 그러므로 getProduct 메서드의 마지막에 reset 메서드를 호출하는 것이 일반적입니다. 그러나
   * 이 동작은 필수는 아니며, 이전 결과를 처리하기 전에 빌더가 클라이언트 코드의 명시적 reset
   * 호출을 기다리게 할 수 있습니다.
   */
  getProduct(): Product1 {
    const reuslt = this.product;
    this.reset();
    return reuslt;
  }
}

/**
 * 빌더 패턴은 오직 제품들이 꽤나 복잡하고 자원이 많이 사용될 때 사용하는 것이 타당합니다.
 *
 * 다른 생성 패턴들과 달리, 다른 구체 빌더들은 관계없는 제품들을 생성할 수 있습니다.
 * 다른 말로, 다양한 빌더의 결과물들은 항상 동일한 인터페이스를 따르지 않습니다.
 */
class Product1 {
  public parts: string[] = [];

  listParts(): void {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  }
}

/**
 * 감독(Director)은 특정 순서로 빌딩 단계를 실행하는 것만을 책임집니다.
 * 이는 특정한 순서나 설정을 따라서 제품을 생성할 때 도움이 됩니다.
 * 엄밀히 말하면, 클라이언트 코드에서 빌더를 직접 제어할 수 있기 때문에 감독 클래스는 선택적입니다.
 */
class Director {
  private builder!: Builder;

  /**
   * 감독은 클라이언트 코드에서 전달한 빌더 객체와 함께 동작합니다.
   * 이 방법으로 클라이언트 코드는 새로 조립한 제품의 최종 타입을 변경할 수 있습니다.
   */
  setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  /**
   * 감독은 동일한 빌딩 단계를 사용하여 몇가지 제품의 변형을 생성할 수 있습니다.
   */
  buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

/**
 * 클라이언트 코드는 빌더 객체를 만들어 감독에게 전달하고 생성 프로세스를 시작합니다.
 * 최종 결과는 빌더 객체로 회수됩니다.
 */
function clientCode(director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  console.log("Standard basic product:");
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log("Standard full featured product:");
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  console.log("Custom product:");
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
```

<details><summary><b>다른 예시</b></summary><div markdown="1">

여행 계획을 세우는 앱을 개발한다고 할 때, 다음과 같은 요구사항이 있다.

- 요구사항 1: 여행 제목, 여행 출발 일, 몇 박 며칠 동안 어디서 머물지, n일차에 할 일을 기록
- 요구사항 2: 당일치기는 n박 m일이 필요 없고, 어디서 머물지도 필요없다.

위의 요구사항을 만족하기 위해 필수적인 정보와 선택적인 정보로 optional한 속성들이 생겼을 때 어떻게 구현할까?
필요한 객체를 직접 생성하는 대신, 먼저 필수 인자들을 생성자에 전부 전달하여 빌더 객체를 만든다.
선택 인자는 가독성이 좋은 코드로 인자로 넘길 수 있다.
setter가 없으므로 객체 일관성을 유지하여 불변 객체로 생성할 수 있다.

```ts
interface TourPlanBuilder {
  setTitle(title: string): void;
  nightAndDays(nights: number, days: number): void;
  setStartDate(startDate: string): void;
  setPlaceToStay(placeToStay: string): void;
  addPlan(day: number, plan: string): void;
}

class DefaultTourBuilder implements TourPlanBuilder {
  private tourPlan!: TourPlan;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.tourPlan = new TourPlan();
  }

  setTitle(title: string): void {
    this.tourPlan.title = title;
  }

  setStartDate(startDate: string): void {
    this.tourPlan.startDate = startDate;
  }

  nightAndDays(nights: number, days: number): void {
    this.tourPlan.nights = nights;
    this.tourPlan.days = days;
  }

  setPlaceToStay(placeToStay: string): void {
    this.tourPlan.placeToStay = placeToStay;
  }

  addPlan(day: number, plan: string): void {
    if (this.tourPlan.plans === undefined) {
      this.tourPlan.plans = [];
    }

    this.tourPlan.plans.push(new DetailPlan(day, plan));
  }

  getPlan(): TourPlan {
    const plan = this.tourPlan;
    this.reset();
    return plan;
  }
}

class DetailPlan {
  constructor(private day: number, private plan: string) {}
}

class TourPlan {
  public title: string | undefined;
  public startDate: string | undefined;
  public nights: number | undefined;
  public days: number | undefined;
  public placeToStay: string | undefined;
  public plans: DetailPlan[] = [];
}

class TourDirector {
  private tourPlanBuilder!: TourPlanBuilder;

  setTourPlanBuilder(tourPlanBuilder: TourPlanBuilder) {
    this.tourPlanBuilder = tourPlanBuilder;
  }

  cancuTrip(): void {
    this.tourPlanBuilder.setTitle("칸쿤 여행");
    this.tourPlanBuilder.nightAndDays(2, 3);
    this.tourPlanBuilder.setStartDate(new Date("2020-12-9").toLocaleString());
    this.tourPlanBuilder.setPlaceToStay("리조트");
    this.tourPlanBuilder.addPlan(0, "체크인하고 짐 풀기");
    this.tourPlanBuilder.addPlan(0, "저녁 식사");
  }

  longBeachTrip(): void {
    this.tourPlanBuilder.setTitle("롱비치 여행");
    this.tourPlanBuilder.setStartDate(new Date("2021-7-15").toLocaleString());
  }
}

function makePlan(tourDirector: TourDirector) {
  const builder: DefaultTourBuilder = new DefaultTourBuilder();
  tourDirector.setTourPlanBuilder(builder);

  tourDirector.cancuTrip();
  console.log(builder.getPlan());
  console.log("");

  tourDirector.longBeachTrip();
  console.log(builder.getPlan());
}

const tourDirector = new TourDirector();
makePlan(tourDirector);
```

</div></details>

<details><summary><b>다른 예시</b></summary><div markdown="1">

```tsx
/**
 * 웹에서 많이 사용하는 request query를 예를 들어보자.
 * request는 크게 URL, METHOD(GET, POST, PUT, DELETE), 그리고 데이터 부분으로 이루어져 있다.
 *
 * 그저 Request 클래스만을 생성한다면 몇 가지 문제가 있다.
 * 1. 생성자를 통해 데이터를 받기 때문에, 데이터가 없을 경우 null을 명시적으로 넣어야 한다.
 * 이런 구조에서 새로운 인자를 받아야할 경우, 길이가 길어지며 가독성도 떨어진다.
 * 2. 어떤 위치에 어떤 데이터가 들어가야 하는지 명시적이지 않다.
 * 3. 유효성 검사를 위해 생성자에만 불필요한 코드가 장황하게 들어갈 가능성이 있다.
 *
 */

/**
 * request 메서드에 적용할 타입
 */
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Builder {
  setUrl(url: string): RequestBuilder;
  setMethod(method: RequestMethod): RequestBuilder;
  setData(data: Object): RequestBuilder;
}

/**
 * request builder
 * request 객체의 생성을 원하는 단계에 맞게 생성할 수 있게 해준다.
 * request 객체의 속성들은 각 일종의 setter 메서드를 이용해 값을 할당한다.
 * 빌더를 통해 데이터를 주입함으로, 데이터가 없는 경우에도 문제가 되지 않고, 순서를 보장할 필요도 없다.
 * 또 새로운 필드가 추가되었을 때, 해당하는 새로운 setter만 추가하면 되고, 각각의
 * setter들 안에서 해당하는 필드에 대한 유효성 검사만 해주면 되기 때문에 단일 책임의 원칙이 지켜진다.
 */
class RequestBuilder {
  private request!: Request;

  constructor() {
    this.reset();
  }

  reset(): RequestBuilder {
    this.request = new Request();
    return this;
  }

  setUrl(url: string): RequestBuilder {
    this.request.url = url;
    return this;
  }

  setMethod(method: RequestMethod): RequestBuilder {
    this.request.method = method;
    return this;
  }

  setData(data: Object): RequestBuilder {
    this.request.data = data;
    return this;
  }

  /**
   * 객체를 반환하는 메서드는 빌더 클래스에서 빌더 인터페이스를 따르지 않는
   * 객체를 생성할 수 있기 때문에 인터페이스에는 선언하지 않는다.
   *
   * 생성자에는 바로 request를 초기화 해줘도 되지만, 일반적으로 생성한 객체를 반환한 뒤에
   * 빌더 인스턴스는 다음 새로운 객체를 생성할 준비를 한다. 그러므로 reset 함수를 통해 초기화
   * 해준다. 하지만 이 reset 과정은 필수는 아니며 선택적이다.
   */
  build() {
    const request = this.request;
    this.reset();
    return request;
  }
}

/**
 * request 정보를 담는 클래스
 */
class Request {
  public url: string | undefined;
  public method: RequestMethod | undefined;
  public data: Object | undefined;
}

/**
 * 감독을 사용하지 않고 빌더를 직접 제어하기
 */
const getRequest = new RequestBuilder()
  .setUrl("https://github.com/brad-go")
  .setMethod("GET")
  .build();

console.log("GET request");
console.log(getRequest); // Request { url: 'https://github.com/brad-go', method: 'GET' }

/**
 * 감독(Director)을 사용하면 특정 단계뼐로 객체를 생성할 수 있다. 이는 특정 순서로
 * 빌딩 단계를 실행하는 것만을 책임진다. 빌더 객체를 생성하는 것을 사용자가 직접
 * 제어할 수 있기 때문에 이 클래스는 선택적이다.
 */
class RequestDirector {
  private requestBuilder!: Builder;

  setRequestBuilder(requestBuilder: Builder): void {
    this.requestBuilder = requestBuilder;
  }

  getRequset(): void {
    this.requestBuilder.setUrl("https://github.com/brad-go");
    this.requestBuilder.setMethod("GET");
  }

  postRequest(): void {
    this.requestBuilder.setUrl("https://github.com/brad-go");
    this.requestBuilder.setMethod("POST");
    this.requestBuilder.setData({ id: "brad-go", pw: 1234 });
  }
}

function createRequest(requestDirector: RequestDirector) {
  const requestBuilder = new RequestBuilder();
  requestDirector.setRequestBuilder(requestBuilder);

  console.log("GET request");
  requestDirector.getRequset();
  console.log(requestBuilder.build()); // Request { url: 'https://github.com/brad-go', method: 'GET' }

  console.log("POST request");
  requestDirector.postRequest();
  console.log(requestBuilder.build()); // Request { url: 'https://github.com/brad-go', method: 'POST', data: { id: 'brad-go', pw: 1234 }}
}

/**
 * Direcot를 통해서 request 생성 제어하기 - 사실 이 예시에는 감독을 사용하는 것이
 * 효율적이지 않아보인다.
 */
const requestDirector = new RequestDirector();
createRequest(requestDirector);
```

</div></details>

## 언제 사용해야할까?

- **많은 선택적 매개변수를 가지고, 매개변수에 따라 다른 초기화가 필요한 코드를 고치려고 할 때**
- 객체의 표현과 생성과정을 분리해서 좀 더 클래스마다 역할 분리를 명확히 하고 싶은 경우
- 코드의 가독성을 높이고 싶은 경우

## 구현 방법

1. 사용 가능한 모든 제품 표현을 작성하기 위한 공통 구성 단계를 명확하게 정의할 수 있는지 확인해야 합니다.
2. 빌더 인터페이스에서 공통 구성 단계를 선언합니다.
3. 각 제품 표현에 대한 구체적인 빌더 클래스를 만들고 해당 구성 단계를 구현합니다.
4. 감독 클래스를 만드는 것에 대해 생각해봅니다. 동일한 빌더 객체를 사용하여 제품을 구성하는 다양한 방법을 캡슐화 할 수 있습니다.
5. 클라이언트 코드는 빌더 및 감독 객체를 모두 생성합니다. 구성이 시작되기 전에 클라이언트는 빌더 객체를 감독에게 전달해야 합니다. 일반적으로 클라이언트는 감독 클래스 생성자의 매개변수를 통해 이 작업을 한 번만 수행합니다. 감독은 모든 추가 구성에서 빌더 객체를 사용합니다.
6. 모든 제품이 동일한 인터페이스를 따르는 경우에만 디렉토리로부터 직접 구축 결과를 얻을 수 있습니다. 그렇지 않다면 클라이언트는 빌더에서 결과를 가져와야 합니다.

## 장점과 단점

### 장점

- 코드 **가독성**이 올라갑니다.
- 객체의 **생성과 표현의 관심사 분리**가 가능합니다.
- 객체를 **단계별로 생성**하거나 **생성 단계를 연기**하거나 **재귀적으로 생성 단계를 실행**할 수 있습니다.

### 단점

- 여러 개의 새 클래스를 생성해야 하기 때문의 코드의 전반적인 복잡성이 증가합니다.

## 다른 패턴과의 관계

- 많은 소프트웨어 설계가 [팩토리 메서드](https://www.notion.so/Factory-Method-Pattern-f0a1138581944526a922f939b297a2cf)(덜 복잡하고 하위 클래스를 통해 사용자 정의가 가능)를 사용하기 시작해서 [추상 팩토리](https://www.notion.so/Abstract-Factory-Pattern-98bb3de4a21942b4b470e34394b6f468), 프로토타입 또는 [빌더](https://www.notion.so/Builder-Pattern-1b84a9252ac046078a4015bfa595ee82)(더 유연하지만 복잡함)로 발전합니다.
- [빌더](https://www.notion.so/Builder-Pattern-1b84a9252ac046078a4015bfa595ee82)는 복잡한 객체를 단계별로 구성하는 데 중점을 둡니다. [추상 팩토리](https://www.notion.so/Abstract-Factory-Pattern-98bb3de4a21942b4b470e34394b6f468)는 관련 객체의 연관성에 중점을 둡니다. 추상 팩토리는 제품을 즉시 반환하지만, 빌더를 사용하면 제품을 가져오기 전에 몇 가지 추가 구성 단계를 실행할 수 있습니다.
- 재귀적으로 작동하도록 구성 단계를 프로그래밍할 수 있으므로, 복잡한 합성 트리를 만들 때 사용할 수 있습니다.
- [빌더](https://www.notion.so/Builder-Pattern-1b84a9252ac046078a4015bfa595ee82)와 브릿지를 결합할 수 있습니다. 감독 클래스는 추상화 역할을 하고 다른 빌더는 구현 역할을 합니다.
- [추상 팩토리 클래스](https://www.notion.so/Design-Pattern-be5c2addc0d14f49a58bc4c20643a41b), [빌더](https://www.notion.so/Builder-Pattern-1b84a9252ac046078a4015bfa595ee82) 및 프로토타입 패턴은 모두 싱글톤 패턴으로 구현될 수 있습니다.

## 참고

- [Builder in TypeScript](https://refactoring.guru/design-patterns/builder/typescript/example)
- [빌더 패턴(Builder Pattern)](https://dev-youngjun.tistory.com/197)
