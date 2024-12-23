//day 11

import * as fs from "fs";


// Example: 0 1 10 99 999
//
//
// Rules:
// If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
// 
// If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. 
//   The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
// 
// If none of the other rules apply, the stone is replaced by a new stone; 
//   the old stone's number multiplied by 2024 is engraved on the new stone.

function part1(data: number[]) {

    let newNumbers: number[] = [...data];
    let blinks: number = 75;

    for (let b = 0; b < blinks; b++) {
        let tempNums: number[] = [];

        for (let index = 0; index < newNumbers.length; index++) {
            if (newNumbers[index] == 0) {
                tempNums.push(1);
            } else if (newNumbers[index] == 1) {
                tempNums.push(2024);
            } else if (newNumbers[index].toString().length % 2 == 0) {
                let str = newNumbers[index].toString();
                let midpoint = str.length / 2;
                let leftNum = str.slice(0, midpoint);
                let rightNum = str.slice(midpoint);

                tempNums.push(parseInt(leftNum, 10));
                tempNums.push(parseInt(rightNum, 10));
            } else {
                tempNums.push(newNumbers[index] * 2024);
            }
        }

        newNumbers = [...tempNums];
        // console.log("New Numbers after", blinks, "blinks\n", newNumbers);
    }

    console.log("Number of Stones =", newNumbers.length, ". After,", blinks, "blinks")

}

function readFileContents(filePath: string): number[] {
    try {
        const data: string = fs.readFileSync(filePath, "utf8");

        let lines: string[] = data.split(' ');
        let numLines: number[] = lines.map(Number);
        return numLines;

    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}

function main() {
    const filePath = 'input.txt';
    // const filePath = "example.txt";

    let data: number[] = readFileContents(filePath);
    part1(data);
}

main();
