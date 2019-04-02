export function findMaxAdjacent(data, lim) {
  const size = data[0].length;
  
  let result = {res: 1, indexes: []};
  let vectors = new Array(8).fill(0);
  let directionsMap = [];
  let tempProd;
  

  const isIndexCorrect = (x, y) => x < size && y < size && x >= 0 && y >= 0;

  for (let i = 0; i < size; i += 1) {
    
    for (let j = 0; j < size; j += 1) {
      vectors = vectors.map(() => ({res: 1, indexes: []}));
      for (let k = 0; k < lim; k += 1) {
        directionsMap = [[i + k, j], [i - k, j], [i, j + k], [i, j - k], [i + k, j + k], [i + k, j - k], [i - k, j + k], [i - k, j - k]];
        for (let n = 0; n < directionsMap.length; n += 1) {
          const [x, y] = directionsMap[n];
          if (isIndexCorrect(x, y)) {
            vectors[n].res *= data[x][y];
            vectors[n].indexes.push({x, y});
          }
        }
      }
      tempProd = vectors.sort((a, b) => b.res - a.res)[0];
      if (tempProd.res > result.res) result = tempProd;
    }
  }
  return result;
}

export function generateTableData(size) {
  
  const repeat = (fn, n) => Array(n).fill(0).map(fn);
  const rand = () => getRandomValue(1,100);
  const data = n => repeat(() => repeat(rand, n), n);
  return data(size);

}

export const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
