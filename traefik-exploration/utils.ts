import { TeardownFn } from "ava";
import { GenericContainer, Network } from "testcontainers";
import { request } from "undici";
import { promisify } from "util";
import { $ } from "zx";

export const buildCaller = () =>
  $`docker build --file caller.Dockerfile --tag caller .`;

export const startCaller = async ({
  network,
  teardown,
}: {
  network: string;
  teardown?: TeardownFn;
}) => {
  await buildCaller();

  const container = await new GenericContainer("caller")
    .withNetworkMode(network)
    .withCmd(["sleep", "infinity"])
    .start();

  teardown?.(container.stop.bind(container));

  return container;
};

export const tick = promisify(setTimeout);

export const startNetwork = async () => (await new Network().start()).getName();

export const startTraefik = async ({
  network,
  networkName,
  teardown,
}: { teardown: TeardownFn } & (
  | { network: string; networkName?: never }
  | { network?: never; networkName: string }
)) => {
  const container = await new GenericContainer("traefik:v2.6")
    .withNetworkMode(network || networkName!)
    .withCmd(["--api.insecure=true", "--providers.docker"])
    .withExposedPorts(80, 8080)
    .withBindMount("/var/run/docker.sock", "/var/run/docker.sock")
    .start();

  teardown(container.stop.bind(container));

  const port = (port: number) => container.getMappedPort(port);

  const url = () => `http://localhost:${port(80)}`;

  return {
    url,
    rawData: async () =>
      (await request(`http://localhost:${port(8080)}/api/rawdata`)).body.json(),
  };
};
