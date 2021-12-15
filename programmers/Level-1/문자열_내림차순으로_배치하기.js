/*
  * [Level 1 : 문자열 내림차순으로 배치하기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12917?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(s) {
  return s.split('').sort().reverse().join('');
}
