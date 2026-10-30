import { test } from "node:test";
import assert from "node:assert/strict";
import { setTimeout as sleep } from "node:timers/promises";
import { get } from "./client.mjs";

test("should return a JSON object with a timestamp", async () => {
    const { body } = await get();
    assert.ok(Object.hasOwn(body, "timestamp"), "response has no timestamp field");
});

test("should return the timestamp as an integer", async () => {
    const { body } = await get();
    assert.ok(Number.isInteger(body.timestamp), `expected an integer, got ${JSON.stringify(body.timestamp)}`);
});

test("should return a timestamp that does not go backwards", async () => {
    const first = (await get()).body.timestamp;
    await sleep(50);
    const second = (await get()).body.timestamp;
    assert.ok(second >= first, `timestamp went from ${first} to ${second}`);
});

test("should return an RFC 3339 timestamp", async () => {
    const { body } = await get();
    assert.equal(typeof body.timestamp, "string", `expected an RFC 3339 string, got ${typeof body.timestamp}`);
    assert.ok(!Number.isNaN(Date.parse(body.timestamp)), "timestamp does not parse");
});
