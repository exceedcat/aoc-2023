const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const EXPAND = 1000000;
const getGalaxies = u => {
  const coords = [];
  for (let i = 0; i < u.length; i++) {
    for (let j = 0; j < u[i].length; j++) {
      if (u[i][j] === '#') coords.push([i, j]);
    }
  }
  return coords;
}
const getGalaxyPairs = g => {
  return g.reduce((res, coords, index, g) => {
    let pairs = [];
    for (let i = index + 1; i < g.length; i++) {
      pairs.push([coords, g[i]])
    }
    return [...res, ...pairs];
  }, [])
}
const getRowsAndColsWithoutGalaxies = u => {
  const rowsWithoutGalaxies = [];
  for (let i = 0; i < u.length; i++) {
    if (u[i].indexOf('#') === -1) rowsWithoutGalaxies.push(i);
  }

  const columnsWithoutGalaxies = [];
  for (let i = 0; i < u[0].length; i++) {
    let without = true;
    for (let j = 0; j < u.length; j++) {
      if (u[j][i] === '#') {
        without = false;
        break;
      }
    }
    if (without) {
      columnsWithoutGalaxies.push(i);
    }
  }

  return { rowsWithoutGalaxies, columnsWithoutGalaxies }
}
const getPath = ([a, b]) => {
  const emptyColumns = columnsWithoutGalaxies.filter(c => (c < a[1] && c > b[1]) || (c > a[1] && c < b[1]));
  const emptyRows = rowsWithoutGalaxies.filter(c => (c < a[0] && c > b[0]) || (c > a[0] && c < b[0]));

  return Math.abs(a[1] - b[1]) + Math.abs(a[0] - b[0]) + emptyColumns.length * (EXPAND - 1) + emptyRows.length * (EXPAND - 1);
}

const universe = inputData.map(str => str.split(''));
const galaxies = getGalaxies(universe);
const galaxyPairs = getGalaxyPairs(galaxies);
const { rowsWithoutGalaxies, columnsWithoutGalaxies } = getRowsAndColsWithoutGalaxies(universe)
const paths = galaxyPairs.map(getPath);

console.log(paths.reduce((res, el) => res + el, 0))