import { inspect } from "util";

import { filePath } from "./cli";

process.stdout.write(inspect({ filePath }));
