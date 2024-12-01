def find_loop_and_max_distance(grid):
    # Directions: North, East, South, West
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    direction_map = {
        '|': [0, 2], '-': [1, 3], 'L': [0, 1], 'J': [0, 3],
        '7': [2, 3], 'F': [1, 2], '.': [], 'S': [0, 1, 2, 3]
    }

    # Find the starting point 'S'
    start = None
    for i, row in enumerate(grid):
        for j, cell in enumerate(row):
            if cell == 'S':
                start = (i, j)
                break
        if start:
            break

    # Traverse the loop
    visited = set()
    distance_map = {}
    def traverse(pos, distance):
        if pos in visited:
            return
        visited.add(pos)
        distance_map[pos] = distance

        x, y = pos
        cell = grid[x][y]
        for dir_idx in direction_map[cell]:
            dx, dy = directions[dir_idx]
            new_pos = (x + dx, y + dy)

            if 0 <= new_pos[0] < len(grid) and 0 <= new_pos[1] < len(grid[0]) and new_pos not in visited:
                traverse(new_pos, distance + 1)

    traverse(start, 0)

    # Find the farthest point from 'S'
    max_distance = max(distance_map.values())
    return max_distance

# Example usage
grid = [
    "..F7.",
    ".FJ|.",
    "SJ.L7",
    "|F--J",
    "LJ..."
]

with open('2023/day10_input.txt', 'r') as f:
    data = f.read().splitlines()


print(find_loop_and_max_distance(data))
