FROM gitpod/workspace-full

RUN brew install \
        gh \
        fzf \
        ack \
        entr \
        ttyd

RUN pip install \
        approvaltests \
        pytest

RUN cargo install \
        jaq

RUN go install \
        github.com/shenwei356/rush@latest