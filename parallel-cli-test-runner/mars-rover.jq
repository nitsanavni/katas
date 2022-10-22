def move:
    {
        N: .[1]=(.[1]|tonumber|.+1|tostring),
        S: .[1]=(.[1]|tonumber|.-1|tostring),
        W: .[0]=(.[0]|tonumber|.-1|tostring),
        E: .[0]=(.[0]|tonumber|.+1|tostring),
    }[.[2]];

def right: {N:"E",E:"S",S:"W",W:"N"}[.];

def left: {N:"W",W:"S",S:"E",E:"N"}[.];

def turn(dir): .[2]=(.[2]|dir);

def chunk(n): range(length/n|ceil) as $i | .[n*$i:n*$i+n];

def input_to_lines: split("\n") | chunk(2);

def get_instructions: .[1]|split("")|.[];

def follow_instruction(instruction):
    split(" ") |
    {
        M: move,
        R: turn(right),
        L: turn(left),
    }[instruction] |
    join(" ");

def move_rover:
    reduce get_instructions as $instruction (.[0]; follow_instruction($instruction));

input_to_lines | move_rover
