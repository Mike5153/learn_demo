<template>
  <div class="scene-view kitchen-desk">
    <!-- 梯次切换胶囊：基础厨具 vs 进阶烹煮 -->
    <div class="tier-switcher-bar">
      <button 
        class="tier-toggle-btn"
        :class="{ 'active': currentTier === 'basic' }"
        @click="setTier('basic')"
      >
        🌿 基础厨具 (7字)
      </button>
      <button 
        class="tier-toggle-btn"
        :class="{ 'active': currentTier === 'advanced' }"
        @click="setTier('advanced')"
      >
        ✨ 进阶烹煮 (7字)
      </button>
    </div>

    <div class="kitchen-brick-stove">
      <!-- ================= 1. 左侧备料台 ================= -->
      <div class="counter-section prep-counter">
        <template v-if="currentTier === 'basic'">
          <!-- 1. 米缸 (米 - bî²) -->
          <div 
            class="interactive-item rice-caddy-unit"
            @touchstart.stop="handleItemClick('rice')"
            @mousedown.stop="handleItemClick('rice')"
          >
            <div class="item-halo"></div>
            <div class="photo-wrapper prep-wrapper">
              <img src="/images/items/rice.png" alt="米缸" class="item-real-photo" />
            </div>
            <div class="simple-badge">米</div>
          </div>

          <!-- 2. 木砧板与菜刀 (刀 - to¹) -->
          <div 
            class="interactive-item chopping-board-knife-unit"
            @touchstart.stop="handleItemClick('knife')"
            @mousedown.stop="handleItemClick('knife')"
          >
            <div class="item-halo"></div>
            <div class="photo-wrapper prep-wrapper">
              <img src="/images/items/knife.png" alt="菜刀" class="item-real-photo" />
            </div>
            <div class="simple-badge">刀</div>
          </div>

          <!-- 3. 砧板切菜动作 (切 - tshiek⁴) -->
          <div 
            class="interactive-item sliced-veggies-unit"
            @touchstart.stop="handleItemClick('slice')"
            @mousedown.stop="handleItemClick('slice')"
          >
            <div class="item-halo"></div>
            <div class="photo-wrapper prep-wrapper">
              <img src="/images/items/slice.png" alt="切菜" class="item-real-photo" />
            </div>
            <div class="simple-badge">切</div>
          </div>
        </template>

        <!-- 进阶左台：油、盐、柴 -->
        <template v-else>
          <!-- 1. 猪油罐 (油 - iû⁵) -->
          <div 
            class="interactive-item oil-unit"
            @touchstart.stop="handleItemClick('oil')"
            @mousedown.stop="handleItemClick('oil')"
          >
            <div class="item-halo"></div>
            <div class="photo-wrapper prep-wrapper">
              <img src="/images/items/oil.png" alt="油罐" class="item-real-photo" />
            </div>
            <div class="simple-badge">油</div>
          </div>

          <!-- 2. 食盐罐 (盐 - iâm⁵) -->
          <div 
            class="interactive-item salt-unit"
            @touchstart.stop="handleItemClick('salt')"
            @mousedown.stop="handleItemClick('salt')"
          >
            <div class="item-halo"></div>
            <div class="photo-wrapper prep-wrapper">
              <img src="/images/items/salt.png" alt="盐罐" class="item-real-photo" />
            </div>
            <div class="simple-badge">盐</div>
          </div>

          <!-- 3. 干荔枝柴 (柴 - tshâ⁵) -->
          <div 
            class="interactive-item wood-unit"
            @touchstart.stop="handleItemClick('wood')"
            @mousedown.stop="handleItemClick('wood')"
          >
            <div class="item-halo"></div>
            <div class="photo-wrapper prep-wrapper">
              <img src="/images/items/wood.png" alt="柴把" class="item-real-photo" />
            </div>
            <div class="simple-badge">柴</div>
          </div>
        </template>
      </div>

      <!-- ================= 2. 中间大柴火灶 ================= -->
      <div class="counter-section main-stove">
        <template v-if="currentTier === 'basic'">
          <!-- 4. 双耳黑铁大鼎 (鼎 - diã²) -->
          <div 
            class="interactive-item iron-wok-unit"
            @touchstart.stop="handleItemClick('wok')"
            @mousedown.stop="handleItemClick('wok')"
          >
            <div class="item-halo wok-halo"></div>
            <div class="photo-wrapper wok-wrapper">
              <img src="/images/items/wok.png" alt="铁鼎" class="item-real-photo" />
            </div>
            <div class="simple-badge">鼎</div>
          </div>

          <!-- 5. 翻炒动作 (炒 - tsha²) -->
          <div 
            class="interactive-item stirfry-spatula-unit"
            @touchstart.stop="handleItemClick('stirfry')"
            @mousedown.stop="handleItemClick('stirfry')"
          >
            <div class="item-halo stirfry-halo"></div>
            <div class="photo-wrapper stirfry-wrapper">
              <img src="/images/items/stirfry.png" alt="炒菜" class="item-real-photo" />
            </div>
            <div class="simple-badge">炒</div>
          </div>
        </template>

        <!-- 进阶中灶：锅、铲 -->
        <template v-else>
          <!-- 4. 砂锅烹煮 (锅 - ue¹) -->
          <div 
            class="interactive-item iron-wok-unit"
            @touchstart.stop="handleItemClick('pot_stove')"
            @mousedown.stop="handleItemClick('pot_stove')"
          >
            <div class="item-halo wok-halo"></div>
            <div class="photo-wrapper wok-wrapper">
              <img src="/images/items/pot_stove.png" alt="砂锅" class="item-real-photo" />
            </div>
            <div class="simple-badge">锅</div>
          </div>

          <!-- 5. 铁锅铲 (铲 - sán²) -->
          <div 
            class="interactive-item stirfry-spatula-unit"
            @touchstart.stop="handleItemClick('spatula')"
            @mousedown.stop="handleItemClick('spatula')"
          >
            <div class="item-halo stirfry-halo"></div>
            <div class="photo-wrapper stirfry-wrapper">
              <img src="/images/items/spatula.png" alt="锅铲" class="item-real-photo" />
            </div>
            <div class="simple-badge">铲</div>
          </div>
        </template>

        <!-- 灶膛火口 -->
        <div class="stove-hearth-base">
          <div class="hearth-arch">
            <div class="hearth-glow"></div>
            <div class="fire-charcoal-wood"></div>
          </div>
        </div>
      </div>

      <!-- ================= 3. 右侧炊具与餐具 ================= -->
      <div class="counter-section steam-counter">
        <template v-if="currentTier === 'basic'">
          <!-- 6. 蒸笼炊气 (炊 - tshui¹) -->
          <div 
            class="interactive-item bamboo-steamer-unit"
            @touchstart.stop="handleItemClick('steam')"
            @mousedown.stop="handleItemClick('steam')"
          >
            <div class="item-halo steamer-halo"></div>
            <div class="photo-wrapper steam-wrapper">
              <img src="/images/items/steam.png" alt="蒸笼" class="item-real-photo" />
            </div>
            <div class="simple-badge">炊</div>
          </div>

          <!-- 7. 青花海碗叠放 (碗 - uã²) -->
          <div 
            class="interactive-item porcelain-bowls-unit"
            @touchstart.stop="handleItemClick('bowl')"
            @mousedown.stop="handleItemClick('bowl')"
          >
            <div class="item-halo"></div>
            <div class="photo-wrapper bowl-wrapper">
              <img src="/images/items/bowl.png" alt="海碗" class="item-real-photo" />
            </div>
            <div class="simple-badge">碗</div>
          </div>
        </template>

        <!-- 进阶右台：煮、汤 -->
        <template v-else>
          <!-- 6. 慢火细煮 (煮 - zé²) -->
          <div 
            class="interactive-item bamboo-steamer-unit"
            @touchstart.stop="handleItemClick('boil')"
            @mousedown.stop="handleItemClick('boil')"
          >
            <div class="item-halo steamer-halo"></div>
            <div class="photo-wrapper steam-wrapper">
              <img src="/images/items/boil.png" alt="慢煮" class="item-real-photo" />
            </div>
            <div class="simple-badge">煮</div>
          </div>

          <!-- 7. 鲜浓高汤 (汤 - thng¹) -->
          <div 
            class="interactive-item porcelain-bowls-unit"
            @touchstart.stop="handleItemClick('soup')"
            @mousedown.stop="handleItemClick('soup')"
          >
            <div class="item-halo"></div>
            <div class="photo-wrapper bowl-wrapper">
              <img src="/images/items/soup.png" alt="鲜汤" class="item-real-photo" />
            </div>
            <div class="simple-badge">汤</div>
          </div>
        </template>
      </div>
    </div>

    <!-- 底部极简提示：仅 5 个字 -->
    <div class="bottom-hint">
      <span class="finger-anim">👆</span> {{ currentTier === 'basic' ? '点厨具学字' : '点烹煮进阶字' }}
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

