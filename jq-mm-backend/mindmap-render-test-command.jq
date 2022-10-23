.[] |
if .skip
then
    ["echo 'skipped: ", (.test), "'"]
else
    ["jaq -n '" , (.model | tojson) , "' | jaq --arg method ", (.method // "render") ," -rf mindmap-render.jq | python -m approvaltests -t ", (.test|tojson)]
end
| add