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

with open("/Users/harryhanskat/Workspace/AdventOfCode/2023/day4_sample_input.txt") as f:
    data = f.read().splitlines()


