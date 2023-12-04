"""
Day 3 Challenge 1
Find the sum of the part numbers
- a part number is a number that is adjacent to a symbol
- The symbol can be directly next to on the same line
- Or it can even be in the line before and after to count as 'adjacent'
- periods do not count as symbols
"""

import re

with open("/Users/harryhanskat/Workspace/AdventOfCode/2023/day3_input.txt") as f:
    input = f.read().splitlines()

# Get line 1 2 and 3 above, middle, below since we need to check all

# Each line is the same length

# Start by iterating through each line
for line in input:
    nextNumPattern = re.findall('[0-999]+', line)
    for num in nextNumPattern:
        for match in re.finditer(num, line):
            print(line.index())


        # need start and end index +-1 for each number



    
