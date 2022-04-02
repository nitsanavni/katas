import { promisify } from "util";
import test from "ava";
import { GenericContainer, Network, Wait } from "testcontainers";

const tick = promisify(setTimeout);

test("mountebank", async (t) => {
  const network = await new Network({ name: "mountebank-test" }).start();

  const mountebank = await new GenericContainer("bbyars/mountebank:2.6.0")
    .withNetworkMode(network.getName())
    .withNetworkAliases("mb", "imposter")
    .withCmd(["mb", "start"])
    .withWaitStrategy(
      Wait.forLogMessage(/mountebank v\d\.\d\.\d now taking orders/)
    )
    .start();

  const logsStream = await mountebank.logs();

  logsStream.pipe(process.stdout);

  const caller = await new GenericContainer("alpine")
    .withNetworkMode(network.getName())
    .withCmd(["sleep", "infinity"])
    .start();

  t.regex(
    (await caller.exec(["apk", "--no-cache", "add", "curl"])).output,
    /installing curl.*ok/is
  );

  // create the imposter
  for (let i = 0; i < 10; i++) {
    t.regex(
      (
        await caller.exec([
          "curl",
          "-i",
          "-X",
          "POST",
          "-H",
          "Content-Type: application/json",
          "http://mb:2525/imposters",
          "--data",
          JSON.stringify({
            port: 4545 + i,
            protocol: "http",
            stubs: [
              {
                responses: [
                  {
                    is: {
                      statusCode: 200,
                      body: `hello from imposter #${i}`,
                      _mode: "text",
                    },
                  },
                ],
                predicates: [{ equals: { path: "/test", method: "GET" } }],
              },
            ],
          }),
        ])
      ).output,
      /created/i
    );
  }

  for (let i = 0; i < 10; i++) {
    t.deepEqual(
      (await caller.exec(["curl", `http://imposter:${4545 + i}/test`])).output,
      `hello from imposter #${i}`
    );
  }
});

test("up a container", async (t) => {
  t.plan(1);

  const c1 = await new GenericContainer("alpine").withCmd(["ls"]).start();

  const stream = await c1.logs();

  stream.on("data", (d) => {
    stream.removeAllListeners("data");
    t.regex(String(d), /bin/);
  });

  await tick();
});
