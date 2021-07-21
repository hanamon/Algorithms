// 숫자를 입력 값는다.
// 입력으로 받은 수의 약수를 배열로 리턴하는 함수를 만든다.

function divisorsFn(number) {
  const result = [];

  for ( let i=1; i<=number; i++ ) {
    if( number % i === 0 ) result.push(i);
  }

  return result;
}

divisorsFn(4);
