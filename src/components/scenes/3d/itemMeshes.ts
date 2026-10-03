import * as THREE from 'three';
import type { Interactive3DItem } from './types';
import { buildItemObject3D } from './propModels';

/**
 * 潮汕三维全景生活实景：全量 11 大生活场景“字对应物品的三维模型”装配中枢
 * 将全屋 144 个生活汉字，实体化呈现为其对应的真实生活实物三维道具模型。
 * 
 * 核心实物道具涵盖：
 * - 厝内工夫：朱泥西施冲罐、若琛瓯三杯、陶土砂铫、红泥风炉炭火、锡制茶仓、青橄榄盘等
 * - 灶下炊事：双耳大生铁鼎、竹编多层蒸笼、方头锻打菜刀、厚银杏木砧板、陶土大米缸、公鸡大瓷碗等
 * - 大院天井：双扇大木宅门、黄铜广锁、正方八仙桌、竹木交椅、竹扫帚、条木长凳、大红纱灯笼等
 * - 祖厅神台：兽首三足铜香炉、高足红烛台、红锦绣花拜垫、金漆木雕老爷神龛、大桔宝塔供盘等
 * - 做粿案台：经典潮汕红桃粿、雕花木粿印模具、雪白米粉堆、深红老糖砖、平底金黄煎红桃粿等
 * - 西厢卧房：百宝嵌雕花架子床、大红牡丹绸缎棉被、立式衣架长衫、黄杨木梳、双环大剪刀、绣花鞋等
 * - 厝内药箱：九格中药百宝箱、金箔蜜炼大药丸、青花早晚药盅、铸铁研钵捣药臼、经络木偶人等
 * - 园头田埂：老水牛【躯干/粗壮四肢/大弯角/牛尾】、整齐菜垄田畦、竹架青丝瓜、老石水井辘轳等
 * - 清早食糜：双耳白粥大砂锅、长盘金黄干煎巴浪鱼、老菜脯碟、红心流油咸鸭蛋、卤肉拼盘等
 * - 堂前团聚：阿公竹躺椅与拐杖、阿婆针线笸箩、竹婴儿摇篮、四世同堂大金匾、和气立轴等
 * - 村头墟市：传统杆秤【木秤杆/黄铜秤盘/秤砣】、木钱匣、市斤砝码一套、银光袁大头银元等
 */
