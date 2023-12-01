const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const inputData1 = [
  'threedlmnd98nineeighteight7',
  'pzcnnbjjthreefmlf9znfnkdrjs',
  'flbdjkseven7338qxzbcsx6',
  'six43fourthree2',
  'one24hndgmz37mjqqm1',
  '4fiverlgtbr',
  '7hqtlxgngd15qkfl2three',
  'mtcztwo46one',
  '3onefivechmlkgp87clrmmhseven',
  'tvsctqdlns1hhhctpn34cztkqzztpcgtzhgrtt',
  'four8flptk',
  '6zkb',
  '7eight9fivesix75hclgfphhvv',
  'ct53qdjpnkdpxdhvpqqcx8',
  '144six',
  'kbjtmgfrx3mpmjhncfl78nine',
  '7sgnlbdfivecxz',
  'oneqrbbnrdxgbbfl3',
  '8ndmrfggfz1six87',
  'hjkfb8vhrhnlmbhbl59rxplvmgzspfour',
]

let calibrationValue = 0;

inputData.forEach(str => {
  for (let i = 0; i < str.length; i++) {
    if (Number.isInteger(+str[i])) {
      calibrationValue += (10 * +str[i]);
      break;
    }
  }
  for (let i = str.length - 1; i >= 0; i--) {
    if (Number.isInteger(+str[i])) {
      calibrationValue += +str[i];
      break;
    }
  }
});


let correctCalibrationValue = 0;

const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

inputData.forEach(str => {
  for (let i = 0; i < str.length; i++) {
    if (Number.isInteger(+str[i])) {
      correctCalibrationValue += (10 * +str[i]);
      console.log('>', (10 * +str[i]))
      break;
    }

    const substr = str.slice(i, i + 5);
    const textNum = numbers.find(num => substr.indexOf(num) !== -1);
    if (!textNum) {
      continue;
    }

    const numberFromText = numbers.indexOf(textNum) + 1;

    const textNumIndexInStr = substr.indexOf(textNum);
    const numIndex = substr.split('').findIndex(v => Number.isInteger(+v));

    if (numIndex === -1 || textNumIndexInStr < numIndex) {
      correctCalibrationValue += 10 * numberFromText;
      console.log('>>',10 * numberFromText)
      break;
    }

  }
  for (let i = str.length - 1; i >= 0; i--) {
    if (Number.isInteger(+str[i])) {
      correctCalibrationValue += +str[i];
      console.log('>>>',+str[i])
      break;
    }

    const substr = str.slice(i, i + 5);
    const textNum = numbers.find(num => substr.indexOf(num) !== -1);
    if (!textNum) {
      continue;
    }
    correctCalibrationValue += numbers.indexOf(textNum) + 1;
    console.log('>>>>',numbers.indexOf(textNum) + 1)
    break;
  }
});

console.log(correctCalibrationValue);