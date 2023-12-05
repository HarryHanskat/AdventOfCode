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
total = 0

for index, line in enumerate(input):
    
    # Line setup
    if index != 0 and index != len(input)-1:
        top = input[index-1]
        middle = line
        bottom = input[index+1]
    if index == 0:
        top = ''
        middle = line
        bottom = input[index+1]
    if index == len(input)-1:
        top = input[index-1]
        middle = line
        bottom = ''
    
    
    allNumsPattern = re.findall('[0-999]+', line)
    for num in allNumsPattern:
        for numMatch in re.finditer(num, line):
            # need start and end index +-1 for each number
            exit = False
            for symbol in re.finditer('[^0-9.\n]', line[numMatch.start()-1:numMatch.end()+1]):
                total += int(num)
                exit=True
                break
            if exit:
                break
            for symbol in re.finditer('[^0-9.\n]', top[numMatch.start()-1:numMatch.end()+1]):
                total += int(num)
                exit=True
                break
            if exit:
                break
            for symbol in re.finditer('[^0-9.\n]', bottom[numMatch.start()-1:numMatch.end()+1]):
                total += int(num)
                break
            
    print(index,'\n' ,line, '\n', 'total = ', total)

print('Final total = ', total)