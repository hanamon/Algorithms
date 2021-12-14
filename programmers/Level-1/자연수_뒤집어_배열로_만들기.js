/*
  * [Level 1 : 자연수 뒤집어 배열로 만들기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12932?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(n) {
  return String(n).split('').map(Number).reverse();
}
