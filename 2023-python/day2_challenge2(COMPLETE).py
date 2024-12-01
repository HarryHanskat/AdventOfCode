"""
Day 2 Challenge 2
    - Same constraints as challenge 1
    - Keep track of the single highest number of each color
        - take the 3 numbers for each game and if it's
            a valid game, then take the 3 numbers and multiply them.
            Add all those numbers together for each line and that's 
            the new total.
"""
import re

with open("day2_input.txt") as f:
    input = f.read().splitlines()

total = 0
index = 0
bluePattern = r'[0-99]+\s[blue]+'
redPattern = r'[0-99]+\s[red]+'
greenPattern = r'[0-99]+\s[green]+'
gameList = []
setList = []

for game in input:

    gameList.append(game)

    invalid = False
    index+=1
    power=0

    blueMin = 1
    redMin = 1
    greenMin = 1

    #Strip the "Game: xx" from each line
    pattern = r'[^\d]*[\d]+[^\d]+([\d]+)'
    match = re.search(pattern, game)

    if match:
        game = game[match.end()-2:]
        game = game.lstrip()
    
    # Split into sets now"
    sets = game.split(';')

    # Separate the color and number
    for set in sets: 
        setList.append(set)
        if invalid:
            break
        groups = set.split(',')
        for color in groups:
            if invalid:
                break
            color = color.lstrip().split(' ')
            number = color[0]
            number = int(number)
            color = color[1]
            print('index =', index, color, ' ', number)
            match color:
                case 'blue':
                    if number > blueMin:
                        blueMin = max(number, blueMin)
                case 'green':
                    if number > greenMin:
                        greenMin = max(number, greenMin)
                case 'red':
                    if number > redMin:
                        redMin = max(number, redMin)  
    
    print("index = ", index, "blue", blueMin, "red", redMin, "green", greenMin)
    power = blueMin*greenMin*redMin
    print("power", power)
    total += power
    print('Total = ', total)

# print(gameList)
# print(setList)
print("FINAL TOTAL", total)