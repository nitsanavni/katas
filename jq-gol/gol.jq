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

def count_living_neighbor_cells:
    map(split("")) as $grid | $grid | length as $height | (.[0]|length) as $width |
    reduce range($width) as $column ([] ; . + [$grid[0][$column]]);

def rules_of_gol: false;

if $method == "gol" then gol
elif $method == "count_living_neighbor_cells" then count_living_neighbor_cells
elif $method == "rules_of_gol" then rules_of_gol
else error("unknown method: " + $method)
end
