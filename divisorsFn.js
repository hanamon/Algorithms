// 요구 사항 : 입력으로 받은 수의 약수를 배열로 리턴하는 함수를 만든다.
// 입력 : 숫자를 입력 받는다.
// 출력 : 배열을 리턴한다.

const divisorsFn = (number) => {
  const result = [];

  for ( let i=1; i<=number; i++ ) {
    if( number % i === 0 ) result.push(i);
  }

  return result;
}

// 입출력 예시
divisorsFn(4); // [1, 2, 4]
divisorsFn(7); // [1, 7]
