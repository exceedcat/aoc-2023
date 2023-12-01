const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');


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
const getTextNum = (str) => numbers.find(num => str.indexOf(num) !== -1);

inputData.forEach(str => {
  for (let i = 0; i < str.length; i++) {
    if (Number.isInteger(+str[i])) {
      correctCalibrationValue += (10 * +str[i]);
      break;
    }

    const substr = str.slice(i, i + 5);
    const textNum = getTextNum(substr);
    if (!textNum) {
      continue;
    }

    const numberFromText = numbers.indexOf(textNum) + 1;

    const textNumIndexInStr = substr.indexOf(textNum);
    const numIndex = substr.split('').findIndex(v => Number.isInteger(+v));

    if (numIndex === -1 || textNumIndexInStr < numIndex) {
      correctCalibrationValue += 10 * numberFromText;
      break;
    }

  }

  for (let i = str.length - 1; i >= 0; i--) {
    if (Number.isInteger(+str[i])) {
      correctCalibrationValue += +str[i];
      break;
    }

    const substr = str.slice(i, i + 5);
    const textNum = getTextNum(substr);
    if (textNum) {
      correctCalibrationValue += numbers.indexOf(textNum) + 1;
      break;
    }
  }
});

console.log(correctCalibrationValue);