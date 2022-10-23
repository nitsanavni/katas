def pad: .[0]|map(length)|max|range(.)|map(" ")|join("");
# def cat: (.[0][0]|length|range(.)|map(" ")|join("")) as $p | transpose | map(.[0]=.[0]//$p|join(""));
def cat: (.[0][0]|length|[range(1)]|map(" ")|join("")) as $p | transpose| map(.[0]=.[0]//$p|join(""));

def render: [(.[] | .text)//""] | join("─");

if $method == "render"
then render
else cat
end