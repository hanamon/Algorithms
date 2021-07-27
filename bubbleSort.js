/*
  * [버블 정렬 알고리즘]
  * 첫 번째 요소가 두 번째 요소보다 크면, 두 요소의 위치를 바꾼다.
  * 두 번째 요소와 세 번째 요소보다 크면, 두 요소의 위치를 바꾼다.
  * 1, 2를 마지막까지 반복한다. (마지막에서 두 번째 요소와 마지막 요소를 비교)
  * 1 ~ 3의 과정을 한 번 거치게 되면, 가장 큰 요소가 배열의 마지막으로 밀려난다.
  * 1 ~ 3의 과정을 첫 요소부터 다시 반복한다.
  * 5를 통해 두 번째로 큰 요소가 배열의 마지막 바로 두 번째로 밀려난다.
  * 1 ~ 3의 과정을 총 n번(배열의 크기)만큼 반복한다.
  * 이 모습이 마치 '거품이 밀려 올라가는 것과 같은 모습'과 같아서 Bubble Sort라고 부른다.
*/

/*--------------------------------------------------------------*/

/*
  * 요구 사항 : 수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬하여 리턴한다.
  * 입력 : 수를 요소로 갖는 배열, arr[i]의 길이는 1,000 이하
  * 출력 : 수를 요소로 갖는 배열, 오름차순으로 정렬된 배열
  * 주의 사항 :
  * 1. 버블 정렬(bubble sort)로 구현한다.
  * 2. arr.sort 사용은 금지된다.
  * 입력 : bubbleSort( [1, 0, 43, 100, -10, 0, 100, 21, 0] ); 
  * 출력 : [-10, 0, 0, 0, 1, 21, 43, 100, 100]
*/

/*--------------------------------------------------------------*/

// [방법 1.]
const bubbleSort_1 = (arr) => {
  for( let i=0; i<arr.length-1; i++ ) {
    // 임시 변수 생성한다.
    let temp = 0;
    // 모든 요소와 비교한다.
    for( let j=0; j<arr.length-1; j++ ) {
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

/*--------------------------------------------------------------*/

// [방법 2.] - naive solution (나이브한 솔루션)
const swap_1 = (index1, index2, arr) => {
  // 배열에서 두 변수를 swap(교환)하는 방법에는 여러가지가 있다.
  // swap() 함수를 만들어서 모듈화 해준다.

  // 1) 임시 변수를 활용한 방법
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

const bubbleSort_2 = (arr) => {
  for( let i=0; i<arr.length-1; i++ ) {
    for( let j=0; j<arr.length-1-i; j++ ) {
      // 첫 번째 반복할 때, 즉 i가 0일 때, 0번째로 큰 수가 마지막에서 0번째에 위치하게 된다.
      // 매 반복마다 i번째로 큰 수가 마지막에서 i번째 위치하게 된다.
      // 이미 정렬된 요소는 고려할 필요가 없으므로 'j<arr.length-1-i'까지만 비교한다.
      if( arr[j] > arr[j+1] ) {
        swap_1(j, j+1, arr);
      }
    }
  }

  return arr;
}

/*--------------------------------------------------------------*/

// [방법 3.] - optimized solution (최적화된 솔루션)
const swap_2 = (index1, index2, arr) => {
  // 배열에서 두 변수를 swap(교환)하는 방법에는 여러가지가 있다.
  // swap() 함수를 만들어서 모듈화 해준다.

  // 1) 임시 변수를 활용한 방법
  // let temp = arr[index1];
  // arr[index1] = arr[index2];
  // arr[index2] = temp;

  // 2) 구조분해할당(Destructuring assignment)을 활용한 방법
  // 배열이 reference type이라 가능하다.
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

const bubbleSort_3 = (arr) => {
  for( let i=0; i<arr.length; i++ ) {
    // 변수 교환 횟수를 기록한다.  
    let swaps = 0;
    // 이미 정렬된 요소는 고려할 필요가 없으므로 'j<arr.length-1-i'까지만 비교한다.
    for( let j=0; j<arr.length-1-i; j++ ) {
      if( arr[j] > arr[j+1] ) {
        swaps++;
        swap_2(j, j + 1, arr);
      }
    }
    // 어떤 요소도 swap되지 않은 경우, 배열은 정렬된 상태이다.
    if( swaps === 0 ) break;
  }

  return arr;
};
