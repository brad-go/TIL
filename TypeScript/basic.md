# 타입스크립트 기초

## 타입스크립트란?

- **타입스크립트** = 자바스크립트 + **타입 문법**
- 자바스크립트 문법은 그대로 이용가능하지만 타입 부분을 업그레이드 해서 사용할 수 있는 것

## 타입스크립트를 쓰는 이유 ?

1. **타입을 엄격히 검사해준다.**

자바스크립트 `5 - '3'`의 숫자에서 문자를 빼는 연산이 가능하다(_Dynamic typing_ 가능). 원래 `숫자 - 숫자`의 연산만이 가능하지만 JS가 알아서 숫자로 바꿔주는 것이다.

하지만 이 편리함은 프로젝트가 커지면 단점으로 적용된다. 코드가 천줄 혹은 그 이상이라고 생각하면 어디서 에러가 발생했는지 찾기 힘들게 되고 결국 유지보수가 힘들어진다. 즉, **코드를 길게 짤땐 자유도 & 유연성은 문제가 된다.**
<br> 2. **에레메세지 퀄리티가 좋다.**

- 자바스크립트는 에러 메세지가 추상적이고 추적이 어렵다.
- 엄격하게 타입을 체크하는 것을 인식하기 때문에 엄격한 타입 체크 덕분에 타입 체크와 오타 교정 또한 해준다.

## 타입스크립트 설치?

### 일반 HTML, CSS, JS 웹 개발 시

#### 1. Node.js 최신 버전 설치, VScode 에디터 설치

Node.js는 언제나 최신버전 아니면 에러가 잦기 때문에 주의

#### 2. VScode 에디터에서 터미널에 오픈후 입력

```bash
npm install -g typescript
```

타입스크립트 컴파일러를 전역으로 설치

<details>
<summary>에러가 난다면?</summary>
<div markdown="1">

1. Node.js 최신버전이 설치 되어 있는지 확인하자.
2. 맥북인 경우 보안 에러가 뜬다면 설치 시 sudo를 앞에 붙여서 권한을 부여

</div>
</details>
<br>

#### 3. 코드 작업 폴더 만든 후 작업 폴더를 에디터로 열기

#### 4. 작업 폴더에 .ts로 끝나는 파일 만들고 타입스크립트 사용 시작하기

- ts파일은 js랑 똑같이 사용가능
- 하지만 웹 브라우저가 ts 파일을 이해하지 못하기 때문에 js 파일로 변환 작업 필요

#### 5. js 파일로 변환하기

##### 5-1. 수동 변환

```bash
tsc 만든파일.ts
```

- 터미널에 tsc 만든파일.ts 입력
- 만든 ts파일을 js파일로 변환시켜준다.

##### 5-2. 자동 변환

```bash
tsc -w
```

- 종료하기 전까지 자동으로 ts파일을 js파일로 변환 시켜줌

위 두 방법모두 명령어를 입력하면 만든파일.js 파일이 생길 것이고, ts가 js로 변환되어 이 파일에 저장된다. 작업은 .ts 파일에서 하면된다.

#### 6. 타입스크립트로 작성한 코드 사용하기

```html
<script src="변환된파일.js"></script>
```

html 파일에 변환된 js파일을 삽입해서 사용할 수 있다.

### React에서 TypeScript 사용하기

#### 1. 이미 있는 React 프로젝트에 설치

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

#### 2. 새로운 프로젝트 생성시

```bash
npx create-react-app my-app --template typescript
```

## 타입스크립 기초 정리

### 변수의 타입 지정

```ts
const userName: string = "Kim";
```

- 변수명: 타입명 이렇게 작성
- 쓸 수 있는 타입: `string`, `number`, `boolean`, `bigint`, `null`, `undefined`, `[]`, `{}` 등

```ts
const userName: string = "Kim";
userName = 123;
```

- 타입을 지정해놓으면 의도치 않게 타입이 변경된 경우 에러메세지를 띄워준다.
- 덕분에 타입관련 버그들을 사전에 찾아 없앨 수 있다.

#### 여러가지 타입을 받을 경우

```ts
const userId: string | number = 123;
```

- 변수에 여러가지 타입의 데이터가 들어올 수 있다면 '`|`' 기호를 이용해 or 연산자를 표현할 수 있다.

#### 타입을 변수에 담기 (type alias)

```ts
type UserId = string | number;
const userId: UserId = 123;
```

- 타입이 길다면 type 키워드를 이용해 **타입을 변수처럼 담아서 사용가능**
- 타입 지정이 길다면 변수로 만들기
- 일반적으로 변수와 구분하기 위해 대문자로 시작

