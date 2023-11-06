def game_of_life: if . == "_" then . else "_x_" end;
"a dead cell stays dead",
("_" | game_of_life ),
"a live cell with two neighbours stays alive",
("xxx" | game_of_life )