/**
 * [rangeMinimum] 주어진 배열에서 특정 구간의 최소값 구하기 - 구간 트리(segment tree)
 * 요구 사항 : 
 * - 정수를 요소로 갖는 배열과 특정 구간을 입력받는다.
 * - 해당 구간 내에서 최소값을 리턴한다.
 * 인자 : 
 * - arr : number 타입을 요소로 갖는 배열
 * - arr : arr.length는 500,000 이하
 * - arr : arr[i]는 -100,000 이상 100,000 이하의 정수
 * - ranges : number 타입을 요소로 갖는 배열
 * - ranges : ranges.length는 10,000 이하
 * - ranges : ranges[i]는 특정 구간을 의미
 * - ranges : ranges[i][0]은 i번째 구간의 시작 인덱스
 * - ranges : ranges[i][1]은 i번째 구간의 마지막 인덱스
 * 출력 : 
 * - 배열(arr)를 리턴
 * - arr[i]는 i번째 구간(ranges[i])의 최소값
 * Advanced :
 * - 주어진 배열에서 특정 구간의 최소값을 구하는 단순한 알고리즘은 단순 순회 O(N) 이다.
 * - 같은 배열에 대해서 다양한 구간에 대한 최소값을 구할 경우, 단순 순회는 O(N^2) 이다. (구간의 개수도 N개라 가정할 경우)
 * - 적절한 자료구조를 통해 이와 같은 구간 초회에 대한 반복 작업을 효율적으로 수행할 수 있다. O(N * logN)
 * - 구간 트리(segment tree)에 대해 학습해보자.
 * - 트리를 객체 또는 배열로 구현할 수 있다.
 * - 객체로 구현하는 것이 보다 직관적이기 때문에 객체로 먼저 도전해보자.
 * - 구간의 최대값, 합도 동일한 로직으로 구현하면 된다.
 */

// [입출력 예시]
// const arr = [1, 3, 2, 7, 9, 11];
// const mins = rangeMinimum(arr, [[1, 4], [0, 3]]);
// console.log(mins); // --> [2, 1]

/**
 * [구간트리] Segment Tree
 * 구간트리를 사용하면 구간에서 최소, 최대값을 찾는데 O(log n)이면 충분하다.
 * 구간트리의 노드는 특정 구간에서 가장 작은 값을 가지고 있다.
 *
 * 구간 트리는 주어진 객체(배열)을 절반으로 나눠 결국 요소 하나만 남을 때까지 반복해서 자료로 저장한다.
 * 만약 저 중 0~4번까지의 데이터가 필요하다면 2번 노드와 12번 노드에만 접근하면 된다.
 *
 * 트리를 배열로 표현하기 위해서 가장 첫번째(root)는 1번 인덱스를 갖는다.
 * 자식 노드의 번호는 2와 3이 된다.
 * 그렇다면 어떤 노드 i의 왼쪽 자식은 i*2, 오른쪽 자식은 i*2+1이 되는 것이다.
 */

/**
 * [부분트리 구성 샘플]
 * 
 *                    (1번노드) 0 ~ 7 (index)
 *                  /                      \
 *          (2) 0 ~ 3                      (3) 4 ~ 7                    
 *        /           \                    /         \ 
 *  (4) 0 ~ 1    (5) 2 ~ 3           (6) 4 ~ 5  (7) 6 ~ 7
 *      /   \       /    \             /   \        /   \
 * (8) 0 (9) 1  (10) 2 (11) 3   (12) 4 (13) 5  (14) 6 (15) 7
 * 
 * 만약 0 ~ 4 index 구간의 값을 구하고 싶다면 2번 12번 노드를 이용하면 된다.
 */

// [방법 1.] solution with segment tree: O(logN) (search only) - array implementaion
function rangeMinimum (arr, ranges) {
  // 1. 트리 전체의 높이(루트 노트에서 가장 깊은 리프 노드까지의 거리)를 구하고, 전체 배열의 크기를 구한다.
  const height = Math.ceil(Math.log2(arr.length));
  const size = Math.pow(2, height + 1) - 1;

  // 2. size 길이만큼의 구간트리를 생성한다.
  const tree = Array(size).fill(null);

  // 구간트리 최소값 만드는 함수 - 재귀
  const createMinTree = (arr, ts, te, tree, idx) => {
    // 입력배열1의 시작과 끝이 동일하면 즉, 배열의 길이가 1이면 해당 배열의 요소를 리턴한다.
    if( ts === te ) {
      tree[idx] = arr[ts];
      return arr[ts];
    }

    const mid = Math.floor((ts + te) / 2);

    // tree에 해당 구간의 최소값을 찾아서 바꾼다.
    tree[idx] = Math.min(
      createMinTree(arr, ts,    mid, tree, idx * 2 + 1), // left
      createMinTree(arr, mid+1, te,  tree, idx * 2 + 2)  // right
    );

    // 바뀐 해당 구간의 요소를 리턴한다.
    return tree[idx];
  };

  // 3. 해당 구간의 최소값을 찾아 구간트리를 만는다.
  // 입력배열1, 입력배열1의 시작과 끝, 트리, 트리의 시작
  createMinTree(arr, 0, arr.length-1, tree, 0);

  // 구간트리에서 구간을 찾는 함수 - 재귀
  const findMin = (ts, te, rs, re, idx) => {
    // 입력배열1의 시작이 구간의 시작과 같거나 크면서, 입력배열1의 끝이 구간의 끝과 같거나 작을 경우
    // 즉, 입력배열1의 전체에서 최소값은 구간트리의 첫 번째 index 값이다.
    if( ts >= rs && te <= re ) return tree[idx];
    // 입력배열1의 시작이 구간의 끝보다 크거나, 입력배열1의 끝이 구간의 시작보다 작으면 JS에서 최대값을 리턴한다.
    if( ts > re || te < rs ) return Number.MAX_SAFE_INTEGER;

    const mid = parseInt((ts + te) / 2);

    return Math.min(
      findMin(ts,    mid, rs, re, 2 * idx + 1), // left
      findMin(mid+1, te,  rs, re, 2 * idx + 2)  // right
    );
  };

  // 4. 입력배열2의 구간들을 순회하면서 각 구간들의 최소값을 찾는다.
  const mins = ranges.map((range) => {
    const [start, end] = range;
    // 입력배열1 의 처음과 끝, 구간의 처음과 끝, 그리고 index 을 인자로 넣는다.
    return findMin(0, arr.length-1, start, end, 0);
  });

  // 5. 최소값 모음(배열)을 리턴한다.
  return mins;
};
