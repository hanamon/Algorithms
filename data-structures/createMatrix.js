/*
  * [Graph] 인접 행렬 생성하기
  * 요구 사항 : 방향이 있는 간선과 방향이 없는 간선들의 목록들을 받아 2차원 배열의 인접행렬을 반환하는 함수를 작성하라.
  * 조건 : 0번째: 간선의 시작 정점 (0 이상의 정수)
  *        1번째: 간선의 도착 정점 (0 이상의 정수)
  *        2번째: 방향성 ('undirected' 일시 무향, 'directed' 일시 방향)
  * 인자 : Number 타입의 방향/무향인 간선들의 목록이 담긴 배열
  * 출력 : Array 타입을 리턴
  *        2차원 배열의 인접 행렬
  * 주의 사항 : 1. 정점 0에서 정점4로 이어주는 간선이 존재할 경우 정점 1, 2, 3도 존재한다.
  *             2. 반환하는 인접행렬은 2차원 배열이며, 행(row)는 바깥 배열, 열(column)은 안쪽 배열이다.
  *               - let matrix = [[0, 0], [0, 0]]
  *               - matrix[0] === 0번째 행
  *               - matrix[0][0] === 0번째 행의 0번째 열
  *             2. 두 정점간의 간선의 유무는 0과 1로 표시한다.
  *               - 0: 두 정점간에 간선이 존재하지 않을 경우
  *               - 1: 두 정점간에 간선이 존재할 경우
  *             3. 아래의 2차원 배열에서 세로축은 시작 정점, 가로축은 도착 정점이다.
  * 
*/

// 입출력 예시

const matrix = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

let output1 = createMatrix([
	[0, 3, "directed"],
	[0, 2, "directed"],
	[1, 3, "directed"],
	[2, 1, "directed"],
]);

console.log(output1);
/**
 * [
 *  [0, 0, 1, 1],
 *  [0, 0, 0, 1],
 *  [0, 1, 0, 0],
 *  [0, 0, 0, 0]
 * ]
 */

let output2 = createMatrix([
	[0, 2, "directed"],
	[2, 4, "undirected"],
	[1, 3, "undirected"],
	[2, 1, "directed"],
]);

console.log(output2);
/**
 * [
 *  [0, 0, 1, 0, 0],
 *  [0, 0, 0, 1, 0],
 *  [0, 1, 0, 0, 1],
 *  [0, 1, 0, 0, 0],
 *  [0, 0, 1, 0, 0],
 * ]
 */

/*--------------------------------------------------------------*/

// [방법 1-1.]
function createMatrix(edges) {
  // 1. 입력 배열에서 최대값을 추출한다.
  // 최대값 변수를 초기화한다.
  let max = 0;

  edges.forEach((edge) => {
    // 스프리트 문법을 이용해 슬라이스한 el 를 뿌려줘야한다. (안그러면 Math.max 인자로 배열 들어감.)
    const edgeMax = Math.max(...edge.slice(0, 2));
    if( max < edgeMax ) max = edgeMax;
  });

  // 2. 최대값 만큼의 길이를 가진 매트릭스를 만든다.
  // 입력 배열을 순회하며 최대값을 재할당한다.
  // 첫 번째 요소와 두 번째 중 최대값을 추출한다.
  const matrix = new Array(max + 1).fill(0).map((row) => new Array(max + 1).fill(0));
	
  // 3. 입력 배열을 순회하며 매트릭스에 조건에 맞는 간선을 추가한다.
  // 요소에서 3가지 정보를 추출한다.
  // 추출한 정보 중 방향성에 따라 매트릭스 배열에 간선을 표시한다.
  edges.forEach((edge) => {
    const [y, x, direction] = edge;
    if( direction === 'undirected' ) matrix[x][y] = 1;
    matrix[y][x] = 1;
  });

  return matrix;
}

/*--------------------------------------------------------------*/

// [방법 1-2.] 위와 동일한 방법인데 코드 디자인만 다름
function createMatrix(edges) {
  // 1. 입력 배열에서 최대값을 추출한다.
  let max = 0; // 초기화

  edges.forEach((edge) => {
    const sliceArr = edge.slice(0, 2); 
    const edgeMax = Math.max(...sliceArr); // 스프리드 문법을 이용해서 배열 뿌리기
    if( max < edgeMax ) max = edgeMax;
  });

  // 2. 최대값 만큼의 매트릭스를 생성한다.
  const matrix = new Array(max + 1).fill(0).map(() => new Array(max + 1).fill(0));

  // 3. 입력 배열을 순회하면 간선을 표시한다.
  edges.forEach((edge) => {
    const [row, col, direction] = edge;
    matrix[row][col] = 1;
    if( direction === 'undirected' ) matrix[col][row] = 1;
  });

  return matrix;
}
