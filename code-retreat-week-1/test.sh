jq -rn --argjson transformations "$(cat game-of-life-cell-transformations.json)" -f game-of-life.jq | verify -t game-of-life
