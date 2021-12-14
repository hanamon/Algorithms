/*
  * [Level 1 : 행렬의 덧셈]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12950?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(arr1, arr2) {
  return arr1.map((row, i) => {
    return row.map((_, j) => {
      return arr1[i][j] + arr2[i][j];
    });
  });
}
