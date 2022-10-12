def north:
    .[1] |= (tonumber | .+1 | tostring);

def south:
    .[1] |= (tonumber | .-1 | tostring);

def west:
    .[0] |= (tonumber | .-1 | tostring);

def east:
    .[0] |= (tonumber | .+1 | tostring);

def move:
    split(" ") |
    { N: north, W: west, S: south, E: east }[.[2]] |
    join(" ");

def left:
    { N: "W", W: "S", S: "E", E: "N" }[.];

def right:
    { N: "E", W: "N", S: "W", E: "S" }[.];

def turn(direction):
    split(" ") |
    .[2] |= direction |
    join(" ");

def follow_instruction(instruction):
    if instruction == "M" then move
    elif instruction == "L" then turn(left)
    elif instruction == "R" then turn(right)
    else empty end;

def chunk_2:
    range(length/2|floor) as $i | .[2*$i:2*$i+2];

def mars_rover:
    split("\n") |
    .[1:] |
    chunk_2 |
    reduce (.[1]|split("")|.[]) as $instruction (.[0]; follow_instruction($instruction));

mars_rover
