# generate `n` `.`'s
def times(n): . as $x | range(n) | $x;

# generate an string containing `n` spaces
def spaces(n): [" " | times(n)] | join("");

# right-pad a string with spaces up to size `n`
def rpad(n):
    .//"" | tostring |
    length as $l |
    if $l >= n then . else . + spaces(n - $l) end;

# concatenate two multi-line strings
# each multi-line string is represented as an array of single line strings
# result is also an array
def cat:
    (.[0]|map(length)|max) as $p |
    transpose |
    map(.[0]=(.[0]|rpad($p)) | join(""));

# differential
def diff: . as $i | range(. | length | .-1) | $i[.+1] - $i[.];

# indentation differential
def di:
    length as $l |
    if $l > 0 then
    [(map(.indent) | [({ di: 1 }), (diff | { di: . })]), ., ([range($l) | { i: . }])] | transpose | map(add)
    else . end;

def pairs:
    length as $l |
    (
        (
            (.[] | select(.di < 0) | .i),
            (.[] | select(.i == ($l-1) and .indent >= 0) | .i | .+1)
        ) | [.-2, .-1]
    ) as $ipairs | [.[$ipairs[0], $ipairs[1]]];

def arrify: if isarray then . else [.] end;

def combine_two_children:
    {
        text: [.[].text | arrify] | add,
        indent: .[0].indent,
        i: .[0].i,
        sizes: [.[0].text | arrify | length] + (.[1].sizes//[.[1].text | arrify | length])
    };

def parent_position:
    . / 2 | ceil;

# top-pad a multiline string
def tpad:
    (.[1] | length) as $l | .[0]=(["" | times($l | parent_position | . - 1)]) + .[0];

def single_child_connector:
    .[] | (. / 2 | ceil - 1) as $position | ["" | times($position), "─"];

def first_child_connector:
    . as $s | ($s / 2 | ceil - 1) as $position | [("" | times($position)), ("╭"), ("│" | times($s - $position - 1))];

def middle_connector:
    . as $s | ($s / 2 | ceil - 1) as $position | [("│" | times($position)), ("├"), ("│" | times($s - $position - 1))];

def last_child_connector:
    . as $s | ($s / 2 | ceil - 1) as $position | [("│"|times($position)), ("╰")];

#  ├ ┌ │ ─ ┬ └ ┼ ┤
def connectors:
    length as $l |
    if $l == 1 then single_child_connector else
        (add / 2 | ceil - 1) as $left |
        [
            (.[0] | first_child_connector),
            (if $l > 2 then (.[1:-1] | map(middle_connector)) | .[] else empty end),
            (.[-1] | last_child_connector)
        ] |
        add |
        .[$left]=({ "╭": "┬", "│": "┤", "├": "┼", "╰": "┴" }[.[$left]])
    end;

def combine_parent_child:
    (.[1].sizes // [1] | connectors) as $c |
    {
        text: ([.[].text | arrify] | tpad) | [.[0], ([$c, .[1]] | cat)] | cat,
        indent: .[0].indent,
        i: .[0].i
    };

def render_pair:
    if .[1].di == 0 then combine_two_children
    elif .[1].di == 1 then combine_parent_child
    else error("unexpected di: " + (.[1].di | tostring)) end;

def render_pairs:
    if isarray and length > 1 then
    di | reduce (pairs | render_pair) as $p (.; .[$p.i] = $p | .[$p.i+1]=null) | map(select(.))
    else null end;

def test_connectors:
    .[] | ., connectors | tojson;

def unarrify: arrify | .[];

def render:
    [recurse(render_pairs;isarray)] | .[-1][].text | unarrify;

# route input to method per cli arg
# provided using e.g.:
# `jaq --arg method cat -f mindmap-render.jq`
if $method == "render" then render
elif $method == "cat" then cat
elif $method == "rpad" then rpad($arg|tonumber)
elif $method == "diff" then diff
elif $method == "connectors" then connectors
elif $method == "test_connectors" then test_connectors
else error("unrecognized method arg")
end
