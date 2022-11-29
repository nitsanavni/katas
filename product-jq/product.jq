if length == 0 then empty else
    reduce .[] as $a ([]; $a[] as $e | . + [$e])
end

