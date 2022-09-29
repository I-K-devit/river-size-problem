const matrix = [
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0],
];

function riverSizes(matrix) {
    const uniqueMatrix = matrix;

    let uniqueIterator = 2;

    const nodeRight = (row, col) => (uniqueMatrix[row] || [])[col + 1] || null;
    const nodeLeft = (row, col) => (uniqueMatrix[row] || [])[col - 1] || null;
    const nodeTop = (row, col) => (uniqueMatrix[row + 1] || [])[col] || null;
    const nodeBottom = (row, col) => (uniqueMatrix[row - 1] || [])[col] || null;

    function reassignNearestRiverNodes(nodeRow, nodeCol, index) {
        if (nodeRight(nodeRow, nodeCol) > 0) {
            uniqueMatrix[nodeRow][nodeCol + 1] = index;
        }
        if (nodeLeft(nodeRow, nodeCol) > 0) {
            uniqueMatrix[nodeRow][nodeCol - 1] = index;
        }
        if (nodeTop(nodeRow, nodeCol) > 0) {
            uniqueMatrix[nodeRow + 1][nodeCol] = index;
        }
        if (nodeBottom(nodeRow, nodeCol) > 0) {
            uniqueMatrix[nodeRow - 1][nodeCol] = index;
        }
    }

    for (let row = 0; row < uniqueMatrix.length; row++) {
        for (let col = 0; col < uniqueMatrix[row].length; col++) {
            if (uniqueMatrix[row][col] === 1) {
                uniqueMatrix[row][col] = uniqueIterator;
                reassignNearestRiverNodes(row, col, uniqueIterator);
                uniqueIterator++;
            }
            if (uniqueMatrix[row][col] > 1) {
                reassignNearestRiverNodes(row, col, uniqueMatrix[row][col]);
            }
        }
    }

    // this is a transformed river array where all the rivers are marked with an unique identifier
    // console.log('uniqueMatrix', uniqueMatrix);

    const uniqueRivers = [];

    for (let row = 0; row < uniqueMatrix.length; row++) {
        for (let col = 0; col < uniqueMatrix[row].length; col++) {
            if (uniqueMatrix[row][col] > 1) {
                uniqueRivers.push(uniqueMatrix[row][col]);
            }
        }
    }

    const reducedRiverSizes = uniqueRivers.reduce((acc, item, i) => {
        return {
            ...acc,
            [item]: (acc[item] || 0) + 1,
        };
    }, {});

    return Object.values(reducedRiverSizes);
}

console.log("answer", riverSizes(matrix));
