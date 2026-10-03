<template>
  <div class="scene-selector-wrapper">
    <!-- 顶部常驻轻量导览胶囊 -->
    <div class="scene-selector-bar">
      <!-- 快速常驻项：3D大院 -->
      <button
        v-if="houseScene"
        class="scene-tab-btn"
        :class="{ 'active': activeSceneId === houseScene.id }"
        @click="handleSelect(houseScene.id)"
      >
        <span class="scene-icon">{{ houseScene.icon }}</span>
        <span class="scene-name">{{ houseScene.name }}</span>
      </button>

      <!-- 当前选中的 2D 场景展示 -->
      <button
        v-if="activeScene && activeScene.id !== 'house_3d'"
        class="scene-tab-btn active current-focus-pill"
        @click="isModalOpen = true"
      >
        <span class="scene-icon">{{ activeScene.icon }}</span>
        <span class="scene-name">{{ activeScene.name }}</span>
      </button>

      <!-- 核心“换场景”大按钮 -->
      <button class="switch-scene-btn" @click="openModal">
        <span class="btn-icon">🧭</span>
        <span class="btn-text">全部实景 ({{ scenes.length }})</span>
      </button>

      <!-- 考考眼力 / 全厝大闯关 -->
      <button 
        class="quiz-launch-btn"
        :class="{ 'grand-btn': activeSceneId === 'house_3d' }"
        @click="handleLaunchQuiz"
      >
        <span class="btn-icon">{{ activeSceneId === 'house_3d' ? '🏮' : '🍵' }}</span>
        <span class="btn-text">{{ activeSceneId === 'house_3d' ? '全厝大闯关' : '考考眼力' }}</span>
      </button>

      <!-- 每日晨茶温故 -->
      <button 
        class="daily-quiz-btn"
        :class="{ 'has-due': dailyStatus.hasDue }"
        :title="dailyStatus.hasDue ? `今日有 ${dailyStatus.dueCount} 个字待温故` : '每日晨茶温故'"
        @click="handleLaunchDailyQuiz"
      >
        <span class="btn-icon">🌅</span>
        <span class="btn-text">晨茶温故</span>
        <span v-if="dailyStatus.hasDue" class="due-dot">{{ dailyStatus.dueCount }}</span>
      </button>

      <!-- 识字金榜（学习记录档案） -->
      <button class="progress-launch-btn" @click="handleLaunchProgress">
        <span class="btn-icon">📜</span>
        <span class="btn-text">识字金榜</span>
      </button>

      <!-- 字体对比 -->
      <a href="/font_preview.html" class="font-preview-link">
        <span>🔤</span>
        <span>字体对比</span>
      </a>
    </div>

    <!-- 适老生活实景选择大抽屉模态框 -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="scene-modal-backdrop" @click.self="isModalOpen = false">
        <div class="scene-modal-dialog">
          <!-- 弹窗顶栏 -->
          <div class="modal-header">
            <div class="modal-title-box">
              <span class="modal-title-icon">🏮</span>
              <h2 class="modal-title">潮汕生活实景识字 · 选择场景</h2>
            </div>
            <button class="modal-close-btn" @click="isModalOpen = false">
              <span>✕ 关闭</span>
            </button>
          </div>

          <!-- 两个全局测评快捷横幅：全厝大闯关 & 每日晨茶温故 -->
          <div class="modal-quiz-hero-row">
            <div class="modal-quiz-card grand-quiz-card" @click="handleLaunchGlobalQuiz">
              <div class="quiz-card-badge">跨场景盲盒</div>
              <div class="quiz-card-icon">🏮</div>
              <div class="quiz-card-info">
                <div class="quiz-card-title">全厝综合大闯关 (6题)</div>
                <div class="quiz-card-desc">走亲串门连过数关 · 冲泡 2 巡工夫茶争夺探花扁</div>
              </div>
              <div class="quiz-card-action">去闯关 ➔</div>
            </div>

            <div class="modal-quiz-card daily-quiz-card" @click="handleLaunchDailyQuiz">
              <div class="quiz-card-badge daily-badge">记忆曲线</div>
              <div class="quiz-card-icon">🌅</div>
              <div class="quiz-card-info">
                <div class="quiz-card-title">
                  今日晨茶温故 
                  <span v-if="dailyStatus.hasDue" class="due-chip">待冲泡 {{ dailyStatus.dueCount }} 字</span>
                </div>
                <div class="quiz-card-desc">艾宾浩斯智能调度 · 科学巩固易忘与薄弱字</div>
              </div>
              <div class="quiz-card-action">冲晨茶 ➔</div>
            </div>
          </div>

          <p class="modal-subtitle">或者点哪一个生活实景，就带您去哪里摸物识字：</p>

          <!-- 场景分组卡片网格 -->
          <div class="modal-scenes-grid">
            <div
              v-for="scene in scenes"
              :key="scene.id"
              class="scene-category-card"
              :class="{ 'active-card': activeSceneId === scene.id, 'highlight-3d': scene.id === 'house_3d' }"
              @click="handleSelect(scene.id)"
            >
              <div class="card-icon-large">{{ scene.icon }}</div>
              <div class="card-text-group">
                <div class="card-main-title">
                  {{ scene.name }}
                  <span v-if="scene.id === 'house_3d'" class="badge-3d">3D实景</span>
                </div>
                <div class="card-sub-title">{{ scene.subtitle }}</div>
                <div class="card-count-tag">
                  {{ Object.keys(scene.words).length }} 个生活字
                </div>
              </div>
              <div v-if="activeSceneId === scene.id" class="current-check-mark">
                ✓
              </div>
            </div>
          </div>

          <!-- 底部快速指引 -->
          <div class="modal-footer-hint">
            <span>💡 提示：所有场景均包含地道潮汕话发音、书法笔画演示与手指大字描红</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { SceneConfig } from '../../types/literacy';
