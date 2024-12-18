type Point = { r: number; c: number };

function solveHikingTrails(mapInput: string[]): number {
    const rows = mapInput.length;
    const cols = mapInput[0].length;
    const grid = mapInput.map(row => row.split('').map(ch => parseInt(ch, 10)));

    // Directions for up, down, left, right
    const directions = [
        { dr: -1, dc: 0 },
        { dr: 1, dc: 0 },
        { dr: 0, dc: -1 },
        { dr: 0, dc: 1 }
    ];

    // Memoization cache: For each cell, we store a Set of reachable positions that have height 9
    // We'll store them as strings "r,c" to simplify set operations.
    const memo: (Set<string> | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));

    /**
     * Returns a set of reachable "9" cells from (r, c) following the strict ascent rules.
     * If the cell is itself 9, returns a set containing just itself.
     * Otherwise, returns union of reachable sets from neighbors of height grid[r][c]+1.
     */
    function getReachableNines(r: number, c: number): Set<string> {
        if (memo[r][c] !== null) {
            return memo[r][c]!;
        }

        const currentHeight = grid[r][c];

        // If this cell is height 9, it directly leads to itself
        if (currentHeight === 9) {
            const result = new Set<string>();
            result.add(`${r},${c}`);
            memo[r][c] = result;
            return result;
        }

        // Otherwise, find neighbors with height currentHeight+1
        const result = new Set<string>();
        const nextHeight = currentHeight + 1;
        for (const { dr, dc } of directions) {
            const nr = r + dr, nc = c + dc;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            if (grid[nr][nc] === nextHeight) {
                const subSet = getReachableNines(nr, nc);
                for (const pos of subSet) {
                    result.add(pos);
                }
            }
        }

        memo[r][c] = result;
        return result;
    }

    // Identify all trailheads (cells with height 0)
    const trailheads: Point[] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 0) {
                trailheads.push({ r, c });
            }
        }
    }

    // For each trailhead, compute the number of reachable unique "9" positions
    let totalScore = 0;
    for (const th of trailheads) {
        const nineSet = getReachableNines(th.r, th.c);
        totalScore += nineSet.size;
    }

    return totalScore;
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
    const result = solveHikingTrails(data);
    console.log("Sum of scores of all trailheads:", result);
}

main();
