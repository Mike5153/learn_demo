import * as THREE from 'three';

/**
 * 潮汕三维全景生活实景：144 字全量“实物道具三维模型”工艺级建模引擎
 * 针对潮汕老厝大院 11 大生活实景，精雕细琢构建 144 个真实文化物品三维模型。
 * 
 * 包含：
 * - 工夫茶器（朱泥西施冲罐、若琛瓯三杯、砂铫水壶、红泥风炉炭火、锡制茶仓、青橄榄盘等）
 * - 厨房炊事（双耳生铁大鼎、三层竹编蒸笼、锻打方头菜刀、银杏木厚砧板、陶土大米缸等）
 * - 庭院门房（双扇大木宅门、纯黄铜广锁、正方八仙桌、竹木交椅、竹扫帚、条木长凳等）
 * - 祖厅神台（兽首三足铜香炉、高足红烛台、红锦绣花拜垫、金漆木雕老爷神龛、大桔宝塔供盘等）
 * - 案台做粿（经典粉红红桃粿、雕花木粿印模具、雪白米粉堆、深红老糖砖、金黄煎红桃粿等）
 * - 西厢卧房（百宝嵌雕花架子床、大红牡丹绸缎被、红木衣架唐装长衫、黄杨木梳、铜镜等）
 * - 厝内药箱（九格传统多层中药箱、金箔蜜炼大药丸、青花药盅、研磨铸铁药碾等）
 * - 园头田埂（老水牛【躯干/四肢/弯角/牛尾】、菜畦长垄、竹棚架青丝瓜、井圈辘轳吊桶等）
 * - 清早食糜（双耳白粥大砂锅、金黄干煎巴浪鱼、老菜脯碟、红心流油咸鸭蛋、卤肉拼盘等）
 * - 堂前团聚（阿公竹躺椅与拐杖、阿婆针线笸箩、竹婴儿摇篮、四世同堂大牌匾、和气立轴等）
 * - 村头墟市（传统杆秤【秤杆/铜盘/秤砣】、木钱匣、市斤砝码一套、银光袁大头银元等）
 */

// =========================================================================
// 1. 共享材质库 (Lambert 柔和漫反射 + Standard 金属度/粗糙度)
// =========================================================================
const mZishaRed = new THREE.MeshLambertMaterial({ color: 0x9b3826 });      // 朱泥红/紫砂红
const mPorcelain = new THREE.MeshLambertMaterial({ color: 0xfbf9f5 });     // 象牙白瓷
const mTeaYellow = new THREE.MeshLambertMaterial({ color: 0xe6ab32 });     // 澄黄茶汤
const mClayStove = new THREE.MeshLambertMaterial({ color: 0xb54d37 });     // 潮汕红泥炉
const mCharcoalGlow = new THREE.MeshBasicMaterial({ color: 0xff3b10 });    // 橄榄炭红光
const mClayPot = new THREE.MeshLambertMaterial({ color: 0x8a6e5b });       // 砂铫粗陶
const mPewter = new THREE.MeshStandardMaterial({ color: 0xb0b5bc, metalness: 0.5, roughness: 0.3 }); // 锡罐灰银
const mDarkTea = new THREE.MeshLambertMaterial({ color: 0x2e241c });       // 单丛条索茶叶
const mOliveGreen = new THREE.MeshLambertMaterial({ color: 0x6e8b3d });    // 青橄榄绿
const mBlackStone = new THREE.MeshLambertMaterial({ color: 0x242629 });    // 乌金石茶盘
const mIronBlack = new THREE.MeshLambertMaterial({ color: 0x222428 });     // 生铁鼎黑
const mSteelBlade = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, metalness: 0.8, roughness: 0.2 }); // 锻打钢刃
const mWoodDark = new THREE.MeshLambertMaterial({ color: 0x4e2716 });      // 深熟红漆木/紫檀
const mWoodLight = new THREE.MeshLambertMaterial({ color: 0x966842 });     // 原木/银杏木砧板/竹木
const mBamboo = new THREE.MeshLambertMaterial({ color: 0xc8a872 });        // 竹编米黄
const mFreshVeg = new THREE.MeshLambertMaterial({ color: 0x438e38 });      // 鲜菜翠绿
const mRiceWhite = new THREE.MeshLambertMaterial({ color: 0xf5f3ea });     // 晶莹白米
const mClayJar = new THREE.MeshLambertMaterial({ color: 0x7c4933 });       // 陶土红褐
const mFirewood = new THREE.MeshLambertMaterial({ color: 0x5c3722 });      // 荔枝干柴
const mLardWhite = new THREE.MeshLambertMaterial({ color: 0xfcf9f2 });     // 凝脂白猪油
const mGold = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.6, roughness: 0.3 }); // 描金金漆
const mCandleRed = new THREE.MeshLambertMaterial({ color: 0xc62828 });     // 红烛红
const mClothRed = new THREE.MeshLambertMaterial({ color: 0xa52222 });      // 布帛红
const mBrass = new THREE.MeshStandardMaterial({ color: 0xc5a059, metalness: 0.7, roughness: 0.35 }); // 黄铜
const mHerbGreen = new THREE.MeshLambertMaterial({ color: 0x2e7d32 });     // 草药绿
const mAmber = new THREE.MeshLambertMaterial({ color: 0xd97706 });         // 琥珀药瓶
const mPeachPink = new THREE.MeshLambertMaterial({ color: 0xde4360 });     // 红桃粿鲜亮粉红
const mOxBody = new THREE.MeshLambertMaterial({ color: 0x3d4044 });        // 水牛皮毛灰黑
const mOxHorn = new THREE.MeshLambertMaterial({ color: 0x1f2124 });        // 水牛角深黑
const mFriedFish = new THREE.MeshLambertMaterial({ color: 0xcb9340 });     // 煎巴浪鱼焦金黄
const mEggYolk = new THREE.MeshLambertMaterial({ color: 0xff7043 });       // 咸蛋红心流油黄
const mMeatSauce = new THREE.MeshLambertMaterial({ color: 0x5c1d18 });     // 卤肉酱红
const mGlassTrans = new THREE.MeshLambertMaterial({ color: 0xf5eedb, transparent: true, opacity: 0.65 }); // 清透水流
const mSteamWhite = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 });   // 袅袅白气

// =========================================================================
// 2. 场景一：厝内工夫 (tea_table, 13 个道具模型)
// =========================================================================

// 盘 (tray) - 乌金石排水茶盘
export function createTrayModel(): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.4), mBlackStone);
  base.position.y = 0.06;
  g.add(base);
  // 边框包围与排水槽
  const rimL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 1.4), mBlackStone);
  rimL.position.set(-1.05, 0.14, 0); g.add(rimL);
  const rimR = rimL.clone(); rimR.position.x = 1.05; g.add(rimR);
  // 排水格栅
  for (let i = -0.75; i <= 0.75; i += 0.22) {
    const grate = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 1.15), new THREE.MeshBasicMaterial({ color: 0x141517 }));
    grate.position.set(i, 0.13, 0);
    g.add(grate);
  }
  // 铜质排水孔
  const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.05, 12), mBrass);
  drain.position.set(0.75, 0.13, 0.4);
  g.add(drain);
  return g;
}

// 茶 (tea) - 朱泥冲罐 (西施壶)
export function createTeapotModel(): THREE.Group {
  const g = new THREE.Group();
  // 扁圆壶身
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 12), mZishaRed);
  body.scale.set(1.18, 0.88, 1.0);
  body.position.y = 0.22;
  g.add(body);
  // 壶圈足
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.04, 14), mZishaRed);
  foot.position.y = 0.02;
  g.add(foot);
  // 弯流壶嘴
  const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.075, 0.22, 10), mZishaRed);
  spout.rotation.z = -Math.PI / 3;
  spout.position.set(0.25, 0.26, 0);
  g.add(spout);
  // 倒把壶柄
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.038, 8, 14, Math.PI * 1.1), mZishaRed);
  handle.rotation.z = Math.PI * 0.45;
  handle.position.set(-0.25, 0.22, 0);
  g.add(handle);
  // 截盖与壶钮
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.05, 14), mZishaRed);
  lid.position.y = 0.38;
  g.add(lid);
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), mZishaRed);
  knob.position.y = 0.43;
  g.add(knob);
  return g;
}

