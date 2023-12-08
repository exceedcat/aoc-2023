const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const directions = inputData[0].split('');

const map = inputData.slice(2).reduce((res, str) => {
  const [point, value] = str.split(' = ')
  const directions = value.match(/([0-9A-Z]+)/gi);
  return {...res, [point]: directions}
}, {});

// let currentPoint = 'AAA';
// let steps = 0;
// while (currentPoint !== 'ZZZ') {
//   const currentDirection = directions[steps % directions.length];
//   currentPoint = map[currentPoint][currentDirection === 'L' ? 0 : 1];
//   steps += 1;
// }
//
// console.log(steps)

let startingPoints = Object.keys(map).filter(el => el[2] === 'A');
let currentPoints = startingPoints;

const isFinished = el => el[2] === 'Z';
const finishedCoords = {};

let i = 0;

while (Object.keys(finishedCoords).length !== Object.keys(startingPoints).length) {
  currentPoints = currentPoints.map((p, j) => {
    const currentDirection = directions[i % directions.length];
    const nextPoint = map[p][currentDirection === 'L' ? 0 : 1];
    if (isFinished(nextPoint)) {
      finishedCoords[startingPoints[j]] = [...(finishedCoords[startingPoints[j]] || []), i];
    }
    return nextPoint;
  })
  i++;
}

const gcd = function (a, b) {
  return a ? gcd(b % a, a) : b;
}

const lcm = function (a, b) {
  return a * b / gcd(a, b);
}

console.log(Object.values(finishedCoords).map(c => +c + 1).reduce(lcm));
