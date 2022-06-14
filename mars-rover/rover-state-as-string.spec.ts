import test from "ava";
import { clone, assign } from "lodash";

type Orientation = "N" | "E" | "S" | "W";

const s = (stateString: string) => {
  const x = () => +stateString.split(" ")[0];
  const y = () => +stateString.split(" ")[1];
  const orientation = () => stateString.split(" ")[2] as Orientation;

  return {
    toString: () => stateString,
    get x() {
      return x();
    },
    get y() {
      return y();
    },
    get orientation() {
      return orientation();
    },
  };
};

class S extends String {
  public constructor(str: string) {
    super(str);
  }

  public get x() {
    return +this.split(" ")[0];
  }
}

const newS = (str: string) => new S(str);

const st = (str: string) => {
  const more = {
    get x() {
      return +str.split(" ")[0];
    },
  };

  return assign(str, more);
};

function rover(strings: TemplateStringsArray) {
  return ;
}

test("rover literal", (t) => {
  rover`0 0 N`;
});

test("st", (t) => {
  const a = st("0 b");

  t.deepEqual(a, "0 b");
});

// test("toString", (t) => {
//   t.deepEqual(String("0 0 N"), new S("0 0 N").x);
// });

test("get orientation", (t) => {
  const { orientation } = s("0 0 N");

  t.is(orientation, "N");
});

test("get orientation", (t) => {
  const { orientation } = s("0 0 N");

  t.is(orientation, "N");
});

test("get y", (t) => {
  const state = s("0 0 N");

  t.is(state.y, 0);
});

test("get x", (t) => {
  const state = s("0 0 N");

  t.is(state.x, 0);
});
