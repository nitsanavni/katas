const makeGame = () => {
  type Q = (x: number, y: number) => boolean;
  let isAlive: Q = () => false;
  return {
    setAlive: (x: number, y: number) => {
      const prev = isAlive;
      isAlive = (xx, yy) => (xx == x && yy == y) || prev(xx, yy);
    },
    gliderAt: (x: number, y: number) => {
      game.setAlive(x + 1, y);
      game.setAlive(x + 2, y + 1);
      game.setAlive(x, y + 2);
      game.setAlive(x + 1, y + 2);
      game.setAlive(x + 2, y + 2);
    },
    blinkerAt: (x: number, y: number) => {
      game.setAlive(x, y);
      game.setAlive(x + 1, y);
      game.setAlive(x + 2, y);
    },
    verticalBlinkerAt: (x: number, y: number) => {
      game.setAlive(x, y);
      game.setAlive(x, y + 1);
      game.setAlive(x, y + 2);
    },
    isAlive: (x: number, y: number) => {
      return isAlive(x, y);
    },
    next: () => {
      const prev = isAlive;
      isAlive = (x, y) => {
        const neighbours = [
          prev(x - 1, y - 1),
          prev(x, y - 1),
          prev(x + 1, y - 1),
          prev(x - 1, y),
          prev(x + 1, y),
          prev(x - 1, y + 1),
          prev(x, y + 1),
          prev(x + 1, y + 1),
        ].filter(Boolean).length;
        return neighbours == 3 || (prev(x, y) && neighbours == 2);
      };
    },
  };
};

let game = makeGame();

const times = <T>(n: number, fn: () => T): T[] => {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push(fn());
  }
  return results;
};

for await (const line of console) {
  if (/exit/.test(line)) {
    process.exit(0);
  }

  if (/^\d+$/.test(line)) {
    console.log(`next * ${+line}`);
    times(+line, () => game.next());
  } else if (/^\-?\d+,\-?\d+$/.test(line)) {
    const [x, y] = line.split(",").map((n) => +n);
    game.setAlive(x, y);
  } else if (/^\-?\d+,\-?\d+\?$/.test(line)) {
    const [x, y] = line
      .replace("?", "")
      .split(",")
      .map((n) => +n);
    console.log(game.isAlive(x, y));
  } else if (/^p\d+$/.test(line)) {
    const size = +line.replace("p", "");
    Array.from({ length: size }, (_, y) => y).map((y) => {
      Array.from({ length: size }, (_, x: number) => x).map((x) =>
        process.stdout.write(game.isAlive(x, y) ? "X" : " ")
      );
      process.stdout.write("\n");
    });
  } else if (/^glider$/.test(line)) {
    game.gliderAt(0, 0);
  } else if (/^blinker$/.test(line)) {
    game.blinkerAt(0, 0);
  } else if (/^save$/.test(line)) {
    const newGame = makeGame();
    for (let y = -100; y < 100; y++) {
      for (let x = -100; x < 100; x++) {
        if (game.isAlive(x, y)) {
          newGame.setAlive(x, y);
        }
      }
    }
    game = newGame;
  }
}
