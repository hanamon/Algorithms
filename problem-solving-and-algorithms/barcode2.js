/**
 * [순열] 바코드 구하기
 * 1, 2, 3으로만 이루어진 수열 바코드를 기존과는 다른 새로운 수열 바코드를 만들어야한다.
 * 1부터 N까지의 자연수 중에서 중복 없이 M개를 고른 수열이어야하고,
 * 길이가 M이어야 한다고 할 때, 만들 수 있는 바코드를 전부 배열에 담아 반환
 * 수열은 사전 순으로 증가하는 순서로 출력한다.
 * 바코드는 숫자로 반환
 * N까지의 자연수가 중에 M개의 순열을 배열을 반환
 * 모든 바코드는 같은 숫자가 있으면 안 된다.
 */

// [입출력 예시]

// N이 2이고 M이 1일 때, 1, 2를 사용하여 1의 길이에 맞는 바코드를 만들어야 합니다.
const output1 = barcode2(2, 1);
console.log(output1); // --> [1, 2]

// N이 3이고 M이 2일 때, 1, 2, 3을 사용하여 2의 길이에 맞는 바코드를 만들어야 합니다.
const output2 = barcode2(3, 2);
console.log(output2); // --> [12, 13, 21, 23, 31, 32]

// N이 3고 M이 3일 때 1, 2, 3을 사용하여 3의 길이에 맞는 바코드를 만들어야 합니다.
const output3 = barcode2(3, 3);
console.log(output3); // --> [123, 132, 213, 231, 312, 321]

/*--------------------------------------------------------------*/

// [방법 1.]
function barcode2 (n, m) {
  // 순열을 구하는 함수
  const makeCombination = (arr, num) => {
    if( num === 1 ) return arr.map((el) => [el]);

    const result = [];

    arr.forEach((el, idx, arr) => {
      const fixed = el;
      const rest = [...arr.slice(0, idx), ...arr.slice(idx+1)];
      const newArr = makeCombination(rest, num-1);
      const comArr = newArr.map((arr) => [fixed, ...arr]);
      result.push(...comArr);
    });

    return result;
  }

  // 1부터 N까지의 자연수를 배열에 담는다.
  const arr = [];
  for( let i=1; i<=n; i++ ) arr.push(i);

  const newArr = makeCombination(arr, m);
  
  // 배열로 이뤄진 순열조합을 숫자로 변환한다.
  return newArr.map((el) => {
    const num = el.reduce((a, c) => ''+a+c);
    return Number(num);
  });
};
