/*
  * [조합] 블랙잭은 지겨워
  * 요구 사항 : 아래의 게임의 룰을 따르는 함수를 작성하라. (여러 장의 카드 중 세 장씩 조합해 소수가 되는 경우의 수를 리턴하는 함수)
  *             1. 숫자로 이루어진 카드를 여러 장 받습니다.
  *             2. 3장씩 카드를 고르고, 3장에 적힌 숫자들의 합이 소수인지 확인합니다.
  *             3. 받아든 카드로 만들 수 있는 소수의 개수가 많은 사람이 이기게 됩니다.
  * 입력 : cards: Array 3개 이상 50개 이하의 카드가 숫자로 들어 있는 배열
  * 출력 : Number 타입을 리턴해
  * 주의 사항 :
  * - cards 에는 중복된 숫자의 카드는 들어있지 않다.
  * - 각 카드에 적힌 수는 1이상 1,000이하의 자연수
*/

// [입출력 예시]
let output = boringBlackjack([1, 2, 3, 4]);
console.log(output); // 1

let output = boringBlackjack([2, 3, 4, 8, 13]);
console.log(output); // 3

/*--------------------------------------------------------------*/

// [문제 요약]
// 3장씩 카드를 고르고, 3장에 적힌 숫자들의 합이 소수인지 확인한다.
// 받아든 카드로 만들 수 있는 소수의 개수가 많은 사람이 이기게 된다.
// 소수가 되는 경우의 수를 리턴

// [문제 분석]
// cards에 있는 수를 3개 뽑는 경우를 찾는다. => 조합
// 해당 조합의 인자들의 합을 각각 구한다.
// 각각의 합을 담은 배열 중에 소수를 카운트한다.
// 카운트를 리턴한다.

/*--------------------------------------------------------------*/

// [방법 1.]
const boringBlackjack = (cards) => {
  // 조합을 배열에 담는다.
  const comArr = makeCombination(cards);

  // 조합 배열을 순회하며 조합의 합을 각각 구한다.
  const sumArr = comArr.map((arr) => arr.reduce((a, c) => a+c));

  // 조합 배열의 합을 담은 배열 중에 소수를 카운트한다.
  return primeCount(sumArr);
}

// 조합을 구하는 함수
function makeCombination(arr, num = 3) {
  if( num === 1 ) return arr.map((el) => [el]);

  const result = [];

  arr.forEach((el, idx, arr) => {
    const fixed = el;
    const rest = arr.slice(idx+1);
    const newArr = makeCombination(rest, num-1);
    const comArr = newArr.map(el => [fixed, ...el]);
    result.push(...comArr);
  });

  return result;
}

const primeCount = (arr) => {
  let count = 0;

  arr.forEach((el) => {
    if( el === 2 ) return;
    for( let i=2; i<=el/2; i++ ) {
      if( el%i === 0 ) return;
    }
    count++;
  });

  return count;
}
