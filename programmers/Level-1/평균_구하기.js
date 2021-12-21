/*
  * [Level 1 : 평균 구하기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12944?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(arr) {
  return arr.reduce((a, c) => a + c, 0) / arr.length;
}
