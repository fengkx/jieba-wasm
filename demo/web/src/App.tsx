import { useEffect, useState } from 'react';
import init, { cut } from '../../../pkg/web/jieba_rs_wasm';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleCut = () => {
    const newResult = cut(message, false);
    setResults(newResult);
  };

  useEffect(() => {
    // 重要：使用前务必先初始化
    init().then(() => {
      console.log('jieba-wasm initialized');
    });
  }, []);

  return (
    <div className="p-16 w-1/2 mx-auto min-w-[500px]">
      <h1 className="text-3xl font-bold">jieba-wasm 浏览器端演示</h1>

      <div className="mt-8">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">原文</label>
        <textarea value={message} onChange={e => { setMessage(e.target.value) }} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="输入要分词的内容"></textarea>
      </div>
      <button onClick={handleCut} type="button" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">分词</button>

      <div className="mt-8">
        <p className='block text-sm font-medium text-gray-900'>分词结果</p>
        <div className='block leading-10 py-2 w-full min-h-[200px] gap-x-2 gap-y-2'>
          {results.map(result => <Tag key={result} content={result} />)}
        </div>
      </div>
    </div>
  );
};

const Tag = (props: { content: string }) => <span className="break-keep h-[36px] bg-blue-100 text-blue-800 text-sm font-medium m-2 px-4 py-2 rounded">{props.content}</span>

export default App;
