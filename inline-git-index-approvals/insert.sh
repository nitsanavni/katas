head -n $(grep "approved start" index.ts -n | grep -o '^[0-9]\+') index.ts
bun run index.ts
tail -n +$(grep "approved end" index.ts -n | grep -o '^[0-9]\+') index.ts