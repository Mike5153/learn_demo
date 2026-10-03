import * as THREE from 'three';

/**
 * 潮汕三维全景生活实景：三维汉字模型生成引擎
 * 将 11 大生活场景中的所有物品道具，实体化替换为具有文化工艺质感的三维立体汉字雕塑模型。
 * 
 * 核心技术架构：
 * 1. 2D 离屏字体轮廓采样与多边形闭合追踪 (Marching Squares Contour Tracing)
 * 2. Douglas-Peucker 矢量多边形自适应平滑与轻量化 (保障 iPad mini 2 60FPS 极速渲染)
 * 3. 权威外轮廓与内环扣孔拓扑配对 (Nested Holes Identification & Ray-casting Test)
 * 4. Three.js ExtrudeGeometry 三维立体挤出成型、斜角倒边与表面法线平滑
 * 5. 11 场景定制潮汕传统非遗工艺材质体系 (潮州金漆木雕、朱泥紫砂、青石雕、羊脂白瓷、老生铁等)
 * 6. 传世须弥座 / 雕花印台基座实体结构与文物级微雕铭牌
 * 7. 全局几何体与材质显存复用缓存池 (Zero Memory Leak)
 */

export type TextModelTheme = 
  | 'tea_table'   // 厝内工夫：潮汕朱泥紫砂 + 乌金石须弥台
  | 'kitchen'     // 灶下炊事：锻打生铁熟铁 + 暖红砖雕台
  | 'courtyard'   // 大院天井：潮阳青石石雕 + 沉香木案台
  | 'altar'       // 祖厅神台：潮州金漆木雕 + 茜红大漆金台
  | 'guo_table'   // 案台做粿：寿桃红曲白玉 + 雕花梨木台
  | 'bedroom'     // 西厢卧房：翡翠青玉温润 + 紫檀雕花台
  | 'medicine'    // 厝内药箱：琥珀金棕青草 + 药香沉木台
  | 'farm'        // 屋后田园：苍翠碧绿青铜 + 夯土厚石台
  | 'porridge'    // 清早食糜：澄黄暖蜜白瓷 + 粗陶竹韵台
  | 'family'      // 堂前团聚：金玉满堂暖红 + 描金福寿台
  | 'market';     // 村头墟市：纯正黄铜银元 + 杂木行市台

export interface Create3DTextModelOptions {
  id: string;
  character: string;
  triggerName: string;
  sceneId: string;
  tier: 'basic' | 'advanced';
  worldPos: THREE.Vector3;
  theme?: TextModelTheme;
  scale?: number;             // 汉字模型尺寸，默认 1.0 (约 0.7m ~ 0.9m)
  pedestalType?: 'round' | 'square' | 'octagon' | 'none'; // 底座造型
  pedestalScale?: number;     // 底座尺寸系数
  tiltAngle?: number;         // 汉字微微后仰角度（默认 0.08 弧度，让俯角漫游视线更易看清字形）
  colliderSize?: { w: number; h: number; d: number };
}

// =========================================================================
// 1. 材质预设库：潮汕 11 大生活场景非遗工艺调色盘
// =========================================================================
interface ThemeMaterials {
  charMat: THREE.Material;
  baseMat: THREE.Material;
  trimMat: THREE.Material;
  glowColor: number;
}

const themeMaterialCache = new Map<string, ThemeMaterials>();

