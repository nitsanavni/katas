import * as assert from "assert";
import { test } from "bun:test";

type Coordinates = { x: number; y: number };

type Instruction = "M" | "L" | "R";

type Orientation = "N" | "S" | "E" | "W";

type Position = { coordinates: Coordinates; orientation: Orientation };

type RoverInput = {
  startingPosition: Position;
  instructions: Instruction[];
};

type Input = {
  upperRight: Coordinates;
  roversInput: RoverInput[];
};

const parseInput = (inputString: string): Input => {
  const [upperRight, ...rovers] = inputString.split("\n");

  const roversInput: RoverInput[] = [];

  for (let i = 0; i < rovers.length; i += 2) {
    roversInput.push(r(`${rovers[i]}\n${rovers[i + 1]}`));
  }

  return { upperRight: c(upperRight), roversInput };
};

const formatCoordinates = ({ x, y }: Coordinates) => `${x} ${y}`;

const fc = formatCoordinates;

const formatPosition = ({ coordinates, orientation }: Position) =>
  `${fc(coordinates)} ${orientation}`;

const fp = formatPosition;

const formatInstructions = (instructions: Instruction[]) =>
  instructions.join("");

const fi = formatInstructions;

const formatRoverInput = ({
  startingPosition,
  instructions,
}: RoverInput) => `${fp(startingPosition)}
${fi(instructions)}`;

const fr = formatRoverInput;

const parseCoordinates = (c: string): Coordinates => {
  const [x, y] = c.split(" ");

  return { x: +x, y: +y };
};

const c = parseCoordinates;

const parsePosition = (p: string): Position => {
  const [x, y, o] = p.split(" ");

  return { coordinates: { x: +x, y: +y }, orientation: o as Orientation };
};

const p = parsePosition;

const parseInstructions = (i: string) => i.split("") as Instruction[];

const i = parseInstructions;

const parseRoverInput = (input: string): RoverInput => {
  const [s, instructions] = input.split("\n");

  return {
    startingPosition: p(s),
    instructions: i(instructions),
  };
};

const r = parseRoverInput;

test("format <-> parse", () => {
  assert.equal(fc(c("4 5")), "4 5");
  assert.equal(fp(p("4 5 N")), "4 5 N");
  assert.equal(fi(i("ML")), "ML");
  assert.equal(fr(r("1 2 E\nML")), "1 2 E\nML");
});

test("parse example input", () => {
  const inputString = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

  const parsed: Input = {
    upperRight: { x: 5, y: 5 },
    roversInput: [
      {
        startingPosition: { coordinates: { x: 1, y: 2 }, orientation: "N" },
        instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
      },
      {
        startingPosition: { coordinates: { x: 3, y: 3 }, orientation: "E" },
        instructions: ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"],
      },
    ],
  };

  assert.deepEqual(parseInput(inputString), parsed);
});

const followInstruction = (from: Position, instruction: Instruction): Position => {
  switch (instruction) {
    case "M":
      return {
        ...from,
        coordinates: {
          ...from.coordinates,
          ...{
            N: { y: from.coordinates.y + 1 },
            S: { y: from.coordinates.y - 1 },
            E: { x: from.coordinates.x + 1 },
            W: { x: from.coordinates.x - 1 },
          }[from.orientation],
        },
      };
    case "L":
      return {
        ...from,
        orientation: ({ N: "W", S: "E", E: "N", W: "S" } as const)[
          from.orientation
        ],
      };
    case "R":
      return {
        ...from,
        orientation: ({ N: "E", S: "W", E: "S", W: "N" } as const)[
          from.orientation
        ],
      };
  }
};

test("follow single instruction", () => {
  assert.equal(fp(followInstruction(p("1 1 N"), "M")), "1 2 N");
});

const followInstructions = (rover: RoverInput): Position =>
  rover.instructions.reduce(followInstruction, rover.startingPosition);

test("follow instructions", () => {
  assert.equal(fp(followInstructions(r("1 2 N\n"))), "1 2 N");
});

const marsRover = (input: string): string => {
  const { roversInput } = parseInput(input);

  return roversInput.map(followInstructions).map(fp).join("\n");
};

test("Example input and output from https://sammancoaching.org/kata_descriptions/mars_rover.html", () => {
  const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;
  const output = `1 3 N
5 1 E`;
  assert.deepEqual(marsRover(input), output);
});
