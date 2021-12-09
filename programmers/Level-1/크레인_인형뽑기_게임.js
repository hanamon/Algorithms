/*
  * [Level 1 : 크레인 인형뽑기 게임]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/64061?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(board, moves) { 
  const arr = [];

  return moves.reduce((a, c) => {
    let count = 0;

    for( let i = 0; i < board.length; i++ ) {
      const doll = board[i][c-1];
      if( doll !== 0 ) {
        if( arr[arr.length-1] === doll ) {
          arr.pop();
          count += 2;
        } else {
          arr.push(doll);
        }    
        board[i][c-1] = 0;
        break;
      }
    }

    return a + count;
  }, 0);
}

/*--------------------------------------------------------------*/

// [방법 2.]
function solution(board, moves) {
  let count = 0;
  const arr = [];
  
  moves.forEach((col) => {
    for(let i = 0; i < board.length; i++ ) {
      const doll = board[i][col-1];
      if( doll !== 0 ) {
        if( arr[arr.length-1] === doll ) {
          arr.pop();
          count += 2;
        } else {
          arr.push(doll);
        }
        board[i][col-1] = 0;
        break;
      }
    }
  });
  
  return count;
}
