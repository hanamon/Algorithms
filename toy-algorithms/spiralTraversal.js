/*
  * [Spiral Traversal] 나선형 순회
  * 요구 사항 : 
  * - M x N 2차원 배열을 나선형으로 순회해야한다.
  * - 순회는 좌측 상단 (0,0)에서 시작
  * - 배열의 모든 요소를 순서대로 이어붙인 문자열을 리턴
  * 입력 :
  * - 세로 길이(matrix.length)가 M, 가로 길이(matrix[i].length)가 N인 2차원 배열
  * - matrix[i]는 string 타입을 요소로 갖는 배열
  * - matrix[i][j].length는 1
  * 출력 : string 타입 리턴
*/

// [입출력 예시]
matrix = [
  ['A', 'B', 'C'],
  ['D', 'E', 'F'],
  ['G', 'H', 'I'],
];
spiralTraversal(matrix); // 'ABCFIHGDE'

matrix = [
  ['I', 't', ' ', 'd', 'o', 'e', 's', ' '],
  ['l', 'y', ' ', 'y', 'o', 'u', ' ', 'n'],
  ['w', ' ', 'y', 'o', 'u', ' ', 'g', 'o'],
  ['o', 's', 's', 't', 'o', 'd', 'o', 't'],
  ['l', 'a', ' ', '.', 'p', 'o', ' ', ' '],
  ['s', ' ', 't', 'o', 'n', ' ', 'a', 'm'],
  [' ', 'g', 'n', 'o', 'l', ' ', 's', 'a'],
  ['w', 'o', 'h', ' ', 'r', 'e', 't', 't'],
];
spiralTraversal(matrix); // 'It does not matter how slowly you go as long as you do not stop.'

/*--------------------------------------------------------------*/

// [방법 1.]
const spiralTraversal = function (matrix) {
  // 매트릭스의 row, col 길이를 추출한다.
  const rowLen = matrix.length-1;
  const colLen = matrix[0].length-1;

  // 현재 위치를 나타낼 배열을 만든다.
  let [Y, X] = [0, 0];

  // 출력 문자열을 담을 변수를 선언하고 초기값을 할당한다.
  let str = matrix[Y][X];

  // 재방문 하지 않기 위해 초기 위치를 표시한다.
  matrix[Y][X] = 0;

  // R, D, L, U 액션 메소드를 만들어서 사용한다.
  const actionTable = {
    'R'() { X+=1 },
    'D'() { Y+=1 },
    'L'() { X-=1 },
    'U'() { Y-=1 },
    'R-X'() { X-=1 },
    'D-X'() { Y-=1 },
    'L-X'() { X+=1 },
    'U-X'() { Y+=1 }
  };

  // 현재 수행할 액션을 설정한다.
  function direction() {
    if(action === 'R') action = 'D';
    else if(action === 'D') action = 'L';
    else if(action === 'L') action = 'U';
    else if(action === 'U') action = 'R';
  }

  // 현재 수행중인 액션 변수를 선언하고 초기값을 할당한다.
  let action = 'R';
  const max = (rowLen+1) * (colLen+1);

  // 현재 문자열의 길이가 rowLen*colLen 와 같아질 때까지 반복한다.
  while( str.length < max ) {
    // 1. 현재 수행중인 액션 변수 인자 넣은 엑션 테이블을 실행한다.
    actionTable[action]();
    if( Y < 0 || X < 0 || Y > rowLen || X > colLen || matrix[Y][X] === 0 ) {
      // 2. 실행한 결과가 보드를 벗어난다면 실행을 취소하고, 디랙션 함수를 실행시킨다.
      actionTable[action+'-X']();
      direction();
    }
    else {
      // 3. 실행한 결과가 보드를 벗어나지 않는다면 문자열에 보드의 현재 위치값을 추가한다.
      str += matrix[Y][X];
      // 재방문 하지 않기 위해 왔던 위치를 표시한다.
      matrix[Y][X] = 0;
    }
  }
  
  return str;
};
