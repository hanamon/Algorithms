/*
  * [GCD] 최대 공약수 구하기
  * 요구 사항 : 두 수의 최대 공약수를 구하라.
  * 인자 : 인자 두 개 모두 숫자
  * 출력 : 숫자
*/

// 입출력 예시
GCD(3, 8); // --> 1
GCD(4, 8); // --> 4
GCD(7, 8); // --> 1
GCD(6, 8); // --> 2

/*--------------------------------------------------------------*/

/*
  * [유클리드 호제법]
  * 수학자 유클리드는 최대 공약수에 다음과 같은 성질이 있음을 발견했다.
  * 
  * A와 B의 최대 공약수는 'B'와 'A를 B로 나눈 나머지'의 최대 공약수와 같다. 즉, GCD(a, b) = GCD 이다.
  * 어떤 수와 0의 최대 공약수는 자기 자신이다. 즉, GCD(n, 0) = n 이다.
  * 
  * 쉽게 말해 '어떤 수와 0의 최대 공약수는 자기 자신'이라는 성질이다.
*/

/*--------------------------------------------------------------*/

// [방법 1.] 유클리드 공식을 통한 G.C.D. 구하기 - 재귀 사용
const GCD = (a, b) => a % b === 0 ? b : GCD(b, a%b);

// [방법 2.] 유클리드 공식을 통한 G.C.D. 구하기 - 재귀 사용 - [방법 1.] 코드와 동일
function GCD(a, b) {
  if( a % b === 0 ) return b;
  else return GCD(b, a%b);
}
