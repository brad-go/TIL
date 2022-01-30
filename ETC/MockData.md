# Mock Data

## Mock data란?

mock data란 실제 데이터가 아닌 프론트엔드 개발자가 필요에 의해 샘플로 만든 데이터다. 즉, **임시로 만든 가짜 데이터**다.

## Mock data가 필요한 이유

페이지 레이아웃은 나왔지만 API는 아직 준비중인 경우, API가 나올때까지 기다리는 것이 아니라 **mock data를 만들어 기획에 맞게 UI가 구현되는지 확인**해야한다.

:sparkles: **프론트엔드 개발자로서 백엔드 API가 준비되지 않았을 때에도 mock data(가짜 데이터)로 작동하게 만들기**

## Mock data의 종류

## 1. JSON(JavaScript Object Notation)

백엔드와 프론트엔드가 **JavaScript의 객체 형식으로 데이터를 주고 받을 수 있는 데이터 형식**

- 자바스크립트 문법과 유사하지만 자바스크립트도 아니고, 자바스크립트에서만 사용할 수 있는 것이 아니다!
- 많은 프로그래밍 언어에서 JSON의 파싱과 직렬화를 지원한다.

### JSON을 사용하는 이유

- 웹 상에서 프론트와 백이 통신으로 데이터를 보낼 때 서로 약속된 데이터 형식이 필요
- 여러 데이터 형식 중 프론트에서는 객체(Object)라고 부르는 데이터 형식이 여러 타입의 데이터를 표현하기 쉽다.
- 객체는 key, value로 데이터 이름도 명확히 줄 수 있고, 숫자, 문자, 배열, boolean, 객체 등 여러 형식을 담을 수도 있다.
- 웹 클라이언트(=프론트엔드)는 무조건 JavaScript 기반의 언어다. 그렇기 때문에 객체(Object)의 형식으로 주고 받는다고 하더라도 웹 클라이언트에서 사용하는 JavaScript에서 쓰는 문법과 가장 비슷하게 만드는 것이 좋을 것이다.

### 1-1. JSON에서 사용 가능한 타입

```
🗄️ - String
   - Number
   - boolean
   - null
   - object
   - array
```

→ 일반적으로 **객체**와 **배열**이 JSON **데이터 구조에서 최상위 레벨**에 있다.

- 사용할 수 없는 타입
  - function
  - date
  - undefined

### 1-2. 자바스크립트와 다른 점

- String을 감쌀 때, "쌍따옴표"만 유효함.
- 객체의 Property Name도 "쌍따옴표"로 감싸야함.
  ```json
  {
    "name": "wecode"
  }
  ```

### 1-3. 파싱과 직렬화(Parse & Stringify)

JSON 데이터를 파싱하면 자바스크립트 객체가 되어 자바스크립트에서 데이터를 사용할 수 있는 것이다.

자바스크립트에서의 JSON 객체는 문자열을 JSON 파싱하고 직렬화 하는 메서드를 갖고 있다. 두개 말고는 특별한거 없다! 끝!

- `JSON.stringify()`: 자바스크립트 객체를 JSON 문자열로 직렬화 한다.
- `JSON.parse()`: JSON을 파싱하여 자바스크립트 값으로 바꾼다.

### 1-4. JSON 통신 방법

- `.json 파일`로 만들어 통신
  - users.json
    ```json
    [
      {
        "name": "wecode"
      }
    ]
    ```
- `public` 폴더
  `public` 폴더 > `data` 폴더 > `usersData.json`
  : 위와 같은 구조를 통해 json에 바로 접근 가능
- `import` 하기
  : 컴포넌트와 같은 레벨에 두고 `import` 해도된다!

# 2. 상수 데이터 사용

---

## data 형태

- 쉽고 간편
- 직관적
- json에서 사용할 수 없는 문법 사용 가능
- `data.js`

```jsx
import "react";

const COMMENT_LIST = [
  {
    id: 1,
    userName: "wecode",
    content: <h1>wecode에 오신걸!! </h1>,
    isLiked: true,
  },
  {
    id: 2,
    userName: "joonsikyang",
    content: "Hi there.",
    isLiked: false,
  },
];

export default COMMENT_LIST;
```
