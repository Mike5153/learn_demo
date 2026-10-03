<template>
  <div class="focus-view">
    <!-- 顶栏导航 -->
    <div class="top-nav-bar">
      <button 
        class="back-tray-btn" 
        @touchstart.stop="handleBack"
        @mousedown.stop="handleBack"
      >
        <span class="back-icon">🍵</span>
        <span>{{ backLabel || '返回' }}</span>
      </button>

      <!-- 本场景字快捷切换（一触即切，绝不串音；盲写未完成时隐去以杜绝透题） -->
      <div class="word-picker-bar" v-if="(!isBlindMode || isCompleted) && wordList && wordList.length > 0">
        <button
          v-for="w in wordList"
          :key="w.id"
          class="word-picker-btn"
          :class="{ 'active': currentWord.id === w.id, 'is-advanced': w.tier === 'advanced' }"
          @click="handleSelectWord(w.id)"
          :title="w.triggerName"
        >
          {{ w.character }}
        </button>
      </div>

      <!-- 盲写专属提示条（隐藏字表，让老人安心凭记忆默写） -->
      <div class="blind-testing-banner" v-else-if="isBlindMode && !isCompleted">
        <span class="banner-icon">🪶</span>
        <span>脱模盲写中 · 凭记忆书写本字</span>
      </div>

      <!-- 笔画速度调节：双档切换（默认慢3倍） -->
      <div class="speed-buttons">
        <button 
          class="speed-btn"
          :class="{ 'active': speedMultiplier === 3 }"
          @click="setSpeed(3)"
        >
          🐢 慢速
        </button>
        <button 
          class="speed-btn"
          :class="{ 'active': speedMultiplier === 1 }"
          @click="setSpeed(1)"
        >
          🐇 常速
        </button>
      </div>

      <!-- 快速盲写模式切换药丸 -->
      <button 
        class="blind-mode-pill-btn"
        :class="{ 'is-blind-active': isBlindMode }"
        @click="toggleBlindMode"
        :title="isBlindMode ? '当前为脱模盲写模式（已关闭指引）' : '点击切换为脱模盲写模式'"
      >
        <span>{{ isBlindMode ? '🪶 独立盲写中' : '✍️ 辅助描红中' }}</span>
      </button>

      <!-- 快速跳转温故测验 -->
      <button class="nav-quiz-btn" @click="handleOpenQuiz">
        <span>🍵 考考眼力</span>
      </button>
    </div>

    <!-- 核心主体区：左侧实物大图，右侧书法米字格大字手写 (左图右字 图文对照) -->
    <div class="literacy-body-container">
      <!-- ================= 左侧：生活实物超大图卡片 ================= -->
      <div class="item-showcase-card" @click="replayAudio">
        <div class="showcase-photo-container">
          <img 
            v-if="currentWord.imageUrl && !imageLoadFailed" 
            :src="currentWord.imageUrl" 
            :alt="isBlindMode && !isCompleted ? '生活实物' : currentWord.triggerName" 
            class="showcase-real-img"
            @error="handleImageError"
          />
          <div v-else class="showcase-emblem-fallback">
            {{ getItemIcon(currentWord.id) }}
          </div>
        </div>

        <div class="showcase-info-group">
          <!-- 物品生活名称（盲写模式下掩膜目标汉字，杜绝字形透题） -->
          <div class="showcase-item-title" :class="{ 'is-masked-title': isBlindMode && !isCompleted }">
            {{ displayTriggerName }}
          </div>

          <!-- 双语发音标牌 -->
          <div class="showcase-phonetics-pill">
            <span class="teochew-audio-tag">
              <span class="audio-speaker-icon">🔊</span>
              潮音: <strong class="ipa-highlight">{{ currentWord.teochewIPA }}</strong>
            </span>
            <span class="pinyin-tag">国语: {{ currentWord.pinyin }}</span>
          </div>

          <div class="showcase-tap-hint">
            👆 点大图听潮州正音
          </div>
        </div>
      </div>

      <!-- ================= 右侧：大字书法展示与手写交互区 ================= -->
      <div ref="characterContainerRef" class="character-container">
        <!-- 阶段状态提示 (大字标题 / 写第几笔 / 学会了) -->
        <div class="stroke-status-bar">
          <template v-if="teachingStep === 'jieyang'">
            <div class="word-focus-title">
              {{ currentWord.character }} <span class="ipa-text">{{ currentWord.teochewIPA }}</span>
            </div>
          </template>
          <template v-else-if="teachingStep === 'mandarin'">
            <div class="word-focus-title">
              {{ currentWord.character }} <span class="pinyin-text">{{ currentWord.pinyin }}</span>
            </div>
          </template>
          <template v-else-if="teachingStep === 'demo_strokes'">
            <div class="stroke-focus-title">
              第 {{ currentStrokeIndex + 1 }} 笔 · {{ currentWord.strokes[currentStrokeIndex]?.name || '演示' }}
            </div>
          </template>
          <template v-else-if="teachingStep === 'write_practice'">
            <div class="practice-focus-title" :class="{ 'has-hint': !!hintMessage, 'blind-mode-title': isBlindMode }">
              <span v-if="hintMessage">{{ hintMessage }}</span>
              <span v-else-if="isBlindMode">
                🪶 独立盲写：请写第 {{ currentWritingStrokeIndex + 1 }} 笔 (共 {{ currentWord.strokes.length }} 笔)
              </span>
              <span v-else>
                请写：第 {{ currentWritingStrokeIndex + 1 }} 笔 · {{ activeStroke?.name || '' }}
              </span>
            </div>
          </template>
          <template v-else-if="isCompleted">
            <div class="complete-focus-title" :class="{ 'blind-complete': isBlindMode }">
              {{ isBlindMode ? '🪶 盲写大成！神笔老秀才！' : '✨ 学会了！' }}
            </div>
          </template>
        </div>
      <div 
        ref="characterBoxRef"
        class="character-box"
        :style="{ width: `${boxSize}px`, height: `${boxSize}px` }"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend="handleTouchEnd"
        @touchcancel="handleTouchEnd"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
      >
        <!-- 动态笔划 SVG 图层 (标准 800×800 虚拟坐标系，纯净无底影) -->
        <svg class="stroke-svg-layer" viewBox="0 0 800 800">
          <!-- 米字格经典书法辅助虚线 (800x800) -->
          <g class="rice-grid-guides">
            <rect x="24" y="24" width="752" height="752" fill="none" stroke="rgba(255, 215, 0, 0.22)" stroke-width="2.5" rx="14" />
            <line x1="400" y1="24" x2="400" y2="776" stroke="rgba(255, 215, 0, 0.18)" stroke-width="2" stroke-dasharray="12 12" />
            <line x1="24" y1="400" x2="776" y2="400" stroke="rgba(255, 215, 0, 0.18)" stroke-width="2" stroke-dasharray="12 12" />
            <line x1="40" y1="40" x2="760" y2="760" stroke="rgba(255, 215, 0, 0.10)" stroke-width="1.5" stroke-dasharray="8 8" />
            <line x1="40" y1="760" x2="760" y2="40" stroke="rgba(255, 215, 0, 0.10)" stroke-width="1.5" stroke-dasharray="8 8" />
          </g>

          <g v-for="(stroke, idx) in currentWord.strokes" :key="idx">
            <!-- A. 演示模式：逐笔平滑演示实笔（仅渲染当前与已完成笔画，杜绝未写笔画提前出现原点） -->
            <path 
              v-if="teachingStep === 'demo_strokes' && idx <= currentStrokeIndex"
              :d="stroke.path" 
              class="svg-stroke-line"
              :class="{ 'stroke-active': currentStrokeIndex === idx }"
              :style="{
                strokeDasharray: `${stroke.length + 200} ${stroke.length * 3 + 1200}`,
                strokeDashoffset: (idx < currentStrokeIndex || (idx === currentStrokeIndex && strokeDrawnRatio >= 1)) ? 0 : (stroke.length + 200),
                transitionDuration: idx === currentStrokeIndex ? `${BASE_STROKE_TIME * speedMultiplier}ms` : '0ms'
              }"
            />

            <!-- B. 练字模式：已正确写完的笔画，吸附呈现纯金标准线 -->
            <path
              v-else-if="teachingStep === 'write_practice' && idx < currentWritingStrokeIndex"
              :d="stroke.path"
              class="svg-stroke-line stroke-completed"
              :style="{
                strokeDasharray: 'none',
                strokeDashoffset: 0
              }"
            />

            <!-- C. 完成模式：整字所有笔划以纯金完整呈现 -->
            <path
              v-else-if="teachingStep === 'completed'"
              :d="stroke.path"
              class="svg-stroke-line stroke-completed"
              :style="{
                strokeDasharray: 'none',
                strokeDashoffset: 0
              }"
            />
          </g>

          <!-- 练字模式指引层：当前目标笔画流动虚线（描红模式常驻；盲写模式仅在停顿7秒触发脚手架时淡入） -->
          <path
            v-if="teachingStep === 'write_practice' && activeStroke && (!isBlindMode || scaffoldingStage >= 2)"
            :d="activeStroke.path"
            class="svg-stroke-guide-flow"
            :class="{ 'highlight-prominent': showGuidanceHighlight, 'scaffold-reveal': isBlindMode && scaffoldingStage >= 2 }"
          />

          <!-- 练字模式指引层：起笔圆点发光信标（描红模式常驻；盲写模式仅在停顿4秒触发脚手架时淡入） -->
          <g 
            v-if="teachingStep === 'write_practice' && activeStrokeStartPoint && (!isBlindMode || scaffoldingStage >= 1)" 
            class="start-beacon-group"
            :class="{ 'scaffold-reveal': isBlindMode && scaffoldingStage >= 1 }"
          >
            <circle
              :cx="activeStrokeStartPoint.x"
              :cy="activeStrokeStartPoint.y"
              r="24"
              class="start-beacon-outer"
            />
            <circle
              :cx="activeStrokeStartPoint.x"
              :cy="activeStrokeStartPoint.y"
              r="10"
              class="start-beacon-inner"
            />
          </g>
        </svg>

        <!-- 用户实时笔墨画板 Canvas (平滑墨迹，纯净无阴影杂质) -->
        <canvas 
          ref="canvasRef" 
          class="brush-canvas"
          :class="{ 'canvas-fading': isFading }"
        ></canvas>

        <!-- 触碰与吸附水波涟漪特效 -->
        <div 
          v-for="ripple in ripples" 
          :key="ripple.id" 
          class="water-ripple"
          :style="{ left: `${ripple.x}px`, top: `${ripple.y}px` }"
        ></div>
      </div>

      <!-- 盲写专属勋章即时表彰浮层 -->
      <div v-if="unlockedBlindBadge" class="blind-badge-celebration">
        <span class="badge-celebrate-icon">{{ unlockedBlindBadge.icon }}</span>
        <div class="badge-celebrate-info">
          <div class="badge-celebrate-name">恭喜点亮【{{ unlockedBlindBadge.name }}】文化勋章！</div>
          <div class="badge-celebrate-desc">{{ unlockedBlindBadge.description }} · 独立脱模盲写通关</div>
        </div>
      </div>
    </div>
  </div>

    <!-- 底部控制栏：5 颗宽大药丸按钮，自主可控 -->
    <div class="bottom-bar">
      <div class="action-buttons-group">
        <button 
          class="action-btn teochew-btn" 
          :class="{ 'btn-active': teachingStep === 'jieyang' }"
          @click="playJieyangPhase"
        >
          🔊 潮音
        </button>
        <button 
          class="action-btn demo-btn"
          :class="{ 'btn-active': teachingStep === 'demo_strokes' }"
          @click="playDemoStrokes"
        >
          🔄 演示
        </button>
        <button 
          class="action-btn practice-btn"
          :class="{ 'btn-active': teachingStep === 'write_practice' && !isBlindMode }"
          @click="startWritePractice(false)"
        >
          ✍️ 描红
        </button>
        <button 
          class="action-btn blind-btn"
          :class="{ 'btn-active': teachingStep === 'write_practice' && isBlindMode }"
          @click="startWritePractice(true)"
          title="脱模盲写：考查肌肉记忆独立书写"
        >
          🪶 盲写
        </button>
        <button 
          class="action-btn mandarin-btn" 
          :class="{ 'btn-active': teachingStep === 'mandarin' }"
          @click="playMandarinPhase"
        >
          🗣️ 国语
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import type { WordItem, TeachingStep, StrokeItem } from '../../types/literacy';
import type { BadgeItem } from '../../types/quiz';
import { audioService } from '../../services/audioService';
import { progressStorage } from '../../services/progressStorage';
import { matchStroke, clientToSvg, parseSvgPathToPoints, type Point } from '../../services/strokeMatcher';

