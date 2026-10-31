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

test("should return a timestamp within the safe integer range", async () => {
    const { body } = await get();
    assert.ok(Number.isSafeInteger(body.timestamp), `unsafe integer ${body.timestamp}`);
});

test("should return the timestamp as seconds and nanos", async () => {
    const { body } = await get();
    assert.ok(Number.isInteger(body.timestamp?.seconds), "timestamp has no seconds");
    assert.ok(Number.isInteger(body.timestamp?.nanos), "timestamp has no nanos");
});
