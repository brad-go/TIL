# 원티드 프리온보딩 프론트엔드 코스 2주차

## [ 개인과제 ] 사진과 가구 정보를 표현하는 컴포넌트 구현

&nbsp;코스 진행 중 설연휴가 끼게 되었고, 이번에는 설연휴동안 선택적으로 개인과제를 진행하게 되었다. 1주차를 경험한 후에 실력이 많이 부족한 것 같아서 과제를 포기하고 추가 공부를 하려고 했지만, 과제를 해보는 것이 공부가 되지 않을까 싶어서 도전해보게 되었다.

&nbsp;이번 기업 과제는 사진과 가구 정보를 표현하는 컴포넌트를 구현하는 것이었다. 방사진이 주어졌고, 사진에 보이는 상품들의 위치에 버튼들이 존재했다. 각 버튼들을 클릭하면 사진에 보이던 상품에 대한 정보가 말풍선 형식으로 보여지고 하단의 상품 목록에서도 선택되는 기능을 가진 컴포넌트를 구현하는 것이었다.

### 컴포넌트 구성

&nbsp;1주차에 과제를 하면서 살짝 버거움을 느끼고 있었지만, 이번 과제는 왠지 잘 해낼 수 있을 것 같은 자신감이 있었다. 우선, 화면에 보이는 것에 따라 컴포넌트를 어떻게 구성할지 생각했다.

1. 다른 컴포넌트들을 감싸는 컴포넌트
2. 방 사진 보여지는 각 상품 위에 위치할 상품 태그(돋보기 버튼) 컴포넌트
3. 상품 태그를 클릭하면 보여질 Tooltip(말풍선) 컴포넌트
4. 하단 상품 목록 컴포넌트

### 상품 태그들을 상품과 맞는 위치에 배치하기

&nbsp;상품 태그를 API에서 받아온 데이터대로 위치시켰더니, 문제가 발생했다. 상품 태그들이 해당하는 상품 위에 위치하지 않았다. 뭐가 문제지? 생각하는데, 상품이미지들의 확장자가 다 달랐다. png, jpg, JPEG 등 여러가지 였다. 그래서 혹시 확장자마다 조건을 다르게 줘야하나? 생각했었는데, 너무 어렵게 생각한 거였다.

&nbsp;**받아온 위칫값에 1.6배 정도 곱해주면 되는 거였다.** 생각보다 허무했지만, 위처럼 이런저런 생각을 해보느라 이 해결책을 찾는데 오래걸렸다... :sweat_smile: 그리고 상품 중 하나는 동일한 조건으로 위치를 조정했지만 맞지 않아서 id값을 이용해서 해당 상품 태그에는 위칫값을 살짝 조정해주었다.

### 상품 태그를 클릭하면 선택된 tooltip(말풍선)만 보이게하기

&nbsp;`useEffect`를 사용해서 받아온 API 데이터를 `state`에 저장했고, 이 state에서 상품 정보들을 가져와서 tooltip 컴포넌트를 구현했었다. **상품 태그를 클릭하면 선택된 tooltip(말풍선)만 보이게** 하고 싶었는데 문제가 생겼다.

&nbsp;**상품 태그를 클릭하면 하나만 선택되야 하는데, 전부가 선택되는 문제**였다. tooltip 컴포넌트 안에서 `state`를 사용해서 선택되는 것을 boolean값을 통해 설정했고, `true`라면 tooltip이 렌더링 되게 조건을 작성했었다. id값을 통해서 해당 상품 태그만 선택되게 하고 싶었는데, 생각보다 잘 되지 않았다.

&nbsp;API 데이터를 받아서 저장한 state에 각 상품들에 대한 정보가 있고, 그를 통해 `map()` 함수를 이용해 컴포넌트들을 여러개 만들었었다. 그러던 중에 **'받아온 API 데이터에 선택 여부가 있었으면 쉽게 할 수 있었을 텐데...'** 라고 생각이 들었다.

<div align="center">
<img src="https://image.fmkorea.com/files/attach/new/20200628/727456167/2942516846/2966087074/c042c621d61892bc59611da62e3126d9.jpg" art="의문" width="35%">
</div>

그렇다. 그렇게 하면 되는 거였다. 받아온 state를 업데이트 해줘도 됐지만, 문제가 생길 것 같아서 **API 데이터를 받아올 때 `selected`라는 키 값을 `false`로 부여**했다.

```jsx
useEffect(() => {
  const getData = async () => {
    const { id, imageUrl, productList } = await getAPI();
    const products = productList.reverse().map((product) => ({
      ...product,
      // select값 부여
      selected: false,
    }));
    setData({ id, imageUrl, productList: products });
  };
  getData();
}, []);
```

