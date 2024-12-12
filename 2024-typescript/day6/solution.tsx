//day 6

import * as fs from "fs";

// If there is something directly in front of you, turn right 90 degrees.
// Otherwise, take a step forward.

// map = string[][]
// # = immovable object, if ran into, turn right and move along
// guard(position, direction)
// I'm just gonna write it now

function readFileContents(filePath: string): string[][] {
    try {
        const data: string = fs.readFileSync(filePath, "utf8");
        let lines: string[] = data.split('\n');
        let map: string[][] = lines.map((line) => line.split(''));
        map.pop();
        return map;
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}

function part1(map: string[][]) {

    let guardLocation: number[] = [0, 0];
    let guardDirection: string = "up";
    let totalBlocks: number = 1;

    for (let index = 0; index < map.length; index++) {
        const line = map[index];

        if (line.includes("^")) {
            guardLocation = [index, line.indexOf("^")];
            map[guardLocation[0]][guardLocation[1]] = 'X';
        }
    }

    try {
        while (guardLocation[0] <= map[0].length && guardLocation[0] >= 0
            && guardLocation[1] <= map.length && guardLocation[1] >= 0) {

            if (guardDirection == 'up') {
                if (map[guardLocation[0] - 1][guardLocation[1]] == '#') {
                    guardDirection = 'right';
                    continue;
                } else {
                    guardLocation[0] -= 1;
                }

            } else if (guardDirection == 'down') {
                if (map[guardLocation[0] + 1][guardLocation[1]] == '#') {
                    guardDirection = 'left';
                    continue;
                } else {
                    guardLocation[0] += 1;
                }

            } else if (guardDirection == 'right') {
                if (map[guardLocation[0]][guardLocation[1] + 1] == '#') {
                    guardDirection = 'down';
                    continue;
                } else {
                    guardLocation[1] += 1;
                }

            } else if (guardDirection == 'left') {
                if (map[guardLocation[0]][guardLocation[1] - 1] == '#') {
                    guardDirection = 'up';
                    continue;
                } else {
                    guardLocation[1] -= 1;
                }

            }

            if (map[guardLocation[0]][guardLocation[1]] == '.') {
                map[guardLocation[0]][guardLocation[1]] = 'X';
                totalBlocks += 1;
            }

        }

    } catch (TypeError) {
        console.log('out of bounds');
    }

    map.forEach(line => console.log(line));
    console.log("Part 1: Total - ", totalBlocks);
}

// function part2(matches: string[]) {
//     console.log("Part 2: ",);
// }

function main() {
    const filePath = 'input.txt';
    // const filePath = "example.txt";

    let map = readFileContents(filePath);
    part1(map);
}

main();
