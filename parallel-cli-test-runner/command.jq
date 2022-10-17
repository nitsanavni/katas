.[] | 
["jaq -n '", .[1], "' | jaq -rf mars-rover.jq | python -m approvaltests -t '", .[0], "'"] | 
add