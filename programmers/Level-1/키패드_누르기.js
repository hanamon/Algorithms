/*
  * [Level 1 : 키패드 누르기]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/67256?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(numbers, hand) {
  // 키패드 2차원 배열을 만든다.
  const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['*', 0, '#']
  ];

  // 현재 양엄지손가락의 위치를 변수에 초기화한다.
  let left  = [0, 3];
  let right = [2, 3];

  // 입력 배열에 들어온 요소(수)에 해당하는 위치를 변수에 저장한다.
  let current;
  // 이동한 손가락이 왼손인지 오른손인지를 기록한다.
  let answer = '';

  // 입력 배열을 순회하면서 요소에 해당하는 위치로 손가락 위치를 이동한다.
  numbers.forEach((num) => {
      // 1, 4, 7 이면 왼손이 이동한다.
      if( num === 1 || num === 4 || num === 7 ) {
          current = [0, Math.floor(num/3)]; // 들어온 수의 위치
          left = [0, Math.floor(num/3)]; // 왼손가락 위치
          answer += 'L';
      }
      else if( num === 3 || num === 6 || num === 9 ) {
          // 3, 6, 9 이면 오른손이 이동한다.
          current = [2, Math.floor(num/3)-1]; // 들어온 수의 위치
          right = [2, Math.floor(num/3)-1]; // 오른손가락 위치
          answer += 'R';
      }
      else {
          // 2, 5, 8, 0 이면 더 가까운 손가락이 이동한다.
          if( num === 0 ) {
              current = [1, 3];
          } else {
              current = [1, Math.floor(num/3)];
          }
          // 왼손에서 현재 들어온 수까지의 거리
          const leftInter  = Math.abs(left[0] - current[0]) + Math.abs(left[1] - current[1]);
          // 오른손에서 현재 들어온 수까지의 거리
          const rightInter = Math.abs(right[0] - current[0]) + Math.abs(right[1] - current[1]);
          // 만약 거리가 동일하면 hand에 손가락을 사용한다.
          if( leftInter < rightInter ) {
              if( num === 0 ) {
                  left = [1, 3];
              } else {
                  left = [1, Math.floor(num/3)];
              }
              answer += 'L';
          }
          else if( leftInter > rightInter ) {
              if( num === 0 ) {
                  right = [1, 3];
              } else {
                  right = [1, Math.floor(num/3)];
              }
              answer += 'R';
          }
          else if( leftInter === rightInter ) {
              if( hand === 'left' ) {
                  if( num === 0 ) {
                      left = [1, 3];
                  } else {
                      left = [1, Math.floor(num/3)];
                  }
                  answer += 'L';
              }
              else if( hand === 'right' ) {
                  if( num === 0 ) {
                      right = [1, 3];
                  } else {
                      right = [1, Math.floor(num/3)];
                  }
                  answer += 'R';
              }
          }
      }
  });

  return answer;
}

/*--------------------------------------------------------------*/

// [방법 2.] 코드 줄이기
function solution(numbers, hand) {
  // 현재 양엄지손가락의 위치를 변수에 초기화한다.
  let left  = [0, 3];
  let right = [2, 3];

  // 입력 배열에 들어온 요소(수)에 해당하는 위치를 변수에 저장한다.
  let current;
  // 이동한 손가락이 왼손인지 오른손인지를 기록한다.
  let answer = '';

  // 입력 배열을 순회하면서 요소에 해당하는 위치로 손가락 위치를 이동한다.
  numbers.forEach((num) => {
      // 1, 4, 7 이면 왼손이 이동한다.
      if( num === 1 || num === 4 || num === 7 ) {
        current = [0, Math.floor(num/3)]; // 들어온 수의 위치
        left = [0, Math.floor(num/3)]; // 왼손가락 위치
        answer += 'L';
      }
      else if( num === 3 || num === 6 || num === 9 ) {
        // 3, 6, 9 이면 오른손이 이동한다.
        current = [2, Math.floor(num/3)-1]; // 들어온 수의 위치
        right = [2, Math.floor(num/3)-1]; // 오른손가락 위치
        answer += 'R';
      }
      else {
        // 2, 5, 8, 0 이면 더 가까운 손가락이 이동한다.
        if( num === 0 ) current = [1, 3];
        else current = [1, Math.floor(num/3)];

        // 왼손에서 현재 들어온 수까지의 거리
        const leftInter  = Math.abs(left[0] - current[0]) + Math.abs(left[1] - current[1]);
        // 오른손에서 현재 들어온 수까지의 거리
        const rightInter = Math.abs(right[0] - current[0]) + Math.abs(right[1] - current[1]);

        // 만약 거리가 동일하면 hand에 손가락을 사용한다.
        if( leftInter < rightInter ) {
          if( num === 0 ) left = [1, 3];
          else left = [1, Math.floor(num/3)];
          answer += 'L';
        }
        else if( leftInter > rightInter ) {
          if( num === 0 ) right = [1, 3];
          else right = [1, Math.floor(num/3)];
          answer += 'R';
        }
        else {
          if( hand === 'left' ) {
            if( num === 0 ) left = [1, 3];
            else left = [1, Math.floor(num/3)];
            answer += 'L';
          }
          else {
            if( num === 0 ) right = [1, 3];
            else right = [1, Math.floor(num/3)];
            answer += 'R';
          }
        }
      }
  });

  return answer;
}
