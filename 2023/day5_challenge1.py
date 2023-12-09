"""
Day 5 - Challenge 1
 - Input:
    List of seeds
 - Variety of Maps to convert seeds to other types
    ex. Seed to Soil -> soil to fertilizer -> fertilizer to water -> water to light... etc.
 - Maps contain numbers that define how the conversion should happen
    3 numbers -> destination range start, source range start, range length
###
    seeds: 79 14 15 13
    
    seed-to-soil map: 
        (destination range start, source range start, range length)
        50 98 2
            seed 98 = soil 50
            seed 99 = soil 51
        52 50 48
            seed 50 = soil 52
            seed 51 = soil 53
            seed 52 = soil 54
            ...
            seed 97 = soil 99
        unmapped
            seed 14 = seed 14
            seed 15 = seed 15
            etc.
    
    output:
        seed 79 = soil 81
        seed 14 = soil 14
        seed 15 = soil 15
        seed 13 = soil 13

    soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15

    output:
        soil 81 = fertilizer 81
        soil 14 = fertilizer 53


Goal: Find the lowest 'location' number (final map) out of the list of seeds provided
"""

import re

with open("/Users/harryhanskat/Workspace/AdventOfCode/2023/day5_input.txt") as f:
    data = f.read().splitlines()

# Break out into variables for each map
seeds = data[0].split(' ')[1:]
print('seeds = ', seeds)

maps = list(filter(None, data))[1:]

seedsUpdated = seeds.copy()

for line in maps:
    if re.findall('[A-z]', line):
        seeds = seedsUpdated.copy()
        print(line, '\n')
        continue

    print(line)
    d, s, l = int(line.split()[0]), int(line.split()[1]), int(line.split()[2])
    for index,seed in enumerate(seeds):
        if index == 1:
            pass
        tempSeed = int(seed)
        if tempSeed in range(int(s), int(s)+int(l)):
            i = tempSeed-s
            temp = d+i
            seedsUpdated[index] = temp

seeds = seedsUpdated.copy()
        
print(seeds, '\n', 'min = ', min(seeds))