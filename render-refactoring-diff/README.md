Render Refactoring Diff

Credit: example problem from @isidore.

Render a word-diff, similar to `git diff --word-diff`, example:

```shell
$ git diff --word-diff \
>   <(echo Hello, please render this diff.) \
>   <(echo Hello, please render this diff. | sed 's/render/show/')
diff --git a/dev/fd/63 b/dev/fd/62
--- a/dev/fd/63
+++ b/dev/fd/62
@@ -1 +1 @@
Hello, please [-render-]{+show+} this diff.
```

```diff
Hello, please [-render-]{+show+} this diff.
```
