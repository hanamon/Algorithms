/*
  * [기수 정렬 알고리즘]
  * 요구 사항 : 수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬하여 리턴한다.
  * 입력 : 수를 요소로 갖는 배열, arr[i]의 길이는 100,000 이하
  * 출력 : 수를 요소로 갖는 배열, 오름차순으로 정렬된 배열
  * 주의 사항 :
  * 1. 기수 정렬을 구현한다.
  * 2. arr.sort 사용은 금지된다.
  * 입력 : radixSort( [1, 0, 43, 100, -10, 0, 100, 21, 0] ); 
  * 출력 : [-10, 0, 0, 0, 1, 21, 43, 100, 100]
  * 힌트 : 
  * 1. 기수 정렬(radix sort)은 내부적으로 계수 정렬(counting sort)을 사용한다.
  * 2. 계수 정렬을 먼저 학습하고, 어떤 경우에 기수 정렬을 사용하는지 학습하도록 한다.
  * Advanced : arr[i]의 범위가 정수 전체로 확대될 경우, 기수 정렬 알고리즘을 완성해 보자.
*/

/*--------------------------------------------------------------*/

/*
  * 계수 정렬 이란? 
  * 계수정렬(Counting Sort)은 숫자들간 비교를 하지 않고 정렬을 하는 것을 말한다.
  * O(n)의 시간 복잡도를 가진 알고리즘이다.
  * 재귀 함수를 사용하지 않는다.
  * [계수 정렬 알고리즘]
  * 1. 입력 배열의 최대값을 구한다. -> maxNum
  * 2. maxNum 만큼의 길이를 가진 카운트 배열을 만든다. -> countArr (모두 0으로 초기화)
  * 3. 입력 배열을 앞부터 순회하면서 각 값이 발생하는 횟수를 카운트 한다. (카운트 변수의 각 자리 추가된다.)
  * 4. 카운트 배열의 값을 등장 횟수를 누적한 값으로 바꿔준다.
  * 5. 출력 배열을 하나 선언한다.
  * 5. 입력 배열의 역순으로 순회하면서 해당 요소의 값의 index에 해당하는 카운트 배열의 값에 해당하는 출력 배열의 index에 입력 배열의 요소를 넣는다. 
*/

/*
  * [수의 자리수를 뽑아내는 방법]
  * Math.floor(num / radix) % 10;
*/

/*--------------------------------------------------------------*/

// [방법 1.] - naive solution (나이브한 솔루션) 양의 정수만 정렬 가능
// 계수 정렬 함수
function radixSort(arr) {
  // 배열의 최대수를 뽑아낸다.
  const max = getMax(arr);
  // 현재 자리수
  let radix = 1;

  // 입력 배열의 최대값의 자리수 만큼 반복된다. (예: 최대값이 1의 자리면 한 번만 반복한다.)
  while( parseInt( max / radix ) > 0 ) {
    // 입력 배열이 대체된다. 
    // countingSort() 함수는 배열과 자리수를 입력받는다.
    arr = countingSort(arr, radix);
    // 한번 실행 후 자리수 증가
    radix *= 10;
  }

  // 변경된 배열을 반환한다.
  return arr;
}

// 배열의 최대값 추출 함수
function getMax(arr) {
  return arr.reduce((max, item) => {
    if( item > max ) return item;
    return max;
  }, 0);
}

// 자리수 정렬 함수
function countingSort(arr, radix) {
  // 입력 배열의 길이 만큼 출력 배열을 만든다.
  const outputArr = Array(arr.length).fill(0);
  // 입력 배열을 결국 한 자리씩 계산하기 때문에 10개의 자리가 있는 카운트 배열을 만든다.
  const countArr = Array(10).fill(0);
  
  // 입력 배열을 순회하며, 요소 값에 해당하는 카운트 배열에 index에 카운트한다.
  arr.forEach((item) => {
    // 입력받은 자리수에 해당하는 item의 수의 뽑아낸다.
    const idx = Math.floor(item / radix) % 10;
    // 각 값이 발생하는 횟수를 카운트 한다.
    countArr[idx]++;
  });
  
  // countArr[i]가 i까지의 누적 개수가 되도록 만든다. (0번 인덱스는 건너뛴다. 즉, 1번째 인덱스부터 합한다.)
  countArr.reduce((totalNum, num, idx) => {
    countArr[idx] = totalNum + num;
    return totalNum + num;
  });

  // 아래 속성이 유지되도록 하기 위해 입력 배열을 거꾸로 순회한다. (왜? 이해안됨)
  // 1. 가장 큰 값을 먼저 본다.
  // 2. 가장 큰 값을 가장 마지막에 놓는다.

  let i = arr.length - 1;

  // 입력 배열을 거꾸로 순회한다.
  while( i >= 0 ) {
    // 입력 배열의 요소 값중 현재 자리수로 카운트 되었다.
    const idx = Math.floor(arr[i] / radix) % 10;

    // countArr[idx]: 현재 radix의 idx까지 누적 개수
    // 자리수가 만약 5이면 0~5 즉 6번째 index를 가리키게 되므로 countArr[index] -1
    // countArr[idx]개 만큼 있으므로, index는 countArr[idx] - 1 이다. (countArr[idx]개 만큼 있다는 말이 이해가 안됨)
    outputArr[countArr[idx] - 1] = arr[i];

    // 다음에 확인할 수의 자리가 중복되지 않게 누적합을 고쳐준다.
    countArr[idx] -= 1;

    // 입력 배열의 다음 인덱스를 확인하러 가자.
    i--;
  }
  
  return outputArr;
}

