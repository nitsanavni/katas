# generate an `n` `.`'s
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

# concatenate three multi-line strings
def cat3: [(.[0:2]|cat),.[2]]|cat;

# enumerate items in an array
def enum: .;

def render:
    [
        map(select(.indent==0)|.text),
        map(select(.indent==1)|.text),
        map(select(.indent==2)|.text)
    ] |
    cat3 |
    .[];

# route input to method per cli arg
# provided using e.g.:
# `jaq --arg method cat -f mindmap-render.jq`
if $method == "render" then render
elif $method == "cat" then cat
elif $method == "rpad" then rpad($arg|tonumber)
elif $method == "cat3" then cat3
elif $method == "enum" then enum
else error("unrecognized method arg")
end
