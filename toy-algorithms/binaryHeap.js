/*
  * [binaryHeap] 이진 힙
  * 요구 사항 : 정수를 요소로 갖는 배열을 입력받아 이진 힙(binary heap)을 리턴하라.
  * 입력 : number 타입을 요소 배열, arr[i]는 -100,000 이상 100,000 이하의 정수, arr.length는 100,000 이하
  * 출력 : number 타입을 요소 배열
  * 주의 사항 : 
  * - 최대 힙(max heap)을 구현해야 한다.
  * - 입력으로 주어진 배열은 중첩되지 않은 1차원 배열이다.
  * - 최대 힙 구현을 위해 선언된 함수들(getParentIdx, insert)을 전부 완성해야 한다.
  * - swap, getParentIdx, insert를 전부 사용해야 한다.
  * - swap, binaryHeap을 수정하지 않아야 한다.
  * - 테스트 케이스에서 힙 함수들을 정확히 구현했는지 함께 테스트한다.
  * - insert의 시간 복잡도는 O(logN)이다.
  * - 주어진 배열을 내림차순으로 정렬(O(logN))해도 최대 힙의 조건을 만족한다.
  * - 하지만 이는 insert를 구현하는 것과는 거리가 먼 방법이며, 테스트를 통과할 수도 없다.
*/

// [입출력 예시]
let output = binaryHeap([5, 4, 3, 2, 1]);
console.log(output); // --> [5, 4, 3, 2, 1]

output = binaryHeap([3, 1, 21]);
console.log(output); // --> [21, 1, 3]

output = binaryHeap([4, 10, 3, 5, 1]);
console.log(output); // --> [10, 5, 3, 4, 1]

output = binaryHeap([ 9, 6, 7, 4, 5, 2, 10 ]);
console.log(output); // --> [10, 6, 9, 4, 5, 2, 7]

/*--------------------------------------------------------------*/

/*
  * [이진 힙(binary heap)이란?]
  * 이진 힙(binary heap)은 노드의 값이 특정한 순서를 가지고 있는 완전 이진 트리(Complete Binary Tree)이다.
  * 완전 이진 트리는 이진 트리의 (마지막 레벨 또는 마지막 깊이를 제외하고) 모든 레벨이 노드로 가득 채워져 있어야 한다.
  * 마지막 레벨은 왼쪽부터 차례대로 채워져 있다.
  * 이진 힙에서 부모 노드의 값이 (이진 트리이므로 2개의) 자식 노드의 값보다 큰 경우를 최대 힙(max heap), 반대의 경우를 최소 힙(min heap)이라고 한다.
*/

/*
  * [힌트]
  * 이진 힙은 트리 객체를 이용해 구현할 수도 있고, 배열로도 구현할 수 있다.
  * 사실 거의 모든 트리를 배열로 구현할 수 있다.
  * 
  * 트리를 배열로 구현했을 때의 장점은 (데이터가 선형적으로 저장되기 때문에)
  * 저장공간을 절약할 수 있고 노드 접근 시 오버헤드(재귀호출, 반복문 등)가 약간 줄어든다.
  * 다만 이를 위해서 매우 복잡한 인덱스 관리가 필요하다.
  * 반면, 트리 객체를 이용한 구현은 직관적(이해하기 쉬움)이다.
  * 그 대신 저장 공간과 약간의 오버헤드를 희생해야 한다.
  * 
  * 거의 모든 기술(구현)은 다수의 선택 사이의 트레이드 오프(trade-off)이다.
  * 무엇을 선택할 지는 요구사항(requirements), 즉 주어진 문제의 제약과 조건을 고려하여 결정해야 한다.
  * 이 점을 반드시 기억하시기 바란다.
  * 
  * 완전 이진 트리는 노드가 낮은 레벨부터 채워지고, 같은 레벨에서는 왼쪽부터 채워지기 때문에 배열로 구현하는 것이 쉽다.
  * 최대 힙과 이진 검색 트리(binary search tree)는 둘다 완전 이진 트리이다.
  * 
  * 하지만 이진 검색 트리에서는 모든 노드가 정렬되는 것과 달리
  * 최대 힙에서는 오직 부모 노드와 직계 자식들 간의 관계만 유지된다.
  * 이는 아래의 사실로부터 바로 알 수 있다.
  * 
  * 이진 검색 트리에서 오른쪽 자식 노드의 값은 부모 노드의 값보다 크지만, 최대 힙에서는 부모 노드의 값이 두 자식 노드의 값보다 크다.
  * 아래와 같은 최대 힙에서 10을 삽입할 경우, 최대 힙을 유지하려면 어떻게 해야하는 지 고민하시기 바란다.
  * 
  *     9
  *    / \
  *   6   7
  *  / \ / \
  * 4  5 2
  * 
  * 최소 힙은 부모 노드의 값이 두 자식 노드의 값보다 작다는 점을 제외하고는 최대 힙과 구현이 일치한다.
*/

