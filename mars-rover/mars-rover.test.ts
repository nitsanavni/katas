import test from "ava";
import os from "os";
import _, { reduce, flow } from "lodash";
import { map, join } from "lodash/fp";
import dedent from "dedent";

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

const moveNorth: Mover = (from) => ({
  ...from,
  y: from.y + 1,
});

const moveEast: Mover = (from) => ({
  ...from,
  x: from.x + 1,
});

const moveSouth: Mover = (from) => ({
  ...from,
  y: from.y - 1,
});

const moveWest: Mover = (from) => ({
  ...from,
  x: from.x - 1,
});

type Transform<T> = (t: T) => T;

type Spinner = Transform<Orientation>;
type Mover = Transform<RoverState>;

const rightOf: Spinner = (o) =>
  (({ N: "E", E: "S", S: "W", W: "N" } as const)[o]);

const leftOf: Spinner = (o) =>
  (({ N: "W", W: "S", S: "E", E: "N" } as const)[o]);

const spin: (s: Spinner) => Mover =
  (s: Spinner) =>
  (from: RoverState): RoverState => ({
    ...from,
    orientation: s(from.orientation),
  });

const moveForward = (from: RoverState): RoverState =>
  ({ N: moveNorth, E: moveEast, S: moveSouth, W: moveWest }[from.orientation](
    from
  ));

const moveAction = (by: Instruction): Mover =>
  ({ M: moveForward, R: spin(rightOf), L: spin(leftOf) }[by]);

const followOneInstruction = ({
  from,
  instruction,
}: {
  from: RoverState;
  instruction: Instruction;
}): RoverState => moveAction(instruction)(from);

const parseInput = (input: string) => {
  const [, ...lines] = input.split(os.EOL);

  const ret: {
    instructions: Instruction[];
    initialState: RoverState;
  }[] = [];

  for (let i = 0; i < lines.length; i += 2) {
    const initialState = parseState(lines[i]);
    const instructions = parseInstructions(lines[i + 1]);

    ret.push({ instructions, initialState });
  }

  return ret;
};

const moveRover = ({
  instructions,
  initialState,
}: {
  instructions: Instruction[];
  initialState: RoverState;
}) =>
  reduce(
    instructions,
    (from, instruction) => followOneInstruction({ from, instruction }),
    initialState
  );

const play = flow(
  parseInput,
  // (x) => [x],
  map(flow(moveRover, format)),
  join(os.EOL)
);

test("format state - 1 2 W", (t) => {
  t.deepEqual(format({ x: 1, y: 2, orientation: "W" }), "1 2 W");
});

test("format state - 0 0 N", (t) => {
  t.deepEqual(format({ x: 0, y: 0, orientation: "N" }), "0 0 N");
});

test("move rover east", (t) => {
  t.deepEqual(
    format(
      followOneInstruction({ from: parseState("0 0 E"), instruction: "M" })
    ),
    "1 0 E"
  );
});

test("move rover - 0 0 N -> R -> 0 0 E", (t) => {
  t.deepEqual(
    format(
      followOneInstruction({ from: parseState("0 0 N"), instruction: "R" })
    ),
    "0 0 E"
  );
});

test("move rover - 0 0 N -> M -> 0 1 N", (t) => {
  t.deepEqual(
    format(
      followOneInstruction({ from: parseState("0 0 N"), instruction: "M" })
    ),
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

test("two rovers - example from website", (t) => {
  const input = dedent`5 5
                       1 2 N
                       LMLMLMLMM
                       3 3 E
                       MMRMMRMRRM`;

  const output = play(input);

  const expectedRoverFinalState = dedent`1 3 N
                                         5 1 E`;

  t.deepEqual(output, expectedRoverFinalState);
});

test("ex2", (t) => {
  const upperRightCoordinates = "5 5";
  const roverInitialState = "3 3 E";
  const roverInstructions = "MMRMMRMRRM";

  const input = `${upperRightCoordinates}
${roverInitialState}
${roverInstructions}`;

  const output = play(input);

  const expectedRoverFinalState = "5 1 E";

  t.deepEqual(output, expectedRoverFinalState);
});

test("ex1", (t) => {
  const upperRightCoordinates = "5 5";
  const roverInitialState = "1 2 N";
  const roverInstructions = "LMLMLMLMM";

  const input = `${upperRightCoordinates}
${roverInitialState}
${roverInstructions}`;

  const output = play(input);

  const expectedRoverFinalState = "1 3 N";

  t.deepEqual(output, expectedRoverFinalState);
});

test("single rover - 0 1 N -> RRM -> 0 0 S", (t) => {
  const upperRightCoordinates = "0 1";
  const roverInitialState = "0 1 N";
  const roverInstructions = "RRM";

  const input = `${upperRightCoordinates}
${roverInitialState}
${roverInstructions}`;

  const output = play(input);

  const expectedRoverFinalState = "0 0 S";

  t.deepEqual(output, expectedRoverFinalState);
});

test("single rover - 0 0 N -> RM -> 1 0 E", (t) => {
  const upperRightCoordinates = "0 0";
  const roverInitialState = "0 0 N";
  const roverInstructions = "RM";

  const input = `${upperRightCoordinates}
${roverInitialState}
${roverInstructions}`;

  const output = play(input);

  const expectedRoverFinalState = "1 0 E";

  t.deepEqual(output, expectedRoverFinalState);
});

test("single rover - should spin right", (t) => {
  const upperRightCoordinates = "0 0";
  const roverInitialState = "0 0 N";
  const roverInstructions = "R";

  const input = `${upperRightCoordinates}
${roverInitialState}
${roverInstructions}`;

  const output = play(input);

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
