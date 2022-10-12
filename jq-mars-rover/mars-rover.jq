def north:
    .[1] = (.[1] | tonumber | .+1 | tostring);

def west:
    .[0] = (.[0] | tonumber | .-1 | tostring);

def move:
    split(" ") | if .[2] == "N" then north else west end | join(" ");

split("\n") | if (.[2]|length==0) then .[1] else (.[1]|move) end
