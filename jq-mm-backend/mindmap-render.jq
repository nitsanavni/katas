def pad: .[0][0]|length|[range(1)]|map(" ")|join("");
def cat: (pad) as $p | transpose | map(.[0]=.[0]//$p | join(""));

def render: [(.[] | .text)//""] | join("─");

if $method == "render"
then render
else cat
end