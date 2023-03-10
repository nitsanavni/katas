#!/usr/bin/env bun

import { env } from "bun";
import yargs from "yargs";

const [cmd, arg] = (await yargs(process.argv.slice(2)).argv)._;

if (env.SHOW_ARGV) {
    console.log({ cmd, arg });
    process.exit();
}
