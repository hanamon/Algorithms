/*
  * [중복 순열] 가위바위보
  * 요구 사항 : 
  * - 세 판의 가위바위보 게임을 할 경우, 한 사람은 세 번의 선택(예. 가위, 가위, 보)을 할 수 있다.
  * - 세 번의 선택으로 가능한 모든 경우의 수를 구하는 함수를 작성하라.
  * 입력 : 없음
  * 출력 : 2차원 배열(arr[i])을 리턴
  * 주의 사항 : 
  * - 최종적으로 리턴되는 배열의 순서는 가중치 적용 정렬(Weighted Sort)을 따른다.
  * - 중요도는 'rock', 'paper', 'scissors' 순으로 높다.
*/

// [입출력 예시]
let output = rockPaperScissors();
console.log(output); // -->
/*
[
  ["rock", "rock", "rock"],
  ["rock", "rock", "paper"],
  ["rock", "rock", "scissors"],
  ["rock", "paper", "rock"],
  // ...etc ...
]
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function rockPaperScissors (num, arr = ['rock', 'paper', 'scissors']) {
  // 선택 넘버가 인자로 들어오지 않은 경우
  if( ! num ) num = 3;
  // 재귀 탈출 조건 : 선택 넘버가 1 이하일 경우 현재 최소 배열 리턴
  if( num <= 1 ) return arr.map((el) => [el]);

  const result = [];

  arr.forEach((str, idx, arr) => {
    // 재귀 호출 후 결과 값 저장한다.
    const newArr = rockPaperScissors(num-1, arr);
    // 재귀 호출 후 결과 배열을 순회하며 현재 순회중인 배열의 요소와 합친다.
    const comArr = newArr.map((el) => [str, ...el]);
    // 출력 배열에 푸쉬한다.
    result.push(...comArr);
  });

  // 배열을 리턴한다.
  return result;
}
