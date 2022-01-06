# 하이퍼링크 삽입하기 (01/06/2022)

## `<a>` 태그

문서에 링크를 삽입할 수 있게 해준다.

###### 기본형

```html
<a href="링크할 주소">텍스트 또는 이미지</a>
```

- 웹 사이트에서 링크의 기능은 가장 많이 사용되며, 그만큼 중요하다.

- 링크는 `<a>` 태그로 만드는데, 텍스트를 사용하면 텍스트 링크가 되고 이미지를 사용하면 이미지 링크가 된다.

### `<a>` 태그의 속성

#### 1. href

텍스트를 클릭하면 연결할 문서의 경로와 파일명을 넣을 수 있다. 링크할 주소를 정하지 않는다면 '#'을 기본값으로 넣어준다.

```html
<a href="#">텍스트 또는 이미지</a>
```

##### 외부 링크

클릭 시 외부 사이트로 연결해준다.

```html
<a href="#">텍스트 또는 이미지</a>
```

<a href="https://github.com/brad-go">깃허브 방문하기</a>

##### 내부 링크

클릭 시 문서 내에 같은 id를 가진 태그가 있는 곳으로 이동시켜준다.

```html
<a href="#id" target="_blank">텍스트 또는 이미지</a>
```

<a href="#text" target="_blank">아래 여기부분</a>

#### 2. target

클릭 시 문서가 새 창에서 열리게 한다. 새 창에서 열리지 않게 하려면 이것을 지워준다.

```html
<a href="#" target="_blank">텍스트 또는 이미지</a>
```

#### 3. 텍스트 내부에 링크 만들기

`<p>` 태그를 이용해 `<a>` 태그를 감싸면 텍스트의 부분을 링크로 만들 수 있다.

```html
<p><a href="#" target="_blank">여기</a>를 클릭하세요</p>
```

<p id="text"><a href="#" target="_blank">여기</a>를 클릭하세요</p>

#### 4. 이미지를 링크로 만들기

`<img>` 태그를 `<a>` 태그로 감싸주면 이미지를 클릭 시 링크로 이동하게 할 수 있다.

```html
<a href="#" target="_blank"><img src="..." alt="..." /></a>
```

<a href="https://velog.io/@brad" target="_blank"><img src="https://media.vlpt.us/images/sannim/post/1e00249b-8a5a-4cf1-b378-5c78c7614111/velog0.png" alt="velog 이미지"></a>

#### 5. 메일 링크 만들기

누군가에게 메일을 바로 보낼 수 있는 링크를 만들어준다.

```html
<a href="mailto:이메일 주소" target="_blank">텍스트 또는 이미지</a>
```

<a href="mailto:dhjk35@gmail.com" target="_blank">글쓴이에게 이메일 보내기</a>

#### 6. 다운로드 링크 걸기

다운로드 사이트가 아닌 파일에 바로 연결해서 클릭 시 다운할 수 있다.

```html
<a
  href="https://download.mozilla.org/?product=firefox-39.0-SSL&os=win&lang=en-US"
  download="firefox-39-installer.exe"
>
  Download Firefox 39 for Windows
</a>
```
