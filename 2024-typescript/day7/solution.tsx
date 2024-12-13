//day 7

import * as fs from "fs";

// The test value appears before the colon on each line; 
// it is your job to determine whether the remaining numbers 
// can be combined with operators to produce the test value.

function readFileContents(filePath: string): [number[], number[][]] {
    try {
        const data: string = fs.readFileSync(filePath, "utf8");
        let lines: string[] = data.split('\n');
        lines.pop();

        let testValues: number[] = [];
        let numbers: number[][] = [];

        for (const line of lines) {
            // Split into two parts based on the first ':'
            const [left, right] = line.split(':');

            // Trim and parse the left side
            const testValue = Number(left.trim());
            testValues.push(testValue);

            // Split the right side by spaces and map them to numbers
            const rightValues = right.trim().split(' ').map(num => Number(num));
            numbers.push(rightValues);
        }

        return [testValues, numbers];

    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}

// Function to generate all operator combinations for n-1 slots
function generateOperatorCombinations(length: number): string[][] {
    // length corresponds to the number of operators needed
    // Each operator slot can be '+' or '*'
    // Example: if length = 2, return [['+', '+'], ['+', '*'], ['*', '+'], ['*', '*']]
    const results: string[][] = [];

    function backtrack(current: string[]) {
        if (current.length === length) {
            results.push([...current]);
            return;
        }
        current.push('+');
        backtrack(current);
        current.pop();

        current.push('*');
        backtrack(current);
        current.pop();
    }

    backtrack([]);
    return results;
}

// Function to evaluate a sequence of numbers given a pattern of operators (left-to-right)
function evaluateExpression(nums: number[], ops: string[]): number {
    let result = nums[0];
    for (let i = 0; i < ops.length; i++) {
        const op = ops[i];
        const nextNum = nums[i + 1];
        if (op === '+') {
            result = result + nextNum;
        } else {
            // op === '*'
            result = result * nextNum;
        }
    }
    return result;
}


function part1(testValues: number[], numbersList: number[][]) {

    // Step 2 & 3: Check each line to see if it can produce the test value
    let sumOfSolvableTestValues = 0;

    for (let i = 0; i < testValues.length; i++) {
        const testVal = testValues[i];
        const nums = numbersList[i];

        if (nums.length === 1) {
            // If there's only one number, just compare directly
            if (nums[0] === testVal) {
                sumOfSolvableTestValues += testVal;
            }
            continue;
        }

        const operatorCombinations = generateOperatorCombinations(nums.length - 1);
        let foundSolution = false;

        for (const ops of operatorCombinations) {
            const result = evaluateExpression(nums, ops);
            if (result === testVal) {
                foundSolution = true;
                break;
            }
        }

        if (foundSolution) {
            sumOfSolvableTestValues += testVal;
        }
    }

    // Step 4: Output the result
    console.log("Sum of solvable test values:", sumOfSolvableTestValues);
}

function main() {
    const filePath = 'input.txt';
    // const filePath = "example.txt";

    let [testValues, numbers] = readFileContents(filePath);
    part1(testValues, numbers);
}

main();
