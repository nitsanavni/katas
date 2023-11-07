def game_of_life: $transformations[.];
def printer: . + " => " + game_of_life;
"--- CELL TESTS ---",
"a dead cell stays dead",
("___\n___\n___" | printer ),
"a live cell with two neighbours stays alive",
("___\nxxx\n___" | printer),
"a live cell with no neighbours dies",
("___\n_x_\n___" | printer),
"",
"---BOARD TESTS ---",
"a vertical blinker",
("x\nx\nx" | printer)