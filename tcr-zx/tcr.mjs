#!/usr/bin/env zx

const test = async () => {
    return (await $`${argv.t.split(" ")}`.exitCode) == 0;
};

const commit = async () => {
    const diff = await $`git diff --no-prefix --word-diff -U0 | tail +6`;
    $`git commit -am ${diff.toString() || "empty diff"}`.nothrow();
};

const revert = () => $`git reset --hard`;

const tcr = async (noRevert = false) => {
    const pass = await test();
    if (pass) {
        await commit();
    } else if (!noRevert) {
        await revert();
    }
    return pass;
};

if (argv.a) {
    if (!(await tcr(true))) setTimeout(tcr, 5000);
} else if (argv.s) {
    setInterval(tcr, +argv.s * 1000);
} else {
    tcr();
}
