//day 12

import * as fs from "fs";

// Need to find the area and perimeter around each unique section of letters
// How would we determine the perimeter value for each item?
// if it's on the edge it would have 1 perimeter value.
// ex.
//  AAADDD
//  ACDFFD
//  AAASSS
// here the value for the 2nd A would have 1 perimeter point for the top, and one for the bottom
// It's essentially just the value of how many open spaces around the letter there are.
// The most a given letter could have would be 4.
//
//  x 
// xAx
//  x
//  
// Okay so how do we figure out the unique areas we need to look at?
// Obviously it's sections that aren't touching...
// What does it mean to not be touching?
// - there isn't another of the same character in x+1 x-1 or y+1 y-1
// - So I should start with a unique character, then check if there's a match next to it
// - I'll keep matching, storing each value in an array.
// - I'll also need to check off which values have been counted already.
//
// NOTE: Not all lines are the same length

function part1(data: string[]) {

    let total: number = 0;

    for (let y = 0; y < data.length; y++) {
        // Can change characters to a period after verifying they're part of the current group
        let currentGroup: number = 0;
        let currentPerimeter: number = 0;
        let currentLetter: string = "";

        for (let x = 0; x < data[y].length; x++) {
            let regex = /[A-Z]/g;
            const line = data[y];
            let matches = Array.from(line.matchAll(regex));
            currentLetter = matches[0][0];

            console.log("Matches", currentLetter);

        }
    }

    console.log(data);
}

function readFileContents(filePath: string): string[] {
    try {
        const data: string = fs.readFileSync(filePath, "utf8");

        let lines: string[] = data.split('\n');
        lines.pop();
        return lines;

    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}

function main() {
    // const filePath = 'input.txt';
    const filePath = "example.txt";

    let data: string[] = readFileContents(filePath);
    part1(data);
}

main();
