# [Git] 좋은 README.md 작성을 위한 방법들

## 들어가며

우리가 프로젝트를 만들고 깃허브에 올릴 때, 프로젝트를 잘 만들었더라도 갑자기 막막해 지는 순간이 있다. 그것은 바로 README.md 파일 작성! 다른 프로젝트들을 보면 다들 아무렇지 않게 멋지고 폼나게 README를 작성해서 프로젝트와 같이 올려 놓는다. **어떻게 하면 README를 잘 쓸 수 있을까?**는 매 프로젝트를 만들고 나서 고민하게 된다. 이 글을 통해 좋은 README 작성법을 적어두려고 한다!

## 목차

- [README.md란?](#1-readmemd란)
- [마크다운 문법 알기](#2-markdown-문법을-잘-알아두자)
- [README 파일에 작성할 내용](#3-readme에-작성할-내용)

## 1. README.md란?

우선 README를 작성하는 이유에 대해 알아보자. 우리가 프로젝트를 깃허브에 올리고 나면 가장 먼저 보이는 곳이 README이다. 프로젝트를 보기위해 소스 코드로 바로 들어가서 보는 사람도 있겠지만, README 파일이 잘 써져 있다면, 다른 사람들은 코드를 보기 전에 우리가 어떤 프로젝트를 만들었는지 미리 알 수 있다.

### READEME를 작성하는 이유

README는 우리가 구현한 프로젝트에 대한 빠른 이해를 할 수 있도록 도와준다. 어려운 코드가 아닌 우리가 쉽게 읽을 수 있는 글이나 이미지를 통해 어떤 기능을 구현했고, 어떻게 구현했는지 다른 사람들도 쉽게 알 수 있도록 도와준다.

#### 1-1. 나를 위해

내가 작성한 코드라도 한 달, 아니 일주일만 지나도 이게 무슨 기능을 하는 코드인지 왜 이 코드를 작성한 건지 잘 모를 때가 많다. 사실 자세히 뜯어보기 전까지는 모를 것이다. 그렇다면 반년이 지난다면 어떨까? 그렇다고 코드 한 줄, 한 줄마다 주석을 달아서 올린다면 코드의 가독성이 떨어지게 된다.

:white_check_mark: 빠르게 코드를 다시 이해하기 위해서 README를 잘 작성해서 **핵심 기능과 구현 방법을 잘 적어두자!**

#### 1-2. 다른 사람을 위해

READEME의 목적은 프로젝트에 대한 내용을 문서화화는 것이다. 나뿐만이 아니라 같이 협업하는 동료나 다른 사람들도 이 README를 통해서 쉽게 우리가 만든 프로젝트를 동작시킬 수 있어야 한다. 그런데 내가 쓴 코드는 시간이 지나면 나도 쉽게 이해할 수 없다.

:white_check_mark: 그렇기에 좋은 README를 통해 **내가 쓴 코드를 누구나 쉽게 이해할 수 있게 만들어야 한다!**

### 2. Markdown 문법을 잘 알아두자

README를 작성하기 위해 마크다운 작성법은 필수이다! 노션이나 워드에서 작성한 후에 가져다 붙여넣어도 되지만, 그렇게 하면 깔끔한 README를 작성하기 어려울 것이다. 마크다운을 알기 위한 좋은 글들이 아래의 링크를 보고 간단한 마크다운 문법을 알아두자!

:link: [마크다운 markdown 작성법](https://gist.github.com/ihoneymon/652be052a0727ad59601)

:link: [마크다운(Markdown) 사용법 및 예제](https://theorydb.github.io/envops/2019/05/22/envops-blog-how-to-use-md/#markdown-%EB%AC%B8%EB%B2%951%EB%B0%98%EB%93%9C%EC%8B%9C-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%98%EB%8A%94)

### 3. README에 작성할 내용

구현한 프로젝트에 깃허브에 올릴 때, README에 필수적으로 작성해야 될 내용들을 알아보자.

#### 3-1. :bookmark: 프로젝트의 제목과 간단한 설명 (Description)

- 프로젝트에 대한 제목
- 프로젝트가 왜 만들어졌는지, 어떤 서비스를 위한 것인지 작성
- 길고 장황하게 작성하지 않고, 기능을 위주로 간결하고 명료하게 작성
- 프로젝트의 가치

#### 3-2. :house: 배포 주소 (Deployment Address)

말로 설명된 글보다는 동작하는 프로젝트를 볼 수 있는 것이 프로젝트를 이해하기 쉬울 것이다. 내가 만든 프로젝트를 배포한 주소를 통해서 프로젝트를 보여주도록 하자.

#### 3-3. :deciduous_tree: 환경 (Environment)

- 실행환경에 대해 작성
- OS나 컴파일러 혹은 Hardware와 관련된 환경을 작성
- Multicore 환경에서 돌아가는 프로그램이라면 CPU나 RAM 같은 것들을 작성

#### 3-4. :file_folder: 디렉토리 구조 및 설명 (Directories)

- 디렉토리 트리를 보여준다.
- 혹은 핵심 디렉토리나 파일을 약간의 설명과 함께 작성한다.

#### 3-4. :arrow_down: 설치 및 시작하는 법(Prerequisite)

- 프로젝트 사용을 위한 저장소 주소 (git clone)
- 작성한 코드를 실행하기 전에 설치해야 할 package 설명 혹은 설치 방법
- API를 사용한다면 개인이 발급받은 API를 작성하는 방법

#### 3-5. :golf: 사용법 (Usage)

- 프로젝트를 어떻게 실행해야 하는지에 대한 가이드 라인 작성
- 사진이나 프로그램이 실행되는 모습을 담은 GIF를 같이 보여주는 것도 좋다.

#### 그 외

## 참고

- [README 작성 가이드](https://otugi.tistory.com/172)