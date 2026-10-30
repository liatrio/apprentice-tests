import { test } from "node:test";
import assert from "node:assert/strict";
import Ajv from "ajv";
import { get } from "./client.mjs";

const validate = new Ajv().compile({
    type: "object",
    required: ["message", "timestamp"],
    properties: {
        message: { type: "string" },
        timestamp: { type: "integer" },
    },
});

test("should match the response schema", async () => {
    const { body } = await get();
    assert.ok(validate(body), JSON.stringify(validate.errors));
});
