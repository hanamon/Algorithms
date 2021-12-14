/*
  * [Level 1 : 같은 숫자는 싫어]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/12906?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(arr) {
  const newArr = [];

  for( let i=0; i<arr.length; i++ ) {
    if(arr[i-1] !== arr[i] ) newArr.push(arr[i]);
  }

  return newArr;
}

/*--------------------------------------------------------------*/

// [방법 2.]
function solution(arr) {
  return arr.filter((num, idx) => num !== arr[idx+1]);
}
