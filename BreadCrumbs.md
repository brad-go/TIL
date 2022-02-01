# 빵 부스러기 저장소

> 정리하지 못한 배운 내용들을 담아 놓는 저장소
> 공부하고 싶은 것들을 담아 놓는 저장소

### 자바스크립트의 return 1 / 5 수

- 함수안에서 return을 사용하면 값을 반환하거나 함수가 종료되는 것을 알고 있었다.
- 그러나 함수 밖에서 return을 사용하면 아래의 코드를 동작하지 않고 스크립트 자체를 종료한다.
- return과 break의 차이까지

### 자바스크립트의 2차원 배열 1 / 5 수

- 자바스크립트는 진정한 2차원 배열은 없다
- var arr = [][]; 이와 같은 한 번에 2차원 배열 선언이 불가능하다
- 약간의 트릭을 통하여 2차원 배열과 비슷한 배열을 만들 수 있다
  https://gent.tistory.com/296

### npx와 npm 1 / 7 금

#### npm

- 설치 프로그램이자 패키지 매니저라고 불린다.
- Node.js를 이용해 만들어진 여러 어플리케이션들을 명령어 환경에서 손쉽게 설치할 수 있게 해준다.
- Node.js의 앱스토어 같은 느낌으로 볼 수 있다.

### npx

- Node.js를 이용해 만들어진 여러 어플리케이션들을 npm이 설치를 해준다면, npx는 위의 어플리케이션을 단 한 번 임시로 설치하고 지우는 프로그램이다.
- 컴퓨터의 공간 낭비를 줄여준다.
- 실행할 때마다 설치해서 항상 최신 상태의 어플리케이션을 사용할 수 있다.

### React에서 List를 만들 때 항상 key를 사용해야 하는 이유? 1 / 16

### [Git 문제] 현재 브랜치의 끝이 리모트 브랜치보다 뒤에 있으므로 업데이트가 거부되었습니다 ???!!! 1 / 17

create-react-app을 이용해서 리액트 프로젝트를 생성하면 자동으로 git이 초기화 된다. 그 상태에서 깃허브에 만든 리모트 리포지토리와 연결하려고 할 때, readme를 변경하고 push과정에서 저러한 오류가 났다.
이유는 아직 잘 모르겠다. 커밋 명이 같아서 인가?
`git push origin master --force`라는 명령어로 지금 작업중인 내용으로 커밋을 덮어씌우는 방법을 선택했다.

### Styled-Components

#### 설치

```bash
npm install --save styled-components
```

#### 사용

React 프로젝트 생성 후 `styled-components` 모듈에서 `styled`를 불러온 후 온점(.)을 찍고 `html 태그`를 입력하고 백틱(`)기호를 이용해 그 안에 style 작성

```jsx
import styled from "styled-components";

const StyledH2 = styled.h2`
  color: #06f;
  font-size: 1.45rem;
`;
```

온점(.)을 찍고 html태그를 입력하고 백틱(`)기호를 이용해 그 안에 style 작성

```jsx
const StyledH2 = styled(h2)`
  color: #06f;
  font-size: 1.45rem;
`;
```

### @craco/craco

상대 경로가 복잡해질 때 경로를 단순하게 만들어줌

### sr-only

웹 접근성 관련

### gitmoji 사용법

git의 커밋메세지에 이모티콘을 사용하게 해준다!

### git organization

### git issue

### git merge & rebase
