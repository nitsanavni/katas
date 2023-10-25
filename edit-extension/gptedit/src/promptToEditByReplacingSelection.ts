export const promptToEditByReplacingSelection = ({
    selectedFile,
    editToCode: promptToSelectTool,
    fileContent,
}: {
    selectedFile: string;
    editToCode: string;
    fileContent: string;
}) => {
    return `# Task

Edit this file: ${selectedFile}
How: replace the selected section (marked with <selection>...</selection>) with new text

# Format

only respond with the new edited text to replace the previous selected text, nothing else
don't use a code block
!important!: preserve the exact indentation of the original, it is very important to preserve leading spaces; unless the edit is about that
preserve original formatting and style, unless the edit is about that

# Context

The edit to perform is:
${promptToSelectTool}

The file content is (note indentation), selection is marked with <selection>...</selection> tags, and the file is tagged with <file></file>:
<file>${fileContent}</file>`;
};
