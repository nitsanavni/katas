def cat: [.[0]+.[1]|join("")];

def render: [(.[] | .text)//""] | join("─");

if $method == "render"
then render
else cat
end