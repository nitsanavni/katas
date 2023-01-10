#!/bin/bash -i

eval "$1" > result

git add --intent-to-add result

git diff --exit-code result > /dev/null \
    && \
        ( \
            echo "*** test passed ***"; \
        ) \
    || \
        ( \
            echo "*** test failed ***"; \
            bash -c "git add -p result"; \
            false \
        )