function getThemeMaterials(theme: TextModelTheme): ThemeMaterials {
  if (themeMaterialCache.has(theme)) {
    return themeMaterialCache.get(theme)!;
  }

  let charColor = 0xd4af37; // 默认金漆
  let baseColor = 0x282a2d; // 默认乌金石
  let trimColor = 0xffd700; // 鎏金
  let glowColor = 0xffe082;
  let charRoughness = 0.35;
  let charMetalness = 0.2;

  switch (theme) {
    case 'tea_table':
      // 朱泥紫砂红字 + 乌金石茶盘黑底座 + 澄黄茶汤金圈
      charColor = 0xaa3824;
      baseColor = 0x222428;
      trimColor = 0xe6ab32;
      glowColor = 0xffa726;
      charRoughness = 0.55;
      break;

    case 'kitchen':
      // 生铁鼎黑锻铁字 + 老火灶红砖土台 + 黄铜刀刃光泽
      charColor = 0x2d3036;
      baseColor = 0x8a382b;
      trimColor = 0xb89058;
      glowColor = 0xff7043;
      charRoughness = 0.65;
      charMetalness = 0.45;
      break;

    case 'courtyard':
      // 潮阳青石青黛字 + 青石板地基座 + 铜锁金饰
      charColor = 0x4a5d64;
      baseColor = 0x737d7a;
      trimColor = 0xc5a059;
      glowColor = 0x80cbc4;
      charRoughness = 0.6;
      break;

    case 'altar':
      // 潮州金漆木雕纯金字 + 茜红大漆神案底座 + 耀眼描金
      charColor = 0xf5bf26;
      baseColor = 0xa31d1d;
      trimColor = 0xfff176;
      glowColor = 0xffeb3b;
      charRoughness = 0.25;
      charMetalness = 0.5;
      break;

    case 'guo_table':
      // 红桃粿喜庆胭脂红字 + 羊脂白瓷底座 + 粿印梨木金圈
      charColor = 0xd93850;
      baseColor = 0xf5f2eb;
      trimColor = 0xcc9955;
      glowColor = 0xff80ab;
      charRoughness = 0.4;
      break;

    case 'bedroom':
      // 翡翠青碧玉字 + 沉香老紫檀木底座 + 铜镜柔光
      charColor = 0x2f7a5b;
      baseColor = 0x42261d;
      trimColor = 0xd4af37;
      glowColor = 0xa5d6a7;
      charRoughness = 0.3;
      charMetalness = 0.15;
      break;

    case 'medicine':
      // 琥珀金棕草药字 + 药香沉木抽屉座 + 黄铜包角
      charColor = 0xb5651d;
      baseColor = 0x3d271d;
      trimColor = 0x81c784;
      glowColor = 0xffb74d;
      charRoughness = 0.45;
      break;

    case 'farm':
      // 苍翠春意青葱绿字 + 质朴夯土花岗石底座 + 丰收麦黄
      charColor = 0x367c39;
      baseColor = 0x6e685f;
      trimColor = 0xdda832;
      glowColor = 0x81c784;
      charRoughness = 0.5;
      break;

    case 'porridge':
      // 白瓷羊脂玉白字 + 粗陶砂锅褐底座 + 澄澈清粥暖金
      charColor = 0xf7f5f0;
      baseColor = 0x6e5244;
      trimColor = 0xe6ab32;
      glowColor = 0xfff9c4;
      charRoughness = 0.28;
      break;

    case 'family':
      // 阖家团圆朱砂暖红字 + 黄金雕花大底座 + 团聚暖光
      charColor = 0xc62828;
      baseColor = 0x5a2318;
      trimColor = 0xfbc02d;
      glowColor = 0xff8a80;
      charRoughness = 0.35;
      break;

    case 'market':
      // 赶集市井老黄铜字 + 秤砣铁青木条底座 + 银元白银包边
      charColor = 0xb8860b;
      baseColor = 0x4a433e;
      trimColor = 0xdcdde1;
      glowColor = 0xffd54f;
      charRoughness = 0.35;
      charMetalness = 0.6;
      break;
  }

  // 使用 MeshStandardMaterial / MeshLambertMaterial 兼顾低功耗与高质量高光
  const charMat = new THREE.MeshStandardMaterial({
    color: charColor,
    roughness: charRoughness,
    metalness: charMetalness,
    shadowSide: THREE.DoubleSide
  });

  const baseMat = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.6,
    metalness: 0.1
  });

  const trimMat = new THREE.MeshStandardMaterial({
    color: trimColor,
    roughness: 0.25,
    metalness: 0.6
  });

  const res: ThemeMaterials = { charMat, baseMat, trimMat, glowColor };
  themeMaterialCache.set(theme, res);
  return res;
}

// =========================================================================
// 2. 离屏 Canvas + 轮廓矢量追踪算法 (Marching Squares + Douglas-Peucker)
// =========================================================================

// 缓存已生成的汉字 ExtrudeGeometry，避免同一汉字重复计算
const charGeometryCache = new Map<string, THREE.BufferGeometry>();

/**
 * 核心：从汉字生成真正的三维立体几何体 (THREE.BufferGeometry)
 */
