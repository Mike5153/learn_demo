<template>
  <div class="chaozhou-house-3d-scene" ref="sceneContainerRef">
    <!-- WebGL 画布 -->
    <canvas 
      ref="canvasRef" 
      class="webgl-canvas"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    ></canvas>

    <!-- ================= 顶部右侧梯次切换栏 (与左侧全局场景选择器完全对称且零重叠) ================= -->
    <div class="tier-pill-group" v-if="currentMode !== 'overview'">
      <button 
        class="tier-btn"
        :class="{ 'active': currentTier === 'basic' }"
        @click="setTier('basic')"
      >
        🌿 基础物事 ({{ currentZoneItemsCount.basic }}字)
      </button>
      <button 
        class="tier-btn"
        :class="{ 'active': currentTier === 'advanced' }"
        @click="setTier('advanced')"
      >
        ✨ 进阶拓展 ({{ currentZoneItemsCount.advanced }}字)
      </button>
    </div>

    <!-- 顶部右侧鸟瞰全景状态标签 -->
    <div class="overview-status-pill" v-else>
      <span class="status-icon">🏮</span>
      <span class="status-text">下山虎大院 · 144生活字</span>
    </div>

    <!-- ================= 3D 物品悬浮大字标牌 (精准投射在物体上方，适老触碰) ================= -->
    <div class="floating-item-badges" v-if="currentMode !== 'overview'">
      <div
        v-for="item in visibleProjectedItems"
        :key="item.id"
        class="projected-badge-wrapper"
        :style="{
          transform: `translate3d(${item.screenPosition.x}px, ${item.screenPosition.y}px, 0)`
        }"
        @touchstart.stop="onItemClick(item)"
        @mousedown.stop="onItemClick(item)"
      >
        <div class="badge-halo-ring"></div>
        <div class="badge-char-circle">
          {{ item.character }}
        </div>
        <div class="badge-name-pill">
          {{ item.triggerName }}
        </div>
      </div>
    </div>

    <!-- ================= 底部 8 大空间居室快速导览底栏 (零遮挡、大触控区、横向平滑滚动) ================= -->
    <div class="house-nav-dock">
      <button 
        v-for="m in MODES"
        :key="m.id"
        class="room-dock-btn"
        :class="{ 'active': currentMode === m.id }"
        @click="switchMode(m.id)"
      >
        <span class="dock-icon">{{ m.icon }}</span>
        <span class="dock-label">{{ m.label }}</span>
        <span class="dock-count-badge" v-if="m.id !== 'overview'">{{ m.count }}字</span>
      </button>
    </div>

    <!-- 底部暖心指引提示 -->
    <div class="bottom-hint-panel">
      <template v-if="currentMode === 'overview'">
        🏡 点击底栏飞入各处居室 · 手指轻划可环顾老厝全景
      </template>
      <template v-else-if="currentMode === 'courtyard'">
        🚪 触碰大门、桌椅与墟市识字听音 · 右上角切换进阶拓展
      </template>
      <template v-else-if="currentMode === 'tea_table'">
        🍵 触碰工夫茶具识字听音 · 右上角切换进阶拓展
      </template>
      <template v-else-if="currentMode === 'altar'">
        🏮 触碰神龛香炉与堂前儿孙识字听音 · 右上角切换进阶拓展
      </template>
      <template v-else-if="currentMode === 'kitchen'">
        🍳 触碰生铁鼎与柴米油盐识字听音 · 右上角切换进阶拓展
      </template>
      <template v-else-if="currentMode === 'guo_table'">
        🥟 触碰红桃粿印与白粥杂咸识字听音 · 右上角切换进阶拓展
      </template>
      <template v-else-if="currentMode === 'bedroom'">
        🛏️ 触碰雕花大床与厝内药箱识字听音 · 右上角切换进阶拓展
      </template>
      <template v-else-if="currentMode === 'farm'">
        🌱 触碰菜垄、水牛与瓜架识字听音 · 右上角切换进阶拓展
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';
import type { HouseViewMode, Interactive3DItem } from './types';
import { CameraDirector } from './cameraDirector';
import { createHouseStructure } from './houseGeometry';
import { createInteractiveItems } from './itemMeshes';
import { audioService } from '../../../services/audioService';
import { house3DSceneConfig } from '../../../data/scenes/house3DScene';

const props = withDefaults(
  defineProps<{
    initialMode?: HouseViewMode;
    initialTier?: 'basic' | 'advanced';
    paused?: boolean;
    sceneConfig?: any;
  }>(),
  {
    initialMode: 'overview',
    initialTier: 'basic',
    paused: false,
    sceneConfig: null
  }
);

