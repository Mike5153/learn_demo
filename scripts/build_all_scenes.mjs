import https from 'https';
import fs from 'fs';
import path from 'path';

// 9 new scenes definition
const SCENE_DEFS = [
  {
    id: 'courtyard',
    name: '大厅天井',
    subtitle: '开门迎客',
    icon: '🚪',
    hintText: '👆 点院落物事识字',
    backText: '大厅',
    liquidType: 'water',
    defaultWordId: 'door',
    words: [
      { id: 'door', char: '门', pinyin: 'mén', ipa: 'mŋ̂⁵', trigger: '宅门', tier: 'basic' },
      { id: 'lock', char: '锁', pinyin: 'suǒ', ipa: 'só²', trigger: '铜锁', tier: 'basic' },
      { id: 'table', char: '桌', pinyin: 'zhuō', ipa: 'toh⁴', trigger: '八仙桌', tier: 'basic' },
      { id: 'chair', char: '椅', pinyin: 'yǐ', ipa: 'í²', trigger: '靠背椅', tier: 'basic' },
      { id: 'broom', char: '扫', pinyin: 'sǎo', ipa: 'sàu³', trigger: '竹扫帚', tier: 'basic' },
      { id: 'clean', char: '净', pinyin: 'jìng', ipa: 'tsiã⁶', trigger: '青石净地', tier: 'basic' },
      { id: 'open', char: '开', pinyin: 'kāi', ipa: 'khui¹', trigger: '推门迎客', tier: 'advanced' },
      { id: 'close', char: '关', pinyin: 'guān', ipa: 'kuĩ¹', trigger: '闭门防风', tier: 'advanced' },
      { id: 'enter', char: '进', pinyin: 'jìn', ipa: 'tsìn³', trigger: '请客进门', tier: 'advanced' },
      { id: 'sit', char: '坐', pinyin: 'zuò', ipa: 'tsē⁷', trigger: '请坐喝茶', tier: 'advanced' },
      { id: 'lamp', char: '灯', pinyin: 'dēng', ipa: 'teng¹', trigger: '明亮厅灯', tier: 'advanced' },
      { id: 'clock', char: '钟', pinyin: 'zhōng', ipa: 'tseng¹', trigger: '老式挂钟', tier: 'advanced' },
      { id: 'hall', char: '堂', pinyin: 'táng', ipa: 'tông⁵', trigger: '中堂大厅', tier: 'advanced' },
    ]
  },
  {
    id: 'bedroom',
    name: '房内起居',
    subtitle: '针线寝居',
    icon: '🛏️',
    hintText: '👆 点房内物事识字',
    backText: '卧房',
    liquidType: 'water',
    defaultWordId: 'bed',
    words: [
      { id: 'bed', char: '床', pinyin: 'chuáng', ipa: 'tshn̂g⁵', trigger: '架子床', tier: 'basic' },
      { id: 'quilt', char: '被', pinyin: 'bèi', ipa: 'phuê⁷', trigger: '棉花被', tier: 'basic' },
      { id: 'clothes', char: '衣', pinyin: 'yī', ipa: 'i¹', trigger: '唐装布衣', tier: 'basic' },
      { id: 'needle', char: '针', pinyin: 'zhēn', ipa: 'tsiam¹', trigger: '缝衣针', tier: 'basic' },
      { id: 'thread', char: '线', pinyin: 'xiàn', ipa: 'suã³', trigger: '彩线轴', tier: 'basic' },
      { id: 'comb', char: '梳', pinyin: 'shū', ipa: 'se¹', trigger: '黄杨木梳', tier: 'basic' },
      { id: 'cloth', char: '布', pinyin: 'bù', ipa: 'pò³', trigger: '花布匹', tier: 'advanced' },
      { id: 'scissors', char: '剪', pinyin: 'jiǎn', ipa: 'tsíⁿ²', trigger: '裁缝铁剪', tier: 'advanced' },
      { id: 'mend', char: '补', pinyin: 'bǔ', ipa: 'pó²', trigger: '缝衣补裳', tier: 'advanced' },
      { id: 'towel', char: '巾', pinyin: 'jīn', ipa: 'keng¹', trigger: '洗脸毛巾', tier: 'advanced' },
      { id: 'mirror', char: '镜', pinyin: 'jìng', ipa: 'kiã³', trigger: '铜面镜', tier: 'advanced' },
      { id: 'shoes', char: '鞋', pinyin: 'xié', ipa: 'oi⁵', trigger: '千层底鞋', tier: 'advanced' },
      { id: 'peace', char: '安', pinyin: 'ān', ipa: 'an¹', trigger: '安宁静歇', tier: 'advanced' },
    ]
  },
  {
    id: 'guo_table',
    name: '做粿案台',
    subtitle: '时节做粿',
    icon: '🥟',
    hintText: '👆 点案台物料识字',
    backText: '案台',
    liquidType: 'tea',
    defaultWordId: 'guo',
    words: [
      { id: 'guo', char: '粿', pinyin: 'guǒ', ipa: 'kué²', trigger: '红桃粿', tier: 'basic' },
      { id: 'mold', char: '印', pinyin: 'yìn', ipa: 'ìn³', trigger: '木雕粿印', tier: 'basic' },
      { id: 'flour', char: '粉', pinyin: 'fěn', ipa: 'hún²', trigger: '水磨糯米粉', tier: 'basic' },
      { id: 'sugar', char: '糖', pinyin: 'táng', ipa: 'thŋ̂⁵', trigger: '红糖老砖', tier: 'basic' },
      { id: 'red', char: '红', pinyin: 'hóng', ipa: 'âng⁵', trigger: '大红曲米', tier: 'basic' },
      { id: 'wrap', char: '包', pinyin: 'bāo', ipa: 'pau¹', trigger: '捏皮包馅', tier: 'basic' },
      { id: 'bean', char: '豆', pinyin: 'dòu', ipa: 'tâu⁷', trigger: '红豆甜馅', tier: 'advanced' },
      { id: 'skin', char: '皮', pinyin: 'pí', ipa: 'phuê⁵', trigger: '柔韧粿皮', tier: 'advanced' },
      { id: 'steam_guo', char: '蒸', pinyin: 'zhēng', ipa: 'tseng¹', trigger: '开锅大蒸', tier: 'advanced' },
      { id: 'fry_guo', char: '煎', pinyin: 'jiān', ipa: 'tsin¹', trigger: '热鼎慢煎', tier: 'advanced' },
      { id: 'sweet_taste', char: '甜', pinyin: 'tián', ipa: 'tiⁿ¹', trigger: '香甜可口', tier: 'advanced' },
      { id: 'peach_shape', char: '桃', pinyin: 'táo', ipa: 'thô⁵', trigger: '寿桃图案', tier: 'advanced' },
      { id: 'year_festival', char: '年', pinyin: 'nián', ipa: 'nî⁵', trigger: '过年过节', tier: 'advanced' },
    ]
  },
  {
    id: 'altar',
    name: '祖厅神台',
    subtitle: '拜老爷祈福',
    icon: '🏮',
    hintText: '👆 点神台供礼识字',
    backText: '神台',
    liquidType: 'tea',
    defaultWordId: 'incense',
    words: [
      { id: 'incense', char: '香', pinyin: 'xiāng', ipa: 'hiang¹', trigger: '红脚清香', tier: 'basic' },
      { id: 'candle', char: '烛', pinyin: 'zhú', ipa: 'tsiek⁴', trigger: '神前红烛', tier: 'basic' },
      { id: 'worship', char: '拜', pinyin: 'bài', ipa: 'pài³', trigger: '虔诚礼拜', tier: 'basic' },
      { id: 'fortune', char: '福', pinyin: 'fú', ipa: 'hok⁴', trigger: '金字红福', tier: 'basic' },
      { id: 'peaceful', char: '平', pinyin: 'píng', ipa: 'pên⁵', trigger: '四时平顺', tier: 'basic' },
      { id: 'tranquil', char: '宁', pinyin: 'níng', ipa: 'nêng⁵', trigger: '合家安宁', tier: 'basic' },
      { id: 'god', char: '神', pinyin: 'shén', ipa: 'sîn⁵', trigger: '老爷神位', tier: 'advanced' },
      { id: 'flower', char: '花', pinyin: 'huā', ipa: 'hue¹', trigger: '清香供花', tier: 'advanced' },
      { id: 'fruit', char: '果', pinyin: 'guǒ', ipa: 'kué²', trigger: '大桔五果', tier: 'advanced' },
      { id: 'great', char: '大', pinyin: 'dà', ipa: 'tuā⁷', trigger: '大吉大利', tier: 'advanced' },
      { id: 'lucky', char: '吉', pinyin: 'jí', ipa: 'kiet⁴', trigger: '吉祥如意', tier: 'advanced' },
      { id: 'protect', char: '保', pinyin: 'bǎo', ipa: 'pó²', trigger: '保号儿孙', tier: 'advanced' },
      { id: 'longevity', char: '寿', pinyin: 'shòu', ipa: 'siu⁷', trigger: '长生富寿', tier: 'advanced' },
    ]
  },
  {
    id: 'porridge',
    name: '清早食糜',
    subtitle: '杂咸白粥',
    icon: '🥣',
    hintText: '👆 点餐桌饭食识字',
    backText: '饭桌',
    liquidType: 'water',
    defaultWordId: 'porridge_rice',
    words: [
      { id: 'porridge_rice', char: '糜', pinyin: 'méi', ipa: 'mûê⁵', trigger: '砂锅白粥', tier: 'basic' },
      { id: 'fish', char: '鱼', pinyin: 'yú', ipa: 'hê⁵', trigger: '干煎巴浪', tier: 'basic' },
      { id: 'veggies', char: '菜', pinyin: 'cài', ipa: 'tshài³', trigger: '黑油菜脯', tier: 'basic' },
      { id: 'egg', char: '蛋', pinyin: 'dàn', ipa: 'nŋ̄⁷', trigger: '出油咸蛋', tier: 'basic' },
      { id: 'meat', char: '肉', pinyin: 'ròu', ipa: 'bah⁴', trigger: '潮汕卤肉', tier: 'basic' },
      { id: 'warm', char: '温', pinyin: 'wēn', ipa: 'un¹', trigger: '温热适口', tier: 'basic' },
      { id: 'eat', char: '食', pinyin: 'shí', ipa: 'tsiah⁸', trigger: '食朝食饱', tier: 'advanced' },
      { id: 'full', char: '饱', pinyin: 'bǎo', ipa: 'pá²', trigger: '肚腹饱暖', tier: 'advanced' },
      { id: 'salty', char: '咸', pinyin: 'xián', ipa: 'kiâm⁵', trigger: '杂咸小菜', tier: 'advanced' },
      { id: 'soy_paste', char: '豆', pinyin: 'dòu', ipa: 'tâu⁷', trigger: '普宁豆瓣', tier: 'advanced' },
      { id: 'ginger', char: '姜', pinyin: 'jiāng', ipa: 'kiũ¹', trigger: '细切生姜', tier: 'advanced' },
      { id: 'spoon', char: '匙', pinyin: 'chí', ipa: 'sî⁵', trigger: '白瓷汤匙', tier: 'advanced' },
      { id: 'morning', char: '早', pinyin: 'zǎo', ipa: 'tsá²', trigger: '早起开饭', tier: 'advanced' },
    ]
  },
  {
    id: 'market',
    name: '墟市采买',
    subtitle: '菜市秤钱',
    icon: '🧺',
    hintText: '👆 点菜摊物事识字',
    backText: '菜市',
    liquidType: 'water',
    defaultWordId: 'buy',
    words: [
      { id: 'buy', char: '买', pinyin: 'mǎi', ipa: 'bué²', trigger: '赶集挑选', tier: 'basic' },
      { id: 'sell', char: '卖', pinyin: 'mài', ipa: 'buê⁷', trigger: '摊贩叫卖', tier: 'basic' },
      { id: 'scale', char: '秤', pinyin: 'chèng', ipa: 'tsshìn³', trigger: '提杆铜秤', tier: 'basic' },
      { id: 'money', char: '钱', pinyin: 'qián', ipa: 'tsîⁿ⁵', trigger: '找零钞票', tier: 'basic' },
      { id: 'catty', char: '斤', pinyin: 'jīn', ipa: 'keng¹', trigger: '市斤计重', tier: 'basic' },
      { id: 'yuan', char: '元', pinyin: 'yuán', ipa: 'îⁿ⁵', trigger: '标价银元', tier: 'basic' },
      { id: 'liang', char: '两', pinyin: 'liǎng', ipa: 'niú²', trigger: '秤星两数', tier: 'advanced' },
      { id: 'much', char: '多', pinyin: 'duō', ipa: 'tsē⁷', trigger: '添多添满', tier: 'advanced' },
      { id: 'little', char: '少', pinyin: 'shǎo', ipa: 'tsió²', trigger: '少取适量', tier: 'advanced' },
      { id: 'costly', char: '贵', pinyin: 'guì', ipa: 'kuì³', trigger: '菜贵肉贵', tier: 'advanced' },
      { id: 'cheap', char: '便', pinyin: 'pián', ipa: 'pêⁿ⁵', trigger: '便宜得益', tier: 'advanced' },
      { id: 'change_money', char: '找', pinyin: 'zhǎo', ipa: 'tshe⁷', trigger: '清点找零', tier: 'advanced' },
      { id: 'city_market', char: '市', pinyin: 'shì', ipa: 'tsshî⁷', trigger: '热闹墟市', tier: 'advanced' },
    ]
  },
  {
    id: 'farm',
    name: '园头田埂',
    subtitle: '菜园劳作',
    icon: '🌱',
    hintText: '👆 点菜园物事识字',
    backText: '菜园',
    liquidType: 'water',
    defaultWordId: 'field',
    words: [
      { id: 'field', char: '田', pinyin: 'tián', ipa: 'tshân⁵', trigger: '方格田畦', tier: 'basic' },
      { id: 'ox', char: '牛', pinyin: 'niú', ipa: 'ngû⁵', trigger: '耕地水牛', tier: 'basic' },
      { id: 'grass', char: '草', pinyin: 'cǎo', ipa: 'tsháu²', trigger: '垄边杂草', tier: 'basic' },
      { id: 'plant_seed', char: '种', pinyin: 'zhòng', ipa: 'tsìng³', trigger: '播撒菜籽', tier: 'basic' },
      { id: 'melon', char: '瓜', pinyin: 'guā', ipa: 'kue¹', trigger: '篱架青瓜', tier: 'basic' },
      { id: 'pick_fruit', char: '摘', pinyin: 'zhāi', ipa: 'tiah⁴', trigger: '伸手采摘', tier: 'basic' },
      { id: 'soil', char: '土', pinyin: 'tǔ', ipa: 'thô²', trigger: '肥沃泥土', tier: 'advanced' },
      { id: 'ground', char: '地', pinyin: 'dì', ipa: 'tē⁷', trigger: '屋后自留地', tier: 'advanced' },
      { id: 'irrigation', char: '水', pinyin: 'shuǐ', ipa: 'zui²', trigger: '灌溉清流', tier: 'advanced' },
      { id: 'pour_water', char: '浇', pinyin: 'jiāo', ipa: 'ak⁴', trigger: '提勺浇菜', tier: 'advanced' },
      { id: 'harvest', char: '收', pinyin: 'shōu', ipa: 'siu¹', trigger: '丰盛收获', tier: 'advanced' },
      { id: 'sky', char: '天', pinyin: 'tiān', ipa: 'thiⁿ¹', trigger: '晴朗蓝天', tier: 'advanced' },
      { id: 'spring', char: '春', pinyin: 'chūn', ipa: 'tshun¹', trigger: '开春翻土', tier: 'advanced' },
    ]
  },
  {
    id: 'medicine',
    name: '厝内药箱',
    subtitle: '看药防错',
    icon: '💊',
    hintText: '👆 点药箱药物识字',
    backText: '药箱',
    liquidType: 'water',
    defaultWordId: 'med',
    words: [
      { id: 'med', char: '药', pinyin: 'yào', ipa: 'iêh⁸', trigger: '家庭药箱', tier: 'basic' },
      { id: 'day', char: '日', pinyin: 'rì', ipa: 'zih⁸', trigger: '每日服用', tier: 'basic' },
      { id: 'morning_med', char: '早', pinyin: 'zǎo', ipa: 'tsá²', trigger: '早饭之前', tier: 'basic' },
      { id: 'night_med', char: '晚', pinyin: 'wǎn', ipa: 'mŋ́²', trigger: '晚睡之前', tier: 'basic' },
      { id: 'pill', char: '丸', pinyin: 'wán', ipa: 'uân⁵', trigger: '铝箔药丸', tier: 'basic' },
      { id: 'take_dose', char: '服', pinyin: 'fú', ipa: 'hok⁸', trigger: '温水送服', tier: 'basic' },
      { id: 'eat_med', char: '吃', pinyin: 'chī', ipa: 'tsiah⁸', trigger: '遵医服药', tier: 'advanced' },
      { id: 'times_dose', char: '次', pinyin: 'cì', ipa: 'tshù³', trigger: '一日三次', tier: 'advanced' },
      { id: 'granule', char: '粒', pinyin: 'lì', ipa: 'liah⁸', trigger: '每次两粒', tier: 'advanced' },
      { id: 'meal_time', char: '饭', pinyin: 'fàn', ipa: 'pn̄g⁷', trigger: '饭后护胃', tier: 'advanced' },
      { id: 'stop_med', char: '止', pinyin: 'zhǐ', ipa: 'tsí²', trigger: '痛止即停', tier: 'advanced' },
      { id: 'care_body', char: '护', pinyin: 'hù', ipa: 'hū⁷', trigger: '保重护理', tier: 'advanced' },
      { id: 'body', char: '身', pinyin: 'shēn', ipa: 'sing¹', trigger: '身体安康', tier: 'advanced' },
    ]
  },
  {
    id: 'family',
    name: '堂前儿孙',
    subtitle: '天伦合家',
    icon: '👨‍👩‍👧‍👦',
    hintText: '👆 点堂前人物识字',
    backText: '堂前',
    liquidType: 'tea',
    defaultWordId: 'grandson',
    words: [
      { id: 'grandson', char: '孙', pinyin: 'sūn', ipa: 'sun¹', trigger: '承欢小孙', tier: 'basic' },
      { id: 'child', char: '仔', pinyin: 'zǐ', ipa: 'kiã²', trigger: '亲爱伲仔', tier: 'basic' },
      { id: 'grandfather', char: '公', pinyin: 'gōng', ipa: 'ang¹', trigger: '慈祥阿公', tier: 'basic' },
      { id: 'grandmother', char: '婆', pinyin: 'pó', ipa: 'pô⁵', trigger: '可敬阿婆', tier: 'basic' },
      { id: 'home', char: '家', pinyin: 'jiā', ipa: 'ke¹', trigger: '温馨老家', tier: 'basic' },
      { id: 'joy', char: '乐', pinyin: 'lè', ipa: 'lah⁸', trigger: '天伦之乐', tier: 'basic' },
      { id: 'father', char: '父', pinyin: 'fù', ipa: 'pê⁷', trigger: '严父尊长', tier: 'advanced' },
      { id: 'mother', char: '母', pinyin: 'mǔ', ipa: 'bó²', trigger: '慈爱母亲', tier: 'advanced' },
      { id: 'son', char: '儿', pinyin: 'ér', ipa: 'jî⁵', trigger: '归家儿子', tier: 'advanced' },
      { id: 'filial', char: '孝', pinyin: 'xiào', ipa: 'hàu³', trigger: '百善孝先', tier: 'advanced' },
      { id: 'harmony', char: '和', pinyin: 'hé', ipa: 'hô⁵', trigger: '合家和气', tier: 'advanced' },
      { id: 'bliss', char: '喜', pinyin: 'xǐ', ipa: 'hí²', trigger: '喜笑颜开', tier: 'advanced' },
      { id: 'smooth', char: '顺', pinyin: 'shùn', ipa: 'sùn⁷', trigger: '顺心如意', tier: 'advanced' },
    ]
  }
];

