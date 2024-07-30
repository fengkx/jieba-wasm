const path = require("node:path");
const fsp = require("node:fs/promises");
const ezSpawn = require("@jsdevtools/ez-spawn");

const platforms = ["bundler", "deno", "nodejs", "web"];
const rootDir = path.join(__dirname, "..");

const distDir = path.join(rootDir, "pkg");
async function main() {
  await Promise.all(
    platforms.map(async (platform) => {
      const inputFile = path.join(distDir, platform, "jieba_rs_wasm_bg.wasm");
      const outputFile = path.join(
        distDir,
        platform,
        "jieba_rs_wasm_bg_o.wasm"
      );
      const cmd = `wasm-opt -Oz -o ${outputFile} ${inputFile}`;

      await ezSpawn.async(cmd);
      await fsp.rename(outputFile, inputFile);
    })
  );
}

main();
