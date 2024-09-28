# goal: get the python gilded rose code into a local file

# 1. find emily bache's gilded rose repo on github
gilded_rose_repo=$(gh search repos --owner emilybache rose --limit 1 --json name)

echo "repo: $gilded_rose_repo"
