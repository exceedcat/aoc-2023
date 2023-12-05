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


const valuesMap = {};
const values1 = []


const getValue1 = (map, source) => {
  if (map[source]) {
    return { value: map[source].destinationStart, final: map[source].final};
  }
  const possibleRangeStart = Object.keys(map).sort((a, b) => a - b).findLast(key => +key <= +source && map[key].length);
  if (possibleRangeStart === undefined) {
    return { value: source };
  }

  const {destinationStart, length} = map[possibleRangeStart];
  if (+possibleRangeStart + +length < +source) {
    return { value: source };
  }
  return { value: +destinationStart + (+source - +possibleRangeStart) };

}

for (let i = 0; i < seeds.length; i += 2) {
  for (let seed = +seeds[i]; seed < +seeds[i] + +seeds[i+1]; seed++) {
    // console.log('> process', seed)
    if (valuesMap[seed]) {
      values1.push(valuesMap[seed]);
      console.log('cache hit')
      continue;
    }
    const allMapsAccessed = [];
    let temp = seed;

    for (let m = 0; m < maps.length; m++) {
      if (maps[m][temp]?.final) {
        temp = maps[m][temp].final;
        console.log('cache hit')
        break;
      }
      const { value, final } = getValue1(maps[m], temp);
      if (!maps[m][temp]) {
        maps[m][temp] = {}
      }
      allMapsAccessed.push(maps[m][temp])
      if (final) {
        temp = final;
        console.log('cache hit')
        break;
      } else {
        temp = value;
      }
    }

    allMapsAccessed.forEach(map => { map.final = temp })

    valuesMap[seed] = temp;
    values1.push(temp);
  }
}

console.log(Math.min(...values1))