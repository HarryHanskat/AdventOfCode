"""
Day 6 - Challenge 1

trying to get a toy boat to go as far as possible
Press to charge, 
Release to allow boat to move

Longer charge = farther movement however it takes time to charge

--Input--
Time:       7   15  30
Distance:   9   40  200

Every milisecond you hold to charge increases move speed by 1

examples: Time = 7 Dist = 9 
Charge for 1 millisecond
Has 6 milliseconds to move at 1 distance per ms.
    - total = 6

Charge for 2 ms.
Has 5 ms to move 2 distance per ms.
    - total = 10
    This would pass and count toward the total

Solution = multiply all number of ways to beat each race
"""

import re
from functools import reduce

with open('day6_input.txt', 'r') as f:
    data = f.read().splitlines()

times = data[0].split()[1:]
distances = data[1].split()[1:]

totals = []
for index in range(len(times)):
    time = int(times[index])
    distance = int(distances[index])

    racesWon = 0
    for x in range(time):
        runtime = time - x
        if x * runtime > distance:
            racesWon += 1
    
    totals.append(racesWon)

print(reduce(lambda x, y: x*y, totals))