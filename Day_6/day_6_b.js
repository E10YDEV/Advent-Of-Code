let columnHTML = document.getElementsByTagName("pre");
let text = columnHTML[0].innerHTML;
let textSplit = text.split("\n");

function detectLoops(mapInput) {
    let grid = mapInput.map(line => line.split(""));
    let directions = ['^', '>', 'v', '<'];
    let directionVector = {
        '^': { row: -1, column: 0 },
        '>': { row: 0, column: 1 },
        'v': { row: 1, column: 0 },
        '<': { row: 0, column: -1 }
    };

    let guardStartRow = 0, guardStartCol = 0, guardStartDirection = null;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (directions.includes(grid[i][j])) {
                guardStartRow = i;
                guardStartCol = j;
                guardStartDirection = grid[i][j];
                break;
            }
        }
        if (guardStartDirection) break;
    }

    function simulateWithObstacle(rowObstacle, colObstacle) {
        let map = grid.map(line => line.slice());
        map[rowObstacle][colObstacle] = "#";

        let row = guardStartRow;
        let column = guardStartCol;
        let direction = guardStartDirection;

        let visitedStates = new Set();
        visitedStates.add(`${row},${column},${direction}`);

        while (true) {
            let nextRow = row + directionVector[direction].row;
            let nextCol = column + directionVector[direction].column;

            if (nextRow < 0 || nextRow >= map.length || nextCol < 0 || nextCol >= map[0].length) {
                break;
            }

            if (map[nextRow][nextCol] === "#") {
                let currentDirectionIndex = directions.indexOf(direction);
                direction = directions[(currentDirectionIndex + 1) % 4];
            } else {
                row = nextRow;
                column = nextCol;
            }

            let state = `${row},${column},${direction}`;
            if (visitedStates.has(state)) {
                return true;
            }
            visitedStates.add(state);
        }

        return false;
    }

    let problematicPositions = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "." && !(i === guardStartRow && j === guardStartCol)) {
                if (simulateWithObstacle(i, j)) {
                    problematicPositions.push([i, j]);
                }
            }
        }
    }

    return problematicPositions;
}

console.log(detectLoops(textSplit));