const emit = defineEmits<{
  (e: 'select-word', wordId: string, sceneId: string): void;
  (e: 'mode-change', mode: HouseViewMode): void;
}>();

// 导航模式配置：8 大空间与字数
const MODES: { id: HouseViewMode; label: string; icon: string; count: number }[] = [
  { id: 'overview', label: '老厝全景', icon: '🏡', count: 144 },
  { id: 'courtyard', label: '前院天井', icon: '🚪', count: 26 },
  { id: 'tea_table', label: '正厅茶席', icon: '🍵', count: 13 },
  { id: 'altar', label: '祖厅神台', icon: '🏮', count: 26 },
  { id: 'kitchen', label: '柴火灶房', icon: '🍳', count: 14 },
  { id: 'guo_table', label: '案台做粿', icon: '🥟', count: 26 },
  { id: 'bedroom', label: '西厢卧房', icon: '🛏️', count: 26 },
  { id: 'farm', label: '屋后田园', icon: '🌱', count: 13 },
];

// 容器与画布
const sceneContainerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

// 状态管理
const currentMode = ref<HouseViewMode>(props.initialMode);
const currentTier = ref<'basic' | 'advanced'>(props.initialTier);

// Three.js 核心引擎
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let cameraDirector: CameraDirector | null = null;
let raycaster: THREE.Raycaster | null = null;
let animationFrameId: number | null = null;

// 物件引用
let itemsByScene: Record<string, Interactive3DItem[]> = {};
let allItemMap = new Map<string, Interactive3DItem>();
let colliderMeshes: THREE.Mesh[] = [];

// 投影在屏幕上的可见物品列表 (用于 Vue 渲染高对比度实体圆圈)
const visibleProjectedItems = ref<Interactive3DItem[]>([]);

// 手势触控交互变量
let isDragging = false;
let startX = 0;
let startY = 0;
let hasMoved = false;

// 空间与场景物品映射
const getItemsForMode = (mode: HouseViewMode): Interactive3DItem[] => {
  switch (mode) {
    case 'courtyard':
      return [...(itemsByScene.courtyard || []), ...(itemsByScene.market || [])];
    case 'tea_table':
      return itemsByScene.tea_table || [];
    case 'altar':
      return [...(itemsByScene.altar || []), ...(itemsByScene.family || [])];
    case 'kitchen':
      return itemsByScene.kitchen || [];
    case 'guo_table':
      return [...(itemsByScene.guo_table || []), ...(itemsByScene.porridge || [])];
    case 'bedroom':
      return [...(itemsByScene.bedroom || []), ...(itemsByScene.medicine || [])];
    case 'farm':
      return itemsByScene.farm || [];
    default:
      return [];
  }
};

// 当前区域内基础与进阶字数统计
const currentZoneItemsCount = computed(() => {
  const items = getItemsForMode(currentMode.value);
  const basic = items.filter(it => it.tier === 'basic').length;
  const advanced = items.filter(it => it.tier === 'advanced').length;
  return { basic, advanced };
});

// 切换模式
const switchMode = (mode: HouseViewMode) => {
  if (currentMode.value === mode) return;
  currentMode.value = mode;
  audioService.playCupClink();
  updateItemVisibilities();

  if (cameraDirector) {
    cameraDirector.setMode(mode, true, () => {
      updateProjectedPositions();
    });
  }

  emit('mode-change', mode);
};

// 切换梯次 (基础 vs 进阶)
const setTier = (tier: 'basic' | 'advanced') => {
  if (currentTier.value === tier) return;
  currentTier.value = tier;
  audioService.playWaterDrip();
  updateItemVisibilities();
  updateProjectedPositions();
};

// 根据当前模式与梯次控制 3D 物品的显隐
const updateItemVisibilities = () => {
  const isOver = currentMode.value === 'overview';
  const activeItems = getItemsForMode(currentMode.value);

  allItemMap.forEach(item => {
    const isInActiveZone = activeItems.includes(item);
    if (isOver) {
      item.group.visible = item.tier === 'basic';
      item.colliderMesh.userData.clickable = false;
    } else {
      const shouldShow = isInActiveZone && item.tier === currentTier.value;
      item.group.visible = shouldShow;
      item.colliderMesh.userData.clickable = shouldShow;
    }
  });
};

// 点击物品处理
const onItemClick = (item: Interactive3DItem) => {
  // 触发 3D 汉字模型弹跳动画
  if (item.group.userData) {
    item.group.userData.isBouncing = true;
    item.group.userData.bounceProgress = 0;
  }

  const wordConfig = house3DSceneConfig.words[item.id];
  if (wordConfig?.teochewAudio) {
    audioService.playTeochewAudio(wordConfig.teochewAudio);
  } else {
    audioService.playCupClink();
  }

  emit('select-word', item.id, item.sceneId);
};

