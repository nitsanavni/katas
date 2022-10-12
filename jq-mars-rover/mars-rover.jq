def north: .[1] += 1;
def south: .[1] -= 1;
def west: .[0] -= 1;
def east: .[0] += 1;

def move:
    (.[0],.[1]) |= tonumber|
    { N: north, W: west, S: south, E: east }[.[2]] |
    (.[0],.[1]) |= tostring;

def left: { N: "W", W: "S", S: "E", E: "N" }[.];
def right: { N: "E", W: "N", S: "W", E: "S" }[.];

def turn(direction): .[2] |= direction;

def follow_instruction(instruction):
    split(" ") |
    { M: move, L: turn(left), R: turn(right) }[instruction] |
    join(" ");

def chunk(n): range(length / n | floor) as $i | .[n * $i:n * $i + n];

def mars_rover:
    split("\n") |
    .[1:] |
    chunk(2) |
    reduce (.[1]|split("")|.[]) as $instruction (.[0]; follow_instruction($instruction));

mars_rover
