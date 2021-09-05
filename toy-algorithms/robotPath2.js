/*
  * [robotPath2] 로봇 경로 2
  * 요구 사항 : 
    - 세로와 가로의 길이가 각각 M, N인 방의 지도가 2차원 배열로 주어졌을 때, 1은 장애물을 의미하고 0 이동이 가능한 통로를 의미한다.
    - 로봇은 한 번에 임의의 k칸 직진과 90도 회전 중 1가지 동작을 할 수 있다.
    - 로봇의 현재 위치와 방향, 목표 지점과 방향이 함께 주어진다.
    - 이 때, 방향은 위쪽이 1, 오른쪽이 2, 아래쪽이 3, 왼쪽이 4로 주어진다.
    - 로봇이 목표 지점까지 도달해 목표 방향으로 회전하는 데 필요한 동작의 수를 리턴하라.
  * 입력 : (2차원 배열, 배열, 숫자, 배열, 숫자)가 주어진다. (입출력 예시 참고)
  * 출력 : number 타입을 리턴
  * 주의사항 :
    - M, N은 20 이하의 자연수이다.
    - src, dst는 항상 로봇이 지나갈 수 있는 통로이다.
    - src에서 dst로 가는 경로가 항상 존재한다.
    - 목표 지점에 도달한 후 방향까지 일치해야 한다.
    - 직진은 1칸 직진이 아니라 임의의 k칸을 직진할 수 있다.
    - 즉, 한번의 직진 명령으로 장애물이 없는 한 계속 갈 수 있다.
    - 왼쪽에서 오른쪽 또는 아래에서 위쪽으로 방향을 바꾸는 데 총 2번의 회전 동작이 필요하다.
*/

/*--------------------------------------------------------------*/

// [입출력 예시]
let room = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 1],
];
let src = [3, 0];
let sDir = 3;
let dst = [2, 2];
let dDir = 2;
robotPath2(room, src, sDir, dst, dDir); // --> 11

room = [
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 1, 1],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
src = [0, 3];
sDir = 1;
dst = [7, 3];
dDir = 2;
robotPath2(room, src, sDir, dst, dDir); // --> 9

/*--------------------------------------------------------------*/

// [방법 1.]
const robotPath2 = function (room, src, sDir, dst, dDir) {
  // 장애물에 'X' 표시를 한다.
  const matrix = room.map((row, idx) => {
    return row.map((num) => {
      if( num === 1 ) num = 'X';
      return num;
    });
  });

  // 방향을 설정할 때 필요한 카운트 수를 반환하는 객체의 메소드
  const actionTable = {
    U(dir) { return dir === 4 ? 1 : Math.abs(dir-1) },
    R(dir) { return Math.abs(dir-2) },
    D(dir) { return Math.abs(dir-3) },
    L(dir) { return dir === 1 ? 1 : Math.abs(dir-4) },
  };

  // 목표지점 도착했을 때의 방향
  let diraction = 0;

  // 다음 이동할 위치를 등록하는 큐를 선언한다. (현재 위치와 방향으로 초기화)
  const queue = [[src[0], src[1], sDir, 0]];
  
  // 다음 이동할 위차가 없을 때까지 반복한다.
  while( queue.length ) {
    let [S, C, dir, count] = queue.shift();

    // 유효성 검사 : 보드를 벗어나거나 장애물이면 다음으로 넘긴다.
    if( S < 0 || C < 0 || S > matrix.length-1 || C > matrix[0].length-1 ) continue;
    if( matrix[S][C] === 'X' ) continue;

    // 방문한적인 없는 경우이거나(0이거나), 방문했는데 현재 카운트가 더 적을 경우(최단 거리)
    if( !matrix[S][C] || count <= matrix[S][C] ) {
      // 현재 위치가 목표 지점인지 확인한다.
      if( S === dst[0] && C === dst[1] ) diraction = dir;

      // 현재 위치까지의 카운트를 기록한다.
      matrix[S][C] = count;

      // 현재 출발 지점이면 카운터에 + 1한다.
      let addCount = 0;
      if( S === src[0] && C === src[1] ) addCount++;

      // 다음 이동 장소를 큐에 푸쉬한다.
      queue.push([ S-1, C, 1, !actionTable.U(dir) ? count+addCount : count+actionTable.U(dir)+1 ]); // UP 
      queue.push([ S, C+1, 2, !actionTable.R(dir) ? count+addCount : count+actionTable.R(dir)+1 ]); // RIGHT
      queue.push([ S+1, C, 3, !actionTable.D(dir) ? count+addCount : count+actionTable.D(dir)+1 ]); // DOWN
      queue.push([ S, C-1, 4, !actionTable.L(dir) ? count+addCount : count+actionTable.L(dir)+1 ]); // LEFT
    }
  }

  if( diraction === dDir ) return matrix[dst[0]][dst[1]];
  else {
    let action;
    if( dDir === 1 ) action = 'U';
    else if( dDir === 2 ) action = 'R';
    else if( dDir === 3 ) action = 'D';
    else if( dDir === 4 ) action = 'L';
    return matrix[dst[0]][dst[1]] + actionTable[action](diraction);
  }
};
