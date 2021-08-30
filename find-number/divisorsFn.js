/*
  * [약수 구하기]
  * 요구 사항 : 입력으로 받은 수의 약수를 배열로 리턴하는 함수를 만든다.
  * 입력 : 숫자를 입력 받는다.
  * 출력 : 배열을 리턴한다.
  * 입출력 예시 : divisorsFn(4); // [1, 2, 4]
  * 입출력 예시 : divisorsFn(7); // [1, 7]
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function divisorsFn(number) {
  const result = [];

  for ( let i=1; i<=number; i++ ) {
    if( number % i === 0 ) result.push(i);
  }

  return result;
}

/*--------------------------------------------------------------*/

// [방법 2.]
function divisorsFn(number) {
  const result = [];

  // 약수는 대칭적이므로 제곱근까지만 반복해도 된다.
  // 예) 36의 약수는 1, 2, 3, 4, 6, 9, 12, 18, 36이다.
  // 제곱근을 기준으로 양쪽의 값 하나씩 곱했을 때 36이 되기 때문에
  // 제곱근 보다 큰 약수는 제곱근보다 작은 약수에서 구할 수 있다.
  const sqrt = Math.floor(Math.sqrt(number));

  for( let left=1; left<=sqrt; left++ ) {
    if( number % left === 0 ) {
      // 약수인 경우 중 제곱근 보다 작은 약수의 경우
      result.push(left);
      // 제곱근이 아닌 경우(제곱근 보다 작은)
      if( left * left < number ) {
        // 수를 제곱근이 아닌 수로 나누면 제곱근 보다 큰 약수를 구할 수 있다.
        right = number / left;
        result.push(right);
      }
    }
  }

  result.sort((a, b) => a - b);

  return result;
}
