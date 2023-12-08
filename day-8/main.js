const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const directions = inputData[0].split('');

const map = inputData.slice(2).reduce((res, str) => {
  const [point, value] = str.split(' = ')
  const directions = value.match(/([A-Z]+)/gi);
  return {...res, [point]: directions}
}, {});

let currentPoint = 'AAA';
let steps = 0;
while (currentPoint !== 'ZZZ') {
  const currentDirection = directions[steps % directions.length];
  currentPoint = map[currentPoint][currentDirection === 'L' ? 0 : 1];
  steps += 1;
}

console.log(steps)