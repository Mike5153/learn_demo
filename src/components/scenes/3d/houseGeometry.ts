import * as THREE from 'three';

/**
 * 潮汕传统民居“下山虎”大厝三维全景空间生成器 (完整 11 场景空间实体全息构建)
 * 采用极致轻量化的低多边形几何体，全量使用原生调色材质，零网络加载延迟，iPad mini 2 极度友好
 */
export function createHouseStructure(): THREE.Group {
  const houseGroup = new THREE.Group();
  houseGroup.name = 'ChaozhouHouse';

  // 传统民居调色盘
  const cFloorSlate = 0xb8b09d;     // 青石板地面
  const cHallPlinth = 0x9e9582;     // 正厅石台基
  const cWoodColumn = 0x5a2318;     // 熟红大漆木柱/横梁
  const cWoodTable = 0x6e3b22;      // 八仙桌深栗木色
  const cWoodBench = 0x582f1b;      // 长板凳木色
  const cWallWhite = 0xded8cc;      // 粉白照墙/粉墙
  const cRoofTiles = 0x3d4147;      // 潮汕灰黑筒瓦屋脊
  const cBrickWall = 0x9b4436;      // 老灶红砖色
  const cBrickStove = 0x8a382b;     // 柴火灶台深红砖
  const cStoneWell = 0x7a7466;      // 天井石水缸/水井
  const cWaterSurface = 0x4f787a;   // 水缸幽青水面
  const cLanternGlow = 0xffc168;    // 暖灯笼微光
  const cGoldTrim = 0xd4af37;       // 金漆雕花描金
  const cSoilGreen = 0x4a6b42;      // 菜园绿意与泥土

  // 共享通用基础材质（Lambert 柔和漫反射）
  const matFloor = new THREE.MeshLambertMaterial({ color: cFloorSlate });
  const matHallPlinth = new THREE.MeshLambertMaterial({ color: cHallPlinth });
  const matWoodColumn = new THREE.MeshLambertMaterial({ color: cWoodColumn });
  const matWoodTable = new THREE.MeshLambertMaterial({ color: cWoodTable });
  const matWoodBench = new THREE.MeshLambertMaterial({ color: cWoodBench });
  const matWallWhite = new THREE.MeshLambertMaterial({ color: cWallWhite });
  const matRoofTiles = new THREE.MeshLambertMaterial({ color: cRoofTiles });
  const matBrickWall = new THREE.MeshLambertMaterial({ color: cBrickWall });
  const matBrickStove = new THREE.MeshLambertMaterial({ color: cBrickStove });
  const matStoneWell = new THREE.MeshLambertMaterial({ color: cStoneWell });
  const matWater = new THREE.MeshLambertMaterial({ color: cWaterSurface });
  const matLantern = new THREE.MeshBasicMaterial({ color: cLanternGlow });
  const matGold = new THREE.MeshLambertMaterial({ color: cGoldTrim });
  const matSoil = new THREE.MeshLambertMaterial({ color: cSoilGreen });

  // ================= 1. 大院天地基底与前院天井 =================
  const groundGeo = new THREE.BoxGeometry(40, 0.4, 44);
  const groundMesh = new THREE.Mesh(groundGeo, matFloor);
  groundMesh.position.set(0, -0.2, 0);
  houseGroup.add(groundMesh);

  // 天井石地嵌线装饰
  const courtStoneGeo = new THREE.BoxGeometry(10, 0.05, 10);
  const courtStoneMesh = new THREE.Mesh(courtStoneGeo, new THREE.MeshLambertMaterial({ color: 0xa8a08f }));
  courtStoneMesh.position.set(0, 0.03, 6);
  houseGroup.add(courtStoneMesh);

  // 天井石水缸 (中庭蓄水大石缸)
  const wellGroup = new THREE.Group();
  wellGroup.position.set(3.8, 0, 7.5);
  
  const wellGeo = new THREE.CylinderGeometry(1.0, 0.85, 1.1, 16);
  const wellMesh = new THREE.Mesh(wellGeo, matStoneWell);
  wellMesh.position.y = 0.55;
  wellGroup.add(wellMesh);

  const waterSurfaceGeo = new THREE.CircleGeometry(0.85, 16);
  waterSurfaceGeo.rotateX(-Math.PI / 2);
  const waterMesh = new THREE.Mesh(waterSurfaceGeo, matWater);
  waterMesh.position.y = 1.05;
  wellGroup.add(waterMesh);

  // 浮莲荷叶点缀
  const leafGeo = new THREE.CircleGeometry(0.28, 8);
  leafGeo.rotateX(-Math.PI / 2);
  const leafMesh = new THREE.Mesh(leafGeo, new THREE.MeshLambertMaterial({ color: 0x3d7041 }));
  leafMesh.position.set(0.2, 1.06, 0.1);
  wellGroup.add(leafMesh);

  houseGroup.add(wellGroup);

  // ================= 2. 前院门楼与大木宅门 (courtyard: 门、锁、桌、椅、扫) =================
  const gateGroup = new THREE.Group();
  gateGroup.position.set(0, 0, 14.5);

  // 门楼两侧厚石墙
  const gateWallL = new THREE.Mesh(new THREE.BoxGeometry(7, 4.5, 0.8), matWallWhite);
  gateWallL.position.set(-6.5, 2.25, 0);
  const gateWallR = new THREE.Mesh(new THREE.BoxGeometry(7, 4.5, 0.8), matWallWhite);
  gateWallR.position.set(6.5, 2.25, 0);
  gateGroup.add(gateWallL, gateWallR);

  // 门楼顶檐瓦
  const gateRoofGeo = new THREE.BoxGeometry(8, 0.4, 2.4);
  const gateRoof = new THREE.Mesh(gateRoofGeo, matRoofTiles);
  gateRoof.position.set(0, 4.7, 0);
  gateGroup.add(gateRoof);

  // 青石高门槛
  const threshold = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.45, 0.6), matHallPlinth);
  threshold.position.set(0, 0.22, 0);
  gateGroup.add(threshold);

  // 两扇大木宅门 (左扇微开、右扇半开)
  const doorGeo = new THREE.BoxGeometry(2.3, 3.8, 0.15);
  const doorL = new THREE.Mesh(doorGeo, matWoodColumn);
  doorL.position.set(-1.3, 2.1, 0.2);
  doorL.rotation.y = 0.35;
  const doorR = new THREE.Mesh(doorGeo, matWoodColumn);
  doorR.position.set(1.3, 2.1, 0.2);
  doorR.rotation.y = -0.35;
  gateGroup.add(doorL, doorR);

  // 宅门黄铜挂锁与门环
  const brassRingGeo = new THREE.TorusGeometry(0.12, 0.03, 8, 16);
  const brassRingL = new THREE.Mesh(brassRingGeo, matGold);
  brassRingL.position.set(-0.6, 2.0, 0.4);
  const brassRingR = new THREE.Mesh(brassRingGeo, matGold);
  brassRingR.position.set(0.6, 2.0, 0.4);
  gateGroup.add(brassRingL, brassRingR);

  // 门楼外侧的市井菜摊长木条案 (market: 秤、钱、买、卖)
  const marketStallGroup = new THREE.Group();
  marketStallGroup.position.set(5.5, 0, 4.0);
  const stallTable = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.9, 1.4), matWoodTable);
  stallTable.position.y = 0.45;
  const stallCover = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.15, 2.2), matRoofTiles);
  stallCover.position.set(0, 2.6, 0);
  marketStallGroup.add(stallTable, stallCover);
  gateGroup.add(marketStallGroup);

  houseGroup.add(gateGroup);

  // ================= 3. 正厅堂架构 (tea_table, altar, family) =================
  const hallGroup = new THREE.Group();
  hallGroup.position.set(0, 0, -1.2);

  // 台基与踏步
  const plinthGeo = new THREE.BoxGeometry(13, 0.6, 11);
  const plinthMesh = new THREE.Mesh(plinthGeo, matHallPlinth);
  plinthMesh.position.set(0, 0.3, 0);
  hallGroup.add(plinthMesh);

  // 青石出入踏步
  const stepGeo = new THREE.BoxGeometry(4.8, 0.3, 1.0);
  const stepMesh = new THREE.Mesh(stepGeo, matHallPlinth);
  stepMesh.position.set(0, 0.15, 5.8);
  hallGroup.add(stepMesh);

  // 正厅后墙 (屏风大壁)
  const backWallGeo = new THREE.BoxGeometry(12.6, 5.2, 0.5);
  const backWallMesh = new THREE.Mesh(backWallGeo, matWallWhite);
  backWallMesh.position.set(0, 3.2, -5.2);
  hallGroup.add(backWallMesh);

  // 中堂挂屏壁画装饰框 (潮汕大厝金漆雕花板)
  const screenGeo = new THREE.BoxGeometry(5.2, 3.2, 0.15);
  const screenMesh = new THREE.Mesh(screenGeo, new THREE.MeshLambertMaterial({ color: 0x4a1f18 }));
  screenMesh.position.set(0, 3.2, -4.9);
  hallGroup.add(screenMesh);

  // 金字横匾：“四世同堂 / 积善流芳”
  const plaqueGeo = new THREE.BoxGeometry(3.6, 0.8, 0.12);
  const plaqueMesh = new THREE.Mesh(plaqueGeo, matGold);
  plaqueMesh.position.set(0, 4.4, -4.8);
  hallGroup.add(plaqueMesh);

  // 祖厅金漆木雕神台案几 (altar: 香、烛、拜、福、寿、神、果)
  const altarTableGeo = new THREE.BoxGeometry(4.4, 1.4, 1.2);
  const altarTableMesh = new THREE.Mesh(altarTableGeo, new THREE.MeshLambertMaterial({ color: 0x8b1a1a }));
  altarTableMesh.position.set(0, 1.3, -4.2);
  const altarGoldTrim = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.15, 1.3), matGold);
  altarGoldTrim.position.set(0, 2.05, -4.2);
  hallGroup.add(altarTableMesh, altarGoldTrim);

  // 4根大红熟漆廊柱
  const colGeo = new THREE.CylinderGeometry(0.3, 0.34, 5.2, 16);
  const colPos = [
    [-5.0, 3.2, 4.6],
    [5.0, 3.2, 4.6],
    [-5.0, 3.2, -1.2],
    [5.0, 3.2, -1.2]
  ];
  colPos.forEach(([x, y, z]) => {
    const col = new THREE.Mesh(colGeo, matWoodColumn);
    col.position.set(x, y, z);
    hallGroup.add(col);

    // 柱础 (石雕鼓凳)
    const baseGeo = new THREE.CylinderGeometry(0.45, 0.52, 0.4, 16);
    const base = new THREE.Mesh(baseGeo, matHallPlinth);
    base.position.set(x, 0.8, z);
    hallGroup.add(base);
  });

  // 大梁与月梁框架
  const beamFrontGeo = new THREE.BoxGeometry(11.2, 0.45, 0.45);
  const beamFront = new THREE.Mesh(beamFrontGeo, matWoodColumn);
  beamFront.position.set(0, 5.4, 4.6);
  hallGroup.add(beamFront);

  const beamMidGeo = new THREE.BoxGeometry(11.2, 0.45, 0.45);
  const beamMid = new THREE.Mesh(beamMidGeo, matWoodColumn);
  beamMid.position.set(0, 5.4, -1.2);
  hallGroup.add(beamMid);

  // 双坡悬山顶瓦屋檐 (带微翘飞檐卷草)
  const roofMainGeo = new THREE.BoxGeometry(14, 0.4, 13);
  roofMainGeo.rotateX(0.12);
  const roofMain = new THREE.Mesh(roofMainGeo, matRoofTiles);
  roofMain.position.set(0, 6.2, 0);
  hallGroup.add(roofMain);

  // 红灯笼挂在前廊两柱下
  const lanternGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.7, 12);
  const lanternL = new THREE.Mesh(lanternGeo, new THREE.MeshLambertMaterial({ color: 0xd32f2f }));
  lanternL.position.set(-4.0, 4.5, 4.6);
  const lanternGlowL = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), matLantern);
  lanternGlowL.position.set(-4.0, 4.5, 4.6);
  hallGroup.add(lanternL, lanternGlowL);

  const lanternR = new THREE.Mesh(lanternGeo, new THREE.MeshLambertMaterial({ color: 0xd32f2f }));
  lanternR.position.set(4.0, 4.5, 4.6);
  const lanternGlowR = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), matLantern);
  lanternGlowR.position.set(4.0, 4.5, 4.6);
  hallGroup.add(lanternR, lanternGlowR);

  // 正厅中央红木工夫茶桌与八仙凳
  const tableGroup = new THREE.Group();
  tableGroup.position.set(0, 0.6, 1.8);

  const tableTopGeo = new THREE.BoxGeometry(3.6, 0.22, 2.8);
  const tableTop = new THREE.Mesh(tableTopGeo, matWoodTable);
  tableTop.position.y = 1.35;
  tableGroup.add(tableTop);

  // 四只直棂桌腿
  const legGeo = new THREE.BoxGeometry(0.24, 1.35, 0.24);
  const legPos = [
    [-1.6, 0.68, -1.2],
    [1.6, 0.68, -1.2],
    [-1.6, 0.68, 1.2],
    [1.6, 0.68, 1.2]
  ];
  legPos.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeo, matWoodTable);
    leg.position.set(x, y, z);
    tableGroup.add(leg);
  });

  // 三张长板凳 (前、左、右)
  const benchGeo = new THREE.BoxGeometry(2.2, 0.12, 0.42);
  const benchLegGeo = new THREE.BoxGeometry(0.14, 0.72, 0.36);

  // 前板凳 (老人家坐姿正面位)
  const benchFrontGroup = new THREE.Group();
  benchFrontGroup.position.set(0, 0, 2.3);
  const benchTopF = new THREE.Mesh(benchGeo, matWoodBench);
  benchTopF.position.y = 0.75;
  benchFrontGroup.add(benchTopF);
  const bLegF1 = new THREE.Mesh(benchLegGeo, matWoodBench);
  bLegF1.position.set(-0.85, 0.36, 0);
  const bLegF2 = new THREE.Mesh(benchLegGeo, matWoodBench);
  bLegF2.position.set(0.85, 0.36, 0);
  benchFrontGroup.add(bLegF1, bLegF2);
  tableGroup.add(benchFrontGroup);

  // 左板凳
  const benchLeftGroup = new THREE.Group();
  benchLeftGroup.rotation.y = Math.PI / 2;
  benchLeftGroup.position.set(-2.3, 0, 0);
  const benchTopL = new THREE.Mesh(benchGeo, matWoodBench);
  benchTopL.position.y = 0.75;
  benchLeftGroup.add(benchTopL);
  const bLegL1 = new THREE.Mesh(benchLegGeo, matWoodBench);
  bLegL1.position.set(-0.85, 0.36, 0);
  const bLegL2 = new THREE.Mesh(benchLegGeo, matWoodBench);
  bLegL2.position.set(0.85, 0.36, 0);
  benchLeftGroup.add(bLegL1, bLegL2);
  tableGroup.add(benchLeftGroup);

  // 右板凳
  const benchRightGroup = new THREE.Group();
  benchRightGroup.rotation.y = -Math.PI / 2;
  benchRightGroup.position.set(2.3, 0, 0);
  const benchTopR = new THREE.Mesh(benchGeo, matWoodBench);
  benchTopR.position.y = 0.75;
  benchRightGroup.add(benchTopR);
  const bLegR1 = new THREE.Mesh(benchLegGeo, matWoodBench);
  bLegR1.position.set(-0.85, 0.36, 0);
  const bLegR2 = new THREE.Mesh(benchLegGeo, matWoodBench);
  bLegR2.position.set(0.85, 0.36, 0);
  benchRightGroup.add(bLegR1, bLegR2);
  tableGroup.add(benchRightGroup);

  hallGroup.add(tableGroup);
  houseGroup.add(hallGroup);

  // ================= 4. 左侧下房：灶房、做粿案板与食糜餐桌 (kitchen, guo_table, porridge) =================
  const kitchenWingGroup = new THREE.Group();
  kitchenWingGroup.position.set(-9.5, 0, 0);

  // 厨房红砖地面
  const kFloorGeo = new THREE.BoxGeometry(8.5, 0.25, 14);
  const kFloorMesh = new THREE.Mesh(kFloorGeo, new THREE.MeshLambertMaterial({ color: 0x7c382b }));
  kFloorMesh.position.set(0, 0.12, 0);
  kitchenWingGroup.add(kFloorMesh);

  // 厨房后红砖墙
  const kBackWallGeo = new THREE.BoxGeometry(8.5, 4.6, 0.4);
  const kBackWallMesh = new THREE.Mesh(kBackWallGeo, matBrickWall);
  kBackWallMesh.position.set(0, 2.4, -6.8);
  kitchenWingGroup.add(kBackWallMesh);

  // 厨房外侧实体砖墙
  const kSideWallGeo = new THREE.BoxGeometry(0.4, 4.6, 14);
  const kSideWallMesh = new THREE.Mesh(kSideWallGeo, matBrickWall);
  kSideWallMesh.position.set(-4.2, 2.4, 0);
  kitchenWingGroup.add(kSideWallMesh);

  // 厨房拱形门洞门框柱 (通向天井)
  const archColGeo = new THREE.BoxGeometry(0.4, 4.2, 0.8);
  const archColFront = new THREE.Mesh(archColGeo, matBrickWall);
  archColFront.position.set(4.1, 2.2, 6.2);
  kitchenWingGroup.add(archColFront);

  // 厨房单坡屋面与排烟烟囱
  const kRoofGeo = new THREE.BoxGeometry(9.2, 0.3, 14.4);
  kRoofGeo.rotateZ(-0.15);
  const kRoofMesh = new THREE.Mesh(kRoofGeo, matRoofTiles);
  kRoofMesh.position.set(-0.2, 4.9, 0);
  kitchenWingGroup.add(kRoofMesh);

  const chimneyGeo = new THREE.BoxGeometry(1.0, 2.4, 1.0);
  const chimneyMesh = new THREE.Mesh(chimneyGeo, new THREE.MeshLambertMaterial({ color: 0x484b50 }));
  chimneyMesh.position.set(-3.2, 5.8, -5.5);
  kitchenWingGroup.add(chimneyMesh);

  // 柴火双耳大灶
  const stoveGroup = new THREE.Group();
  stoveGroup.position.set(0.6, 0.25, 1.5);

  const stoveBodyGeo = new THREE.BoxGeometry(4.2, 1.5, 3.2);
  const stoveBody = new THREE.Mesh(stoveBodyGeo, matBrickStove);
  stoveBody.position.y = 0.75;
  stoveGroup.add(stoveBody);

  const stoveTopGeo = new THREE.BoxGeometry(4.4, 0.15, 3.4);
  const stoveTop = new THREE.Mesh(stoveTopGeo, new THREE.MeshLambertMaterial({ color: 0xc8c3b8 }));
  stoveTop.position.y = 1.55;
  stoveGroup.add(stoveTop);

  const hearthHoleGeo = new THREE.BoxGeometry(1.4, 0.8, 0.6);
  const hearthHole = new THREE.Mesh(hearthHoleGeo, new THREE.MeshBasicMaterial({ color: 0x1a0f0a }));
  hearthHole.position.set(0, 0.5, 1.5);
  stoveGroup.add(hearthHole);

  const hearthFireGlowGeo = new THREE.BoxGeometry(0.9, 0.4, 0.4);
  const hearthFireGlow = new THREE.Mesh(hearthFireGlowGeo, new THREE.MeshBasicMaterial({ color: 0xff4d1a }));
  hearthFireGlow.position.set(0, 0.35, 1.4);
  stoveGroup.add(hearthFireGlow);

  kitchenWingGroup.add(stoveGroup);

  // 做粿长案板与清早白粥杂咸餐桌 (guo_table & porridge)
  const guoTableGroup = new THREE.Group();
  guoTableGroup.position.set(0.2, 0.25, -4.2);

  // 竹编大做粿案台
  const guoTableMesh = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.2, 2.2), matWoodBench);
  guoTableMesh.position.y = 0.6;
  const bambooMat = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 2.0), new THREE.MeshLambertMaterial({ color: 0xd4c29a }));
  bambooMat.position.y = 1.24;
  guoTableGroup.add(guoTableMesh, bambooMat);

  kitchenWingGroup.add(guoTableGroup);
  houseGroup.add(kitchenWingGroup);

  // ================= 5. 右侧从厝：西厢卧房与厝内药箱 (bedroom & medicine) =================
  const bedroomWingGroup = new THREE.Group();
  bedroomWingGroup.position.set(9.5, 0, 0);

  // 卧房木质地面
  const bFloorGeo = new THREE.BoxGeometry(8.5, 0.25, 14);
  const bFloorMesh = new THREE.Mesh(bFloorGeo, new THREE.MeshLambertMaterial({ color: 0x5a3628 }));
  bFloorMesh.position.set(0, 0.12, 0);
  bedroomWingGroup.add(bFloorMesh);

  // 卧房后实体墙
  const bBackWallGeo = new THREE.BoxGeometry(8.5, 4.6, 0.4);
  const bBackWallMesh = new THREE.Mesh(bBackWallGeo, matWallWhite);
  bBackWallMesh.position.set(0, 2.4, -6.8);
  bedroomWingGroup.add(bBackWallMesh);

  // 卧房外侧实体墙
  const bSideWallGeo = new THREE.BoxGeometry(0.4, 4.6, 14);
  const bSideWallMesh = new THREE.Mesh(bSideWallGeo, matWallWhite);
  bSideWallMesh.position.set(4.2, 2.4, 0);
  bedroomWingGroup.add(bSideWallMesh);

  // 卧房屋顶
  const bRoofGeo = new THREE.BoxGeometry(9.2, 0.3, 14.4);
  bRoofGeo.rotateZ(0.15);
  const bRoofMesh = new THREE.Mesh(bRoofGeo, matRoofTiles);
  bRoofMesh.position.set(0.2, 4.9, 0);
  bedroomWingGroup.add(bRoofMesh);

  // 雕花老木架子床 (bedroom: 床、被、衣、针、线、梳)
  const bedGroup = new THREE.Group();
  bedGroup.position.set(0.5, 0.25, 2.5);

  const bedMat = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.8, 4.4), matWoodTable);
  bedMat.position.y = 0.4;
  const mattress = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.3, 4.2), new THREE.MeshLambertMaterial({ color: 0xeee7db }));
  mattress.position.y = 0.95;
  const quiltMesh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.4, 2.8), new THREE.MeshLambertMaterial({ color: 0x9b3b3b }));
  quiltMesh.position.set(0, 1.25, -0.6);

  // 床柱与顶棚
  const bedPostGeo = new THREE.BoxGeometry(0.12, 3.2, 0.12);
  const bp1 = new THREE.Mesh(bedPostGeo, matWoodColumn); bp1.position.set(-1.7, 1.6, -2.1);
  const bp2 = new THREE.Mesh(bedPostGeo, matWoodColumn); bp2.position.set(1.7, 1.6, -2.1);
  const bp3 = new THREE.Mesh(bedPostGeo, matWoodColumn); bp3.position.set(-1.7, 1.6, 2.1);
  const bp4 = new THREE.Mesh(bedPostGeo, matWoodColumn); bp4.position.set(1.7, 1.6, 2.1);
  const bedCanopy = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 4.4), matWoodColumn);
  bedCanopy.position.y = 3.2;

  bedGroup.add(bedMat, mattress, quiltMesh, bp1, bp2, bp3, bp4, bedCanopy);
  bedroomWingGroup.add(bedGroup);

  // 窗前梳妆台与家庭小药箱 (medicine: 药、日、早、晚、丸、服)
  const vanityGroup = new THREE.Group();
  vanityGroup.position.set(-0.8, 0.25, -4.5);
  const vanityTable = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.2, 1.6), matWoodTable);
  vanityTable.position.y = 0.6;
  const mirrorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 0.1), matWoodColumn);
  mirrorFrame.position.set(0, 2.1, -0.7);
  const mirrorGlass = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.6, 0.05), new THREE.MeshBasicMaterial({ color: 0xd8e8ea }));
  mirrorGlass.position.set(0, 2.1, -0.65);
  vanityGroup.add(vanityTable, mirrorFrame, mirrorGlass);
  bedroomWingGroup.add(vanityGroup);

  houseGroup.add(bedroomWingGroup);

  // ================= 6. 屋后田园与菜畦 (farm: 田、牛、草、种、瓜、摘) =================
  const farmGroup = new THREE.Group();
  farmGroup.position.set(0, 0, -16);

  // 菜畦大地
  const gardenEarth = new THREE.Mesh(new THREE.BoxGeometry(32, 0.3, 10), matSoil);
  gardenEarth.position.y = -0.15;
  farmGroup.add(gardenEarth);

  // 3条整齐的翻耕菜垄 (田、土、地)
  const ridgeGeo = new THREE.BoxGeometry(26, 0.25, 1.6);
  const ridgeMat = new THREE.MeshLambertMaterial({ color: 0x3d5036 });
  for (let i = 0; i < 3; i++) {
    const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
    ridge.position.set(0, 0.12, -2.5 + i * 2.8);
    farmGroup.add(ridge);
  }

  // 菜园后侧的竹篱笆与爬藤丝瓜架 (瓜)
  const fenceGeo = new THREE.BoxGeometry(28, 1.6, 0.1);
  const fence = new THREE.Mesh(fenceGeo, matWoodBench);
  fence.position.set(0, 0.8, -4.8);
  farmGroup.add(fence);

  // 菜园水井与水勺 (水、浇)
  const gardenWell = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.7, 0.9, 12), matStoneWell);
  gardenWell.position.set(-10, 0.45, 0);
  farmGroup.add(gardenWell);

  // 耕作老黄牛雕像台 (牛)
  const oxBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 1.4), matHallPlinth);
  oxBase.position.set(10, 0.3, 0);
  const oxBody = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.9, 1.1), new THREE.MeshLambertMaterial({ color: 0x6d4c41 }));
  oxBody.position.set(10, 1.05, 0);
  farmGroup.add(oxBase, oxBody);

  houseGroup.add(farmGroup);

  return houseGroup;
}
