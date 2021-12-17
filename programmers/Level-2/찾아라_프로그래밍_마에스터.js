/*
  * [Level 2 : 찾아라 프로그래밍 마에스터]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/1844?language=javascript
*/

/*--------------------------------------------------------------*/

// 최단거리 구하기 => BFS => 자료구조 Queue 이용

// [방법 1.]
function solution(maps) {
  const [N, M] = [maps.length-1, maps[0].length-1];
  const queue = [[0, 0, 1]];

  while( queue.length ) {
    const [Y, X, count] = queue.shift();

    if( Y < 0 || X < 0 || Y > N || X > M ) continue;
    if( maps[Y][X] === 0 || maps[Y][X] === 'X' ) continue;
    if( Y === N && X === M ) return count; // 도착

    maps[Y][X] = 'X';

    queue.push([Y-1, X, count+1]); // 상
    queue.push([Y+1, X, count+1]); // 하
    queue.push([Y, X-1, count+1]); // 좌
    queue.push([Y, X+1, count+1]); // 우
  }

  return -1;
}
