import test from "ava";
import { GenericContainer, Wait } from "testcontainers";
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
import { startCaller, startNetwork, startTraefik, tick } from "./utils.js";
$.verbose = false;

// https://community.traefik.io/t/docker-container-with-multiple-ports/4657/2
test.todo(
  "traefik proxies calls to multiple mountebank imposters - different servers on different ports"
);
test.todo("traefik load balances several instances of same service");

test.todo("traefik proxies calls to mountebank imposter");

test.todo(
  "traefik - don't expose the port, instead call it from within the network"
);

test("traefik getting started, only instead of docker-compose we use testcontainers", async (t) => {
  // https://doc.traefik.io/traefik/getting-started/quick-start/#launch-traefik-with-the-docker-provider

  const network = await startNetwork();

  const { teardown } = t;

  const traefik = await startTraefik({ network, teardown });

  const whoami = await new GenericContainer("traefik/whoami")
    .withNetworkMode(network)
    .withLabels({
      ["traefik.http.routers.whoami.rule"]: "Host(`whoami.docker.localhost`)",
    })
    .start();

  teardown(whoami.stop.bind(whoami));

  await sleep(2000);

  t.like(await traefik.rawData(), {
    routers: {
      "whoami@docker": {
        service: _.kebabCase(whoami.getName()),
        status: "enabled",
      },
    },
  });

  t.regex(await (await request(traefik.url())).body.text(), /404/);

  t.regex(
    await (
      await request(traefik.url(), {
        headers: { Host: "whoami.docker.localhost" },
      })
    ).body.text(),
    new RegExp(`Hostname: ${whoami.getId().substring(0, 6)}`, "s")
  );
});

test("mountebank imposters in a docker network", async (t) => {
  const network = await startNetwork();

  const { teardown } = t;

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

  t.teardown(mountebank.stop.bind(mountebank));

  t.regex(
    (await $`docker ps`).stdout,
    new RegExp(`${mountebank.getMappedPort(2525)}->2525.*mb`, "s")
  );

  (await mountebank.logs()).pipe(process.stdout);

  const caller = await startCaller({ network, teardown });

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