import { audioService } from '../../services/audioService';
import { progressStorage } from '../../services/progressStorage';

const props = defineProps<{
  scenes: SceneConfig[];
  activeSceneId: string;
}>();

const emit = defineEmits<{
  (e: 'change-scene', sceneId: string): void;
  (e: 'open-quiz', mode?: 'scene' | 'global' | 'daily_review'): void;
  (e: 'open-progress'): void;
}>();

const isModalOpen = ref(false);

const activeScene = computed(() => {
  return props.scenes.find(s => s.id === props.activeSceneId) || props.scenes[0];
});

const houseScene = computed(() => {
  return props.scenes.find(s => s.id === 'house_3d');
});

const dailyStatus = computed(() => {
  return progressStorage.getDailyReviewStatus();
});

const openModal = () => {
  audioService.playCupClink();
  isModalOpen.value = true;
};

const handleLaunchQuiz = () => {
  audioService.playCupClink();
  const mode = props.activeSceneId === 'house_3d' ? 'global' : 'scene';
  emit('open-quiz', mode);
};

const handleLaunchGlobalQuiz = () => {
  audioService.playCupClink();
  isModalOpen.value = false;
  emit('open-quiz', 'global');
};

const handleLaunchDailyQuiz = () => {
  audioService.playCupClink();
  isModalOpen.value = false;
  emit('open-quiz', 'daily_review');
};

const handleLaunchProgress = () => {
  audioService.playCupClink();
  emit('open-progress');
};

const handleSelect = (sceneId: string) => {
  audioService.playCupClink();
  emit('change-scene', sceneId);
  isModalOpen.value = false;
};
</script>

<style scoped>
.scene-selector-wrapper {
  position: absolute;
  top: 14px;
  left: 18px;
  z-index: 40;
}

.scene-selector-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.55);
  padding: 4px 10px;
  border-radius: 24px;
  border: 1px solid rgba(255, 215, 0, 0.35);
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}

.scene-tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #D7CCC8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 38px;
}

.scene-tab-btn.active {
  background: #FFB300;
  border-color: #FFE082;
  color: #21150F;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.scene-icon {
  font-size: 16px;
}

/* 换场景核心大按钮 */
.switch-scene-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, #FFB300 0%, #FF8F00 100%);
  border: 1px solid #FFE082;
  color: #21150F;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(255, 179, 0, 0.4);
  min-height: 38px;
}

.switch-scene-btn:active {
  transform: scale(0.96);
}

/* 考考眼力与识字金榜快捷入口按钮 */
.quiz-launch-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 18px;
  background: linear-gradient(135deg, #B71C1C 0%, #7F0000 100%);
  border: 1.5px solid #FFD54F;
  color: #FFF8E1;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(183, 28, 28, 0.4);
  min-height: 38px;
  touch-action: manipulation;
}

.quiz-launch-btn:active {
  transform: scale(0.96);
}

.progress-launch-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 18px;
  background: rgba(50, 32, 20, 0.9);
  border: 1.5px solid #FFD54F;
  color: #FFE082;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 38px;
  touch-action: manipulation;
}

.progress-launch-btn:active {
  transform: scale(0.96);
}

.btn-icon {
  font-size: 16px;
}

.font-preview-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 18px;
  background: rgba(255, 215, 0, 0.12);
  border: 1px solid rgba(255, 215, 0, 0.35);
  color: #FFE082;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  min-height: 38px;
}

/* ================= 适老模态大弹窗 ================= */
.scene-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  padding: 20px;
}

