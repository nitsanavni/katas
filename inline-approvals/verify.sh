#!/bin/bash -i

result="$1".result

eval "$2" > $result

git add --intent-to-add $result

git diff --quiet $result \
    && \
        ( \
            echo "*** test passed ***"; \
        ) \
    || \
        ( \
            echo "*** test failed ***"; \
            git add --patch $result; \
            false \
        )
