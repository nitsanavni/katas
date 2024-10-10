original="first line
hello"
changed="first line
world!"

diff_with_header() {
	git diff --word-diff --no-index <(echo -e "$1") <(echo -e "$2")
}

scrub_header() {
	grep @@ -A 100 | grep -v @@
}

diff_with_header "$original" "$changed" | scrub_header | python git_diff_to_html.py > diff.html && open diff.html
