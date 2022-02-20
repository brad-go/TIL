# 팀 프로젝트 초기 세팅하기

리액트 프로젝트 기준 팀 프로젝트 준비사항들

## 목차

## 진행 과정

### Repository 생성

- github에서 팀 프로젝트를 진행할 repository를 생성한다.
- `기간 - 프로젝트명` 형식으로 저장소 이름을 짓는다.

```bash
yarn create react-app 프로젝트명 [--template typescript]
```

- CRA를 이용해 프로젝트 생성하기

```bash
git clone 저장소 url
```

- 생성한 프로젝트로 이동한 후에 만들어둔 저장소 clone하기

```bash
git branch -m master main
```

- git 의 default 브랜치를 rename 하기

```bash
git push -u origin main
```

- github에 main 브랜치로 push하기

### CRA 설정

- 필요없는 파일 및 코드 삭제

```bash
yarn tsc --init
```

- tsconfig.json 파일 생성
- src 아래에 폴더 및 파일 생성(모두 index.ts 생성)

  - api: api받아오는 함수
  - assets: 이미지
  - components
    - base
    - domain
  - constants: api url 및 공통 사용 상수
  - hooks
  - styles: reset css
  - types: 공통 사용 타입들
  - utils: 공통 함수
  - .env: api url 적어놓는 곳

- .gitignore에서 `.env`와 `.vs_code` 추가

### 프로젝트를 위한 패키지 설치

#### craco

##### 크라코 설치

```bash
yarn add -D @craco/craco craco-alias
```

##### package.json 파일 수정

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject",
},
```

##### 프로젝트 루트에 tsconfig.paths.json 파일 생성 및 입력

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~api/*": ["api/*"],
      "~assets/*": ["assets/*"],
      "~components/*": ["components/*"],
      "~constants/*": ["constants/*"],
      "~hooks/*": ["hooks/*"],
      "~styles/*": ["styles/*"],
      "~types/*": ["types/*"],
      "~utils/*": ["utils/*"]
    }
  }
}
```

- 작성 형식은 아래와 같다.

```json
"paths": {
  "쓰고싶은alias/*" : ["baseUrl의 값 기준 경로 ex) ./ 는 src를 의미"]
}
```

##### 프로젝트의 루트에 craco.config.js 파일을 생성하고 아래와 같이 작성

```js
const path = require("path");
const CracoAlias = require("craco-alias");

module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src", // tsconfig.paths.json에 있는 baseUrl 경로값과 맞춰주기
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
  typescript: {
    enableTypeChecking: true /* (default value)  */,
  },
  webpack: {
    // 절대경로 지정
    alias: {
      "~api": path.resolve(__dirname, "src/api"),
      "~assets": path.resolve(__dirname, "src/assets"),
      "~components": path.resolve(__dirname, "src/components"),
      "~constants": path.resolve(__dirname, "src/constants"),
      "~hooks": path.resolve(__dirname, "src/hooks"),
      "~styles": path.resolve(__dirname, "src/styles"),
      "~types": path.resolve(__dirname, "src/types"),
      "~utils": path.resolve(__dirname, "src/utils"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^\\~assets/(.*)$": "<rootDir>/src/assets/$1",
        "^\\~api/(.*)$": "<rootDir>/src/api/$1",
        "^\\~components/(.*)$": "<rootDir>/src/components/$1",
        "^\\~constants/(.*)$": "<rootDir>/src/constants/$1",
        "^\\~hooks/(.*)$": "<rootDir>/src/hooks/$1",
        "^\\~styles/(.*)$": "<rootDir>/src/styles/$1",
        "^\\~types/(.*)$": "<rootDir>/src/types/$1",
        "^\\~utils/(.*)$": "<rootDir>/src/utils/$1",
      },
    },
  },
};
```

##### tsconfig.json을 아래와 같이 수정

```json
{
  "extends": "./tsconfig.path.json",
  "comilerOptions": {
    // 생략...
  },
  // 생략...
  "include": [
    "src"
    "craco.config.js"
  ]
}
```

#### eslint 및 prettier

##### eslint

```bash
yarn add -D eslint
```

- eslint 설치하기

```json
{
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      "typescript": {}
    }
  },
  // eslint 설정을 확장 (prettier, airbnb 등 사용 가능)
  "extends": ["react-app", "prettier"],
  // 자체적으로 정의한 규칙 적용
  "rules": {
    "import/no-anonymous-default-export": "off"
  }
}
```

- `.eslintrc.json` 파일 설정

##### prettier

```bash
yarn add -D prettier
```

- prettier 설치

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "htmlWhitespaceSensitivity": "css",
  "jsxBracketameLine": false,
  "jsxSingleQuote": false,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "proseWrap": "never",
  "endOfLine": "auto"
}
```

- `.prettierrc` 파일 설정

```json
*.md
```

- `.prettierignore` prettier 적용 안할 파일 설정

##### eslint와 prettier 통합하기

```bash
yarn add --save -D eslint-config-prettier
```

#### styled-components 설치 및 reset css 설정

```bash
yarn add styled-components @types/styled-components
```

- styled component 설치

<details>
<summary><b>reset css</b></summary>
<div markdown="1">

```jsx
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
  overflow: hidden;
}
ol,
ul {
  list-style: none;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  color: #323d45;
  font-size: 14px;
  background-color: #fff;
}

a {
  color: inherit;
  text-decoration: none;
}

ol,
ul {
  list-style: none;
  padding: 0;
}

button {
      background: inherit;
      border: none;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
      overflow: visible;
      cursor: pointer;
    }

* {
  box-sizing: border-box;
}

.sr-only {
  position: absolute;
  margin: -1px;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  white-space: nowrap;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
}
`;

export default GlobalStyle;
```

</div>
</details>

- reset css `src/styles/globals.jsx`에 작성

#### Storybook

```bash
npx sb init
```

- storybook 설치

```bash
yarn add --D tsconfig-paths-webpack-plugin
```

- tsconfig-paths-webpack-plugin 설치

```js
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  staticDirs: ["../public"],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      })
    );
    return config;
  },
};
```

- .stroybook 폴더에 main.js파일 수정

```js
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import GlobalStyle from "~styles/Globals";

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
    },
  },
};
```

- .stroybook 폴더에 preveiw.js파일 수정

#### PR 템플릿 및 ISSUE 템플릿 설정

```bash
mkdir .github
```

- 루트 디렉토리에 `.github` 폴더 생성

##### PR 템플릿

```md
## 📌 이슈

> closed #이슈넘버

<!-- PR이 연결된 이슈 번호 작성 -->
<!-- ex) close #[이슈번호] -->

## 🛠 작업 사항

<!-- 리스트 기록해보기 -->

- task1
- task2
- task3

## 📝 요약

<!-- PR 내용 요약 -->

## 📸 첨부

<!-- 참고자료링크 및 스토리북 결과물 Link -->
<!-- ex) 링크, 스크린샷 -->
```

- PULL_REQUEST_TEMPLATE.md 파일에 작성

##### ISSUE 템플릿

```md
---
name: Custom issue template
about: 기능, UI, 문서 개선 및 추가 요청을 위한 템플릿입니다.
title: ""
labels: ""
assignees: ""
---

# ISSUE

## 종류

ISSUE 종류를 선택하세요

- [ ] Code Review
- [ ] New Feature
- [ ] Bug Fix
- [ ] CI / CD
- [ ] Setup

## 제목

- 제목 : 제목을 작성합니다.

## 작업 내용

- 내용 : 내용을 작성합니다.

## 체크리스트

- [ ] 체크리스트
```

- ISSUE_TEMPLATE.md 템플릿 작성
