/*
  * [순열] 새로운 치킨 소스 레시피
  * 요구 사항 : 아래 요구사항을 참고하여 레시피가 될 수 있는 경우의 수를 모두 반환하는 함수를 작성하라.
  *             1. N 가지 재료 중에 단 M 가지만을 사용하여 조합한 모든 경우의 수 중 하나이다.
  *             2. 재료는 0과 1로만 이루어진 숫자로 암호화 되어있고, 항상 1로 시작하며 복호화 할 수 없다.
  *                단, 0이 3개 이상인 재뇨는 상한 재료이기 때문에 제외한다.
  *             3. 재료의 순서에 따라 맛이 달라지기 때문에, 재료를 넣는 순서가 다르면 다른 레시피이다.
  * 입력 :
  * - stuffArr : Number 타입의 재료를 담은 배열
  *              요소는 0과 1로만 이루어진 숫자이며, 항상 1로 시작
  *              요소는 중복될 수 없음, 요소의 길이는 20 이하, 배열의 길이는 2 이상 10 이하
  *              예: [111, 110, 1010, 10, 10110]
  * - choiceNum : Number 타입의 1 이상 stuffArr 길이 이하의 자연수, 재료를 선택할 수 있는 수를 뜻한다.
  * 출력 : 배열을 반환
  * 주의 사항 : 만약 주어진 재료를 모두 사용할 수 없다면 빈 배열을 반환
  *             사용할 수 있는 재료가 choiceNum보다 작다면 빈 배열을 반환
  *             조합 및 요소는 작은 숫자 -> 큰 숫자로 정렬
*/

// [입출력 예시]
const output1 = newChickenRecipe([1, 10, 1100, 1111], 2);
console.log(output1);
/*
  [
    [1, 10], [1, 1100], [1, 1111],
    [10, 1], [10, 1100], [10, 1111],
    [1100, 1], [1100, 10], [1100, 1111],
    [1111, 1], [1111, 10], [1111, 1100]
  ];
*/

/*--------------------------------------------------------------*/

// [문제 요약]
// N 중에 M 가지를 사용하여 조합한 모든 경우의 수 중 하나이다.
// 재료는 0과 1로만 이루어진 숫자로 암호화가 되어 있고, 항상 1로 시작하며 복호화를 할 수 없다.
// 단, 0이 3개 이상인 재료는 상한 재료이기 때문에 제외 (필터)
// 재료를 넣는 순서가 다르다면 다른 레시피 (순열이다.)
// 재료가 없다면 빈배열 반환
// 사용할 수 있는 재료가 choiceNum보다 작다면 빈 배열 반환
// 조합 및 요소는 작은 숫자 -> 큰 숫자로 정렬 (가중치 적용 정렬)

/*--------------------------------------------------------------*/

// [방법 1.]
function newChickenRecipe(stuffArr, choiceNum) {
  // 1. 상한 재료 필터
  const newArr = stuffArr.filter((num) => {
    // JS filter 의 특수성... : [0]의 element는 빈 것으로 취급한다.
    // 숫자를 문자로 변경한다.
    const str = String(num);
    // 카운트 변수를 선언한다.
    let count = 0;
    // str을 순회하며 0의 개수를 카운트한다.
    for( let i=0; i<str.length; i++ ) {
      if( str[i] === '0' ) count++;
      // 만약 3이면 break;
      if( count === 3 ) break;
    }
    if( count < 3 ) return true;
    return false;
  });

  // 재료 없거나 배열의 길이보다 초이스넘이 크면 return [];
  if( ! newArr.length || newArr.length < choiceNum ) return [];

  // 2. 오름차순 정렬
  newArr.sort((a, b) => a - b);

  // 3. 순열을 찾아서 리턴한다.
  return aux(newArr, choiceNum);
}

function aux(arr, choiceNum) {
  if( choiceNum === 1 ) return arr.map((el) => [el]);
  
  const result = [];

  arr.forEach((el, idx, arr) => {
    const fixed = el;
    const rest = [...arr.slice(0, idx), ...arr.slice(idx+1)];
    const newArr = aux(rest, choiceNum-1);
    const comArr = newArr.map((arr) => [fixed, ...arr]);
    result.push(...comArr);
  });

  return result;
}
