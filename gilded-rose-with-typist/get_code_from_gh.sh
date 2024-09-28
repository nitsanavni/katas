# goal: get the python gilded rose code into a local file

# Define the owner variable
owner="emilybache"

# 1. find the gilded rose repo on github
gilded_rose_repo=$(gh search repos --owner "$owner" rose --limit 1 --json name | jq -r '.[0].name')

echo "repo: $gilded_rose_repo"
