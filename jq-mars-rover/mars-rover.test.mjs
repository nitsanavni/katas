import test from "ava";
import { $ } from "zx";

import { verify } from "./verify.mjs";


async function streamToString(stream) {
  // lets have a ReadableStream as a stream variable
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf-8");
}

const marsRover = async (input) => {
  const process = $`jaq -f mars-rover.jq`;
  process.stdin.write(input);
  process.stdin.end();

  const result = await streamToString(process.stdout);
  return result;
};

// Test Input:
// 5 5
// 1 2 N
// LMLMLMLMM
// 3 3 E
// MMRMMRMRRM
// Expected Output:
// 1 3 N
// 5 1 E

test("mars rover - example from kata description", async (t) => {
  const input = "3";

  const result = await marsRover(input);

  await verify(t, result);
});
