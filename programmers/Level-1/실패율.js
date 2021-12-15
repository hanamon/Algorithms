/*
  * [Level 1 : 실패율]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/42889?language=javascript
*/

/*--------------------------------------------------------------*/

/**
 * N: 전체 스테이지의 개수
 * stages: 사용자가 현재 멈춰있는 스테이지의 번호가 담긴 배열
 * 실패율: 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
 * 리턴값: 실패율 높은 스테이지 내림차순 배열
 */

// [방법 1.]
function solution(N, stages) {
  const arr = []; 
  
  for( let i=1; i<=N; i++ ) {
    const cleared = stages.reduce((a, c) => c >= i ? ++a : a, 0);
    const notYet = stages.reduce((a, c) => c === i ? ++a : a, 0);
    arr.push([i, notYet / cleared]);
  }

  return arr.sort((a, b) => b[1] - a[1]).map((el) => el[0]);
}
