#!/bin/bash -i

# run the test and store the output to 'result' file
# the test executable is secified as the first arg to this script
eval "$1" > result

# add result file to the index (not its contents)
git add --intent-to-add result

# compare the working tree version to the index version
# if they're identical -> test passed
# if they're different -> test failed and allow to patch the index interactively (aka "approve" the new result)
git diff --quiet result \
    && \
        ( \
            echo "*** test passed ***"; \
        ) \
    || \
        ( \
            echo "*** test failed ***"; \
            git add --patch result; \
            false \
        )
