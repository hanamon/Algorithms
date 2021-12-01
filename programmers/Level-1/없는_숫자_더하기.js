/*
  * [Level 1 : 없는 숫자 더하기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/86051?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(numbers) {
  // 카운트 변수를 선언한다.
  // 0부터 9까지 수를 순회한다.
  // 이때 순회하는 수가 numbers에 있는지 확인한 후 없다면 카운트한다.
  let count = 0;
  for(let i=0; i<=9; i++) {
      // 이부분 때문에 Bio-O 표기법에서 시간복잡도는 O(n)이다.
      // 그러나 입력값의 제한 사항이 10미만 이기 때문에 사용해도 무방하다.
      if(!numbers.includes(i)) count += i;
  }
  return count;
}

/*--------------------------------------------------------------*/

// [방법 2.]
function solution(numbers) {
  // 0 부터 9까지의 합은 45이다.
  // numbers 존재하는 요소의 모든 합을 45에서 빼준 값이 곧 존재하지 않는 요소의 합과 같다.
  return 45 - numbers.reduce((a, c) => a + c, 0);
}
