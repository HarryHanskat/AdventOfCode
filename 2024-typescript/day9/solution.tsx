//day 9

import * as fs from "fs";

function readFileContents(filePath: string): string {
    try {
        const data: string = fs.readFileSync(filePath, "utf8");

        return data;

    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}


function part1(data: string) {

    // Starting with first number then alternating
    //   ex. 12345
    //   0..111....22222
    // note: Each cell represents its own integer, so once you pass 9, you
    // 10, 11, 12, etc.

    // index 0, 2, 4, 6, 8, 10 ... are data values
    // index 1, 3, 5, 7, 9, 11 ... are empty blocks

    const fileData: number[] = [];

    for (let index = 0; index < data.length; index++) {
        const element = Number(data[index]);

        if (index == 0) {

        }


    }
    console.log(data);
}

function main() {
    // const filePath = 'input.txt';
    const filePath = "example.txt";

    let data: string = readFileContents(filePath);
    part1(data);
}

main();
