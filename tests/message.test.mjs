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

test("should capitalize every word of the message", async () => {
    const { body } = await get();
    for (const word of body.message.split(" ")) assert.match(word, /^\p{Lu}/u, word);
});
