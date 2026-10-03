<template>
  <div class="scene-view tea-table-desk">
    <!-- 梯次切换胶囊：基础物事 vs 进阶拓展 -->
    <div class="tier-switcher-bar">
      <button 
        class="tier-toggle-btn"
        :class="{ 'active': currentTier === 'basic' }"
        @click="setTier('basic')"
      >
        🌿 基础物事 (6字)
      </button>
      <button 
        class="tier-toggle-btn"
        :class="{ 'active': currentTier === 'advanced' }"
        @click="setTier('advanced')"
      >
        ✨ 进阶拓展 (7字)
      </button>
    </div>

    <!-- 潮汕工夫茶盘 -->
    <div class="tea-tray">
      <div class="tray-inner-rim"></div>
      <div class="tray-drainage">
        <span class="grille-line" v-for="n in 9" :key="n"></span>
      </div>

      <!-- ================= 第一套：基础核心 6 字 ================= -->
      <template v-if="currentTier === 'basic'">
        <!-- 1. 冲罐 (茶) -->
        <div 
          class="interactive-item teapot-container" 
          @touchstart.stop="handleItemClick('tea')"
          @mousedown.stop="handleItemClick('tea')"
        >
          <div class="item-halo"></div>
          <div class="photo-wrapper">
            <img src="/images/items/tea.png" alt="冲罐" class="item-real-photo" />
          </div>
          <div class="simple-badge">茶</div>
        </div>

        <!-- 2. 若琛瓯 (杯) -->
        <div 
          class="interactive-item cups-trio"
          @touchstart.stop="handleItemClick('cup')"
          @mousedown.stop="handleItemClick('cup')"
        >
          <div class="item-halo cup-halo"></div>
          <div class="photo-wrapper">
            <img src="/images/items/cup.png" alt="若琛瓯" class="item-real-photo" />
          </div>
          <div class="simple-badge">杯</div>
        </div>

        <!-- 茶巾与竹茶夹 -->
        <div class="tea-tools">
          <div class="tea-towel"></div>
          <div class="bamboo-tongs"></div>
        </div>
      </template>

      <!-- ================= 第二套：进阶拓展 7 字 ================= -->
      <template v-else>
        <!-- 1. 茶盘 (盘 - bûan⁵) -->
        <div 
          class="interactive-item tray-center-unit"
          @touchstart.stop="handleItemClick('tray')"
          @mousedown.stop="handleItemClick('tray')"
        >
          <div class="item-halo tray-halo"></div>
          <div class="photo-wrapper tray-wrapper">
            <img src="/images/items/tray.png" alt="茶盘" class="item-real-photo" />
          </div>
          <div class="simple-badge">盘</div>
        </div>

        <!-- 2. 西施壶 (壶 - hû⁵) -->
        <div 
          class="interactive-item pot-left-unit"
          @touchstart.stop="handleItemClick('pot')"
          @mousedown.stop="handleItemClick('pot')"
        >
          <div class="item-halo"></div>
          <div class="photo-wrapper">
            <img src="/images/items/pot.png" alt="西施壶" class="item-real-photo" />
          </div>
          <div class="simple-badge">壶</div>
        </div>

        <!-- 3. 高冲沏茶 (冲 - tshong¹) -->
        <div 
          class="interactive-item pour-top-unit"
          @touchstart.stop="handleItemClick('pour')"
          @mousedown.stop="handleItemClick('pour')"
        >
          <div class="item-halo"></div>
          <div class="photo-wrapper">
            <img src="/images/items/pour.png" alt="高冲" class="item-real-photo" />
          </div>
          <div class="simple-badge">冲</div>
        </div>

        <!-- 4. 开水洗杯 (洗 - sói²) -->
        <div 
          class="interactive-item rinse-bot-unit"
          @touchstart.stop="handleItemClick('rinse')"
          @mousedown.stop="handleItemClick('rinse')"
        >
          <div class="item-halo"></div>
          <div class="photo-wrapper">
            <img src="/images/items/rinse.png" alt="洗杯" class="item-real-photo" />
          </div>
          <div class="simple-badge">洗</div>
        </div>
      </template>
    </div>

    <!-- ================= 外围侧边物件：第一套 ================= -->
    <template v-if="currentTier === 'basic'">
      <!-- 3. 砂铫水壶 (水) -->
      <div 
        class="interactive-item stove-kettle-unit"
        @touchstart.stop="handleItemClick('water')"
        @mousedown.stop="handleItemClick('water')"
      >
        <div class="item-halo side-halo"></div>
        <div class="photo-wrapper side-wrapper">
          <img src="/images/items/water.png" alt="砂铫" class="item-real-photo" />
        </div>
        <div class="simple-badge">水</div>
      </div>

      <!-- 4. 红泥风炉 (火) -->
      <div 
        class="interactive-item charcoal-stove-unit"
        @touchstart.stop="handleItemClick('fire')"
        @mousedown.stop="handleItemClick('fire')"
      >
        <div class="item-halo side-halo"></div>
        <div class="photo-wrapper side-wrapper">
          <img src="/images/items/fire.png" alt="风炉" class="item-real-photo" />
        </div>
        <div class="simple-badge">火</div>
      </div>

      <!-- 5. 单丛茶仓 (叶) -->
      <div 
        class="interactive-item tea-caddy-unit"
        @touchstart.stop="handleItemClick('leaf')"
        @mousedown.stop="handleItemClick('leaf')"
      >
        <div class="item-halo side-halo"></div>
        <div class="photo-wrapper side-wrapper">
          <img src="/images/items/leaf.png" alt="茶仓" class="item-real-photo" />
        </div>
        <div class="simple-badge">叶</div>
      </div>

      <!-- 6. 橄榄青果碟 (甘) -->
      <div 
        class="interactive-item olives-plate-unit"
        @touchstart.stop="handleItemClick('sweet')"
        @mousedown.stop="handleItemClick('sweet')"
      >
        <div class="item-halo side-halo"></div>
        <div class="photo-wrapper side-wrapper">
          <img src="/images/items/sweet.png" alt="橄榄" class="item-real-photo" />
        </div>
        <div class="simple-badge">甘</div>
      </div>
    </template>

    <!-- ================= 外围侧边物件：第二套 ================= -->
    <template v-else>
      <!-- 5. 茶香弥漫 (香 - hiang¹) -->
      <div 
        class="interactive-item aroma-side-unit"
        @touchstart.stop="handleItemClick('aroma')"
        @mousedown.stop="handleItemClick('aroma')"
      >
        <div class="item-halo side-halo"></div>
        <div class="photo-wrapper side-wrapper">
          <img src="/images/items/aroma.png" alt="茶香" class="item-real-photo" />
        </div>
        <div class="simple-badge">香</div>
      </div>

      <!-- 6. 滚烫热茶 (热 - zuah⁸) -->
      <div 
        class="interactive-item hot-side-unit"
        @touchstart.stop="handleItemClick('hot')"
        @mousedown.stop="handleItemClick('hot')"
      >
        <div class="item-halo side-halo"></div>
        <div class="photo-wrapper side-wrapper">
          <img src="/images/items/hot.png" alt="热茶" class="item-real-photo" />
        </div>
        <div class="simple-badge">热</div>
      </div>

      <!-- 7. 茶客杯席 (客 - kheh⁴) -->
      <div 
        class="interactive-item guest-side-unit"
        @touchstart.stop="handleItemClick('guest')"
        @mousedown.stop="handleItemClick('guest')"
      >
        <div class="item-halo side-halo"></div>
        <div class="photo-wrapper side-wrapper">
          <img src="/images/items/guest.png" alt="茶客" class="item-real-photo" />
        </div>
        <div class="simple-badge">客</div>
      </div>
    </template>

    <!-- 底部极简提示：仅 5 个字 -->
    <div class="bottom-hint">
      <span class="finger-anim">👆</span> {{ currentTier === 'basic' ? '点茶具识字' : '点茶席进阶字' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { audioService } from '../../services/audioService';

const emit = defineEmits<{
  (e: 'select-word', wordId: string): void;
}>();

const currentTier = ref<'basic' | 'advanced'>('basic');

const setTier = (tier: 'basic' | 'advanced') => {
  audioService.unlockAudio();
  audioService.playCupClink();
  currentTier.value = tier;
};

const handleItemClick = (wordId: string) => {
  audioService.unlockAudio();
  audioService.playCupClink();
  emit('select-word', wordId);
};
</script>

<style scoped>
.scene-view {
  width: 100%;
  height: 100%;
  position: relative;
}

.tea-table-desk {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, #2f2119 0%, #150f0c 100%);
  position: relative;
}

/* 梯次切换抽屉胶囊 */
.tier-switcher-bar {
  position: absolute;
  top: 14px;
  right: 18px;
  display: flex;
  gap: 8px;
  z-index: 45;
  background: rgba(0, 0, 0, 0.45);
  padding: 4px 8px;
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.25);
  backdrop-filter: blur(4px);
}

.tier-toggle-btn {
  padding: 5px 14px;
  border-radius: 14px;
  border: 1px solid transparent;
  background: transparent;
  color: #D7CCC8;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tier-toggle-btn.active {
  background: linear-gradient(135deg, #FFB300, #FF8F00);
  color: #21150F;
  border-color: #FFF8E1;
  box-shadow: 0 2px 8px rgba(255, 179, 0, 0.4);
}

.tea-tray {
  position: absolute;
  top: 10%;
  left: 18%;
  width: 64%;
  height: 76%;
  background: linear-gradient(145deg, #4d3321, #362316);
  border-radius: 36px;
  border: 9px solid #6b472e;
  box-shadow: inset 0 6px 20px rgba(0, 0, 0, 0.8), 0 16px 40px rgba(0, 0, 0, 0.7);
  position: relative;
}

.tray-inner-rim {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: 26px;
  pointer-events: none;
}

.tray-drainage {
  position: absolute;
  top: 18px;
  left: 20%;
  width: 60%;
  height: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grille-line {
  width: 5px;
  height: 100%;
  background: #20140c;
  border-radius: 3px;
}

.simple-badge {
  margin-top: 8px;
  background: #B71C1C;
  color: #FFF8E1;
  font-size: 20px;
  font-weight: bold;
  font-family: "Yuanti SC", "YouYuan", "Hiragino Maru Gothic ProN", "PingFang SC", "Microsoft YaHei", sans-serif;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #FFD54F;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.85);
  z-index: 5;
}

.interactive-item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
  z-index: 10;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.interactive-item:active {
  transform: scale(0.93);
}

.photo-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
}

.photo-wrapper.side-wrapper {
  width: 100px;
  height: 100px;
}

.item-real-photo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.75));
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  transition: filter 0.2s ease;
}

