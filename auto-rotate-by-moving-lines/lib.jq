def swap(i; j):
    .[i] as $tmp |
    .[i] = .[j] |
    .[j] = $tmp;

def index_of(re):
    to_entries |
    map(select(.value | test(re)) | .key) |
    .[0];

def move_line_down(re):
    index_of("b") as $i |
    swap($i; $i+1);

def block(re):
    reduce to_entries[] as $l (
        {s:0,e:-1};
        if .b | isnumber then
            if ($l.value == "" and .e == -1) then .e = $l.key - 1 else
                .
            end
        else
            if ($l.value == "") then .s = $l.key + 1 else
                if $l.value | test(re) then .b = $l.key else
                    .
                end
            end
        end
    );

def move(re):
    block(re) as $b |
    if $b.b == $b.e or $b.b == $b.e - 1 then
        .[$b.b] as $move_me |
        .[$b.s+1:$b.b+1] = .[$b.s:$b.b] |
        .[$b.s] = $move_me
    else
        swap($b.b; $b.b + 1)
    end;

def rotate(re):
    split("\n") |
    move(re) |
    join("\n");