// 3D 场景坐标映射到 2D 视口像素坐标
const updateProjectedPositions = () => {
  if (!camera || !sceneContainerRef.value || currentMode.value === 'overview') {
    visibleProjectedItems.value = [];
    return;
  }

  const rect = sceneContainerRef.value.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  const currentItems = getItemsForMode(currentMode.value);
  const visibleList: Interactive3DItem[] = [];
  const tempVec = new THREE.Vector3();

  currentItems.forEach(item => {
    if (item.tier !== currentTier.value) return;

    // 取 3D 物品模型正上方作为徽章标牌锚点
    tempVec.copy(item.worldPosition);
    const tallProps = ['door', 'bed', 'clothes', 'clock', 'hall', 'sky', 'ox'];
    tempVec.y += tallProps.includes(item.id) ? 1.1 : 0.55;

    // 投射至归一化设备坐标 (NDC: -1 ~ 1)
    tempVec.project(camera!);

    // 只展示在视锥体前方的物品
    if (tempVec.z < 1) {
      const sx = ((tempVec.x + 1) * 0.5) * width;
      const sy = ((-tempVec.y + 1) * 0.5) * height;

      // 仅在视口安全范围内展示 (确保不与顶栏和底栏重叠)
      if (sx >= 40 && sx <= width - 40 && sy >= 75 && sy <= height - 105) {
        item.screenPosition.x = Math.round(sx);
        item.screenPosition.y = Math.round(sy);
        item.screenPosition.visible = true;
        visibleList.push(item);
      }
    }
  });

  visibleProjectedItems.value = visibleList;
};

// ================= Touch / Mouse 手势处理 =================
const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 1) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
    hasMoved = false;
  }
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging || e.touches.length !== 1) return;
  const dx = e.touches[0].clientX - startX;
  const dy = e.touches[0].clientY - startY;

  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    hasMoved = true;
    if (cameraDirector) {
      cameraDirector.handleDrag(dx, dy);
    }
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }
};

const handleTouchEnd = (e: TouchEvent) => {
  if (isDragging && !hasMoved && e.changedTouches.length === 1) {
    checkRaycastHit(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  }
  isDragging = false;
};

const handleMouseDown = (e: MouseEvent) => {
  startX = e.clientX;
  startY = e.clientY;
  isDragging = true;
  hasMoved = false;
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
    hasMoved = true;
    if (cameraDirector) {
      cameraDirector.handleDrag(dx, dy);
    }
    startX = e.clientX;
    startY = e.clientY;
  }
};

const handleMouseUp = (e: MouseEvent) => {
  if (isDragging && !hasMoved) {
    checkRaycastHit(e.clientX, e.clientY);
  }
  isDragging = false;
};

// 射线拾取直接点击 3D 物品
const checkRaycastHit = (clientX: number, clientY: number) => {
  if (!camera || !scene || !raycaster || !sceneContainerRef.value) return;

  const rect = sceneContainerRef.value.getBoundingClientRect();
  const mouse = new THREE.Vector2(
    ((clientX - rect.left) / rect.width) * 2 - 1,
    -((clientY - rect.top) / rect.height) * 2 + 1
  );

  raycaster.setFromCamera(mouse, camera);

  // 鸟瞰模式下点击 3D 空间飞入对应居室
  if (currentMode.value === 'overview') {
    const intersects = raycaster.intersectObjects(colliderMeshes, false);
    if (intersects.length > 0) {
      const hitMesh = intersects[0].object as THREE.Mesh;
      const sceneId = hitMesh.userData.sceneId;
      const modeMap: Record<string, HouseViewMode> = {
        tea_table: 'tea_table',
        kitchen: 'kitchen',
        courtyard: 'courtyard',
        market: 'courtyard',
        altar: 'altar',
        family: 'altar',
        guo_table: 'guo_table',
        porridge: 'guo_table',
        bedroom: 'bedroom',
        medicine: 'bedroom',
        farm: 'farm'
      };
      if (sceneId && modeMap[sceneId]) {
        switchMode(modeMap[sceneId]);
        return;
      }
    }

    if (mouse.y < -0.2) {
      switchMode('courtyard');
    } else if (mouse.x < -0.3) {
      switchMode('kitchen');
    } else if (mouse.x > 0.3) {
      switchMode('bedroom');
    } else if (mouse.y > 0.3) {
      switchMode('farm');
    } else {
      switchMode('tea_table');
    }
    return;
  }

  // 特写模式下拾取可点击物品
  const intersects = raycaster.intersectObjects(colliderMeshes, false);
  if (intersects.length > 0) {
    const hitMesh = intersects[0].object as THREE.Mesh;
    if (hitMesh.userData.clickable) {
      const itemId = hitMesh.userData.itemId;
      if (itemId && allItemMap.has(itemId)) {
        const item = allItemMap.get(itemId)!;
        onItemClick(item);
      }
    }
  }
};