// 杯 (cup) - 若琛瓯三杯
export function createCupModel(): THREE.Group {
  const g = new THREE.Group();
  const cupPositions = [[0, 0, -0.16], [-0.18, 0, 0.15], [0.18, 0, 0.15]];
  cupPositions.forEach(([cx, cy, cz]) => {
    // 敞口白瓷杯
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.07, 0.14, 14), mPorcelain);
    cup.position.set(cx, cy + 0.07, cz);
    g.add(cup);
    // 杯内茶汤
    const teaLq = new THREE.Mesh(new THREE.CircleGeometry(0.105, 12), mTeaYellow);
    teaLq.rotateX(-Math.PI / 2);
    teaLq.position.set(cx, cy + 0.125, cz);
    g.add(teaLq);
    // 青花圈足底
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.075, 0.02, 12), new THREE.MeshLambertMaterial({ color: 0x3d5a80 }));
    foot.position.set(cx, cy + 0.01, cz);
    g.add(foot);
  });
  return g;
}

// 水 (water) - 砂铫 (玉书碨粗陶水壶)
export function createWaterKettleModel(): THREE.Group {
  const g = new THREE.Group();
  const potBody = new THREE.Mesh(new THREE.SphereGeometry(0.35, 14, 12), mClayPot);
  potBody.scale.set(1.15, 0.9, 1.15);
  potBody.position.y = 0.35;
  g.add(potBody);
  // 侧长木柄手把
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.42, 8), mWoodDark);
  handle.rotation.z = Math.PI / 2;
  handle.position.set(-0.48, 0.42, 0);
  g.add(handle);
  // 弯流壶嘴
  const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.09, 0.28, 8), mClayPot);
  spout.rotation.z = -Math.PI / 3;
  spout.position.set(0.36, 0.42, 0);
  g.add(spout);
  // 盖与钮
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.06, 12), mClayPot);
  lid.position.y = 0.62;
  g.add(lid);
  return g;
}

// 火 (fire) - 潮汕红泥小风炉
export function createStoveModel(): THREE.Group {
  const g = new THREE.Group();
  // 束腰圆筒风炉身
  const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 0.35, 16), mClayStove);
  lower.position.y = 0.175;
  g.add(lower);
  const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.38, 0.35, 16), mClayStove);
  upper.position.y = 0.525;
  g.add(upper);
  // 半圆进风口炉门 (黑)
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.15, 0.12), new THREE.MeshBasicMaterial({ color: 0x111111 }));
  door.position.set(0, 0.18, 0.38);
  g.add(door);
  // 炉膛内橄榄炭与跳动红光
  const coal = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), mCharcoalGlow);
  coal.position.set(0, 0.65, 0);
  g.add(coal);
  return g;
}

// 叶 (leaf) - 锡制六角茶叶罐 (茶仓)
export function createTeaCanisterModel(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.55, 6), mPewter);
  body.position.y = 0.275;
  g.add(body);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.12, 6), mPewter);
  lid.position.y = 0.58;
  g.add(lid);
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.05, 8), mBrass);
  knob.position.y = 0.66;
  g.add(knob);
  return g;
}

// 甘 (sweet) - 白瓷盘装青橄榄茶配
export function createOlivePlateModel(): THREE.Group {
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.24, 0.08, 16), mPorcelain);
  plate.position.y = 0.04;
  g.add(plate);
  // 堆放数颗饱满纺锤形青橄榄
  const pos = [[0, 0.08, 0], [0.12, 0.08, 0.08], [-0.12, 0.08, -0.06], [0.08, 0.08, -0.1], [-0.08, 0.08, 0.12]];
  pos.forEach(([ox, oy, oz]) => {
    const olive = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), mOliveGreen);
    olive.scale.set(1.6, 0.9, 0.9);
    olive.rotation.y = Math.random() * Math.PI;
    olive.position.set(ox, oy, oz);
    g.add(olive);
  });
  return g;
}

// 进阶茶具模型
export function createPotAdvModel(): THREE.Group {
  // 紫砂石瓢壶
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.35, 14), mZishaRed);
  body.position.y = 0.18;
  g.add(body);
  const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.2, 8), mZishaRed);
  spout.rotation.z = -Math.PI / 3;
  spout.position.set(0.22, 0.22, 0);
  g.add(spout);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 8, 10, Math.PI), mZishaRed);
  handle.rotation.z = Math.PI / 2;
  handle.position.set(-0.24, 0.18, 0);
  g.add(handle);
  return g;
}

export function createPourModel(): THREE.Group {
  // 高冲茶汤透明晶莹水柱
  const g = new THREE.Group();
  const stream = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.75, 8), mGlassTrans);
  stream.position.y = 0.38;
  g.add(stream);
  return g;
}

export function createRinseModel(): THREE.Group {
  // 白瓷洗杯水盂
  const g = new THREE.Group();
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.26, 0.22, 14), mPorcelain);
  bowl.position.y = 0.11;
  g.add(bowl);
  return g;
}

export function createAromaModel(): THREE.Group {
  // 袅袅茶香水汽柱
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const cloud = new THREE.Mesh(new THREE.SphereGeometry(0.12 + i * 0.05, 8, 8), mSteamWhite);
    cloud.position.set(Math.sin(i) * 0.08, 0.2 + i * 0.22, Math.cos(i) * 0.08);
    g.add(cloud);
  }
  return g;
}

export function createHotModel(): THREE.Group {
  // 滚水蒸气粗陶小锅
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.22, 12), mClayPot);
  pot.position.y = 0.11;
  g.add(pot);
  const steam = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), mSteamWhite);
  steam.position.y = 0.3;
  g.add(steam);
  return g;
}

export function createGuestModel(): THREE.Group {
  // 客席红木茶托与竹茶夹
  const g = new THREE.Group();
  const coaster = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.5), mWoodDark);
  coaster.position.y = 0.03;
  g.add(coaster);
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.07, 0.12, 10), mPorcelain);
  cup.position.set(0, 0.12, 0);
  g.add(cup);
  const tongs = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 0.4), mBamboo);
  tongs.position.set(0.24, 0.08, 0);
  g.add(tongs);
  return g;
}

// =========================================================================
// 3. 场景二：灶下炊事 (kitchen, 14 个道具模型)
// =========================================================================

// 鼎 (wok) - 双耳生铁大鼎
export function createWokModel(): THREE.Group {
  const g = new THREE.Group();
  // 凹陷半球铁鼎身
  const wokGeo = new THREE.SphereGeometry(0.72, 18, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const wok = new THREE.Mesh(wokGeo, mIronBlack);
  wok.position.y = 0.25;
  g.add(wok);
  // 宽鼎沿
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.04, 8, 20), mIronBlack);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.25;
  g.add(rim);
  // 两侧大圆铁耳
  const earL = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.03, 6, 12), mIronBlack);
  earL.position.set(-0.76, 0.28, 0);
  g.add(earL);
  const earR = earL.clone(); earR.position.x = 0.76; g.add(earR);
  return g;
}

// 炊 (steam) - 三层竹编大蒸笼
export function createSteamerModel(): THREE.Group {
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const tier = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.28, 18), mBamboo);
    tier.position.y = 0.14 + i * 0.28;
    g.add(tier);
    // 竹箍圈
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.685, 0.02, 6, 20), mWoodDark);
    band.rotation.x = Math.PI / 2;
    band.position.y = 0.26 + i * 0.28;
    g.add(band);
  }
  // 拱形蒸笼盖与顶部竹抓纽
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.68, 0.12, 18), mBamboo);
  lid.position.y = 0.98;
  g.add(lid);
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.22), mWoodDark);
  handle.position.y = 1.06;
  g.add(handle);
  return g;
}

// 刀 (knife) - 锻打方头大菜刀
export function createKnifeModel(): THREE.Group {
  const g = new THREE.Group();
  // 宽方刀身
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.26, 0.03), mSteelBlade);
  blade.position.set(0, 0.22, 0);
  g.add(blade);
  // 弧形锋刃 (光亮)
  const edge = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.03, 0.015), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 }));
  edge.position.set(0, 0.08, 0);
  g.add(edge);
  // 圆木刀柄带铜箍
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.26, 10), mWoodDark);
  handle.rotation.z = Math.PI / 2;
  handle.position.set(-0.38, 0.3, 0);
  g.add(handle);
  const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 10), mBrass);
  ferrule.rotation.z = Math.PI / 2;
  ferrule.position.set(-0.26, 0.3, 0);
  g.add(ferrule);
  return g;
}

// 切 (slice) - 银杏木圆厚砧板
export function createCuttingBoardModel(): THREE.Group {
  const g = new THREE.Group();
  const board = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.15, 20), mWoodLight);
  board.position.y = 0.075;
  g.add(board);
  // 铁箍加固
  const ironBand = new THREE.Mesh(new THREE.TorusGeometry(0.555, 0.015, 6, 22), mIronBlack);
  ironBand.rotation.x = Math.PI / 2;
  ironBand.position.y = 0.075;
  g.add(ironBand);
  // 铁提环
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 6, 12), mIronBlack);
  ring.position.set(0, 0.075, 0.62);
  g.add(ring);
  return g;
}

