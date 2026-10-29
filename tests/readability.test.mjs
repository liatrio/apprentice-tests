import { test } from "node:test";
import assert from "node:assert/strict";
import { get } from "./client.mjs";

test("should return an indented, human-readable JSON object", async () => {
    const { text, body } = await get();
    assert.equal(text, JSON.stringify(body, null, 2), "expected an indented body");
});
