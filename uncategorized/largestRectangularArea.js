/*
  * [히스토그램에서 가장 큰 직사각형 넓이 구하기]
  * 히스토그램(histogram)은 표(도수 분포표, 빈도표)로 되어 있는 도수 분포(frequency distribution)를 정보 그림으로 나타낸 것이다.
  * 요구 사항 : 임의의 히스토그램 내에서 가장 큰 직사각형의 면적을 리턴한다.
  * 입력 : histogram[i]는 100,000 이하의 양의 정수, histogram.length는 100,000 이하
  * 출력 : number type 리턴
  * 입출력 예시 : largestRectangularArea([2, 1, 4, 5, 1, 3, 3]); // 8
  * 입출력 예시 : largestRectangularArea([6, 2, 5, 4, 5, 1, 6]); // 12
  * 힌트 : 구간 트리(segment tree)를 약간 변형하여 해결한다.
*/

/*--------------------------------------------------------------*/

// [방법 1.] - naive solution: O(N^2)
const largestRectangularArea = function (histogram) {
  let largest = 0;

  for( let left=0; left<histogram.length; left++ ) {
    let min = histogram[left];

    for( let right=left; right<histogram.length; right++ ) {     
      if( histogram[right] < min ) min = histogram[right];

      let area = min * (right - left + 1);   

      if( area > largest ) largest = area;
    }
  }

  return largest;
};

/*--------------------------------------------------------------*/

// [방법 2.] - divide and conquer (분할 정복) : O(N * logN)
const largestRectangularArea = function (histogram) {
  const createMinIdxTree = (arr, ts, te) => {
    if( ts === te ) return { idx: ts, val: arr[ts] };

    const mid = parseInt((ts + te) / 2);
    const left = createMinIdxTree(arr, ts, mid);
    const right = createMinIdxTree(arr, mid + 1, te);

    return {
      val: Math.min(left.val, right.val),
      idx: left.val < right.val ? left.idx : right.idx,
      left,
      right,
    };
  };

  const tree = createMinIdxTree(histogram, 0, histogram.length - 1);

  const getMinIdx = (ts, te, rs, re, tree) => {
    if( rs <= ts && te <= re ) return tree.idx;
    if( te < rs || re < ts ) return rs;

    const mid = parseInt((ts + te) / 2);
    const left = getMinIdx(ts, mid, rs, re, tree.left);
    const right = getMinIdx(mid + 1, te, rs, re, tree.right);
    return histogram[left] < histogram[right] ? left : right;
  };

  const getRangeArea = (start, end) => {
    if( start > end ) return 0;

    const minIdx = getMinIdx(0, histogram.length - 1, start, end, tree);

    return Math.max(
      (end - start + 1) * histogram[minIdx],
      getRangeArea(start, minIdx - 1),
      getRangeArea(minIdx + 1, end)
    );
  };

  return getRangeArea(0, histogram.length - 1);
};
