jq -rn --argjson transformations "$(cat game-of-life-cell-transformations.json)" -f game-of-life.jq | verify -t a-dead-cell-stays-dead
