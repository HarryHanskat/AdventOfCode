//day 5
//

import * as fs from "fs";


// Separate out the page ordering rules from the pages to produce
//      Separated by a full blank line
//
// Each line in the ordering rules is separated by a '\n'
// Each line in the pages to produce section is separated by a '\n'
//
// Total = sum(middle values in correctly ordered page sequences)

function readFileContents(filePath: string): [number[][], number[][]] {
    try {
        const data: string = fs.readFileSync(filePath, "utf8");
        let lines: string[] = data.split('\n\n');

        let unSplitRules: string[] = lines[0].split('\n');
        let rulesStr: string[][] = unSplitRules.map((rule) => rule.split('|'));
        let rules: number[][] = rulesStr.map(row =>
            row.map(value => Number(value))
        );

        let unsplitPages: string[] = lines[1].split('\n');
        let pagesStr: string[][] = unsplitPages.map((page) => page.split(','));
        const pages: number[][] = pagesStr.map(row =>
            row.map(value => Number(value))
        );

        return [rules, pages];
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}

function part1(rules: number[][], pages: number[][]) {

    let total: number = 0;

    for (let index = 0; index < pages.length; index++) {

        const page = pages[index];
        console.log('page values', page);
        let valid: boolean = false;

        for (let index = 0; index < rules.length; index++) {
            const rule = rules[index];

            let rFirst = rule[0];
            let rSecond = rule[1];
            console.log('rule numbers: ', rFirst, rSecond);

            if (page.includes(rFirst) && page.includes(rSecond)) {
                if (page.indexOf(rFirst) < page.indexOf(rSecond)) {
                    valid = true;
                    console.log('Rule is valid');
                } else {
                    console.log("Page set is invalid");
                    valid = false;
                    break;
                }
            }
        }

        if (valid) {
            total += page[Math.floor(page.length / 2)];
            console.log("page set was valid, adding total: ")
            console.log(total);
        }
    }

    console.log("Part 1: Total - ", total);
}

// function part2(matches: string[]) {
//     console.log("Part 2: ",);
// }

function main() {
    const filePath = 'input.txt';
    // const filePath = "example.txt";

    let [rules, pages] = readFileContents(filePath);
    console.log(rules);
    console.log(pages);
    part1(rules, pages);
}

main();
