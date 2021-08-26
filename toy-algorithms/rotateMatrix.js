/*
  * [rotateMatrix] 행렬 회전 시키기
  * 요구 사항 : 2차원 배열 M x N을 입력 받아서 시계 방향으로 90도씩 K번 회전 시킨 후 리턴한다.
  * 입력 : 2차원 배열, 90도 회전 횟수
  * 출력 : 2차원 배열
*/

// [입출력 예시]

matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]

rotateMatrix(matrix, 1); // -->
/* 
[
  [9, 5, 1],
  [10, 6, 2],
  [11, 7, 3],
  [12, 8, 4]
];
*/

/*--------------------------------------------------------------*/

// [방법 1.]
const rotateMatrix = function (matrix, rotation = 1) {
  // 만약 회전 수가 0 이거나 빈 배열을 입력 받으면 입력 배열 그대로를 리턴한다.
  if( !rotation || matrix.length <= 1 ) return matrix;

  // 회전 수를 추출한다.
  const K = rotation%4;

  // 입력 행렬의 행과 열의 길이를 추출한다.
  const [rowLen, colLen] = [matrix.length-1, matrix[0].length-1];

  // 새로 생성할 행렬의 행과 길이를 지정한다.
  const [M, N] = K%2 ? [colLen, rowLen] : [rowLen, colLen];

  // 입력 행렬을 회전 시킨 것과 동일한 행의 길이를 가진 새로운 행렬을 만든다.
  const output = new Array(M+1).fill(0).map((el) => []);

  // 입력 행렬의 탐색 시작 위치를 지정한다.
  const startY = K === 3 ? 0 : rowLen;
  const startX = K === 1 ? 0 : colLen;

  // 새로운 행렬을 순회하며 기존 행렬의 값으로 바꾼다.
  for( let row=0; row<=M; row++ ) {
    for( let col=0; col<=N; col++ ) {
      if( K === 1 ) output[row].push(matrix[startY-col][startX+row]);
      else if( K === 2 ) output[row].push(matrix[startY-row][startX-col]);
      else output[row].push(matrix[startY+col][startX-row]);
    }
  }

  return output;
};
