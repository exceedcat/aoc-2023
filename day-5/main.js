const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const parseNumbersLine = (line) => line.split(' ').map(v => v.trim());

const getMap = (type) => {
  const start = inputData.findIndex(line => line.includes(type)) + 1;
  let end = inputData.findIndex((line, i) => i > start && line === '') - 1;
  if (end < 0) end = inputData.length - 1;

  let map = {};
  for (let i = start; i <= end; i++) {
    const [destinationStart, sourceStart, length] = parseNumbersLine(inputData[i]);

    map[sourceStart] = {destinationStart, length};

  }

  return map;
}

const getValue = (map, source) => {
  const possibleRangeStart = Object.keys(map).sort((a, b) => a - b).findLast(key => +key <= +source);
  if (possibleRangeStart === undefined) {
    return source;
  }

  const {destinationStart, length} = map[possibleRangeStart];
  if (+possibleRangeStart + +length < +source) {
    return source;
  }
  return +destinationStart + (+source - +possibleRangeStart);

}

const seeds = parseNumbersLine(inputData[0].split(': ')[1]);

const maps = [
  'seed-to-soil',
  'soil-to-fertilizer',
  'fertilizer-to-water',
  'water-to-light',
  'light-to-temperature',
  'temperature-to-humidity',
  'humidity-to-location'
].map(getMap);

const values = []

for (let i = 0; i < seeds.length; i++) {
  let temp = seeds[i];

  maps.forEach(map => {
    temp = getValue(map, temp);
  })

  values.push(temp);
}

console.log(Math.min(...values))
