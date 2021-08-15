/*
  * [DFS / BFS] 연결된 정점들
  * 요구 사항 : 방향이 없는 간선들의 목록이 주어질 때, 연결된 정점의 컴포넌트(그룹들)가 몇 개인지 반환하는 함수를 작성하라.
  * 인자 : edges
  *        2차원 Array 타입을 요소로 갖는 시작과 도착 정점이 담겨있는 배열들을 담고 있는 목록 (2차원 배열)
  *        ex) [[0, 1], [1, 2], [3, 4]]
  * 출력 : Number 타입을 리턴
  *        연결된 정점의 컴포넌트의 수를 숫자로 반환
  * 주의 사항 : 주어진 간선은 무향이다.
  *             - [1, 2] 는 정점 1에서 정점 2로도 갈 수 있으며, 정점 2에서 정점 1로도 갈 수 있다.
  * 기타 : 인접행렬, 인접리스트로 구현할 수 있다.
  *        BFS, DFS 를 이용해서 구현할 수 있다.
*/

// 입출력 예시
const result = connectedVertices([
	[0, 1],
	[2, 3],
	[4, 5],
]);
console.log(result); // 3

const result = connectedVertices([
	[0, 1],
	[2, 3],
	[3, 4],
	[3, 5],
]);
console.log(result); // 2

/*--------------------------------------------------------------*/

// [방법 1.] 인접행렬 이용 (BFS, DFS)
function connectedVertices(edges) {
  // 간선을 이용한 매트릭스를 만든다.
  const matrix = createMatrix(edges);
  // 한번 확인한 정점은 다시 확인 하지 않는다.
  const visited = new Array(matrix.length).fill(false);
  // 컴포넌트를 카운트한다.
  let count = 0;
  // 매트릭스를 순회하며 확인되지 않은 정점을 모두 확인한다.
  matrix.forEach((row, vertex) => {
    if( !visited[vertex] ) {
      dfs(matrix, vertex, visited);
      count++;
    }
  });
  // 카운트를 리턴한다.
  return count;
}

function createMatrix(edges) {
  // 간선의 최대값을 추출한다.
  let max = 0;
  edges.forEach((edge, idx) => {
    const currMax = Math.max(...edge);
    if( max < currMax ) max = currMax; 
  });

  // 최대값 길이만큼의 매트릭스를 만든다.
  const matrix = new Array(max + 1).fill(0).map(() => new Array(max + 1).fill(0));
  
  // 간선을 순회하며 매트릭스에 간선을 표시한다.
  edges.forEach((edge, idx) => {
    const [row, col] = edge;
    matrix[row][col] = 1;
    matrix[col][row] = 1;
  });

  return matrix;
}

function bfs(matrix, vertex, visited) {
  // BFS에서 탐색할 정점을 넣고 지우고 반복한다. 이때, visited 에 탐색 여부가 기록된다.
  const queue = [vertex];
  visited[vertex] = true;
  // 탐색할 정점이 있으면 탐색하고 기록한다. 이 함수가 끝나면 count += 1 된다.
  while( queue.length ) {
    const current = queue.shift();
    // 현재 탐색할 정점을 순회한다.
    matrix[current].forEach((el, idx) => {
      // 현재 탐색할 정점에서 연결된 정점이 있고, 만약 기록되지 않은 정점이라면
      // 큐에 해당 정점을 집어 넣고 그 정점을 또 돌아 볼 수 있게 한다.
      // 그리고 탐색 확인을 체크한다.
      // el = matrix[current][idx]
      if( el && !visited[idx] ) {
        queue.push(idx);
        visited[idx] = true;
      }
    });
  }
}

function dfs(matrix, vertex, visited) {
  visited[vertex] = true;
  // DFS에서는 재귀를 이용해서 깊이를 우선 탐색한다.
  matrix[vertex].forEach((el, idx) => {
    if( el && !visited[idx] ) {
      dfs(matrix, idx, visited);
    }
  });
}

