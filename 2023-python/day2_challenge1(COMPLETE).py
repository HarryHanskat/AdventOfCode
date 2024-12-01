"""
Day 2 Challenge 1
 - Cubes in a bag
 - Each time you play, an unknown number of cubes 
    of each color are added to the bag.
 - data always listed like thie
    Game #: ...; .... ... ...; ... ... ...;
 - Sets are pulled from the bag
    - A set is denoted by a ;
 - Goal: Determine which games are POSSIBLE
 - There are only 12 red cubes, 13 green cubes, and 14 blue cubes available
 - If a set has a number greater than the available cubes above
    that game would be impossible
"""
import re

with open("day2_input.txt") as f:
    input = f.read().splitlines()

total = 0
index = 0
bluePattern = r'[0-99]+\s[blue]+'
redPattern = r'[0-99]+\s[red]+'
greenPattern = r'[0-99]+\s[green]+'

for game in input:
    invalid = False
    index+=1

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
        if invalid:
            break
        groups = set.split(',')
        for color in groups:
            if invalid:
                break
            color = color.lstrip().split(' ')
            number = color[0]
            color = color[1]
            print('index =', index, color, ' ', number)
            match color:
                case 'blue':
                    if int(number) > 14:
                        invalid = True
                        break
                case 'green':
                    if int(number) > 13:
                        invalid = True
                        break
                case 'red':
                    if int(number) > 12:
                        invalid = True
                        break
        print('Total = ', total)
    if invalid == False:
        total += index

print("FINAL TOTAL", total)
       

        