/**
 * [powerSet] 문자열의 멱집합 구하기
 * 멱집합은 주어진 집합의 모든 부분 집합들로 구성된 집합이다.
 * 
 * [요구사항]
 * 하나의 집합을 의미하는 문자열을 입력받는다.
 * 각 문자를 가지고 만들 수 있는 모든 부분집합을 리턴하라.
 * 
 * [인자]
 * string 타입의 공백이 없는 알파벳 소문자 문자열
 * 
 * [출력]
 * 배열(arr)을 리턴
 * arr[i]는 각 부분집합의 원소로 구성된 문자열
 * 
 * [주의사항]
 * arr[i]는 각 부분집합을 구성하는 원소를 연결한 문자열이다.
 * arr[i]는 알파벳 순서로 정렬되어야 한다.
 * 집합은 중복된 원소를 허용하지 않는다.
 * arr은 사전식 순서로 정렬되어야한다.
 */

/*--------------------------------------------------------------*/

// [입출력 예시]
let output1 = powerSet('abc');
console.log(output1); // ['', 'a', 'ab', 'abc', 'ac', 'b', 'bc', 'c']

let output2 = powerSet('jjump');
console.log(output2); // ['', 'j', 'jm', 'jmp', 'jmpu', 'jmu', 'jp', 'jpu', 'ju', 'm', 'mp', 'mpu', 'mu', 'p', 'pu', 'u']

/*--------------------------------------------------------------*/

// [방법 1.]
const powerSet = function (str) {
  // 1. 문자열을 배열로 만든다.
  // 2. 문자열을 정렬한다.
  // 3. 중복된 문자열은 제거한다.
  const arr = str.split('').sort().reduce((a, c) => {
    if( a[a.length-1] === c ) return a;
    return a.concat(c);
  }, []);

  // 4. 부분집합을 담을 배열을 선언한다.
  const subSets = [];

  // 5. 부분집합은 ''으로 시작해서 중복을 제거한 길이만큼까지의 조합을 구한다.
  const pickOrNot = (idx, subset) => {
    console.log('idx', idx, ' subset', subset);
    if( idx === arr.length ) {
      console.log('----------', 'idx', idx, 'subset', subset);
      subSets.push(subset);
      return;
    }
    // 현재 내가 'a' 이면 idx가 arr.length 해서 return 되기 전에는 아래 재귀는 실행되지 않는다.
    pickOrNot(idx + 1, subset);
    // 위의 재귀가 return 되면서 idx가 줄어들어가면서 아래 재귀가 실행된다. (여기에서 문자열이 집합된다.)
    pickOrNot(idx + 1, subset + arr[idx]);
  };

  pickOrNot(0, '');
  subSets.sort();

  return subSets;
};

/**
 * [재귀 함수 실행 순서]
 * depth 0에서 재귀1 depth 1로 진입
 * 
 * depth 1에서 재귀1 depth 2로 진입
 * depth 2에서 '' 추가
 * 
 * depth 1에서 재귀2 depth 2로 진입
 * depth 2에서 '' + 'b' 추가
 * 
 * depth 0에서 재귀2 depth 1로 진입
 * 
 * depth 1에서 재귀1 depth 2로 진입
 * depth 2에서 'a' 추가
 * 
 * depth 1에서 재귀2 depth 2로 진입
 * depth 2에서 'a' + 'b' 추가
 */
