from typing import List

Number = int
Vector = List[Number]
Row = Vector
Puzzle = List[Row]

just_ones: Puzzle = [[1] * 9 for _ in range(9)]
rows_range_1_through_9: Puzzle = [[i for i in range(1, 10)] for _ in range(9)]
columns_range_1_through_9: Puzzle = [[j for i in range(9)] for j in range(1, 10)]
grids_range_1_through_9: Puzzle = [
    [1, 2, 3, 1, 2, 3, 1, 2, 3],
    [4, 5, 6, 4, 5, 6, 4, 5, 6],
    [7, 8, 9, 7, 8, 9, 7, 8, 9],
    [1, 2, 3, 1, 2, 3, 1, 2, 3],
    [4, 5, 6, 4, 5, 6, 4, 5, 6],
    [7, 8, 9, 7, 8, 9, 7, 8, 9],
    [1, 2, 3, 1, 2, 3, 1, 2, 3],
    [4, 5, 6, 4, 5, 6, 4, 5, 6],
    [7, 8, 9, 7, 8, 9, 7, 8, 9],
]
valid_puzzle: Puzzle = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
]


def the_base_check(vector: Vector) -> bool:
    return sorted(vector) == list(range(1, 10))


def validate_rows(puzzle):
    return all(map(the_base_check, puzzle))


def get_columns(puzzle):
    return list(map(list, zip(*puzzle)))


def validate_columns(puzzle):
    return all(map(the_base_check, get_columns(puzzle)))


def validate_3x3s(puzzle):
    grids_3x3s = [
        [
            puzzle[0][0],
            puzzle[0][1],
            puzzle[0][2],
            puzzle[1][0],
            puzzle[1][1],
            puzzle[1][2],
            puzzle[2][0],
            puzzle[2][1],
            puzzle[2][2],
        ],
        [
            puzzle[0][3],
            puzzle[0][4],
            puzzle[0][5],
            puzzle[1][3],
            puzzle[1][4],
            puzzle[1][5],
            puzzle[2][3],
            puzzle[2][4],
            puzzle[2][5],
        ],
        [
            puzzle[3][0],
            puzzle[3][1],
            puzzle[3][2],
            puzzle[4][0],
            puzzle[4][1],
            puzzle[4][2],
            puzzle[5][0],
            puzzle[5][1],
            puzzle[5][2],
        ],
    ]
    print(grids_3x3s)
    return all(map(the_base_check, grids_3x3s))


def validate(puzzle):
    # return validate_rows(puzzle) and validate_columns(puzzle) and validate_3x3s(puzzle)
    return False


def test_validate_3x3s():
    assert not validate_3x3s(rows_range_1_through_9)
    assert not validate_3x3s(just_ones)
    assert not validate_3x3s(columns_range_1_through_9)
    assert validate_3x3s(grids_range_1_through_9)


def test_validate_columns():
    assert not validate_columns(rows_range_1_through_9)
    assert not validate_columns(just_ones)
    assert validate_columns(columns_range_1_through_9)


def test_validate_rows():
    assert validate_rows(rows_range_1_through_9)
    assert not validate_rows(just_ones)
    assert not validate_rows(columns_range_1_through_9)


def test_validate_ones():
    assert not validate(just_ones)
