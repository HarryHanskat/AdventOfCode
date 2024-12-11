// Day3 - Mull it overflow
//
// Find the 'mul(x,x)' occurrances in the text file
// - example
// xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
// - should result in mul(2,4), mul(5,5), mul(11,8), mul(8,5)
// - Which equals 2*4 + 5*5 + 11*8 + 8*5 = 161

import * as fs from "fs";

function readFileContents(filePath: string): string {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}

function parseOutJunkData(line: string): string[] {
    //const mulMatch = /mul\([1-9][0-9]*,[1-9][0-9]*\)/g;
    const part2Match = /(mul)\((\d{1,3}),(\d{1,3})\)|(do)\(\)|(don't)\(\)/g;
    const matches = line.match(part2Match);

    if (matches) {
        console.log("Matches found: ", matches);
        return matches;
    } else {
        console.log("No matches found.");
    }
    return ["shit broke"];
}

function multiply(muls: String[]): number {
    let total = 0;
    muls.forEach(function (mul) {
        const numMatch = /[1-9][0-9]*/g;
        let nums: number[] = mul.match(numMatch);
        console.log(nums);
        let totalMul = +nums[0] * +nums[1];
        total += totalMul;
    });
    return total;
}

function multiplyPart2(muls: String[]): number {
    let total = 0;
    let doIt: boolean = true;
    muls.forEach(function (mul) {
        const numMatch = /[1-9][0-9]*/g;
        const doMatch = /(do)\(\)/g;
        const dontMatch = /(don't)\(\)/g;

        if (mul[0] == "m" && doIt) {
            let nums: number[] = mul.match(numMatch);
            console.log(nums);
            let totalMul = +nums[0] * +nums[1];
            total += totalMul;
        } else {
            if (mul.match(doMatch)) {
                doIt = true;
                return;
            } else {
                doIt = false;
            }
        }
    });
    return total;
}

function part1(matches: String[]) {
    console.log(matches);
    console.log("Part 1: Total mul() - ", multiply(matches));
}

function part2(matches: String[]) {
    console.log("Part 2: ", multiplyPart2(matches));
}

function main() {
    const filePath = 'input.txt';
    //const filePath = "example2.txt";

    const fileContent: string = readFileContents(filePath);
    const matches: String[] = parseOutJunkData(fileContent);

    //part1(matches);
    part2(matches);
}

main();
