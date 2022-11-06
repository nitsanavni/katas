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

def rules_of_gol:
    if .cell_alive then .number_of_living_neighbors == 2
    else false end;

if $method == "gol" then gol
elif $method == "rules_of_gol" then rules_of_gol
else error("unknown method: " + $method)
end
