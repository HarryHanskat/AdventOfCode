/*
    Day 1 - Challenge 1

    input = two lists side by side

    For example:
        3   4
        4   3
        2   5
        1   3
        3   9
        3   3

    
    Steps: 
       xxx Read in the file (pain in my ass)
        1. Split values into two lists
        2. Sort each list
        3. Calculate difference between values in both list
            - Store diff values in new list
        4. Add up the distances
    
*/

import * as fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf8');

let index = 0;
let firstNumbers: number[] = [];
let secondNumbers: number[] = [];

input.split("\n").forEach(function (s) {
    index++
    let temp = s.split("   ");
    firstNumbers.push(+temp[0]);
    secondNumbers.push(+temp[1]);
    // console.log("num1 = ", +temp[0], "num1 = ", +temp[1]);
    // console.log("Difference = ", Math.abs((+temp[0]) - (+temp[1])));

});

firstNumbers.sort();
secondNumbers.sort();

let totalDifference = 0;

for (let index = 0; index < firstNumbers.length; index++) {
    totalDifference += Math.abs((firstNumbers[index] - secondNumbers[index]));
}

console.log("total difference = ", totalDifference);
