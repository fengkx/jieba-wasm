"use client";
import { useState, use, cache, useOptimistic, useDeferredValue } from "react";
import init, { cut } from "../../../pkg/web/jieba_rs_wasm";

let cached: ReturnType<typeof init>;
const initWasm = () => {
  if (!cached) {
    cached = init();
  }
  return cached;
};

const Tag = (props: { content: string }) => (
  <span className="break-keep h-[36px] bg-blue-100 text-blue-800 text-sm font-medium m-2 px-4 py-2 rounded">
    {props.content}
  </span>
);

export function Demo() {
  const [message, setMessage] = useState("");
  const [auto, setAuto] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleCut = (message: string) => {
    const newResult = cut(message, false);
    setResults([...newResult]);
  };

  const splitWords = useDeferredValue(results);

  use(initWasm());
  console.log(splitWords);

  return (
    <div className="p-16 w-1/2 mx-auto min-w-[500px]">
      <h1 className="text-3xl font-bold">jieba-wasm 浏览器端演示</h1>

      <div className="mt-8">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          原文
        </label>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (auto) {
              handleCut(e.target.value);
            }
          }}
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="输入要分词的内容"
        ></textarea>
      </div>

      <div className="flex gap-2 items-center font-medium text-sm">
        <button
          onClick={() => {
            handleCut(message);
          }}
          type="button"
          className="mt-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  px-5 py-2.5 me-2 mb-2"
        >
          分词
        </button>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="auto"
              name="auto"
              type="checkbox"
              checked={auto}
              onChange={(e) => {
                setAuto(e.target.checked);
              }}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="auto" className="font-medium text-gray-900">
              自动分词
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="block text-sm font-medium text-gray-900">分词结果</p>
        <div className="block leading-10 py-2 w-full min-h-[200px] gap-x-2 gap-y-2">
          {splitWords.map((word, index) => (
            <Tag key={message + word + index} content={word} />
          ))}
        </div>
      </div>
    </div>
  );
}
