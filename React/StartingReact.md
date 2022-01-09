# [ React ] React 시작하기

## 목차

1. [전제 조건](#precondition)
2. [React란?](#react란)
3. [설정 및 설치](#설정-및-설치)
4. [React 시작해보기](#react-시작해보기)

## Precondition

&nbsp;React를 사용하기 전에 미리 알아야 할 몇 가지 사항이 있다. 이것들을 모른다면 약간씩 이라도 알아보고 다시 React에 대해 공부하자!

- **HTML** 및 **CSS**에 대한 기본 지식
- **JavaScript** 및 프로그래밍에 대한 기본 지식
- **DOM**에 대한 기본 이해
- 익숙한 **ES6 구문 및 기능**
- 약간의 **Node.js** 및 **npm** 사용법

## React란?

- React는 가장 인기 있는 JavaScript 라이브러리이다.
- React는 엄밀히 말하자면 프레임워크가 아니다.
- React는 Facebook에서 만든 오픈 소스 프로젝트이다.
- React는 프론트 엔드에서 사용자 인터페이스(UI)를 구축하는 데 사용된다.
- React는 MVC 애플리케이션(Model View Controller)의 뷰 레이어이다.

> React는 사용자 인터페이스(UI)를 빠르고 효율적으로 구축할 수 있게 해준다. **컴포넌트**를 통해 재사용 가능한 맞춤형 HTML 요소와 같은 구성 요소를 생성할 수 있다. 또, React는 **state** 및 **props**를 사용하여 데이터 저장 및 처리를 단순하게 해준다!

## 설정 및 설치

&nbsp;React를 사용하는 방법은 크게 세가지로 볼 수 있다.

#### 1. 온라인 코드 에디터 사용

&nbsp;React를 사용하는데 관심이 있고, 한 번 간단히 체험을 해보고 싶다면 [CodePen], [CodeSandbox], [Stackblitz] 등의 온라인 코드 에디터를 사용할 수 있다.

#### 2. 웹 사이트에 React를 추가하기

React는 처음부터 점진적으로 도입할 수 있게 설계되었다. 이 방법은 아래와 같은 유형의 사람들이 사용하면 된다.

- **React를 필요한 만큼만 사용하고 싶은 사람**
- **빌드 도구 없이 몇 줄의 코드만**으로 웹사이트의 작은 부분에 시도해보고 싶은 사람

[웹사이트에 React 추가 - React](https://ko.reactjs.org/docs/add-react-to-a-website.html)

#### 3. 새 React 앱 만들기

&nbsp;일반적으로 이 방식을 가장 많이 사용할 것 같다. _Create React APP_, _Next.js_, _Gatsby_ 혹은 더 많은 툴체인[^toolchain]을 사용해서 새 리액트 앱을 만들 수 있다.

## React 시작해보기

#### 필요한 것

- [Node 14.0.0 혹은 상위 버전](https://nodejs.org/en/)
- [npm 5.6 혹은 상위 버번](https://nodejs.org/en/)

컴퓨터에 Node.js나 npm이 깔려있는지 확인하고 싶다면 터미널에 다음과 같이 입력해본다.

```bash
$ node -v      # v16.6.2
```

```bash
$ npm -v       # 7.20.3
```

#### 시작하기

[create-react-app](https://github.com/facebook/create-react-app)을 시작하려는 디렉토리에서 한 단계 상위 디렉토리로 이동한 후에 터미널에서 다음 코드를 실행한다.

```bash
$ npx create-react-app react-start
```

이 코드를 실행하면 설치가 진행될텐데, 설치가 완료되면 아까 지은 프로젝트명의 디렉토리가 생성된다.

```bash
$ cd react-start
```

이 디렉토리로 이동하여 프로젝트를 시작하면 된다.

```bash
$ npm start
```

이 명령을 실행하면 `localhost:3000`에 새 React 앱과 함께 새 창이 나타난다.

![https://www.taniarascia.com/static/1c5a36e06f57edfc718276e9ddf9a9c1/29007/Screen-Shot-2018-08-18-at-11.37.59-AM.png](https://www.taniarascia.com/static/1c5a36e06f57edfc718276e9ddf9a9c1/29007/Screen-Shot-2018-08-18-at-11.37.59-AM.png)

&nbsp;디렉토리를 확인해보면 node_modules, public, src, package.json, README.md등 다양한 파일이 생겼을 것이다. 당황할 필요 없다. 일단 사용할 파일은 src디렉토리에 있는 파일들이며 **App.js** 파일에 있는 요소들을 수정해서 시작해볼 수 있다!

<!-- Footnote -->

[^toolchain]: 주로 다른 컴퓨터 또는 시스템의 소프트웨어 제품을 만드는 데 사용되는 컴퓨터 프로그램 개발 도구들의 집합

<!-- Linked List -->

[codepen]: https://codepen.io/pen?&editors=0010 "CodePen"
[codesandbox]: https://codesandbox.io/s/new "CodeSandbox"
[stackblitz]: https://stackblitz.com/edit/react-vk5bvq "StackBlitz"
