let columnHTML = document.getElementsByTagName("pre");
let text = columnHTML[0].innerHTML;
let textSplit = text.split("\n");

let totalHorizontalMatches = textSplit.reduce((sum, item) => {
    const matches = [...item.matchAll(/XMAS/g)];
    return sum + matches.length;
}, 0);

let totalHorizontalReverseMatches = textSplit.reduce((sum, item) => {
    const matches = [...item.matchAll(/SAMX/g)];
    return sum + matches.length;
}, 0);

let columnData = [];
for (let col = 0; col < textSplit[0].length; col++) {
    let column = textSplit.map(row => row[col]).join("");
    columnData.push(column);
}

let totalVerticalMatches = columnData.reduce((sum, item) => {
    const matches = [...item.matchAll(/XMAS/g)];
    return sum + matches.length;
}, 0);

let totalVerticalReverseMatches = columnData.reduce((sum, item) => {
    const matches = [...item.matchAll(/SAMX/g)];
    return sum + matches.length;
}, 0);

let diagonalLeftMatches = 0;

for (let col = 0; col < textSplit[0].length - 3; col++) {
    for (let row = 0; row < textSplit.length - 3; row++) {
        if (
            textSplit[row][col] === "X" &&
            textSplit[row + 1][col + 1] === "M" &&
            textSplit[row + 2][col + 2] === "A" &&
            textSplit[row + 3][col + 3] === "S"
        ) {
            diagonalLeftMatches++;
        }
    }
}

let diagonalRightMatches = 0;

for (let col = 3; col < textSplit[0].length; col++) {
    for (let row = 0; row < textSplit.length - 3; row++) {
        if (
            textSplit[row][col] === "X" &&
            textSplit[row + 1][col - 1] === "M" &&
            textSplit[row + 2][col - 2] === "A" &&
            textSplit[row + 3][col - 3] === "S"
        ) {
            diagonalRightMatches++;
        }
    }
}

let diagonalLeftReverseMatches = 0;

for (let col = 0; col < textSplit[0].length - 3; col++) {
    for (let row = 0; row < textSplit.length - 3; row++) {
        if (
            textSplit[row][col] === "S" &&
            textSplit[row + 1][col + 1] === "A" &&
            textSplit[row + 2][col + 2] === "M" &&
            textSplit[row + 3][col + 3] === "X"
        ) {
            diagonalLeftReverseMatches++;
        }
    }
}

let diagonalRightReverseMatches = 0;

for (let col = 3; col < textSplit[0].length; col++) {
    for (let row = 0; row < textSplit.length - 3; row++) {
        if (
            textSplit[row][col] === "S" &&
            textSplit[row + 1][col - 1] === "A" &&
            textSplit[row + 2][col - 2] === "M" &&
            textSplit[row + 3][col - 3] === "X"
        ) {
            diagonalRightReverseMatches++;
        }
    }
}

let totalMatches = 0;
totalMatches += totalHorizontalMatches + totalHorizontalReverseMatches;
totalMatches += totalVerticalMatches + totalVerticalReverseMatches;
totalMatches += diagonalLeftMatches + diagonalLeftReverseMatches;
totalMatches += diagonalRightMatches + diagonalRightReverseMatches;

console.log(totalMatches);