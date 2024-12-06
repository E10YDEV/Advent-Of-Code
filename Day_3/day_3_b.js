let columnHTML2 = document.getElementsByTagName("pre");
let text2 = columnHTML2[0].innerHTML;
let totalSum2 = 0;
let isActive = true;

const pattern2 = /do\(\)|don't\(\)|mul\(\d+,\s*\d+\)/g;

const matches2 = [...text2.matchAll(pattern2)];

function multiply(a, b) {
    return a * b;
}

matches2.forEach(match => {
    if (match[0] === "do()") {
        console.log("DO");
        isActive = true;
    } else if (match[0] === "don't()") {
        isActive = false;
    } else if (isActive) {
        console.log(match[0]);
        totalSum2 += eval(match[0]);
    }
});

console.log(totalSum2);