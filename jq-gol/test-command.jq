if .skip
then
    ["echo 'skipped test: ", (.test|tojson), "'"]
else
    [
        "received=$(jaq -n '",
        (.input|tojson),
        "' | jaq --arg method ",
        (.method // "gol"),
        " -rf gol.jq) && python -m approvaltests -t '",
        .test,
        "' -r \"$received\""
    ]
end |
add
