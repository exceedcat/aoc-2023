const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const universe = inputData.map(str => str.split(''));

const getGalaxies = u => {
  const coords = [];
  for (let i = 0; i < u.length; i++) {
    for (let j = 0; j < u[i].length; j++) {
      if (u[i][j] === '#') coords.push([i, j]);
    }
  }
  return coords;
}

const galaxies = getGalaxies(universe);

const getGalaxyPairs = g => {
  return g.reduce((res, coords, index, g) => {
    let pairs = [];
    for (let i = index + 1; i < g.length; i++) {
      pairs.push([coords, g[i]])
    }
    return [...res, ...pairs];
  }, [])
}

const galaxyPairs = getGalaxyPairs(galaxies);

console.log(galaxyPairs.length)

const rowsWithoutGalaxies = [];
for (let i = 0; i < universe.length; i++) {
  if (universe[i].indexOf('#') === -1) rowsWithoutGalaxies.push(i);
}

const columnsWithoutGalaxies = [];
for (let i = 0; i < universe[0].length; i++) {
  let without = true;
  for (let j = 0; j < universe.length; j++) {
    if (universe[j][i] === '#') {
      without = false;
      break;
    }
  }
  if (without) {
    columnsWithoutGalaxies.push(i);
  }
}

const EXPAND = 1000000;

const getLongPath = ([a,b]) => {
  const emptyColumns = columnsWithoutGalaxies.filter(c => (c < a[1] && c > b[1]) || (c > a[1] && c < b[1]));
  if (a[0] === b[0]) {
    return Math.abs(a[1] - b[1]) + emptyColumns.length * (EXPAND - 1);
  }
  const emptyRows = rowsWithoutGalaxies.filter(c => (c < a[0] && c > b[0]) || (c > a[0] && c < b[0]));
  if (a[1] === b[1]) {
    return Math.abs(a[0] - b[0]) + emptyRows.length * (EXPAND - 1);
  }
  return Math.abs(a[1] - b[1]) + Math.abs(a[0] - b[0]) + emptyColumns.length * (EXPAND - 1) + emptyRows.length * (EXPAND - 1);
}
const longPaths = galaxyPairs.map(getLongPath);

console.log(longPaths.reduce((res, el) => res + el, 0))