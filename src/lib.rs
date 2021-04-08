use jieba_rs::Jieba;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Serialize, Deserialize)]
pub struct RetToken<'a> {
    /// Word of the token
    pub word: &'a str,
    /// Unicode start position of the token
    pub start: usize,
    /// Unicode end position of the token
    pub end: usize,
}

lazy_static! {
    pub static ref JIEBA: Jieba = Jieba::new();
}

#[wasm_bindgen]
pub fn cut(text: &str, hmm: bool) -> Vec<JsValue> {
    let words = JIEBA.cut(text, hmm);
    words.into_iter().map(JsValue::from).collect()
}

#[wasm_bindgen]
pub fn cut_all(text: &str) -> Vec<JsValue> {
    let words = JIEBA.cut_all(text);
    words.into_iter().map(JsValue::from).collect()
}

#[wasm_bindgen]
pub fn cut_for_search(text: &str, hmm: bool) -> Vec<JsValue> {
    let words = JIEBA.cut_for_search(text, hmm);
    words.into_iter().map(JsValue::from).collect()
}

#[wasm_bindgen]
pub fn tokenize(text: &str, mode: &str, hmm: bool) -> Result<Vec<JsValue>, JsValue> {
    let mode_enum: jieba_rs::TokenizeMode;
    let mode = mode.to_lowercase();
    if mode == "search" {
        mode_enum = jieba_rs::TokenizeMode::Search;
    } else if mode == "default" {
        mode_enum = jieba_rs::TokenizeMode::Default;
    } else {
        return Err(JsValue::from_str(
            "Only `default` or `search` mode is valid",
        ));
    }
    let tokens = JIEBA.tokenize(text, mode_enum, hmm);
    let ret_tokens = tokens
        .into_iter()
        .map(|tok| {
            let t = RetToken {
                word: tok.word,
                start: tok.start,
                end: tok.end,
            };
            serde_wasm_bindgen::to_value(&t).unwrap()
        })
        .collect();
    Ok(ret_tokens)
}
