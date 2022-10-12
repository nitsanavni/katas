def north:
    .[1] = (.[1] | tonumber | .+1 | tostring);

def south:
    .[1] = (.[1] | tonumber | .-1 | tostring);

def west:
    .[0] = (.[0] | tonumber | .-1 | tostring);

def east:
    .[0] = (.[0] | tonumber | .+1 | tostring);

def move:
    split(" ") |
    if .[2] == "N" then north
    elif .[2] == "W" then west
    elif .[2] == "S" then south
    elif .[2] == "E" then east
    else "what?!" end |
    join(" ");

def mars_rover:
    split("\n") |
    reduce (.[2]|split("")|.[]) as $instruction (.[1]; move);

mars_rover