.kitchen-desk {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, #302117 0%, #140d09 100%);
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

/* 传统红砖柴火灶台整体大框架 */
.kitchen-brick-stove {
  position: absolute;
  top: 10%;
  left: 3%;
  width: 94%;
  height: 78%;
  background: linear-gradient(145deg, #44291c, #2a180f);
  border-radius: 36px;
  border: 8px solid #5a3825;
  box-shadow: inset 0 6px 24px rgba(0, 0, 0, 0.85), 0 16px 40px rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
}

/* 红色印章汉字徽章 */
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
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  touch-action: manipulation;
  position: relative;
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
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2.5px solid rgba(255, 215, 0, 0.4);
  animation: halo-glow 2.4s infinite ease-in-out;
  pointer-events: none;
}

.wok-halo {
  width: 175px;
  height: 175px;
}

.stirfry-halo {
  width: 145px;
  height: 145px;
}

.steamer-halo {
  width: 140px;
  height: 140px;
}

@keyframes halo-glow {
  0%, 100% { transform: scale(0.96); opacity: 0.25; }
  50% { transform: scale(1.06); opacity: 0.8; }
}

/* ================= 1. 左侧备料台 ================= */
.counter-section.prep-counter {
  width: 28%;
  height: 90%;
  background: rgba(43, 24, 15, 0.6);
  border-radius: 24px;
  border: 2px dashed rgba(255, 215, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
}

.prep-wrapper {
  width: 95px;
  height: 95px;
}

/* ================= 2. 中间大柴火灶 ================= */
.counter-section.main-stove {
  width: 38%;
  height: 94%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.wok-wrapper {
  width: 170px;
  height: 150px;
}

.stirfry-wrapper {
  width: 135px;
  height: 125px;
}

.interactive-item.iron-wok-unit {
  margin-top: 10px;
}

.interactive-item.stirfry-spatula-unit {
  position: absolute;
  top: 48%;
  right: 6%;
}

/* 灶膛火口 */
.stove-hearth-base {
  position: absolute;
  bottom: 8px;
  width: 150px;
  height: 56px;
  background: #1B0F0A;
  border-radius: 20px 20px 8px 8px;
  border: 3px solid #3E2014;
  box-shadow: inset 0 6px 14px rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.hearth-arch {
  width: 100px;
  height: 42px;
  background: radial-gradient(circle at 50% 90%, #FF5722 0%, #D84315 45%, #260C04 100%);
  border-radius: 24px 24px 0 0;
  position: relative;
  overflow: hidden;
}

.hearth-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 60%, rgba(255, 235, 59, 0.8) 0%, rgba(255, 87, 34, 0.2) 70%, transparent 100%);
  animation: fire-flicker 1.5s infinite alternate ease-in-out;
}

@keyframes fire-flicker {
  0% { transform: scale(0.92); opacity: 0.75; }
  100% { transform: scale(1.08); opacity: 1; }
}

.fire-charcoal-wood {
  position: absolute;
  bottom: 2px;
  left: 15%;
  width: 70%;
  height: 10px;
  background: #110703;
  border-radius: 3px;
}

/* ================= 3. 右侧出锅台 ================= */
.counter-section.steam-counter {
  width: 28%;
  height: 90%;
  background: rgba(43, 24, 15, 0.6);
  border-radius: 24px;
  border: 2px dashed rgba(255, 215, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
}

.steam-wrapper {
  width: 120px;
  height: 120px;
}

.bowl-wrapper {
  width: 110px;
  height: 110px;
}

/* 底部极简提示 */
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
