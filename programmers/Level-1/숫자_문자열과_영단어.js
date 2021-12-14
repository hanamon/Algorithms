/*
  * [Level 1 : 숫자 문자열과 영단어]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/81301?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(s) {
  const table = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  const result = table.reduce((a, c, idx) => {
    const reg = new RegExp(`${table[idx]}`, 'g');
    return c = a.replace(reg, idx);
  }, s);

  return Number(result);
}

/*--------------------------------------------------------------*/

// [방법 2.]
function solution(s) {
  const table = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  const result = table.reduce((a, c, idx) => {
    const arr = a.split(table[idx]);
    return a = arr.join(idx);
  }, s);

  return Number(result);
}
