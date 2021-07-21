// 요구 사항 : 인자로 들어온 수의 피보나치 수열 값을 출력하라.
// 입력 : 숫자
// 출력 : 숫자

// [방법 1]
// Recursion + Memoization (재귀 + 메모이제이션) - Top-Down 방식
const fibonacciFn = (number, memo = []) => {
  // 이미 해결한 하위 문제인지 찾아본다. (두 번 계산 안함)
  if( memo[number] !== undefined ) return memo[number];
  // 재귀 탈출 조건
  if( number <= 2 ) return 1;

  // 메모에 없다면 재귀로 결괏값을 도출하여 res 에 할당
  const result = fibonacciFn(number-1, memo) + fibonacciFn(number-2, memo);
  // 추후 동일한 문제를 만났을 때 사용하기 위해 리턴 전에 memo 에 저장한다.
  memo[number] = result;

  return result;
}

fibonacciFn(5); // 5
fibonacciFn(10); // 55
