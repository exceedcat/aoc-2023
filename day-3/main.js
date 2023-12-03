const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const inputData1 = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..',
]

let sum = 0;

const getNumberCoords = (str, y) => {
  let coords = [];
  let currentCoord = null;
  str.split('').forEach((symb, x) => {
    if (!Number.isNaN(+symb)) {
      if (currentCoord) {
        currentCoord = {
          ...currentCoord,
          value: currentCoord.value + symb,
        }
      } else {
        currentCoord = {
          x,
          y,
          value: symb,
        }
      }
    } else {
      if (currentCoord) {
        coords.push(currentCoord);
        currentCoord = null;
      }
    }
  });

  if (currentCoord) {
    coords.push(currentCoord);
  }

  return coords;
}

const isNumAdjToSymbol = ({ x, y, value }, data) => {
  const left = {x: x - 1, y };
  const right = {x: x + value.length, y};
  const top = Array(value.length + 2).fill(null).map((_,i) => ({ x: x - 1 + i, y: y - 1 }));
  const bottom = Array(value.length + 2).fill(null).map((_,i) => ({ x: x - 1 + i, y: y + 1 }));

  return [left, right, ...top, ...bottom].some(coord => {
    return data[coord.y] && data[coord.y][coord.x] && data[coord.y][coord.x] !== '.' && Number.isNaN(+data[coord.y][coord.x])
  });
}

inputData.forEach((str, i, data) => {
  const numberCoords = getNumberCoords(str, i);

  numberCoords.forEach(coord => {
    if (isNumAdjToSymbol(coord, data)) {
      sum += +coord.value;
    }
  });
})

console.log(sum)

const getGearCoords = (str, y) => {
  let coords = [];

  str.split('').forEach((symb, x) => {
    if (symb === '*') {
      coords.push({ x, y })
    }
  });

  return coords;
}
const getAdjNumbers = ({ x, y }, data) => {
  let numbers = [];
  const top = getNumberCoords(data[y - 1], y - 1);
  const bottom = getNumberCoords(data[y + 1], y + 1);
  const same = getNumberCoords(data[y], y);

  [...top, ...bottom, ...same].forEach(numCoord => {
    if (Math.abs(numCoord.x - x) <= 1 || (numCoord.x <= x && (numCoord.x + numCoord.value.length) >= x)) {
      numbers.push(numCoord);
    }
  })

  return numbers;
}

let sum1 = 0;

inputData.forEach((str, i, data) => {
  const gearCoords = getGearCoords(str, i);

  gearCoords.forEach(coord => {
    const adjNumbers = getAdjNumbers(coord, data);

    if (adjNumbers.length === 2) {
      sum1 += (+adjNumbers[0].value * +adjNumbers[1].value);
    }
  })

})

console.log(sum1)