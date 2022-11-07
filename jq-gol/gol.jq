# "gen 12" -> "gen 13"
def increment_generation_number:
    .[0] =
        (.[0] | split(" ") |
            (.[1] =
                (.[1] | tonumber | .+1 | tostring)) | join(" "));

def kill_cell:
    ".";

def kill_all_cells_in_row:
    split("") | map(kill_cell) | join("");

def gol:
    increment_generation_number | .[2] = (.[2] | kill_all_cells_in_row);

def underpopulation: .number_of_living_neighbors < 2;

def overcrowding: .number_of_living_neighbors > 3;

def sustainable_population: underpopulation or overcrowding | not;

def should_come_alive: .number_of_living_neighbors == 3;

def dead: ".";

def alive: "*";

def cell_is_alive: .cell_aliveness == alive;

def cell_is_dead: .cell_aliveness == dead;

def should_be_alive:
    (cell_is_alive and sustainable_population)
    or
    (cell_is_dead and should_come_alive);

def rules_of_gol:
    if should_be_alive
    then alive
    else dead
    end;

def count_live_neighbours: [[3, 3], [3, 3]];

if $method == "gol" then gol
elif $method == "rules_of_gol" then rules_of_gol
elif $method == "count_live_neighbours" then count_live_neighbours
else error("unknown method: " + $method)
end
