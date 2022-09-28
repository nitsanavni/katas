- some notable stuff from bash history:
  - `brew install check texinfo gh ack`
  - minimal example
    - `cp -r /home/linuxbrew/.linuxbrew/Cellar/check/0.15.2/share/doc/check/example/* check-example/`
    - it's also here: `/usr/local/share/doc/check/example/`
  - build check from source
    - gh repo clone libcheck/check
    - cd check/
    - autoreconf --install
    - ./configure 
    - make
    - make check
    - sudo make install
    - sudo ldconfig
- should `.gitignore` many things after running the makes
- to debug with the forking mechanism:
  - add a `if (getenv("DEBUG")) { sleep(100); }` in the lib code
  - also - change the timeout of `check` (can be done with `tcase_set_timeout`)
  - `$ CPPFLAGS=-DDEBUG CFLAGS="-g -O0" DEBUG=1 make`
  - `$ CPPFLAGS=-DDEBUG CFLAGS="-g -O0" DEBUG=1 make check &`
  - `$ ps` to find the pid
  - `$ sudo gdb --pid <pid>`
  - inside gdb, enter `b` (or `break`), and then step with `n` / `s`
  - [gdb cheat sheet](https://darkdust.net/files/GDB%20Cheat%20Sheet.pdf)
- check seems to work
  - modifying tests - causes fails
  - need some boilerplate to define test suites, test cases, and tests
  - output is not as clear as can be - need to `$ cat tests/test-suite.log`
- code formatting
    - vscode extension - `clangd`
- `sleep()` comes from `#include <unistd.h>`