const props = withDefaults(
  defineProps<{
    currentWord: WordItem;
    wordList?: WordItem[];
    backLabel?: string;
    liquidType?: 'tea' | 'water' | 'soup';
  }>(),
  {
    wordList: () => [],
    backLabel: '返回',
    liquidType: 'tea'
  }
);

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'switch-word', wordId: string): void;
  (e: 'complete', wordId: string): void;
  (e: 'open-quiz'): void;
}>();

// 当前教学阶段：'jieyang' | 'mandarin' | 'demo_strokes' | 'write_practice' | 'completed'
const teachingStep = ref<TeachingStep>('jieyang');
const isCompleted = ref<boolean>(false);

// 方案 4：脱模独立盲写测评与智能渐进脚手架（Scaffolding）
const isBlindMode = ref<boolean>(false);
const scaffoldingStage = ref<number>(2); // 0: 纯盲写无虚线无圆点, 1: 停顿4秒起笔圆点显现, 2: 停顿7秒流动虚线淡入
const unlockedBlindBadge = ref<BadgeItem | null>(null);

let scaffoldTimer1: number | null = null;
let scaffoldTimer2: number | null = null;

// 演示速度（默认慢 3 倍）
const BASE_STROKE_TIME = 420;
const BASE_PAUSE_TIME = 160;
const speedMultiplier = ref<number>(3);

