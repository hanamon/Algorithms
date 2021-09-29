/**
 * [binarySearch] 이진탐색 알고리즘
 * 인진탐색을 사용해서 배열에 정수가 어디에 있는지 검사한다.
 * 
 * [요구사항]
 * 오름차순 정렬된 정수의 배열(arr)과 정수(target)를 입력받아 target의 index를 리턴하라.
 * 
 * [인자]
 * arr : number 타입을 요소로 갖는 배열, arr[i]는 정수
 * target : number 타입의 정수
 * 
 * [출력]
 * number 타입을 리턴한다.
 * 
 * [주의사항]
 * 이진탐색 알고리즘(O(logN))을 사용해야한다.
 * 단순한 배열 순회(O(N))로는 통과할 수 없다.
 * target이 없는 경우, -1을 리턴한다.
 */

/*--------------------------------------------------------------*/

// [입출력 예시]
let output = binarySearch([0, 1, 2, 3, 4, 5, 6], 2);
console.log(output); // --> 2

output = binarySearch([4, 5, 6, 9], 100);
console.log(output); // --> -1

/*--------------------------------------------------------------*/

// [방법 1.]
const binarySearch = function (arr, target) {
  let [LEFT, RIGHT] = [0, arr.length-1];

  while( LEFT <= RIGHT ) {
    let middle = parseInt((RIGHT + LEFT) / 2);

    if( arr[middle] === target ) return middle;

    if( target <= arr[middle] ) RIGHT = middle - 1;
    else LEFT = middle + 1;
  }

  return -1;
};
