(map(select(.focus))) as $focus |
if ($focus | length > 0) then $focus else . end |
.[] |
if .skip
then
    ["echo 'skipped: ", (.test), "'"]
else
    ["jaq -n '" , (.model // .input | tojson) , "' | jaq --arg method ", (.method // "render") ," --arg arg '", (.arg//0|tojson), "' -rf mindmap-render.jq | python -m approvaltests -t ", (.test|tojson)]
end |
add