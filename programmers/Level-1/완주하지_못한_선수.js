/*
  * [Level 1 : 완주하지 못한 선수]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/42576?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(participant, completion) {
  const hashMap = new Map();
  
  participant.map((k) => {
    const key = hashMap.get(k);
    if( !key ) hashMap.set(k, 1);
    else hashMap.set(k, key+1);
  });
  
  completion.map((k) => {
    const key = hashMap.get(k);
    hashMap.set(k, key-1);
  });
  
  for( let [k, v] of hashMap ) {
    if( v !== 0 ) return k;
  }
}

/*--------------------------------------------------------------*/

// [방법 2.]
function solution(participant, completion) {
  participant.sort();
  completion.sort();
  
  for( let i=0; i<completion.length; i++ ) {
    if( completion[i] !== participant[i] ) return participant[i];
  }
  
  return participant[participant.length-1];
}
