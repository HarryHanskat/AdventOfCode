"""
Day 9 Challenge 1

"""


from more_itertools import locate
import numpy as np
from itertools import cycle
import math
  
###### Data Setup ######
with open('day9_input.txt', 'r') as f:
    data = f.read().splitlines()


def challenge1():
    total = 0
    for line in data:
        setExtrapolation = []

        set = [line.split()]
        for i, l in enumerate(set):
            tempLine = []
            for i, num in enumerate(l):
                try:
                    difference = abs(int(num) - int(l[i+1]))
                except:
                    difference = 0
                tempLine.append(difference)
            
            set.append(tempLine)
            
            try:
                setExtrapolation.append(tempLine[len(tempLine)-1])
            except:
                print("OOB error, End of set reached without finding all zeros")
                print("Line responsible = ", line)
                total += int(setExtrapolation)
                break

            arr = np.array(tempLine)

            if np.all((arr == 0)) :
                
                break

    return(total)


print("Challenge1: ", challenge1())