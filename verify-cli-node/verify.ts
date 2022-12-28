import minimist from "minimist";
import getStdin from "get-stdin";
import { readFile, stat, writeFile } from "fs/promises";
import { execaCommand } from "execa";
const argv = minimist(process.argv.slice(2));

const input = await getStdin();

if (argv.argv) {
    console.log(argv);
    process.exit();
}

const test = argv._[0] || "approvals";
const received = `${test}.received`;
const approved = `${test}.approved`;

if (argv.paths) {
    console.log({ received, approved });
    process.exit();
}

let approvedExists = false;

try {
    await stat(approved);
    approvedExists = true;
} catch (e) {}

if (argv.exists) {
    console.log({ approvedExists });
    process.exit();
}

const approvedText = approvedExists
    ? (await readFile(approved)).toString()
    : undefined;

if (argv.approved) {
    console.log({ approvedText });
    process.exit();
}

const match = input == approvedText;

if (argv.match) {
    console.log({ match });
    process.exit();
}

const diff = () => {
    execaCommand(`${argv.diff || "code --diff"} ${received} ${approved}`, {
        stdio: "inherit",
    });
};

if (match) {
    console.log("test passed");
} else {
    console.log("test failed");
    if (!approvedExists) {
        await writeFile(approved, "");
    }
    await writeFile(received, input);
    diff();
}
