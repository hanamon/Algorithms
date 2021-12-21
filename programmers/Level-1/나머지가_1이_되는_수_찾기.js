/*
 * [Level 1 : 나머지가 1이 되는 수 찾기]
 * 문제 : https://programmers.co.kr/learn/courses/30/lessons/87389?language=javascript
 */

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(n) {
  for (let i = 0; i < n; i++) {
    if (n % i === 1) return i;
  }
}
