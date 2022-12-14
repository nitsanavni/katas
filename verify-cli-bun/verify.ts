#!/usr/bin/env bun

let input = "";

for await (const line of console) {
    input += line;
}

console.log(input == "hello" ? "test passed" : "test failed");

export {};
