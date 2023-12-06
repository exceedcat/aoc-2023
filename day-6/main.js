const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const getData = () => {
  const parse = (s) => s.split(':')[1].split(' ').filter(v => v.length).map(s => +s.trim());

  const [time, distance] = inputData.map(parse);

  return time.map((time, i) => ({ time, distance: distance[i] }));
}

const races = getData();

const isWinnable = (timeToHold, totalTime, distance) => {
  const timeToGo = totalTime - timeToHold;
  if (timeToHold === 0 || timeToGo <= 0) return false;

  const minSpeed = distance / timeToGo;
  return timeToHold > minSpeed;
}

let res = 1;
races.forEach(race => {
  let options = 0;
  for (let i = 1; i < race.time; i++) {
    if (isWinnable(i, race.time, race.distance)) {
      options += 1;
    }
  }
  if (options > 0) res *= options;
})

console.log(res)

const oneRace = {
  time: +inputData[0].split(':')[1].split(' ').join(''),
  distance: +inputData[1].split(':')[1].split(' ').join(''),
}

let res1 = 0;
for (let i = 1; i < oneRace.time; i++) {
  if (isWinnable(i, oneRace.time, oneRace.distance)) {
    res1 += 1;
  }
}

console.log(res1)