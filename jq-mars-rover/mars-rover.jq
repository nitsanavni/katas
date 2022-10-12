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

split("\n") | if (.[2]|length==0) then .[1] else (.[1]|move) end
