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

# Approval Tests in Watch Mode

```shell
ls gilded-rose.jq gilded-rose.approved | entr -cs 'jaq --arg days 30 -nr "$(cat gilded-rose.jq) $(cat texttest_fixture.jq)" | ./verify.sh -t gilded-rose'
```
