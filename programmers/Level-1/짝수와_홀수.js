/*
  * [Level 1 : 짝수와 홀수]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12937?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(num) {
  if( num > 0 ) {
    while( num > 1 ) num = num - 2;
  }
  else if( num < 0 ) {
    while( num < 1 ) num = num + 2;
  }

  if ( num === 1 ) return "Odd";
  else return "Even";
}
