def product_2:
    .[0] as $acc |
    .[1][] |
    $acc + [.];

if length == 0 then empty else
    reduce .[] as $a ([]; [., $a] | product_2)
end

