import { test } from "node:test";
import assert from "node:assert/strict";
const { get } = require("./client.mjs");

test("should respond within 2 seconds", async () => {
    const started = performance.now();
    await get();
    const elapsed = performance.now() - started;
    assert.ok(elapsed < 2000, `took ${Math.round(elapsed)}ms`);
});
