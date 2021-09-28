/**
 * [구현] 보드 게임 2
 * 
 * [요구 사항]
 * N * N의 크기를 가진 보드판 위에서 게임을 한다.
 * 보드판이 담긴 board와 조작하려고 하는 문자열 operation이 주어질 때, 말이 해당 칸을 지나면서 획득한 숫자의 합을 구하라.
 * 
 * [게임 규칙]
 * 1. 좌표 왼쪽 상단(0, 0)에 말을 놓는다.
 * 2. 말은 상, 하, 좌, 우로 이동할 수 있다.
 * 3. 조작의 기회는 딱 한 번만 주어진다.
 * 4. 조작할 때 U, D, L, R은 각각 상, 하, 좌, 우를 의미한다. (한 줄에 띄어쓰기가 없어야 한다.)
 * 5. 한 번 움직일 때마다 한 칸씩 움직이게 되며, 그 칸 안에 요소인 숫자를 획득할 수 있다.
 * 6. 재방문하면 점수를 획득할 수 없다.
 * 7. 말은 보드 밖을 나갈 수 없다. (해당 조작은 무효)
 * 8. 칸 안에 숫자는 0부터 100,000중에 하나이다.
 * 9. 획득한 숫자를 합산하여 숫자가 제일 큰 사람이 이기게 된다.
 * 
 * [주의 사항]
 * 처음 말이 놓인 자리에 숫자는 획득하지 않는다.
 */

// [입출력 예시]
const board1 = [
  [72, 0, 80, 1],
  [1, 9, 11, 10],
  [1, 1, 792, 0],
  [13, 44, 27, 0]
]
const output1 = boardGame2(board1, 'RRDLLD');
console.log(output1); // 102


const board2 = [
  [567, 6734, 132],
  [789, 243, 6],
  [89, 33333, 0]
]
const output2 = boardGame2(board2, 'UUUDD');
console.log(output2); // 878

const board3 = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]
const output3 = boardGame2(board3, 'DDRRRUDUDUD');
console.log(output3); // 0

/*--------------------------------------------------------------*/

// [방법 1.]
function boardGame2(board, operation) {
  // board의 가로 길이 세로 길이 구한다. => OUT 되는 경우 찾기 위해서
  const len = board.length-1;
  
  // 말의 위치
  let [Y, X] = [0, 0];

  // 말의 조작
  const actionTable = {
    'U'() { Y-=1 },
    'D'() { Y+=1 },
    'L'() { X-=1 },
    'R'() { X+=1 },
    'U-X'() { Y+=1 },
    'D-X'() { Y-=1 },
    'L-X'() { X+=1 },
    'R-X'() { X-=1 }
  };

  // 유효성 검사
  const isValid = (Y, X) => Y >= 0 && X >= 0 && Y <= len && X <= len;

  // 획득한 숫자
  let count = 0;

  // 문자열을 순회한다.
  for( let i=0; i<operation.length; i++ ) {
    // 액션을 수행한다.
    actionTable[operation[i]]();
    // 만약에 Y, X을 초과하면 액션을 취소하고 다음으로 넘어간다.
    if( !isValid(Y, X) ) {
      actionTable[operation[i]+'-X']();
      continue;
    }
    // 만약 이미 방문한 좌표라면 다음으로 넘어간다.
    if( board[Y][X] === 'X' ) continue;
    // 코인을 count에 더한다.
    count += board[Y][X];
    // 보드에 'X' 표시한다.
    board[Y][X] = 'X';
  }

  // 획득한 수를 리턴한다.
  return count;
};
