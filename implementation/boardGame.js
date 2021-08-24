/*
  * [구현] 보드 게임
  * 시뮬레이션(simulation) - 문제에서 요구하는 복잡한 구현 요구 사항을 하나도 빠트리지 않고 코드로 옮겨, 마치 시뮬레이션을 하는 것과 동일한 모습을 그린다.
  * 요구 사항 :
  * - N * N의 크기를 가진 보드판 위에서 게임을 하려고 한다.
  * - 보드판이 담긴 board와 조작하려고 하는 문자열 operation이 주어질 때, 말이 해당 칸을 지나가면서 획득한 숫자의 합을 구하는 함수를 작성하라.
  * 게임 규칙 :
  * 1. 좌표 왼쪽 상단(0, 0)에 말을 놓는다.
  * 2. 말은 상, 하, 좌, 우로 이동할 수 있고, 플레이어가 조작할 수 있다.
  * 3. 조작의 기회는 딱 한 번 주어진다.
  * 4. 조작할 때 U, D, L, R은 각각 상, 하, 좌, 우를 의미하며 한 줄에 띄어쓰기 없이 써야 한다. (예시: UDDLLRRDRR, RRRRR)
  * 5. 한 번 움직일 때마다 한 칸씩 움직이게 되며, 그 칸 안의 요소인 숫자를 획득할 수 있다.
  * 6. 방문한 곳을 또 방문해도 숫자를 획득할 수 있다.
  * 7. 보드 밖을 나간 말은 OUT 처리가 된다.
  * 8. 칸 안의 숫자는 0 또는 1이다. 단, 좌표 왼쪽 상단(0, 0)은 항상 0이다.
  * 9. 획득한 숫자를 합산하여 숫자가 제일 큰 사람이 이기게 된다.
  * 인자 1 board : number 타입의 2차원 배열 (2 <= board.length <= 1,000)
  * 인자 2 operation :
  * - string 타입의 대문자 영어가 쓰여진 문자열 (1 <= operation.length <= board.length * 2)
  * - U, L, D, R 이외의 문자열은 없다.
  * 출력 : Number 타입을 반환, 만약, 말이 보드 밖으로 나갔다면 즉시 OUT 을 반환
*/

// [입출력 예시]
const board1 = [
  [0, 0, 0, 1],
  [1, 1, 1, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0]
]
const output1 = boardGame(board1, 'RRDLLD');
console.log(output1); // 4

const board2 = [
  [0, 0, 1],
  [1, 1, 1],
  [1, 0, 0]
]
const output2 = boardGame(board2, 'UUUDD');
console.log(output2); // 'OUT'

const board3 = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]
const output3 = boardGame(board3, 'DDRRRUDUDUD');
console.log(output3); // 0

/*--------------------------------------------------------------*/

// [방법 1.]
function boardGame(board, operation) {
  // 현재 위치를 표시하는 Y, X을 선언한다.
  let [Y, X] = [0, 0];

  // board의 가로 길이 세로 길이 구한다. => OUT 되는 경우 찾기 위해서
  const len = board.length-1;

  // count = 0; 변수 선언
  let count = 0;

  // action 을 수행하는 객체 선언
  const actionTable = {
    'U'() { Y-=1 },
    'D'() { Y+=1 },
    'L'() { X-=1 },
    'R'() { X+=1 },
  };
  
  // 유효성 검사
  const isValid = (Y, X) => Y >= 0 && X >= 0 && Y <= len && X <= len;

  // 문자열을 순회한다.
  for( let i=0; i<operation.length; i++ ) {
    // 액션을 수행한다.
    actionTable[operation[i]]();
    // 만약에 Y, X을 초과하면 OUT 리턴
    if( !isValid(Y, X) ) return 'OUT';
    // 코인을 count에 더한다.
    count += board[Y][X];
  }

  return count;
};
