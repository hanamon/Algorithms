/*
  * [gossipProtocol] 마을에 소문이 퍼지는 최단 시간을 구하라
  * 요구 사항 : 
  * - 세로와 가로의 길이가 각각 M, N인 마을지도가 배열로 주어졌을 때,
  * - '1'은 주민이 있는 집을 의미하고 '0'은 주민이 없는 땅을 의미한다.
  * - 이 마을은 소문이 시작되면 하루에 상하좌우 한 칸 바로 옆에 있는 집으로 퍼진다.
  * - 특정 주민의 집 (R, C)으로부터 어떤 소문이 시작될 경우, 마을 전체로 소문이 퍼지는데 걸리는 시간(일)을 리턴하라.
  * 입력 : 
  * 1. village : string 타입을 요소로 갖는 배열
  * 2. row : number 타입 0 이상의 정수
  * 3. col : number 타입 0 이상의 정수
  * 출력 : number 타입 리턴
  * 주의 사항 : 
  * - M, N은 100 이하의 자연수
  * - row, col 에는 항상 주민이 살고 있다.
  * - 모든 집은 연결되어 있다. (한 집에서 다른 집으로 가능 경로가 항상 존재)
  * - village를 그래프로 구현하는 함수가 주어짐
*/

// [입출력 예시]
let village = [
  '0101',
  '0111',
  '0110',
  '0100',
];
let row = 1;
let col = 2;
let output = gossipProtocol(village, row, col);
console.log(output); // --> 3

/*--------------------------------------------------------------*/

// [방법 1.]
// BFS 너비우선탐색을 이용한다. (Queue를 이용한다.)
const gossipProtocol = function (village, row, col) {
  // 입력 배열을 행렬로 만든다.
  const matrix = createMatrix(village);
  // 날짜를 카운트하는 변수를 선언한다.
  let day = 0;
  // 이동할 다음 위치를 담을 변수를 선언한다. (처음 현재 위치를 초기 할당한다.)
  const queue = [[row, col, day]];
  
  // 이동할 다음 위치가 있으면 실행한다.
  while( queue.length ) {
    // 현재 위치를 queue에서 추출한다.
    const [Y, X, count] = queue.shift();
    // 만약 현재 좌표가 매트릭스를 벗어나면 다음으로 넘긴다.
    if( Y < 0 || X < 0 || Y > matrix.length-1 || X > matrix[0].legnth-1 ) continue;
    // 만약 현재 좌표가 '0'이면 다음으로 넘긴다.
    if( matrix[Y][X] === '0' ) continue;
    // 만약 현재 좌표가 '1'이면 현재 위치를 'X' 표시하고 상하좌우로 이동한다.
    if( matrix[Y][X] === '1' ) {
      matrix[Y][X] = 'X';
      day = count;
      queue.push([Y-1, X, count+1]);
      queue.push([Y+1, X, count+1]);
      queue.push([Y, X-1, count+1]);
      queue.push([Y, X+1, count+1]);
    }
  }
  
  // 카운트를 리턴한다.
  return day;
};

const createMatrix = (village) => {
  const matrix = [];
  village.forEach((line) => {
    const row = [];
    for (let i = 0; i < line.length; i++) row.push(line[i]);
    matrix.push(row);
  });
  return matrix;
};
