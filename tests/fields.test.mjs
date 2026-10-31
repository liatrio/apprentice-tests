import { test } from "node:test";
import assert from "node:assert/strict";
import fields from "./fields.json" assert { type: "json" };
import { get } from "./client.mjs";

test("should match the field types in the fixture", async () => {
    const { body } = await get();
    for (const [key, type] of Object.entries(fields)) assert.equal(typeof body[key], type, key);
});
