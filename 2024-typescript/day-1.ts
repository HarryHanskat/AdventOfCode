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
        1. Split values into two lists
        2. Sort each list
        3. Calculate difference between values in both list
            - Store diff values in new list
        4. Add up the distances
    
*/

import { readFileSync } from "fs";
const input = readFileSync('./inputs/day-1.txt', 'utf8');

input.split("\n").forEach(function (s) {
    console.log(s);
})