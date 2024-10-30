why does vim highlight underscores in markdown files?

Vim highlights underscores in Markdown files because it is interpreting them as potential emphasis delimiters, which are part of Markdown syntax for italic or bold text. This is due to syntax highlighting rules that identify underscores (`_`) and asterisks (`*`) as markers for text formatting.

right...

Right, Vim's syntax highlighting for Markdown assumes underscores could be used for emphasis, which is why they are highlighted. If you need different behavior, consider modifying the syntax file or using a plugin to adjust the highlighting rules.
