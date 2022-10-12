def north:
    split(" ") | .[1] = (.[1] | tonumber | .+1 | tostring) | join(" ");

split("\n") | if (.[2]|length==0) then .[1] else (.[1]|north) end
