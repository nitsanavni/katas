const promptToTitle = (editToCode: string): string => {
    return `task: only provide a title to the following user request
format: only the title, plain text, no quotes
user request:
${editToCode}`;
};
