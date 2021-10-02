/**
 * [rotatedArraySearch]
 * 부분적으로 오름차순 정렬된 정수의 배열과 정수를 입력받는다.
 * target의 인덱스를 리턴한다.
 * 부분적으로 정렬된 배열 : 배열을 왼쪽 혹은 오른쪽으로 0칸 이상 순환 이동할 경우 완전히 정렬되는 배열
 * 예시: [4, 5, 6, 0, 1, 2, 3]은 왼쪽으로 3칸 또는 오른쪽으로 4칸 순환 이동할 경우 완전히 정렬된다.
 * 
 * [주의사항]
 * rotated에 중복된 요소는 없다.
 * target이 없는 경우, -1를 리턴한다.
 * 단순히 처음부터 끝까지 찾아보는 방법 (O(N)) 대신 다른 방법 (O(logN))을 탐구해보자.
 * 이진 탐색을 약간 변형하여 해결한다.
 */

/*--------------------------------------------------------------*/

// [입출력 예시]
let output = rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 2);
console.log(output); // --> 5

output = rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 100);
console.log(output); // --> -1

/*--------------------------------------------------------------*/

// [방법 1.]
const rotatedArraySearch = function (rotated, target) {
  let [LEFT, RIGHT] = [0, rotated.length-1];

  while (LEFT <= RIGHT) {
    let middle = parseInt((RIGHT + LEFT) / 2);

    if (rotated[middle] === target) return middle;

    if (rotated[LEFT] < rotated[middle]) {
      if (target < rotated[middle] && rotated[LEFT] <= target) {
        RIGHT = middle - 1;
      } else {
        LEFT = middle + 1;
      }
    } else {
      if (target <= rotated[RIGHT] && rotated[middle] < target) {
        LEFT = middle + 1;
      } else {
        RIGHT = middle - 1;
      }
    }
  }

  return -1;
};