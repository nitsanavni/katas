rm -f *.js
bun run logic-driver.ts | diff - logic-result