// 容器与正方形画布尺寸 (iOS 12 友好自适应)
const characterContainerRef = ref<HTMLDivElement | null>(null);
const characterBoxRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const boxSize = ref<number>(480);
let canvasCtx: CanvasRenderingContext2D | null = null;

// 笔画演示与练字状态
const currentStrokeIndex = ref<number>(-1);       // 演示模式当前笔画
const strokeDrawnRatio = ref<number>(0);          // 演示绘制进度
const currentWritingStrokeIndex = ref<number>(0); // 练字模式当前目标笔画索引
const hintMessage = ref<string>('');              // 适老引导提示文案
const showGuidanceHighlight = ref<boolean>(false);// 是否高亮引导虚线
const isFading = ref<boolean>(false);             // 未匹配成功时墨迹柔和消隐
const imageLoadFailed = ref<boolean>(false);      // 图片加载容灾

const handleImageError = () => {
  imageLoadFailed.value = true;
};

// 全场景实物文化拟物生动图标映射
const ITEM_ICONS: Record<string, string> = {
  // 厝内工夫 (tea_table)
  tea: '🍵', water: '💧', cup: '🍶', fire: '🔥', leaf: '🍃', sweet: '🫒', tray: '🪵',
  pot: '🫖', pour: '🌊', rinse: '🧼', aroma: '♨️', hot: '🔥', guest: '👥',
  // 灶下炊事 (kitchen)
  wok: '🍳', steam: '♨️', knife: '🔪', slice: '🪵', rice: '🍚', stirfry: '🥗', bowl: '🥣',
  wood: '🪵', pot_stove: '🍲', oil: '🫗', salt: '🧂', spatula: '🥄', boil: '🍲', soup: '🥣',
  // 大厅天井 (courtyard)
  door: '🚪', lock: '🔒', table: '🪵', chair: '🪑', broom: '🧹', clean: '✨',
  open: '👐', close: '🛡️', enter: '🚶', sit: '🍵', lamp: '🏮', clock: '🕰️', hall: '🏛️',
  // 房内起居 (bedroom)
  bed: '🛏️', quilt: '🧣', clothes: '👘', needle: '🪡', thread: '🧵', comb: '🪮',
  cloth: '🧶', scissors: '✂️', mend: '🪡', towel: '🧖', mirror: '🪞', shoes: '👞', peace: '🕊️',
  // 做粿案台 (guo_table)
  guo: '🥟', mold: '🪵', flour: '🌾', sugar: '🍬', red: '🔴', wrap: '🤲',
  bean: '🫘', skin: '🥟', steam_guo: '♨️', fry_guo: '🍳', sweet_taste: '🍯', peach_shape: '🍑', year_festival: '🧧',
  // 祖厅神台 (altar)
  incense: '🕯️', candle: '🕯️', worship: '🙏', fortune: '🧧', peaceful: '🕊️', tranquil: '🌿',
  god: '👑', flower: '🌸', fruit: '🍊', great: '🌟', lucky: '🍊', protect: '🛡️', longevity: '👴',
  // 清早食糜 (porridge)
  porridge_rice: '🥣', fish: '🐟', veggies: '🥬', egg: '🥚', meat: '🥩', warm: '♨️',
  eat: '🥢', full: '😋', salty: '🧂', soy_paste: '🫘', ginger: '🫚', spoon: '🥄', morning: '🌅',
  // 墟市采买 (market)
  buy: '🧺', sell: '🥬', scale: '⚖️', money: '💰', catty: '⚖️', yuan: '🪙',
  liang: '🏷️', much: '📦', little: '🤏', costly: '💎', cheap: '🏷️', change_money: '💵', city_market: '🏪',
  // 园头田埂 (farm)
  field: '🌾', ox: '🐂', grass: '🌿', plant_seed: '🌱', melon: '🥒', pick_fruit: '🧺',
  soil: '🪴', ground: '🏞️', irrigation: '💧', pour_water: '🪣', harvest: '🌽', sky: '⛅', spring: '🌸',
  // 厝内药箱 (medicine)
  med: '💊', day: '☀️', morning_med: '🌅', night_med: '🌙', pill: '⚪', take_dose: '🥛',
  eat_med: '💊', times_dose: '3️⃣', granule: '🔴', meal_time: '🍚', stop_med: '🛑', care_body: '❤️', body: '🧘',
  // 堂前儿孙 (family)
  grandson: '👦', child: '👧', grandfather: '👴', grandmother: '👵', home: '🏡', joy: '😄',
  father: '👨', mother: '👩', son: '👦', filial: '🍵', harmony: '🤝', bliss: '🎉', smooth: '🎋'
};

