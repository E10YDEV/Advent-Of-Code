let columnHTML = document.getElementsByTagName("pre");
let text = columnHTML[0].innerHTML;
let totalSum = 0;

const pattern = /mul\((\d+),\s*(\d+)\)/g;

const matches = [...text.matchAll(pattern)];

function mul(a, b) {
    return a * b;
}

matches.forEach(match => {
    totalSum += eval(match[0]);
});

console.log(totalSum);
