/*
  * [DFS] 바코드
  * 요구 사항 : 1, 2, 3으로만 이루어진 수열 바코드를 만든다.
  * - 바코드에서 인접한 두 개의 부분 수열이 동일하다면 제작할 수 없다고 할 때, 주어진 길이 len의 바코드 중 가장 작은 수를 반환하라.
  * 인자 : Number 타입의 1 이상 50 이하의 자연수
  * 출력 : String 타입을 리턴
  * - 예시로, 121도, 123도 전부 바코드로 제작할 수 있지만 제일 작은 수는 121이기 때문에 121을 반환해야 한다.
*/

/*
  * [부분수열 이란?]
  * 주어진 수열에서 연속된 모든 구간을 말한다.
  * 수열 123의 부분수열 => 1, 2, 3, 12, 23, 123
  * 
  * [인접한 두 부분수열 이란?]
  * 첫번째 부분수열과 두번째 부분수열이 연속된 경우를 말한다.
  * 
  * [수열 1234에서 인접한 부분수열]
  * 두 부분수열이 같은 지가 중요하므로 길이가 서로 다른 경우는 무시한다.
  * 1234 인접한 부분수열은 1과 2, 2와 3, 3과 4, 12와 34 이다.
*/

// 입출력 예시
let output = barcode(3);
console.log(output); // "121"

output = barcode(7);
console.log(output); // "1213121"

output = barcode(20);
console.log(output); // "12131231321231213123"

/*--------------------------------------------------------------*/

// [방법 1.]
function isValid(str) {
  const reversed = str.split('').reverse().join('');

  const halfLen = Math.floor(str.length / 2);

  for( let i=1; i<=halfLen; i++ ) {
    if( reversed.slice(0, i) === reversed.slice(i, i + i) ) {
      return false;
    }
  }

  return true;
}

function barcode(len, str = '') {
  if( str.length === len ) return str; 

  for( let i=1; i<=3; i++ ) {
    if( isValid(str + i) ) {
      const result = barcode(len, str + i);
      if( result ) return result;
    }
  }

  return null;
}
