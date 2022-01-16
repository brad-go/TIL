# [JavaScript] 동기와 비동기(Synchronous and Asynchronous)

동기와 비동기 처리의 개념에 대해서 알아보자.

### 동기(Synchronous)

: **하나의 요청이 처리되는 동안 다른 요청은 처리되지 못하며 요청이 완료되어야 다음 처리가 가능한 방식**

<div align="center">
  <img src="https://t1.daumcdn.net/cfile/tistory/99327B375BC7D7832A" alt="sync"/>
</div>

- 동기 처리 방식은 **직렬적으로 태스크를 수행**한다.
- 태스크는 순차적으로 실행되며, 어떤 작업이 수행중이면 다음 작업은 대기하게 된다.

예를 들어 서버에서 데이터를 가져와서 화면에 표시하는 작업을 수행할 때, 서버에 데이터를 요청하고 데이터가 응답될 때까지 이 후 태스크들은 **블로킹(blocking, 작업 중단)** 된다.

```javascript
const fs = require("fs");

console.log("start");

// 현재 폴더 내의 파일명을 가져와서 filenames에 저장
const filenames = fs.readdirSync(".");
for (let i = 0; i < filenames.length; i++) {
  console.log(filenames[i]);
}

console.log("end");

// 실행 결과: start -> filenames -> end
```

### 비동기(Asynchronous)

: **하나의 요청 처리가 완료되기 전에 제어권을 다음 요청으로 넘겨 블로킹(blocking, 작업 중단) 되지 않으며 다음 요청을 처리 하는 방식**

- 비동기 처리 방식은 **병렬적으로 태스크를 수행**한다.
- 태스크가 종료(완료)되지 않은 상태라도 다음 태스크를 수행한다.

예를 들어 서버에서 데이터를 가져와서 화면에 표시하는 태스크를 수행할 때, 서버에 데이터를 요청한 이후 서버로부터 데이터가 응답될 때까지 **대기하지 않고(Non-Blocking) 즉시 다음 태스크를 수행**한다. 이후 서버로부터 데이터가 응답되면 이벤트가 발생하고 이벤트 핸들러가 데이터를 가지고 수행할 태스크를 계속해 수행한다.
자바스크립트의 대부분의 **DOM 이벤트**와 **Timer 함수(setTimeout, setInterval)**, **Ajax 요청**은 비동기식 처리 모델로 동작한다.

<div align="center">
  <img src="https://t1.daumcdn.net/cfile/tistory/99194A365BC7D8223C" alt="sync"/>
</div>

```javascript
const fs = require("fs");

console.log("start");

// 현재 디렉토리 내에 파일명으로 불러와서 출력
fs.readdir(".", (err, filenames) => {
  // 에러가 있다면 error를 출력하고 종료
  if (err) {
    console.error(err);
    return;
  }

  for (let i = 0; i < filenames.length; i++) {
    console.log(filenames[i]);
  }
});

console.log("end");

// 실행 결과: start -> end -> filenames
```

### 정리

> 동기는 순차적, 직렬적으로 테스크를 수행하고, 비동기는 병렬적으로 테스크를 수행한다.

## 참고

- [동기와 비동기 방식](https://webclub.tistory.com/605)
- [비동기 프로그래밍](https://jinn-blog.tistory.com/87)
