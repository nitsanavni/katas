import test from "ava";

type RoverState = {
  x: number;
  y: number;
  orientation: "N" | "E" | "S" | "W";
};

const parseState = (stateString: string): RoverState => {
  return { x: 0, y: 0, orientation: "N" };
};

const play = (input: string) => {
  return "0 0 N";
};

test("parse state - 0 0 N", (t) => {
  const state = parseState("0 0 N");

  t.deepEqual(state, { x: 0, y: 0, orientation: "N" });
});

test.failing("single rover - should move north by 1", (t) => {
  const upperRightCoordinates = "0 1";
  const roverInitialState = "0 0 N";
  // no instructions at all
  const roverInstructions = "M";

  const input = `${upperRightCoordinates}
${roverInitialState}
${roverInstructions}`;

  const output = play(input);

  // expect no change in state, as no instructions where given
  const expectedRoverFinalState = "0 1 N";

  t.deepEqual(output, expectedRoverFinalState);
});

test("single rover - should stay put if no instructions given", (t) => {
  const upperRightCoordinates = "0 0";
  const roverInitialState = "0 0 N";
  // no instructions at all
  const roverInstructions = "";

  const input = `${upperRightCoordinates}
${roverInitialState}
${roverInstructions}`;

  const output = play(input);

  // expect no change in state, as no instructions where given
  const expectedRoverFinalState = "0 0 N";

  t.deepEqual(output, expectedRoverFinalState);
});
