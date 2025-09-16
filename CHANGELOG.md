# v2.4.0
- Drop wee_alloc and use the default allocator [#17](https://github.com/fengkx/jieba-wasm/pull/17)
- Better return type [#17](https://github.com/fengkx/jieba-wasm/pull/17)

# v2.3.0
-  add `with_dict` funtion [#14](https://github.com/fengkx/jieba-wasm/pull/14)

# v2.2.0
- Add tag function [#12](https://github.com/fengkx/jieba-wasm/pull/12)
- Enable hmm by default in `cut`, `cut_for_search`, `tokenize` and `tag` function [13bcc7e](https://github.com/fengkx/jieba-wasm/commit/13bcc7e)

# v2.1.1
Fix wasm-opt process, provided smaller wasm file [e66e29a](https://github.com/fengkx/jieba-wasm/commit/e66e29a).

# v2.1.0
- Add deno exports condition and `deno`subpath exports [#9](https://github.com/fengkx/jieba-wasm/pull/9)
- Add npm provenance statements

# v2.0.1
- Add dedicated export paths for Node.js and web versions in package.json. Reorder exports field [#8](https://github.com/fengkx/jieba-wasm/pull/8)

# v2.0.0
- Switch to exports field instead of subpath import [(#6)](https://github.com/fengkx/jieba-wasm/pull/6)

Instead of
```javascript
import init, {cut} from 'jieba-wasm/pkg/web/jieba_rs_wasm';
```
Use 
```typescript
import init, {cut} from 'jieba-wasm';
```

More info on exports field https://nodejs.org/api/packages.html#community-conditions-definitions and typescript [customCondition config](https://nodejs.org/api/packages.html#community-conditions-definitions)


# v1.0.0
- Stable semver version
- compress data at build time shrink wasm about 3MB
- add deno build at `pkg/deno` dir
- add better documentation and github page playground
