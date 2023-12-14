"""
Day 8 challenge 1
You need to follow the steps given and use the letter combinations to get to the
zzz combo at the end.

You aren't done until you get to the ZZZ combo of letters.
This may involve repeating the series of steps before you get there.

You're given a letter combo and it's corresponding pair that will lead you to the ZZZ combo.
ex. AAA = (BBB, CCC)

RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)

1. loop that iterates over all steps and doesn't stop looping until ZZZ is found.
    - should probably give up after 30 seconds or so.

2. 
    - Take next given step
    - Find corresponding key (if just starting use the first key)
    - Use step to find next key
    - repeat until ZZZ is found
"""

import re

with open('2023/day8_input.txt', 'r') as f:
    data = f.read().splitlines()

outFile = open('2023/attempt_out.txt', 'w')

steps = data[0]
data.pop(0)
data.pop(0)

keys = [line.split(None, 2)[0] for line in data]

directions = []
for line in data:
    out = line.split(None, 2)[2].split()
    out[0] = out[0].strip('(,)')
    out[1] = out[1].strip('(,)')
    directions.append(out)

handsPlayed = dict(zip(keys, directions))

initKey = keys[0]
pattern = 'AAA'
totalSteps = 0
while pattern != 'ZZZ':
    for i, step in enumerate(steps):
    
        direction = directions[keys.index(pattern)]
        
        if step == 'L':
            pattern = direction[0]
        else:
            pattern = direction[1]
        totalSteps += 1

        outFile.write('step = '+str(totalSteps)+'node = '+(pattern)+'\n')
        if pattern == 'ZZZ':
            print('End Found! It took :', totalSteps, 'steps')
            break

    if int(totalSteps) > 21000:
        break
    if pattern == 'ZZZ':
        print('End Found! It took :', totalSteps, 'steps')
        break
    

        