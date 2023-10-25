export const promptToSelectTool = ({
    selectedFile,
    editToCode: EDIT_TO_CODE,
    fileContent,
}: {
    selectedFile: string;
    editToCode: string;
    fileContent: string;
}) => {
    return `# Task

Edit this file: ${selectedFile}
How: select one of the following tools

Prioritize the use of automatic tools over manual ones

## Automatic Tools

### /renameTo

rename the current symbol under the cursor

example:

/renameTo newName

## Manual Tools

### /replace

rewrite the selected code by replacing it by an updated version
there are no args required, the tool will know what to do

example:

/replace

# Format

only respond with the chosen tool and args if relevant, nothing else
don't use a code block

# Context

The edit to perform is:
${EDIT_TO_CODE}

The file content is (note indentation), selection is marked with <selection>...</selection> tags, and the file is tagged with <file></file>:
<file>${fileContent}</file>`;
};