export function createInteractiveItems(): {
  itemsByScene: Record<string, Interactive3DItem[]>;
  teaItems: Interactive3DItem[];
  kitchenItems: Interactive3DItem[];
  allItemMap: Map<string, Interactive3DItem>;
  interactiveMeshes: THREE.Mesh[];
} {
  const itemsByScene: Record<string, Interactive3DItem[]> = {};
  const teaItems: Interactive3DItem[] = [];
  const kitchenItems: Interactive3DItem[] = [];
  const allItemMap = new Map<string, Interactive3DItem>();
  const interactiveMeshes: THREE.Mesh[] = [];

  // 通用基准坐标定义
  const tY = 2.27; // 茶桌八仙桌面高
  const kY = 1.95; // 厨房大灶台面高
  const aY = 2.05; // 祖厅神案台面高
  const gY = 1.50; // 做粿案台台面高
  const pY = 1.50; // 食糜案台台面高

  function registerItem(
    id: string,
    sceneId: string,
    character: string,
    triggerName: string,
    tier: 'basic' | 'advanced',
    worldPos: THREE.Vector3,
    colliderSize = { w: 1.0, h: 1.0, d: 1.0 }
  ): Interactive3DItem {
    const { group, colliderMesh } = buildItemObject3D(
      id,
      sceneId,
      character,
      triggerName,
      tier,
      worldPos,
      colliderSize
    );

    const item: Interactive3DItem = {
      id,
      sceneId,
      character,
      triggerName,
      tier,
      group,
      colliderMesh,
      worldPosition: worldPos.clone(),
      screenPosition: { x: 0, y: 0, visible: true }
    };

    if (!itemsByScene[sceneId]) itemsByScene[sceneId] = [];
    itemsByScene[sceneId].push(item);

    if (sceneId === 'tea_table') teaItems.push(item);
    if (sceneId === 'kitchen') kitchenItems.push(item);

    allItemMap.set(id, item);
    interactiveMeshes.push(colliderMesh);
    return item;
  }

  // =========================================================================
  // 1. 场景一：厝内工夫 (tea_table, 茶席八仙桌实景)
  // =========================================================================
  registerItem('tray', 'tea_table', '盘', '茶盘', 'advanced', new THREE.Vector3(0, tY, -1.2));
  registerItem('tea', 'tea_table', '茶', '冲罐', 'basic', new THREE.Vector3(-0.4, tY + 0.12, -1.2));
  registerItem('cup', 'tea_table', '杯', '若琛瓯', 'basic', new THREE.Vector3(0.45, tY + 0.12, -1.15));
  registerItem('water', 'tea_table', '水', '砂铫', 'basic', new THREE.Vector3(-1.45, tY + 0.65, -0.65));
  registerItem('fire', 'tea_table', '火', '风炉', 'basic', new THREE.Vector3(-1.45, tY, -0.65));
  registerItem('leaf', 'tea_table', '叶', '茶仓', 'basic', new THREE.Vector3(1.35, tY, -0.75));
  registerItem('sweet', 'tea_table', '甘', '橄榄', 'basic', new THREE.Vector3(1.15, tY, -1.8));
  registerItem('pot', 'tea_table', '壶', '西施壶', 'advanced', new THREE.Vector3(-0.6, tY + 0.12, -0.9));
  registerItem('pour', 'tea_table', '冲', '高冲', 'advanced', new THREE.Vector3(-0.15, tY + 0.25, -1.15));
  registerItem('rinse', 'tea_table', '洗', '洗杯', 'advanced', new THREE.Vector3(0.5, tY + 0.12, -0.85));
  registerItem('aroma', 'tea_table', '香', '茶香', 'advanced', new THREE.Vector3(0, tY + 0.45, -1.2));
  registerItem('hot', 'tea_table', '热', '滚热', 'advanced', new THREE.Vector3(-1.45, tY + 0.4, -1.4));
  registerItem('guest', 'tea_table', '客', '茶席', 'advanced', new THREE.Vector3(0, tY + 0.3, 0.5));

  // =========================================================================
  // 2. 场景二：灶下炊事 (kitchen, 柴火大灶与厨台案板)
  // =========================================================================
  registerItem('wok', 'kitchen', '鼎', '铁鼎', 'basic', new THREE.Vector3(-9.5 + 0.6, kY, 1.5 - 0.55));
  registerItem('steam', 'kitchen', '炊', '蒸笼', 'basic', new THREE.Vector3(-9.5 + 0.6, kY, 1.5 + 0.75));
  registerItem('knife', 'kitchen', '刀', '菜刀', 'basic', new THREE.Vector3(-9.5 - 2.4, kY - 0.2, 1.5 + 0.6));
  registerItem('slice', 'kitchen', '切', '砧板', 'basic', new THREE.Vector3(-9.5 - 2.4, kY - 0.3, 1.5 - 0.4));
  registerItem('rice', 'kitchen', '米', '米缸', 'basic', new THREE.Vector3(-9.5 - 2.6, 0.4, 1.5 - 2.0));
  registerItem('stirfry', 'kitchen', '炒', '炒青菜', 'basic', new THREE.Vector3(-9.5 + 0.6, kY + 0.35, 1.5 - 0.55));
  registerItem('bowl', 'kitchen', '碗', '公鸡碗', 'basic', new THREE.Vector3(-9.5 - 1.2, kY - 0.2, 1.5 + 0.6));
  registerItem('wood', 'kitchen', '柴', '荔枝柴', 'advanced', new THREE.Vector3(-9.5 + 0.6, 0.4, 1.5 + 2.0));
  registerItem('pot_stove', 'kitchen', '锅', '焖锅', 'advanced', new THREE.Vector3(-9.5 - 0.8, kY, 1.5));
  registerItem('oil', 'kitchen', '油', '猪油罐', 'advanced', new THREE.Vector3(-9.5 - 1.8, kY - 0.2, 1.5 - 0.8));
  registerItem('salt', 'kitchen', '盐', '海盐罐', 'advanced', new THREE.Vector3(-9.5 - 1.8, kY - 0.2, 1.5 - 1.4));
  registerItem('spatula', 'kitchen', '铲', '铁木铲', 'advanced', new THREE.Vector3(-9.5 + 0.6, kY + 0.45, 1.5 - 0.1));
  registerItem('boil', 'kitchen', '煮', '慢火慢煮', 'advanced', new THREE.Vector3(-9.5 + 0.6, kY + 0.4, 1.5 + 0.75));
  registerItem('soup', 'kitchen', '汤', '老火靓汤', 'advanced', new THREE.Vector3(-9.5 - 1.2, kY - 0.2, 1.5 - 0.2));

  // =========================================================================
  // 3. 场景三：大院天井 (courtyard, 前院门楼与大厅院落)
  // =========================================================================
  registerItem('door', 'courtyard', '门', '宅门', 'basic', new THREE.Vector3(-1.3, 2.1, 14.5));
  registerItem('lock', 'courtyard', '锁', '铜锁', 'basic', new THREE.Vector3(-0.6, 2.0, 14.8));
  registerItem('table', 'courtyard', '桌', '八仙桌', 'basic', new THREE.Vector3(0, 0.8, 8.5));
  registerItem('chair', 'courtyard', '椅', '竹木椅', 'basic', new THREE.Vector3(-1.4, 0.8, 8.5));
  registerItem('broom', 'courtyard', '扫', '竹扫帚', 'basic', new THREE.Vector3(3.2, 0.8, 13.5));
  registerItem('clean', 'courtyard', '净', '净地', 'basic', new THREE.Vector3(0, 0.08, 6.0));
  registerItem('open', 'courtyard', '开', '开门', 'advanced', new THREE.Vector3(-2.2, 2.1, 14.6));
  registerItem('close', 'courtyard', '关', '关门', 'advanced', new THREE.Vector3(2.2, 2.1, 14.6));
  registerItem('enter', 'courtyard', '进', '门槛', 'advanced', new THREE.Vector3(0, 0.4, 14.2));
  registerItem('sit', 'courtyard', '坐', '落座', 'advanced', new THREE.Vector3(1.4, 0.8, 8.5));
  registerItem('lamp', 'courtyard', '灯', '红灯笼', 'advanced', new THREE.Vector3(0, 4.2, 10.0));
  registerItem('clock', 'courtyard', '钟', '挂钟', 'advanced', new THREE.Vector3(-3.8, 3.2, 10.0));
  registerItem('hall', 'courtyard', '堂', '中堂大厅', 'advanced', new THREE.Vector3(0, 3.8, 4.5));

  // =========================================================================
  // 4. 场景四：祖厅神台 (altar, 金漆神案与堂前祭祀)
  // =========================================================================
  registerItem('incense', 'altar', '香', '清香香炉', 'basic', new THREE.Vector3(0, aY, -4.2));
  registerItem('candle', 'altar', '烛', '红烛台', 'basic', new THREE.Vector3(-1.2, aY, -4.2));
  registerItem('worship', 'altar', '拜', '拜垫', 'basic', new THREE.Vector3(0, 0.7, -2.6));
  registerItem('fortune', 'altar', '福', '金字红福', 'basic', new THREE.Vector3(0, 3.8, -4.8));
  registerItem('peaceful', 'altar', '平', '平安牌', 'basic', new THREE.Vector3(-1.8, 3.0, -4.8));
  registerItem('tranquil', 'altar', '宁', '安宁牌', 'basic', new THREE.Vector3(1.8, 3.0, -4.8));
  registerItem('god', 'altar', '神', '老爷神位', 'advanced', new THREE.Vector3(0, aY + 0.3, -4.5));
  registerItem('flower', 'altar', '花', '供花瓶', 'advanced', new THREE.Vector3(1.2, aY, -4.2));
  registerItem('fruit', 'altar', '果', '大桔果盘', 'advanced', new THREE.Vector3(-0.6, aY, -4.0));
  registerItem('great', 'altar', '大', '大吉大利', 'advanced', new THREE.Vector3(-2.4, 3.2, -4.8));
  registerItem('lucky', 'altar', '吉', '大桔', 'advanced', new THREE.Vector3(0.6, aY, -4.0));
  registerItem('protect', 'altar', '保', '保号儿孙', 'advanced', new THREE.Vector3(2.4, 3.2, -4.8));
  registerItem('longevity', 'altar', '寿', '金字寿屏', 'advanced', new THREE.Vector3(0, 4.6, -4.8));

  // =========================================================================
  // 5. 场景五：做粿案台 (guo_table, 红桃粿传统手作案台)
  // =========================================================================
  registerItem('guo', 'guo_table', '粿', '红桃粿', 'basic', new THREE.Vector3(-9.5, gY, -4.2));
  registerItem('mold', 'guo_table', '印', '木雕粿印', 'basic', new THREE.Vector3(-8.5, gY, -4.2));
  registerItem('flour', 'guo_table', '粉', '糯米粉', 'basic', new THREE.Vector3(-10.5, gY, -4.2));
  registerItem('sugar', 'guo_table', '糖', '红糖砖', 'basic', new THREE.Vector3(-8.5, gY, -3.4));
  registerItem('red', 'guo_table', '红', '红曲米', 'basic', new THREE.Vector3(-9.5, gY, -3.4));
  registerItem('wrap', 'guo_table', '包', '包粿', 'basic', new THREE.Vector3(-10.5, gY, -3.4));
  registerItem('bean', 'guo_table', '豆', '红豆沙', 'advanced', new THREE.Vector3(-8.5, gY, -5.0));
  registerItem('skin', 'guo_table', '皮', '粿皮', 'advanced', new THREE.Vector3(-9.5, gY, -5.0));
  registerItem('steam_guo', 'guo_table', '蒸', '蒸熟', 'advanced', new THREE.Vector3(-10.5, gY, -5.0));
  registerItem('fry_guo', 'guo_table', '煎', '煎香', 'advanced', new THREE.Vector3(-7.5, gY, -4.2));
  registerItem('sweet_taste', 'guo_table', '甜', '甘甜', 'advanced', new THREE.Vector3(-7.5, gY, -3.4));
  registerItem('peach_shape', 'guo_table', '桃', '寿桃', 'advanced', new THREE.Vector3(-7.5, gY, -5.0));
  registerItem('year_festival', 'guo_table', '年', '过年对联', 'advanced', new THREE.Vector3(-9.5, 2.8, -6.5));

  // =========================================================================
  // 6. 场景六：西厢卧房 (bedroom, 雕花架子床与闺房起居)
  // =========================================================================
  registerItem('bed', 'bedroom', '床', '架子床', 'basic', new THREE.Vector3(9.5, 0.6, 2.5));
  registerItem('quilt', 'bedroom', '被', '棉花被', 'basic', new THREE.Vector3(9.5, 1.4, 2.0));
  registerItem('clothes', 'bedroom', '衣', '唐装布衣', 'basic', new THREE.Vector3(12.5, 2.4, 3.5));
  registerItem('needle', 'bedroom', '针', '缝衣针', 'basic', new THREE.Vector3(8.0, 1.4, 0.8));
  registerItem('thread', 'bedroom', '线', '彩线轴', 'basic', new THREE.Vector3(8.5, 1.4, 0.8));
  registerItem('comb', 'bedroom', '梳', '黄杨木梳', 'basic', new THREE.Vector3(9.0, 1.4, -4.2));
  registerItem('cloth', 'bedroom', '布', '花布匹', 'advanced', new THREE.Vector3(8.0, 1.4, 2.0));
  registerItem('scissors', 'bedroom', '剪', '铁剪刀', 'advanced', new THREE.Vector3(8.2, 1.4, 0.3));
  registerItem('mend', 'bedroom', '补', '补衣', 'advanced', new THREE.Vector3(8.6, 1.4, 0.3));
  registerItem('towel', 'bedroom', '巾', '毛巾', 'advanced', new THREE.Vector3(12.8, 2.0, -3.0));
  registerItem('mirror', 'bedroom', '镜', '铜面镜', 'advanced', new THREE.Vector3(8.7, 2.3, -5.1));
  registerItem('shoes', 'bedroom', '鞋', '布鞋', 'advanced', new THREE.Vector3(8.5, 0.2, 3.8));
  registerItem('peace', 'bedroom', '安', '安宁祥和', 'advanced', new THREE.Vector3(9.5, 3.2, -6.5));

  // =========================================================================
  // 7. 场景七：厝内药箱 (medicine, 传统百宝中药箱与养生)
  // =========================================================================
  registerItem('med', 'medicine', '药', '药箱', 'basic', new THREE.Vector3(8.5, 1.6, -4.5));
  registerItem('day', 'medicine', '日', '每日服', 'basic', new THREE.Vector3(9.2, 1.5, -4.5));
  registerItem('morning_med', 'medicine', '早', '早服', 'basic', new THREE.Vector3(9.8, 1.5, -4.5));
  registerItem('night_med', 'medicine', '晚', '晚服', 'basic', new THREE.Vector3(10.4, 1.5, -4.5));
  registerItem('pill', 'medicine', '丸', '药丸', 'basic', new THREE.Vector3(8.8, 1.5, -3.8));
  registerItem('take_dose', 'medicine', '服', '温水送服', 'basic', new THREE.Vector3(9.5, 1.5, -3.8));
  registerItem('eat_med', 'medicine', '吃', '吃药', 'advanced', new THREE.Vector3(10.2, 1.5, -3.8));
  registerItem('times_dose', 'medicine', '次', '一日三次', 'advanced', new THREE.Vector3(8.2, 1.5, -3.8));
  registerItem('granule', 'medicine', '粒', '每回两粒', 'advanced', new THREE.Vector3(8.5, 1.5, -3.2));
  registerItem('meal_time', 'medicine', '饭', '饭后服', 'advanced', new THREE.Vector3(9.2, 1.5, -3.2));
  registerItem('stop_med', 'medicine', '止', '痛止即停', 'advanced', new THREE.Vector3(9.8, 1.5, -3.2));
  registerItem('care_body', 'medicine', '护', '保重护理', 'advanced', new THREE.Vector3(10.4, 1.5, -3.2));
  registerItem('body', 'medicine', '身', '身体健康', 'advanced', new THREE.Vector3(10.8, 1.6, -4.5));

  // =========================================================================
  // 8. 场景八：园头田埂 (farm, 屋后菜垄与田园牧歌)
  // =========================================================================
  registerItem('field', 'farm', '田', '田畦', 'basic', new THREE.Vector3(0, 0.3, -16.0));
  registerItem('ox', 'farm', '牛', '老水牛', 'basic', new THREE.Vector3(10, 1.0, -16.0));
  registerItem('grass', 'farm', '草', '青草', 'basic', new THREE.Vector3(-5, 0.4, -14.0));
  registerItem('plant_seed', 'farm', '种', '点播菜籽', 'basic', new THREE.Vector3(5, 0.3, -14.0));
  registerItem('melon', 'farm', '瓜', '青丝瓜', 'basic', new THREE.Vector3(0, 1.5, -20.5));
  registerItem('pick_fruit', 'farm', '摘', '摘菜篓', 'basic', new THREE.Vector3(-4, 0.8, -19.0));
  registerItem('soil', 'farm', '土', '肥沃黑土', 'advanced', new THREE.Vector3(-3, 0.3, -16.0));
  registerItem('ground', 'farm', '地', '自留地', 'advanced', new THREE.Vector3(3, 0.2, -16.0));
  registerItem('irrigation', 'farm', '水', '菜园水井', 'advanced', new THREE.Vector3(-10, 0.6, -16.0));
  registerItem('pour_water', 'farm', '浇', '浇水勺', 'advanced', new THREE.Vector3(-8.5, 0.5, -16.0));
  registerItem('harvest', 'farm', '收', '丰收箩筐', 'advanced', new THREE.Vector3(7, 0.6, -18.0));
  registerItem('sky', 'farm', '天', '蓝天晴空', 'advanced', new THREE.Vector3(0, 4.5, -21.0));
  registerItem('spring', 'farm', '春', '开春万物', 'advanced', new THREE.Vector3(8, 0.6, -20.0));

  // =========================================================================
  // 9. 场景九：清早食糜 (porridge, 砂锅白粥与潮汕杂咸桌)
  // =========================================================================
  registerItem('porridge_rice', 'porridge', '糜', '砂锅白粥', 'basic', new THREE.Vector3(-9.5, pY, -1.8));
  registerItem('fish', 'porridge', '鱼', '干煎巴浪', 'basic', new THREE.Vector3(-8.6, pY, -1.8));
  registerItem('veggies', 'porridge', '菜', '黑油菜脯', 'basic', new THREE.Vector3(-10.4, pY, -1.8));
  registerItem('egg', 'porridge', '蛋', '出油咸蛋', 'basic', new THREE.Vector3(-8.6, pY, -2.4));
  registerItem('meat', 'porridge', '肉', '潮汕卤肉', 'basic', new THREE.Vector3(-10.4, pY, -2.4));
  registerItem('warm', 'porridge', '温', '温热适口', 'basic', new THREE.Vector3(-9.5, pY, -2.4));
  registerItem('eat', 'porridge', '食', '食朝食饱', 'advanced', new THREE.Vector3(-9.5, pY, -1.2));
  registerItem('full', 'porridge', '饱', '肚腹饱暖', 'advanced', new THREE.Vector3(-8.6, pY, -1.2));
  registerItem('salty', 'porridge', '咸', '杂咸小菜', 'advanced', new THREE.Vector3(-10.4, pY, -1.2));
  registerItem('soy_paste', 'porridge', '豆', '普宁豆瓣', 'advanced', new THREE.Vector3(-7.8, pY, -1.8));
  registerItem('ginger', 'porridge', '姜', '细切生姜', 'advanced', new THREE.Vector3(-7.8, pY, -2.4));
  registerItem('spoon', 'porridge', '匙', '白瓷汤匙', 'advanced', new THREE.Vector3(-9.5, pY, -2.8));
  registerItem('morning', 'porridge', '早', '早起开饭', 'advanced', new THREE.Vector3(-8.6, 2.2, -1.8));

  // =========================================================================
  // 10. 场景十：堂前团聚 (family, 中堂儿孙满堂天伦之乐)
  // =========================================================================
  registerItem('grandson', 'family', '孙', '承欢小孙', 'basic', new THREE.Vector3(-1.2, 1.2, 2.2));
  registerItem('child', 'family', '仔', '亲爱伲仔', 'basic', new THREE.Vector3(1.2, 1.2, 2.2));
  registerItem('grandfather', 'family', '公', '慈祥阿公', 'basic', new THREE.Vector3(-2.0, 1.4, 1.2));
  registerItem('grandmother', 'family', '婆', '可敬阿婆', 'basic', new THREE.Vector3(2.0, 1.4, 1.2));
  registerItem('home', 'family', '家', '温馨老家', 'basic', new THREE.Vector3(0, 3.2, 2.0));
  registerItem('joy', 'family', '乐', '天伦之乐', 'basic', new THREE.Vector3(0, 1.4, 3.0));
  registerItem('father', 'family', '父', '严父尊长', 'advanced', new THREE.Vector3(-1.8, 1.5, 2.5));
  registerItem('mother', 'family', '母', '慈爱母亲', 'advanced', new THREE.Vector3(1.8, 1.5, 2.5));
  registerItem('son', 'family', '儿', '归家儿子', 'advanced', new THREE.Vector3(0, 1.5, 1.8));
  registerItem('filial', 'family', '孝', '百善孝先', 'advanced', new THREE.Vector3(-0.8, 2.6, 0.5));
  registerItem('harmony', 'family', '和', '合家和气', 'advanced', new THREE.Vector3(0.8, 2.6, 0.5));
  registerItem('bliss', 'family', '喜', '喜笑颜开', 'advanced', new THREE.Vector3(-2.5, 2.4, 2.0));
  registerItem('smooth', 'family', '顺', '顺心如意', 'advanced', new THREE.Vector3(2.5, 2.4, 2.0));

  // =========================================================================
  // 11. 场景十一：村头墟市 (market, 门外集市商贩与秤量买卖)
  // =========================================================================
  registerItem('scale', 'market', '秤', '提杆铜秤', 'basic', new THREE.Vector3(5.0, 1.2, 17.5));
  registerItem('money', 'market', '钱', '找零钞票', 'basic', new THREE.Vector3(5.5, 1.2, 17.5));
  registerItem('buy', 'market', '买', '赶集挑选', 'basic', new THREE.Vector3(4.5, 1.2, 18.2));
  registerItem('sell', 'market', '卖', '摊贩叫卖', 'basic', new THREE.Vector3(6.5, 1.2, 18.2));
  registerItem('catty', 'market', '斤', '市斤计重', 'basic', new THREE.Vector3(6.0, 1.2, 17.5));
  registerItem('yuan', 'market', '元', '标价银元', 'basic', new THREE.Vector3(5.2, 1.2, 18.2));
  registerItem('liang', 'market', '两', '秤星两数', 'advanced', new THREE.Vector3(5.0, 1.2, 17.0));
  registerItem('much', 'market', '多', '添多添满', 'advanced', new THREE.Vector3(4.2, 1.2, 17.8));
  registerItem('little', 'market', '少', '少取适量', 'advanced', new THREE.Vector3(6.8, 1.2, 17.8));
  registerItem('costly', 'market', '贵', '菜贵肉贵', 'advanced', new THREE.Vector3(4.6, 1.2, 16.8));
  registerItem('cheap', 'market', '便', '便宜得益', 'advanced', new THREE.Vector3(6.4, 1.2, 16.8));
  registerItem('change_money', 'market', '找', '清点找零', 'advanced', new THREE.Vector3(5.8, 1.2, 16.8));
  registerItem('city_market', 'market', '市', '热闹墟市', 'advanced', new THREE.Vector3(5.5, 2.5, 18.5));

  return {
    itemsByScene,
    teaItems,
    kitchenItems,
    allItemMap,
    interactiveMeshes
  };
}