.scene-modal-dialog {
  background: #211915;
  border: 2px solid #FFB300;
  border-radius: 24px;
  width: 100%;
  max-width: 920px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 179, 0, 0.2);
  overflow: hidden;
  padding: 24px;
  box-sizing: border-box;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  padding-bottom: 16px;
}

.modal-title-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-title-icon {
  font-size: 32px;
}

.modal-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #FFF8E1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.modal-close-btn {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #FFF8E1;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}

.modal-close-btn:active {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(0.96);
}

.modal-subtitle {
  margin: 12px 0 16px 0;
  font-size: 15px;
  color: #D7CCC8;
}

/* 场景大卡片网格 */
.modal-scenes-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  overflow-y: auto;
  padding-right: 6px;
  max-height: 58vh;
}

.scene-category-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 215, 0, 0.25);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 80px;
}

.scene-category-card:active {
  transform: scale(0.97);
  background: rgba(255, 179, 0, 0.15);
  border-color: #FFB300;
}

.scene-category-card.highlight-3d {
  background: linear-gradient(135deg, rgba(255, 179, 0, 0.2) 0%, rgba(33, 21, 15, 0.6) 100%);
  border-color: #FFD54F;
  border-width: 2.5px;
}

.scene-category-card.active-card {
  background: linear-gradient(135deg, rgba(255, 179, 0, 0.3) 0%, rgba(40, 25, 18, 0.8) 100%);
  border-color: #FFB300;
  box-shadow: 0 4px 16px rgba(255, 179, 0, 0.35);
}

.card-icon-large {
  font-size: 38px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
}

.card-text-group {
  flex: 1;
}

.card-main-title {
  font-size: 18px;
  font-weight: bold;
  color: #FFF8E1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.badge-3d {
  font-size: 11px;
  background: #FF6F00;
  color: #FFF;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: normal;
}

.card-sub-title {
  font-size: 13px;
  color: #B0BEC5;
  margin-top: 2px;
}

.card-count-tag {
  font-size: 12px;
  color: #FFD54F;
  margin-top: 4px;
}

.current-check-mark {
  font-size: 22px;
  font-weight: bold;
  color: #FFB300;
}

.modal-footer-hint {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 13px;
  color: #A1887F;
}

/* 全厝大闯关金顶高亮 */
.quiz-launch-btn.grand-btn {
  background: linear-gradient(135deg, #FF6F00 0%, #D84315 100%);
  border-color: #FFE082;
  box-shadow: 0 2px 12px rgba(255, 111, 0, 0.5);
}

/* 每日晨茶温故按钮 */
.daily-quiz-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 18px;
  background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
  border: 1.5px solid #A5D6A7;
  color: #E8F5E9;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(46, 125, 50, 0.4);
  min-height: 38px;
  touch-action: manipulation;
}

.daily-quiz-btn:active {
  transform: scale(0.96);
}

.daily-quiz-btn.has-due {
  border-color: #FFD54F;
}

.due-dot {
  background: #FFD54F;
  color: #21150F;
  font-size: 11px;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 10px;
  margin-left: 2px;
}

/* 模态框内的两大推荐测评横幅 */
.modal-quiz-hero-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 14px;
}

.modal-quiz-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  user-select: none;
}

.grand-quiz-card {
  background: linear-gradient(135deg, rgba(183, 28, 28, 0.85) 0%, rgba(127, 0, 0, 0.95) 100%);
  border: 1.5px solid #FFD54F;
}

.daily-quiz-card {
  background: linear-gradient(135deg, rgba(46, 125, 50, 0.85) 0%, rgba(27, 94, 32, 0.95) 100%);
  border: 1.5px solid #81C784;
}

.modal-quiz-card:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
}

.modal-quiz-card:active {
  transform: scale(0.98);
}

.quiz-card-badge {
  position: absolute;
  top: 6px;
  right: 10px;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 8px;
  background: rgba(255, 215, 0, 0.25);
  color: #FFE082;
  border: 1px solid rgba(255, 215, 0, 0.4);
}

.daily-badge {
  background: rgba(200, 230, 201, 0.25);
  color: #C8E6C9;
  border-color: rgba(200, 230, 201, 0.4);
}

.quiz-card-icon {
  font-size: 26px;
  flex-shrink: 0;
}

.quiz-card-info {
  flex: 1;
  min-width: 0;
}

.quiz-card-title {
  font-size: 15px;
  font-weight: bold;
  color: #FFF8E1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.due-chip {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 8px;
  background: #FFD54F;
  color: #21150F;
  font-weight: bold;
}

.quiz-card-desc {
  font-size: 12px;
  color: #FFE082;
  opacity: 0.9;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quiz-card-action {
  font-size: 13px;
  font-weight: bold;
  color: #FFD54F;
  flex-shrink: 0;
  padding-left: 2px;
}
</style>
