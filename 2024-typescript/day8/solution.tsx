//day 8

import * as fs from "fs";

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


function part1(data: string[]) {

    // find characters individually, get their index
    // search the rest of the map for identical characters, get thier indexes
    // off the difference between the two indexes, add 'antinodes',
    //   if the node is off the screen then don't count it
    //   only skip counting an antinode if there's already one there

    const regex = /[^.]/g;

    const mapBounds: number[] = [data.length - 1, data[0].length - 1];
    console.log('mapBounds = ', mapBounds);

    const charMap = new Map<string, Array<[number, number]>>();

    const antinodes = new Array<[number, number]>;

    for (let index = 0; index < data.length; index++) {
        const line = data[index];

        const matches = [...line.matchAll(regex)];

        for (const match of matches) {
            if (!charMap.has(match[0])) {
                charMap.set(match[0], []);
            }
            charMap.get(match[0])!.push([index, match.index]);
        }

    }

    for (const [char, positions] of charMap) {

        if (positions.length > 1) {

            for (let i = 0; i < positions.length; i++) {
                for (let p = i + 1; p < positions.length; p++) {
                    const [y1, x1] = positions[i];
                    const [y2, x2] = positions[p];

                    const dy = Math.abs(y2 - y1);
                    const dx = x2 - x1;

                    let antinode1y = y1 - dy;
                    let antinode1x = x1 + (dx * -1);
                    let antinode2y = y2 + dy;
                    let antinode2x = x2 + dx;

                    if (isWithinMap([antinode1y, antinode1x], [mapBounds[0], mapBounds[1]])) {
                        const exists = antinodes.some(point => point[0] === antinode1y && point[1] === antinode1x);
                        if (!exists) {
                            antinodes.push([antinode1y, antinode1x]);
                        }
                    }

                    if (isWithinMap([antinode2y, antinode2x], [mapBounds[0], mapBounds[1]])) {
                        const exists = antinodes.some(point => point[0] === antinode2y && point[1] === antinode2x);
                        if (!exists) {
                            antinodes.push([antinode2y, antinode2x]);
                        }
                    }

                }
            }
        }

        console.log('Antinode locations', antinodes);
    }

    //    console.log(charMap);
    console.log(antinodes.length)
}

function isWithinMap(point: [number, number], boundary: [number, number]): boolean {
    const [x, y] = point;
    const [maxX, maxY] = boundary;

    // Check if x is between 0 and maxX, and y is between 0 and maxY
    return x >= 0 && x <= maxX && y >= 0 && y <= maxY;
}

function main() {
    const filePath = 'input.txt';
    // const filePath = "example.txt";

    let data: string[] = readFileContents(filePath);
    part1(data);
}

main();
