<template>
  <div class="scene-view life-scene-container" :class="[`theme-${sceneConfig.id}`]">
    <!-- 1. 顶部梯次切换药丸胶囊 -->
    <div class="tier-switcher-bar">
      <button 
        class="tier-toggle-btn"
        :class="{ 'active': currentTier === 'basic' }"
        @click="setTier('basic')"
      >
        🌿 基础物事 ({{ basicWords.length }}字)
      </button>
      <button 
        class="tier-toggle-btn"
        :class="{ 'active': currentTier === 'advanced' }"
        @click="setTier('advanced')"
      >
        ✨ 进阶拓展 ({{ advancedWords.length }}字)
      </button>
    </div>

    <!-- 2. 实景文化意象顶标提示 -->
    <div class="scene-ambience-header">
      <span class="ambience-icon">{{ sceneConfig.icon }}</span>
      <div class="ambience-info">
        <h2 class="ambience-title">{{ sceneConfig.name }} · {{ sceneConfig.subtitle }}</h2>
        <p class="ambience-hint">{{ sceneConfig.hintText }}</p>
      </div>
    </div>

    <!-- 3. 实景物事实物探索展示台（自适应 4:3 网格拟物舞台） -->
    <div class="scene-stage-surface">
      <div class="stage-backdrop-ornament"></div>

      <div class="items-grid-layout">
        <div
          v-for="item in currentTierWords"
          :key="item.id"
          class="life-interactive-card"
          @touchstart.stop="handleItemClick(item)"
          @mousedown.stop="handleItemClick(item)"
        >
          <!-- 适老呼吸发光外环 -->
          <div class="card-glow-halo"></div>

          <!-- 物品主体视觉展示区 -->
          <div class="card-visual-wrapper">
            <div class="card-icon-emblem">{{ getItemIcon(item.id) }}</div>
            <div class="card-trigger-title">{{ item.triggerName }}</div>
          </div>

          <!-- 汉字核心展示区：超大楷体字盘 + 地道潮汕音标 -->
          <div class="card-hanzi-badge">
            <span class="hanzi-char">{{ item.character }}</span>
            <div class="phonetic-tags">
              <span class="teochew-tag">潮音: {{ item.teochewIPA }}</span>
              <span class="pinyin-tag">{{ item.pinyin }}</span>
            </div>
            <span class="audio-wave-icon">🔊</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部环境氛围饰条 -->
    <div class="stage-footer-bar">
      <span class="footer-culture-tip">🏮 潮汕生活实景 · 摸着物事认字记音</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { SceneConfig, WordItem } from '../../types/literacy';
import { audioService } from '../../services/audioService';

const props = defineProps<{
  sceneConfig: SceneConfig;
  paused?: boolean;
}>();

const emit = defineEmits<{
  (e: 'select-word', wordId: string): void;
}>();

// 梯次控制：basic (第一套 6字) / advanced (第二套 7字)
const currentTier = ref<'basic' | 'advanced'>('basic');

const allWords = computed<WordItem[]>(() => Object.values(props.sceneConfig.words));
const basicWords = computed<WordItem[]>(() => allWords.value.filter(w => w.tier === 'basic' || !w.tier));
const advancedWords = computed<WordItem[]>(() => allWords.value.filter(w => w.tier === 'advanced'));

const currentTierWords = computed<WordItem[]>(() => {
  return currentTier.value === 'basic' ? basicWords.value : advancedWords.value;
});

const setTier = (tier: 'basic' | 'advanced') => {
  if (currentTier.value === tier) return;
  audioService.playCupClink();
  currentTier.value = tier;
};

// 点击物品卡片
const handleItemClick = (item: WordItem) => {
  audioService.playCupClink();
  if (item.teochewAudio) {
    audioService.playTeochewAudio(item.teochewAudio);
  }
  emit('select-word', item.id);
};

