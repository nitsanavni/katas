def north:
    "1 3 N";

split("\n") | if (.[2]|length==0) then .[1] else (.[1]|north) end
