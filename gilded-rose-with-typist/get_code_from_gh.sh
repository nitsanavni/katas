# goal: get the python gilded rose code into a local file

# Define the owner variable
owner="emilybache"

# 1. set the gilded rose repo and file path
gilded_rose_repo="${owner}/GildedRose-Refactoring-Kata"
file_path="python/gilded_rose.py"

# 2. download the Python code from the repository using the GitHub API
gh api repos/$gilded_rose_repo/contents/$file_path -q '.content' | base64 --decode > gilded_rose.py

# 3. display the success message
echo "Downloaded Python file: $file_path from $gilded_rose_repo"
