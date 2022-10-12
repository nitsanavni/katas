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
  const process = $`jaq -srRf mars-rover.jq`;

  process.stdin.write(Buffer.from(input));
  process.stdin.end();

  return await streamToString(process.stdout);
};

test("single rover, no instructions - no movement", async (t) => {
  const input = `5 5
1 2 N
`;

  await verify(t, await marsRover(input));
});

test.skip("mars rover - example from kata description", async (t) => {
  const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

  await verify(await marsRover(input));
});