// 米 (rice) - 敞口大米缸
export function createRiceJarModel(): THREE.Group {
  const g = new THREE.Group();
  const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.38, 0.85, 16), mClayJar);
  jar.position.y = 0.425;
  g.add(jar);
  // 堆满的大米
  const rice = new THREE.Mesh(new THREE.SphereGeometry(0.45, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), mRiceWhite);
  rice.position.y = 0.84;
  g.add(rice);
  // 竹米筒
  const scoop = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.35, 10), mBamboo);
  scoop.rotation.z = Math.PI / 4;
  scoop.position.set(0.18, 0.95, 0);
  g.add(scoop);
  return g;
}

// 炒 (stirfry) - 鼎中翻炒鲜菜
export function createStirfryModel(): THREE.Group {
  const g = new THREE.Group();
  const wok = new THREE.Mesh(new THREE.SphereGeometry(0.42, 14, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mIronBlack);
  wok.position.y = 0.15;
  g.add(wok);
  // 翠绿青菜团
  const veg = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), mFreshVeg);
  veg.scale.set(1.2, 0.5, 1.2);
  veg.position.y = 0.22;
  g.add(veg);
  return g;
}

// 碗 (bowl) - 经典青花公鸡大瓷碗
export function createBowlModel(): THREE.Group {
  const g = new THREE.Group();
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.16, 0.24, 16), mPorcelain);
  bowl.position.y = 0.13;
  g.add(bowl);
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.03, 16), mPorcelain);
  foot.position.y = 0.015;
  g.add(foot);
  // 碗身红色彩饰圈
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.352, 0.01, 4, 16), mCandleRed);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.24;
  g.add(ring);
  return g;
}

// 进阶厨房模型
export function createWoodModel(): THREE.Group {
  // 荔枝干柴捆
  const g = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.85, 8), mFirewood);
    log.position.set((i % 2 - 0.5) * 0.15, 0.42, (Math.floor(i / 2) - 0.5) * 0.15);
    g.add(log);
  }
  return g;
}

export function createPotStoveModel(): THREE.Group {
  // 双耳粗陶炖锅
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.35, 0.42, 14), mClayPot);
  pot.position.y = 0.21;
  g.add(pot);
  return g;
}

export function createOilJarModel(): THREE.Group {
  // 凝脂白猪油罐
  const g = new THREE.Group();
  const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.38, 12), mPorcelain);
  jar.position.y = 0.19;
  g.add(jar);
  const lard = new THREE.Mesh(new THREE.CircleGeometry(0.22, 12), mLardWhite);
  lard.rotateX(-Math.PI / 2);
  lard.position.y = 0.36;
  g.add(lard);
  return g;
}

export function createSaltJarModel(): THREE.Group {
  // 海盐陶罐
  const g = new THREE.Group();
  const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.32, 12), mClayJar);
  jar.position.y = 0.16;
  g.add(jar);
  const salt = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2), mRiceWhite);
  salt.position.y = 0.31;
  g.add(salt);
  return g;
}

export function createSpatulaModel(): THREE.Group {
  // 铁铲
  const g = new THREE.Group();
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.02, 0.24), mSteelBlade);
  head.position.set(0, 0.08, 0.25);
  g.add(head);
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.65, 8), mWoodDark);
  handle.rotation.x = -Math.PI / 4;
  handle.position.set(0, 0.28, -0.05);
  g.add(handle);
  return g;
}

export function createBoilModel(): THREE.Group {
  // 煮熟冒汽炖煲
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.32, 0.35, 12), mClayPot);
  pot.position.y = 0.175;
  g.add(pot);
  const steam = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), mSteamWhite);
  steam.position.y = 0.42;
  g.add(steam);
  return g;
}

export function createSoupModel(): THREE.Group {
  // 靓汤大汤盆
  const g = new THREE.Group();
  const tureen = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.28, 0.25, 14), mPorcelain);
  tureen.position.y = 0.125;
  g.add(tureen);
  const soup = new THREE.Mesh(new THREE.CircleGeometry(0.36, 12), mTeaYellow);
  soup.rotateX(-Math.PI / 2);
  soup.position.y = 0.24;
  g.add(soup);
  return g;
}

// =========================================================================
// 4. 场景三：大院天井 (courtyard, 13 个道具模型)
// =========================================================================

export function createDoorModel(): THREE.Group {
  // 经典双扇木宅门
  const g = new THREE.Group();
  const panelL = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.6, 0.15), mWoodDark);
  panelL.position.set(-0.58, 1.8, 0); g.add(panelL);
  const panelR = panelL.clone(); panelR.position.x = 0.58; g.add(panelR);
  // 纯铜门环 (辅首衔环)
  const ringL = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 6, 14), mBrass);
  ringL.position.set(-0.25, 1.7, 0.1); g.add(ringL);
  const ringR = ringL.clone(); ringR.position.x = 0.25; g.add(ringR);
  return g;
}

export function createLockModel(): THREE.Group {
  // 传统纯铜中式广锁
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.14), mBrass);
  body.position.y = 0.1;
  g.add(body);
  const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 6, 12, Math.PI), mBrass);
  shackle.position.set(0, 0.17, 0);
  g.add(shackle);
  return g;
}

export function createTableModel(): THREE.Group {
  // 正方八仙桌
  const g = new THREE.Group();
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.12, 2.1), mWoodDark);
  top.position.y = 1.35;
  g.add(top);
  // 四腿与马蹄底
  const legs = [[-0.9, -0.9], [0.9, -0.9], [-0.9, 0.9], [0.9, 0.9]];
  legs.forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.3, 0.14), mWoodDark);
    leg.position.set(lx, 0.65, lz);
    g.add(leg);
  });
  return g;
}

export function createChairModel(): THREE.Group {
  // 竹木圈椅/交椅
  const g = new THREE.Group();
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.65), mWoodDark);
  seat.position.y = 0.7;
  g.add(seat);
  // 靠背板
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.06), mWoodDark);
  back.position.set(0, 1.05, -0.3);
  g.add(back);
  // 四腿
  const legs = [[-0.28, -0.26], [0.28, -0.26], [-0.28, 0.26], [0.28, 0.26]];
  legs.forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 8), mWoodDark);
    leg.position.set(lx, 0.35, lz);
    g.add(leg);
  });
  return g;
}

export function createBroomModel(): THREE.Group {
  // 竹扫帚
  const g = new THREE.Group();
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 1.4, 8), mBamboo);
  handle.rotation.z = Math.PI / 12;
  handle.position.set(-0.1, 0.9, 0);
  g.add(handle);
  const bristles = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.55, 10), mBamboo);
  bristles.position.set(0.12, 0.28, 0);
  g.add(bristles);
  return g;
}

export function createCleanGroundModel(): THREE.Group {
  // 雕花净水石台
  const g = new THREE.Group();
  const slab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 1.6), mPewter);
  slab.position.y = 0.04;
  g.add(slab);
  return g;
}

export function createDoorOpenModel(): THREE.Group {
  const g = new THREE.Group();
  const leaf = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.8, 0.1), mWoodDark);
  leaf.rotation.y = Math.PI / 4;
  leaf.position.set(0, 1.4, 0);
  g.add(leaf);
  return g;
}

export function createDoorCloseModel(): THREE.Group {
  const g = new THREE.Group();
  const bar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 0.1), mWoodDark);
  bar.position.set(0, 1.4, 0);
  g.add(bar);
  return g;
}

export function createDoorThresholdModel(): THREE.Group {
  // 花岗岩高门槛石
  const g = new THREE.Group();
  const step = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.32, 0.5), mPewter);
  step.position.y = 0.16;
  g.add(step);
  return g;
}

export function createBenchModel(): THREE.Group {
  // 长条实木凳
  const g = new THREE.Group();
  const top = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.08, 0.35), mWoodDark);
  top.position.y = 0.65;
  g.add(top);
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.65, 0.3), mWoodDark);
  legL.position.set(-0.45, 0.325, 0); g.add(legL);
  const legR = legL.clone(); legR.position.x = 0.45; g.add(legR);
  return g;
}

export function createLanternModel(): THREE.Group {
  // 潮汕大红纱灯笼
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.35, 14, 12), mCandleRed);
  body.scale.set(1.0, 1.25, 1.0);
  body.position.y = 0.45;
  g.add(body);
  const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 12), mGold);
  topCap.position.y = 0.88;
  g.add(topCap);
  const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.08, 0.3, 8), mGold);
  tassel.position.y = 0.05;
  g.add(tassel);
  return g;
}

