/*
  * [LSCS] 연속된 부분 배열의 합 중 가장 큰 값 구하기 (멱집합과 다르다.)
  * 요구 사항 : 정수를 요소로 갖는 배열을 입력받아 다음의 조건을 만족하는 LSCS를 리턴하라.
  * 입력 : arr : number 타입을 요소로 갖는 배열, arr.length는 60,000 이하, arr[i]는 -100,000 이상 100,000 이하 정수
  * 출력 : number 타입을 리턴
*/

// [입출력 예시]
let output = LSCS([1, 2, 3]);
console.log(output); // --> 6

output = LSCS([1, 2, 3, -4]);
console.log(output); // --> 6 ([1, 2, 3])

LSCS([1, 2, 3, -4, 5]);
console.log(output); // --> 7 ([1, 2, 3, -4, 5])

LSCS([10, -11, 11]);
console.log(output); // --> 11 ([11])

/*--------------------------------------------------------------*/

// [수도 코드]
// LSCS(Largest Sum of Contiguous Subarray) : 주어진 배열의 배열의 연속된 부분 배열의 합 중 가장 큰 값
// 1. 연속된 부분 배열을 구한다.
// 2. 연속된 부분 배열의 합을 구한다.
// 3. 연속된 부분 배열의 합 중 가장 큰 값을 구한다.

/*--------------------------------------------------------------*/

// [방법 1.] naive solution: O(N^2)
const LSCS = function (arr) {
  let max = Number.MIN_SAFE_INTEGER; // -9007199254740991
  for( let i=0; i<arr.length; i++ ) {
    let sum = arr[i];
    // 합중 가장 큰 값 할당
    if( sum > max ) max = sum;
    for( let j=i+1; j<arr.length; j++ ) {
      // 여기에서 sum에 arr[i]가 있는 부분 집합의 합이 담긴다.
      sum += arr[j];
      // 합중 가장 큰 값 할당
      if( sum > max ) max = sum;
    }
  }
  return max;
};

/*--------------------------------------------------------------*/

// [방법 2.] dynamic programming: O(N)
const LSCS = function (arr) {
  // 연속 배열의 합
  let subArrSum = 0;
  // 정답의 후보를 저장, 초기값은 자바스크립트의 최소 안전 정수(음수)이다.
  let max = Number.MIN_SAFE_INTEGER; // -9007199254740991
  arr.forEach((num, idx) => {
    // 지나온 모든 요소와 현재 요소를 더한다.
    subArrSum += num;
    // 누적합으로 인해 다음 요소와 더하면 LSCS인지 확인이 가능하다.
    if( subArrSum > max ) max = subArrSum;
    // 연속된 구간의 합이 음수인 경우, 해당 부분은 버리고 다시 시작해도 된다.
    if( subArrSum < 0 ) subArrSum = 0;
  });

  return max;
};
