"""
Day 11 challenge
- Start by finding the empty rows and columns.
- Duplicate them to 'expand' the empty space.
"""


with open('2023/day11_input.txt', 'r') as f:
    data = f.read().splitlines()

def expandTheDataPartOne(originalData):
    # Create variable that will hold data after expansion
    expanded_data = []

    # Create variables for x and y.
    # They begin as the size of the overall matrix.
    # We will then use 1 to denote if that line has a # in it and 0 if it doesn't
    x = list(range(len(originalData))) 
    y = list(range(len(originalData[0])))
    space = [x, y]

    # Set all values to 0 for both x and y
    for i, item in enumerate(x):
        x[i] = 0

    for i, item in enumerate(y):
        y[i] = 0

    # Iterate through lines (x axis) and if there's a '#' then the x axis and y axis get's flagged with a 1
    for y_index, line in enumerate(originalData):
        for x_index, character in enumerate(line):
            if character == '#':
                x[x_index] = 1
                y[y_index] = 1

    # Now we have the correct values for the x and y lines that need to be duplicated
    # Iterate through the data by each line
    #   If the corresponding y value == 1, add a variable that will denote inserting a duplicate line at the end of the loop.
    # Iterate through each value on the line
    #   if the x value == 1, then insert a '.' next to it.
    #   Do this until you complete the line 
    for i, y_blank in enumerate(y):
        
        temp_line = list(data[i])
        additional_x_index = 0
        
        for x_index, x_blank in enumerate(x):
            if x_blank == 0:
                temp_line.insert(x_index + additional_x_index,'.')
                additional_x_index += 1
        
        expanded_data.append(temp_line)
        
        if y_blank == 0:
            expanded_data.append(temp_line)

    """Print expanded data onto a single new txt file."""
    # with open('2023/day11_expandedData.txt', 'w') as n_f:
    #     newData = n_f
   
    # for line in expanded_data:
    #     newData.write(''.join(line)+'\n') 

    return expanded_data   


def countPairs(data):
    # Step 1: Get all stars and their indexes, x and y
    stars = []
    total = 0
    for y_index, line in enumerate(data):
        for x_index, character in enumerate(line):
            if character == '#':
              stars.append([y_index, x_index])

    # Step 2: Iterate through all pairs of stars
    possiblePairs = [(a, b) for idx, a in enumerate(stars) for b in stars[idx+1:]]
    for pair in possiblePairs:
        total += abs(pair[1][1] - pair[0][1]) + abs(pair[1][0] - pair[0][0])

    return total


def expandTheDataTwo(originalData):
    # Create variable that will hold data after expansion
    expanded_data = []

    # Create variables for x and y.
    # They begin as the size of the overall matrix.
    # We will then use 1 to denote if that line has a # in it and 0 if it doesn't
    x = list(range(len(originalData))) 
    y = list(range(len(originalData[0])))
    space = [x, y]

    # Set all values to 0 for both x and y
    for i, item in enumerate(x):
        x[i] = 0

    for i, item in enumerate(y):
        y[i] = 0

    # Iterate through lines (x axis) and if there's a '#' then the x axis and y axis get's flagged with a 1
    for y_index, line in enumerate(originalData):
        for x_index, character in enumerate(line):
            if character == '#':
                x[x_index] = 1
                y[y_index] = 1

    x_blanks = []
    y_blanks = []
    # create list of indexes for blanks in x and y axis
    for i, y_blank in enumerate(y):
        if y_blank == 0:
            y_blanks.append(i)
    
    for x_index, x_blank in enumerate(x):
        if x_blank == 0:
            x_blanks.append(x_index) 

    return [x_blanks, y_blanks]

def countPairsTwo(data, blanks):
    # Step 1: Get all stars and their indexes, x and y
    stars = []
    linesToMaximize = 0
    multiple = 999999
    total = 0
    for y_index, line in enumerate(data):
        for x_index, character in enumerate(line):
            if character == '#':
              stars.append([y_index, x_index])

    # Step 2: Iterate through all pairs of stars
    possiblePairs = [(a, b) for idx, a in enumerate(stars) for b in stars[idx+1:]]
    for pair in possiblePairs:
        y_range = [pair[0][0], pair[1][0]]
        x_range = [pair[0][1], pair[1][1]]
        for x_blank in blanks[0]:
            if (x_blank > min(x_range)) and (x_blank < max(x_range)):
                linesToMaximize += 1

        for y_blank in blanks[1]:
            if (y_blank > min(y_range)) and (y_blank < max(y_range)):
                linesToMaximize += 1
                       
        total += abs(pair[1][1] - pair[0][1]) + abs(pair[1][0] - pair[0][0])

    total += linesToMaximize*multiple
    # total -= 82

    return total



newData = expandTheDataPartOne(data)
partOneTotal = countPairs(newData)

blanks = expandTheDataTwo(data)
partTwoTotal = countPairsTwo(data, blanks)

print("Part 1: ", partOneTotal)
print("part 2: ", partTwoTotal)