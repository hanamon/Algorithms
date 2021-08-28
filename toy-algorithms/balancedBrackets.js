/*
  * [balancedBrackets] 괄호 기호 벨런스 검사
  * 요구 사항 : 모든 종류의 괄호((, ), {, }, [, ])가 포함된 문자열을 입력받아 문자열 내의 모든 괄호의 짝이 맞는지 여부를 리턴하라.
  * 인자 : string 타입의 괄호가 포함된 문자열
  * 출력 : boolean 타입을 리턴
  * 주의 사항 :
  * - 괄호는 먼저 열리고((), 열린만큼만 닫혀야()) 한다.
  * 빈 문자열을 입력받은 경우, true를 리턴한다.
*/

// [입출력 예시]
let output = balancedBrackets('[](){}');
console.log(output); // --> true

output = balancedBrackets('[({})]');
console.log(output); // --> true

let output3 = balancedBrackets('[(]{)}');
console.log(output); // --> false

/*--------------------------------------------------------------*/

// [방법 1.]
// 기호하나씩을 스택에 쌓는다.
// 닫기 기호가 나올 때 현재 닫기 기호와 이전 기호가 짝이 맞는지 스택을 검사한다.
// 짝이 맞으면 그 짝을 스택에서 삭제하고 짝이 맞지 않으면 바로 false를 리턴한다.
const balancedBrackets = function (str) {
  const stack = [];
  let count = 0;

  // 닫기 기호가 나왔을 때 유효성 검사
  function isValid( stack ) {
    const [left, right] = [stack[stack.length-2], stack[stack.length-1]];

    if( left === '(' && right === ')' || left === '[' && right === ']' || left === '{' && right === '}' ) {
      stack.pop();
      stack.pop();
      return true;
    }

    return false;
  }

  // 입력 문자열을 순회하며 검사한다.
  for( let i=0; i<str.length; i++ ) {
    // 스택에 현재 문자열을 추가한다.
    stack.push(str[i]);

    // 열기 기호와 닫기 기호가 들어온 경우에 따라 카운트하고 검사한다.
    if( str[i] === '(' || str[i] === '[' || str[i] === '{' ) count++;
    else {
      count--;
      // 배열의 길이가 2 이상일 경우 실행한다.
      if( stack.length > 1 ) {
        // 닫기 기호가 나왔을 때 유효성 검사한다.
        if( !isValid( stack ) ) return false;
      }
    }

    // 열기 기호 보다 닫기 기호가 먼저 나온 경우
    if( count < 0 ) return false;
  }

  // count가 0이면 ture 이고 0이 아닌 경우 false
  return !count ? true : false;
};