// Helper to fetch HTTP/HTTPS
function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchText(res.headers.location).then(resolve).catch(reject);
      }
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

function downloadBinary(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBinary(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(fs.statSync(dest).size)));
    }).on('error', reject);
  });
}

// Hanzi Writer cache
const hanziCache = new Map();

async function getHanziData(char) {
  if (hanziCache.has(char)) return hanziCache.get(char);

  if (char === '粿') {
    // Synthesize 粿 from 米 and 果
    const mi = await getHanziData('米');
    const guo = await getHanziData('果');
    
    // Scale and shift medians
    const miMedians = mi.medians.map(stroke => 
      stroke.map(([x, y]) => [Math.round(180 + (x - 512) * 0.44), Math.round(480 + (y - 512) * 0.88)])
    );
    const guoMedians = guo.medians.map(stroke => 
      stroke.map(([x, y]) => [Math.round(620 + (x - 512) * 0.52), Math.round(480 + (y - 512) * 0.92)])
    );
    const result = { medians: [...miMedians, ...guoMedians] };
    hanziCache.set(char, result);
    return result;
  }

  const jsonStr = await fetchText('https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/' + encodeURIComponent(char) + '.json');
  const data = JSON.parse(jsonStr);
  hanziCache.set(char, data);
  return data;
}

