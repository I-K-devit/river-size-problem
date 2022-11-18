import { matrix } from "./assigmentInput";

const checkAdjacent = (x, y, matrix) => {
    matrix[y][x] = 0; // mark cell as visited
    let size = 1;
  
    [[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]].forEach(([i, j]) => {
      // make sure we don't access a row that doesn't exist
      // then check to see if we have a river
      if (matrix[j] && matrix[j][i]) {
        size += checkAdjacent(i, j, matrix);
      }
    });
  
    return size;
};

const riverSizes = (matrix) => {
    let results = [];
    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (matrix[y][x] === 1) {
          results.push(checkAdjacent(x, y, matrix));
        }
      });
    });
    return results;
  };

console.log("answer", riverSizes(matrix));
