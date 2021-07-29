/*
  * [Queue 자료구조 구현]
  * 요구 사항 : Queue 자료구조의 특성에 맞게 Class를 정의하라.
  * 주의 사항 : 내장 객체 Array.prototype에 정의된 메서드는 사용 금지
*/

class Queue {
  // 생성자 함수안에 멤버 변수 선언 및 초기화
  constructor() {
    // 데이터가 쌓이는 변수
    this.storage = {};
    // 큐의 가장 앞을 가리키는 포인터 변수 (가장 오래된 요소의 위치)
    this.front = 0;
    // 큐의 가장 뒤를 가리키는 포인터 변수 (다음에 추가될 요소의 위치)
    this.rear = 0;
  }

  // 데이터의 크기를 리턴
  size() {
    return this.rear - this.front;
  }

  // 데이터를 추가
  enqueue(data) {
    this.storage[this.rear] = data;
    this.rear++;
  }

  // 데이터를 들어온 순서대로 삭제 후 반환한다.
  dequeue() {
    // 빈 큐에 데이터 삭제 연산을 실행 시 오류 방지
    if( this.rear - this.front === 0 ) return;

    const result = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;

    return result;
  }
}
