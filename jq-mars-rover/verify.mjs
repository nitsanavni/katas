import { $ } from "zx";

export const verify = async (t, result) => {
  const { stdin, exitCode } =
    $`python ../approvals-cli/verify.py -t ${t.title}`.nothrow();

  stdin.write(result);
  stdin.end();

  t.is(await exitCode, 0);
};