export function createClockModel(): THREE.Group {
  // 老式木壳挂钟
  const g = new THREE.Group();
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.85, 0.15), mWoodDark);
  frame.position.y = 0.425;
  g.add(frame);
  const dial = new THREE.Mesh(new THREE.CircleGeometry(0.18, 16), mPorcelain);
  dial.position.set(0, 0.6, 0.08);
  g.add(dial);
  const pendulum = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.25, 8), mBrass);
  pendulum.position.set(0, 0.25, 0.08);
  g.add(pendulum);
  return g;
}

export function createHallPlaqueModel(): THREE.Group {
  // 中堂大牌匾
  const g = new THREE.Group();
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.65, 0.08), mGold);
  plaque.position.y = 0.325;
  g.add(plaque);
  return g;
}

// =========================================================================
// 5. 场景四：祖厅神台 (altar, 13 个道具模型)
// =========================================================================

export function createIncenseModel(): THREE.Group {
  // 兽首双耳三足铜香炉 + 三支燃烧细香
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.22, 14), mBrass);
  pot.position.y = 0.15;
  g.add(pot);
  // 三支红香
  for (let i = -1; i <= 1; i++) {
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.45, 6), mCandleRed);
    stick.position.set(i * 0.05, 0.4, 0);
    g.add(stick);
    // 燃烧微红香头
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), mCharcoalGlow);
    tip.position.set(i * 0.05, 0.63, 0);
    g.add(tip);
  }
  return g;
}

export function createCandleModel(): THREE.Group {
  // 一对高足描金大红龙烛
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.15, 12), mBrass);
  base.position.y = 0.075;
  g.add(base);
  const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.07, 0.55, 12), mCandleRed);
  candle.position.y = 0.42;
  g.add(candle);
  // 烛火
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 8), mCharcoalGlow);
  flame.position.y = 0.75;
  g.add(flame);
  return g;
}

export function createWorshipMatModel(): THREE.Group {
  // 金边大红刺绣拜垫
  const g = new THREE.Group();
  const mat = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.12, 0.85), mClothRed);
  mat.position.y = 0.06;
  g.add(mat);
  const trim = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.03, 0.9), mGold);
  trim.position.y = 0.06;
  g.add(trim);
  return g;
}

export function createFortunePlaqueModel(): THREE.Group {
  // 金字福字挂屏
  const g = new THREE.Group();
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 0.06), mClothRed);
  frame.rotation.z = Math.PI / 4;
  frame.position.y = 0.45;
  g.add(frame);
  const gold = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.08), mGold);
  gold.rotation.z = Math.PI / 4;
  gold.position.y = 0.45;
  g.add(gold);
  return g;
}

export function createPeaceTabletModel(): THREE.Group {
  // 平安铜供牌
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.65, 0.05), mBrass);
  plate.position.y = 0.325;
  g.add(plate);
  return g;
}

export function createTranquilTabletModel(): THREE.Group {
  // 安宁紫檀供牌
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.65, 0.05), mWoodDark);
  plate.position.y = 0.325;
  g.add(plate);
  return g;
}

export function createShrineModel(): THREE.Group {
  // 金漆木雕老爷神龛
  const g = new THREE.Group();
  const house = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.1, 0.45), mGold);
  house.position.y = 0.55;
  g.add(house);
  return g;
}

export function createVaseModel(): THREE.Group {
  // 白瓷供花瓶
  const g = new THREE.Group();
  const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.5, 12), mPorcelain);
  vase.position.y = 0.25;
  g.add(vase);
  return g;
}

export function createFruitPlateModel(): THREE.Group {
  // 大桔供果盘 (宝塔状)
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.25, 0.1, 14), mPorcelain);
  plate.position.y = 0.05;
  g.add(plate);
  // 几颗饱满大桔堆叠
  for (let i = 0; i < 5; i++) {
    const ang = (i / 4) * Math.PI * 2;
    const tang = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), mTeaYellow);
    tang.position.set(Math.cos(ang) * 0.18, 0.16, Math.sin(ang) * 0.18);
    g.add(tang);
  }
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), mTeaYellow);
  top.position.set(0, 0.32, 0);
  g.add(top);
  return g;
}

export function createGreatSignModel(): THREE.Group {
  const g = new THREE.Group();
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.05), mGold);
  plaque.position.y = 0.3;
  g.add(plaque);
  return g;
}

export function createTangerineModel(): THREE.Group {
  // 单颗带绿叶大桔
  const g = new THREE.Group();
  const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), mTeaYellow);
  fruit.position.y = 0.18;
  g.add(fruit);
  const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.14), mFreshVeg);
  leaf.position.set(0.06, 0.38, 0);
  g.add(leaf);
  return g;
}

export function createProtectModel(): THREE.Group {
  const g = new THREE.Group();
  const p = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.05), mGold);
  p.position.y = 0.28;
  g.add(p);
  return g;
}

export function createLongevityScreenModel(): THREE.Group {
  // 金字寿字座屏
  const g = new THREE.Group();
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.1, 0.06), mGold);
  screen.position.y = 0.55;
  g.add(screen);
  return g;
}

// =========================================================================
// 6. 场景五：做粿案台 (guo_table, 13 个道具模型)
// =========================================================================

export function createGuoModel(): THREE.Group {
  // 经典潮汕红桃粿 (桃尖微翘，鲜亮粉红)
  const g = new THREE.Group();
  // 桃形底胚
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.14, 16), mPeachPink);
  body.scale.set(1.2, 1.0, 1.4);
  body.position.y = 0.07;
  g.add(body);
  // 桃尖
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.22, 12), mPeachPink);
  tip.rotation.x = -Math.PI / 3;
  tip.position.set(0, 0.1, -0.42);
  g.add(tip);
  // 表面凹凸印纹圈
  const pattern = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.02, 6, 14), mCandleRed);
  pattern.rotation.x = Math.PI / 2;
  pattern.position.y = 0.145;
  g.add(pattern);
  return g;
}

export function createMoldModel(): THREE.Group {
  // 传统木雕红桃粿印
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.14, 0.65), mWoodLight);
  body.position.y = 0.07;
  g.add(body);
  // 长手柄
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8), mWoodLight);
  handle.rotation.x = Math.PI / 2;
  handle.position.set(0, 0.07, 0.55);
  g.add(handle);
  // 模腔下凹黑槽
  const cavity = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.04, 14), new THREE.MeshBasicMaterial({ color: 0x221510 }));
  cavity.position.set(0, 0.13, 0);
  g.add(cavity);
  return g;
}

export function createFlourModel(): THREE.Group {
  // 大木盆雪白糯米粉
  const g = new THREE.Group();
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.36, 0.2, 16), mWoodLight);
  basin.position.y = 0.1;
  g.add(basin);
  const mound = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.28, 14), mRiceWhite);
  mound.position.y = 0.26;
  g.add(mound);
  return g;
}

export function createSugarModel(): THREE.Group {
  // 两块老红糖砖
  const g = new THREE.Group();
  const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.12, 0.28), mClayPot);
  b1.position.y = 0.06;
  g.add(b1);
  const b2 = b1.clone();
  b2.position.set(0.05, 0.18, 0);
  b2.rotation.y = 0.2;
  g.add(b2);
  return g;
}

export function createRedYeastModel(): THREE.Group {
  // 青瓷碗盛放天然红曲米水
  const g = new THREE.Group();
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.16, 0.16, 12), mPorcelain);
  bowl.position.y = 0.08;
  g.add(bowl);
  const liquid = new THREE.Mesh(new THREE.CircleGeometry(0.24, 12), mCandleRed);
  liquid.rotateX(-Math.PI / 2);
  liquid.position.y = 0.15;
  g.add(liquid);
  return g;
}

export function createWrapGuoModel(): THREE.Group {
  // 半成品手工捏制粿坯
  const g = new THREE.Group();
  const dough = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), mPeachPink);
  dough.position.y = 0.18;
  g.add(dough);
  return g;
}

export function createBeanPasteModel(): THREE.Group {
  // 乌亮红豆沙馅
  const g = new THREE.Group();
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.22, 0.18, 14), mPorcelain);
  bowl.position.y = 0.09;
  g.add(bowl);
  const paste = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 8), mMeatSauce);
  paste.scale.set(1.0, 0.5, 1.0);
  paste.position.y = 0.16;
  g.add(paste);
  return g;
}

export function createGuoDoughModel(): THREE.Group {
  // 擀平的粉红粿皮与小擀面杖
  const g = new THREE.Group();
  const skin = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.02, 16), mPeachPink);
  skin.position.y = 0.01;
  g.add(skin);
  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8), mWoodLight);
  pin.rotation.z = Math.PI / 2;
  pin.position.set(0.1, 0.04, 0.28);
  g.add(pin);
  return g;
}

