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
    { N: "W", W: "S", S: "E", E: "N" }[.];

def right:
    { N: "E", W: "N", S: "W", E: "S" }[.];

def turn_left:
    split(" ") |
    .[2] = (.[2] | left) |
    join(" ");

def turn_right:
    split(" ") |
    .[2] = (.[2] | right) |
    join(" ");

def follow_instruction(instruction):
    if instruction == "M" then move
    elif instruction == "L" then turn_left
    elif instruction == "R" then turn_right
    else empty end;

def chunk_2:
    range(length/2|floor) as $i | .[2*$i:2*$i+2];

def mars_rover:
    split("\n") |
    .[1:] |
    chunk_2 |
    reduce (.[1]|split("")|.[]) as $instruction (.[0]; follow_instruction($instruction));

mars_rover
