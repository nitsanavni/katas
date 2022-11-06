if .skip
then
    ["echo 'skipped test: ", (.test|tojson), "'"]
else
    [
        "jaq -n '",
        (.input|tojson),
        "' | jaq --arg method ",
        (.method // "gol"),
        " -rf gol.jq | python -m approvaltests -t '",
        .test,
        "'"
    ]
end |
add