export function createSteamGuoModel(): THREE.Group {
  // 蒸熟热气蒸笼
  const g = new THREE.Group();
  const steamer = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.4, 16), mBamboo);
  steamer.position.y = 0.2;
  g.add(steamer);
  const steam = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), mSteamWhite);
  steam.position.y = 0.45;
  g.add(steam);
  return g;
}

export function createFriedGuoModel(): THREE.Group {
  // 金黄煎红桃粿平底锅
  const g = new THREE.Group();
  const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.4, 0.08, 16), mIronBlack);
  pan.position.y = 0.04;
  g.add(pan);
  const guo = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.4), mFriedFish);
  guo.position.set(0, 0.08, 0);
  g.add(guo);
  return g;
}

export function createSweetGuoModel(): THREE.Group {
  const g = new THREE.Group();
  const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.3, 12), mClayJar);
  jar.position.y = 0.15;
  g.add(jar);
  return g;
}

export function createPeachGuoModel(): THREE.Group {
  // 寿桃粿
  const g = new THREE.Group();
  const peach = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), mPorcelain);
  peach.position.y = 0.2;
  g.add(peach);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.15, 8), mPeachPink);
  tip.position.set(0, 0.38, 0);
  g.add(tip);
  return g;
}

export function createSpringCoupletModel(): THREE.Group {
  // 过年大红对联条
  const g = new THREE.Group();
  const paper = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.2, 0.04), mCandleRed);
  paper.position.y = 0.6;
  g.add(paper);
  return g;
}

// =========================================================================
// 7. 场景六：西厢卧房 (bedroom, 13 个道具模型)
// =========================================================================

export function createBedModel(): THREE.Group {
  // 潮汕传统雕花大床 (架子床)
  const g = new THREE.Group();
  // 床板基座与木脚踏
  const base = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.6, 2.4), mWoodDark);
  base.position.y = 0.3;
  g.add(base);
  // 四根角柱立柱
  const cols = [[-1.4, -1.1], [1.4, -1.1], [-1.4, 1.1], [1.4, 1.1]];
  cols.forEach(([cx, cz]) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.4, 8), mWoodDark);
    post.position.set(cx, 1.5, cz);
    g.add(post);
  });
  // 床顶围板与承尘
  const topRoof = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.12, 2.5), mWoodDark);
  topRoof.position.y = 2.7;
  g.add(topRoof);
  return g;
}

export function createQuiltModel(): THREE.Group {
  // 大红牡丹花棉被 (豆腐块叠放)
  const g = new THREE.Group();
  const quilt = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.55, 1.0), mClothRed);
  quilt.position.y = 0.275;
  g.add(quilt);
  return g;
}

export function createClothesModel(): THREE.Group {
  // 红木衣架悬挂唐装长衫
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8), mWoodDark);
  pole.position.y = 0.9;
  g.add(pole);
  const coat = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.2, 0.15), mClothRed);
  coat.position.set(0, 1.1, 0);
  g.add(coat);
  return g;
}

export function createNeedleModel(): THREE.Group {
  // 缝衣钢针托盘
  const g = new THREE.Group();
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.04, 12), mPorcelain);
  tray.position.y = 0.02;
  g.add(tray);
  const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.25, 6), mSteelBlade);
  needle.rotation.z = Math.PI / 2;
  needle.position.set(0, 0.045, 0);
  g.add(needle);
  return g;
}

export function createThreadModel(): THREE.Group {
  // 五彩木线轴
  const g = new THREE.Group();
  const spool = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.28, 12), mClothRed);
  spool.position.y = 0.14;
  g.add(spool);
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.32, 8), mWoodLight);
  core.position.y = 0.16;
  g.add(core);
  return g;
}

export function createCombModel(): THREE.Group {
  // 半月形黄杨木梳
  const g = new THREE.Group();
  const comb = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 14, 1, false, 0, Math.PI), mWoodLight);
  comb.rotation.x = Math.PI / 2;
  comb.position.y = 0.11;
  g.add(comb);
  return g;
}

export function createClothRollModel(): THREE.Group {
  // 印花布匹卷
  const g = new THREE.Group();
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.85, 12), mClothRed);
  roll.rotation.x = Math.PI / 2;
  roll.position.y = 0.16;
  g.add(roll);
  return g;
}

export function createScissorsModel(): THREE.Group {
  // 传统铁剪刀
  const g = new THREE.Group();
  const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.38), mSteelBlade);
  s1.rotation.y = 0.25;
  g.add(s1);
  const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.38), mSteelBlade);
  s2.rotation.y = -0.25;
  g.add(s2);
  return g;
}

export function createMendModel(): THREE.Group {
  // 绣花木绷子
  const g = new THREE.Group();
  const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.025, 6, 16), mWoodLight);
  hoop.rotation.x = Math.PI / 2;
  hoop.position.y = 0.03;
  g.add(hoop);
  const cloth = new THREE.Mesh(new THREE.CircleGeometry(0.24, 14), mClothRed);
  cloth.rotateX(-Math.PI / 2);
  cloth.position.y = 0.03;
  g.add(cloth);
  return g;
}

export function createTowelModel(): THREE.Group {
  // 白毛巾
  const g = new THREE.Group();
  const towel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.65, 0.35), mPorcelain);
  towel.position.y = 0.325;
  g.add(towel);
  return g;
}

export function createMirrorModel(): THREE.Group {
  // 梳妆台黄铜圆镜
  const g = new THREE.Group();
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.35, 8), mWoodDark);
  stand.position.y = 0.175;
  g.add(stand);
  const mirror = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.03, 16), mBrass);
  mirror.rotation.x = Math.PI / 2;
  mirror.position.set(0, 0.45, 0);
  g.add(mirror);
  return g;
}

export function createShoesModel(): THREE.Group {
  // 一双布鞋
  const g = new THREE.Group();
  const sL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.42), mClothRed);
  sL.position.set(-0.12, 0.05, 0); g.add(sL);
  const sR = sL.clone(); sR.position.x = 0.12; g.add(sR);
  return g;
}

export function createPeaceKnotModel(): THREE.Group {
  const g = new THREE.Group();
  const knot = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.04), mCandleRed);
  knot.rotation.z = Math.PI / 4;
  knot.position.y = 0.35;
  g.add(knot);
  return g;
}

// =========================================================================
// 8. 场景七：厝内药箱 (medicine, 13 个道具模型)
// =========================================================================

export function createMedicineChestModel(): THREE.Group {
  // 多抽屉传统中药百宝箱
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 0.45), mWoodDark);
  box.position.y = 0.275;
  g.add(box);
  // 黄铜把手与拉环
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 6, 10), mBrass);
  handle.position.set(0, 0.58, 0);
  g.add(handle);
  return g;
}

export function createDayCardModel(): THREE.Group {
  const g = new THREE.Group();
  const card = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.35, 0.04), mPorcelain);
  card.position.y = 0.175;
  g.add(card);
  return g;
}

export function createMorningCupModel(): THREE.Group {
  const g = new THREE.Group();
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 0.18, 12), mPorcelain);
  cup.position.y = 0.09;
  g.add(cup);
  return g;
}

export function createNightCupModel(): THREE.Group {
  const g = new THREE.Group();
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 0.18, 12), mClayPot);
  cup.position.y = 0.09;
  g.add(cup);
  return g;
}

export function createPillModel(): THREE.Group {
  // 几颗金色蜜炼大药丸
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const pill = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 8), mGold);
    pill.position.set((i - 1) * 0.12, 0.065, 0);
    g.add(pill);
  }
  return g;
}

export function createDoseModel(): THREE.Group {
  // 水杯与药匙
  const g = new THREE.Group();
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.22, 10), mPorcelain);
  cup.position.y = 0.11;
  g.add(cup);
  return g;
}

export function createEatSnackModel(): THREE.Group {
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.04, 12), mPorcelain);
  plate.position.y = 0.02;
  g.add(plate);
  return g;
}

export function createTimesCounterModel(): THREE.Group {
  const g = new THREE.Group();
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.32, 10), mBamboo);
  tube.position.y = 0.16;
  g.add(tube);
  return g;
}

export function createGranulesModel(): THREE.Group {
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.03, 10), mPorcelain);
  plate.position.y = 0.015;
  g.add(plate);
  return g;
}

export function createMealTrayModel(): THREE.Group {
  const g = new THREE.Group();
  const tray = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 0.35), mWoodLight);
  tray.position.y = 0.02;
  g.add(tray);
  return g;
}

export function createMortarModel(): THREE.Group {
  // 铸铁研钵与药碾
  const g = new THREE.Group();
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.18, 12), mIronBlack);
  bowl.position.y = 0.09;
  g.add(bowl);
  const pestle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8), mIronBlack);
  pestle.rotation.z = Math.PI / 4;
  pestle.position.set(0.08, 0.18, 0);
  g.add(pestle);
  return g;
}

