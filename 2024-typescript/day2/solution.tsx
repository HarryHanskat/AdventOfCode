/*
 * Day 2
 */

import {promises as fs} from 'fs';

async function readFileContents(filePath: string): Promise<string> {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return data;
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}

// I want this structure [[1, 2, 3, 4, 5][4, 2, 3, 4]]
// Let's juts start basic so I don't waste too much time    
// used chat gippity here, would like to understand this better
function parseData(data: string): number[][] {
    const lines = data.trim().split('\n');

    const numberArrays: number[][] = lines.map((line, index) => {
        const numberStrings =  line.trim().split(' ');

        const numbers = numberStrings.map((numStr, numIndex) => {
            const num = Number(numStr);
            if (isNaN(num)) {
                throw new Error(`Invalid number at line ${index + 1}, position ${numIndex + 1}: "${numStr}"`);
            }
            return num;
        });
        return numbers;
    });
    return numberArrays;
}

function isReportSafe(report: number[], tolerance: number): boolean {
    // Rules
    //  - numbers are all increasing or decreasing
    //  - any two adjacent numbers differ by at least one and at most 3
    //      if (abs(num1 - num2) >= 1 and abs(num1 - num2) <= 3)
    let ascending: boolean = false;
    let descending: boolean = false;

    if (report[0] === report[1]){  
        if (tolerance == 0) {
            return false;
        }
        tolerance -= 1;
        report.splice(0, 0);
    } else if (report[0] < report[1]) {
        ascending = true;
    } else {
        descending = true;
    }

    let elements = report.slice();

    for (let index = 1; index < elements.length; index++) {
        const element1 = elements[index];
        const element2 = elements[index + 1];

        if (element1 == element2){
            if (tolerance == 0) {
                return false;
            }
            tolerance -= 1;
            elements.splice(index+1, 1);
            index -= 1;
            continue;
        } else if (Math.abs(element1 - element2) > 3) {
            if (tolerance == 0) {
                return false;
            }
            tolerance -= 1;
            elements.splice(index+1, 1);
            index -= 1;
            continue;
        } 

        if (element1 > element2 && ascending) {
            if (tolerance == 0) {
                return false;
            }
            tolerance -= 1;
            elements.splice(index+1, 1);
            index -= 1;
            continue;
        } else if (element1 < element2 && descending) {
            if (tolerance == 0) {
                return false;
            }
            tolerance -= 1;
            elements.splice(index+1, 1);
            index -= 1;
            continue;
        }
    }

    return true;
}

function numberOfSafeReports(parsedData: number[][], tolerance: number): number {
    let total = 0;
    parsedData.forEach(function (report) {
        if (isReportSafe(report, tolerance)) {
            console.log(true);
            total++;
        } else {
            console.log(false);
        }
    });
    
    return total;
}

function part1(numbersList: number[][]) {
    try {
        console.log('Part 1: Total number of safe reports - ', numberOfSafeReports(numbersList, 0));
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function part2(numbersList: number[][]) {
    try {
        console.log('Part 2: ', numberOfSafeReports(numbersList, 1));
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function main() {
    const filePath = 'input.txt' 
    ///const filePath = 'example.txt'
    
    const fileContent = await readFileContents(filePath);
    const numbersList: number[][] = parseData(fileContent);

    part1(numbersList);
    part2(numbersList);
}

main();
