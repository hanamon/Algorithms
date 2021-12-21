/*
 * [Level 1 : 자릿수 더하기]
 * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12931?language=javascript
 */

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(n) {
  return String(n).split("").reduce((a, c) => a + Number(c), 0);
}