// 物品拟物文化生动图标映射
const ITEM_ICONS: Record<string, string> = {
  // 大厅天井
  door: '🚪', lock: '🔒', table: '🪵', chair: '🪑', broom: '🧹', clean: '✨',
  open: '👐', close: '🛡️', enter: '🚶', sit: '🍵', lamp: '🏮', clock: '🕰️', hall: '🏛️',
  // 房内起居
  bed: '🛏️', quilt: '🧣', clothes: '👘', needle: '🪡', thread: '🧵', comb: '🪮',
  cloth: '🧶', scissors: '✂️', mend: '🪡', towel: '🧖', mirror: '🪞', shoes: '👞', peace: '🕊️',
  // 做粿案台
  guo: '🥟', mold: '🪵', flour: '🌾', sugar: '🍬', red: '🔴', wrap: '🤲',
  bean: '🫘', skin: '🥟', steam_guo: '♨️', fry_guo: '🍳', sweet_taste: '🍯', peach_shape: '🍑', year_festival: '🧧',
  // 祖厅神台
  incense: '🕯️', candle: '🕯️', worship: '🙏', fortune: '🧧', peaceful: '🕊️', tranquil: '🌿',
  god: '👑', flower: '🌸', fruit: '🍊', great: '🌟', lucky: '🍊', protect: '🛡️', longevity: '寿',
  // 清早食糜
  porridge_rice: '🥣', fish: '🐟', veggies: '🥬', egg: '🥚', meat: '🥩', warm: '♨️',
  eat: '🥢', full: '😋', salty: '🧂', soy_paste: '🫘', ginger: '🫚', spoon: '🥄', morning: '🌅',
  // 墟市采买
  buy: '🧺', sell: '🥬', scale: '⚖️', money: '💰', catty: '⚖️', yuan: '🪙',
  liang: '🏷️', much: '📦', little: '🤏', costly: '💎', cheap: '🏷️', change_money: '💵', city_market: '🏪',
  // 园头田埂
  field: '🌾', ox: '🐂', grass: '🌿', plant_seed: '🌱', melon: '🥒', pick_fruit: '🧺',
  soil: '🪴', ground: '🏞️', irrigation: '💧', pour_water: '🪣', harvest: '🌽', sky: '⛅', spring: '🌸',
  // 厝内药箱
  med: '💊', day: '☀️', morning_med: '🌅', night_med: '🌙', pill: '⚪', take_dose: '🥛',
  eat_med: '💊', times_dose: '3️⃣', granule: '🔴', meal_time: '🍚', stop_med: '🛑', care_body: '❤️', body: '🧘',
  // 堂前儿孙
  grandson: '👦', child: '👧', grandfather: '👴', grandmother: '👵', home: '🏡', joy: '😄',
  father: '👨', mother: '👩', son: '👦', filial: '🍵', harmony: '🤝', bliss: '🎉', smooth: '🎋'
};

const getItemIcon = (id: string): string => {
  return ITEM_ICONS[id] || '✨';
};
</script>

<style scoped>
.life-scene-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px;
  user-select: none;
  -webkit-user-select: none;
}

