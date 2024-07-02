const test = require("node:test");
const assert = require("node:assert");

test("node", async (t) => {
  await t.test("require", () => {
    const { cut } = require("jieba-wasm");
    assert.strictEqual(typeof cut, "function");
    assert.deepStrictEqual(cut("武汉市长江大桥"), ["武汉市", "长江大桥"]);
  });
  await t.test("dynamic import", async () => {
    const { cut } = await import("jieba-wasm");
    assert.strictEqual(typeof cut, "function");
    assert.deepStrictEqual(cut("武汉市长江大桥"), ["武汉市", "长江大桥"]);
  });
});
