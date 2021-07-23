// 요구 사항 : 수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬하여 리턴한다.
// 입력 : 수를 요소로 갖는 배열, arr[i]의 길이는 1,000 이하
// 출력 : 수를 요소로 갖는 배열
// 주의 사항 : 
// 1. 버블 정렬(bubble sort)로 구현한다.
// 2. arr.sort 사용은 금지된다.

// [시도 : Number 1.]

// 요구 사항 : 수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬하여 리턴한다.
// 입력 : 수를 요소로 갖는 배열, arr[i]의 길이는 1,000 이하
// 출력 : 수를 요소로 갖는 배열
// 주의 사항 : 
// 1. 버블 정렬(bubble sort)로 구현한다.
// 2. arr.sort 사용은 금지된다.

// [시도 : Number 1.]
const bubbleSort = function (arr) {

  for( let i=0; i<arr.length; i++ ) {
    // 임시 변수 생성한다.
    let temp = 0;
    // 모든 요소와 비교한다.
    for( let j=0; j<arr.length; j++ ) {
      // 현재의 요소가 다음 요소 보다 크다면 (오름차순)
      if( arr[j] > arr[j+1] ) {
        // 순서를 바꿔준다.
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
    // 만약 바꾼 내용이 없다면 즉, temp 가 그대로면 중단한다.
    if( temp === 0 ) break;
  }

  return arr;
};

bubbleSort( [1, 0, 43, 100, -10, 0, 100, 21, 0] );