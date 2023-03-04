bun run index.ts > received
diff -s received approved || (code --diff received approved; false)