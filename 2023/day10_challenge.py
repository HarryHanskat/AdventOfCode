"""
Day 10 - follow the pipes

Start with the letter S. Follow the pipes that connect from there. Find the farthest

Step 1: Find 'S' (Line 108)
Step 2: Find valid pathways from 'S' (2 valid starting points, up and down from S)
            | is a vertical pipe connecting north and south.
            - is a horizontal pipe connecting east and west.
            L is a 90-degree bend connecting north and east.
            J is a 90-degree bend connecting north and west.
            7 is a 90-degree bend connecting south and west.
            F is a 90-degree bend connecting south and east.

        Connection map (based on where pipe is going):
            North: (7, F, |)
            South: (L, J, |)
            East:  (7, J, -)
            West:  (L, F, -)
        
"""
import math
# We want to pass the current location to this function
# it should take the current location, and the direction we are moving in.
# It'll use those vals to find next direction and search for a possible pipe
# if a valid pipe is found:
#   return the new current location, and the direction we are now moving in.
#   (Recursive? Until no next valid pipe?)

#current location = [[Line#][index of current pipe]]
#dir_moving_in = 'n' 'e' 's' or 'w' 
    #if 7 was the last pipe, and we got there by going 'n' then dir_moving_in would be 'w'
def find_next_pipe(current_location, dir_moving_in, length):
    pipe_broken = False
    temp_location = [0, 0]
    pipe = 'S'

    while(pipe_broken == False):
        print('length = ', length, temp_location, dir_moving_in, pipe)
        match dir_moving_in:
            case 'n':
                # Get line above starting, and the same index
                pipe = data[current_location[0]-1][current_location[1]]

                # We're going north so we can match to these three values (7, F, |)
                if (pipe == '7'): 
                    temp_location[0] = current_location[0]-1
                    temp_location[1] = current_location[1]                
                    dir_moving_in = 'w'

                elif (pipe == 'F'):
                    temp_location[0] = current_location[0]-1
                    temp_location[1] = current_location[1]                
                    dir_moving_in = 'e'

                elif (pipe == '|'): 
                    temp_location[0] = current_location[0]-1
                    temp_location[1] = current_location[1]
                    dir_moving_in = 'n'

                else:
                    pipe_broken = True
                    return length

            case 's':
                # Get line above starting, and the same index
                pipe = data[current_location[0]+1][current_location[1]]
                
                # We're going north so we can match to these three values (L, J, |)
                if (pipe == 'J'): 
                    temp_location[0] = current_location[0]+1
                    temp_location[1] = current_location[1]
                    dir_moving_in = 'w'

                elif (pipe == 'L'):
                    temp_location[0] = current_location[0]+1
                    temp_location[1] = current_location[1]
                    dir_moving_in = 'e'

                elif (pipe == '|'): 
                    temp_location[0] = current_location[0]+1
                    temp_location[1] = current_location[1]
                    dir_moving_in = 's'

                else:
                    pipe_broken = True
                    return length

            
            case 'e':
                # Get line above starting, and the same index
                #TODO Try catch for out of bounds lines and pipes

                pipe = data[current_location[0]][current_location[1]+1]
                
                # We're going north so we can match to these three values (7, J, -)
                if (pipe == '7'): 
                    temp_location[0] = current_location[0]
                    temp_location[1] = current_location[1]+1
                    dir_moving_in = 's'

                elif (pipe == 'J'):
                    temp_location[0] = current_location[0]
                    temp_location[1] = current_location[1]+1
                    dir_moving_in = 'n'

                elif (pipe == '-'): 
                    temp_location[0] = current_location[0]
                    temp_location[1] = current_location[1]+1
                    dir_moving_in = 'e'

                else:
                    pipe_broken = True
                    return length

            case 'w':
                # Get line above starting, and the same index
                pipe = data[current_location[0]][current_location[1]-1]
                
                # We're going north so we can match to these three values (L, F, -)
                if (pipe == 'L'): 
                    temp_location[0] = current_location[0]
                    temp_location[1] = current_location[1]-1
                    dir_moving_in = 'n'

                elif (pipe == 'F'):
                    temp_location[0] = current_location[0]
                    temp_location[1] = current_location[1]-1
                    dir_moving_in = 's'

                elif (pipe == '-'): 
                    temp_location[0] = current_location[0]
                    temp_location[1] = current_location[1]-1
                    dir_moving_in = 'w'

                else:
                    pipe_broken = True
                    return length
        
        current_location[0] = temp_location[0]
        current_location[1] = temp_location[1]

        length += 1
        
        # a = abs(int(OG_start_location[0]) - int(current_location[0]))
        # b = abs(int(OG_start_location[1]) - int(current_location[1]))
        # if length < math.sqrt(a**2 + b**2):
        #     length = math.sqrt(a**2 + b**2)    
        

    return length
        


with open('2023/day10_input.txt', 'r') as f:
    data = f.read().splitlines()

#outPutFile = open('2023/day10_input_sample,txt', 'w')


# find "S"
OG_start_location = []
for index, line in enumerate(data):
    if 'S' in line:
        OG_start_location.append(index)
        OG_start_location.append(line.index('S'))

start_location = OG_start_location.copy()

# Loop until there is no further valid connection
# Take one route from 'S' at a time 

possible_directions = ['n', 's', 'e', 'w']
length_of_pipe = []
for direction in possible_directions:
    length = 0
    length_of_pipe.append(find_next_pipe(start_location, direction, length))
    print(length_of_pipe)

# for line in data:
#     outPutFile.write(line)



