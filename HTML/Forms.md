# [ HTML ] 입력을 위한 태그 총정리 - FORM, INPUT

## 목차

1. [Forms](#forms)
2. [form 태그](#1-양식을-만드는-form-태그)
3. [fieldset, legend 태그](#2-폼-요소를-그룹으로-묶는-fieldset-legend-태그)
4. [label 태그](#3-폼-요소에-라벨을-붙이는-label-태그)
5. [input 태그](#4-사용자-입력을-위한-input-태그)
   5-1. [input 태그의 주요 속성](#input-태그의-주요-속성)
6. [그외 태그 (textarea, select, option,button)](#5-폼에서-사용하는-여러-가지-태그)

## Forms

![form](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0417055f-712b-4f20-9e37-b7f2cbbe83bc/_2021-06-27__1.51.18.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220106%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220106T051737Z&X-Amz-Expires=86400&X-Amz-Signature=c01e9837cf5d79c1448c62ea66995148450601e184d707092c27e2f35e123fb9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22_2021-06-27__1.51.18.png%22&x-id=GetObject)

&nbsp;하나의 웹 페이지 안에서도 여러 가지 폼을 사용하는데, 아이디와 비밀번호를 입력하거나 로그인 버튼, 회원 가입 등 `사용자가 웹 사이트로 정보를 보낼 수 있는 요소`는 모두 **폼**이라고 할 수 있다.

- 개별 양식을 작성하는 컨테이너에 가깝다.
- 폼과 관련한 작업은 **정보를 저장**하거나 **검색, 수정**하는 것이 대부분인데 모두 **데이터베이스**를 기반으로 작동한다.
  > **텍스트 박스**나 **버튼** 같은 폼 형태는 **HTML 태그**로 만들지만, **폼에 입력한 사용자 정보**는 **ASP, PHP, JSP 같은 서버 프로그래밍**을 이용해 처리한다.

### 1. 양식을 만드는 `<form>` 태그

###### 기본형

```html
<form [속성="속성값" ]>여러 폼 요소</form>
```

- 몇 가지 속성을 사용해서 입력받은 자료를 어떤 방식으로 서버로 넘길 것인지 지정
- 서버에서 어떤 프로그램을 이용해 처리할 것인지를 지정

#### `<form>` 태그의 속성

##### 1. name

: 자바 스크립트로 폼을 제어할 때 **사용할 폼의 이름을 지정**한다.

##### 2. action

: `<form>`을 제출할 **데이터를 보낼 위치(url)를 지정**한다.

- 입력을 함께 그룹화해서 목적지에 제출

```html
// 예시: google 검색창 연결하기

<form action="https://www.google.com/search">
  // input의 name 속성의 값은 사이트마다 다르다.
  <input type="text" name="q" />
  <button>Search</button>
</form>
```

- 태그 안의 내용을 처리해 줄 **서버 프로그램을 지정**한다.

```html
<form action="register.php">/* 여러 폼 요소 */</form>
```

##### 3. target

: action 속성에서 지정한 스크립트 **파일을 현재 창이 아닌 다른 위치에서 열도록** 한다.

##### 4. autocomplete

: 폼에서 내용을 입력할 때 **예전에 입력한 내용을 자동으로 표시**해준다.

- 기본 속성 값은 "on"이다.
- 중요한 개인 정보나 인증 번호와 같은 일회성 정보를 입력한다면 이 기능을 사용하지 않는 것이 좋다.

```html
<form action=" " autocomplete="off">/* 여러 폼 요소 */</form>
```

##### 5. method

: **사용자가 입력한 내용을 서버 쪽 프로그램으로 어떻게 넘겨줄 것인지 지정**한다. **GET**과 **POST**라는 속성값을 사용할 수 있다.

- **GET**: 데이터를 256~4,096byte 까지만 넘길 수 있다. 주소 표시줄에 사용자가 입력한 내용이 그대로 드러나는 단점이 있다.
- **POST**: 입력한 내용의 길이에 제한받지 않고 사용자가 입력한 내용도 드러나지 않는다.

### 2. 폼 요소를 그룹으로 묶는 `<fieldset>`, `<legend>` 태그

- `<fieldset>`: 하나의 폼 안에서 여러 구역을 나누어 표시

  ###### 기본형

  ```html
  <fieldset [속성="속성값" ]></fieldset>
  ```

- `<legend>`: `<fieldset>` 태그로 묶은 그룹에 제목을 붙인다.

  ###### 기본형

  ```html
  <fieldset>
    <legend>그룹 이름</legend>
  </fieldset>
  ```

### 3. 폼 요소에 라벨을 붙이는 `<label>` 태그

: 입력(`input`)란 가까이에 아이디나 비밀번호처럼 붙여 놓은 텍스트로 사용

- 접근성을 높이고, `form`을 사용하기 쉽게 한다.
- 어떤 입력을 할지 알리기 위해 사용

#### 사용 방법 2가지

##### 1. `<label>`태그 안에 `<input>`태그를 넣어서 사용

```html
<label>레이블명<input /></label>
```

##### 2. `<label>`태그와 폼 요소를 따로 사용하고 `<label>` 태그의 _**for 속성**_ 과 `<input>`의 _**id 속성**_ 을 이용해 서로 연결하기

> 폼 요소의 id 속성값을 **<label>** 태그의 for 속성에게 알려주는 방법

```html
<label for="id명">라벨명</label>
<input type="text" name="" id="id명" value="" />
```

- `<label>` 태그를 사용한 라벨과 사용자 정보를 입력받는 `<input>` 태그가 떨어져 있더라도 둘 사이를 쉽게 연결할 수 있다.

→ 이를 사용하면 **폼 요소와 라벨 텍스트가 서로 연결**되었다는 것을 웹 브라우저가 알 수 있다.

### 4. 사용자 입력을 위한 `<input>` 태그

아이디나 검색어를 입력하는 검색 상자나 로그인 버튼처럼 **사용자가 입력할 부분**은 주로 `<input>` 태그를 이용해 넣는다.

#### 웹 양식의 다양한 곳에서 사용되는 `<input>` 태그

: 다양한 양식에서 사용자가 입력한 정보를 받을 때 사용한다.

- 닫는 태그가 없다.
- 입력 유형과 특성의 다양한 조합 가능성으로 인해, `<input>` 요소는 HTML에서 가장 강력하고 복잡한 요소
- 웹 기반 `form`에서 사용자의 데이터를 받을 수 있는 대화형 컨트롤을 생성
<details>
<summary><b>input 태그</b>의 <b>type 속성</b> 한눈에 살펴보기</summary>
<div>

- 특정 타입을 지정하지 않으면 `type="text"`가 default이다.
- **`<input>` 태그의 type 속성** <br> 1. **text**: 한 줄짜리 텍스트를 입력할 수 있는 텍스트 박스를 넣는다. <br> 2. **password**: 비밀번호를 입력할 수 있는 필드를 넣는다. <br> 3. **search**: 검색할 때 입력하는 필드를 넣는다. <br> 4. **url**: URL 주소를 입력할 수 있는 필드를 넣는다. <br> 5. **email**: 이메일 주소를 입력할 수 있는 필드를 넣는다. <br> 6. **tel**: 전화번호를 입력할 수 있는 필드를 넣는다. <br> 7. **checkbox**: 주어진 여러 항목에서 1개만 선택할 수 있는 라디오 버튼을 넣는다. <br> 8. **number**: 숫자를 조절할 수 있는 스핀 박스를 넣는다. <br> 9. **range**: 숫자를 조절할 수 있는 슬라이드 막대를 넣는다. <br> 10. **date**: 사용자 지역을 기준으로 날짜(연, 월, 일)를 넣는다. <br> 11. **month:** 사용자 지역을 기준으로 날짜(연, 월)를 넣는다. <br> 12. **week**: 사용자 지역을 기준으로 날짜(연, 주)를 넣는다. <br> 13. **time**: 사용자 지역을 기준으로 시간(시, 분, 초, 분할 초)을 넣는다. <br> 14. **datetime**: 국제 표준시(UTC)로 설정된 날짜와 시간(연, 월, 일, 시, 분, 초, 분할 초)을 넣는다. <br> 15. **datetime-local:** 사용자의 지역을 기준으로 날짜와 시간(연, 월, 일, 시, 분, 초, 분할 초)을 넣는다. <br> 16. **submit**: 전송 버튼을 넣는다. <br> 17. **reset**: 리셋 버튼을 넣는다. <br> 18. **image**: submit 버튼 대신 사용할 이미지를 넣는다. <br> 19. **button**: 일반 버튼을 넣는다. <br> 20. **file**: 파일을 첨부할 수 있는 버튼을 넣는다. <br> 21. **hidden**: 사용자에게는 보이지 않지만 서버로 넘겨주는 값이 있는 필드를 만든다. <br>
</div>
</details>

#### 텍스트와 비밀번호를 나타내는 `type="text"`와 `type="password"`

- **텍스트 필드**: 폼에서 가장 많이 사용하는 요소로 주로 아이디나 이름, 주소 등 한 줄짜리 일반 텍스트를 입력할 때 사용한다.
- **비밀번호 필드**: 입력하는 내용을 화면에 보여주지 않아야 하므로 '\*'나 '●'로 표시
  ###### 기본형
  ```html
  <input type="text" /> <input type="password" />
  ```

##### 텍스트 필드와 비밀번호 필드에서 사용하는 주요 속성

1. **size**: 텍스트와 비밀번호 필드의 **길이**를 지정.

   → 화면에 몇 글자가 보이게 할 것인지를 지정

2. **value**: 텍스트 필드 요소가 **화면에** 표시될 때 텍스트 필드 부분에 **보여 주는 내용**.

   → 이 속성을 사용하지 않으면 빈 텍스트 필드가 표시된다. 비밀번호 필드에서는 사용 x

3. **maxlength**: 텍스트 필드와 비밀번호 필드에 **입력**할 수 있는 **최대 문자 수**를 지정.

#### 다양한 용도에 맞게 입력하는 `type="search"`, `type="url"`, `type="email"`, `type="tel"`

##### `type="search"`

: **검색**을 위한 텍스트 필드. 웹 브라우저에서는 이 필드에 검색어를 입력하면 오른쪽에 x가 표시되어 입력한 검색어를 손쉽게 지울 수 있다.

##### `type="url"`

: **웹 주소**를 입력하는 필드

##### `type="email"`

: **이메일** 주소를 입력하는 필드

##### `type="tel"`

: **전화번호**를 나타내는 필드. 전화번호는 지역마다 형식이 다르므로 사용자가 입력한 값이 전화번호인지 아닌지 체크할 수 없다. 모바일에서 이 값을 이용하면 바로 전화를 걸 수 있다.

#### 체크 박스와 라디오 버튼을 나타내는 `type="checkbox"`, `type="radio"`

: **여러 항목 중에서 원하는 항목을 선택**할 때 사용하는 폼 요소. 1개만 선택하려면 라디오 버튼, 2개 이상을 선택하려면 체크 박스를 사용한다.

###### 기본형

```html
<input type="checkbox" /> <input type="radio" />
```

##### 사용할 수 있는 속성

1. **value**: 선택한 체크 박스나 라디오 버튼을 **서버에게 알려 줄 때 넘겨줄 값**을 지정. 이 값은 **영문**이거나 **숫자**여야 하며 **필수 속성**이다.
2. **checked**: 체크 박스나 라디오 버튼의 항목은 처음에 아무것도 선택되지 않은 상태로 화면에 표시되는데, 여러 항목 중에서 **기본으로 선택해 놓고 싶은 항목**에 사용. 속성값은 따로 없다.
3. **name**: 라디오 버튼에서 사용. PHP와 같은 웹 프로그래밍에서 폼 요소를 제어할 때 자주 사용된다. 라디오 버튼에서 하나의 버튼만 선택할 수 있게 하려면 모든 라디오 버튼의 **name값을 똑같이 지정**해야 한다.

#### 숫자 입력 필드를 나타내는 `type="number"`, `type="range"`

- `type="number"`: **스핀 박스**가 나타나면서 **숫자를 선**택할 수 있다.
  - **스핀 박스**: 입력란 오른쪽에 작은 화살표(위, 아래)를 표시해서 클릭할 때 마다 숫자를 높이거나 낮추는 기능
- `type="range"`: **슬라이드 막대**를 움직여 숫자를 입력할 수 있다.

###### 기본형

```html
<input type="number" /> <input type="range" />
```

##### `type="number"`, `type="range"`에서 사용할 수 있는 속성

1. **min**: 필드에 입력할 수 있는 최솟값을 지정. 기본 최솟값은 0.
2. **max**: 필드에 입력할 수 있는 최댓값을 지정. 기본 최댓값은 100.
3. **step**: 숫자 간격을 지정할 수 있다. 기본값은 1.
4. **value**: 필드에 표시할 초깃값.

#### 날짜 입력을 나타내는 `type="data"`, `type="month"`, `type="week"`

: 웹 문서나 애플리케이션에 달력을 넣을 때 사용.

###### 기본형

```html
<input type="date | month | week" />
```

- `type="date"`: 달력에서 **날짜**를 선택해서 입력할 수 있다. 날짜를 선택하면 필드에 "yyyy-mm-dd" 형식으로 **연도, 월, 일**이 표시된다.
- `type="month"`: 달력에서 **월**을 선택해서 입력할 수 있다. 월을 선택하면 "yyyy-mm" 형식으로 **연도, 월**까지만 입력된다.
- `type="week"`: 달력에서 **주**를 선택해서 입력할 수 있다. 주를 선택하면 1월 첫째 주를 기준으로 **몇 번째 주**인지 표시된다.

#### 시간 입력을 나타내는 `type="time"`, `type="datetime"`, `type="datetime-local"`

: 시간을 지정할 때는 `type="time"`을 사용하고 날짜와 시간을 함께 지정하려면 `type="datetime"`이나 `type="datetime-local"`을 사용한다.

###### 기본형

```html
<input type="time | datetime | datetime-local" />
```

- `type="time"`: 시간을 입력하게 한다. 시간 입력 필드는 웹 브라우저마다 조금씩 다르게 나타나는데 항목이 3개로 구성된다는 것은 같다. 첫 번째 항목부터 '오전'과 '오후'를 의미하고 나머지는 '시'와 '분'을 의미한다.
- `type="datetime(-local)"`: 사용자가 웹 문서를 보고 있는 지역에 맞는 날짜와 시간을 함께 입력할 수 있다.

##### 날짜와 시간과 관련된 유형에 사용 가능한 속성`

1. **min, max**: 날짜나 시간의 범위를 제한할 때 사용. min 속성은 범위의 시작 날짜나 시간을, max 속성은 범위의 마지막 날짜나 시간을 지정
2. **step**: 스핀 박스의 화살표를 클릭했을 때 증감시킬 크기를 지정
3. **value**: 기본적으로 표시할 날짜나 시간을 지정

#### 전송, 리셋 버튼을 나타내는 `type="submit"`, `type="reset"`

- **submit**: **전송 버튼**을 나타내고, 폼에 **입력한 정보를 서버로 전송**한다. submit 버튼으로 전송된 정보는 `<form>` 태그의 action 속성에서 지정한 폼 처리 프로그램에 넘겨진다.
- **reset**: `<input>` 요소에 입력된 모든 정보를 재설정해서 사용자가 입력한 **내용을 모두 지우는 역할**. value 속성을 사용해 버튼에 표시할 내용을 지정한다.

###### 기본형

```html
<input type="submit | reset" value="버튼에 표시할 내용" />
```

#### 이미지 버튼을 나타내는 `type="image"`

: submit 버튼과 같은 기능을 하는 이미지 버튼. 이미지 클릭시 submit이 일어나게 해준다.

###### 기본형

```html
<input type="image" src="이미지 경로" alt="대체 텍스트" />
```

#### 기본 버튼을 나타내는 `type="button"`

: submit이나 reset 버튼과 같은 기능 없이 **오직 버튼 형태**만 삽입한다. 주로 **버튼을 클릭해서 자바스크립트를 실행할 때** 사용한다.

###### 기본형

```html
<input type="button" value="버튼에 표시할 내용" />
```

#### 파일을 첨부할 때 사용하는 type="file"

- 폼에서 사진이나 문서를 첨부해야 하는 경우에 사용
- 이를 사용하면 웹 브라우저 화면에 [파일 선택]이나 [찾아보기] 버튼 등이 표시되는데, 이 버튼을 클릭하고 파일을 선택하면 파일이 첨부된다.

###### 기본형

```html
<input type="file" />
```

#### 히든 필드를 만들 때 사용하는 type="hidden"

- **화면의 폼에는 보이지 않지만** 사용자가 입력을 마치면 폼과 함께 서버로 전송되는 요소
- 사용자에게 굳이 보여줄 필요는 없지만 **관리자가 알아야 하는 정보**는 히든 필드로 입력한다.

###### 기본형

```html
<input type="hidden" name="이름" value="서버로 넘길 값" />
```

### input 태그의 주요 속성

폼 태그는 단순히 내용을 입력할 뿐만 아니라 입력란에 커서나 힌트를 표시할 수도 있고, 꼭 입력해야 하는 필드도 지정할 수 있다.

#### 자동으로 입력 커서를 갖다 놓는 autofocus 속성

페이지를 불러오자마자 폼에서 원하는 요소에 마우스 포인터를 표시할 수 있다.

###### 기본형

```html
<input type="텍스트-입력-필드" autofocus required />
```

#### 힌트를 표시해주는 placeholder 속성

사용자가 텍스트 입력할 때 **입력란에 적당한 힌트 내용을 표시**해서 그 필드를 클릭하면 내용이 사라지게 한다.

→ 텍스트 필드 앞에 제목을 사용하지 않고도 사용자에게 해당 필드에 어떤 내용을 입력해야 할지 알려 줄 수 있다.

#### 읽기 전용 필드를 만들어주는 readonly 속성

해당 필드를 **읽기 전용**으로 바꾼다. 텍스트 필드나 텍스트 영역에 내용이 표시되어 있어도 사용자는 그 내용을 볼 수만 있고 입력은 할 수 없다.

###### 기본형

```html
<input type="텍스트-입력-필드" readonly(="readonly" |="true" ) />
```

#### 필수 입력 필드를 지정하는 required 속성

**반드시 입력해야 하는 내용**에 이를 통해 필수 필드로 만들 수 있다. 필수 필드를 입력하지 않고 submit 버튼을 클릭하면 브라우저에서 오류 메시지를 보낸다.

- 이 속성을 사용하려면 `required` 혹은 `require="required"` 라고 하면 된다.

#### 전송할 데이터의 이름을 알려주는 name 속성

**서버에 제출할 때 어떤 입력이 제출되었는지 알려주기 위해 사용**된다.

- 이름과 입력한 값이 양식과 함께 전송된다.

### 5. 폼에서 사용하는 여러 가지 태그

#### 여러 줄을 입력하는 텍스트 영역 `<textarea>` 태그

여러 줄을 입력하는 영역을 만든다. 게시판에서 글을 입력하거나 회원 가입 양식에서 사용자 약관을 표시할 때 자주 사용한다.

###### 기본형

```html
<textarea>내용</textarea>
```

- `<textarea>` 태그의 속성
  1. **cols**: 텍스트 영역의 **가로 너비**를 **문자 단위**로 지정
     - 지정하는 글자 수는 영문자를 기준으로 한다. (한글 1글자 = 영문 2글자)
     - 사용하는 글꼴이나 글자 크기에 따라 달라질 수 있다.
  2. **rows**: 텍스트 영역의 **세로 길이**를 **줄 단위**로 지정. 지정한 숫자보다 줄 개수가 많아지면 스크롤 막대가 생긴다.

#### 드롭다운 목록을 만들어 주는 `<select>`, `<option>` 태그

사용자가 내용을 직접 입력하지 않고 여러 옵션 중에서 선택하게 하려면 드롭다운 목록이나 데이터 목록을 사용한다.

- **드롭다운 목록**: 클릭했을 때 옵션이 요소 아래쪽으로 펼쳐지는 목록
- **`<select>` 태그**: 드롭다운 목록의 시작과 끝을 표시
- **`<option>` 태그**: 원하는 항목을 추가. value 속성을 이용해 서버로 넘겨주는 값을 지정

###### 기본형

```html
<select>
  <option value="값1">내용1</option>
  <option></option>
  <option value="값2">내용2</option>
  <option>....</option>
</select>
```

##### `<select>` 태그의 속성

- 이를 사용해 만든 드롭다운 목록은 기본적으로 옵션이 하나만 표시된다.
- 옆의 화살표를 클릭해 나머지 옵션을 살펴본 후 필요한 항목을 선택할 수 있다.
- **size**: 화면에 표시할 드롭다운 항목의 개수를 지정
- **multiple**: 드롭다운 목록에서 둘 이상의 항목을 선택할 때 사용

##### `<option>` 태그의 속성

- **value**: 해당 항목을 선택할 때 서버로 넘겨줄 값을 지정
- **selected**: 드롭다운 메뉴를 삽입할 때 기본적으로 선택해서 보여 줄 항목을 지정

#### 데이터 목록을 만들어 주는 `<datalist>`, `<option>` 태그

데이터 목록을 사용하면 텍스트 필드에 값을 직접 입력하지 않고 미리 만들어 놓은 값 중에서 선택할 수 있다.

- `**<datalist>` 태그\*\*: 데이터 목록의 시작과 끝을 표시
- `**<option>` 태그\*\*: 각 데이터의 옵션을 표시. value 속성을 사용해서 서버로 넘겨줄 값을 지정하는데, 이 값이 텍스트 필드에도 나타난다.
- 데이터 목록을 사용할 텍스트 필드에서 **어떤 데이터 목록을 연결할지 id값을 지정**하면 된다.

###### 기본형

```html
<input type="text" list="데이터 목록 id">
<datalist id=데이터 목록 id">
  <option value="서버로 넘길 값1">선택 옵션1</option>
  <option value="서버로 넘길 값2">선택 옵션2</option>
</datalist>
```

#### 버튼을 만들어 주는 `<button>` 태그

폼을 전송하거나 리셋하는 버튼을 삽입할 수 있다.

###### 기본형

```html
<button type="submit">내용</button> // 기본값을 서버로 제출하는 속성
<button type="reset">내용</button> // 모든 입력을 초기화하하는 속성
<button type="button">내용</button> // 아무것도 하지 않는 속성, 기본 행동 x
```

- `<button>` 태그의 type 속성은 버튼이 활성화되었을 때 어떤 동작을 할지 지정한다. 만약 지정하지 않으면 submit을 선택한 것으로 간주한다.
  → 그러나 `<form>` 태그 밖에 있으면 `type="button"`이 default
- 폼뿐만 아니라 버튼이 필요한 웹 문서의 어디든지 다양하게 활용할 수 있다.
- 콘텐츠를 포함할 수 있어서 아이콘을 추가하거나 CSS를 이용해 원하는 형태로 꾸밀 수 있다.
