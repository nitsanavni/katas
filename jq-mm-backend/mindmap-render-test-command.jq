.[] |
["jaq -n " , (.model | tojson) , " | jaq -rf mindmap-render.jq | python -m approvaltests -t ", (.test|tojson)]
| add