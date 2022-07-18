# [JavaScript] 자바스크립트의 런타임 (Runtime of JavaScript)

> **런타임(runtime)**: 프로그램이 실행되고 있는 시간, 혹은 실행되고 있는 공간이며 구현체라고도 부른다. (node.js, JVM, PyPy 등)

&nbsp;JavaScript는 브라우저와 떨어질 수 없는 사이인데, 기본적으로 브라우저에서 동작하게 만들어졌기 때문이다. 그래서 **node.js** 가 나오기 전에는 인터넷 익스플로러나, 파이어폭스, 크롬같은 **웹 브라우저가 런타임으로서 유일**했다.
&nbsp;브라우저 내의 자바스크립트 런타임 환경은 크게 아래와 같은 네 가지 요소로 구성되어 있다.

- **자바스크립트 엔진** : 힙 메모리, 콜 스택을 포함하는 자바스크립트 해석 엔진
- **Web API** : DOM 조작, 네트워크 요청/응답 등의 브라우저 고유 기능
- **콜백 큐(Callback Queue)** : WebAPI 로부터 전달받은 콜백 함수 저장
- **이벤트 루프(Event Loop)** : 콜 스택이 빌 때마다, 콜백 큐에서 콜백 함수를 콜 스택으로 하나씩 옮김

콜스택에 대해서 조금 더 알아보고 싶다면 아래의 링크를 통해 알아보자.

[콜스택에 대해 알아보기](./Callstack.md)

<div align="center">
  <img src="https://realrain.net/images/runtime_1.png" alt="runtime" width="90%">
</div>

## Javascript 런타임의 동작

다음의 예시 코드를 보면서 런타임의 동작 방식을 이해해보자.

```javascript
console.log("Sending request to server!");
setTimeout(function () {
  console.log("Here is your data from the server...");
}, 3000);
console.log("I AM AT THE END OF THE FILE!");
```

아래 사이트에서 이 코드가 어떻게 동작하는지 보면서 **런타임(브라우저)** 이 어떻게 동작하는 지 알아보자.

[코드 동작 살펴보기](http://latentflip.com/loupe/?code=Y29uc29sZS5sb2coIlNlbmRpbmcgcmVxdWVzdCB0byBzZXJ2ZXIhIikKc2V0VGltZW91dChmdW5jdGlvbigpIHsKICAgIGNvbnNvbGUubG9nKCJIZXJlIGlzIHlvdXIgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIuLi4iKQp9LCAzMDAwKQpjb25zb2xlLmxvZygiSSBBTSBBVCBUSEUgRU5EIE9GIFRIRSBGSUxFISIp!!!)

1. `console.log("Sending request to server!");`가 콜 스택에 올라가고 실행된다.
2. 출력 후에 `setTimeout(function () {...}, 3000);`이 콜 스택에 올라간다.
3. `setTimeout()` 은 Web API 의 기능이므로 이를 Web API 가 실행하도록 넘겨 주고 콜 스택을 비웁니다.
4. 콜 스택이 비었으니 `console.log("I AM AT THE END OF THE FILE!");`이 콜 스택에 올라가고 실행된다.
5. WebAPI 는 3초 후 같이 넘겨받은 callback 함수를 콜백 큐에 넣어 준다.
6. 이벤트 루프는 자바스크립트 엔진의 콜 스택을 감시하고 있다가 콜 스택이 비게 되면 콜백 큐에 있는 함수를 콜 스택으로 넘겨준다.
7. 콜 스택에서 함수가 실행되고 `console.log("Here is your data from the server...");`가 실행된다.
8. 출력 후에 함수가 종료된다.

> setTimeout 외에도 DOM 에 부착되는 이벤트 핸들러, AJAX 요청도 이와 동일하게 동작한다.

&nbsp;브라우저의 자바스크립트 런타임에서 이러한 방식을 사용하는 이유는 **자바스크립트 엔진이 싱글 스레드로 작동**하기 때문이다! 싱글스레드 환경에서 이벤트 루프를 사용하지 않고 WebAPI 를 동기식으로 요청하게 되면 해당 동작이 끝날 때까지 블로킹되어 다른 동작을 처리할 수 없게 되고 우리는 사용의 불편함을 느낄 것이기 때문이다. (자바스크립트 엔진이 싱글스레드인 것이지, 브라우저가 싱글스레드로 동작하는 것이 아니다.)

&nbsp;싱글스레드로 동작함에도 불구하고 브라우저 사용자 입장에서 여러 작업이 동시에 일어나는 것 처럼 보이는 이유가 바로 **이벤트 루프를 통해 동시성을 구현했기 때문**이다.

[싱글 스레드 언어 자바스크립트](./SingleThreaded.md)

## 참고

- [JavaScript 비동기 처리의 이해](https://realrain.net/post/async-await/)
