import { test } from "node:test";
import assert from "node:assert/strict";
import { get } from "./client.mjs";

test("should respond in under 2 seconds", async () => {
    const started = performance.now();
    await get();
    const elapsed = performance.now() - started;
    assert.ok(elapsed < 2000, `took ${Math.round(elapsed)}ms`);
});

test("should return 202 Accepted", async () => {
    const { res } = await get();
    assert.equal(res.status, 202);
});
