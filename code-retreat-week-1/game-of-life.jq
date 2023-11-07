def game_of_life: $transformations[.];
def printer: . + " => " + game_of_life;
"a dead cell stays dead",
("_" | printer ),
"a live cell with two neighbours stays alive",
("xxx" | printer),
"a live cell with no neighbours dies",
("x" | printer)