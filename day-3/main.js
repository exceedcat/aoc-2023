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