const getItemIcon = (id: string): string => {
  if (isBlindMode.value && !isCompleted.value) {
    return '🖼️';
  }
  return ITEM_ICONS[id] || '✨';
};

// 盲写模式下自动掩膜物品生活名称中的目标字，彻底杜绝字形泄露
const displayTriggerName = computed<string>(() => {
  if (!isBlindMode.value || isCompleted.value) {
    return props.currentWord.triggerName;
  }
  const char = props.currentWord.character;
  const name = props.currentWord.triggerName;
  if (name.includes(char)) {
    return name.replaceAll(char, '（ ❓ ）');
  }
  return `${name} · （ ❓ ）`;
});

// 当前目标笔画与起点
const activeStroke = computed<StrokeItem | null>(() => {
  if (!props.currentWord?.strokes) return null;
  return props.currentWord.strokes[currentWritingStrokeIndex.value] || null;
});

const activeStrokeStartPoint = computed<Point | null>(() => {
  if (!activeStroke.value) return null;
  const pts = parseSvgPathToPoints(activeStroke.value.path);
  return pts.length > 0 ? pts[0] : null;
});

// 手写轨迹采集点集
let isDrawing = false;
let userScreenPoints: Point[] = [];
let userSvgPoints: Point[] = [];

// ================= 全局异步进程与定时器管理（切字/切状态立即中断） =================
let sessionToken = 0;
const activeTimers: number[] = [];
let inactivityTimerId: number | null = null;
let fadeTimerId: number | null = null;

const safeTimeout = (callback: () => void, delayMs: number) => {
  const token = sessionToken;
  const timerId = window.setTimeout(() => {
    const idx = activeTimers.indexOf(timerId);
    if (idx !== -1) activeTimers.splice(idx, 1);

    if (token === sessionToken) {
      callback();
    }
  }, delayMs);
  activeTimers.push(timerId);
  return timerId;
};

const stopAllProcesses = () => {
  sessionToken++;
  activeTimers.forEach(id => clearTimeout(id));
  activeTimers.length = 0;

  if (inactivityTimerId) {
    clearTimeout(inactivityTimerId);
    inactivityTimerId = null;
  }
  if (fadeTimerId) {
    clearTimeout(fadeTimerId);
    fadeTimerId = null;
  }
  if (scaffoldTimer1) {
    clearTimeout(scaffoldTimer1);
    scaffoldTimer1 = null;
  }
  if (scaffoldTimer2) {
    clearTimeout(scaffoldTimer2);
    scaffoldTimer2 = null;
  }

  audioService.stopAllAudio();
  currentStrokeIndex.value = -1;
  strokeDrawnRatio.value = 0;
  isDrawing = false;
  isFading.value = false;
};

// 3秒无操作或判定偏离时触发柔和引导
const resetInactivityTimer = () => {
  if (inactivityTimerId) {
    clearTimeout(inactivityTimerId);
    inactivityTimerId = null;
  }

  showGuidanceHighlight.value = false;

  if (teachingStep.value === 'write_practice' && !isCompleted.value && !isBlindMode.value) {
    inactivityTimerId = window.setTimeout(() => {
      showGuidanceHighlight.value = true;
      if (!hintMessage.value) {
        hintMessage.value = '👆 顺着虚线划（从圆点起笔）';
      }
    }, 3000);
  }
};

// 方案 4：智能渐进脚手架（Scaffolding：盲写提笔停顿4秒浮现起点信标，停顿7秒淡入整笔虚线）
const resetScaffolding = () => {
  if (scaffoldTimer1) {
    clearTimeout(scaffoldTimer1);
    scaffoldTimer1 = null;
  }
  if (scaffoldTimer2) {
    clearTimeout(scaffoldTimer2);
    scaffoldTimer2 = null;
  }

  if (!isBlindMode.value) {
    scaffoldingStage.value = 2;
    resetInactivityTimer();
    return;
  }

  scaffoldingStage.value = 0;
  hintMessage.value = '';

  if (teachingStep.value === 'write_practice' && !isCompleted.value) {
    // 4 秒无操作：脚手架第 1 阶 —— 浮现起笔信标
    scaffoldTimer1 = window.setTimeout(() => {
      if (isBlindMode.value && teachingStep.value === 'write_practice' && !isCompleted.value && !isDrawing) {
        scaffoldingStage.value = 1;
        if (!hintMessage.value) {
          hintMessage.value = '💡 提示：从亮起点起笔';
        }
      }
    }, 4000);

    // 7 秒无操作：脚手架第 2 阶 —— 浮现整笔流动虚线，绝不让长辈卡壳受挫
    scaffoldTimer2 = window.setTimeout(() => {
      if (isBlindMode.value && teachingStep.value === 'write_practice' && !isCompleted.value && !isDrawing) {
        scaffoldingStage.value = 2;
        if (!hintMessage.value || hintMessage.value.includes('亮起点')) {
          hintMessage.value = '💡 提示：跟着流动虚线写';
        }
      }
    }, 7000);
  }
};

// 切换速度
const setSpeed = (mul: number) => {
  if (speedMultiplier.value === mul) return;
  speedMultiplier.value = mul;
  audioService.playCupClink();

  if (teachingStep.value === 'demo_strokes') {
    playDemoStrokes();
  }
};

// 切换字
const handleSelectWord = (wordId: string) => {
  if (wordId === props.currentWord.id) return;
  audioService.playCupClink();
  emit('switch-word', wordId);
};

// 点击实物大图重新播报潮州正音
const replayAudio = () => {
  audioService.playCupClink();
  if (props.currentWord?.teochewAudio) {
    audioService.playTeochewAudio(props.currentWord.teochewAudio);
  }
};

// 考考眼力
const handleOpenQuiz = () => {
  stopAllProcesses();
  audioService.playCupClink();
  emit('open-quiz');
};

// 返回
const handleBack = () => {
  stopAllProcesses();
  audioService.playWaterDrip();
  emit('back');
};

