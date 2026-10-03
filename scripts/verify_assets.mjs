import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// 扫描所有场景数据文件
const scenesDir = path.join(rootDir, 'src', 'data', 'scenes');
const sceneFiles = fs.readdirSync(scenesDir).filter(f => f.endsWith('.ts') && f !== 'house3DScene.ts');

console.log(`\n======================================================`);
console.log(`🔍 启动潮汕识字系统：全局 144 字数据与资产完整性自动化巡检`);
console.log(`======================================================\n`);

let totalWords = 0;
let missingImages = 0;
let missingAudio = 0;
let invalidStrokes = 0;
const sceneSummary = [];

for (const file of sceneFiles) {
  const filePath = path.join(scenesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // 支持单双引号混用及字段顺序自适应提取
  // 提取每一个 word item 对象块
  const wordBlockRegex = /["']?id["']?:\s*["']([^"']+)["'][\s\S]*?["']?character["']?:\s*["']([^"']+)["'][\s\S]*?["']?strokes["']?:\s*\[([\s\S]*?)\]/g;

  let match;
  let sceneWordCount = 0;
  let sceneImgMiss = 0;
  let sceneAudioMiss = 0;

  // 使用更强大的逐字段提取法
  // 匹配形如 "key": { ... } 或 key: { ... }
  const itemRegex = /["']?([a-zA-Z0-9_]+)["']?:\s*\{[\s\S]*?["']?character["']?:\s*["']([^"']+)["'][\s\S]*?\n\s*\},?/g;

  while ((match = itemRegex.exec(content)) !== null) {
    const block = match[0];
    const idMatch = block.match(/["']?id["']?:\s*["']([^"']+)["']/);
    const charMatch = block.match(/["']?character["']?:\s*["']([^"']+)["']/);
    const pinyinMatch = block.match(/["']?pinyin["']?:\s*["']([^"']+)["']/);
    const ipaMatch = block.match(/["']?teochewIPA["']?:\s*["']([^"']+)["']/);
    const audioMatch = block.match(/["']?teochewAudio["']?:\s*["']([^"']+)["']/);
    const imgMatch = block.match(/["']?imageUrl["']?:\s*["']([^"']+)["']/);
    const strokeCount = (block.match(/path:\s*["']|["']path["']:\s*["']/g) || []).length;

    if (!idMatch || !charMatch) continue;

    const id = idMatch[1];
    const character = charMatch[1];
    const audioUrl = audioMatch ? audioMatch[1] : '';
    const imgUrl = imgMatch ? imgMatch[1] : '';

    totalWords++;
    sceneWordCount++;

    // 1. 检查实物图片
    if (imgUrl) {
      const cleanPath = imgUrl.startsWith('/') ? imgUrl.slice(1) : imgUrl;
      const diskPath = path.join(publicDir, cleanPath);
      if (!fs.existsSync(diskPath)) {
        console.error(`❌ [图片缺失] ${file} -> [${character}] (${id}): ${diskPath}`);
        missingImages++;
        sceneImgMiss++;
      }
    } else {
      console.warn(`⚠️ [无图片路径] ${file} -> [${character}] (${id})`);
      missingImages++;
      sceneImgMiss++;
    }

    // 2. 检查音频文件
    if (audioUrl) {
      const cleanPath = audioUrl.startsWith('/') ? audioUrl.slice(1) : audioUrl;
      const diskPath = path.join(publicDir, cleanPath);
      if (!fs.existsSync(diskPath) || fs.statSync(diskPath).size === 0) {
        console.error(`❌ [音频缺失/0字节] ${file} -> [${character}] (${id}): ${diskPath}`);
        missingAudio++;
        sceneAudioMiss++;
      }
    } else {
      console.warn(`⚠️ [无音频路径] ${file} -> [${character}] (${id})`);
      missingAudio++;
      sceneAudioMiss++;
    }

    // 3. 检查笔画数据
    if (strokeCount === 0) {
      console.error(`❌ [无笔画数据] ${file} -> [${character}] (${id})`);
      invalidStrokes++;
    }
  }

  sceneSummary.push({
    file,
    words: sceneWordCount,
    missingImg: sceneImgMiss,
    missingAudio: sceneAudioMiss
  });
}

console.log(`\n📊 11 大生活场景全量资产巡检明细表：`);
console.table(sceneSummary);

console.log(`\n======================================================`);
console.log(`📋 巡检汇总统计：`);
console.log(`- 扫描场景总数: ${sceneFiles.length}`);
console.log(`- 核心生活字总数: ${totalWords}`);
console.log(`- 缺失实物图片: ${missingImages}`);
console.log(`- 缺失潮音切片: ${missingAudio}`);
console.log(`- 笔画异常字数: ${invalidStrokes}`);
console.log(`======================================================\n`);

if (missingImages === 0 && missingAudio === 0 && invalidStrokes === 0 && totalWords >= 144) {
  console.log(`🎉 100% 完美达标！全量 ${totalWords} 个生活字多媒体静态资产全部完备且非空！\n`);
  process.exit(0);
} else {
  console.error(`🚨 发现资产缺漏，请修复后再次巡检！\n`);
  process.exit(1);
}