// Mogher Audio Cache
const mogherAudioCache = new Map();

async function getAudioForChar(char) {
  if (mogherAudioCache.has(char)) return mogherAudioCache.get(char);

  try {
    const pageHtml = await fetchText('https://www.mogher.com/' + encodeURIComponent(char));
    const match = pageHtml.match(/sound\/syllabes\/[^\"]+\.mp3/);
    if (match) {
      const url = 'https://www.mogher.com/' + match[0];
      const audioFileName = path.basename(match[0]);
      mogherAudioCache.set(char, { url, fileName: audioFileName });
      return { url, fileName: audioFileName };
    }
  } catch (e) {
    console.warn(`Could not get audio for ${char}:`, e.message);
  }
  return null;
}

function processMediansToStrokes(medians) {
  let minX = 9999, maxX = -9999, minY = 9999, maxY = -9999;
  medians.forEach(stroke => {
    stroke.forEach(([x, y]) => {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    });
  });

  const hwHeight = Math.max(1, maxY - minY);
  const targetHeight = 520;
  const scale = targetHeight / hwHeight;
  const targetCenterX = 400;
  const targetCenterY = 425;
  const hwCenterX = (minX + maxX) / 2;
  const hwCenterY = (minY + maxY) / 2;

  const strokeOrderNames = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六'];

  return medians.map((m, idx) => {
    const pts = m.map(([hx, hy]) => {
      const sx = Math.round(targetCenterX + (hx - hwCenterX) * scale);
      const sy = Math.round(targetCenterY - (hy - hwCenterY) * scale);
      return [sx, sy];
    });

    let pathStr = '';
    let len = 0;
    pts.forEach(([x, y], i) => {
      if (i === 0) pathStr += `M ${x},${y}`;
      else {
        pathStr += ` L ${x},${y}`;
        const prev = pts[i - 1];
        len += Math.hypot(x - prev[0], y - prev[1]);
      }
    });

    return {
      name: `${strokeOrderNames[idx] || (idx + 1)}笔`,
      path: pathStr,
      length: Math.round(len)
    };
  });
}

async function build() {
  const audioDir = path.resolve('public/audio');
  if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

  const scenesOutDir = path.resolve('src/data/scenes');
  if (!fs.existsSync(scenesOutDir)) fs.mkdirSync(scenesOutDir, { recursive: true });

  for (const scene of SCENE_DEFS) {
    console.log(`\n================ Processing ${scene.name} (${scene.id}) ================`);
    const wordEntries = {};

    for (const item of scene.words) {
      console.log(`Processing char [${item.char}]...`);
      // 1. Get Hanzi Data
      const hData = await getHanziData(item.char);
      const strokes = processMediansToStrokes(hData.medians);

      // 2. Get Audio
      let audioPath = `/audio/${item.char}.mp3`;
      const audioInfo = await getAudioForChar(item.char);
      if (audioInfo) {
        const destFile = path.join(audioDir, audioInfo.fileName);
        if (!fs.existsSync(destFile)) {
          try {
            await downloadBinary(audioInfo.url, destFile);
            console.log(`  Downloaded ${audioInfo.fileName} from ${audioInfo.url}`);
          } catch (e) {
            console.warn(`  Failed download ${audioInfo.fileName}: ${e.message}`);
          }
        }
        audioPath = `/audio/${audioInfo.fileName}`;
      }

      wordEntries[item.id] = {
        id: item.id,
        character: item.char,
        pinyin: item.pinyin,
        teochewIPA: item.ipa,
        teochewAudio: audioPath,
        triggerName: item.trigger,
        imageUrl: `/images/items/${item.id}.png`,
        tier: item.tier,
        strokes
      };
    }

    // Write scene file
    const tsCode = `import type { SceneConfig } from '../../types/literacy';

/**
 * 场景：${scene.name} (${scene.subtitle})
 * 收录 ${scene.words.length} 个核心生活用字（双梯次渐进式识字架构）
 */
export const ${scene.id}SceneConfig: SceneConfig = {
  id: '${scene.id}',
  name: '${scene.name}',
  subtitle: '${scene.subtitle}',
  icon: '${scene.icon}',
  hintText: '${scene.hintText}',
  backText: '${scene.backText}',
  liquidType: '${scene.liquidType}',
  defaultWordId: '${scene.defaultWordId}',
  words: ${JSON.stringify(wordEntries, null, 2)}
};
`;

    const outPath = path.join(scenesOutDir, `${scene.id}Scene.ts`);
    fs.writeFileSync(outPath, tsCode, 'utf8');
    console.log(`Saved ${outPath}`);
  }

  console.log('\nAll 9 scenes generated successfully!');
}

build().catch(err => {
  console.error('Build error:', err);
  process.exit(1);
});