그리고 상품 태그 컴포넌트를 클릭할 때 `selected`가 클릭된 태그만 변경될 수 있도록, `onClick` 이벤트를 부여했다.

```jsx
const handleProductSelect = (e) => {
  const selectedProductId = Number(e.target.id);
  setData((prev) => ({
    // id, imageUrl
    ...prev,
    // productList의 value에 map을 이용해서 id가 같다면 값을 변경
    productList: prev.productList.map((product) =>
      product.productId === selectedProductId
        ? { ...product, selected: !product.selected }
        : // 다른 것들은 false인채로 유지하게 한다. 이를 작성하지 않으면 나머지 다 사라짐 ㅋ
          { ...product, selected: false }
    ),
  }));
};
```

이 기능을 구현하다가 React hook들을 확실히 더 공부해야 겠다는 생각이 들었다. setState를 통해서 state의 상태를 변경할 때 객체인 경우 아직은 많이 어렵게 느껴졌다. 인터넷을 얼마나 뒤졌는지... :joy:

#### :pray: 배운점

1. `map()` 함수로 생성된 컴포넌트들 중에서 클릭 이벤트 발생 시 하나만 상태 변경하는 방법
2. `state`가 많은 정보를 가진 객체일 때, 상태 update하는 방법

### styled-component로 가변적인 CSS 적용하기

이제 큰 문제는 넘은 것 같았다. 이번에는 **상품 태그의 위치에 따라서 말풍선이 위, 아래로 보이거나 좌, 우로 보이게 해야 했었다**. 예를 들어 아래에 있다면 태그의 위로 말풍선이 보이게 하고, 오른쪽 끝에 있다면 왼쪽으로 태그가 나타나게 해야 했다.

'이건 뭐 별거 아니네~' 하고 코드를 작성하기 시작했다. `styled-components`를 사용하고 있었기 때문에, `props`를 넘겨서 위치를 바꿔야겠다고 생각하고 코드를 작성하는데, 바꿀 CSS 속성이 여러개인 경우에는 어떻게 해야할지 몰랐다. :wink:

<div align="center">
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile22.uf.tistory.com%2Fimage%2F230D484956E2DA60176CC3" alt="분노의 댓글러냥" width="35%">

폭풍 검색 시작...

</div>

찾아보니 간단하게 할 수 있었다. `styled-components`에서 `import` 할 게 하나 더 있었다.

```jsx
import styled, { css } from "styled-components";
```

이렇게 하면 `props`를 전달 받아서 사용할 때 조건 안에서 CSS를 추가로 작성할 수 있었다. 사용한 코드는 다음과 같다. 상품의 위치가 일정 이상이면 다르게 CSS를 적용되게 했다. 결과는 성공적!!

```jsx
${(props) =>
  props.pointX > 500
    ? css`
        top: unset;
        bottom: -8px;
        transform: rotate(180deg);
      `
    : css`
        top: -8px;
      `}
${(props) =>
  props.pointY > 400
    ? css`
        left: unset;
        right: 38px;
      `
    : css`
        left: 31px;
      `}
```

### 상품 태그 클릭 시 선택과 하단 상품 목록의 상품에서 선택 연동시키기

이 기능을 구현하는 건 정말 어려울 것 같았다. 하지만 괜히 쫄았다는 말을 이런데 쓰는 것인가. 한 번에 막힘없이 해결해버렸다. 상품 목록에 위에서 만들었던 `state`와 `onClick` 이벤트를 그대로 전달하고 클릭해봤다. 역시는 역시 역시인가. 당연히 선택됨으로 표시 되었다. 이게 리액트의 힘인가..!!

### 마우스 드래그로 좌우 스크롤 되는 슬라이더 구현하기

하단 상품 목록이 길기 때문에 스크롤이 생기는데, 마우스 스크롤 대신에 드래그를 이용해서 스와이프 이벤트를 구현해야 했다. 이건 정말 막막했다. 왜냐하면 원티드 프리온보딩 코스를 지원할 때, 비슷한 스와이프 이벤트를 구현해야 했었는데, 내가 제대로된 구현에 실패했었기 때문이다. 그때도 여기저기 다 찾아보면서 구현하려고 했지만, 원하는 대로 구현하기 쉽지 않았었다.

그래도 이번에는 제대로 해보자라는 마음에 코드를 짜기 시작했다. 인터넷에 보니 `e.pageX`와 `scrollLeft` 값을 이용해서 마우스 드래그를 통한 스크롤 기능을 구현한 사례가 있었다. 그대로 구현했더니 정말 생각보다 쉽게 스크롤이 됐다.

그러나 원래 사이트와는 달랐다. 원본 사이트는 `translate`를 이용해서 스크롤을 구현했었고, 드래그한 만큼 당겨지고 최대치를 넘을 경우 마우스를 뗀 순간 최대치로 돌아가는 모션이 보였다.

