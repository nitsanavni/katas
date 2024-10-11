yml=$(python3 word_diff.py <(echo -e "line 1\nhello world\none too three\nfourth") <(echo -e "line 1\nhello my world\none two three\nfourth"))
echo "$yml" | bat --plain -l yaml
echo "$yml" | python3 model_to_html.py > out.html && open out.html
