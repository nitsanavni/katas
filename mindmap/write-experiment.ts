import { writeFile } from "fs/promises";

(async () => {
  await writeFile("my-file-experiment", "bla bla\n", "utf-8");
})();
