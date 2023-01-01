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
