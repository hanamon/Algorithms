// 미완성

function solution(number, k) {
  const len = number.length - k;
  const arr = number.split('').map((num) => Number(num));
  const result = aux(arr, len);
  let answer = 0;
  result.map((com) => {
      const num = com.reduce((a, c) => a + String(c), '');
      if (answer < num) answer = num;
  });
  return answer;
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
