#!/usr/bin/env bun

import logUpdate from 'log-update';

const frames = ['-', '\\', '|', '/'];
let i = 0;

const interval = setInterval(() => {
    const frame = frames[i = ++i % frames.length];
    logUpdate(`\n\n  ${frame} Loading...`);

    // Stop the animation after 10 frames
    if (i === 10) {
        clearInterval(interval);
        logUpdate.clear();
        console.log("Animation complete!");
    }
}, 100);

