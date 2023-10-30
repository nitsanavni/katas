#!/bin/bash

commits=$(git log d815f26..HEAD --reverse --pretty=format:"%h")

# readarray -t commit_array <<<"$commits"

set -- $commits

for commit in $commits; do
    tag=$(git tag --points-at=$commit)
    clear
    git log -n 1 --oneline $commit
    echo
    if [ $tag ]; then 
        echo "This is a release: $tag"
    else
        echo
    fi
    echo
    git show $commit:tbd-ff/fizzbuzz.jq | bat --style=plain -l jq --paging never
    if [ $tag ]; then 
        sleep 4
    else
        sleep 1
    fi
done