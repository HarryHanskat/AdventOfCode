// Day4 - Find XMAS

import * as fs from "fs";

function findXMAS(data: string[]): number {
    // Can appear vertically, horizontally, diagonally, left->right, right->left

    let total = 0;
    for (let index = 0; index < data.length; index++) {

        const currentLine = data[index];
        for (let i = 0; i < currentLine.length; i++) {
            if (currentLine[i] === 'X') {
                if (i <= data.length - 4) {
                    if (checkForward(currentLine, i)) { total++; }
                }
                if (i >= 3) {
                    if (checkBackward(currentLine, i)) { total++; }
                }
                if (index <= data.length - 4) {
                    if (checkVerticallyDown(data.slice(index, index + 4), i)) { total++; }
                    if (i <= data.length - 4) {
                        if (checkDiagonallyDownRight(data.slice(index, index + 4), i)) { total++; }
                    } if (i >= 3) {
                        if (checkDiagonallyDownLeft(data.slice(index, index + 4), i)) { total++; }
                    }
                }
                if (index >= 3) {
                    if (checkVerticallyUp(data.slice(index - 3, index + 1), i)) { total++; }
                    if (i <= data.length - 4) {
                        if (checkDiagonallyUpRight(data.slice(index - 3, index + 1), i)) { total++; }
                    }
                    if (i >= 3) {
                        if (checkDiagonallyUpLeft(data.slice(index - 3, index + 1), i)) { total++; }
                    }
                }

            }

        }
    }
    return total;
}

function checkForward(line: string, index: number): boolean {
    try {
        if (line.slice(index, index + 4) == "XMAS") {
            console.log("checkForward");
            return true;
        }
    } catch (error) {
        console.log("checkForward: Out of bounds error... probably");
        console.log(line, index);
    }

    return false;
}

function checkBackward(line: string, index: number): boolean {
    try {
        if (line.slice(index - 3, index + 1) == "SAMX") {
            console.log("checkBackward");
            return true;
        }
    } catch (error) {
        console.log("checkBackward: Out of bounds error... probably")
        console.log(line, index)
    }

    return false;
}

function checkVerticallyDown(lines: string[], index: number): boolean {
    try {
        let concatedChars = lines[0].charAt(index) + lines[1].charAt(index) + lines[2].charAt(index) + lines[3].charAt(index);
        if (concatedChars == "XMAS") {
            console.log("checkVerticallyDown");
            return true;
        }
    } catch (error) {
        console.log("checkVerticallyDown: Out of bounds error ... probably")
        console.log(lines, index);
    }

    return false;
}

function checkVerticallyUp(lines: string[], index: number): boolean {
    try {
        let concatedChars = lines[0].charAt(index) + lines[1].charAt(index) + lines[2].charAt(index) + lines[3].charAt(index);
        if (concatedChars == "SAMX") {
            console.log("checkVerticallyUp");
            return true;
        }
    } catch (error) {
        console.log("checkVerticallyUp: Out of bounds error ... probably");
        console.log(lines, index);
    }

    return false;
}

function checkDiagonallyUpLeft(lines: string[], index: number): boolean {
    try {
        let concatedChars = lines[0].charAt(index - 3) + lines[1].charAt(index - 2) + lines[2].charAt(index - 1) + lines[3].charAt(index);
        if (concatedChars == "SAMX") {
            console.log("checkDiagonallyUpLeft");
            return true;
        }
    } catch (error) {
        console.log("checkDiagonallyUpLeft: Out of bounds error ... probably");
        console.log(lines, index)
    }

    return false;
}

function checkDiagonallyUpRight(lines: string[], index: number): boolean {
    try {
        let concatedChars = lines[0].charAt(index + 3) + lines[1].charAt(index + 2) + lines[2].charAt(index + 1) + lines[3].charAt(index);
        if (concatedChars == "SAMX") {
            console.log("checkDiagonallyUpRight");
            return true;
        }
    } catch (error) {
        console.log("checkDiagonallyUpRight: Out of bounds error ... probably");
        console.log(lines, index);
    }

    return false;
}

function checkDiagonallyDownLeft(lines: string[], index: number): boolean {
    try {
        let concatedChars = lines[0].charAt(index) + lines[1].charAt(index - 1) + lines[2].charAt(index - 2) + lines[3].charAt(index - 3);
        if (concatedChars == "XMAS") {
            console.log("checkDiagonallyDownLeft");
            return true;
        }
    } catch (error) {
        console.log("checkDiagonallyDownLeft: Out of bounds error ... probably");
        console.log(lines, index);
    }

    return false;
}

function checkDiagonallyDownRight(lines: string[], index: number): boolean {
    try {
        let concatedChars = lines[0].charAt(index) + lines[1].charAt(index + 1) + lines[2].charAt(index + 2) + lines[3].charAt(index + 3);
        if (concatedChars == "XMAS") {
            console.log("checkDiagonallyDownRight");
            return true;
        }
    } catch (error) {
        console.log("Out of bounds error ... probably")
    }

    return false;
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

function part1(data: string[]) {
    console.log("Part 1: Total - ", findXMAS(data));
}

function part2(matches: string[]) {
    console.log("Part 2: ",);
}

function main() {
    const filePath = 'input.txt';
    //const filePath = "example.txt";

    const fileContent: string[] = readFileContents(filePath);

    part1(fileContent);
}

main();
