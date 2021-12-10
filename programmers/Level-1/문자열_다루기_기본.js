/*
  * [Level 1 : 문자열 다루기 기본]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12918?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(s) {
  const reg = {
    len4: /^[0-9]{4}$/,
    len6: /^[0-9]{6}$/
  };

  if( reg['len4'].test(s) || reg['len6'].test(s) ) return true;
  else return false;
}

/*--------------------------------------------------------------*/

// [방법 2-1.]
function solution(s) {
  const reg = /^[0-9]{4}$|^[0-9]{6}$/;
  
  if( reg.test(s) ) return true;
  else return false;
}

/*--------------------------------------------------------------*/

// [방법 2-2.]
function solution(s) {
  const reg = /^[0-9]{4}$|^[0-9]{6}$/; 
  return reg.test(s);
}
