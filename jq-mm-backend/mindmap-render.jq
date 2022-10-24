def times(n): . as $x | [range(n)] | map($x);

# right-pad a string with spaces
def rpad(n):
    .//"" | tostring |
    length as $l |
    if $l >= n then . else . + (" " | times(n - $l) | join("")) end;

# concatenate two multi-line strings
# each multi-line string is represented as an array of single line strings
# result is also an array
def cat:
    (.[0]|map(length)|max) as $p |
    transpose |
    map(.[0]=(.[0]|rpad($p)) | join(""));

# concatenate three multi-line strings
def cat3: [(.[0:2]|cat),.[2]]|cat;

def render: [(.[] | .text)//""] | join("─");

if $method == "render" then render
elif $method == "cat" then cat
elif $method == "rpad" then rpad($arg|tonumber)
else cat3
end