import { test } from "node:test";
import assert from "node:assert/strict";
import { get } from "./client.mjs";

test("should return a minified JSON object", async () => {
    const { text, body } = await get();
    assert.equal(text, JSON.stringify(body));
});

test("should return a JSON content type", async () => {
    const { res } = await get();
    assert.match(res.headers.get("content-type") ?? "", /application\/json/);
});

test("should return a Message saying \"My name is ...\"", async () => {
    const { body } = await get();
    assert.match(body.message, /^My name is \S/);
    assert.doesNotMatch(body.message, /___/);
});
