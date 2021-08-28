// N 중에 M 가지를 사용하여 조합한 모든 경우의 수 중 하나이다.
// 재료는 0과 1로만 이루어진 숫자로 암호화가 되어 있고, 항상 1로 시작하며 복호화를 할 수 없다.
// 단, 0이 3개 이상인 재료는 상한 재료이기 때문에 제외 (필터)
// 재료를 넣는 순서가 다르다면 다른 레시피 (순열이다.)
// 재료가 없다면 빈배열 반환
// 사용할 수 있는 재료가 choiceNum보다 작다면 빈 배열 반환
// 조합 및 요소는 작은 숫자 -> 큰 숫자로 정렬 (가중치 적용 정렬)

function newChickenRecipe(stuffArr, choiceNum) {
  // 1. 상한 재료 필터
  const newArr = stuffArr.filter((num) => {
    // JS filter 의 특수성... : [0]의 element는 빈 것으로 취급한다.
    // 숫자를 문자로 변경후 배열로 만든다.
    const arr = String(num).split('');
    // 카운트 변수를 선언한다.
    let count = 0;
    // arr 배열을 순회하며 0의 개수를 카운트한다.
    arr.forEach((el) => {
      if( el === '0' ) count++;
    });
    // 만약 3이하면 return
    if( count < 3 ) return num;
  });

  // 재료 없거나 배열의 길이보다 초이스넘이 크면 return [];
  if( ! newArr.length || newArr.length < choiceNum ) return [];

  // 2. 오름차순 정렬
  newArr.sort((a, b) => a - b);

  // 3. 순열을 찾아서 리턴한다.
  return aux(newArr, choiceNum);
}

function aux(stuffArr, choiceNum) {
  if( choiceNum === 1 ) return stuffArr.map((el) => [el]);
  
  const result = [];

  stuffArr.forEach((el, idx, arr) => {
    const fiexd = el;
    const rest = [...arr.slice(0, idx), ...arr.slice(idx+1)];
    const newArr = aux(rest, choiceNum-1);
    const comArr = newArr.map((el) => [fiexd, ...el]);
    result.push(...comArr);
  });

  return result;
}
