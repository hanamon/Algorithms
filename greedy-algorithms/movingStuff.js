/*
  * [Greedy] 짐 나르기
  * 요구 사항 : 짐의 무게를 담은 배열과 무게 제한이 매개변수로 주어질 때 모든 짐을 옮기기 위해 필요한 최소값의 박스 개수를 리턴하라.
  * 인자 :
  * - stuff : Number 타입의 40 이상 240 이하의 자연수를 담은 배열 (예: [70, 50, 80, 50])
  * - limite : Number 타입의 40 이상 240 이하의 자연수
  * 출력 : Number 타입 리턴
  * 주의 :
  * - 한 번에 최대 2 개의 짐 밖에 넣을 수 없다.
  * - 옮겨야 할 짐의 개수는 1개 이상 50,000개 이하이다.
*/

// [입출력 예시]
let output1 = movingStuff([70, 50, 80, 50], 100);
console.log(output1); // 3

let output2 = movingStuff([60, 80, 120, 90, 130], 140);
console.log(output2); // 4

/*--------------------------------------------------------------*/

// [방법 1.]
// 탐욕 알고리즘을 활용해서 문제를 풀어보자.
// 탐욕 알고리즘을 풀 수 있는 문제가 따로 있다. 그게 이 문제이다.
// 박스에 한 번에 최대 2개의 짐, 그리고 무게 제한이 있다.
// 무게가 배열로 들어온다.
// 박스를 최대한 적게 사용해서 짐을 옮겨 봅시다. (최소값)
// 입력 배열이 5만 개면 O(N) or O(log n)
function movingStuff(stuff, limit) {
  // sort로 정렬을 한다.
  stuff.sort((a, b) => a - b);

  // 카운트 변수를 선언한다.
  let count = 0;

  // while 문을 사용해서 배열이 있으면 실행한다.
  while( stuff.length ) {
    // 배열의 맨 앞과 맨 뒤를 더한 값을 limit와 비교한다.
    const sum = stuff[0] + stuff[stuff.length-1];
    // limit을 넘어가면 현재 배열에서 최대 값을 빼고 카운트한다.
    if( sum > limit ) {
      stuff.pop();
      count++;
    }
    else {
      stuff.shift();
      stuff.pop();
      count++;
    }
  }

  // 모든 배열이 빠지면 중단하고 카운트를 리턴한다.
  return count;
}
