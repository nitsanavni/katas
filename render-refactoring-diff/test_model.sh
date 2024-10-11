original="first line
hello my world!
third line"

changed=$(echo "$original" | sed 's/my/our/' | sed 's/third line/third and last line/')

diff_with_header() {
    git diff --word-diff --no-index <(echo -e "$1") <(echo -e "$2")
}

scrub_header() {
    grep @@ -A 100 | grep -v @@
}

input_word_diff() {
    diff_with_header "$original" "$changed" | scrub_header
}

input_word_diff | python ./word_diff_to_model.py | bat --plain -l yaml
