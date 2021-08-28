// 3장씩 카드를 고르고, 3장에 적힌 숫자들의 합이 소수인지 확인합니다.
// 받아든 카드로 만들 수 있는 소수의 개수가 많은 사람이 이기게 됩니다.
// 소수가 되는 경우의 수를 리턴

// cards에 있는 수를 3개 뽑는 경우를 찾는다 => 조합
// 해당 조합의 인자들의 합을 각각 구한다

// 배열의 인자를 담은 것들을 따로 분리
// 각각의 합을 담은 배열 중에 소수를 카운트
// 카운트 리턴

const boringBlackjack = (cards) => {
  let comArr = makeCombination(cards);

  let result = comArr.map((el) => {
    return el.reduce((acc, cur) => {
      return acc + cur;
    });
  });

  return primeCount(result);
}

function makeCombination(cards, num = 3) {
  if( num === 1 ) return cards.map((el) => [el]);

  const result = [];

  cards.forEach((el, idx, arr) => {
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
