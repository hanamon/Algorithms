/*
  * [Level 1 : x만큼 간격이 있는 n개의 숫자]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12954?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(x, n) {
  return new Array(n).fill(x).map((num, idx) => num * (idx+1));
}