radixSort( [10, 1, 2, 3, 15, 7] );

/*--------------------------------------------------------------*/

// [방법 1.] - 위와 동일한 코드이다. (주석없고 콘솔 확인하기 위해)
// 계수 정렬 함수
function radixSort(arr) {
  const max = getMax(arr);
  let radix = 1;

  while( parseInt( max / radix ) > 0 ) {
    arr = countingSort(arr, radix);
    radix *= 10;
  }

  return arr;
}

// 최대값 추출 함수
function getMax(arr) {
  return arr.reduce((max, item) => {
    if( item > max ) return item;
    return max;
  }, 0);
}

// 자리수 정렬 함수
function countingSort(arr, radix) {
  const outputArr = Array(arr.length).fill(0);
  const countArr = Array(10).fill(0);
  console.log('-----------------------------------------------');
  console.log('입력 배열 : ', arr);

  arr.forEach((item) => {
    const idx = Math.floor(item / radix) % 10;
    countArr[idx]++;
  });

  const test = countArr
  console.log('카운트 배열 : ', test);

  countArr.reduce((totalNum, num, idx) => {
    console.log('totalNum : ', totalNum, ' num : ', num, ' idx : ', idx);
    countArr[idx] = totalNum + num;
    return totalNum + num;
  });
  
  console.log('누적합 배열: ', countArr);

  let i = arr.length - 1;

  while( i >= 0 ) {
    console.log('----------------');
    console.log('arr[i]', arr[i]);
    const idx = Math.floor(arr[i] / radix) % 10;
    console.log(idx);
    console.log('countArr[idx] - 1 : ', countArr[idx] - 1 );

    outputArr[countArr[idx] - 1] = arr[i];
    const test = outputArr;
    console.log('출력 배열 : ', test);

    countArr[idx] -= 1;
    i--;
  }
  
  return outputArr;
}

radixSort( [10, 1, 2, 3, 15, 7] );

/*--------------------------------------------------------------*/

/*
  * [막히는 부분 + 문제 해결 정리]
  *
  * 1. 왜 계수 정렬에서 카운트 배열을 거꾸로 순회하면서 출력 배열에 할당하는지 이해를 못하겠어요.
  *    <이해> : 1의 자리는 이미 정렬하였고 10의 자리수를 정렬한다고 가정해본다면,
  *             카운트 배열의 0의 자리에는 1의 자리의 수만큼 누적되어있을 것이다.
  *             즉, [10, 1, 2, 3, 15, 7] 로 정렬 되어있고 카운트 배열의 누적합은 [4, 6, 6, 6, 6, 6, 6, 6, 6, 6] 이된다.
  *             이때 거꾸로 순회를 해줘야 출력 배열 4번째 인덱스에 해당하는 arr 값, 7이 들어가게 된다.
  *             그러고 나서 카운트 배열의 누적합에서 - 1 이 되면 다시 [3, 6, 6, 6, 6, 6, 6, 6, 6, 6] 이 되고, 출력배열 3번째 인덱스에 3이 들어간다.
  * 
  * 2. Math.floor(num / radix) % 10; 를 이용해서 수의 특정 자리수에 해당하는 수를 뽑아내서 정렬하는데 어떻게 그것이 하나로 합쳐지는지 이해를 못하겠어요.
  *    예: [1, 2, 35, 4, 12] 를 처음에 1의 자리수에 해당하는 [1, 2, 5, 4, 2] 만 가지고 정렬하고
  *    다음으로 10의 자리 [x, x, 3, x, 1] 을 정렬해서 하나로 [1, 2, 4, 12, 35] 가 어떻게 되는지 감을 잡지 못하겠어요.
  *    <이해> : [3, 1, 2, 10, 15, 7] 배열을 arr 파라미터로 입력 받는 경우 처음에 1의 자리수만 가지고 정렬하게 되면 [10, 1, 2, 3, 15, 7] 이 된다.
  *           이것을 입력 받은 arr 파라미터에 재할당한다.
  *           그 다음으로 10의 자리수만 가지고 정렬할 때, 1의 자리인 수의 경우 10의 자리가 0이 된다. 즉, 1은 01인 것이다.
  *           그래서 카운트 배열이 0부터 9까지의 자리를 카운트 할 때, index 0 에 카운트 되는 것이다. 즉, 카운트 배열 0 번째 요소는 4가 된다.
  *           그 상태에서 카운트 배열을 누적합하면 카운트 배열 누적합의 의해 5번째 index 자리부터 정렬되도록 할 수 있게 되는 것이다.
  *           그런데 주의할 점은 입력 받은 배열에서 10의 자리가 있으면서 심지어 10대의 수가 두개 이므로 (10과 15)
  *           카운트 배열은 [4, 2, 0, 0, 0, 0, 0, 0, 0, 0]이 되고 누적합은 [4, 6, 6, 6, 6, 6, 6, 6, 6, 6] 이 된다.
  * 
  * 3. countingSort() 함수 안, while 문 안에서 countArr[index] - 1 하는 이유를 이해하지 못하겠어요.
  *    15라는 수의 1의 자리수가 5이면 0~5 즉 6번째 index를 가리키게 되므로 coundArr[index-1] 이 아닌가 생각되지만 countArr[index] - 1 가 맞아요.
  *    <이해> : 0의 자리수가 하나 있으면 카운트 배열의 0번째 인덱스가 1이 된다.
  *             그러므로 1개 있는 0의 자리수를 출력함수 0번째 인덱스에 할당하기 위해서는 누적합(자리수)에 - 1 을 해줘야만한다.
*/

