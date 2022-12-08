#!/usr/bin/env zx

const test = async () => {
    return (await $`${argv.t.split(" ")}`.exitCode) == 0;
};

if (await test()) {
    await commit();
}
