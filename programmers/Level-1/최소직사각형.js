/*
 * [Level 1 : 최소직사각형]
 * 문제 : https://programmers.co.kr/learn/courses/30/lessons/86491?language=javascript
 */

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(sizes) {
  let [width, height] = [0, 0];

  sizes.forEach((size) => {
    const max = Math.max(size[0], size[1]);
    const min = Math.min(size[0], size[1]);
    if (width < max) width = max;
    if (height < min) height = min;
  });

  return width * height;
}
