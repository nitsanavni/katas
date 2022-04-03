import { promisify } from "util";
import test from "ava";
import { GenericContainer, Network, Wait } from "testcontainers";
import { Mountebank } from "@anev/ts-mountebank";
import { $ } from "zx";

const tick = promisify(setTimeout);

test("mountebank imposters in a docker network", async (t) => {
  const network = (
    await new Network({ name: "mountebank-test" }).start()
  ).getName();

  const mountebank = await new GenericContainer("bbyars/mountebank:2.6.0")
    // ts-mountebank assumes the port to be fixed on the host 2525
    // https://github.com/AngelaE/ts-mountebank/blob/master/project/src/mountebank.ts#L8
    .withExposedPorts({ container: 2525, host: 2525 })
    .withNetworkMode(network)
    .withNetworkAliases("mb", "imposter")
    .withCmd(["mb", "start"])
    .withWaitStrategy(
      Wait.forLogMessage(/mountebank v\d\.\d\.\d now taking orders/)
    )
    .start();

  $`docker ps`.stdout.pipe(process.stdout);

  console.log(`mapped port: ${mountebank.getMappedPort(2525)}`);

  const logsStream = await mountebank.logs();

  logsStream.pipe(process.stdout);

  const caller = await new GenericContainer("alpine")
    .withNetworkMode(network)
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

  const mb = new Mountebank();

  const imposter = await mb.getImposter(4545);

  t.deepEqual(JSON.stringify(imposter), "a");
});

test("up a docker container", async (t) => {
  t.plan(1);

  const c1 = await new GenericContainer("alpine").withCmd(["ls"]).start();

  const stream = await c1.logs();

  stream.on("data", (d) => {
    stream.removeAllListeners("data");
    t.regex(String(d), /bin/);
  });

  await tick();
});