내가 구현한 드래그 스크롤은 애초에 최대치를 넘을 수 없게 구현되었었다. 그래서 결국 따라하는 것을 포기하고 생각을 하기 시작했다.

- `transform: translateX` 속성을 이용해서 스와이프 이벤트를 일으키고 싶었다.
- 드래그가 시작된 거리와 끝난 거리를 구해서 그만큼 상품 목록을 이동시키고자 했다.
- 드래그가 끝난 시점에 최대치가 넘어서 공백이 보인다면, 이동될 수 있는 최대치로 돌아가게 만들고 싶었다.

#### 사용한 이벤트

1. `onMouseDown`: 마우스 클릭 시에 이벤트 발생
2. `onMouseUp`: 마우스 버튼 누른 걸 뗄 때 이벤트 발생
3. `onMouseLeave`: 마우스가 요소에서 벗어났을 때 이벤트 발생
4. `onMouseMove`: 마우스가 요소 위에 놓여졌거나 움직일 때 이벤트 발생

#### 코드

```jsx
const Swiper = ({ productList, onClick }) => {
  const initialPos = [];
  const swiperRef = useRef(null);

  // 마우스가 눌렸는지 확인
  const [isDrag, setIsDrag] = useState(false);
  // 마우스의 위치들을 담을 배열
  const [posX, setPosX] = useState(initialPos);

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
  };

  const onDragEnd = () => {
    setIsDrag(false);

    // 현재 이동된 값(translateX의 px값)을 가져와서 저장
    const distance = extractOnlyNumbers(swiperRef.current.style.transform);
    // 이동값이 최솟값과 최댓값을 넘어선다면 최소 위치와 최대 위치로 되돌리기
    swiperRef.current.style.transform = `translateX(${
      distance < 0 ? -50 : 0
    }px)`;

    setPosX(initialPos);
  };

  const onDragMove = (e) => {
    setPosX([...posX, e.clientX]);
    const startX = posX.shift();
    const endX = posX.pop();
    const distance = startX - endX;

    if (isDrag) {
      distance >= 0
        ? (swiperRef.current.style.transform = `translateX(-${distance}px)`)
        : (swiperRef.current.style.transform = `translateX(${-distance}px)`);
    }
  };

  return (
    <SwiperWrapper
      ref={swiperRef}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onMouseMove={isDrag ? onDragMove : null}
    >
      ...
    </SwiperWrapper>
  );
};
```

#### 코드 분석

```jsx
const onDragMove = (e) => {
  setPosX([...posX, e.clientX]);
  const startX = posX.shift();
  const endX = posX.pop();
  const distance = startX - endX;

  if (isDrag) {
    distance >= 0
      ? (swiperRef.current.style.transform = `translateX(-${distance}px)`)
      : (swiperRef.current.style.transform = `translateX(${-distance}px)`);
  }
};
```

- 마우스가 드래그 될 동안 위치들을 `posX`에 저장
- 가장 처음 위치와 마지막 위치를 가져오기(posX의 첫번째와 마지막 index)
- 그 둘의 차를 이용해 distance(거리)를 구함
- 거리가 양수인지 음수인지를 구분해서 다르게 이동값 다르게 조절

이렇게 구현해서 어느정도 느낌은 나게 동작하지만, 조금 부족한 코드인 것 같다. 기능도 완벽하지 못하고 코드도 많은 리팩토링이 필요해보인다... 그런데 막상 다 구현하고 나니까 알고보니 과제 요구사항에 없었다는거 :sweat: 그래도 코드를 짜는게 꽤나 재밌었기 때문에, 좋은 거 하나 배웠다고 생각한다!

### :pray: 회고

&nbsp;이번 프로젝트는 원티드 프리온보딩 프론트엔드 코스가 시작한 후에 처음으로 주어진 개인과제였다. 선택 과제였지만 도전했고, 필요한 기능도 모두 구현에 성공해서 보람차다. 실력이 많이 부족해서 항상 팀원들에게 짐이 되는 것 같아서 주눅들고 있었는데, 이번에 다시 자신감을 조금 찾은 것 같다. 덤으로 코딩이 더 재밌어지기도 했다.

&nbsp; 그렇지만 과제를 하는 덕분에 다음주까지 필요한 공부를 하나도 하지 못했다. 주말에는 알바에 가야하는데 할 수 있을까..? 결국 또 밤샘을 새게 될 것 같다. 이 코스를 진행하면서 도대체 며칠을 밤을 새는지... 다 실력이 부족한 탓이다. 공부하자!!

<div align="center">

## :rocket: 배포

**보러가기**: https://brad-go-ggumim.netlify.app

## GitHub 저장소

**보러가기**: https://github.com/brad-go/pre_onboarding_ggumim

</div>