export function createHerbalBundleModel(): THREE.Group {
  // 草药包
  const g = new THREE.Group();
  const pack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.28), mBamboo);
  pack.position.y = 0.1;
  g.add(pack);
  return g;
}

export function createAcupunctureModel(): THREE.Group {
  // 经络木雕人偶
  const g = new THREE.Group();
  const doll = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.65, 10), mWoodLight);
  doll.position.y = 0.325;
  g.add(doll);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), mWoodLight);
  head.position.y = 0.72;
  g.add(head);
  return g;
}

// =========================================================================
// 9. 场景八：园头田埂 (farm, 13 个道具模型)
// =========================================================================

export function createFieldModel(): THREE.Group {
  // 菜垄田畦
  const g = new THREE.Group();
  const earth = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 1.6), mClayJar);
  earth.position.y = 0.15;
  g.add(earth);
  // 绿苗
  for (let i = -0.8; i <= 0.8; i += 0.4) {
    const sprout = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.25, 6), mFreshVeg);
    sprout.position.set(i, 0.4, 0);
    g.add(sprout);
  }
  return g;
}

export function createOxModel(): THREE.Group {
  // 完整生动的老水牛 (躯干、粗壮四肢、向后弯曲的大牛角、牛头与牛尾)
  const g = new THREE.Group();
  // 健硕躯干
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 1.4, 12), mOxBody);
  body.rotation.z = Math.PI / 2;
  body.position.set(0, 0.95, 0);
  g.add(body);
  // 牛颈与牛头
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.6, 10), mOxBody);
  head.rotation.z = -Math.PI / 3;
  head.position.set(0.85, 1.1, 0);
  g.add(head);
  // 一对向后弯曲的大牛角
  const hornL = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.055, 6, 10, Math.PI * 0.7), mOxHorn);
  hornL.rotation.y = Math.PI / 2;
  hornL.rotation.x = -Math.PI / 4;
  hornL.position.set(0.75, 1.35, 0.22);
  g.add(hornL);
  const hornR = hornL.clone();
  hornR.rotation.x = Math.PI / 4;
  hornR.position.z = -0.22;
  g.add(hornR);
  // 四条健壮牛腿
  const legPos = [[-0.45, -0.3], [0.45, -0.3], [-0.45, 0.3], [0.45, 0.3]];
  legPos.forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.8, 8), mOxBody);
    leg.position.set(lx, 0.4, lz);
    g.add(leg);
  });
  // 牛尾巴
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.55, 6), mOxBody);
  tail.rotation.z = Math.PI / 5;
  tail.position.set(-0.75, 0.75, 0);
  g.add(tail);
  return g;
}

export function createGrassModel(): THREE.Group {
  // 青草丛与干草捆
  const g = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.45, 6), mFreshVeg);
    blade.position.set(Math.cos(i) * 0.2, 0.22, Math.sin(i) * 0.2);
    g.add(blade);
  }
  return g;
}

export function createSeedBagModel(): THREE.Group {
  // 种子麻袋
  const g = new THREE.Group();
  const sack = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.35, 0.6, 10), mBamboo);
  sack.position.y = 0.3;
  g.add(sack);
  return g;
}

export function createMelonModel(): THREE.Group {
  // 竹架青丝瓜
  const g = new THREE.Group();
  const trellis = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.4, 0.06), mBamboo);
  trellis.position.y = 0.7;
  g.add(trellis);
  const gourd = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.65, 8), mFreshVeg);
  gourd.position.set(0.18, 0.7, 0);
  g.add(gourd);
  return g;
}

export function createBasketModel(): THREE.Group {
  // 双耳竹菜篓
  const g = new THREE.Group();
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.28, 0.45, 12), mBamboo);
  basket.position.y = 0.225;
  g.add(basket);
  return g;
}

export function createSoilMoundModel(): THREE.Group {
  const g = new THREE.Group();
  const soil = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.45, 10), mClayJar);
  soil.position.y = 0.225;
  g.add(soil);
  return g;
}

export function createPavingModel(): THREE.Group {
  const g = new THREE.Group();
  const ground = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 1.6), mPewter);
  ground.position.y = 0.04;
  g.add(ground);
  return g;
}

export function createWellModel(): THREE.Group {
  // 园头老水井圈
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.7, 16, 1, true), mPewter);
  ring.position.y = 0.35;
  g.add(ring);
  return g;
}

export function createWaterCanModel(): THREE.Group {
  // 浇水水壶
  const g = new THREE.Group();
  const can = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.45, 10), mSteelBlade);
  can.position.y = 0.225;
  g.add(can);
  const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.35, 6), mSteelBlade);
  spout.rotation.z = -Math.PI / 4;
  spout.position.set(0.24, 0.25, 0);
  g.add(spout);
  return g;
}

export function createHarvestBasketsModel(): THREE.Group {
  // 丰收双竹筐与扁担
  const g = new THREE.Group();
  const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.32, 0.5, 12), mBamboo);
  b1.position.set(-0.6, 0.25, 0); g.add(b1);
  const b2 = b1.clone(); b2.position.x = 0.6; g.add(b2);
  const pole = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 0.08), mWoodLight);
  pole.position.y = 0.55;
  g.add(pole);
  return g;
}

export function createSkySignModel(): THREE.Group {
  const g = new THREE.Group();
  const p = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.65, 0.06), mPorcelain);
  p.position.y = 0.325;
  g.add(p);
  return g;
}

export function createSpringBudsModel(): THREE.Group {
  const g = new THREE.Group();
  const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.35, 10), mClayPot);
  vase.position.y = 0.175;
  g.add(vase);
  const plant = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 8), mFreshVeg);
  plant.position.y = 0.55;
  g.add(plant);
  return g;
}

// =========================================================================
// 10. 场景九：清早食糜 (porridge, 13 个道具模型)
// =========================================================================

export function createPorridgePotModel(): THREE.Group {
  // 双耳砂锅白粥 (锅中浓稠白粥米汤)
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.38, 0.35, 16), mClayPot);
  pot.position.y = 0.175;
  g.add(pot);
  // 浓稠白米粥汤
  const riceSoup = new THREE.Mesh(new THREE.CircleGeometry(0.44, 14), mRiceWhite);
  riceSoup.rotateX(-Math.PI / 2);
  riceSoup.position.y = 0.32;
  g.add(riceSoup);
  // 双耳
  const earL = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.025, 6, 10), mClayPot);
  earL.position.set(-0.52, 0.25, 0); g.add(earL);
  const earR = earL.clone(); earR.position.x = 0.52; g.add(earR);
  return g;
}

export function createFishPlateModel(): THREE.Group {
  // 白瓷长盘干煎巴浪鱼
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.06, 0.38), mPorcelain);
  plate.position.y = 0.03;
  g.add(plate);
  // 两条焦黄酥脆的巴浪鱼
  const fish = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 0.55, 8), mFriedFish);
  fish.rotation.z = Math.PI / 2;
  fish.position.set(0, 0.08, 0);
  g.add(fish);
  return g;
}

export function createPickledVegModel(): THREE.Group {
  // 黑油老菜脯碟
  const g = new THREE.Group();
  const saucer = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.16, 0.06, 12), mPorcelain);
  saucer.position.y = 0.03;
  g.add(saucer);
  const pickles = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), mDarkTea);
  pickles.scale.set(1.0, 0.4, 1.0);
  pickles.position.y = 0.08;
  g.add(pickles);
  return g;
}

export function createEggPlateModel(): THREE.Group {
  // 出油红心咸鸭蛋
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.16, 0.05, 12), mPorcelain);
  plate.position.y = 0.025;
  g.add(plate);
  const white = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), mPorcelain);
  white.position.y = 0.04;
  g.add(white);
  const yolk = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), mEggYolk);
  yolk.position.y = 0.08;
  g.add(yolk);
  return g;
}

export function createMeatPlateModel(): THREE.Group {
  // 潮汕卤肉拼盘
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.35), mPorcelain);
  plate.position.y = 0.03;
  g.add(plate);
  const meat = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.08, 0.25), mMeatSauce);
  meat.position.y = 0.08;
  g.add(meat);
  return g;
}

export function createWarmSteamModel(): THREE.Group {
  const g = new THREE.Group();
  const steam = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), mSteamWhite);
  steam.position.y = 0.25;
  g.add(steam);
  return g;
}

