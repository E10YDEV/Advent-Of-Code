let columnHTML = document.getElementsByTagName("pre");
let text = columnHTML[0].innerHTML;
let textSplit = text.split("\n");
let count = 0;

for (let col = 0; col < textSplit[0].length - 2; col++) {
    for (let row = 0; row < textSplit.length - 2; row++) {
        let temp = "";
        temp += textSplit[row][col];
        temp += textSplit[row + 1][col + 1];
        temp += textSplit[row + 2][col + 2];

        if (temp === "MAS" || temp === "SAM") {
            temp = "";
            temp += textSplit[row][col + 2];
            temp += textSplit[row + 1][col + 1];
            temp += textSplit[row + 2][col];
            if (temp === "MAS" || temp === "SAM") {
                count++;
            }
        }
    }
}

console.log(count);