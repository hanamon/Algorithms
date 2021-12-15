/*
  * [Level 1 : 시저 암호]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12926?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(s, n) {    
  return s.split('').map((str) => {
    if( str === ' ' ) return str;

    let newCode = str.charCodeAt() + n;

    if( str === str.toUpperCase() ) {
      if( newCode > 90 ) newCode = 64 + (newCode - 90);
    } else {
      if( newCode > 122 ) newCode = 96 + (newCode - 122);
    }

    return String.fromCharCode(newCode);
  }).join('');
}
