/*
Number of Islands

Given a 2D grid grid where '1' represents land and '0' represents water, count and return the number of islands.
An island is formed by connecting adjacent lands horizontally or vertically and is surrounded by water. You 
may assume water is surrounding the grid (i.e., all the edges are water).
Example 1:

Input: grid = [
    ["0","1","1","1","0"],
    ["0","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
Output: 1

Example 2:
Input: grid = [
    ["1","1","0","0","1"],
    ["1","1","0","0","1"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
Output: 4

Constraints:
1 <= grid.length, grid[i].length <= 100
grid[i][j] is '0' or '1'.
*/

island_counter = 0
seen = set()
stack = []
O(R * C)
 + < R * C
O(R * C)
O(2(R * C))
O(R * C)

for rows:
    for cols:
        value = grid[rows][cols]

        if value == 0:
            continue
        
        stack.add(value)
        while stack is not empty
            value = stack.pop()
            if value in seen:
                continue
            if value not in seen:

                seen.add(value)

                for left, right, up, down in directions:
                    value = grid[position]
                    if value == 1:
                        add value to stack
                    if value == 0:
                        continue
        
        island_counter += 1

return island_couner





Merge k Sorted Lists
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Each node
carries two values, key1 and key2. Nodes are ordered lexicographically: compare key1 first, and only when
key1 values are equal, break the tie with key2.

Merge all the linked-lists into one linked-list sorted by (key1, key2) and return it.
Formally, node A comes before node B if A.key1 < B.key1, or A.key1 == B.key1 and A.key2 < B.key2.
Example 1:

Input: lists = [[(1,2),(4,1),(5,9)],
                [(1,1),(3,5),(4,4)],
                [(2,6),(6,3)]]

Output: [(1,1),(1,2),(2,6),(3,5),(4,1),(4,4),(5,9),(6,3)]
Explanation: The linked-lists are:
[
  (1,2) -> (4,1) -> (5,9),
  (1,1) -> (3,5) -> (4,4),
  (2,6) -> (6,3)
]

dictionary by first value[1] = [second values]

V = # of total nodes in linked lists
O(V)

O(V * log(V))
import heapq

min_heap
for each linked_list in list:
    for each node in min_heap:
        min_heap.add(node)

return min_heap.tolist()



merging them by (key1, key2):
(1,1) -> (1,2) -> (2,6) -> (3,5) -> (4,1) -> (4,4) -> (5,9) -> (6,3)

Note the two (1, ·) nodes: they tie on key1, so key2 decides
that (1,1) precedes (1,2).
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []
Constraints:
k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j].key1, lists[i][j].key2 <= 10^4
lists[i] is sorted in ascending (key1, key2) lexicographic order.
 •  • The sum of lists[i].length will not exceed 10^4.