/*--------------------------------------------------------------*/

// [방법 1.] 이진 힙에서 최대 힙(max heap) 구현하기
// 아래 코드는 수정하지 마세요.
function swap(idx1, idx2, arr) {
  // 두 변수를 바꾸는 방법

  // 1) 임시 변수를 활용한 방법
  // let temp = arr[idx1];
  // arr[idx1] = arr[idx2];
  // arr[idx2] = temp;

  // 2) Destructuring assignment를 활용한 방법
  // arr이 reference type이라 가능
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];

  // 3) XOR 연산을 활용한 방법
  // arr이 reference type이라 가능
  // arr[idx1] ^= arr[idx2];
  // arr[idx2] ^= arr[idx1];
  // arr[idx1] ^= arr[idx2];
}

function getParentIdx(idx) {
  // 현재 index의 부모 index를 찾는 함수
  // 홀수이면 자신+1 한 후 2로 나눈 값을 자신에서 뺀 값이 부모의 index
  // 짝수이면 자신을 2로 나눈 값을 자신에서 뺀 값이 부모의 index
  if( idx > 1 ) idx--;
  if( idx%2 !== 0 ) return idx - ((idx+1)/2); // 홀수인 경우
  else return idx - (idx/2); // 짝수인 경우
}

function insert(heap, item) {
  //console.log(heap);
  // 1. 힙에 item을 추가한다.
  heap.push(item);
  // 2. 현재 index와 부모 index를 가져온다.
  let currentIdx = heap.length-1;
  let parentIdx = getParentIdx(currentIdx);
  //console.log('currentIdx: ', currentIdx, 'parentIdx: ', parentIdx);
  let count = 0;
  if( item > heap[parentIdx] ) count++;
  // 3. 현재 인덱스가 부모보다 크지 않을 때까지 반복한다.
  while( count > 0 ) {
    // 4. 현재 힙이 1보다 크고 현재 item이 부모의 index 값보다 크면 부모와 위치를 바꾼다.
    count--;
    swap(currentIdx, parentIdx, heap);
    currentIdx = parentIdx;
    parentIdx = getParentIdx(currentIdx);
    if( heap[currentIdx] > heap[parentIdx] ) count++;
  }
  // 5. 새로운 배열을 리턴한다.
  return heap;
}

// 아래 코드는 수정하지 마세요.
const binaryHeap = function (arr) {
  return arr.reduce((heap, item) => {
    return insert(heap, item);
  }, []);
};

// [부모 index 찾는 규칙]
// 현재 => 부모 // 차이
//  1 => 0 // -1
//  2 => 1 // -1
//  3 => 1 // -2
//  4 => 2 // -2
//  5 => 2 // -3
//  6 => 3 // -3
//  7 => 3 // -4
//  8 => 4 // -4
//  9 => 4 // -5
// 10 => 5 // -5