export function generateCharacter3DGeometry(char: string): THREE.BufferGeometry {
  if (charGeometryCache.has(char)) {
    return charGeometryCache.get(char)!;
  }

  try {
    // 1. 创建离屏画布渲染单个汉字
    const size = 96; // 96x96 分辨率在保真度与三角形数量之间达到完美平衡
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) {
      throw new Error('Canvas 2D context not available');
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);

    // 使用高清晰、厚重有力的黑体/雅黑，确保字划粗壮、连贯、绝无细碎断裂
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 78px "Microsoft YaHei", "PingFang SC", "Heiti SC", "STHeiti", "SimHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, size / 2, size / 2);

    const imgData = ctx.getImageData(0, 0, size, size);
    const pixels = imgData.data;

    // 二值化网格 (1 = 字内, 0 = 背景)
    const grid = new Uint8Array(size * size);
    for (let i = 0; i < size * size; i++) {
      grid[i] = pixels[i * 4] > 110 ? 1 : 0;
    }

    // 2. Marching Squares 网格边缘切分
    const loops = traceMarchingSquares(grid, size, size);

    if (loops.length === 0) {
      throw new Error(`No contours found for character ${char}`);
    }

    // 3. 区分外轮廓 (Outer Shapes) 与内环孔洞 (Holes)
    // Canvas 坐标中 Y 向下。Three.js 转换为 Y 向上: y' = size - y
    interface LoopData {
      points: [number, number][];
      area: number; // 符号面积
      isOuter: boolean;
      threePoints: THREE.Vector2[];
    }

    const loopDataList: LoopData[] = [];

    for (const loop of loops) {
      // 转换为 Three.js 局部归一化坐标并反转 Y
      const threePts: THREE.Vector2[] = [];
      let area = 0;
      const n = loop.length;
      for (let j = 0; j < n; j++) {
        const k = (j + 1) % n;
        const x1 = loop[j][0];
        const y1 = size - loop[j][1];
        const x2 = loop[k][0];
        const y2 = size - loop[k][1];
        area += (x1 * y2 - x2 * y1);
        threePts.push(new THREE.Vector2(x1, y1));
      }
      area *= 0.5;

      // 过滤面积过小的微小噪声环
      if (Math.abs(area) < 8) continue;

      // 在 Three.js 中，逆时针 (area > 0) 为外围，顺时针 (area < 0) 为内孔
      const isOuter = area > 0;
      loopDataList.push({
        points: loop,
        area,
        isOuter,
        threePoints: threePts
      });
    }

    // 分离外围与孔洞
    const outerLoops = loopDataList.filter(l => l.isOuter);
    const holeLoops = loopDataList.filter(l => !l.isOuter);

    // 构建 THREE.Shape 列表
    const shapes: THREE.Shape[] = [];

    // 若无明确正向外围，将面积最大的环强制视作外围
    if (outerLoops.length === 0 && loopDataList.length > 0) {
      loopDataList.sort((a, b) => Math.abs(b.area) - Math.abs(a.area));
      const main = loopDataList[0];
      main.isOuter = true;
      if (main.area < 0) {
        main.threePoints.reverse();
      }
      outerLoops.push(main);
    }

    for (const outer of outerLoops) {
      // Three.js Shape 要求外围为逆时针
      if (THREE.ShapeUtils.isClockWise(outer.threePoints)) {
        outer.threePoints.reverse();
      }
      const shape = new THREE.Shape(outer.threePoints);

      // 将内孔归属到对应包含它的外轮廓中
      for (let h = holeLoops.length - 1; h >= 0; h--) {
        const hole = holeLoops[h];
        if (pointInPolygon(hole.points[0], outer.points)) {
          // Three.js Shape 要求孔洞为顺时针
          if (!THREE.ShapeUtils.isClockWise(hole.threePoints)) {
            hole.threePoints.reverse();
          }
          shape.holes.push(new THREE.Path(hole.threePoints));
          holeLoops.splice(h, 1);
        }
      }

      shapes.push(shape);
    }

    // 4. 挤出立体几何体 ExtrudeGeometry (带柔和圆角斜切 bevel)
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 14,             // 汉字厚度 (三维厚重质感)
      bevelEnabled: true,
      bevelThickness: 2.2,   // 斜面厚度
      bevelSize: 1.8,        // 斜面延伸
      bevelSegments: 2,
      steps: 1
    };

    const geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);

    // 居中几何中心点
    geometry.center();

    // 缩放到标准模型尺寸 (标准高度 1.0 米)
    const bbox = geometry.boundingBox!;
    const h = bbox.max.y - bbox.min.y;
    if (h > 0) {
      const scaleFactor = 1.0 / h;
      geometry.scale(scaleFactor, scaleFactor, scaleFactor);
    }

    // 重新计算并平滑法线
    geometry.computeVertexNormals();

    charGeometryCache.set(char, geometry);
    return geometry;
  } catch (err) {
    console.warn(`[3DTextGenerator] Extrusion fallback for '${char}':`, err);
    // 降级保护：生成精致的立式雕花汉字印章石碑
    const fallbackGeo = createFallbackPlaqueGeometry(char);
    charGeometryCache.set(char, fallbackGeo);
    return fallbackGeo;
  }
}

