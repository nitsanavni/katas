def product_2:
    .[1] as $a2 |
    .[0][] |
    . as $e1 |
    $a2[] |
    $e1 + [.];

if length == 0 then empty else
    reduce .[] as $a ([]; [[.], $a] | product_2)
end

