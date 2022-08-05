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

export {}; // typescript duplicate identifier 방지용. 신경 쓰지 않으셔도 됩니다.