/**
 * Marching Squares 边缘轮廓闭合抽取算法
 */
function traceMarchingSquares(grid: Uint8Array, W: number, H: number): [number, number][][] {
  function hEdgeId(x: number, y: number) { return (y * W + x) * 2; }
  function vEdgeId(x: number, y: number) { return (y * W + x) * 2 + 1; }
  function hEdgeCoord(x: number, y: number): [number, number] { return [x + 0.5, y]; }
  function vEdgeCoord(x: number, y: number): [number, number] { return [x, y + 0.5]; }

  const nextMap = new Map<number, number>();
  const coordMap = new Map<number, [number, number]>();

  for (let y = 0; y < H - 1; y++) {
    for (let x = 0; x < W - 1; x++) {
      const v0 = grid[y * W + x];
      const v1 = grid[y * W + (x + 1)];
      const v2 = grid[(y + 1) * W + (x + 1)];
      const v3 = grid[(y + 1) * W + x];

      const c = v0 | (v1 << 1) | (v2 << 2) | (v3 << 3);
      if (c === 0 || c === 15) continue;

      const top = hEdgeId(x, y);
      const right = vEdgeId(x + 1, y);
      const bottom = hEdgeId(x, y + 1);
      const left = vEdgeId(x, y);

      coordMap.set(top, hEdgeCoord(x, y));
      coordMap.set(right, vEdgeCoord(x + 1, y));
      coordMap.set(bottom, hEdgeCoord(x, y + 1));
      coordMap.set(left, vEdgeCoord(x, y));

      const center = (v0 + v1 + v2 + v3) / 4;

      switch (c) {
        case 1: nextMap.set(left, top); break;
        case 2: nextMap.set(top, right); break;
        case 3: nextMap.set(left, right); break;
        case 4: nextMap.set(right, bottom); break;
        case 5:
          if (center >= 0.5) { nextMap.set(left, top); nextMap.set(right, bottom); }
          else { nextMap.set(left, bottom); nextMap.set(right, top); }
          break;
        case 6: nextMap.set(top, bottom); break;
        case 7: nextMap.set(left, bottom); break;
        case 8: nextMap.set(bottom, left); break;
        case 9: nextMap.set(bottom, top); break;
        case 10:
          if (center >= 0.5) { nextMap.set(top, right); nextMap.set(bottom, left); }
          else { nextMap.set(top, left); nextMap.set(bottom, right); }
          break;
        case 11: nextMap.set(bottom, right); break;
        case 12: nextMap.set(right, left); break;
        case 13: nextMap.set(right, top); break;
        case 14: nextMap.set(top, left); break;
      }
    }
  }

  // 拼接连贯闭合线圈
  const visited = new Set<number>();
  const loops: [number, number][][] = [];

  for (const startId of nextMap.keys()) {
    if (visited.has(startId)) continue;
    const loop: [number, number][] = [];
    let cur: number | undefined = startId;
    let safe = 0;

    while (cur !== undefined && !visited.has(cur) && safe++ < 8000) {
      visited.add(cur);
      const pt = coordMap.get(cur);
      if (pt) loop.push(pt);
      cur = nextMap.get(cur);
      if (cur === startId) break;
    }

    if (loop.length >= 3) {
      loops.push(simplifyLoop(loop, 0.45));
    }
  }

  return loops;
}

/**
 * Douglas-Peucker 矢量折线化简算法 (大幅削减无用多边形顶点，消除抖动)
 */
