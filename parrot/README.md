# [Parrot Refactoring Kata](https://github.com/emilybache/Parrot-Refactoring-Kata)

update snapshot (aka 'approve')

```shell
python test_parrot.py > expected
```

test

```shell
python test_parrot.py | diff - expected
```

mutation test

```shell
mutatest -m f --src . -t 'sh -c "python test_parrot.py | diff - expected"' -n 1000
```
