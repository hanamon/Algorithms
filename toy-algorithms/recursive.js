/*
  * [recursive] 다차원 배열에서 문자열 존재 여부 구하기
  * 요구사항 입력 배열에서 입력 문자열이 존재하면 true를 없으면 false를 리턴하는 함수를 작성하시오.
  * 입력: arr - 다차원 배열, str - 문자열
*/

// [입출력 예시]
solution([[[['a']]]], 'a'); // true;
solution([[[['adc'], [], [['a']]]]], 'a'); // true

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(arr, str) {
  if (str === '' || !arr.length) return false;

  const head = arr[0];
  const tail = arr.slice(1);

  if (Array.isArray(head)) {
    const result = solution(head, str);
    if(result) return true;
  }

  if(head === str) return true;
  else return solution(tail, str);
}
