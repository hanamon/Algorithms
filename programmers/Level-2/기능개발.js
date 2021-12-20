/*
  * [Level 2 : 기능개발]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/42586?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]

// 해당 풀이 방법은 최악의 경우 O(n2) 시간 복잡도를 가지게 된다.
// 입력 배열이 100 미만이라는 제한 사항이 존재하지만, 그래도 좀 더 시간 복잡도를 줄일 수 있는 방법이 있다. => 방법 2

function solution(progresses, speeds) {
  // 배열의 요소가 없어질 때까지 반복한다.
  // 작업 진도에 작업 속도를 더한다.
  // 현재 배열 0번 index가 100 이상이 되면 count + 1
  // 다음 index 또한 100 이상이 되면 count + 1 shift, 100 이상이 되면 count + 1 shift...
  // 해당 턴의 카운트를 새로운 배열에 담는다.
  const answer = [];
  
  while( progresses.length ) {
    progresses = progresses.map((num, idx) => num + speeds[idx]);
    let count = 0;
    while( progresses[0] > 99 ) {
      count += 1;
      progresses.shift();
      speeds.shift();
    }
    if( count ) answer.push(count);
  }
  
  return answer;
}

/*--------------------------------------------------------------*/

// [방법 2.]

// 방법 1 보다 속도가 더 빠르다.

function solution(progresses, speeds) {
  const days = progresses.map((num, idx) => Math.ceil((100 - num) / speeds[idx]));
  let maxDay = days[0];
  let answer = [0];

  for( let i=0, j=0; i<days.length; i++ ) {
    if( days[i] <= maxDay ) {
      answer[j] += 1;
    } else {
      maxDay = days[i];
      answer[++j] = 1;
    }
  }

  return answer;
}
