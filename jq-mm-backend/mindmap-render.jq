def times(n): . as $x | [range(n)] | map($x);
def rpad(n): tostring | length as $l | if $l >= n then . else . + (" " | times(n - $l) | join("")) end;
def pad: .[0][0]|length|[range(1)]|map(" ")|join("");
def cat: (pad) as $p | transpose | map(.[0]=.[0]//$p | join(""));

def render: [(.[] | .text)//""] | join("─");

if $method == "render" then render
elif $method == "cat" then cat
else rpad($arg|tonumber)
end