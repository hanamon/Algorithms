/*
  * [Level 1 : 2016년]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12901?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(a, b) {
  const arr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const day = new Date(2016, a-1, b).getDay();
  return arr[day];
}
