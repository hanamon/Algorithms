/*
  * [Stack 자료구조 구현]
  * 요구 사항 : Stack 자료구조의 특성에 맞게 Class를 정의하라.
  * 주의 사항 : 내장 객체 Array.prototype에 정의된 메서드는 사용 금지
*/

class Stack {
  // 생성자 함수안에 멤버 변수 선언 및 초기화
  constructor() {
    // 데이터가 쌓이는 변수
    this.storage = {};
    // 스택의 최상단을 가리키는 포인터 변수
    this.top = 0;
  }

  // 스택의 추가된 데이터의 크기를 리턴
  size() {
    return this.top;
  }

  // 스택에 데이터 추가
  push(data) {
    this.storage[this.top] = data;
    this.top++;
  }

  // 가장 나중에 추가된 데이터를 스택에서 삭제하고 삭제한 데이터를 리턴
  pop() {
    // 스택이 비어있을 때에도 pop 연산을 적용해도 에러가 발생 방지
    if ( ! this.top ) return;

    const result = this.storage[this.top-1];
    delete this.storage[this.top-1];
    this.top--;
    
    return result;
  }
}
