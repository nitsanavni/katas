def position_move_north:
    split(" ")|
    .[1]=(.[1]|tonumber|.+1|tostring)|
    join(" ");

def position_turn_right:
    split(" ")|
    .[2]=(.[2]|{N:"E"}[.])|
    join(" ");

def input_to_lines: split("\n");


input_to_lines| reduce (.[1]|split("")|.[]) as $instruction (.[0]; ({M:position_move_north,R:position_turn_right}[$instruction]))