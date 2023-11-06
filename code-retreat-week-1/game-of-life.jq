. as $transformations |
def game_of_life: $transformations[.];
"a dead cell stays dead",
("_" | game_of_life ),
"a live cell with two neighbours stays alive",
("xxx" | game_of_life )