tmp=$(mktemp)

echo 'line 1' > "$tmp"
echo 'line 2' >> "$tmp"
echo 'line 3' >> "$tmp"

cat "$tmp" |\
    python mutate.py --line-number 2 --change-to 'modified 2nd line' |\
    verify -t mutate -d d.sh

