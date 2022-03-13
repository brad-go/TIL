# [Webpack] JavaScript 개발 환경 세팅

## 목차

1. [시작하기](#시작하기)
2. [CSS 적용하기](#css-적용하기)
3. [이미지 불러오기](#이미지-불러오기)
4. [이전 빌드 데이터 제거하기](#이전-빌드-데이터-제거하기)

## 들어가며

웹팩을 사용하여 개발환경을 세팅하는 방법에 대해 정리한 글이다. 웹팩을 사용해서 세팅을 하다가 너무 막히는 부분도 많고 이해도 안되서 최소한의 세팅과 필수적인 패키지 설치만을 다루려고 한다.

## 기본 폴더 구조

```bash
.
├── node_modules
├── assets
├── src
│    ├── App.js
│    ├── index.js
│    └── style.css
└── index.html
```

## 시작하기

### 패키지 설치

```bash
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```

- **webpack**: 웹팩 설치
- **webpack-cli**: 웹팩을 cli(Command Line Interface) 환경에서 실행할 수 있게 해줌
- **webpack-dev-server**: 일일히 빌드 명령어를 통해 수정 사항을 적용하는 불편함을 해소하기 위해 사용, 개발하기 쉽게 서버를 띄워주는 역할을 한다.
- **html-webpack-plugin**: 배포 시 index.html 파일도 함께 있어야 하고 html 파일을 읽어들이게 하기 위해 설치

### package.json 수정

```json
"scripts": {
  "build": "webpack --mode production",
  "start": "webpack serve --open",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

- **build**: 웹팩을 적용해 배포를 위한 빌드 파일을 생성한다. 배포 시에 모드가 development면 필요없는 코드가 포함되기 때문에 최적화된 파일로 만들기 위해 production 모드 사용
- **start**: 웹팩이 적용된 개발 서버를 열어준다. 뒤에 `--mode development`를 붙여서 개발 모드로 열어도 됨.

### webpack.config.js 생성

웹팩 명령어를 실행했을 때 이곳에 있는 명령어를 자동으로 적용한다.

```js
// 노드에서 제공하는 path 모듈 사용. 파일이나 폴더의 경로 작업을 위한 경로 제공
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 웹팩 데브 서버는 개발 모드에서만 사용할 수 있기 때문에 설정, package.json의 start에 "webpack serve --open --mode development" 작성해줘도 됨
  mode: "development",
  // 시작파일. 여기서 시작해서 사용하는 모듈들을 모두 파악
  entry: "./src/index.js",
  // 만들어지는 최종 파일을 내보내는 옵션
  output: {
    // 만들어질 파일명
    filename: "main.js",
    // 현재 경로(webpack.config.js가 위치한 곳) 하위의 dist폴더를 의미
    path: path.resolve(__dirname, "dist"),
  },
  // 개발 서버가 dist 폴더를 제공할 수 있도록 작성
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 8080,
  },
  plugin: [
    new HtmlWebpackPlugin({
      // 이 옵션 없이 사용하면 빌드 시 개발한 것이 적용되지 않는다. 기존에 만들어둔 파일을 기반으로 html을 만들어준다.
      template: "./index.html",
    }),
  ],
};
```

### index.html 수정

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Example</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="App"></div>
    <!-- 스크립트 제거 -->
  </body>
</html>
```

웹팩 설정으로 인해 자동으로 `index.js`를 삽입해주기 때문에 스크립트 태그를 추가한 것을 제거해 준다.

## CSS 적용하기

### 패키지 설치

```bash
npm i -D style-loader css-loader
```

- **style-laoder**: 읽어들인 css를 스타일 태그로 만들어서 html의 head에 넣어주는 역할
- **css-loader**: css 파일을 읽어주는 역할

### webpack.config.js 수정

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // mode, entry, output, devServer 설정 생략...
  // css는 플러그인이 아닌 module로 작성해줘야 함
  module: {
    rules: [
      {
        // 확장자가 css일 때
        test: /\.css$/,
        // 이렇게 사용한다고 알림. use에 들어가는 배열을 뒤에서 부터 적용 css로더로 읽고 style-loader로 넣어준다.
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugin: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
```

### index.html 수정

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Example</title>
    <!-- 스타일시트 제거 -->
  </head>
  <body>
    <div class="App"></div>
  </body>
</html>
```

마찬가지로 웹팩에서 설정한 `style-loader`가 자동으로 스타일을 삽입해주기 때문에 스타일시트 삽입 부분을 제거해준다. `index.js`에서 `import`해서 사용하면 된다!

## 외부 스타일 시트 삽입하기

위 방식대로 하면 외부 스타일 시트를 읽어오는 것이 아니라, 스타일을 태그로 만들어 헤드 태그에 넣어주는 방식이다. 외부 스타일 시트를 삽입하는 방식으로 사용하기 위해서 아래와 같이 수정해준다.

### 패키지 설치

```bash
npm i -D mini-css-extract-plugin
```

### webpack.config.js 수정

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // mode, entry, output, devServer 설정 생략...
  module: {
    rules: [
      {
        test: /\.css$/,
        // 헤드에 스타일 태그가 아닌 외부에서 가져오는 역할을 해준다.
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugin: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    // 가지고 온 플러그인 명시
    new MiniCssExtractPlugin({
      // 옵션으로 파일명 설정
      filename: "style.css",
    }),
  ],
};
```

이렇게 해주면 외부 CSS 파일을 link를 이용해서 가져오는 것을 볼 수 있고, build 시 CSS파일이 생긴 것을 알 수 있다.

## 이미지 불러오기

이 설정 없이 JS파일에서 이미지를 불러오게 되면 이 파일을 처리할 수 있는 로더가 없다는 에러가 발생한다. 그렇기 위해 다음과 같이 설정해준다.

### 패키지 설치

```bash
npm i -D file-loader
```

- **file-loader**: 파일을 읽어들이는 역할을 한다.

### webpack.config.js 수정

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // mode, entry, output, devServer 설정 생략...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // 읽어들일 확장자를 명시
        test: /\.(jpg|png|svg|gif)$/,
        // 파일로더를 사용할 것
        use: ["file-loader"],
      },
    ],
  },
  plugin: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
```

이렇게 설정을 해주고 사용할 js 파일에서 이미지를 `import` 해서 사용해주면 된다.

## 이전 빌드 데이터 제거하기

### 패키지 설치

```bash
npm i -D clean-webpack-plugin
```

이전 빌드본 때문에 불필요한 파일들이 남아있는 경우가 있다. 이미지 같은 것들이 남아 업데이트가 되지 않을 수 있는데, 사용하지 않는 파일을 깔끔하게 제거해주는 플러그인이다.

### webpack.config.js 수정

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// default export가 되어있지 않아서 중괄호로 감싸줘야 한다.
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // 읽어들일 확장자를 명시
        test: /\.(jpg|png|svg|gif)$/,
        // 파일로더를 사용할 것
        use: ["file-loader"],
      },
    ],
  },
  plugin: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CleanWebpackPlugin(),
  ],
};
```