// ================= WebGL 渲染与循环 =================
const initThreeScene = () => {
  if (!canvasRef.value || !sceneContainerRef.value) return;

  const rect = sceneContainerRef.value.getBoundingClientRect();
  const width = rect.width || 1024;
  const height = rect.height || 768;

  // 1. 创建场景 (古朴温润自然天光天幕)
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1ece4);

  // 2. 创建相机
  camera = new THREE.PerspectiveCamera(46, width / height, 0.5, 90);
  cameraDirector = new CameraDirector(camera);

  // 3. 创建渲染器 (专为 iPad mini 2 优化的 WebGL 1.0 参数)
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    powerPreference: 'high-performance',
    precision: 'mediump'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // 4. 自然环境柔光 (纯预设恒定光，无消耗)
  const ambientLight = new THREE.AmbientLight(0xfff6ea, 0.88);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffeed6, 0.65);
  sunLight.position.set(8, 16, 10);
  scene.add(sunLight);

  const skyLight = new THREE.HemisphereLight(0xffeedd, 0x90857a, 0.45);
  scene.add(skyLight);

  // 5. 构筑潮汕老厝大院结构
  const houseMesh = createHouseStructure();
  scene.add(houseMesh);

  // 6. 构筑全量 11 大生活实景交互物品集合
  const items = createInteractiveItems();
  itemsByScene = items.itemsByScene;
  allItemMap = items.allItemMap;
  colliderMeshes = items.interactiveMeshes;

  // 将全量道具添加到场景中
  allItemMap.forEach(it => scene!.add(it.group));

  raycaster = new THREE.Raycaster();

  // 初始化可见性
  updateItemVisibilities();
  if (currentMode.value !== 'overview') {
    cameraDirector.setMode(currentMode.value, false);
  }

  // 启动主渲染循环
  startRenderLoop();
};

let lastTime = 0;
const startRenderLoop = () => {
  const animate = (time: number) => {
    animationFrameId = requestAnimationFrame(animate);

    if (props.paused) return;

    // 相机运镜平滑插值
    if (cameraDirector) {
      cameraDirector.update();
    }

    lastTime = time;

    // 3D 物品模型微悬浮呼吸感与触控弹跳缓动
    const now = time * 0.0018;
    allItemMap.forEach(item => {
      if (item.group.visible && item.group.userData) {
        const u = item.group.userData;
        const targetMesh = u.modelMesh || u.charMesh;
        if (targetMesh) {
          // 微浮动呼吸感 (轻微上下浮沉)
          const hoverY = Math.sin(now * 1.8 + (u.hoverPhase || 0)) * 0.02;
          targetMesh.position.y = (u.baseY || 0) + hoverY;

          // 点击弹跳缓动衰减动画
          if (u.isBouncing) {
            u.bounceProgress += 0.055;
            if (u.bounceProgress < 1.0) {
              const bounceScale = 1.0 + Math.sin(u.bounceProgress * Math.PI) * 0.25;
              targetMesh.scale.set(bounceScale, bounceScale, bounceScale);
              targetMesh.rotation.y += 0.05;
            } else {
              u.isBouncing = false;
              u.bounceProgress = 0;
              targetMesh.scale.set(1.0, 1.0, 1.0);
              targetMesh.rotation.y = 0;
            }
          }
        }
      }
    });

    // 定期刷新屏幕徽章投射坐标
    updateProjectedPositions();

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  };

  animationFrameId = requestAnimationFrame(animate);
};

const stopRenderLoop = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

// 窗口尺寸自适应
const handleResize = () => {
  if (!sceneContainerRef.value || !camera || !renderer) return;
  const rect = sceneContainerRef.value.getBoundingClientRect();
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(rect.width, rect.height);
  updateProjectedPositions();
};

watch(() => props.paused, (isPaused) => {
  if (isPaused) {
    stopRenderLoop();
  } else {
    startRenderLoop();
  }
});

onMounted(() => {
  initThreeScene();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  stopRenderLoop();
  window.removeEventListener('resize', handleResize);

  // 深度释放显存，坚决保障 iOS 12 不泄露
  if (scene) {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      }
    });
  }

  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
    renderer = null;
  }
});
</script>

