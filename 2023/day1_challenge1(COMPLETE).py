"""
Day 1 - Challenge 1 (COMPLETE)

Get a string text that contains characters and numbers
Take the first and last number in the string that will create your two digit number x
Add x to a 'total' variable and the 'total' at the end is the answer

"""

from pathlib import Path
import re

p = Path(__file__).with_name('day1_Input.txt')
with p.open('r') as f:
    input = f.readlines()

total = 0

for line in input:
    text = re.sub("[^0-9]", "", line)
    total += int(text[0] + text[-1])

print(total)