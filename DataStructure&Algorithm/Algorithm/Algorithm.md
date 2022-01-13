# Algorithm

## 알고리즘이란?

- 계산이나 작업을 하기 위한 순서
- 컴퓨터 프로그램이 어떤 문제를 해결하기 위해 필요한 명령어들의 집합

> 알고리즘에 따라 같은 문제라도 계산 시간이 크게 달라지므로 적절한 알고리즘을 선택할 수 있어야 한다.

## 좋은 알고리즘의 조건

1. **문제를 해결**할 수 있어야 한다.
2. **효율적**이어야 한다.
3. **시간과 공간**(복잡도)**의 트레이드 오프**
   - 느리지만 메모리를 적게 사용하는 알고리즘
   - 빠르지만 메모리를 크게 사용하는 알고리즘
     > 시간과 공간을 비교하면서 최적의 타협점을 찾는 것이
     > 최상의 알고리즘이다.

## 시간 복잡도 (알고리즘의 계산 시간 구하기)

&nbsp;알고리즘의 실행 시간은 컴퓨터가 알고리즘을 실행하는 속도에 의존한다. 여기서 말하는 속도는 _컴퓨터의 처리속도_, _사용된 언어의 종류_, 프로그래밍 언어를 컴퓨터가 실행할 코드로 바꾸는 _컴파일러의 속도_ 등에 달라진다.

1. 입력값의 크기에 따라 **알고리즘 간 실행 시간의 차이** 검증하기
2. **성장률** (입력 값의 크기에 따라 이 함수가 얼마나 빨리 커지는지) 알아보기

> **점근적 표기법**: 중요하지 않는 상수와 계수들을 제거하면 알고리즘의 실행시간에서 중요한 성장률에 집중할 수있는데 이것을 점금적 표기법(Asymptotic notation)이라 부른다. 여기서, 점근적이라는 의미는 가장 큰 영향을 주는 항만 계산한다는 의미다.

&nbsp;**알고리즘의 계산 시간은 정확한 시간을 의미하지 않는다.** 이 알고리즘으로 문제를 해결했을 때, 몇 초가 걸리는지를 따지지 않는다는 것이다. 위에서 말한 컴퓨터의 성능이나 사용 언어 등에 의해서 좋아지거나 나빠질 수 있기 때문에 알고리즘에서는 **스텝**이란 단위를 사용한다.
&nbsp;알고리즘을 따질 때는 문제를 해결하기 위해 몇 스텝이나 걸리는지를 확인한다. 스텝 수를 확인하는 것이다. 즉, **좋은 알고리즘은 같은 문제를 해결했을 때 스텝 수가 더 적은 알고리즘**이다!

### 시간 복잡도를 나타내는 방법 3가지

1. 평균의 경우: [Big-Θ (빅-세타)]()
   <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbLQoiN%2Fbtq9NWVsqXj%2FRhFBvlgiGgQYoyIgy6Z1d1%2Fimg.png" alt="bigOmega" width="50%">
2. 최악의 경우: [Big-O 표기법 (빅오 표기법)](../DataStructure/BigO.md)
   <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FduHuzf%2Fbtq9OvXMm6V%2FIMpl2hnoPdehynjQKkzFD0%2Fimg.png" alt="bigO" width="50%">
3. 최상의 경우:[Big-Ω (빅-오메가)]()
   <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdeNDNM%2Fbtq9JMzS3uW%2FEPZRpwDPeQNO2lke2MxSM1%2Fimg.png" alt="bigOmega" width="50%">

&nbsp;이렇게 크게 3가지 표기법이 있지만 주로 **Big-O 표기법(빅오 표기법)** 을 이용해서 시간 복잡도를 나타낸다.
