FROM gitpod/workspace-full

RUN curl -fsSL https://bun.sh/install | bash

RUN echo 'export BUN_INSTALL="/home/gitpod/.bun"' >> /home/gitpod/.bashrc.d/600-bun | bash && \
    echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> /home/gitpod/.bashrc.d/600-bun | bash

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