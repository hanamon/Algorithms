/*
  * [Level 1 : 수박수박수박수박수박수?]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12922?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(n) {
  return new Array(n).fill(null).map((_, idx) => {
    if( idx % 2 === 0 ) return '수';
    return '박';
  }).join('');
}