#### 나만의 타입 만들기 (literal type)

```ts
type NameType = "kim" | "park";
const userName: NameType = "kim";
```

- string, number 뿐 아니라 나만의 타입을 만들어서 사용 가능
- 원하는 글자나 숫자를 입력하면 userName이라는 변수에는 'kim' 또는 'park'만 들어올 수 있다.

### 배열의 타입 지정

```ts
// string이 들어간 array
const userNames: string[] = ["kim", "park"];

// 숫자가 들어간 array
const nums: number[] = [1, 2, 3, 4, 5];
```

- 배열명: 배열에 들어갈 타입[] 이렇게 작성할 수 있다.

#### 배열에 들어올 자료 지정하기 (tuple 타입)

```ts
// 첫번재는 무조건 number, 두번째는 boolean
type Member = [number, boolean];
const john: Member = [123, true];
```

- 배열 자료 안에 순서를 포함해서 어떤 자료가 들어올지 정확히 지정하고 싶으면 tuple 타입 사용
- 대괄호 안에 들어올 자료의 타입을 차례로 적기

### 객체에 타입 지정

```ts
const user: { name: string } = { name: "kim" };
```

- 객체명: { 키: 키값에 들어올 타입 } 으로 지정

```ts
// name이 없어도 에러가 안뜸
const user: { name?: string } = {};
```

- object에서 name이라는 키가 들어올지 말지 불확실하다면 콜론 앞에 물음표 붙이기.

#### 타입을 변수에 담기 (interface)

```ts
// type MyObj = {}로 작성해도 무방
interface MyObj {
  name?: string;
  age: number;
}

const user: MyObj = {
  name: "kim",
  age: 50,
};
```

#### object에 어떤 속성이 들어갈지 모른다면? (index signature)

```ts
interface MyObj {
  [key: string]: number;
}

let user: MyObj = {
  age: 50,
  weight: 100,
};
```

- object안에 어떤 속성이 들어갈지 아직 모른다면 한번에 지정해버리기

#### 객체 타입 지정 사용 예시

```ts
interface IUser {
  name: string;
  email: string;
  age: number;
  isMarried: boolean;
}

const fetchData = (apiUrl: string): Promise<IUser> => {
  return fetch(apiUrl).then((res) => res.json());
};

const user: IUser = fetchData("apiurl.com/api");
```

우리는 흔히 API데이터를 받아오는 함수를 사용할 것이다. 타입스크립트에서는 이 상황에서도 타입을 지정해줘야 한다. API URL은 string이므로 맞게 타입을 지정해주고, 함수는 항상 return될 값의 형식을 지정해줘야 한다. 여기서는 프로미스를 return 할 것이기 때문에 `Promise<>` 형식으로 작성해준다.
그러나 받아오는 객체는 어떻게 받을 수 있을까? interface를 이용해 위와 같이 받아올 객체의 형식을 지정해주면 된다.

### 함수에 타입 지정

```ts
function double(x: number): number {
  return x * 2;
}
```

- 함수는 파라미터와 return 값이 어떤 타입일지 지정해줘야 한다.
- 실수로 다른 타입이 들어오거나 return될 경우 에러를 내준다.
- return 값이 없다면 :void로 설정한다.

```ts
// 에러
function double(x: number | string): number {
  return x * 2;
}

// 정상
function double(x: number | string): number {
  if (typeof x === "number") return x * 2;
}
```

- 타입스크립트는 지금 변수의 타입이 확실하지 않으면 마음대로 연산할 수 없다.
- 항상 타입이 무엇인지 미리 체크하는 narrowing 또는 assertion 문법을 사용해야 허락해준다.

#### 함수 타입 지정 사용 예시

```ts
enum Cheese {
  cheddar = "cheddar",
  gouda = "gouda",
  goat = "goat",
  blueMould = "blueMould",
}

const serveChees = (chesseType: Cheese, servings: number): void => {
  console.log(`You want ${servings} servings of ${chesseType}`);
};

// 에러
serveCheese("americanCheese", 3);

// 가능
serveCheese(Cheese.blueMould, 3);
```

- 함수의 타입 지정 시 매개변수에 항상 타입을 지정해줘야 한다.
- cheeseType에 Cheese 안의 **특정 옵션들 중에만 선택**하기 위해서는 `enum`을 사용한다.

### 클래스에 타입 지정

```ts
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

- 클래스도 타입 지정을 할 수 있다.
- 하지만 중괄호 내에 미리 name 변수를 만들어놔야 contructor 안에서 this.name으로 사용가능
