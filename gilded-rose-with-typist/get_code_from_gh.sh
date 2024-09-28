# goal: get the python gilded rose code into a local file

# Define the owner variable
owner="emilybache"

# 1. find the gilded rose repo on github
gilded_rose_repo="${owner}/$(gh search repos --owner "$owner" rose --limit 1 --json name | jq -r '.[0].name')"

echo "repo: $gilded_rose_repo"

# 2. search for the Python code in the repository using the full repo name
gilded_rose_python_code=$(gh search code "rose" --repo "$gilded_rose_repo" --extension py --limit 1)

# 3. display the found Python file path and URL
echo "Found Python file: $gilded_rose_python_code"
