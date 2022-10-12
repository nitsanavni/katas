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
    else empty end |
    join(" ");

def left:
    split(" ") |
    if .[2] == "N" then .[2] = "W"
    elif .[2] == "W" then .[2] = "S"
    elif .[2] == "S" then .[2] = "E"
    elif .[2] == "E" then .[2] = "N"
    else empty end |
    join(" ");

def right:
    split(" ") |
    if .[2] == "N" then .[2] = "E"
    elif .[2] == "W" then .[2] = "N"
    elif .[2] == "S" then .[2] = "W"
    elif .[2] == "E" then .[2] = "S"
    else empty end |
    join(" ");

def follow_instruction(instruction):
    if instruction == "M" then move
    elif instruction == "L" then left
    elif instruction == "R" then right
    else empty end;

def mars_rover:
    split("\n") |
    reduce (.[2]|split("")|.[]) as $instruction (.[1]; follow_instruction($instruction));

mars_rover
