const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const inputData1 = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
];

const MAX_RED = 12, MAX_GREEN = 13, MAX_BLUE = 14;

const greenRegex = /[0-9]+ green/;
const redRegex = /[0-9]+ red/;
const blueRegex = /[0-9]+ blue/;

const getMax = (rounds, regex) => {
  return rounds
    .filter(round => round.match(regex))
    .reduce((res, round) => Math.max(res, Number.parseInt(round.match(regex)[0])), 0);
}

const res = inputData.reduce((res, inputStr) => {
  const [gameWithId, gameStrings] = inputStr.split(': ');
  const gameId = +(gameWithId.match(/[0-9]+/)[0]);
  const roundStrings = gameStrings.split('; ');

  const [maxGreen, maxBlue, maxRed] = [
    getMax(roundStrings, greenRegex),
    getMax(roundStrings, blueRegex),
    getMax(roundStrings, redRegex),
  ];

  if (maxGreen <= MAX_GREEN && maxBlue <= MAX_BLUE && maxRed <= MAX_RED) {
    return res + gameId;
  }
  return res;
}, 0);

console.log('>> res', res);
