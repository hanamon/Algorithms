/*
  * [Level 1 : 폰켓몬]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/1845?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(nums) {
  // 입력 배열의 길이의 반인 선택가능한 포켓못의 최대값 => max
  // 입력 배열의 유니크한 요소의 개수 => monster
  const max = nums.length / 2;
  // 배열을 정렬한다.
  nums.sort((a, b) => a - b);
  // 현재 index와 index-1을 비교해서 같은 요소는 리턴 X
  const monsters = nums.filter((monster, index) => {
      if(nums[index] !== nums[index-1]) return monster;
  });
  // 만약 monster 가 max 보다 적으면 monster 를 리턴
  // 만약 monster 가 max 와 같거나 크다면 max 를 리턴
  return monsters.length < max ? monsters.length : max;
}