// 1. 默认发音：纯正潮汕母语原声 -> 自动衔接笔顺演示 -> 练字
const playJieyangPhase = () => {
  if (isBlindMode.value && !isCompleted.value) {
    // 盲写中重听潮音：仅播放音频发音提示，绝不打断盲写进度与泄露字形
    audioService.playCupClink();
    if (props.currentWord?.teochewAudio) {
      audioService.playTeochewAudio(props.currentWord.teochewAudio);
    }
    return;
  }

  stopAllProcesses();
  const currentSession = sessionToken;

  teachingStep.value = 'jieyang';
  currentStrokeIndex.value = -1;
  hintMessage.value = '';

  audioService.playTeochewAudio(props.currentWord.teochewAudio, () => {
    if (currentSession !== sessionToken) return;

    safeTimeout(() => {
      playDemoStrokes();
    }, 400);
  });
};

// 2. 普通话读音（极简报字）
const playMandarinPhase = () => {
  if (isBlindMode.value && !isCompleted.value) {
    // 盲写中播报国语：仅朗读拼音音节，绝不报汉字，绝不切出盲写界面
    audioService.playCupClink();
    audioService.speakMandarin(props.currentWord.pinyin);
    return;
  }

  stopAllProcesses();
  const currentSession = sessionToken;

  teachingStep.value = 'mandarin';
  currentStrokeIndex.value = -1;
  hintMessage.value = '';

  audioService.playCupClink();
  audioService.speakMandarin(`${props.currentWord.character}，${props.currentWord.pinyin}`, () => {
    if (currentSession !== sessionToken) return;
  });
};

// 3. 动态慢速笔顺演示（受控循环，可随时瞬时打断）
const playDemoStrokes = () => {
  stopAllProcesses();
  isBlindMode.value = false;
  const currentSession = sessionToken;

  teachingStep.value = 'demo_strokes';
  currentStrokeIndex.value = 0;
  strokeDrawnRatio.value = 0;
  hintMessage.value = '';

  const strokes = props.currentWord.strokes;
  const drawDuration = BASE_STROKE_TIME * speedMultiplier.value;
  const pauseDuration = BASE_PAUSE_TIME * speedMultiplier.value;

  const animateSingleStroke = (index: number) => {
    if (currentSession !== sessionToken) return;

    if (index >= strokes.length) {
      safeTimeout(() => {
        startWritePractice();
      }, 600);
      return;
    }

    currentStrokeIndex.value = index;
    strokeDrawnRatio.value = 0;
    audioService.playStrokeSound();

    // 40ms 确保初始 offset 渲染后平滑起笔生长
    safeTimeout(() => {
      if (currentSession !== sessionToken) return;
      strokeDrawnRatio.value = 1;

      // 笔画完整画完后停顿 pauseDuration 供长辈看清，随后进入下一笔
      safeTimeout(() => {
        if (currentSession !== sessionToken) return;
        animateSingleStroke(index + 1);
      }, drawDuration + pauseDuration);
    }, 40);
  };

  animateSingleStroke(0);
};

// 4. 进入手写练习模式（支持常规描红与独立脱模盲写）
const startWritePractice = (asBlind = false) => {
  stopAllProcesses();
  isBlindMode.value = asBlind;
  teachingStep.value = 'write_practice';
  currentWritingStrokeIndex.value = 0;
  isCompleted.value = false;
  hintMessage.value = '';
  showGuidanceHighlight.value = false;
  unlockedBlindBadge.value = null;
  
  clearCanvasImmediately();
  audioService.playCupClink();
  resetScaffolding();
};

const toggleBlindMode = () => {
  audioService.playCupClink();
  if (teachingStep.value !== 'write_practice') {
    startWritePractice(!isBlindMode.value);
  } else {
    isBlindMode.value = !isBlindMode.value;
    resetScaffolding();
  }
};

// 初始化画板 (考虑 DPR 与 iOS 12 性能)
const initCanvas = () => {
  const canvas = canvasRef.value;
  const box = characterBoxRef.value;
  if (!canvas || !box) return;

  const rect = box.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  canvasCtx = canvas.getContext('2d');
  if (canvasCtx) {
    canvasCtx.scale(dpr, dpr);
    canvasCtx.lineCap = 'round';
    canvasCtx.lineJoin = 'round';
  }
};

const updateBoxSize = () => {
  if (!characterContainerRef.value) return;
  const rect = characterContainerRef.value.getBoundingClientRect();
  const availableHeight = Math.max(200, rect.height - 56);
  const size = Math.floor(Math.min(rect.width * 0.94, availableHeight * 0.96));
  boxSize.value = Math.max(260, Math.min(size, 480));
  nextTick(() => {
    initCanvas();
  });
};

const clearCanvasImmediately = () => {
  if (canvasCtx && canvasRef.value) {
    canvasCtx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  }
  isFading.value = false;
};

const clearCanvasWithFade = () => {
  isFading.value = true;
  if (fadeTimerId) clearTimeout(fadeTimerId);
  fadeTimerId = window.setTimeout(() => {
    clearCanvasImmediately();
  }, 260);
};

// ================= 水波涟漪动效 =================
interface Ripple {
  id: number;
  x: number;
  y: number;
}
const ripples = ref<Ripple[]>([]);
let rippleCounter = 0;

const spawnRipple = (clientX: number, clientY: number) => {
  const box = characterBoxRef.value;
  if (!box) return;
  const rect = box.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  const id = ++rippleCounter;
  ripples.value.push({ id, x, y });

  safeTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== id);
  }, 750);
};

