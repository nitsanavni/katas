.[] | 
["jaq -n '", .[1], "' | jaq -f mars-rover.jq | python -m approvaltests -t '", .[0], "'"] | 
add