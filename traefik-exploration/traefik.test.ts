import { promisify } from "util";
import test from "ava";
import { GenericContainer, Network, Wait } from "testcontainers";
import {
  EqualPredicate,
  HttpMethod,
  Imposter,
  Mountebank,
  Response,
  Stub,
} from "@anev/ts-mountebank";
import { request } from "undici";
import _ from "lodash";
import { $, sleep } from "zx";
$.verbose = false;

const tick = promisify(setTimeout);

test.todo("traefik proxies calls to mountebank imposter");
// https://community.traefik.io/t/docker-container-with-multiple-ports/4657/2
test.todo(
  "traefik proxies calls to multiple mountebank imposters - different servers on different ports"
);
test.todo("traefik load balaces several instances of same service");

test("traefik getting started, only instead of docker-compose we use testcontainers", async (t) => {
  // https://doc.traefik.io/traefik/getting-started/quick-start/#launch-traefik-with-the-docker-provider

  const network = (await new Network().start()).getName();

  const traefik = await new GenericContainer("traefik:v2.6")
    .withNetworkMode(network)
    .withCmd(["--api.insecure=true", "--providers.docker"])
    .withExposedPorts(80, 8080)
    .withBindMount("/var/run/docker.sock", "/var/run/docker.sock")
    .start();

  (await traefik.logs()).pipe(process.stderr);

  const whoami = await new GenericContainer("traefik/whoami")
    .withNetworkMode(network)
    .withLabel({
      key: "traefik.http.routers.whoami.rule",
      value: "Host(`whoami.docker.localhost`)",
    })
    .start();

  // need to add a label, but testcontainers api doesn't have it (yet)
  // maybe use the docker cli

  await whoami.getId();

  await sleep(2000);

  t.like(
    await (
      await request(
        `http://localhost:${traefik.getMappedPort(8080)}/api/rawdata`
      )
    ).body.json(),
    {
      routers: {
        "whoami@docker": {
          service: _.kebabCase(whoami.getName()),
          status: "enabled",
        },
      },
    }
  );

  t.regex(
    await (
      await request(`http://localhost:${traefik.getMappedPort(80)}`)
    ).body.text(),
    /404/
  );

  t.regex(
    await (
      await request(`http://localhost:${traefik.getMappedPort(80)}`, {
        headers: { Host: "whoami.docker.localhost" },
      })
    ).body.text(),
    new RegExp(`Hostname: ${whoami.getId().substring(0, 6)}`, "s")
  );
});

test("mountebank imposters in a docker network", async (t) => {
  const network = (
    await new Network({ name: "mountebank-test" }).start()
  ).getName();

  const mountebank = await new GenericContainer("bbyars/mountebank:2.6.0")
    .withName("mb")
    .withExposedPorts(2525)
    .withNetworkMode(network)
    .withNetworkAliases("mb", "imposter")
    .withCmd(["mb", "start"])
    .withWaitStrategy(
      Wait.forLogMessage(/mountebank v\d\.\d\.\d now taking orders/)
    )
    .start();

  t.regex(
    (await $`docker ps`).stdout,
    new RegExp(`${mountebank.getMappedPort(2525)}->2525.*mb`, "s")
  );

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

  const mb = new Mountebank().withURL(
    `http://localhost:${mountebank.getMappedPort(2525)}`
  );

  const stubBody = "hello from imposter";

  await mb.createImposter(
    new Imposter()
      .withName("imposter a")
      .withRecordRequests(true)
      .withPort(4600)
      .withStub(
        new Stub()
          .withPredicate(
            new EqualPredicate().withPath("/a").withMethod(HttpMethod.GET)
          )
          .withResponse(new Response().withStatusCode(200).withBody(stubBody))
      )
  );

  t.deepEqual(
    (await caller.exec(["curl", `http://imposter:4600/a`])).output,
    stubBody
  );

  const imposter = await mb.getImposter(4600);

  t.like(imposter, { numberOfRequests: 1 });
  t.like(imposter.requests[0], { method: "GET", path: "/a" });
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
