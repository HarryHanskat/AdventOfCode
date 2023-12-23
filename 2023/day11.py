"""
Day 11 challenge
- Start by finding the empty rows and columns.
- Duplicate them to 'expand' the empty space.
"""


with open('2023/day11_input.txt', 'r') as f:
    data = f.read().splitlines()

x = list(range(len(data))) 
y = list(range(len(data[0])))
space = [x, y]



for x_index, line in enumerate(data):
    continue