// ================= 手写触控与笔画比对逻辑 =================
const handlePointerDown = (clientX: number, clientY: number) => {
  // 若用户在演示模式中直接触碰屏幕，立即秒切练字模式，不耽误老人手感
  if (teachingStep.value !== 'write_practice' && !isCompleted.value) {
    startWritePractice(isBlindMode.value);
  }

  // 若已全部学会，再次触碰重新练字
  if (isCompleted.value) {
    startWritePractice(isBlindMode.value);
    return;
  }

  // 正在运笔，清除脚手架停顿计时器，避免打扰老人当前运笔
  if (scaffoldTimer1) { clearTimeout(scaffoldTimer1); scaffoldTimer1 = null; }
  if (scaffoldTimer2) { clearTimeout(scaffoldTimer2); scaffoldTimer2 = null; }
  if (inactivityTimerId) { clearTimeout(inactivityTimerId); inactivityTimerId = null; }

  const box = characterBoxRef.value;
  if (!box || !canvasCtx) return;

  const rect = box.getBoundingClientRect();
  isDrawing = true;

  if (isFading.value) {
    clearCanvasImmediately();
  }

  const screenPt = { x: clientX - rect.left, y: clientY - rect.top };
  const svgPt = clientToSvg(clientX, clientY, rect, 800, 800);

  userScreenPoints = [screenPt];
  userSvgPoints = [svgPt];

  // 绘制起笔墨点（纯净实体墨滴，无模糊阴影）
  canvasCtx.beginPath();
  canvasCtx.arc(screenPt.x, screenPt.y, 14, 0, Math.PI * 2);
  canvasCtx.fillStyle = '#FFE082';
  canvasCtx.fill();

  if (!isBlindMode.value) {
    resetInactivityTimer();
  }
};

const handlePointerMove = (clientX: number, clientY: number) => {
  if (!isDrawing || !canvasCtx || userScreenPoints.length === 0) return;

  const box = characterBoxRef.value;
  if (!box) return;
  const rect = box.getBoundingClientRect();

  const curScreen = { x: clientX - rect.left, y: clientY - rect.top };
  const prevScreen = userScreenPoints[userScreenPoints.length - 1];

  // 过滤微小抖动点，保持点列简洁
  const dist = Math.hypot(curScreen.x - prevScreen.x, curScreen.y - prevScreen.y);
  if (dist < 3.5) return;

  userScreenPoints.push(curScreen);
  userSvgPoints.push(clientToSvg(clientX, clientY, rect, 800, 800));

  // 实时平滑连线（纯金实体线条，无底影杂质）
  canvasCtx.lineWidth = 26;
  canvasCtx.lineCap = 'round';
  canvasCtx.lineJoin = 'round';
  canvasCtx.strokeStyle = '#FFE082';

  canvasCtx.beginPath();
  canvasCtx.moveTo(prevScreen.x, prevScreen.y);
  canvasCtx.lineTo(curScreen.x, curScreen.y);
  canvasCtx.stroke();
};

const handlePointerUp = (clientX?: number, clientY?: number) => {
  if (!isDrawing) return;
  isDrawing = false;

  const target = activeStroke.value;
  if (!target) return;

  // 单击或者点划太短
  if (userSvgPoints.length < 2) {
    clearCanvasWithFade();
    if (isBlindMode.value) {
      resetScaffolding();
    } else {
      resetInactivityTimer();
    }
    return;
  }

  // 调用适老化高容错比对器（及格线 55，大容差）
  const result = matchStroke(userSvgPoints, target.path, {
    startTolerance: 105,
    endTolerance: 120,
    minPassScore: 55
  });

  if (result.isMatch) {
    // 匹配成功：瞬间磁吸到位，纯金墨迹吸附
    clearCanvasImmediately();
    audioService.playStrokeSound();
    audioService.playCupClink();

    if (clientX !== undefined && clientY !== undefined) {
      spawnRipple(clientX, clientY);
    }

    hintMessage.value = '';
    currentWritingStrokeIndex.value++;

    // 检查是否全字写完
    if (currentWritingStrokeIndex.value >= props.currentWord.strokes.length) {
      teachingStep.value = 'completed';
      isCompleted.value = true;
      audioService.playSuccessChime();
      audioService.playCupClink();

      if (isBlindMode.value) {
        // 脱模盲写通关，记录精通成就并尝试点亮专属勋章
        const { newBadge } = progressStorage.recordBlindWriteSuccess(
          props.currentWord.id, 
          props.currentWord.character, 
          props.currentWord.id
        );
        if (newBadge) {
          unlockedBlindBadge.value = newBadge;
        }
      } else {
        progressStorage.recordWordLearned(props.currentWord.id, props.currentWord.character, props.currentWord.id);
      }
      emit('complete', props.currentWord.id);
    } else {
      resetScaffolding();
    }
  } else {
    // 匹配未通过：零报错音、无红叉，温和淡出墨迹并给予明确引导
    clearCanvasWithFade();
    if (isBlindMode.value) {
      // 盲写时若写错，降级脚手架：即刻浮现起点信标
      scaffoldingStage.value = 1;
      hintMessage.value = result.message || '试多一次，从亮起点起笔';
      if (scaffoldTimer2) clearTimeout(scaffoldTimer2);
      scaffoldTimer2 = window.setTimeout(() => {
        if (isBlindMode.value && teachingStep.value === 'write_practice' && !isCompleted.value && !isDrawing) {
          scaffoldingStage.value = 2;
          hintMessage.value = '💡 提示：跟着流动虚线写';
        }
      }, 4000);
    } else {
      hintMessage.value = result.message || '跟着亮起的笔划划';
      showGuidanceHighlight.value = true;
      resetInactivityTimer();
    }
  }
};

// 触屏事件响应
const handleTouchStart = (e: TouchEvent) => {
  const touch = e.touches[0];
  handlePointerDown(touch.clientX, touch.clientY);
};

const handleTouchMove = (e: TouchEvent) => {
  const touch = e.touches[0];
  handlePointerMove(touch.clientX, touch.clientY);
};

const handleTouchEnd = (e: TouchEvent) => {
  const touch = e.changedTouches?.[0];
  handlePointerUp(touch?.clientX, touch?.clientY);
};

// 鼠标事件响应
const handleMouseDown = (e: MouseEvent) => {
  handlePointerDown(e.clientX, e.clientY);
};

const handleMouseMove = (e: MouseEvent) => {
  handlePointerMove(e.clientX, e.clientY);
};

const handleMouseUp = (e: MouseEvent) => {
  handlePointerUp(e.clientX, e.clientY);
};

// 监听当前字变更（无论从内部还是外部传入，立即重置并播音）
watch(
  () => props.currentWord.id,
  () => {
    isBlindMode.value = false;
    isCompleted.value = false;
    imageLoadFailed.value = false;
    currentWritingStrokeIndex.value = 0;
    hintMessage.value = '';
    unlockedBlindBadge.value = null;
    ripples.value = [];
    clearCanvasImmediately();
    playJieyangPhase();
  }
);

