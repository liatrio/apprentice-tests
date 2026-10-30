// Runs every tests/*.test.mjs with node:test.
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { run } from "node:test";
import { spec } from "node:test/reporters";

// Node actions receive inputs as INPUT_*.
process.env.APP_URL ||= process.env.INPUT_URL;

const testDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "test");
const files = (await readdir(testDir))
    .filter((file) => file.endsWith(".test.mjs"))
    .map((file) => path.join(testDir, file));

const stream = run({ files, concurrency: 1 });
stream.on("test:fail", ({ name, details }) => {
    if (details?.type === "suite") return;
    process.exitCode = 1;
    console.log(`::error title=Test failed::${name}`);
});
stream.compose(spec).pipe(process.stdout);