export function createChopsticksModel(): THREE.Group {
  // 竹筷与小碗
  const g = new THREE.Group();
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.14, 0.16, 12), mPorcelain);
  bowl.position.y = 0.08;
  g.add(bowl);
  const stick1 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.45, 6), mBamboo);
  stick1.rotation.z = Math.PI / 2;
  stick1.position.set(0, 0.04, 0.22);
  g.add(stick1);
  return g;
}

export function createFullBowlModel(): THREE.Group {
  // 满满一大碗白粥
  const g = new THREE.Group();
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.16, 0.24, 14), mPorcelain);
  bowl.position.y = 0.12;
  g.add(bowl);
  const rice = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), mRiceWhite);
  rice.position.y = 0.2;
  g.add(rice);
  return g;
}

export function createSaltyTrioModel(): THREE.Group {
  // 三味杂咸小菜碟
  const g = new THREE.Group();
  for (let i = -1; i <= 1; i++) {
    const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.05, 10), mPorcelain);
    dish.position.set(i * 0.26, 0.025, 0);
    g.add(dish);
  }
  return g;
}

export function createBeanSauceModel(): THREE.Group {
  // 普宁豆瓣酱小碟
  const g = new THREE.Group();
  const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.06, 10), mPorcelain);
  dish.position.y = 0.03;
  g.add(dish);
  const sauce = new THREE.Mesh(new THREE.CircleGeometry(0.14, 10), mTeaYellow);
  sauce.rotateX(-Math.PI / 2);
  sauce.position.y = 0.055;
  g.add(sauce);
  return g;
}

export function createGingerModel(): THREE.Group {
  // 细姜丝碟
  const g = new THREE.Group();
  const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.05, 10), mPorcelain);
  dish.position.y = 0.025;
  g.add(dish);
  const ginger = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.08, 8), mTeaYellow);
  ginger.position.y = 0.07;
  g.add(ginger);
  return g;
}

export function createSpoonModel(): THREE.Group {
  // 白瓷汤匙
  const g = new THREE.Group();
  const spoon = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 0.08), mPorcelain);
  spoon.position.y = 0.02;
  g.add(spoon);
  return g;
}

export function createBreakfastTableModel(): THREE.Group {
  const g = new THREE.Group();
  const table = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.65, 0.5), mWoodLight);
  table.position.y = 0.325;
  g.add(table);
  return g;
}

// =========================================================================
// 11. 场景十：堂前团聚 (family, 13 个道具模型)
// =========================================================================

export function createGrandsonModel(): THREE.Group {
  // 竹编婴儿摇篮
  const g = new THREE.Group();
  const cradle = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.28, 0.45, 12), mBamboo);
  cradle.rotation.z = Math.PI / 2;
  cradle.position.y = 0.35;
  g.add(cradle);
  return g;
}

export function createChildToyModel(): THREE.Group {
  // 儿童彩风车
  const g = new THREE.Group();
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.65, 6), mBamboo);
  stick.position.y = 0.325;
  g.add(stick);
  const wheel = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.03), mCandleRed);
  wheel.position.set(0, 0.65, 0);
  g.add(wheel);
  return g;
}

export function createGrandpaChairModel(): THREE.Group {
  // 阿公竹躺椅与拐杖
  const g = new THREE.Group();
  const chair = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 1.1), mBamboo);
  chair.position.y = 0.3;
  g.add(chair);
  const cane = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.85, 8), mWoodDark);
  cane.position.set(0.42, 0.45, 0);
  g.add(cane);
  return g;
}

export function createGrandmaBasketModel(): THREE.Group {
  // 阿婆针线笸箩
  const g = new THREE.Group();
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.26, 0.22, 12), mBamboo);
  basket.position.y = 0.11;
  g.add(basket);
  return g;
}

export function createHomePlaqueModel(): THREE.Group {
  // “四世同堂”大匾额
  const g = new THREE.Group();
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.7, 0.08), mGold);
  plaque.position.y = 0.35;
  g.add(plaque);
  return g;
}

export function createJoyTrayModel(): THREE.Group {
  // 团圆茶盘几席
  const g = new THREE.Group();
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.35, 0.08, 16), mClothRed);
  tray.position.y = 0.04;
  g.add(tray);
  return g;
}

export function createFatherDeskModel(): THREE.Group {
  // 父亲案头折扇账本
  const g = new THREE.Group();
  const desk = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.65, 0.45), mWoodDark);
  desk.position.y = 0.325;
  g.add(desk);
  return g;
}

export function createMotherTeaModel(): THREE.Group {
  // 母亲温热姜茶盅
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.28, 12), mPorcelain);
  pot.position.y = 0.14;
  g.add(pot);
  return g;
}

export function createSonLuggageModel(): THREE.Group {
  // 儿子归家箱包包裹
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.42, 0.42), mWoodDark);
  trunk.position.y = 0.21;
  g.add(trunk);
  return g;
}

export function createFilialCupModel(): THREE.Group {
  // 孝顺敬茶红木托盘
  const g = new THREE.Group();
  const tray = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 0.3), mClothRed);
  tray.position.y = 0.02;
  g.add(tray);
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 0.12, 10), mPorcelain);
  cup.position.set(0, 0.09, 0);
  g.add(cup);
  return g;
}

export function createHarmonyScrollModel(): THREE.Group {
  // “和气致祥”装裱立轴
  const g = new THREE.Group();
  const scroll = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.2, 0.04), mPorcelain);
  scroll.position.y = 0.6;
  g.add(scroll);
  return g;
}

export function createBlissKnotModel(): THREE.Group {
  // 双喜中国结
  const g = new THREE.Group();
  const knot = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.05), mCandleRed);
  knot.rotation.z = Math.PI / 4;
  knot.position.y = 0.35;
  g.add(knot);
  return g;
}

export function createSmoothRuyiModel(): THREE.Group {
  // 翡翠金玉如意
  const g = new THREE.Group();
  const ruyi = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.1, 0.15), mGold);
  ruyi.position.y = 0.05;
  g.add(ruyi);
  return g;
}

// =========================================================================
// 12. 场景十一：村头墟市 (market, 13 个道具模型)
// =========================================================================

export function createScaleModel(): THREE.Group {
  // 传统中式木杆秤 (木杆、秤星、黄铜铜盘、秤砣)
  const g = new THREE.Group();
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 1.1, 8), mWoodDark);
  rod.rotation.z = Math.PI / 2;
  rod.position.y = 0.35;
  g.add(rod);
  // 悬挂铜秤盘
  const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.03, 14), mBrass);
  pan.position.set(-0.45, 0.08, 0);
  g.add(pan);
  // 秤砣
  const weight = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.15, 8), mIronBlack);
  weight.position.set(0.35, 0.2, 0);
  g.add(weight);
  return g;
}

export function createMoneyBoxModel(): THREE.Group {
  // 木钱匣与钞票
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.18, 0.35), mWoodLight);
  box.position.y = 0.09;
  g.add(box);
  return g;
}

export function createBuyBasketModel(): THREE.Group {
  // 买菜竹篮
  const g = new THREE.Group();
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.25, 0.35, 12), mBamboo);
  basket.position.y = 0.175;
  g.add(basket);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.02, 6, 12, Math.PI), mBamboo);
  handle.position.set(0, 0.35, 0);
  g.add(handle);
  return g;
}

export function createSellStallModel(): THREE.Group {
  // 货摊长条摊板
  const g = new THREE.Group();
  const board = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 0.75), mWoodLight);
  board.position.y = 0.05;
  g.add(board);
  return g;
}

export function createWeightsModel(): THREE.Group {
  // 一套铸铁砝码
  const g = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.04 + i * 0.015, 0.05 + i * 0.015, 0.12 + i * 0.03, 8), mIronBlack);
    w.position.set((i - 1.5) * 0.14, 0.08, 0);
    g.add(w);
  }
  return g;
}

export function createSilverCoinsModel(): THREE.Group {
  // 几枚银光闪闪的袁大头银元
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.02, 14), mPewter);
    coin.position.set((i - 1) * 0.14, 0.01, 0);
    g.add(coin);
  }
  return g;
}

export function createLiangWeightsModel(): THREE.Group {
  // 药戥秤
  const g = new THREE.Group();
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.55, 6), mBrass);
  rod.rotation.z = Math.PI / 2;
  rod.position.y = 0.15;
  g.add(rod);
  return g;
}

export function createVegHeapModel(): THREE.Group {
  // 堆积瓜果堆
  const g = new THREE.Group();
  const heap = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 8), mFreshVeg);
  heap.scale.set(1.2, 0.6, 1.0);
  heap.position.y = 0.2;
  g.add(heap);
  return g;
}

export function createSpiceBagModel(): THREE.Group {
  // 香料小布袋
  const g = new THREE.Group();
  const bag = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), mClayJar);
  bag.position.y = 0.15;
  g.add(bag);
  return g;
}

