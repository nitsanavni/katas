#!/usr/bin/env zx

const test = () => (Math.random() > 0.5 ? $`true` : $`false`);

await test();
