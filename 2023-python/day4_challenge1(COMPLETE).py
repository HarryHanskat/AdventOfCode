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

for i, card in enumerate(data):
    n = card.split('|')
    yourNums = re.findall('\d+',n[0])[1:]
    winningNums = re.findall('\d+', n[1])

    matches = 0
    for y in yourNums:
        if y in winningNums:
            matches += 1

    if matches == 1:
        total += 1
    elif matches == 0:
        pass
    else:
        total += pow(2, matches-1)

print(total)
