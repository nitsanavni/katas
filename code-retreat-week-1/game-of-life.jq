def game_of_life: $transformations[.];

def printer: . + " => " + game_of_life;

# "render"?

def render: ((("_" * .width) + "\n") * .height);

"--- RENDER TESTS ---",
"render will render a 2x1 board with dead cells",
({ width: 2, height: 1, cells: [] } | render),
"render will render a 1x2 board with dead cells",
({ width: 1, height: 2, cells: [] } | render),
"render will render a 3x1 board with the right cell alive",
({ width: 3, height: 1, cells: [{ x: 2, y: 0 }] } | .width as $w | [(range(.height)) | [range($w) ]]),

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