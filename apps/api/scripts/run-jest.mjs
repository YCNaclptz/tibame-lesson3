import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const apiRoot = path.resolve(scriptDir, "..");
const requireFromApi = createRequire(path.join(apiRoot, "package.json"));
const jestBin = requireFromApi.resolve("jest/bin/jest");

const result = spawnSync(
  process.execPath,
  ["--experimental-vm-modules", jestBin, ...process.argv.slice(2)],
  {
    cwd: apiRoot,
    env: process.env,
    stdio: "inherit",
  },
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
