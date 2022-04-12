import { GenericContainer, Network } from "testcontainers";
import { request } from "undici";
import { promisify } from "util";
import { $ } from "zx";

export const buildCaller = () =>
  $`docker build --file caller.Dockerfile --tag caller .`;

export const startCaller = async ({ network }: { network: string }) => {
  await buildCaller();

  return await new GenericContainer("caller")
    .withNetworkMode(network)
    .withCmd(["sleep", "infinity"])
    .start();
};

export const tick = promisify(setTimeout);

export const startNetwork = async () => (await new Network().start()).getName();

export const startTraefik = async ({
  network,
  networkName,
}:
  | { network: string; networkName?: never }
  | { network?: never; networkName: string }) => {
  const container = await new GenericContainer("traefik:v2.6")
    .withNetworkMode(network || networkName!)
    .withCmd(["--api.insecure=true", "--providers.docker"])
    .withExposedPorts(80, 8080)
    .withBindMount("/var/run/docker.sock", "/var/run/docker.sock")
    .start();

  const port = (port: number) => container.getMappedPort(port);

  const url = () => `http://localhost:${port(80)}`;

  return {
    url,
    rawData: async () =>
      (await request(`http://localhost:${port(8080)}/api/rawdata`)).body.json(),
  };
};
