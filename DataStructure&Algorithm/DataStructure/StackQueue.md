# Stack & Queue (스택과 큐)

&nbsp;스택과 큐는 자료구조이지만 일종의 규칙이라고도 할 수 있다. 자료구조가 **스택(Stack)** 혹은 **큐(Queue)** 로 구분되기 위한 우리의 상상으로 이루어진 규칙이다. 이러한 자료구조를 **추상적 자료구조(ADT)** 라고 한다!

- **추상적 자료구조(Abstract Data Type)**: 자료구조의 방법이 코드로 정의된 것이 아닌 그 구조의 **행동 양식만 정의**된 것

> 스택과 큐는 배열 위에 어떠한 규칙을 설정한 모습이다.

## Stack

![스택](https://media.vlpt.us/images/kimkevin90/post/3d7358d4-9585-4605-bcf1-20732984f6ae/stack.png)

&nbsp;**스택(Stack)** 은 배열과 마찬가지로 1열로 나열되어 있지만, 배열이 수직으로 쌓여 있는 모습으로 상상해 볼 수 있다. 서류를 쌓아 놓은 경우처럼 **새롭게 추가한 데이터에만 접근할 수 있다.** 새로운 서류가 도착하면 현재 서류 더미의 가장 위에 올려두고 서류를 꺼낼 때는 가장 위에서부터 꺼내는 것과 같다.

- 스택에 데이터를 추가할 때는 가장 위에 추가된다.
- 데이터를 조작할 수 있는 위치가 정해져 있으며, 데이터 추가와 삭제를 같은 쪽에서 한다.
- **Push(푸시)**: 스택에 데이터를 추가하는 작업
- **Pop(팝)**: 스택에서 데이터를 꺼내는 작업
- 나중에 넣은 것을 먼저 꺼내는 LIFO(Last In First Out)구조. 즉, 후입선출 구조로 동작한다.

### 스택의 장점

- 동적인 메모리 크기
- 데이터를 받는 순서대로 정렬
- 빠른 런타임(실행속도)를 가지고 있다.

### 스택의 단점

- 데이터 추가나 삭제가 단방향으로만 가능하다.
- 데이터의 접근도 스택의 가장 위에 있는 데이터(가장 최신 요소)만 가능하다. 즉, 중간에 있는 데이터가 필요하면 해당 데이터가 제일 위에 올 때까지 데이터를 팝(pop)해야 한다.
- 한 번에 하나의 데이터만 처리 가능

### 스택의 활용

- 항상 최신 데이터에만 접근할 수 있도록 하는 구조
- 깊이 우선 탐색의 후보 관리에 스택을 사용할 수 있다.
- 되돌리기 및 Crtl + Z
- 브라우저의 뒤로가기 버튼

## Queue

![큐](https://media.vlpt.us/images/kimkevin90/post/82b66b4b-d6fa-4892-aaae-91807a2465e1/queue.PNG)

스택과 마찬가지로 데이터를 1열로 나열한 구조이다. 스택과 비슷하지만 **큐는 추가하는 측과 삭제하는 측이 반대**이다. 큐는 '대기 행렬'이라고도 불린다. 버스를 탈 때 줄을 서는 모습을 상상하면 이해하기 쉽다. 새롭게 온 사람이 가장 뒤에 서며, 가장 앞에 있는 사람부터 버스를 탈 수 있다.

- 큐에 데이터를 추가하면 가장 뒤에 추가된다.
- 데이터를 조작할 수 있는 위치가 정해져 있으며, 스택과 달리 추가하는 쪽과 삭제하는 쪽이 반대이다.
- **인큐(Enqueue)**: 큐에 데이터를 추가하는 작업
- **디큐(Dequeue)**: 큐에서 데이터를 꺼내는 작업. 큐에서 데이터를 꺼낼 때는 가장 먼저 들어온. 즉, 가장 오래된 데이터부터 꺼낸다.
- 먼저 넣은 것을 먼저 꺼내는 FIFO(First In Fisrt Out)구조. 즉, 선입선출 구조로 동작한다.

### 큐의 장점

- 동적인 메모리 크기
- 데이터가 받는 순서대로 정렬
- 빠른 런타임(실행 시간)

### 큐의 단점

- 가장 오래된 요소만 접근이 가능하다.
- 중간에 있는 데이터에 접근할 수 없으며, 필요한 데이터가 나올 때까지 디큐를 해야한다.
- 한번에 하나의 데이터만 처리 가능

### 큐의 사용

- 너비 우선 탐색에서 탐색 후보 중에서 항상 가장 오래된 것을 선택하므로 후보 관리에 큐를 활용한다.
- 반복적이고 자주 받는 데이터를 비동기적으로 처리 할 때 효율적
- 음성 데이터 처럼 순서에 민감한 데이터를 처리 할 때
- 프린트 대기열처럼 가장 먼저 입력 받은 데이터를 먼저 처리해야 할 때
- 캐시(Cache) 구현

## 스택 vs 큐

|             | 접근        | 추가        | 삭제        |
| ----------- | ----------- | ----------- | ----------- |
| 스택(Stack) | 느림 / O(n) | 빠름 / O(1) | 빠름 / O(1) |
| 큐(Queue)   | 느림 / O(n) | 빠름 / O(1) | 빠름 / O(1) |

## 참고

- [JavaScript를 이용한 Stack 구현](https://velog.io/@kimkevin90/Java-script%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-Stack-%EA%B5%AC%ED%98%84)
- [개발자라면 꼭 알아야 할 7가지 자료구조](https://velog.io/@jha0402/Data-structure-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-7%EA%B0%80%EC%A7%80-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0)