/*--------------------------------------------------------------*/

/*
  * [음의 정수를 포함한 기수 정렬]
  * 1. 주어진 배열을 음수 부분과 양수 부분으로 나눈다.
  * 2. 음수는 절대값을 기준으로, 즉 양수로 변환하여 기수 정렬한다.
  * 3. 양수를 정렬한다.
  * 4. 정렬된 음수 부분을 다시 음수로 바꾸고 순서를 뒤짚는다.
  * 5. 음수 부분과 양수 부분을 붙인다.
*/

// [방법 2.] - 음에 정수를 포함한 기수 정렬
// 기수 정렬 함수
function radixSort(arr) {
  // 음수인 경우와 양수인 경우를 나누는 배열을 각각 만든다.
  let left = [];
  let right = [];

  // 입력 배열의 각 요소를 검사해 음수와 양수로 나눈다.
  arr.forEach((item) => {
    if( item >= 0 ) right.push(item);
    else left.push(item * -1); // 음수를 양수로 만들어 준다.
  });

  // 음수 배열 부터 정렬한다.
  let max = getMax(left); // 최대값을 추출한다.
  let radix = 1; // 자리수의 초기값을 할당한다.

  // 최대값의 자리수만큼 반복한다.
  while( parseInt( max / radix ) > 0 ) {
    // 자리수마다 정렬된 배열을 새롭게 할당한다.
    left = countingSort(left, radix);
    // 자리수가 증가된다.
    radix *= 10;
  }

  // 양수 배열을 정렬한다.
  max = getMax(right);
  radix = 1;

  while( parseInt( max / radix ) > 0 ) {
    right = countingSort(right, radix);
    radix *= 10;
  }

  // 음수 배열을 리버스해서 다시 음수로 만들어 주고 양의 배열을 합친다.
  return left.map((el) => el * -1).reverse().concat(right);
}

// 최대값 추출 함수
function getMax(arr) {
  return arr.reduce((max, item) => {
    if( max < item ) return item;
    return max;
  }, 0);
}

// 자리수 정렬 함수
function countingSort(arr, radix) {
  // 새로운 배열을 입력 배열 길이로 만든다.
  const outputArr = new Array(arr.length).fill(0);
  // 계수 정렬할 카운트 배열을 0 ~ 9의 길이로 만든다.
  const countArr = new Array(10).fill(0);

  // 입력 배열을 순회하며 현재 자리수에 해당하는 수의 개수를 카운트 배열에 카운트한다.
  arr.forEach((item) => {
    const idx = Math.floor( item / radix ) % 10;
    countArr[idx]++;
  });

  // 카운트 배열을 순회하며 각 자리 값을 누적합으로 변환한다. (리듀스는 idx 1 부터 시작된다.)
  countArr.reduce((a, c, idx) => {
    countArr[idx] = a + c;
    return a + c;
  });

  // 입력 배열을 역으로 순회하며, 입력 배열의 현재 자리수가 해당하는 카운트 배열의 값을 보고 출력 배열 index 에 해당 입력 배열의 값을 할당한다.
  // 해당 누적합된 카운트 배열 요소에 -1 해주는 것도 잊지 않는다. (그래야 다음에 오는 작은 수와 겹치치 않는다.)
  let el = arr.length-1;

  while( el >= 0 ) {
    const idx = Math.floor( arr[el] / radix ) % 10;
    outputArr[countArr[idx] - 1] = arr[el];

    countArr[idx] -= 1;
    el--;
  }

  // 새로운 배열을 리턴한다.
  return outputArr;
}

radixSort( [10, 1, 2, -100, -45, -2, 3, 15, 7, -6] );
