use jieba_rs::Jieba;
use serde::{Deserialize, Serialize};
use std::{io::{BufReader}, sync::{LazyLock, Mutex}};
use wasm_bindgen::prelude::*;

#[wasm_bindgen(typescript_custom_section)]
const TS_APPEND_CONTENT: &'static str = r#"
/** Represents a single token with its word and position. */
export interface Token {
    word: string;
    start: number;
    end: number;
}

/** Represents a single word and its part-of-speech tag. */
export interface Tag {
    word: string;
    tag: string;
}
"#;

#[derive(Serialize, Deserialize)]
pub struct RetToken<'a> {
    /// Word of the token
    pub word: &'a str,
    /// Unicode start position of the token
    pub start: usize,
    /// Unicode end position of the token
    pub end: usize,
}

static JIEBA: LazyLock<Mutex<Jieba>> = LazyLock::new(|| Mutex::new(Jieba::new()));

#[wasm_bindgen(unchecked_return_type = "string[]")]
pub fn cut(text: &str, hmm: Option<bool>) -> Vec<JsValue> {
    let words = JIEBA.lock().unwrap().cut(text, hmm.unwrap_or(true));
    words.into_iter().map(JsValue::from).collect()
}

#[wasm_bindgen(unchecked_return_type = "string[]")]
pub fn cut_all(text: &str) -> Vec<JsValue> {
    let words = JIEBA.lock().unwrap().cut_all(text);
    words.into_iter().map(JsValue::from).collect()
}

#[wasm_bindgen(unchecked_return_type = "string[]")]
pub fn cut_for_search(text: &str, hmm: Option<bool>) -> Vec<JsValue> {
    let words = JIEBA
        .lock()
        .unwrap()
        .cut_for_search(text, hmm.unwrap_or(true));
    words.into_iter().map(JsValue::from).collect()
}

#[wasm_bindgen(unchecked_return_type = "Token[]")]
pub fn tokenize(text: &str, mode: &str, hmm: Option<bool>) -> Result<Vec<JsValue>, JsValue> {
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
    let tokens = JIEBA
        .lock()
        .unwrap()
        .tokenize(text, mode_enum, hmm.unwrap_or(true));
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

#[wasm_bindgen]
pub fn add_word(word: &str, freq: Option<usize>, tag: Option<String>) -> usize {
    let option_str_ref = tag.as_deref();

    JIEBA.lock().unwrap().add_word(word, freq, option_str_ref)
}

#[derive(Serialize, Deserialize)]
pub struct RetTag<'a> {
    word: &'a str,
    tag: &'a str,
}

#[wasm_bindgen(unchecked_return_type = "Tag[]")]
pub fn tag(sentence: &str, hmm: Option<bool>) -> Vec<JsValue> {
    let jieba = JIEBA.lock().unwrap();
    let tags = jieba.tag(sentence, hmm.unwrap_or(true));
    let ret_tags = tags
        .into_iter()
        .map(|t| {
            let r = RetTag {
                tag: t.tag,
                word: t.word,
            };
            serde_wasm_bindgen::to_value(&r).unwrap()
        })
        .collect();
    ret_tags
}

#[wasm_bindgen]
pub fn with_dict(dict: &str) -> Result<(), JsValue> {
    let mut jieba = JIEBA.lock().unwrap();

    let mut dict_reader = BufReader::new(dict.as_bytes());

    jieba.load_dict(&mut dict_reader).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(())
}
