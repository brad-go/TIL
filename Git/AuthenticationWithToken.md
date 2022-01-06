# 깃허브 토큰 인증하기 (01/05/2022)

&nbsp;새로 TIL 저장소를 만들고 README.md 파일을 약간 수정했다. 이제 `git push`를 하려는데, 이게 무슨 일인가?

> remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
> remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
> The requested URL returned error: 403

&nbsp;위의 에러가 뜨면서 `git push`를 할 수가 없었다. 이전에도 겪었던 일이라 이번에도 해결하는 김에 이 TIL 저장소에 정리해두려고 한다.
&nbsp;**2021년 8월 13일부로 깃허브에서는 비밀번호로 원격 리포지토리를 수정하는 것이 불가능해졌다고 한다.**
&nbsp;앞으로는 토큰을 받아서 인증을 해줘야 한다. 비밀번호로 입력하면 되지 이렇게까지 해야한다니.. GitHub를 처음쓰는 사람들은 더 입문하기 어려워진 것 같다.

### 토큰 발급받기

&nbsp;우선 깃허브에서 개인 접속 토큰을 발급 받아야 한다.

#### GitHub의 Settings &#10132; Developer Settings 들어가기

&nbsp;GitHub에 로그인 한 후에 개인 오른쪽 상단의 유저 사진을 클릭하면 `Settings`가 보일 것이다. `Settings`에 들어간 후에 스크롤을 하다보면 `Developer Settings`를 만날 수 있다. 아래의 링크를 클릭해서 접속해도 괜찮다.

[Personal Access Tokens](https://github.com/settings/tokens)

`Personal Access Tokens` 탭을 클릭한 후에 `Generate New Token` 버튼을 눌러서 새로 토큰을 생성해보자. 아마 비밀번호를 입력하라고 할텐데, 깃허브 비밀번호를 입력하고 계속 진행해주면 된다.
&nbsp;이후 양식을 채우고 `Generate Token`버튼을 눌러서 제출하면 되는데, **repository** 관련만 체크해도 괜찮다고 한다!

![token](https://media.vlpt.us/images/woongstar/post/a70f0d7c-0fc9-4ced-ac15-dacd0b2e3cee/Untitled%204.png)

&nbsp;위와 같이 토큰이 발급될텐데 지금 딱 이 순간밖에 볼 수가 없다. 복사해서 메모장에 잠시 옮겨 놓는 것을 추천한다!

### 토큰 인증하기

#### 1. terminal에서 바로 인증하기

&nbsp;자, 이제 터미널로 돌아가서 다시 `push`를 해보자. `push`하려고 하면 아이디와 비밀번호를 여전히 입력하라고 할 것이다. 이때 깃허브 아이디를 입력해주고, **비밀번호로 복사해두었던 토큰을 붙여넣어주자!** 그렇게 하면 성공적으로 `push`가 될 것이다.

#### 2. keychain 변경하기

&nbsp;다른 방법으로는 spotlight에서 `키체인 접근`을 검색해서 수정해주는 방법이 있다. `키체인 접근`에 들어갔다면 `github.com`을 검색해주자.

![keychain](https://media.vlpt.us/images/woongstar/post/c332339f-6d18-44a8-be65-f0cf561dcaee/Untitled%206.png)

&nbsp;위와 같은 파일을 찾아서 들어가주자. 계정에는 github아이디를 입력해주고, 암호보기를 체크해준다. 그리고 암호에 아까 복사해두었던 토큰을 붙여넣어준다!

&nbsp;이제 터미널로 돌아와서 `push`하려고 하면 여전히 아이디와 비밀번호를 물어볼텐데, 이번에는 GitHub 아이디를 입력하고 비밀번호로는 맥북 로그인 비밀번호를 입력하면 `push`가 될 것이다.

### 참고

&nbsp;나는 이 문제를 해결할 때 아래의 링크를 보면서 해결했다. 너무나 친절하게 잘 설명해주셔서 감사하다. 더 자세한 설명을 보고 싶다면 아래의 링크를 보고 따라해보자.

[깃허브 토큰 인증하기](https://velog.io/@woongstar/%EA%B9%83%ED%97%88%EB%B8%8C-%ED%86%A0%ED%81%B0-%EC%9D%B8%EC%A6%9D%ED%95%98%EA%B8%B0)
