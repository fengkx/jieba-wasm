import test from "node:test";
import assert from "node:assert";
import { cut } from "jieba-wasm";

test("node", async (t) => {
  await t.test("import", () => {
    assert.strictEqual(typeof cut, "function");
    assert.deepStrictEqual(cut("武汉市长江大桥"), ["武汉市", "长江大桥"]);
  });
  await t.test("dynamic import", async () => {
    const { cut } = await import("jieba-wasm");
    assert.strictEqual(typeof cut, "function");
    assert.deepStrictEqual(cut("武汉市长江大桥"), ["武汉市", "长江大桥"]);
  });
});
