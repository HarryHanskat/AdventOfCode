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
    // 
    // index=       0123456789...
    // example.txt  2333133121414131402
    // 00...111...2...333.44.5555.6666.777.888899
    //
    // compression =
    // 00998111888277733364465555666.............
    //0099811188827773336446555566-1-1-1-1-1-1-1-1-1-1-1-1-1-1
    //
    // note: Each cell represents its own integer, so once you pass 9, you
    // 10, 11, 12, etc.

    // index 0, 2, 4, 6, 8, 10 ... are data values
    // index 1, 3, 5, 7, 9, 11 ... are empty blocks

    const fileData: number[] = [];
    let n: number = 1;
    let emptyBlocks: number = 0;

    for (let index = 0; index < data.length; index++) {
        const element = Number(data[index]);

        if (index == 0) {
            for (let z = 0; z < element; z++) {
                fileData.push(0);
            }
            continue;
        }

        if (index % 2 == 0) {
            for (let i = 0; i < element; i++) {
                fileData.push(n);
            }
            n++;
        } else {
            for (let x = 0; x < element; x++) {
                fileData.push(-1);
                emptyBlocks++;
            }
        }
    }
    console.log(data);
    console.log(fileData);
    // Now we take the fileData and 'compress' it.
    //   take the last non-empty digit (!= -1)
    //  replace the first empty space with that digit
    //  replace digit taken with '-1'

    for (let index = 1; index < emptyBlocks + 1; index++) {

        let i: number = fileData.length - index;
        let endVal: number = fileData[i];

        if (endVal != -1) {

            let idx = fileData.indexOf(-1);

            if (idx !== -1) {
                fileData[idx] = endVal;
            }

            fileData[i] = -1;

        }

    }

    let checkSum: number = 0;
    for (let x = 0; x < fileData.indexOf(-1); x++) {
        checkSum += fileData[x] * x;
    }

    console.log(fileData);
    console.log("CheckSum ", checkSum);
}

function main() {
    const filePath = 'input.txt';
    // const filePath = "example.txt";

    let data: string = readFileContents(filePath);
    part1(data);
}

main();
