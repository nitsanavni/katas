```
ls fractions.py | entr -sc 'pytest --doctest-modules fractions.py --accept-copy || code --diff fractions.py.new fractions.py'
```

```
ls fractions.py | entr -c pytest --doctest-modules fractions.py --accept-copy
```
