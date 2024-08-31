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
        y = (y - 1 + gridSize) % gridSize; // Wrap around when going up
    } else if (key.name === 'down') {
        y = (y + 1) % gridSize; // Wrap around when going down
    } else if (key.name === 'left') {
        x = (x - 1 + gridSize) % gridSize; // Wrap around when going left
    } else if (key.name === 'right') {
        x = (x + 1) % gridSize; // Wrap around when going right
    }
    renderGrid();
});

// Initial render
renderGrid();

