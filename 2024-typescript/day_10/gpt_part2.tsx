
type Point = { r: number; c: number };

function solveHikingTrailRatings(mapInput: string[]): number {
    const rows = mapInput.length;
    const cols = mapInput[0].length;
    const grid = mapInput.map(row => row.split('').map(ch => parseInt(ch, 10)));

    const directions = [
        { dr: -1, dc: 0 },
        { dr: 1, dc: 0 },
        { dr: 0, dc: -1 },
        { dr: 0, dc: 1 }
    ];

    // ways[r][c]: number of distinct hiking trails starting at (r,c) that end at any 9 cell.
    const ways: (number | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));

    function countWays(r: number, c: number): number {
        if (ways[r][c] !== null) {
            return ways[r][c]!;
        }

        const currentHeight = grid[r][c];

        // Base case: if height is 9, there is exactly one trail: the cell itself
        if (currentHeight === 9) {
            ways[r][c] = 1;
            return 1;
        }

        // Otherwise, sum ways of neighbors with height = currentHeight + 1
        const nextHeight = currentHeight + 1;
        let total = 0;
        for (const { dr, dc } of directions) {
            const nr = r + dr, nc = c + dc;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            if (grid[nr][nc] === nextHeight) {
                total += countWays(nr, nc);
            }
        }

        ways[r][c] = total;
        return total;
    }

    // Find all trailheads (cells with height 0)
    const trailheads: Point[] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 0) {
                trailheads.push({ r, c });
            }
        }
    }

    // Compute rating for each trailhead and sum them
    let totalRating = 0;
    for (const th of trailheads) {
        totalRating += countWays(th.r, th.c);
    }

    return totalRating;
}

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

function main() {
    const filePath = 'input.txt';
    // const filePath = "example.txt";
    let data: string[] = readFileContents(filePath);
    const result = solveHikingTrailRatings(data);
    console.log("Sum of scores of all trailheads:", result);
}

main();
