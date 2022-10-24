FROM gitpod/workspace-full

RUN brew install \
        fzf \
        ack \
        entr \
        parallel \
        ttyd

RUN echo 'will cite' | parallel --citation 1> /dev/null 2> /dev/null &

RUN pip install \
        approvaltests \
        pytest

RUN cargo install \
        jaq
