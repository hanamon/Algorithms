/*
  * [Level 1 : 핸드폰 번호 가리기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12948?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(phone_number) {
  return phone_number.split('').map((num, idx) => {
    if( idx < phone_number.length-4) return '*';
    return num;
  }).join('');
}
