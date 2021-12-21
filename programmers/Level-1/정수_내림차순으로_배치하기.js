/*
  * [Level 1 : 정수 내림차순으로 배치하기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12933?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(n) {
  return Number(String(n).split('').sort((a, b) => b - a).join(''));
}
