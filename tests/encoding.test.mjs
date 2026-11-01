import { test } from "node:test";
import assert from "node:assert/strict";
import { get } from "./client.mjs";

test("should start with a UTF-8 byte order mark", async () => {
    const { text } = await get();
    assert.equal(text.charCodeAt(0), 0xfeff, "no byte order mark");
});
