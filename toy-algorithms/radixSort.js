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
function radixSort(arr) {
  // 배열의 초대수를 뽑아낸다.
  const max = getMax(arr);
  // 현재 자리수
  let radix = 1;

  // 입력 배열의 최대값의 자리수 만큼 반복된다.
  while( parseInt( max / radix ) > 0 ) {
    // 입력 배열과 현재 자리수가 
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

// 계수 정렬 함수
function countingSort(arr, radix) {
  const outputArr = Array(arr.length).fill(0);
  const countArr = Array(10).fill(0);
  
  // 입력 배열을 순회하며, 요소 값에 해당하는 카운트 배열에 index에 카운트한다.
  arr.forEach((item) => {
    // 수의 자리수를 뽑아내는 방법
    const idx = Math.floor(item / radix) % 10;
    // 입력 배열을 앞부터 순회하면서 각 값이 발생하는 횟수를 카운트 한다.
    countArr[idx]++;
  });
  
  // 카운트된 배열을 눈으로 확인
  console.log(countArr);
  
  // countArr[i]가 i까지의 누적 개수가 되도록 만든다.
  countArr.reduce((totalNum, num, idx) => {
    countArr[idx] = totalNum + num;
    return totalNum + num;
  });
  
  // 카운트 배열의 누적합 눈으로 확인
  console.log(countArr);

  // 아래 속성이 유지되도록 하기 위해 입력 배열을 거꾸로 순회한다.
  // 1. 가장 큰 값을 먼저 본다.
  // 2. 가장 큰 값을 가장 마지막에 놓는다.

  let i = arr.length - 1;

  // 입력 배열을 거꾸로 순회한다.
  while( i >= 0 ) {
    // 입력 배열의 요소 값중 현재 자리수로 카운트 되었다.
    const idx = Math.floor(arr[i] / radix) % 10;

    // countArr[idx]: 현재 radix의 idx까지 누적 개수
    // countArr[idx]개 만큼 있으므로, 인덱스는 countArr[idx] - 1 이다.
    outputArr[countArr[idx] - 1] = arr[i];

    // 다음에 확인할 수의 자리가 중복되지 않게 누적합을 고쳐준다.
    countArr[idx] -= 1;

    // 입력 배열의 다음 인덱스를 확인하러 가자.
    i--;
  }
  
  return outputArr;
}

radixSort( [3, 1, 2] );

/*--------------------------------------------------------------*/
