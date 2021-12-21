/*
 * [Level 2 : 2021 카카오 채용연계형 인턴십 > 거리두기 확인하기]
 * 문제 : https://programmers.co.kr/learn/courses/30/lessons/81302?language=javascript
 */

/*--------------------------------------------------------------*/

// [방법 1.]

function solution(places) {
  const answer = [];

  for (let i = 0; i < 5; i++) {
    answer.push(placeValidation(places[i]));
  }

  return answer;
}

function placeValidation(arr) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (arr[i][j] !== "P") continue;

      const place = arr.map((str) => str.split(""));
      const queue = [[i, j, 0]];

      while (queue.length) {
        const [Y, X, count] = queue.shift();

        if (Y < 0 || X < 0 || Y > 4 || X > 4) continue;
        if (place[Y][X] === "X" || place[Y][X] === "C") continue;
        if (place[Y][X] === "P" && count !== 0 && count <= 2) return 0;

        place[Y][X] = "C"; // check;
        queue.push([Y - 1, X, count + 1]); // 상
        queue.push([Y + 1, X, count + 1]); // 하
        queue.push([Y, X - 1, count + 1]); // 좌
        queue.push([Y, X + 1, count + 1]); // 우
      }
    }
  }

  return 1;
}
