/*
  * [Level 1 : 가운데 글자 가져오기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12903?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(s) {
  let strLeng = s.length;
  
  if( strLeng % 2 === 1 ) {
      // 문자의 길이가 홀수라면 가운데 글자 하나를 반환한다.
      let result = Math.floor(strLeng / 2);
      return s[result];      
  } else {
      // 문자의 길이가 짝수라면 가운데 글자 두개를 반환한다.
      let front = (strLeng / 2) - 1;
      let rear = (strLeng / 2);
      return s[front] + s[rear];
  }
}
