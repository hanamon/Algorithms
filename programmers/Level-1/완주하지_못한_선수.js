/*
  * [Level 1 : 완주하지 못한 선수]
  * 문제 : https://programmers.co.kr/learn/courses/30/lessons/42576?language=javascript
*/

/*--------------------------------------------------------------*/

// [방법 1.]
function solution(participant, completion) {
  const hash = new Map();

  participant.map((k) => {
    const key = hash.get(k);
    if ( !key ) hash.set(k, 1);
    else hash.set(k, key+1);
  });
  
  for( let k of completion ) {
    const key = hash.get(k);
    hash.set(k, key-1);
  }
  
  for( let [key, value] of hash ) {
    if( value !== 0 ) return key;
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
