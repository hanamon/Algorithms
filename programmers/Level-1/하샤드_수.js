/*
  * [Level 1 : 하샤드 수]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12947?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(x) {
  const num = String(x).split('').reduce((a, c) => a + Number(c), 0);
  if( x%num === 0 ) return true;
  return false;
}
