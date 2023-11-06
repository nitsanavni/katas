cat game-of-life-cell-transformations.json | jq -rf game-of-life.jq | verify -t a-dead-cell-stays-dead
