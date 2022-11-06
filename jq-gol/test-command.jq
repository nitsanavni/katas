if .skip
then
    ["echo 'skipped test: ", (.test|tojson), "'"]
else
    ["jaq -n '", (.input|tojson), "' | jaq -f gol.jq | python -m approvaltests -t '", .test ,"'"]
end |
add