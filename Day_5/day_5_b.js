let columnHTML = document.getElementsByTagName("pre");
let text = columnHTML[0].innerHTML;

const ruleRegex = /\d+\|\d+/g;
let rules = text.match(ruleRegex);

const updateRegex = /^(?:\d{1,3},)*\d{1,3}(?=\n|$)/gm;
let updates = text.match(updateRegex);

function validateUpdate(rules, pages) {
    for (const rule of rules) {
        const [x, y] = rule.split('|').map(Number);

        if (pages.includes(x) && pages.includes(y)) {
            if (pages.indexOf(x) > pages.indexOf(y)) {
                return false;
            }
        }
    }
    return true;
}

function fixUpdate(rules, pages) {
    let isValid = false;

    while (!isValid) {
        isValid = true;

        for (const rule of rules) {
            const [x, y] = rule.split('|').map(Number);

            if (pages.includes(x) && pages.includes(y)) {
                const indexX = pages.indexOf(x);
                const indexY = pages.indexOf(y);

                if (indexX > indexY) {
                    [pages[indexX], pages[indexY]] = [pages[indexY], pages[indexX]];
                    isValid = false;
                }
            }
        }
    }

    return pages;
}

function sumMiddleValues(rules, updates) {
    let sum = 0;

    for (const update of updates) {
        const pages = update.split(',').map(Number);

        if (!validateUpdate(rules, pages)) {
            const corrected = fixUpdate(rules, pages);
            const middleIndex = Math.floor(corrected.length / 2);
            sum += corrected[middleIndex];
        }
    }

    return sum;
}

console.log(sumMiddleValues(rules, updates));
