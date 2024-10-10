original="first line
hello"
changed="first line
world!"

git diff --word-diff --no-index <(echo -e "$original") <(echo -e "$changed") | \
	grep @@ -A 100 | grep -v @@ | \
	python git_diff_to_html.py > diff.html && \
	open diff.html