onMounted(() => {
  updateBoxSize();
  window.addEventListener('resize', updateBoxSize);
  playJieyangPhase();
});

onUnmounted(() => {
  stopAllProcesses();
  window.removeEventListener('resize', updateBoxSize);
});
</script>

<style scoped>
.focus-view {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Yuanti SC", "YouYuan", "Hiragino Maru Gothic ProN", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.top-nav-bar {
  width: 96%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
}

.back-tray-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(124, 83, 53, 0.9);
  border: 2px solid #d4af37;
  border-radius: 16px;
  color: #FFE082;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.word-picker-bar {
  display: flex;
  gap: 5px;
  background: rgba(0, 0, 0, 0.4);
  padding: 3px 8px;
  border-radius: 16px;
  border: 1px solid rgba(255, 215, 0, 0.25);
  max-width: 520px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.word-picker-bar::-webkit-scrollbar {
  display: none;
}

.word-picker-btn {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(80, 53, 34, 0.8);
  border: 1.5px solid rgba(255, 215, 0, 0.3);
  color: #D7CCC8;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.word-picker-btn.is-advanced {
  border-color: rgba(255, 179, 0, 0.6);
  background: rgba(100, 60, 25, 0.85);
}

.word-picker-btn.active {
  background: #FFB300;
  color: #1a120e;
  border-color: #FFF8E1;
  transform: scale(1.12);
}

.speed-buttons {
  display: flex;
  gap: 6px;
}

.speed-btn {
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: #D7CCC8;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.speed-btn.active {
  background: #FFB300;
  color: #21150F;
  font-weight: bold;
  border-color: #FFF8E1;
}

.nav-quiz-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 14px;
  background: linear-gradient(135deg, #B71C1C, #7F0000);
  border: 1.5px solid #FFD54F;
  color: #FFF8E1;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  touch-action: manipulation;
  transition: transform 0.15s ease;
}

.nav-quiz-btn:active {
  transform: scale(0.95);
}

/* 主体左右布局 (左大图实物，右大字手写) */
.literacy-body-container {
  width: 96%;
  max-width: 1040px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 8px 12px;
  overflow: hidden;
  box-sizing: border-box;
}

/* 左侧：生活实物大图卡片 */
.item-showcase-card {
  width: 320px;
  max-width: 34%;
  height: 94%;
  max-height: 540px;
  background: rgba(30, 18, 12, 0.75);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px 14px 14px 14px;
  box-sizing: border-box;
  cursor: pointer;
  touch-action: manipulation;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  user-select: none;
  -webkit-user-select: none;
}

.item-showcase-card:hover {
  border-color: rgba(255, 215, 0, 0.7);
  box-shadow: 0 10px 28px rgba(255, 179, 0, 0.25), 0 8px 24px rgba(0, 0, 0, 0.6);
}

.item-showcase-card:active {
  transform: scale(0.97);
}

/* 超大图容器：原 36px 放大至 240px~280px，正方形居中展示 */
.showcase-photo-container {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(80, 50, 30, 0.5) 0%, rgba(20, 10, 5, 0.8) 100%);
  border-radius: 18px;
  border: 1.5px solid rgba(255, 215, 0, 0.2);
  padding: 12px;
  box-sizing: border-box;
  overflow: hidden;
}

.showcase-real-img {
  width: 100%;
  height: 100%;
  max-width: 270px;
  max-height: 270px;
  object-fit: contain;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.8));
  transition: transform 0.25s ease;
}

.item-showcase-card:active .showcase-real-img {
  transform: scale(1.05);
}

.showcase-emblem-fallback {
  font-size: 110px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8));
}

/* 物品信息区 */
.showcase-info-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.showcase-item-title {
  font-size: 26px;
  font-weight: bold;
  color: #FFE082;
  letter-spacing: 2px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
}

.showcase-phonetics-pill {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 215, 0, 0.35);
  border-radius: 16px;
  padding: 5px 12px;
}

.teochew-audio-tag {
  font-size: 16px;
  color: #FFF8E1;
  display: flex;
  align-items: center;
  gap: 4px;
}

.audio-speaker-icon {
  font-size: 16px;
  animation: speaker-bounce 1.5s ease-in-out infinite;
}

@keyframes speaker-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.ipa-highlight {
  color: #FFD54F;
  font-size: 18px;
}

.pinyin-tag {
  font-size: 14px;
  color: #B2DFDB;
}

.showcase-tap-hint {
  font-size: 13px;
  color: #FFE082;
  opacity: 0.85;
  letter-spacing: 1px;
}

.word-focus-title {
  font-size: 42px;
  font-weight: bold;
  color: #FFD54F;
  letter-spacing: 4px;
  font-family: "Yuanti SC", "YouYuan", "Hiragino Maru Gothic ProN", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.ipa-text {
  font-size: 24px;
  color: #FFE082;
  font-family: sans-serif;
  margin-left: 8px;
}

.pinyin-text {
  font-size: 22px;
  color: #B2DFDB;
  font-family: sans-serif;
  margin-left: 8px;
}

.stroke-focus-title {
  font-size: 24px;
  font-weight: bold;
  color: #FFF8E1;
  letter-spacing: 2px;
}

.complete-focus-title {
  font-size: 30px;
  font-weight: bold;
  color: #81C784;
  letter-spacing: 3px;
  animation: completePulse 1.2s ease-in-out infinite alternate;
}

@keyframes completePulse {
  0% { transform: scale(0.97); }
  100% { transform: scale(1.04); }
}

.practice-focus-title {
  font-size: 24px;
  font-weight: bold;
  color: #FFD54F;
  letter-spacing: 2px;
  transition: all 0.2s ease;
}

.practice-focus-title.has-hint {
  color: #FFE082;
}

/* 大字交互展示区（右侧：状态栏 + 书法米字格画板） */
.character-container {
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  touch-action: none;
  overflow: hidden;
  box-sizing: border-box;
}

.stroke-status-bar {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  z-index: 10;
}

.character-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: crosshair;
  user-select: none;
  -webkit-user-select: none;
  background: rgba(36, 22, 14, 0.75);
  border: 2px solid rgba(255, 215, 0, 0.45);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), inset 0 0 32px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.stroke-svg-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 20;
}

