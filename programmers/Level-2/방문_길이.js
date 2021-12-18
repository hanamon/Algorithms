/*
  * [Level 2 : 방문 길이]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/49994?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(dirs) {
  const edges = new Array(11).fill(null).map((_) => new Array(11).fill(null).map((_) => []));
  let [Y, X] = [5, 5];
  let count = 0;

  const actionTable = {
    'U': () => Y -= 1,
    'D': () => Y += 1,
    'L': () => X -= 1,
    'R': () => X += 1,
    'U-X': () => Y += 1,
    'D-X': () => Y -= 1,
    'L-X': () => X += 1,
    'R-X': () => X -= 1,
  };

  for( let i=0; i<dirs.length; i++ ) {
    const [bY, bX] = [Y, X];
    actionTable[dirs[i]]();

    if( Y < 0 || X < 0 || Y > 10 || X > 10 ) { // 행렬을 넘어가는 경우
      actionTable[dirs[i] + '-X']();
      continue;
    }

    let edge = '';
    if( dirs[i] === 'U' ) edge = 'D';
    else if( dirs[i] === 'D' ) edge = 'U';
    else if( dirs[i] === 'L' ) edge = 'R';
    else if( dirs[i] === 'R' ) edge = 'L';

    if( edges[bY][bX].includes(dirs[i]) ) continue; // 현재 나의 위치에서 수행한 액션
    if( edges[Y][X].includes(edge) ) continue; // 현재 나의 위치에서 넘어갈 정점에서 나의 위치로 이동할 액션

    //console.log(dirs[i], Y, X);
    edges[bY][bX].push(dirs[i]);
    edges[Y, X].push(edge);
    count += 1;
  }

  //console.log(edges);
  return count;
}
