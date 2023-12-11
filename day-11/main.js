const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const universe = inputData.map(str => str.split(''));

const expand = (u) => {
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

  const expandedHorizontally = u.map(row => row.reduce((res, el, ind) =>
    [
      ...res,
      el,
      ...(columnsWithoutGalaxies.includes(ind) ? [el] : [])
    ], []));
  const expandedVertically = expandedHorizontally.reduce((res, row, ind) => [
    ...res,
    row,
    ...(rowsWithoutGalaxies.includes(ind) ? [row] : [])
  ], []);

  return expandedVertically;
}

const expandedUniverse = expand(universe);

const getGalaxies = u => {
  const coords = [];
  for (let i = 0; i < u.length; i++) {
    for (let j = 0; j < u[i].length; j++) {
      if (u[i][j] === '#') coords.push([i, j]);
    }
  }
  return coords;
}

const galaxies = getGalaxies(expandedUniverse);

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

const getPath = ([a, b]) => {
  // console.log(a)
  if (a[0] === b[0]) return Math.abs(a[1] - b[1]);
  if (a[1] === b[1]) return Math.abs(a[0] - b[0]);
  return Math.abs(a[1] - b[1]) + Math.abs(a[0] - b[0]);
}

const paths = galaxyPairs.map(getPath)

console.log(paths.reduce((res, el) => res + el, 0))