def swap(i; j):
    .[i] as $tmp |
    .[i] = .[j] |
    .[j] = $tmp;
