/*
  * [삽입 정렬 알고리즘]
  * 요구 사항 : 수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬하여 리턴한다.
  * 입력 : 수를 요소로 갖는 배열, arr[i]의 길이는 1,000 이하
  * 출력 : 수를 요소로 갖는 배열, 오름차순으로 정렬된 배열
  * 주의 사항 :
  * 1. 삽입 정렬로 구현한다.
  * 2. arr.sort 사용은 금지된다.
  * 입력 : insertionSort( [1, 0, 43, 100, -10, 0, 100, 21, 0] ); 
  * 출력 : [-10, 0, 0, 0, 1, 21, 43, 100, 100]
  * Advanced : insertionSort 함수의 두 번째 인자로 callback 함수를 받아서, 그 함수의 리턴값을 기준으로 요소들을 정렬해보자.
*/

/*--------------------------------------------------------------*/

// [방법 1.] - naive solution (나이브한 솔루션)
const insertionSort = function (arr) {
  // arr 배열의 첫 번째 요소를 담은 배열 생성
  let sorted = [arr[0]];

  // arr의 두 번째 배열부터 끝까지 반복
  for( let i=1; i<arr.length; i++ ) {
    // 만약 arr 배열의 i 번째 요소가 sorted 배열의 i-1 번째 요소와 같거나 더 크면 실행
    if( arr[i] >= sorted[i-1] ) {
      // 오름차순이니까 arr의 다음 요소가 현재 sorted의 마지막 요소보다 크면 그냥 push
      sorted.push(arr[i]);
    }
    else {
      // 현재 sorted의 마지막 요소보다는 작다면 앞에 요소와도 비교
      for( let j=0; j<i; j++ ) {
        if( arr[i] <= sorted[j] ) { 
          // 중간에 arr[i]를 삽입한다.
          const left = sorted.slice(0, j);
          const right = sorted.slice(j);
          // sorted 재정의 그래서 let으로 선언
          sorted = left.concat(arr[i], right);
          break;
        }
      }
    }
  }

  return sorted;
};

// [방법 2.] - naive solution (나이브한 솔루션)
const insertionSort = function (arr) {
  // arr 배열의 첫 번째 요소를 담은 배열 생성
  const sorted = [arr[0]];

  // arr의 두 번째 배열부터 끝까지 반복
  for( let i=1; i<arr.length; i++ ) {
    // 만약 arr 배열의 i 번째 요소가 sorted 배열의 i-1 번째 요소와 같거나 더 크면 실행
    if( arr[i] >= sorted[i-1] ) {
      // 오름차순이니까 arr의 다음 요소가 현재 sorted의 마지막 요소보다 크면 그냥 push
      sorted.push(arr[i]);
    }
    else {
      // 현재 sorted의 마지막 요소보다는 작다면 앞에 요소와도 비교
      for( let j=0; j<i; j++ ) {
        if( arr[i] <= sorted[j] ) { 
          // 중간에 arr[i]를 삽입한다.
          sorted.splice(j, 0, arr[i]);
          break;
        }
      }
    }
  }

  return sorted;
};

// [방법 3.] - naive solution (나이브한 솔루션) + Advanced
// insertionSort 함수의 두 번째 인자로 콜백함수를 받아서 그 함수의 리턴 값을 기준으로 요소들을 정렬한다.
const insertionSort = function (arr, transform = (item) => item) {
  // 함수의 파라미터에 기본값을 정의해주면 인자로 들어오지 않았을 때는 기본값이 적용되고, 인자가 들어오면 그 인자값이 파라미터에 적용된다.
  // 콜백함수가 리턴하는 값으로 새로운 배열을 만든다.
  const newArr = arr.map((item) => {
    return transform(item);
  });

  const afterArr = [newArr[0]];
  const beforeArr = [arr[0]];

  for( let i=1; i<newArr.length; i++ ) {
    if( newArr[i] >= afterArr[i-1] ) {
      afterArr.push(newArr[i]);
      beforeArr.push(arr[i]);
    }
    else {
      for( let j=0; j<i; j++ ) {
        if( newArr[i] <= afterArr[j] ) {
          afterArr.splice(j, 0, newArr[i]);
          beforeArr.splice(j, 0, arr[i]);
          break;
        }
      }
    }
  }

  return beforeArr;
}

// [방법 4.] - optimized solution (최적화된 솔루션) + Advanced
const insertionSort = function (arr, transform = (item) => item) {
  const sorted = [arr[0]];

  for( let i=1; i<arr.length; i++ ) {
    // 모든 비교가 함수 호출 후 이뤄지게 만든다.
    if( transform(arr[i]) >= transform(sorted[i-1]) ) {
      sorted.push(arr[i]);
    }
    else {
      for( let j=0; j<i; j++ ) {
        if( transform(arr[i]) <= transform(sorted[j]) ) {
          sorted.splice(j, 0, arr[i]);
          break;
        }
      }
    }
  }

  return sorted;
};
