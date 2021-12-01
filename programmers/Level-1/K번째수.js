/*
  * [Level 1 : K번째수]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/42748?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(array, commands) {
  // commands를 map 순회한다.
  // array slice 자르고 sort k에 해당하는 요소를 찾아서 모아서 리턴한다.
  return commands.map((command) => {
      const [start, end, find] = command;
      return array.slice(start-1, end).sort((a, b) => a-b)[find-1];
  });
}
