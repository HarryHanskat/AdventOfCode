//day 9
//
// For all practical purposes, this means that a hiking trail is any path 
// that starts at height 0, ends at height 9, and always increases by a height
// of exactly 1 at each step. Hiking trails never include diagonal steps
// - only up, down, left, or right (from the perspective of the map).
//
// example
// ...0...
// ...1...
// ...2...
// 6543456
// 7.....7
// 8.....8
// 9.....9
//
// this trail has one trailhead (0) and a total score of 2


import * as fs from "fs";

function part1(data: string[]) {

    // find occurrence of 0.
    // get point above, below, left, and right
    // if there's a sequential number in one of those spots, follow it.
    //   - will need to store 'fork' value to come back to. I imagine there will
    //     be several layers of 'forking' in this problem
    let numOfZeros: number = 0;

    for (let index = 0; index < data.length; index++) {

        const line: string = data[index];
        const regex = /0/g;
        let zerosArray = Array.from(line.matchAll(regex));

        const zerosMap = new Map<string, number[]>();

        for (const match of zerosArray) {
            const matchedValue = match[0];
            const position = match.index!;

            if (!zerosMap.has(matchedValue)) {
                zerosMap.set(matchedValue, []);
            }

            zerosMap.get(matchedValue)!.push(position);
        }

        console.log(zerosMap);

        // while (zerosArray.length > 0) {
        //
        //     const i: number = zero.index;
        //     let directions: string[] = ['up', 'down', 'left', 'right'];
        //     let [up, down, left, right] = [0, 0, 0, 0];
        //
        //     numOfZeros++;
        //
        //     directions.forEach(direction => {
        //
        //         switch (direction) {
        //             case 'up':
        //                 try {
        //                     up = Number(data[index - 1].charAt(i));
        //                     break;
        //                 } catch (error) {
        //                     console.log('Position ', index, ',', i, " doesn't have a(n)", direction, "direction");
        //                 }
        //             case 'down':
        //                 try {
        //                     down = Number(data[index + 1].charAt(i));
        //                     break;
        //                 } catch (error) {
        //                     console.log('Position ', index, ',', i, " doesn't have a(n)", direction, "direction");
        //                 }
        //             case 'left':
        //                 try {
        //                     left = Number(line.charAt(i - 1));
        //                     break;
        //                 } catch (error) {
        //                     console.log('Position ', index, ',', i, " doesn't have a(n)", direction, "direction");
        //                 }
        //             case 'right':
        //                 try {
        //                     right = Number(line.charAt(i + 1));
        //                     break;
        //                 } catch (error) {
        //                     console.log('Position ', index, ',', i, " doesn't have a(n)", direction, "direction");
        //                 }
        //             default:
        //                 break;
        //         }
        //
        //     });
        //
        //
        //
        //     console.log(`X=${index}, Y=${i}`);
        //     console.log(`Up= ${up}, Down= ${down}, Left= ${left}, Right= ${right} `);
        // }
    }

    console.log("total starting points = ", numOfZeros);
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
