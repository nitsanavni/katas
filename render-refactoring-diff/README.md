Render Refactoring Diff

Credit: example problem from @isidore. https://github.com/LearnWithLlew/TddWithChatGPT

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

In html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: monospace;
        }
        del {
            font-weight: bold;
            color: red;
            text-decoration: line-through;
        }
        ins {
            font-weight: bold;
            color: green;
        }
    </style>
    <title>Diff Rendering</title>
</head>
<body>
    <p>Hello, please <del>render</del><ins>show</ins> this diff.</p>
</body>
</html>
```

Bonus: keep syntax highlighting for code blocks.