<style scoped>
.chaozhou-house-3d-scene {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  touch-action: none;
  background-color: #f1ece4;
}

.webgl-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* ================= 顶部右侧梯次切换胶囊 (与左侧全局场景栏对称，绝不重叠) ================= */
.tier-pill-group {
  position: absolute;
  top: 14px;
  right: 18px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(33, 21, 15, 0.78);
  border: 1.5px solid rgba(255, 215, 0, 0.35);
  border-radius: 22px;
  padding: 3px 6px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  z-index: 35;
  pointer-events: auto;
}

.tier-btn {
  border: none;
  background: transparent;
  padding: 6px 14px;
  border-radius: 18px;
  font-size: 13px;
  font-weight: 600;
  color: #D7CCC8;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 34px;
}

.tier-btn.active {
  background: linear-gradient(135deg, #FFB300 0%, #FF8F00 100%);
  color: #21150F;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(255, 179, 0, 0.4);
}

.overview-status-pill {
  position: absolute;
  top: 14px;
  right: 18px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(33, 21, 15, 0.75);
  border: 1.5px solid rgba(255, 215, 0, 0.35);
  border-radius: 20px;
  padding: 6px 14px;
  color: #FFE082;
  font-size: 13px;
  font-weight: 600;
  backdrop-filter: blur(8px);
  z-index: 35;
  pointer-events: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
}

.status-icon {
  font-size: 16px;
}

/* ================= 底部 8 大空间居室快速导览底栏 (大触控区、平滑滚动、绝不遮挡) ================= */
.house-nav-dock {
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(33, 21, 15, 0.88);
  border: 1.5px solid rgba(255, 215, 0, 0.35);
  border-radius: 28px;
  padding: 5px 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  max-width: 95vw;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  z-index: 30;
  pointer-events: auto;
}

.house-nav-dock::-webkit-scrollbar {
  display: none;
}

.room-dock-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 7px 13px;
  font-size: 14px;
  font-weight: 700;
  color: #D7CCC8;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: inherit;
  min-height: 40px;
}

.room-dock-btn:active {
  transform: scale(0.96);
}

.room-dock-btn.active {
  background: linear-gradient(135deg, #FFB300 0%, #FF8F00 100%);
  border-color: #FFE082;
  color: #21150F;
  box-shadow: 0 2px 10px rgba(255, 179, 0, 0.45);
}

.dock-icon {
  font-size: 16px;
}

.dock-label {
  font-size: 14px;
}

.dock-count-badge {
  font-size: 11px;
  background: rgba(0, 0, 0, 0.25);
  padding: 1px 6px;
  border-radius: 10px;
  color: inherit;
  font-weight: normal;
}

.room-dock-btn.active .dock-count-badge {
  background: rgba(0, 0, 0, 0.18);
  color: #21150F;
  font-weight: bold;
}

/* ================= 物品上方的 3D 投影徽章 (严格约束在视口安全区) ================= */
.floating-item-badges {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.projected-badge-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -26px; /* 居中对齐 */
  margin-top: -56px;
  pointer-events: auto;
  cursor: pointer;
  touch-action: manipulation;
}

.badge-halo-ring {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 193, 7, 0.35);
  animation: badgePulse 2s ease-in-out infinite;
  z-index: 1;
}

@keyframes badgePulse {
  0% { transform: scale(0.9); opacity: 0.8; }
  50% { transform: scale(1.35); opacity: 0.2; }
  100% { transform: scale(0.9); opacity: 0.8; }
}

.badge-char-circle {
  position: relative;
  z-index: 2;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff9e6 0%, #ffe082 100%);
  border: 2.5px solid #d48806;
  box-shadow: 0 4px 12px rgba(180, 115, 0, 0.32);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 900;
  color: #5c3b00;
  transition: transform 0.15s ease;
}

.projected-badge-wrapper:active .badge-char-circle {
  transform: scale(1.15);
}

.badge-name-pill {
  position: relative;
  z-index: 2;
  margin-top: 3px;
  background: rgba(46, 30, 15, 0.85);
  color: #fff9e6;
  font-size: 11px;
  font-weight: 600;
  padding: 1px 8px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}

/* ================= 底部提示文字栏 (居中置底，轻盈不遮挡) ================= */
.bottom-hint-panel {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(33, 21, 15, 0.72);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 16px;
  padding: 4px 16px;
  font-size: 12px;
  font-weight: 500;
  color: #FFE082;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 20;
  white-space: nowrap;
}
</style>
