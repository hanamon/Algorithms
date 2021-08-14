/*
  * [Graph] 인접 행렬 길찾기
  * 요구 사항 : 주어진 인접행렬에서 한 정점으로부터 다른 정점으로 이어지는 길이 존재하는지 반환해야 한다.
  * 인자 : 1. matrix : array 타입을 요소로 갖는 입접행렬이 담긴 2차원 배열
  *        2. from : number 타입의 시작 지점
  *        3. to : number 타입의 도착 지점
  * 출력 : boolean 타입 리턴
*/

// 입출력 예시
const result = getDirections(
	[
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1],
		[0, 1, 0, 0],
	],
	0,
	2
);
console.log(result); // true
// 정점 0에서 2로 가는 길이 존재하는지 확인한다.
// 0 --> 1 로 가는 간선이 존재하고, 1 --> 2 로 가는 간선이 존재하기 때문에 true를 반환한다.

/*--------------------------------------------------------------*/

// [방법 1-1.]
function getDirections(matrix, from, to) {
  if( matrix[from][to] ) return true;

  const queue = [from];
  const isVisited = new Array(matrix.length).fill(false);

  isVisited[from] = true;

  while( queue.length ) {
    const now = queue.shift();
    if( now === to ) return true;

    for( let next=0; next<matrix[now].length; next++ ) {
      if( matrix[now][next] && !isVisited[next] ){
        queue.push(next);
        isVisited[next] = true;
      }
    }
  }

  return false;
}

/*--------------------------------------------------------------*/

// [방법 1-2.]
function getDirections(matrix, from, to) {
  if( matrix[from][to] ) return true;

	let queue = [from];
	let visited = []; 
	
	while( queue.length ) {
		const now = queue.shift();
		visited.push(now);
		
		if( now === to ) return true;

		for( let i=0; i<matrix[now].length; i++ ) {
			if( matrix[now][i] && !visited.includes(i) ) {
				queue.push(i);
			}
		}
	}

  return false;
}

/*--------------------------------------------------------------*/

/*
  * [왜, 어째서 인접행렬을 찾는데 BFS를 활용하는가?]
  * 한 정점에서 다른 정점으로 이어지는 길이 존재하는지 여부를 판단하는 것이다.
  * 한 정점에서 다른 정점으로 어떻게 이어지는지 알아내는 것이 아니다.
  * 한 정점에서 다른 정정으로 어떻게 이어지는지 알아낼 필요가 없는 이유는
  * 깊이를 우선적으로 파악하면 길이 어떻게 이어지는지 알 수는 있지만 최단경로 인지는 알 수 없다.
  * 너비를 우선적으로 파악하면 길이 어떻게 이어지는지 알 수는 없지만 최단경로 인지는 알 수 있다.
  * 어떻게 너비를 우선적으로 파악하면 최단경로 인지를 알 수 있는 것일까?
  * 너비를 탐색할 때 연결된 곳이 없으면 그것으로 끝이난다.
  * 너비를 탐색할 때 연결된 곳이 있으면 그곳으로 가고 이전 너비는 끊어낸다.
  * 그곳에서도 연결된 것이 있다면 어찌 되었건 처음 시작점에서부터 연결된 지점이겠지.
  * 그런데 끊어냈기 때문에 어떻게 여기까지 왔는지는 알 수 없다.
  * 깊이를 우선적으로 파악하게 되면 어떨까?
  * 한 곳을 판 후 또 다시 한 곳을 판 후 또 다시 한 곳을 판 후 없으면 다시 맨 처음으로 돌아간다.
  * 그리고 다른 한 곳을 판 후 또 다시 한 곳을 판 후 또 다시 판 곳을 판 후 없으면 다시 맨 처음으로 돌아간다.
*/

/*--------------------------------------------------------------*/

// [방법 1-3.]
function getDirections(matrix, from, to) {
  const queue = [from];
  const visited = new Array(matrix.length).fill(0);

  while( queue.length ) {
    const now = queue.shift();
    visited[now] = true;

    // 현재 넘어온 행이 즉, 이전 정점에서 연결 된 정점이 목적지와 같은지 묻는다.
    // 현재 넘어온 행이 즉, 이전 정점에서 연결 된 현재 정점이 목적지와 같지 않다.
    if ( now !== to ) {
      // 현재 행에서 다음 찾을 행이 있는지 찾아보자.
      for( let i=0; i<matrix[now].length; i++ ) {
        if( matrix[now][i] && !visited[i] ) {
          queue.push(i);
        }
      }
    }
    // 현재 넘어온 행이 즉, 이전 정점에서 연결 된 현재 정점이 목적지와 같다.
    else return true;
  }

  return false;
}
