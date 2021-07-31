/*
  * [Binary Search Trree 자료구조 구현]
  * 요구 사항 : Binary Search Tree 자료구조의 특성에 맞게 Class를 정의하라.
  * 멤버 변수 :
  * 1. 입력 데이터를 담을 수 있는 value
  * 2. 노드를 왼쪽에 저장할 수 있는 Array 타입의 left
  * 3. 노드를 오른쪽에 저장할 수 있는 Array 타입의 right
  * 메서드 : 
  * 1. insert(value): 입력받은 value를 Binary Search에 맞게 Tree에 계층적으로 추가한다.
  * 2. contains(value): 트리에 포함된 데이터를 찾는다.
  * 3. preorder(callback): 전위 순회를 통해 트리의 모든 요소에 callback을 적용한다.
  * 4. inorder(callback): 중위 순회를 통해 트리의 모든 요소에 callback을 적용한다.
  * 5. postorder(callback): 후위 순회를 통해 트리의 모든 요소에 callback을 적용한다.
  * 주의 사항 : value는 어떠한 값도 들어갈 수 있지만 현재 구현하는 Tree는 숫자로 제한한다.
*/

class BinarySearchTree {
  // 생성자 함수에 멤버 변수를 선언 및 초기화한다.
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // 현재 노드에 자식 노드를 추가한다.
  // 이진 트리는 자식 노드가 최대 두 개인 트리 구조를 말한다.
  // 이진 탐색 트리에서는 현재 노드보다 작은 수는 left에, 큰 수는 right에 저장한다.
  insert(value) {
    // 현재 노드보다 작은 데이터가 들어온 경우
    if( value < this.value ) {
      // 만약 현재 노드의 left 변수가 비어있을 경우 BinarySearchTree의 인스턴스를 값을 넣어 생성한다.
      if( this.left === null ) {
        this.left = new BinarySearchTree(value);
      }
      else {
        // 이미 현재 노드의 left 변수에 값이 존재한다면 재귀적으로 자식노드에 값을 보내서 자식노드에서 다시 확인한다.
        this.left.insert(value);
      }
    }
    // 현재 노드보다 큰 데이터가 들어온 경우
    else if( value > this.value ) {
      if( this.right === null ) {
        this.right = new BinarySearchTree(value);
      }
      else {
        this.right.insert(value);
      }
    }
    // 현재 노드와 동일한 데이터가 들어온 경우
    else {
      return;
    }
  }

  // 트리에 값이 포함되었는지 탐색한 후 Boolean 타입으로 리턴한다.
  // 앞서 구현했던 트리에 비해 이진 탐색 트리는 입력값과 트리 노드의 값의 크기를 비교하고 있다. 왜 그런 것일까?
  // 이유는 이진 탐색 트리는 노드의 왼쪽에는 현재 노드보다 작은 수를 자식으로 갖고, 오른쪽에는 큰 수를 자식으로 갖기 때문이다.
  contains(value) {
    // 만약 현재 노드에 그 값이 존재하면 true를 바로 리턴한다.
    if( value === this.value ) return true;
    // 만약 현재 노드보다 작은 수가 들어오면 현재 노드의 left 에서 탐색한다.
    if( value < this.value ) {
      if( this.left ) {
        return !!this.left.contains(value);
      }
    }
    // 만약 현재 노드보다 큰 수가 들어오면 현재 노드의 right 에서 탐색한다.
    if( value > this.value ) {
      if( this.right ) {
        return !!this.right.contains(value);
      }
    }
    return false;
  }

  // 전위 순회를 통해 모든 노드에 콜백함수를 적용 시킨다.
  preorder(callback) {
    // 전위 순회는 루트(현재 노드)부터 탐색을 시작해서 왼쪽 노드를 모두 탐색한 후 오른쪽 노드를 탐색한다.
    // 우선 현재 노드를 탐색한다.
    callback(this.value);
    if( this.left ) {
      this.left.preorder(callback);
    }
    if( this.right ) {
      this.right.preorder(callback);
    }
  }

  // 중위 순회를 통해 모든 노드에 콜백함수를 적용 시킨다.
  inorder(callback) {
    // 중위 순회는 루트(현재 노드)를 기준으로 왼쪽 노드를 모두 탐색한 후 루트를 탐색하고 마지막으로 오른쪽 노드를 탐색한다.
    if( this.left ) {
      this.left.inorder(callback);
    }
    callback(this.value);
    if( this.right ) {
      this.right.inorder(callback);
    }
  }

  // 후위 순회를 통해 모든 노드에 콜백함수를 적용 시킨다.
  postorder(callback) {
    // 후위 순회는 루트(현재 노드)를 기준으로 왼쪽 노드를 모두 탐색한 후 오른쪽 노드를 탐색하고 마지막으로 루트를 탐색한다.
    if( this.left ) {
      this.left.postorder(callback);
    }
    if( this.right ) {
      this.right.postorder(callback);
    }
    callback(this.value);
  }
}

// [입출력 예시]

// 생성자 함수 호출로 인스턴스 생성
const binarySearchTree = new BinarySearchTree(10);

// 루트보다 작은 수 추가
binarySearchTree.insert(5);

// 루트보다 큰 수 추가
binarySearchTree.insert(15);

// 전위 순회 함수 사용 예시
const arr = [];
binarySearchTree.preorder((node) => {
  arr.push(node + 1);
});

// arr 출력 결과 확인
arr // [11, 6, 16]
