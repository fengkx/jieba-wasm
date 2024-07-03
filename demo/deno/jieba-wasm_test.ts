import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { cut } from "npm:jieba-wasm@latest";
import { cut as rcCut } from 'npm:jieba-wasm@rc';

Deno.test("deno test", () => {
    assertEquals(typeof cut, 'function')
    assertEquals(typeof rcCut, 'function')
    assertEquals(cut("武汉市长江大桥", true), ["武汉市", "长江大桥"]);
    assertEquals(cut("武汉市长江大桥", true), rcCut("武汉市长江大桥", true))
});