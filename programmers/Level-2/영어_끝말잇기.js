/*
  * [Level 2 : 영어 끝말잇기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12981?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(n, words) {
  // 시작 스펠링이 다른지 혹은 중복을 말했는지 확인한다.
  // 없으면 [0, 0] 리턴한다.
  // 있으면 해당 index가 몇 번째 사람의 몇 번째 순서인지 배열에 담아서 리턴한다.
  
  for( let i=1; i<words.length; i++ ) {
    const beforeLastW = words[i-1][words[i-1].length-1];
    const currentFirstW = words[i][0];
    const beforeArr = words.slice(0, i);
    
    if( beforeLastW !== currentFirstW || beforeArr.includes(words[i]) ) {
      const userNum = i - (Math.floor(i/n) * n) + 1;
      const turnNum = Math.ceil((i+1)/n);
      return [userNum, turnNum];
    }
  }
  
  return [0, 0];
}
