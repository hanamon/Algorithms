/*
  * [Level 1 : 음양 더하기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/76501?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(absolutes, signs) {
  return absolutes.reduce((a, c, idx) => {
    if( signs[idx] ) return a + c;
    else return a - c;
  }, 0);
}

/*--------------------------------------------------------------*/

// [방법 2.]
function solution(absolutes, signs) {
  return absolutes.reduce((a, c, i) => {
    return a + (c * (signs[i] ? 1 : -1));
  }, 0);
}