// [방법 1-2] - 위와 동일한 방법인데 코드 디자인만 다름
function connectedVertices(edges) {
  // 1. 간선을 이용해서 매트릭스를 만든다.
  const matrix = createMatrix(edges);
  // 2. 방문을 기록할 배열을 매트릭스 길이만큼 만든다.
  const visited = new Array(matrix.length).fill(false);
  // 3. 컴포넌트를 카운트할 변수를 생성한다.
  let count = 0;
  // 4. 매트릭스를 순회한다.
  matrix.forEach((row, idx) => {
    if( !visited[idx] ) {
      // 만약 현재 정점이 미확인이면 BFS를 실행한다.
      // bfs(matrix, idx, visited);
      dfs(matrix, idx, visited);
      // 컴포넌트를 카운트 한다.
      count++;
    }
  });
  // 5. 카운트 변수를 리턴한다.
  return count;
}

function createMatrix(edges) {
  // 간선에서 최대값을 추출한다.
  // const max = Math.max(...edges.flat());
  const max = edges.reduce((a, c) => {
    const bigger = Math.max(...c);
    if( a < bigger ) return bigger;
    return a;
  }, 0);
  // 최대값 만큼의 매트릭스를 만든다.
  const matrix = new Array(max + 1).fill(0).map(() => new Array(max + 1).fill(0));
  // 간선을 순회하며 매트릭스에 간선을 표시한다.
  edges.forEach((edge) => {
    matrix[edge[0]][edge[1]] = 1;
    matrix[edge[1]][edge[0]] = 1;
  });
  // 매트릭스를 출력한다.
  return matrix;
}

function bfs(matrix, vertex, visited) {
  // 자료구조 큐에 탐색할 정점을 쌓는다. 기본값은 vertex
  const queue = [vertex];
  // 현재 정점을 true로 바꾼다.
  visited[vertex] = true;
  // 쌓인 큐가 없어질 때까지 반복한다.
  while( queue.length ) {
    const current = queue.shift();
    // 탐색할 정점을 순회하며 연결된 점들도 모두 visited 에 기록하고 그곳도 탐색할 수 있게 queue에 쌓는다.
    matrix[current].forEach((el, idx) => {
      if( el && !visited[idx] ) {
        visited[idx] = true;
        queue.push(idx);
      }
    });
  }
}

function dfs(matrix, vertex, visited) {
  // 현재 탐색중인 정점을 기록한다.
  visited[vertex] = true;
  // 현재 정점을 순회한다.
  matrix[vertex].forEach((el, idx) => {
    // 연결된 정점이 심지어 미확인이라면 재귀를 호출한다.
    if( el && !visited[idx] ) {
      dfs(matrix, idx, visited);
    } 
  });
}

/*--------------------------------------------------------------*/

// [방법 2.] 인접리스트 이용 (BFS, DFS)
function connectedVertices(edges) {
  // 인접 리스트로 구현
  // 1. 간선의 최대값을 구한다.
  const max = Math.max(...edges.flat());

  // 2. 최대값 만큼의 인접 리스트를 만든다.
  const abjList = {};
  for( let i=0; i<=max; i++ ) {
    abjList[i] = [];
  }

  // 3. 간선을 순회하며 인접 리스트에 표시한다.
  edges.forEach((edge) => {
    const [row, col] = edge;
    abjList[row].push(col);
    abjList[col].push(row);
  });

  // 4. 탐색 기록 객체를 선언한다.
  const visited = {};

  // 5. 컴포넌트 카운트 변수를 선언한다.
  let count = 0;

  // 6. 간선의 최대값 만큼 순회하며 방문하지 않은 정점을 방문하고 마지막에 카운트한다.
  for( let i=0; i<=max; i++ ) {
    if( !visited[i] ) {
      dfs(abjList, i, visited);
      count++;
    }
  }

  // 7. 카운트 변수를 리턴한다.
  return count;
}

function bfs(abjList, vertex, visited) {
  // 큐의 자료구조에 탐색할 정점을 쌓는다. 기본은 vertex
  const queue = [vertex];
  // 현재 탐색중인 정점을 기록한다.
  visited[vertex] = true;
  // 탐색할 정점이 있으면 아래 코드를 실행한다.
  while( queue.length ) {
    const current = queue.shift();
    // 현재 탐색중인 정점을 순회하며 연결된 지점이 있는지 확인한다.
    abjList[current].forEach((el) => {
      // 주의 : index 가 아니라 el 로 확인해야한다.
      if( !visited[el] ) {
        visited[el] = true;
        queue.push(el);
      }
    });
  }
}

function dfs(abjList, vertex, visited) {
  visited[vertex] = true;
  abjList[vertex].forEach((el) => {
    if( !visited[el] ) {
      dfs(abjList, el, visited);
    }
  });
}
