/**
 * [treeBFS] tree BFS 탐색
 * 임의의 tree를 구성하는 노드 중 하나의 Node 객체를 입력받는다.
 * 해당 노드를 시작으로 너비 우선 탐색을 한다.
 * 이 때, 탐색되는 순서대로 노드의 값이 저장된 배열을 리턴한다.
 * 
 * [인자]
 * node : 'value', 'children' 속성을 갖는 객체 (Node)
 * 'node.value'는 number 타입
 * 'node.children'은 Node를 요소로 갖는 배열
 * 
 * [출력]
 * 배열을 리턴한다.
 */

/*--------------------------------------------------------------*/

// [입출력 예시]
let root = new Node(1);
let rootChild1 = root.addChild(new Node(2));
let rootChild2 = root.addChild(new Node(3));
let leaf1 = rootChild1.addChild(new Node(4));
let leaf2 = rootChild1.addChild(new Node(5));
leaf1.addChild(new Node(6));
rootChild2.addChild(new Node(7));
output = bfs(root);
console.log(output); // --> [1, 2, 3, 4, 5, 7, 6]

/*--------------------------------------------------------------*/

// [방법 1.]
// Node 객체를 만드는 클래스
const Node = function (value) {
  this.value = value;
  this.children = [];
};

// membership check(중복 확인)를 따로 하지 않는다.
Node.prototype.addChild = function (child) {
  this.children.push(child);
  return child;
};

const bfs = function (node) {
  // 탐색한 정보를 담을 배열을 선언한다.
  const arr = [];

  // BFS는 자료구조 Queue를 이용한다.
  const queue = [node];

  while( queue.length ) {
    // 큐에서 현재 노드를 추출한다.
    const node = queue.shift();
    // 현재 노드의 값을 배열에 추가한다.
    arr.push(node.value);
    if( node.children.length ) {
      // 만약 현재 노드에 자식 노드가 있다면 자식노드를 큐에 추가한다.
      node.children.forEach((child) => queue.push(child));
    }
  }

  // 배열을 리턴한다.
  return arr;
};
