cat - > received

touch approved

diff -q received approved > /dev/null \
    && \
        ( \
            echo "test passed"; \
            rm received; \
        ) \
    || \
        ( \
            echo "test failed"; \
            eval "diff received approved"; \
            false \
        )
