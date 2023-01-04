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
            if ($l.value == "" and .e == -1) then .e = $l.key else
                .
            end
        else
            if ($l.value == "") then .s = $l.key + 1 else
                if $l.value | test("\\bb\\b") then .b = $l.key else
                    .
                end
            end
        end
    );