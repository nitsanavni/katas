import test from "ava";
import os from "os";

type Orientation = "N" | "E" | "S" | "W";

type RoverState = {
  x: number;
  y: number;
  orientation: Orientation;
};

const parseState = (stateString: string): RoverState => {
  const [, x, y, orientation] = /^(\d+) (\d+) ([NESW])$/.exec(stateString)!;

  return { x: +x, y: +y, orientation } as RoverState;
};

type Instruction = "M" | "L" | "R";

const parseInstructions = (instructionsString: string): Instruction[] =>
  instructionsString.split("") as Instruction[];

const format = ({ x, y, orientation }: RoverState): string =>
  `${x} ${y} ${orientation}`;

const moveNorth = (from: RoverState): RoverState => ({
  ...from,
  y: from.y + 1,
});

const moveEast = (from: RoverState): RoverState => ({
  ...from,
  x: from.x + 1,
});

const spinRight = (from: RoverState): RoverState => ({
  ...from,
  orientation: "E",
});

const moveForward = (from: RoverState): RoverState =>
  ({ N: moveNorth, E: moveEast, S: moveNorth, W: moveNorth }[from.orientation](
    from
  ));

const moveRover = ({
  from,
  instruction,
}: {
  from: RoverState;
  instruction: Instruction;
}): RoverState =>
  ({ M: moveForward, R: spinRight, L: spinRight }[instruction](from));

const play = (input: string) => {
  const [, initStateString, instructionsString] = input.split(os.EOL);

  let state = parseState(initStateString);

  const instructions = parseInstructions(instructionsString);

  for (const instruction of instructions) {
    state = moveRover({ from: state, instruction });
  }

  return format(state);
};

test("format state - 1 2 W", (t) => {
  t.deepEqual(format({ x: 1, y: 2, orientation: "W" }), "1 2 W");
});

test("format state - 0 0 N", (t) => {
  t.deepEqual(format({ x: 0, y: 0, orientation: "N" }), "0 0 N");
});

test("move rover east", (t) => {
  t.deepEqual(
    format(moveRover({ from: parseState("0 0 E"), instruction: "M" })),
    "1 0 E"
  );
});

test("move rover - 0 0 N -> R -> 0 0 E", (t) => {
  t.deepEqual(
    format(moveRover({ from: parseState("0 0 N"), instruction: "R" })),
    "0 0 E"
  );
});

test("move rover - 0 0 N -> M -> 0 1 N", (t) => {
  t.deepEqual(
    format(moveRover({ from: parseState("0 0 N"), instruction: "M" })),
    "0 1 N"
  );
});

test("parse instructions - MRL", (t) => {
  const instructions = parseInstructions("MRL");

  t.deepEqual(instructions, ["M", "R", "L"]);
});

test("parse instructions - M", (t) => {
  const instructions = parseInstructions("M");

  t.deepEqual(instructions, ["M"]);
});

test("parse state - 1 2 E", (t) => {
  const state = parseState("1 2 E");

  t.deepEqual(state, { x: 1, y: 2, orientation: "E" });
});

test("parse state - 0 0 N", (t) => {
  const state = parseState("0 0 N");

  t.deepEqual(state, { x: 0, y: 0, orientation: "N" });
});

test("single rover - 0 0 N -> RM -> 1 0 E", (t) => {
  const upperRightCoordinates = "0 0";
  const roverInitialState = "0 0 N";
  const roverInstructions = "RM";

  const input = `${upperRightCoordinates}
${roverInitialState}
${roverInstructions}`;

  const output = play(input);

  // expect no change in state, as no instructions where given
  const expectedRoverFinalState = "1 0 E";

  t.deepEqual(output, expectedRoverFinalState);
});

test("single rover - should spin left", (t) => {
  const upperRightCoordinates = "0 0";
  const roverInitialState = "0 0 N";
  const roverInstructions = "R";

  const input = `${upperRightCoordinates}
${roverInitialState}
${roverInstructions}`;

  const output = play(input);

  // expect no change in state, as no instructions where given
  const expectedRoverFinalState = "0 0 E";

  t.deepEqual(output, expectedRoverFinalState);
});

test("single rover - should move north by 2", (t) => {
  const upperRightCoordinates = "0 2";
  const roverInitialState = "0 0 N";
  const roverInstructions = "MM";

  const input = `${upperRightCoordinates}
${roverInitialState}
${roverInstructions}`;

  const output = play(input);

  // expect no change in state, as no instructions where given
  const expectedRoverFinalState = "0 2 N";

  t.deepEqual(output, expectedRoverFinalState);
});

test("single rover - should move north by 1", (t) => {
  const upperRightCoordinates = "0 1";
  const roverInitialState = "0 0 N";
  // just move one step forward
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
