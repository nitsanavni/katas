FROM gitpod/workspace-full

RUN brew install \
        fzf \
        ack \
        entr \
        parallel \
        ttyd

RUN pip install \
        approvaltests \
        pytest

RUN cargo install \
        jaq