.interactive-item:hover .item-real-photo {
  filter: drop-shadow(0 10px 24px rgba(255, 215, 0, 0.45));
}

/* 呼吸光环 */
.item-halo {
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 3px solid rgba(255, 215, 0, 0.45);
  animation: halo-glow 2.4s infinite ease-in-out;
  pointer-events: none;
}

.item-halo.side-halo {
  width: 115px;
  height: 115px;
  border-width: 2.5px;
}

.cup-halo {
  width: 155px;
  height: 155px;
}

.tray-halo {
  width: 170px;
  height: 170px;
}

@keyframes halo-glow {
  0%, 100% { transform: scale(0.96); opacity: 0.25; }
  50% { transform: scale(1.06); opacity: 0.85; }
}

/* ================= 基础核心位置 ================= */
.interactive-item.teapot-container {
  position: absolute;
  top: 22%;
  left: 14%;
  width: 180px;
  height: 190px;
}

.interactive-item.cups-trio {
  position: absolute;
  top: 22%;
  left: 55%;
  width: 180px;
  height: 190px;
}

.tea-tools {
  position: absolute;
  bottom: 22px;
  left: 20%;
  display: flex;
  align-items: center;
  gap: 18px;
  opacity: 0.8;
}

.tea-towel {
  width: 64px;
  height: 32px;
  background: #3E2723;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

.bamboo-tongs {
  width: 70px;
  height: 12px;
  background: #A1887F;
  border-radius: 4px;
  transform: rotate(-10deg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

.interactive-item.stove-kettle-unit {
  position: absolute;
  top: 14%;
  left: 2%;
  width: 110px;
}

.interactive-item.charcoal-stove-unit {
  position: absolute;
  bottom: 12%;
  left: 2%;
  width: 110px;
}

.interactive-item.tea-caddy-unit {
  position: absolute;
  top: 14%;
  right: 2%;
  width: 110px;
}

.interactive-item.olives-plate-unit {
  position: absolute;
  bottom: 12%;
  right: 2%;
  width: 110px;
}

/* ================= 进阶拓展位置 ================= */
.interactive-item.tray-center-unit {
  position: absolute;
  top: 18%;
  left: 36%;
  width: 170px;
}

.tray-wrapper {
  width: 145px;
  height: 130px;
}

.interactive-item.pot-left-unit {
  position: absolute;
  top: 22%;
  left: 6%;
  width: 140px;
}

.interactive-item.pour-top-unit {
  position: absolute;
  top: 12%;
  left: 68%;
  width: 130px;
}

.interactive-item.rinse-bot-unit {
  position: absolute;
  bottom: 10%;
  left: 62%;
  width: 140px;
}

.interactive-item.aroma-side-unit {
  position: absolute;
  top: 14%;
  left: 2%;
  width: 110px;
}

.interactive-item.hot-side-unit {
  position: absolute;
  bottom: 12%;
  left: 2%;
  width: 110px;
}

.interactive-item.guest-side-unit {
  position: absolute;
  top: 14%;
  right: 2%;
  width: 110px;
}

.bottom-hint {
  position: absolute;
  bottom: 4%;
  width: 100%;
  text-align: center;
  color: #D4AF37;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
}

.finger-anim {
  display: inline-block;
  animation: tap 1.5s infinite;
}

@keyframes tap {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>
