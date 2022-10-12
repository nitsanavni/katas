import test from "ava";
import { $ } from "zx";

import { verify } from "./verify.mjs";

async function streamToString(stream) {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf-8");
}

const marsRover = async (input) => {
  const process = $`jaq -Rf mars-rover.jq`;

  process.stdin.write(Buffer(input));
  process.stdin.end();

  return await streamToString(process.stdout);
};

test.skip("mars rover - example from kata description", async (t) => {
  const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

  // Expected Output:
  // 1 3 N
  // 5 1 E

  const result = await marsRover(input);

  await verify(t, result);
});
