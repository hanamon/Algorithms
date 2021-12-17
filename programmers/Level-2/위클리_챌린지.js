/*
  * [Level 2 : 위클리 챌린지]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/87946?language=javascript
*/

/*--------------------------------------------------------------*/

// 최대 입력값 8개 => 순열을 구한 후 어떤 순열이 최대값을 출력하는지 찾는다.

// [방법 1.]
function solution(k, dungeons) {
  const len = dungeons.length;
  const arr = new Array(len).fill(null).map((_, idx) => idx);
  const comArr = combination(arr, len); // 순열 구하기
  
  const caseArr = comArr.map((order) => { // 어떤 순열이 최대치를 뽑는지 구하기
    let fatigue = k;
    let count = 0;
    
    for( let i=0; i<order.length; i++ ) {
      if( fatigue < dungeons[order[i]][0] ) continue;
      count++;
      fatigue -= dungeons[order[i]][1];
    }
    
    return count;
  });

  return Math.max(...caseArr);
}

// 순열을 구하는 함수
function combination(arr, num) {
  if( num === 1 ) return arr.map((el) => [el]);

  const result = [];

  arr.forEach((el, idx, arr) => {
    const fixed = el;
    const rest = [...arr.slice(0, idx), ...arr.slice(idx+1)];
    const newArr = combination(rest, num-1);
    const comArr = newArr.map((arr) => [fixed, ...arr]);
    result.push(...comArr);
  });

  return result;
}