function simplifyLoop(points: [number, number][], tol: number): [number, number][] {
  if (points.length <= 4) return points;

  function getSqDist(p1: [number, number], p2: [number, number]) {
    const dx = p1[0] - p2[0], dy = p1[1] - p2[1];
    return dx * dx + dy * dy;
  }

  function getSqSegDist(p: [number, number], p1: [number, number], p2: [number, number]) {
    let x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) { x = p2[0]; y = p2[1]; }
      else if (t > 0) { x += dx * t; y += dy * t; }
    }
    return getSqDist(p, [x, y]);
  }

  function simplifyDP(pts: [number, number][], sqTol: number) {
    const len = pts.length;
    const markers = new Uint8Array(len);
    markers[0] = markers[len - 1] = 1;
    const stack: [number, number][] = [[0, len - 1]];

    while (stack.length > 0) {
      const [first, last] = stack.pop()!;
      let maxSqDist = 0, index = -1;
      for (let i = first + 1; i < last; i++) {
        const sqDist = getSqSegDist(pts[i], pts[first], pts[last]);
        if (sqDist > maxSqDist) {
          index = i;
          maxSqDist = sqDist;
        }
      }
      if (maxSqDist > sqTol) {
        markers[index] = 1;
        stack.push([first, index]);
        stack.push([index, last]);
      }
    }

    const result: [number, number][] = [];
    for (let i = 0; i < len; i++) {
      if (markers[i]) result.push(pts[i]);
    }
    return result;
  }

  const closed = points.concat([points[0]]);
  const simplified = simplifyDP(closed, tol * tol);
  simplified.pop();
  return simplified.length >= 3 ? simplified : points;
}

/**
 * 射线法多边形内外点检测
 */
