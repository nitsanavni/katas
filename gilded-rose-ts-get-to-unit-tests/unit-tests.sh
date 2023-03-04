date

bun run unit-tests.ts > unit-tests-received

diff -s unit-tests-received unit-tests-approved || (code --diff unit-tests-received unit-tests-approved;false)