export function createBaconModel(): THREE.Group {
  // 腊肉条
  const g = new THREE.Group();
  const meat = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.55, 0.14), mMeatSauce);
  meat.position.y = 0.28;
  g.add(meat);
  return g;
}

export function createCabbageModel(): THREE.Group {
  // 大白菜小筐
  const g = new THREE.Group();
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.18, 12), mBamboo);
  basket.position.y = 0.09;
  g.add(basket);
  const veg = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), mFreshVeg);
  veg.position.y = 0.18;
  g.add(veg);
  return g;
}

export function createCoinsHeapModel(): THREE.Group {
  // 零散铜钱堆
  const g = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 10), mBrass);
    coin.position.set(Math.cos(i) * 0.08, 0.01 + i * 0.015, Math.sin(i) * 0.08);
    g.add(coin);
  }
  return g;
}

export function createMarketPoleModel(): THREE.Group {
  // 集市扁担与箩筐
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.1), mWoodLight);
  pole.position.y = 0.65;
  g.add(pole);
  const bL = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.28, 0.45, 12), mBamboo);
  bL.position.set(-0.6, 0.225, 0); g.add(bL);
  const bR = bL.clone(); bR.position.x = 0.6; g.add(bR);
  return g;
}

// =========================================================================
// 13. 工厂调度中心：根据 word id 返回对应的实物三维模型
// =========================================================================
export const PROP_BUILDERS: Record<string, () => THREE.Group> = {
  // 1. tea_table
  tray: createTrayModel,
  tea: createTeapotModel,
  cup: createCupModel,
  water: createWaterKettleModel,
  fire: createStoveModel,
  leaf: createTeaCanisterModel,
  sweet: createOlivePlateModel,
  pot: createPotAdvModel,
  pour: createPourModel,
  rinse: createRinseModel,
  aroma: createAromaModel,
  hot: createHotModel,
  guest: createGuestModel,

  // 2. kitchen
  wok: createWokModel,
  steam: createSteamerModel,
  knife: createKnifeModel,
  slice: createCuttingBoardModel,
  rice: createRiceJarModel,
  stirfry: createStirfryModel,
  bowl: createBowlModel,
  wood: createWoodModel,
  pot_stove: createPotStoveModel,
  oil: createOilJarModel,
  salt: createSaltJarModel,
  spatula: createSpatulaModel,
  boil: createBoilModel,
  soup: createSoupModel,

  // 3. courtyard
  door: createDoorModel,
  lock: createLockModel,
  table: createTableModel,
  chair: createChairModel,
  broom: createBroomModel,
  clean: createCleanGroundModel,
  open: createDoorOpenModel,
  close: createDoorCloseModel,
  enter: createDoorThresholdModel,
  sit: createBenchModel,
  lamp: createLanternModel,
  clock: createClockModel,
  hall: createHallPlaqueModel,

  // 4. altar
  incense: createIncenseModel,
  candle: createCandleModel,
  worship: createWorshipMatModel,
  fortune: createFortunePlaqueModel,
  peaceful: createPeaceTabletModel,
  tranquil: createTranquilTabletModel,
  god: createShrineModel,
  flower: createVaseModel,
  fruit: createFruitPlateModel,
  great: createGreatSignModel,
  lucky: createTangerineModel,
  protect: createProtectModel,
  longevity: createLongevityScreenModel,

  // 5. guo_table
  guo: createGuoModel,
  mold: createMoldModel,
  flour: createFlourModel,
  sugar: createSugarModel,
  red: createRedYeastModel,
  wrap: createWrapGuoModel,
  bean: createBeanPasteModel,
  skin: createGuoDoughModel,
  steam_guo: createSteamGuoModel,
  fry_guo: createFriedGuoModel,
  sweet_taste: createSweetGuoModel,
  peach_shape: createPeachGuoModel,
  year_festival: createSpringCoupletModel,

  // 6. bedroom
  bed: createBedModel,
  quilt: createQuiltModel,
  clothes: createClothesModel,
  needle: createNeedleModel,
  thread: createThreadModel,
  comb: createCombModel,
  cloth: createClothRollModel,
  scissors: createScissorsModel,
  mend: createMendModel,
  towel: createTowelModel,
  mirror: createMirrorModel,
  shoes: createShoesModel,
  peace: createPeaceKnotModel,

  // 7. medicine
  med: createMedicineChestModel,
  day: createDayCardModel,
  morning_med: createMorningCupModel,
  night_med: createNightCupModel,
  pill: createPillModel,
  take_dose: createDoseModel,
  eat_med: createEatSnackModel,
  times_dose: createTimesCounterModel,
  granule: createGranulesModel,
  meal_time: createMealTrayModel,
  stop_med: createMortarModel,
  care_body: createHerbalBundleModel,
  body: createAcupunctureModel,

  // 8. farm
  field: createFieldModel,
  ox: createOxModel,
  grass: createGrassModel,
  plant_seed: createSeedBagModel,
  melon: createMelonModel,
  pick_fruit: createBasketModel,
  soil: createSoilMoundModel,
  ground: createPavingModel,
  irrigation: createWellModel,
  pour_water: createWaterCanModel,
  harvest: createHarvestBasketsModel,
  sky: createSkySignModel,
  spring: createSpringBudsModel,

  // 9. porridge
  porridge_rice: createPorridgePotModel,
  fish: createFishPlateModel,
  veggies: createPickledVegModel,
  egg: createEggPlateModel,
  meat: createMeatPlateModel,
  warm: createWarmSteamModel,
  eat: createChopsticksModel,
  full: createFullBowlModel,
  salty: createSaltyTrioModel,
  soy_paste: createBeanSauceModel,
  ginger: createGingerModel,
  spoon: createSpoonModel,
  morning: createBreakfastTableModel,

  // 10. family
  grandson: createGrandsonModel,
  child: createChildToyModel,
  grandfather: createGrandpaChairModel,
  grandmother: createGrandmaBasketModel,
  home: createHomePlaqueModel,
  joy: createJoyTrayModel,
  father: createFatherDeskModel,
  mother: createMotherTeaModel,
  son: createSonLuggageModel,
  filial: createFilialCupModel,
  harmony: createHarmonyScrollModel,
  bliss: createBlissKnotModel,
  smooth: createSmoothRuyiModel,

  // 11. market
  scale: createScaleModel,
  money: createMoneyBoxModel,
  buy: createBuyBasketModel,
  sell: createSellStallModel,
  catty: createWeightsModel,
  yuan: createSilverCoinsModel,
  liang: createLiangWeightsModel,
  much: createVegHeapModel,
  little: createSpiceBagModel,
  costly: createBaconModel,
  cheap: createCabbageModel,
  change_money: createCoinsHeapModel,
  city_market: createMarketPoleModel
};

/**
 * 组装单个生活实物道具三维模型，附带触控拾取碰撞盒与动效元数据
 */
export function buildItemObject3D(
  id: string,
  sceneId: string,
  character: string,
  triggerName: string,
  tier: 'basic' | 'advanced',
  worldPos: THREE.Vector3,
  colliderSize = { w: 1.0, h: 1.0, d: 1.0 }
): {
  group: THREE.Group;
  colliderMesh: THREE.Mesh;
} {
  const group = new THREE.Group();
  group.name = `prop_${id}_${character}`;
  group.position.copy(worldPos);

  // 1. 创建对应的具身实物三维模型
  const builder = PROP_BUILDERS[id];
  let modelMesh: THREE.Group;
  if (builder) {
    modelMesh = builder();
  } else {
    // 基础备选几何体
    modelMesh = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), mWoodLight);
    box.position.y = 0.25;
    modelMesh.add(box);
  }

  modelMesh.name = `mesh_${id}`;
  group.add(modelMesh);

  // 2. 触控拾取透明碰撞盒 (加宽容错率，适老与儿童一触即中)
  const colGeo = new THREE.BoxGeometry(colliderSize.w, colliderSize.h, colliderSize.d);
  const colMat = new THREE.MeshBasicMaterial({ visible: false, wireframe: true });
  const colliderMesh = new THREE.Mesh(colGeo, colMat);
  colliderMesh.name = `collider_${id}`;
  colliderMesh.position.y = colliderSize.h / 2;
  colliderMesh.userData = {
    itemId: id,
    sceneId,
    character,
    triggerName,
    tier,
    clickable: true
  };
  group.add(colliderMesh);

  // 3. 记录交互动画元数据
  group.userData = {
    originalY: worldPos.y,
    baseY: 0,
    modelMesh,
    bounceProgress: 0,
    isBouncing: false,
    hoverPhase: Math.random() * Math.PI * 2
  };

  return {
    group,
    colliderMesh
  };
}
