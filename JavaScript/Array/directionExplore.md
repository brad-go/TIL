# 2차원 배열의 4방향, 8방향 탐색

<div align="center">
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTvLH3%2FbtqBEBqU87w%2Fho1SmcpBFULg03QymGVNw0%2Fimg.png" alt="map"/>
</div>

## 2차원 배열에서 각 인덱스에서 인접한 인덱스의 값을 탐색하려면 어떻게 해야할까?

&nbsp;방향 탐색을 이해하기 위해서 간단한 문제를 풀이해보면서 이해해 볼 것이다. 문제는 이렇다.

#### 문제

- 2차원 배열이 주어진다.
- 해당 배열의 각 인덱스 별로 상하좌우로 인접한 인덱스들의 값을 체크한다.
- 인접한 인덱스들의 값이 홀수일 경우 모두 더한다.
- 방향 탐색을 한 중심 인덱스와 홀수를 모두 더한 값을 출력

#### 입력 예시

```txt
8 4 5 6
8 45 12 6
9 8 4 1
1 3 5 7
```

#### 출력 예시

```zsh
arr[0][0]: 0
...
arr[1][2]: 50
...
arr[3][3]: 6
```

### 4방향 탐색하기

#### 내가 혼자 풀었던 방식

##### 입력 받기

```js
const inputs = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const arr = [];

for (let input of inputs) {
  const line = input.split(" ").map((v) => +v);
  arr.push(line);
}
```

##### 코드

```js
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    let oddSum = 0;

    // 사방 탐색을 위해 조건문 만을 이용해서 코드를 작성했을 경우
    if (i > 0) {
      if (arr[i - 1][j] % 2 === 0) oddSum += arr[i - 1][j];
    }
    if (j > 0) {
      if (arr[i][j - 1] % 2 === 0) oddSum += arr[i][j - 1];
    }
    if (i < 3) {
      if (arr[i + 1][j] % 2 === 0) oddSum += arr[i + 1][j];
    }
    if (j < 3) {
      if (arr[i][j + 1] % 2 === 0) oddSum += arr[i][j + 1];
    }

    console.log(`arr[${i}][${j}]: ${oddSum}`);
  }
}
```

##### 출력

```zsh
arr[0][0]: 0
arr[0][1]: 50
arr[0][2]: 0
arr[0][3]: 5
arr[1][0]: 54
arr[1][1]: 0
arr[1][2]: 50
arr[1][3]: 1
arr[2][0]: 1
arr[2][1]: 57
arr[2][2]: 6
arr[2][3]: 7
arr[3][0]: 12
arr[3][1]: 6
arr[3][2]: 10
arr[3][3]: 6
```

##### 풀이

&nbsp;위의 예시 입력의 모든 인덱스에서 **4방향 탐색**을 한다고 했을때의 풀이 방법이다. 처음에는 조건문을 통해서 해결하려고 했는데, 4방향 탐색까지는 코드가 괜찮게 볼 수는 있었는데, 8방향 탐색을 하려고 하니 마치 콜백 지옥을 연상케하는 코드가 작성되었다.

#### 새롭게 알게 된 방식

&nbsp;문제를 풀면서 위로 가면 탐색 인덱스 값이 -1, 아래로 가면 1, 중간은 0 인데 이걸 어떻게 할 수 없을까? 생각은 했었고, 반복문으로 해볼까 해서 시도도 해봤었다. 하지만 실패했었는데 코드로 표현하는 능력이 아직 부족한 것 같다.
&nbsp;그래서 다른 방법을 찾던 중 친구의 도움으로 정말 획기적인 방법을 찾아냈다. **탐색할 방향값을 미리 배열에 저장해두는 것**이다.

##### 코드

```js
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    let oddSum = 0;

    // 방향을 미리 저장하기 위(-1, 0), 오른쪽(0, 1), 아래(1, 0), 왼쪽(0, -1)
    const di = [-1, 0, 1, 0];
    const dj = [0, 1, 0, -1];

    for (let k = 0; k < di.length; k++) {
      // 현재 인덱스 값에 미리 정해 둔 방향값을 더함으로 인접한 인덱스의 값을 구한다.
      let r = i + di[k];
      let c = j + dj[k];

      // r이나 c가 0보다 작거나 배열의 길이보다 크면 안되고, 홀수로 나뉠 때만 더한다.
      if (
        0 <= r &&
        r < arr.length &&
        0 <= c &&
        c < arr.length &&
        arr[r][c] % 2 === 1
      ) {
        oddSum += arr[r][c];
      }
    }

    console.log(`arr[${i}][${j}]: ${oddSum}`);
  }
}
```

##### 출력

```zsh
arr[0][0]: 0
arr[0][1]: 50
arr[0][2]: 0
arr[0][3]: 5
arr[1][0]: 54
arr[1][1]: 0
arr[1][2]: 50
arr[1][3]: 1
arr[2][0]: 1
arr[2][1]: 57
arr[2][2]: 6
arr[2][3]: 7
arr[3][0]: 12
arr[3][1]: 6
arr[3][2]: 10
arr[3][3]: 6
```

### 8방향 탐색하기

여기서 **8방향 탐색**의 경우로 하려면 어떻게 해야할까? 또 코드를 난잡하게 작성해야 할까? 아니다. 답은 정말 간단한다. 위 코드를 이해했다면 아주 쉽게 해볼 수 있을 것이다.

```js
const di = [-1, -1, 0, 1, 1, 1, 0, -1];
const dj = [0, 1, 1, 1, 0, -1, -1, -1];
```

위의 코드처럼 **인덱스가 탐색할 방향값을 저장해 놓은 배열을 수정만 해주면 된다.**

### 특정 인덱스의 주변값만 탐색해서 출력하기

##### 입력

```txt
8 4 5 6
8 45 12 6
9 8 4 1
1 3 5 7
```

##### 코드

```js
const arr = [];

for (let input of inputs) {
  const line = input.split(" ").map((v) => +v);
  arr.push(line);
}

// 상, 하, 좌, 우 순
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const findSurroundings = (row, col) => {
  // 탐색할 방향을 담은 배열의 길이만큼 반복
  for (let d = 0; d < dir.length; d++) {
    const r = row + dir[d][0];
    const c = col + dir[d][1];

    if (r >= arr.length || r < 0) continue;
    if (c >= arr.length || c < 0) continue;

    console.log(`arr[${r}][${c}]: ${arr[r][c]}`);
  }
};

// arr(1, 1)에 인접한 상하좌우 인덱스의 값을 알고 싶다면
findSurroundings(1, 1);
```

##### 출력

```zsh
// 상, 하, 좌, 우 순으로 출력
arr[0][1]: 4
arr[2][1]: 8
arr[1][0]: 8
arr[1][2]: 12
```
