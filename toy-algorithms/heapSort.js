/*
  * [heapSort] 힙 정렬
  * 요구 사항 : 정수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬
  * 입력 : arr[i]는 -100,000 이상 100,000 이하의 정수
  * 출력 : number 타입을 요소로 갖는 배열
  * 주의사항 : 
    - arr.sort 사용은 금지
    - 힙 정렬을 구현
    - 최소 힙(min heap)을 구현
    - removeRoot의 시간 복잡도는 O(logN)
*/

// [입출력 예시]
let output = heapSort([5, 4, 3, 2, 1]);
console.log(output); // --> [1, 2, 3, 4, 5]

output = heapSort([3, 1, 21]);
console.log(output); // --> [1, 3, 21]

output = heapSort([4, 10, 3, 5, 1]);
console.log(output); // --> [1, 3, 4, 5, 10]

/*--------------------------------------------------------------*/

// [방법 1.]
function swap(idx1, idx2, arr) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

function getParentIdx(idx) {
  return Math.floor((idx - 1) / 2);
}

function insert(heap, item) {
  // 1. heap에 새로운 item을 추가한다.
  heap.push(item);
  // 2. 현재 index와 부모 index를 가져온다.
  let currentIdx = heap.length-1;
  let parentIdx = getParentIdx(currentIdx);
  // 3. 현재 인덱스가 부모보다 작지 않을 때까지 반복한다.
  let count = 0;
  if( heap[parentIdx] > item ) count++;
  while( count > 0 ) {
    count--;
    // item이 부모의 값보다 작으면 부모와 위치를 바꾼다.
    swap(currentIdx, parentIdx, heap);
    currentIdx = parentIdx;
    parentIdx = getParentIdx(currentIdx);
    if( heap[currentIdx] < heap[parentIdx] ) count++;
  }
  // 5. 새로운 heap을 리턴한다.
  return heap;
}

function removeRoot(heap) {
  swap(0, heap.length-1, heap);
  heap.pop();

  if( heap.length === 0 ) return [];

  let curIdx;
  let minIdx = 0;

  while( curIdx !== minIdx ) {
    curIdx = minIdx;

    let left = curIdx * 2 + 1;
    let right = curIdx * 2 + 2;

    if(left < heap.length && heap[left] < heap[minIdx] ) minIdx = left;
    if( right < heap.length && heap[right] < heap[minIdx] ) minIdx = right;

    swap(curIdx, minIdx, heap);
  }

  return heap;
}

const binaryHeap = function (arr) {
  return arr.reduce((heap, item) => {
    return insert(heap, item);
  }, []);
};

const heapSort = function (arr) {
  let minHeap = binaryHeap(arr);
  const sorted = [];

  while( minHeap.length > 0 ) {
    sorted.push(minHeap[0]);
    minHeap = removeRoot(minHeap);
  }

  return sorted;
};
