const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const getNextValue = (seq) => {
  let diff = 0;
  let current = [...seq];

  while (!current.every(el => el === 0)) {
    const next = []
    current.reduce((a, b) => {
      next.push(b - a);
      return b;
    });
    diff += next[next.length - 1];
    current = next;
  }

  return seq[seq.length - 1] + diff;
}

const getPrevValue = (seq) => {
  let diff = 0;
  let current = [...seq].reverse();

  while (!current.every(el => el === 0)) {
    const next = []
    current.reduce((a, b) => {
      next.push(b - a);
      return b;
    });
    diff += next[next.length - 1];
    current = next;
  }

  return seq[0] + diff;
}

const res = inputData
  .map(str => str.split(' ').map(Number))
  .map(getNextValue)
  .reduce((res, el) => res + el, 0);

console.log(res)

const res1 = inputData
  .map(str => str.split(' ').map(Number))
  .map(getPrevValue)
  .reduce((res, el) => res + el, 0);

console.log(res1)