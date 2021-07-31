/*
  * [Graph 자료구조 인접 행렬 구현]
  * 요구 사항 : Graph 자료구조의 특성에 맞게 Class를 정의해서 인접 행렬을 구현하라.
  * 멤버 변수 : 버텍스와 간선을 담을 Array 타입의 matrix
  * 메서드 : 
  * 1. addVertex(): 그래프에 버텍스를 추가해야 한다.
  * 2. contains(vertex): 그래프에 해당 버텍스가 존재하는지 여부를 Boolean으로 반환해야 한다.
  * 3. addEdge(from, to): fromVertex와 toVertex 사이의 간선을 추가한다.
  * 4. hasEdge(from, to): fromVertex와 toVertex 사이의 간선이 존재하는지 여부를 Boolean으로 반환해야 한다.
  * 5. removeEdge(from, to): fromVertex와 toVertex 사이의 간선을 삭제해야 한다.
  * 주의 사항 :
  * 1. 인접 행렬 방식으로 구현해야 한다.
  * 2. 구현해야 하는 그래프는 방향 그래프이다.
  * 3. 구현해야 하는 그래프는 비가중치 그래프이다.
  * 4. 구현해야 하는 그래프는 이해를 돕기 위해 기존 배열의 인덱스를 정점으로 사용한다. (0, 1, 2, ... --> 정점)
  * 5. 인접 행렬 그래프는 정점이 자주 삭제되는 경우에는 적합하지 않기 때문에 정점을 지우는 메소드는 생략한다.
*/

class GraphWithAdjacencyMatrix {
  // 생성자 함수로 멤버 변수 선언 및 초기화
  constructor() {
    this.matrix = [];
  }

  // Graph에 vertex를 추가하는 메서드
  addVertex() {
    // 배열의 index를 정점으로 사용할 것이다.
    // 인접 행렬을 만들었기 때문에 정점이 새로 만들어 지면 앞에 있는 배열에 요소도 matrix의 길이만큼 요소가 추가되야한다.
    for( let i=0; i<this.matrix.length; i++ ) {
      this.matrix[i].push(0);
    }
    // 그리고 새롭게 정점을 만들어준다.
    this.matrix.push(new Array(this.matrix.length + 1).fill(0));
  }

  // Graph에 해당 vertex가 존재하는지 여부를 반환하는 메서드
  contains(vertex) {
    // 해당 index가 존재한다는 것은 현재 matrix 길이보다 작은 수가 들어왔다는 것이된다.
    if( vertex < this.matrix.length ) return true;
    else return false;
    // 이렇게 구현할 수도 있다.
    // vertex가 존재하면 true, 없다면 false;
    // return !!this.matrix[vertex];
  }

  // Graph에 from vertex와 to vertex 사이의 간선을 추가하는 메서드
  addEdge(from, to) {
    // 인자가 하나라도 들어오지 않은 경우
    if( from === undefined || to === undefined ) {
      console.log("2개의 인자가 있어야 합니다.");
      return;
    }
    // 들어온 인자가 matrix 범위 밖에 있는 경우
    if( from < 0 || from >= this.matrix.length || to < 0 || to >= this.matrix.length ) {
      console.log("범위가 매트릭스 밖에 있습니다.");
      return;
    }
    // 두 인자가 모두 정상적으로 들어온 경우 두 정점 사이의 간선을 추가한다.
    this.matrix[from][to] = 1;
  }

  // Graph에 from vertex와 to vertex 사이에 간선이 존재하는지 여부를 반환하는 메서드
  hasEdge(from, to) {
    // 두 인자가 모두 정상적으로 들어온 경우 두 정점 사이의 간선이 존재하는지 Boolean 타입으로 리턴한다.
    if( this.matrix[from][to] === 1 ) {
      return true;
    }
    // 간선이 존재하지 않으면 fasle를 리턴한다.
    return false;
    // 이렇게 구현할 수도 있다.
    // 간선이 존재하면 true, 없다면 false;
    // return !!this.matrix[from][to];
  }

  // Graph에 from vertex와 to vertex 사이에 간선을 삭제하는 메서드
  removeEdge(from, to) {
    // 인자가 하나라도 들어오지 않은 경우
    if( from === undefined || to === undefined ) {
      console.log("2개의 인자가 있어야 합니다.");
      return false;
    }
    // 들어온 인자가 matrix 범위 밖에 있는 경우
    if( from < 0 || from >= this.matrix.length || to < 0 || to >= this.matrix.length ) {
      console.log("범위가 매트릭스 밖에 있습니다.");
      return false;
    }
    // 두 인자가 모두 정상적으로 들어온 경우 두 정점 사이의 간선을 삭제한다.
    this.matrix[from][to] = 0;
  }
}

/*
  * [배운 것]
  * 구현하는 그래프가 방향 그래프인지 무방향 그래프인지 잘 확인하자.
  * 배열안에 값의 유무를 !를 붙여서 boolean 타입으로 바꾸고 !를 하나 더 붙여서 값이 있다면 true를 없다면 false를 표현하도록 할 수 있다.
*/
