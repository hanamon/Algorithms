/*
  * [퀵 정렬 알고리즘]
  * 요구 사항 : 수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬하여 리턴한다.
  * 입력 : 수를 요소로 갖는 배열, arr[i]의 길이는 100,000 이하
  * 출력 : 수를 요소로 갖는 배열, 오름차순으로 정렬된 배열
  * 주의 사항 :
  * 1. 퀵 정렬을 구현한다.
  * 2. arr.sort 사용은 금지된다.
  * 입력 : quickSort( [1, 0, 43, 100, -10, 0, 100, 21, 0] ); 
  * 출력 : [-10, 0, 0, 0, 1, 21, 43, 100, 100]
  * Advanced : quickSort 함수의 두 번째 인자로 callback 함수를 받아서, 그 함수의 리턴값을 기준으로 요소들을 정렬해보자.
*/

/*--------------------------------------------------------------*/

// [방법 1.] - naive solution (나이브한 솔루션)
const quickSort = function (arr) {
  // 배열의 길이가 1 이하이면 그대로 리턴
  if( arr.length <= 1 ) return arr;

  const pivot = arr[0];
  const left = [];
  const right = [];

  for( let i=1; i<arr.length; i++ ) {
    // 만약 arr의 다음 요소가 arr의 첫 번째 요소보다 작거나 같으면 left 배열에 push 한다.
    if( arr[i] <= pivot ) left.push(arr[i]);
    // 만약 arr의 다음 요소가 arr의 첫 번째 요소보다 크면 right 배열에 push 한다.
    else right.push(arr[i]);
  }

  const lSorted = quickSort(left);
  const rSorted = quickSort(right);

  // arr의 길이가 2 이상인 재귀부터 리턴된다.
  // arr의 첫 번째 요소를 기준으로 좌우로 정렬된다.
  return [...lSorted, pivot, ...rSorted];
};

/*--------------------------------------------------------------*/

// [방법 2.] - optimized solution (최적화된 솔루션) + Advanced
// insertionSort 함수의 두 번째 인자로 콜백함수를 받아서 그 함수의 리턴 값을 기준으로 요소들을 정렬한다.
const quickSort = function (arr, transform = (item) => item) {
  if( arr.length <= 1 ) return arr;

  const pivot = arr[0];
  const left = [];
  const right = [];

  for( let i=1; i<arr.length; i++ ) {
    if( transform(arr[i]) < transform(pivot) ) left.push(arr[i]);
    else right.push(arr[i]);
  }

  const lSorted = quickSort(left, transform);
  const rSorted = quickSort(right, transform);

  return [...lSorted, pivot, ...rSorted];
}
