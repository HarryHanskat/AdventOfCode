"""
Day 4 challenge 1:
    Figure out which of the numbers you have in your list appear on
    the winning numbers list.
    
    1 Match = one point
    2-* Matches = Each doubles point value of card
    2=2
    3=4
    4=8
    5=16
    6=32
    ...

    What is the sum of points for all the cards?
"""

import re

with open("/Users/harryhanskat/Workspace/AdventOfCode/2023/day4_input.txt") as f:
    data = f.read().splitlines()

total = 0
repeat=[]
for x in data: repeat.append(1)

for i, card in enumerate(data):
    n = card.split('|')
    yourNums = re.findall('\d+',n[0])[1:]
    print('yourNums = ', yourNums)
    winningNums = re.findall('\d+', n[1])
    
    while repeat[0] >= 1:
        total += 1
        index = 1
        for y in yourNums:
            if y in winningNums:
                if 0 <= index < len(repeat):
                    repeat[index] += 1
                else:
                    repeat.append(1)
                index += 1

        repeat[0] -= 1
    repeat.pop(0)

print(total)
