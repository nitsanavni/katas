import minimist from "minimist";

const { _ } = minimist(process.argv.slice(2));

export const filePath = _[0];
