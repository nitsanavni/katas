jaq --arg days 31 -nr "$(cat gilded-rose.jq) $(cat texttest_fixture.jq)" | diff - test-result