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

def flatten_and_add_coordinates:
    map(split("")|to_entries|map({x:.key,v:.value}))|to_entries|map(.key as $y | .value | map({y:$y,x,v}))|add;

def neighbours(w;h):
    [
        { x: .x - 1, y: .y - 1 },
        { x: .x    , y: .y - 1 },
        { x: .x + 1, y: .y - 1 },
        { x: .x - 1, y: .y     },
        { x: .x + 1, y: .y     },
        { x: .x - 1, y: .y + 1 },
        { x: .x    , y: .y + 1 },
        { x: .x + 1, y: .y + 1 }
    ] | map(select(.x >= 0 and .y >= 0 and .x < w and .y < h));

def chunk(n): range(length / n | floor) as $i | .[n * $i:n * $i + n];

def count_live_neighbours:
    length as $h | (.[0] | length) as $w |
    flatten_and_add_coordinates |
    . as $grid |
    map(.v as $v | neighbours($w;$h) | [$grid[.[]|.y * $w + .x] | select(.v == alive)] | {cell_aliveness: $v, number_of_living_neighbors: length}) | [chunk($w)];

def gol:
    increment_generation_number | .[2:] = (.[2:] | count_live_neighbours | map(map(rules_of_gol) | join("")));

if $method == "gol" then gol
elif $method == "rules_of_gol" then rules_of_gol
elif $method == "count_live_neighbours" then count_live_neighbours
else error("unknown method: " + $method)
end
