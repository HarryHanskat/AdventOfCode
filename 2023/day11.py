"""
Day 11 challenge
- Start by finding the empty rows and columns.
- Duplicate them to 'expand' the empty space.
"""


with open('2023/day11_sample_input.txt', 'r') as f:
    data = f.read().splitlines()

# Create variable that will hold data after expansion
expanded_data = []

# Create variables for x and y.
# They begin as the size of the overall matrix.
# We will then use 1 to denote if that line has a # in it and 0 if it doesn't
x = list(range(len(data))) 
y = list(range(len(data[0])))
space = [x, y]

# Set all values to 0 for both x and y
for i, item in enumerate(x):
    x[i] = 0

for i, item in enumerate(y):
    y[i] = 0

# Iterate through lines (x axis) and if there's a '#' then the x axis and y axis get's flagged with a 1
for y_index, line in enumerate(data):
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

with open('2023/day11_expandedData.txt', 'w') as n_f:
    newData = n_f
    for line in expanded_data:
        newData.write(''.join(line)+'\n') 


    
print(newData)