/* 各场景特色传统氛围背景 */
.theme-courtyard {
  background: radial-gradient(circle at 50% 30%, #37474F 0%, #263238 60%, #1A2226 100%);
}
.theme-bedroom {
  background: radial-gradient(circle at 50% 30%, #4E342E 0%, #3E2723 60%, #251614 100%);
}
.theme-guo_table {
  background: radial-gradient(circle at 50% 30%, #5D4037 0%, #4A2820 60%, #2E1510 100%);
}
.theme-altar {
  background: radial-gradient(circle at 50% 30%, #611E18 0%, #42100B 60%, #220805 100%);
}
.theme-porridge {
  background: radial-gradient(circle at 50% 30%, #4E342E 0%, #36241D 60%, #1E120D 100%);
}
.theme-market {
  background: radial-gradient(circle at 50% 30%, #3E4B3E 0%, #29382B 60%, #172118 100%);
}
.theme-farm {
  background: radial-gradient(circle at 50% 30%, #2E4B34 0%, #1B3520 60%, #0E1F12 100%);
}
.theme-medicine {
  background: radial-gradient(circle at 50% 30%, #2C3E50 0%, #1E2B37 60%, #10171E 100%);
}
.theme-family {
  background: radial-gradient(circle at 50% 30%, #5E261E 0%, #3F150F 60%, #250B07 100%);
}

/* 顶部梯次切换栏 */
.tier-switcher-bar {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 48px;
  margin-bottom: 8px;
  z-index: 20;
}

.tier-toggle-btn {
  background: rgba(0, 0, 0, 0.55);
  border: 1.5px solid rgba(255, 215, 0, 0.4);
  color: #D7CCC8;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 22px;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.25s ease;
  min-height: 44px;
}

.tier-toggle-btn.active {
  background: #FFB300;
  border-color: #FFE082;
  color: #21150F;
  box-shadow: 0 4px 14px rgba(255, 179, 0, 0.45);
  transform: scale(1.03);
}

/* 场景顶标信息 */
.scene-ambience-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
  z-index: 10;
}

.ambience-icon {
  font-size: 30px;
}

.ambience-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #FFE082;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.ambience-hint {
  margin: 2px 0 0 0;
  font-size: 13px;
  color: #D7CCC8;
}

/* 舞台表面 */
.scene-stage-surface {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 215, 0, 0.15);
  backdrop-filter: blur(2px);
  overflow: hidden;
}

/* 物品卡片响应式网格 */
.items-grid-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(110px, 1fr);
  gap: 14px;
  width: 100%;
  max-width: 900px;
  max-height: 100%;
  align-items: center;
  justify-content: center;
}

/* 7字时自动变成前4后3或灵活分布 */
.items-grid-layout:has(> :nth-child(7)) {
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

/* 实体大卡片 */
.life-interactive-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 248, 225, 0.1) 0%, rgba(30, 20, 15, 0.6) 100%);
  border: 2px solid rgba(255, 215, 0, 0.35);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  min-height: 90px;
  touch-action: manipulation;
}

.life-interactive-card:active {
  transform: scale(0.96);
  border-color: #FFB300;
  background: linear-gradient(135deg, rgba(255, 179, 0, 0.25) 0%, rgba(60, 40, 30, 0.8) 100%);
}

.card-glow-halo {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  pointer-events: none;
  animation: halo-pulse 3s infinite ease-in-out;
}

@keyframes halo-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.02); border-color: rgba(255, 215, 0, 0.5); }
}

/* 物品视觉 */
.card-visual-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 58px;
}

.card-icon-emblem {
  font-size: 38px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
}

.card-trigger-title {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #FFE082;
  text-align: center;
  white-space: nowrap;
}

/* 汉字核心徽标 */
.card-hanzi-badge {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.45);
  padding: 6px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 215, 0, 0.25);
}

.hanzi-char {
  font-family: "STKaiti", "KaiTi", "SimKai", "PingFang SC", serif;
  font-size: 38px;
  font-weight: bold;
  color: #FFF8E1;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
  line-height: 1;
}

.phonetic-tags {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.teochew-tag {
  font-size: 13px;
  font-weight: bold;
  color: #FFB300;
  letter-spacing: 0.5px;
}

.pinyin-tag {
  font-size: 11px;
  color: #B0BEC5;
}

.audio-wave-icon {
  font-size: 18px;
  color: #FFE082;
  opacity: 0.8;
}

/* 底部提示栏 */
.stage-footer-bar {
  display: flex;
  justify-content: center;
  margin-top: 8px;
  z-index: 10;
}

.footer-culture-tip {
  font-size: 13px;
  color: rgba(255, 248, 225, 0.65);
}
</style>
