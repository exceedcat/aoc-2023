const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const MAX_RED = 12, MAX_GREEN = 13, MAX_BLUE = 14;

const greenRegex = /[0-9]+ green/;
const redRegex = /[0-9]+ red/;
const blueRegex = /[0-9]+ blue/;

const getMax = (rounds, regex) => rounds
  .reduce((res, round) => Math.max(
    res,
    round.match(regex) ? Number.parseInt(round.match(regex)[0]) : 0
  ), 0);

const res1 = inputData.reduce((res, inputStr) => {
  const [gameWithId, gameStrings] = inputStr.split(': ');
  const gameId = +(gameWithId.match(/[0-9]+/)[0]);
  const roundStrings = gameStrings.split('; ');

  const [maxGreen, maxBlue, maxRed] = [
    getMax(roundStrings, greenRegex),
    getMax(roundStrings, blueRegex),
    getMax(roundStrings, redRegex),
  ];

  return res + (maxGreen <= MAX_GREEN && maxBlue <= MAX_BLUE && maxRed <= MAX_RED ? gameId : 0)
}, 0);

console.log('>> res 1', res1);

const res2 = inputData.reduce((res, inputStr) => {
  const [, gameStrings] = inputStr.split(': ');
  const roundStrings = gameStrings.split('; ');

  const [maxGreen, maxBlue, maxRed] = [
    getMax(roundStrings, greenRegex),
    getMax(roundStrings, blueRegex),
    getMax(roundStrings, redRegex),
  ];

  return res + maxRed * maxGreen * maxBlue;
}, 0);

console.log('>> res 2', res2);
