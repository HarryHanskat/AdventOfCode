"""
day 7 challenge 1

Input
-----
hand    bet
32T3K   765
T55J5   684
...     ...

Rank hands by their value. 
Multiply bets by the given rank. 

Value:
A - 2 = 13 values
five of a kind = 25 + card value
four of a kind = 20 + card value
full house = 15 + card value
three of a kind = 10 + card value
pair = 5 + card value
high card = card value

five of a kind: 500
    - max value
    - only card type matters, A high

four of a kind: 400
    - card type for the 4 + card type for high single card

full house: 300
    - card type for 3 + card type for pair

three of a kind: 200
    - card type for 3 + highest single card + next highest single card

one pair: 100
    - card type for pair + highest single card + next highest card + next highest card

high card = high card + next highest + next highest + next highest + next highest

"""

import re
from operator import itemgetter
import collections

def addToRank(value, bet):
    rank.append([value,bet])
    sortedList = sorted(rank, key=itemgetter(0))
    return sortedList

def poker(hands):
    scores = [(i, score(hand.split())) for i, hand in enumerate(hands)]
    winner = sorted(scores , key=lambda x:x[1])[-1][0]
    return hands[winner]

def score(hand):
    ranks = '23456789TJQKA'
    rcounts = {ranks.find(r): ''.join(hand).count(r) for r, _ in hand}.items()
    score, ranks = zip(*sorted((cnt, rank) for rank, cnt in rcounts)[::-1])
    if len(score) == 5:
        if ranks[0:2] == (12, 3): #adjust if 5 high straight
            ranks = (3, 2, 1, 0, -1)
        '''no pair, straight, flush, or straight flush'''
        score = ([1, (3,1,1,1)], [(3,1,1,2), (5,)])
    return score, ranks

with open('2023/day7_sample_input.txt', 'r') as f:
    data = f.read().splitlines()

hands = [line.split()[0] for line in data]
print(hands)

bets = [int(line.split()[1]) for line in data]

handsPlayed = dict(zip(hands, bets))


values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']

sortedResults = []
rank = []
index = 0

for hand, bet in handsPlayed.items():
    value = 0

    cards = list(hand)
    cardCounts = {i:cards.count(i) for i in cards}
    print(cardCounts)
    # example output {'3': 2, '2': 1, 'T': 1, 'K': 1}
    
    # 5 of a kind check
    if all(x == cards[0] for x in cards):
        value += 500
        value += values.index(cards[0])
        sortedResults = addToRank(value, bet)
        break

    # 4 of a kind check
    if max(cardCounts, key=cardCounts.get) == 4:
        pass  

    # 3 of a kind check

    index += 1





print(sortedResults)


