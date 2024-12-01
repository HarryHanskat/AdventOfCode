"""
Day 1 - Challenge 2 (IP)

Same as the first challenge except now we need to take into account the words that 
are numbers just spelled out like 'one' 'two' 'four' up to 'nine'.
These should also be counted as valid numbers 

We can search for these words as substrings in each line, 
if it appears we insert the coresponding number in front of the substring within the string
then we continue with the same stripping line we had before.

"""

from pathlib import Path
import re

p = Path(__file__).with_name('day1_Input.txt')
with p.open('r') as f:
    input = f.readlines()

total = 0
nums = {'one':'1', 'two':'2', 'three':'3', 'four':'4', 'five':'5', 
        'six':'6', 'seven':'7', 'eight':'8', 'nine':'9'}

for line in input:
    for number in nums.keys():
        for m in re.finditer(number, line):
            line = line[:m.start()+2] + nums[number] + line[m.start()+2:]
        print(line)
        
    text = re.sub("[^0-9]", "", line)
    print(text)
    print(text[0]+text[-1])
    total += int(text[0] + text[-1])

print(total)