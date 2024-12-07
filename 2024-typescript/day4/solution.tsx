// Day4 - Find XMAS

import * as fs from "fs";

function findXMAS(data: string[]): number {
    // Can appear vertically, horizontally, diagonally, left->right, right->left
    for (let index = 0; index < data.length; index++) {

        const currentLine = data[index];
        let indices = [];
        for (let i = 0; i < currentLine.length; i++) {
            if (currentLine[i] === 'X') indices.push(i);
        }

        // XMAS = 4 characters
        // if we're on line 0 we need to check down to line 3
        // if we're on line 3 we need to check up to line 0 AND down to line 6
        // Basically need to check line-3: line: line+3
        // Then we need to cover diagonally
        // so we need to look at 
        // [line-1][column-1] && [line+1][column-1] && [line+1][column+1] && [line+1][column-1]
        // then [line+2][column+2] etc...
        // 
        // Can narrow things down by checking for exact characters.
        // if current = 'A' then check lines +- 1; 
        // if line +1 | -1 = S then keep checking.
        //
        // Actually, can't we just check for the letter X? And search from there?

    }
    return 0;
}

function findIndices(line: string): number[] {
    // let indices = [];

    // for (let i = 0; i < currentLine.length; i++) {
    //     if (currentLine[i] === 'X') indices.push(i);
    // }
    // return indices;
    return [0];
}

function readFileContents(filePath: string): string[] {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const lines = data.trim().split('\n');
        console.log(data);
        return lines;
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}

function part1(matches: string[]) {
    console.log(matches);
    console.log("Part 1: Total mul() - ",);
}

function part2(matches: string[]) {
    console.log("Part 2: ",);
}

function main() {
    //const filePath = 'input.txt';
    const filePath = "example.txt";

    const fileContent: string[] = readFileContents(filePath);

    //part1(matches);
}

main();
