/*
  * [Level 1 : 제일 작은 수 제거하기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12935?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(arr) {
  const min = Math.min(...arr);
  const idx = arr.indexOf(min);
  arr.splice(idx, 1);

  return arr.length < 2 ? [-1] : arr;
}
