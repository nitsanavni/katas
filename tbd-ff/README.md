Trunk Based Development with Feature Flags

[![asciicast](https://asciinema.org/a/618028.svg)](https://asciinema.org/a/618028)

## Guidelines

- minimize flagged code
- test both versions
- minimize number of flags

## How

- Start greenfield, at some point release
- Once released, subsequent feature increments are flagged while in development
- this means the existing tests should stay green while the new tests are being added
- note: these tests might be in conflict

## Retro

that felt good, very clean