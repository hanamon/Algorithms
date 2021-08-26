/*
  * [robotPath] 로봇 경로
  * 요구 사항 : 
  * - M, N인 방의 지도가 2차원 배열로 주어졌을 때, 1은 장애물을 의미하고 0 이동이 가능한 통로를 의미 (M, N은 20 이하의 자연수)
  * - 로봇은 지도 위를 일분에 한 칸씩 상하좌우로 이동 가능
  * - 위치와 목표 지점이 함께 주어질 경우, 로봇이 목표 지점까지 도달하는 데 걸리는 최소 시간을 리턴
  * 출력 : number 타입을 리턴
  * 주의 사항 : src, dst는 항상 로봇이 지나갈 수 있는 통로, src에서 dst로 가는 경로가 항상 존재함
*/

// [입출력 예시]
let room = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 0],
];
let src = [4, 2];
let dst = [2, 2];
let output = robotPath(room, src, dst);
console.log(output); // --> 8

/*--------------------------------------------------------------*/

// [수도 코드]
// 세로 M, 가로 N의 길이의 2차원 배열 (M, N은 20 이하의 자연수)
// 1은 장애물 의미 0은 이동 가능 통로 의미
// 1분에 한 칸씩 상하좌우로 이동 가능
// 로봇의 위치와 목표 지점이 주어짐
// 목표 지점까지 도달하는 데 걸리는 최소 시간을 리턴 (BFS)

// 한 칸 마다 로봇의 위치에서 BSF로 상하좌우로 탐색한다.
// 한 칸 이동 때 마다 카운트 변수도 함께 전달된다.
// 장애물을 만나면 BFS 종료
// 보드를 벗어나면 BFS 종료
// 0을 만나면 X로 표시 한다.
// 목표 지점을 만나면 재귀를 종료 후 카운트 변수를 리턴한다.

// [방법 1.]
const robotPath = function (room, src, dst) {
  // 룸의 크기를 추출한다.
  let [M, N] = [room.length-1, room[0].length-1]; 

  // 로봇의 현재 위치를 가리키는 변수 선언
  let [Y, X] = src;

  // 탐색할 위치를 담은 Queue 배열을 생성한다.
  let queue = [[Y, X, 0]];

  // 이동할 곳이 있으면 실행한다.
  while( queue.length ) {
    // 큐에서 현재 위치와 카운트를 추출한다.
    const [curY, curX, curC] = queue.shift();
    // 유효성 검사 1. 매트릭스를 벗어난 경우
    if( curY < 0 || curX < 0  || curY > M || curX > N ) continue;
    // 유효성 검사 2. 장애물이나 이미 지나온 곳을 만난 경우
    if( room[curY][curX] === 1 || room[curY][curX] === 'X' ) continue;
    // 로봇의 현재 위치를 X로 표시한다.
    room[curY][curX] = 'X';
    // 만약 현재 위치가 목표 지점인 경우 스탑
    if( curY === dst[0] && curX === dst[1] ) return curC;
    // 현재 위치에서 상하좌우로 이동 가능한지 검사한 후 큐에 담는다.
    queue.push([curY-1, curX, curC+1]);
    queue.push([curY+1, curX, curC+1]);
    queue.push([curY, curX-1, curC+1]);
    queue.push([curY, curX+1, curC+1]);
  }
};
