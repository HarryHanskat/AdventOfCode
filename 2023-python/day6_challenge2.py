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

with open('day6_input.txt', 'r') as f:
    data = f.read().splitlines()

times = data[0].split()[1:]
distances = data[1].split()[1:]

time = int(''.join(times))
distance = int(''.join(distances))

lowestWin = 0
low = False
highestWin = distance
high = False

for lowIndex in range(time):
    runtime = time - lowIndex
    if lowIndex * runtime > distance:
        lowestWin == lowIndex
        break

for highIndex in range(time):
    highIndex = time-highIndex
    runtime = time-highIndex
    if highIndex * runtime > distance:
        highestWin == highIndex
        break 

print(highIndex - lowIndex+1)