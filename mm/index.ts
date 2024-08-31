#!/usr/bin/env bun

import logUpdate from 'log-update';
import readline from 'readline';

// Create a 10x10 grid
const gridSize = 10;
let x = 0, y = 0; // Initial position of the square

// Render the grid
function renderGrid() {
    let grid = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (i === y && j === x) {
                grid += '[]'; // Square
            } else {
                grid += ' .'; // Empty space
            }
        }
        grid += '\n';
    }
    logUpdate(`\n${grid}`);
}

// Listen to keyboard events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.name === 'q') {
        logUpdate.clear();
        console.log("Exiting...");
        process.exit();
    } else if (key.name === 'up') {
        y = Math.max(0, y - 1);
    } else if (key.name === 'down') {
        y = Math.min(gridSize - 1, y + 1);
    } else if (key.name === 'left') {
        x = Math.max(0, x - 1);
    } else if (key.name === 'right') {
        x = Math.min(gridSize - 1, x + 1);
    }
    renderGrid();
});

// Initial render
renderGrid();

