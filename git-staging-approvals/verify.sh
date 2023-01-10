#!/bin/bash -i

eval "$1" > result

git add --intent-to-add result

git diff --exit-code result > /dev/null \
    && \
        ( \
            echo "test passed"; \
        ) \
    || \
        ( \
            echo ""; \
            echo ""; \
            echo "*** test failed ***"; \
            echo ""; \
            echo ""; \
            bash -c "git add -p result"; \
            false \
        )
