original="first line
hello my world!
third line"

changed=$(echo "$original" | sed 's/my/our/')

diff_with_header() {
	git diff --word-diff --no-index <(echo -e "$1") <(echo -e "$2")
}

scrub_header() {
	grep @@ -A 100 | grep -v @@
}


input_word_diff() {
	diff_with_header "$original" "$changed" | scrub_header
}

input_word_diff | python git_diff_to_html.py > diff.html && open diff.html