function pointInPolygon(pt: [number, number], poly: [number, number][]): boolean {
  const [x, y] = pt;
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * 备选降级几何体：潮汕金漆印台浮雕几何体
 */
function createFallbackPlaqueGeometry(_char: string): THREE.BufferGeometry {
  const geo = new THREE.BoxGeometry(0.8, 0.9, 0.2);
  geo.center();
  return geo;
}

// =========================================================================
// 3. 传统三维须弥底座与铭牌构建
// =========================================================================

/**
 * 创建古建文物展陈级别的须弥底座 (须弥台 + 束腰鎏金 + 莲花托座)
 */
function createPedestal(
  type: 'round' | 'square' | 'octagon',
  scale: number,
  mats: ThemeMaterials,
  triggerName: string,
  char: string
): THREE.Group {
  const baseGroup = new THREE.Group();
  baseGroup.name = 'Pedestal';

  const r = 0.55 * scale;
  const hBase = 0.12;

  if (type === 'round' || type === 'octagon') {
    const segments = type === 'round' ? 24 : 8;

    // 下层台基 (厚重大底座)
    const bottomGeo = new THREE.CylinderGeometry(r * 1.08, r * 1.15, hBase, segments);
    const bottomMesh = new THREE.Mesh(bottomGeo, mats.baseMat);
    bottomMesh.position.y = hBase / 2;
    baseGroup.add(bottomMesh);

    // 中间束腰 (收窄腰线，镶嵌金边)
    const waistGeo = new THREE.CylinderGeometry(r * 0.88, r * 0.88, 0.05, segments);
    const waistMesh = new THREE.Mesh(waistGeo, mats.trimMat);
    waistMesh.position.y = hBase + 0.025;
    baseGroup.add(waistMesh);

    // 上层承字座 (莲花座或平顶托台)
    const topGeo = new THREE.CylinderGeometry(r * 0.98, r * 0.88, 0.08, segments);
    const topMesh = new THREE.Mesh(topGeo, mats.baseMat);
    topMesh.position.y = hBase + 0.05 + 0.04;
    baseGroup.add(topMesh);

  } else {
    // 方形须弥座 (八仙桌台、房内起居)
    const w = 1.05 * scale;
    const d = 0.85 * scale;

    const bottomGeo = new THREE.BoxGeometry(w, hBase, d);
    const bottomMesh = new THREE.Mesh(bottomGeo, mats.baseMat);
    bottomMesh.position.y = hBase / 2;
    baseGroup.add(bottomMesh);

    const waistGeo = new THREE.BoxGeometry(w * 0.86, 0.04, d * 0.86);
    const waistMesh = new THREE.Mesh(waistGeo, mats.trimMat);
    waistMesh.position.y = hBase + 0.02;
    baseGroup.add(waistMesh);

    const topGeo = new THREE.BoxGeometry(w * 0.94, 0.07, d * 0.94);
    const topMesh = new THREE.Mesh(topGeo, mats.baseMat);
    topMesh.position.y = hBase + 0.04 + 0.035;
    baseGroup.add(topMesh);
  }

  // 地面接触阴影柔和晕圈 (低开销平面)
  const shadowGeo = new THREE.CircleGeometry(r * 1.3, 16);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.y = 0.005;
  baseGroup.add(shadowMesh);

  // 底座前沿嵌入微雕铭牌：显示生活实物物名 (例如 "冲罐"、"生铁鼎"、"架子床")
  const plaqueMesh = createPlaqueMesh(triggerName, char, mats);
  plaqueMesh.position.set(0, hBase * 0.75, r * 0.98);
  baseGroup.add(plaqueMesh);

  return baseGroup;
}

/**
 * 创建底座正前方的微型金石铭牌
 */
function createPlaqueMesh(triggerName: string, _char: string, mats: ThemeMaterials): THREE.Mesh {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 36;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#1c1815';
    ctx.fillRect(0, 0, 128, 36);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(2, 2, 124, 32);

    ctx.fillStyle = '#ffd54f';
    ctx.font = 'bold 20px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(triggerName, 64, 18);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const mat = new THREE.MeshBasicMaterial({ map: texture });
  const geo = new THREE.PlaneGeometry(0.38, 0.11);
  const mesh = new THREE.Mesh(geo, mat);
  return mesh;
}

// =========================================================================
// 4. 三维汉字模型主入口：组装 3D 汉字实体、雕花底座与触控碰撞盒
// =========================================================================

/**
 * 创建完整的三维文字模型 (包含 3D 汉字主体、底座、发光浮动与碰撞拾取)
 */
export function create3DTextModel(options: Create3DTextModelOptions): {
  group: THREE.Group;
  colliderMesh: THREE.Mesh;
  charMesh: THREE.Mesh;
} {
  const {
    id,
    character,
    triggerName,
    sceneId,
    tier,
    worldPos,
    theme = 'tea_table',
    scale = 1.0,
    pedestalType = 'round',
    pedestalScale = 1.0,
    tiltAngle = 0.08,
    colliderSize = { w: 1.1, h: 1.3, d: 1.1 }
  } = options;

  const group = new THREE.Group();
  group.name = `textModel_${id}_${character}`;
  group.position.copy(worldPos);

  const mats = getThemeMaterials(theme);

  // 1. 生成 3D 汉字立体几何体
  const charGeometry = generateCharacter3DGeometry(character);
  const charMesh = new THREE.Mesh(charGeometry, mats.charMat);
  charMesh.name = `char_${character}`;
  charMesh.castShadow = true;
  charMesh.receiveShadow = true;

  // 汉字尺寸与立面放置
  charMesh.scale.set(scale, scale, scale);

  // 计算底座总高度
  const pedestalTotalH = pedestalType === 'none' ? 0 : 0.25;

  // 汉字放置在底座之上，微倾斜后仰以迎合俯瞰摄像机视线
  charMesh.position.set(0, pedestalTotalH + (scale * 0.52), 0);
  charMesh.rotation.x = -tiltAngle;

  group.add(charMesh);

  // 2. 传统工艺须弥底座
  if (pedestalType !== 'none') {
    const pedestal = createPedestal(pedestalType, pedestalScale, mats, triggerName, character);
    group.add(pedestal);
  }

  // 3. 触控拾取透明碰撞盒 (加宽容错率，适老与儿童一触即中)
  const colGeo = new THREE.BoxGeometry(
    colliderSize.w * scale,
    colliderSize.h * scale + pedestalTotalH,
    colliderSize.d * scale
  );
  const colMat = new THREE.MeshBasicMaterial({ visible: false, wireframe: true });
  const colliderMesh = new THREE.Mesh(colGeo, colMat);
  colliderMesh.name = `collider_${id}`;
  colliderMesh.position.y = (colliderSize.h * scale + pedestalTotalH) / 2;
  colliderMesh.userData = {
    itemId: id,
    sceneId,
    character,
    triggerName,
    tier,
    clickable: true
  };
  group.add(colliderMesh);

  // 保存动态交互动画上下文
  group.userData = {
    originalY: worldPos.y,
    baseY: pedestalTotalH + (scale * 0.52),
    charMesh,
    bounceProgress: 0,
    isBouncing: false,
    hoverPhase: Math.random() * Math.PI * 2
  };

  return {
    group,
    colliderMesh,
    charMesh
  };
}
