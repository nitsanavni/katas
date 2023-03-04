bun index.ts | head -n-1 > received
diff -ws received index.ts || code --diff received index.ts
