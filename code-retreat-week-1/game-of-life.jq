def game_of_life: $transformations[.];

def printer: . + " => " + game_of_life;

# "render"?

def render: if .width == 1 then ("_" * .width) else "___\n___\n___" end;

"--- RENDER TESTS ---",
"render will render a 1x1 board with a dead cell",
({ width: 1, height: 1, cells: [] } | render),

"--- CELL TESTS ---",

"a dead cell stays dead",
({ width: 3, height: 3, cells: [] } | render | printer),

# "a dead cell stays dead",
# ("___\n___\n___" | printer ),
"a live cell with two neighbours stays alive",
("___\nxxx\n___" | printer),
"a live cell with no neighbours dies",
("___\n_x_\n___" | printer),


"",
"---BOARD TESTS ---",
"a vertical blinker",
("x\nx\nx" | printer)