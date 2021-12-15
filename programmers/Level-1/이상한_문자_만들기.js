/*
  * [Level 1 : 이상한 문자 만들기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12917?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(s) {
  const arr = s.split(' ');
  return arr.map((word) => {
    return word.split('').map((str, idx) => {
      if( idx%2 !== 0 ) return str.toLowerCase();
      return str.toUpperCase();
    }).join('');
  }).join(' ');
}
