let columnHTML = document.getElementsByTagName("pre");
let text = columnHTML[0].innerHTML;

const ruleRegex = /\d+\|\d+/g;
let rules = text.match(ruleRegex);

const updateRegex = /^(?:\d{1,3},)*\d{1,3}(?=\n|$)/gm;
let updates = text.match(updateRegex);

function validateUpdates(rules, updates) {
    let total = 0;

    for (const update of updates) {
        const pages = update.split(',').map(Number);

        let isValid = true;

        for (const rule of rules) {
            const [x, y] = rule.split('|').map(Number);

            if (!pages.includes(x) || !pages.includes(y)) {
                continue;
            }

            if (pages.indexOf(x) > pages.indexOf(y)) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            const middleIndex = Math.floor(pages.length / 2);
            total += pages[middleIndex];
        }
    }

    return total;
}

console.log(validateUpdates(rules, updates));
