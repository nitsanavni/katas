# Installs

[install jaq](https://github.com/01mf02/jaq#installation)

# Failing Unit Test

```shell
./test-gilded-rose.sh
```

# TextTest Fixture

```shell
jaq -nr "$(cat gilded-rose.jq) $(cat texttest_fixture.jq)"
```

Specify days:

```shell
jaq --arg days 10 -nr "$(cat gilded-rose.jq) $(cat texttest_fixture.jq)"
```
