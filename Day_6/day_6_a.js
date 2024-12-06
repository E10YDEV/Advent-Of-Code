let columnHTML = document.getElementsByTagName("pre");
let text = columnHTML[0].innerHTML;
let textSplit = text.split("\n");

function simulateGuard(mapInput) {
    let grid = mapInput.map(line => line.split(""));
    let directions = ['^', '>', 'v', '<'];
    let directionVector = {
        '^': { row: -1, column: 0 },
        '>': { row: 0, column: 1 },
        'v': { row: 1, column: 0 },
        '<': { row: 0, column: -1 }
    };

    let row = 0, column = 0, direction = null;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (directions.includes(grid[i][j])) {
                row = i;
                column = j;
                direction = grid[i][j];
                break;
            }
        }
        if (direction) break;
    }

    let visited = new Set();
    visited.add(`${row},${column}`);

    while (true) {
        let nextRow = row + directionVector[direction].row;
        let nextCol = column + directionVector[direction].column;

        if (nextRow < 0 || nextRow >= grid.length || nextCol < 0 || nextCol >= grid[0].length) {
            break;
        }

        if (grid[nextRow][nextCol] === "#") {
            let currentDirectionIndex = directions.indexOf(direction);
            direction = directions[(currentDirectionIndex + 1) % 4];
        } else {
            row = nextRow;
            column = nextCol;
            visited.add(`${row},${column}`);
        }
    }

    return visited.size;
}

console.log(simulateGuard(textSplit));