.svg-stroke-line {
  fill: none;
  stroke: #FFD54F;
  stroke-width: 42;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition-property: stroke-dashoffset;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
}

.stroke-active {
  stroke: #FFF59D;
}

.stroke-completed {
  stroke: #FFD54F;
}

/* 笔画指引流动虚线 */
.svg-stroke-guide-flow {
  fill: none;
  stroke: rgba(255, 215, 0, 0.55);
  stroke-width: 36;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 22 22;
  animation: strokeDashFlow 1.6s linear infinite;
  transition: stroke 0.3s ease;
}

.svg-stroke-guide-flow.highlight-prominent {
  stroke: rgba(255, 238, 88, 0.95);
  stroke-width: 42;
  animation: strokeDashFlow 1.0s linear infinite;
}

@keyframes strokeDashFlow {
  from {
    stroke-dashoffset: 88;
  }
  to {
    stroke-dashoffset: 0;
  }
}

/* 起笔信标光斑 */
.start-beacon-outer {
  fill: rgba(255, 215, 0, 0.25);
  stroke: #FFD54F;
  stroke-width: 3.5;
  animation: beaconPulse 1.2s ease-in-out infinite alternate;
}

.start-beacon-inner {
  fill: #FFFFFF;
}

@keyframes beaconPulse {
  0% {
    opacity: 0.35;
    stroke-width: 2px;
  }
  100% {
    opacity: 0.95;
    stroke-width: 5px;
  }
}

/* 实时笔墨画板（纯净实体墨线，无任何背景模糊） */
.brush-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 25;
  opacity: 1;
  transition: opacity 0.25s ease-out;
}

.brush-canvas.canvas-fading {
  opacity: 0;
}

/* 触碰涟漪特效 */
.water-ripple {
  position: absolute;
  width: 100px;
  height: 100px;
  margin-left: -50px;
  margin-top: -50px;
  border-radius: 50%;
  border: 3px solid rgba(255, 235, 59, 0.85);
  pointer-events: none;
  animation: ripple-spread 0.75s ease-out forwards;
  z-index: 30;
}

@keyframes ripple-spread {
  0% { transform: scale(0.2); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}

/* 底部控制栏 */
.bottom-bar {
  margin-bottom: 16px;
  z-index: 50;
}

.action-buttons-group {
  display: flex;
  gap: 14px;
}

.action-btn {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  touch-action: manipulation;
  transition: all 0.15s ease;
}

.teochew-btn {
  background: #B71C1C;
  border: 2px solid #FFD54F;
  color: #FFF8E1;
}

.demo-btn {
  background: #4E342E;
  border: 2px solid #D7CCC8;
  color: #FFF;
}

.practice-btn {
  background: #E65100;
  border: 2px solid #FFD54F;
  color: #FFF8E1;
}

.blind-btn {
  background: linear-gradient(135deg, #4A148C 0%, #311B92 100%);
  border: 2px solid #BA68C8;
  color: #EDE7F6;
}

.blind-btn.btn-active {
  background: linear-gradient(135deg, #7B1FA2 0%, #4A148C 100%);
  border-color: #FFD54F;
  box-shadow: 0 0 16px rgba(225, 190, 231, 0.85);
}

.mandarin-btn {
  background: rgba(43, 28, 18, 0.85);
  border: 1.5px solid rgba(255, 215, 0, 0.35);
  color: #BDBDBD;
}

/* 顶部脱模盲写药丸切换按钮 */
.blind-mode-pill-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  color: #D7CCC8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  touch-action: manipulation;
  min-height: 38px;
}

.blind-mode-pill-btn.is-blind-active {
  background: linear-gradient(135deg, #6A1B9A 0%, #4A148C 100%);
  border-color: #E1BEE7;
  color: #FFF;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(106, 27, 154, 0.5);
}

/* 盲写模式顶栏纯净提示条（取代全部场景字按钮） */
.blind-testing-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(43, 20, 58, 0.85);
  border: 1.5px solid rgba(225, 190, 231, 0.5);
  border-radius: 18px;
  padding: 6px 16px;
  color: #EDE7F6;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.blind-testing-banner .banner-icon {
  font-size: 18px;
}

/* 盲写状态提示文案 */
.practice-focus-title.blind-mode-title {
  color: #E1BEE7;
  text-shadow: 0 0 10px rgba(186, 104, 200, 0.4);
}

.complete-focus-title.blind-complete {
  color: #FFD54F;
  text-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
}

/* 盲写时左侧实物名称掩膜样式 */
.showcase-item-title.is-masked-title {
  color: #FFB74D;
  letter-spacing: 2px;
  text-shadow: 0 0 12px rgba(255, 183, 77, 0.5);
}

/* 脚手架渐进淡入动效 */
@keyframes scaffoldReveal {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

.scaffold-reveal {
  animation: scaffoldReveal 0.6s ease-out forwards;
}

/* 盲写专属通关勋章浮层 */
.blind-badge-celebration {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  padding: 8px 18px;
  background: linear-gradient(135deg, rgba(74, 20, 140, 0.9) 0%, rgba(49, 27, 146, 0.95) 100%);
  border: 1.5px solid #FFD54F;
  border-radius: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
  animation: scaffoldReveal 0.5s ease-out forwards;
}

.badge-celebrate-icon {
  font-size: 26px;
}

.badge-celebrate-info {
  display: flex;
  flex-direction: column;
}

.badge-celebrate-name {
  font-size: 15px;
  font-weight: bold;
  color: #FFE082;
}

.badge-celebrate-desc {
  font-size: 12px;
  color: #E1BEE7;
}

.action-btn.btn-active {
  box-shadow: 0 0 16px rgba(255, 215, 0, 0.8);
  border-color: #FFF;
}

.action-btn:active {
  transform: scale(0.95);
}

@media (max-width: 800px) {
  .literacy-body-container {
    gap: 12px;
  }
  .item-showcase-card {
    width: 220px;
    padding: 10px 8px;
  }
  .showcase-real-img {
    max-width: 180px;
    max-height: 180px;
  }
  .showcase-item-title {
    font-size: 22px;
  }
}
</style>
