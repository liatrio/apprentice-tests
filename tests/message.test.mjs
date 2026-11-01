import { test } from "node:test";
import assert from "node:assert/strict";
import { get } from "./client.mjs";

test("should return a message of reasonable length", async () => {
    const { body } = await get();
    assert.equal(typeof body.message, "string");
    const max = 200;
    assert.ok(body.message.length > 0, "message is empty");
    assert.ok(body.message.length <= max, `message too long (${body.message.length} > ${max})`);
});

test("should not use first-person words", async () => {
    const { body } = await get();
    assert.doesNotMatch(body.message, /\b(I|me|my)\b/i);
});
