/*
  * [Tree 자료구조 구현]
  * 요구 사항 : Tree 자료구조의 특성에 맞게 Class를 정의하라.
  * 멤버 변수 :
  * 1. 입력 데이터를 담을 수 있는 value 
  * 2. 하위 노드를 저장할 수 있는 Array 타입의 children
  * 메서드 : 
  * 1. insertNode(value): 입력받은 value를 Tree에 계층적으로 추가할 수 있어야 한다.
  * 2. contains(value): 트리에 포함된 데이터를 찾을 수 있어야 한다.
  * 주의 사항 : value는 어떠한 값도 들어갈 수 있지만 현재 구현하는 Tree는 숫자로 제한한다.
*/

class Tree {
  // 생성자 함수안에 멤버 변수 선언 및 초기화
  constructor(value) {
    // 현재 노드의 데이터를 담는 멤버 변수
    this.value = value;
    // 현재 노드의 자식 노드를 담는 배열
    this.children = [];
  }

  // 자식 노드를 추가하는 메소드
  insertNode(value) {
    // 생성자 함수로 Tree를 생성해야 해당 메소드를 사용할 수 있다. { value: value, children: [] } 이렇게 하면 안됨!
    const childNode = new Tree(value);
    this.children.push(childNode);
  }

  // 수로 들어온 데이터가 트리안에 존재하는지 여부를 리턴하는 메소드
  contains(value) {
    // 현재 노드에 값이 있다면 바로 true를 리턴
    if( this.value === value ) return true;
    // 현재 노드에 없다면 자식노드를 모두 순회한다.
    for( let i=0; i<this.children.length; i++ ) {
      const result = this.children[i].contains(value);
      if( result ) return true;
    }
    // 자식노드에도 없다면 false를 리턴한다.
    return false;
  }
}
