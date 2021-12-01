/*
  * [Level 1 : 신규 아이디 추천]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/72410?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(new_id) {    
  // 1단계
  let answer = new_id.toLowerCase();
  
  // 2단계
  answer = answer.replace(/[^0-9a-z._-]/g, "");
  
  // 3단계
  answer = answer.replace(/\.+/g, ".")
  
  // 4단계
  if( answer[0] === '.' ) answer = answer.slice(1);
  if( answer[answer.length-1] === '.' ) answer = answer.slice(0, answer.length-1);
  
  // 5단계
  if( answer.length === 0 || answer.length[0] === '' ) answer = 'a';
  
  // 6단계
  if( answer.length > 15 ) answer = answer.slice(0, 15);
  if( answer[0] === '.' ) answer = answer.slice(1);
  if( answer[answer.length-1] === '.' ) answer = answer.slice(0, answer.length-1);
  
  // 7단계
  while( answer.length <= 2 ) {
      answer += answer[answer.length-1];
  }
  
  return answer;
}
