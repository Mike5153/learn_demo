<template>
  <div class="progress-modal-backdrop" @click.self="handleClose">
    <div class="progress-modal-container">
      <!-- 顶栏：标题、关闭按钮、3项核心图腾概览 -->
      <div class="modal-top-bar">
        <button class="modal-back-btn" @click="handleClose">
          <span>🍵</span>
          <span>返回</span>
        </button>

        <div class="modal-main-title">
          <span>📜</span>
          <span>厝内识字金榜与工夫茶档</span>
        </div>

        <!-- 3项生活图腾概览 -->
        <div class="top-stat-badges">
          <div class="stat-pill tea-pill" title="累计冲泡工夫茶巡数">
            <span class="pill-icon">🍵</span>
            <span class="pill-val">{{ overall.totalTeaRounds }} 巡茶</span>
          </div>
          <div class="stat-pill word-pill" title="已熟练掌握的生活字">
            <span class="pill-icon">✨</span>
            <span class="pill-val">{{ overall.totalMasteredWords }} / 144 字</span>
          </div>
          <div class="stat-pill badge-pill" title="已点亮民俗勋章">
            <span class="pill-icon">🥟</span>
            <span class="pill-val">{{ overall.unlockedBadgeIds.length }} / {{ SCENE_BADGES.length }} 阁</span>
          </div>
        </div>
      </div>

      <!-- 晚辈关怀家庭导读卡（可收起展开） -->
      <div class="family-guide-bar">
        <div class="guide-lead-text">
          <span>👨‍👩‍👧 <strong>晚辈导读</strong>：阿公阿婆已坚持温故 <strong>{{ overall.streakDays }}</strong> 天，累计掌握 <strong>{{ overall.totalMasteredWords }}</strong> 个生活汉字。</span>
        </div>
        <div class="guide-action-tip">
          💡 闲暇时指着真实物件多考考长辈，常夸奖老人家！
        </div>
      </div>

      <!-- 标签导航栏（金榜图鉴 / 测验流水 / 民俗勋章） -->
      <div class="tab-nav-bar">
        <button 
          class="tab-btn" 
          :class="{ 'active': activeTab === 'char_wall' }"
          @click="switchTab('char_wall')"
        >
          ✨ 生活字迹金榜
        </button>
        <button 
          class="tab-btn" 
          :class="{ 'active': activeTab === 'quiz_logs' }"
          @click="switchTab('quiz_logs')"
        >
          📜 测验温故流水 ({{ quizLogs.length }})
        </button>
        <button 
          class="tab-btn" 
          :class="{ 'active': activeTab === 'badges' }"
          @click="switchTab('badges')"
        >
          🥟 民俗勋章阁 ({{ overall.unlockedBadgeIds.length }}/11)
        </button>
      </div>

      <!-- ================= TAB 1: 生活字迹金榜（大字有声图鉴） ================= -->
      <div v-if="activeTab === 'char_wall'" class="tab-content char-wall-content">
        <!-- 场景筛选器 -->
        <div class="scene-filter-chips">
          <button 
            class="filter-chip"
            :class="{ 'active': selectedSceneFilter === 'all' }"
            @click="selectedSceneFilter = 'all'"
          >
            全部生活字 ({{ allWordsList.length }})
          </button>
          <button
            v-for="scene in scenesList"
            :key="scene.id"
            class="filter-chip"
            :class="{ 'active': selectedSceneFilter === scene.id }"
            @click="selectedSceneFilter = scene.id"
          >
            {{ scene.icon }} {{ scene.name }}
          </button>
        </div>

        <!-- 144 字可点图鉴网格 -->
        <div class="char-grid-scroll-box">
          <div class="char-cards-grid">
            <div
              v-for="w in filteredWordsList"
              :key="w.id"
              class="char-display-card"
              :class="getCharCardClass(w.id)"
              @click="inspectWord(w)"
            >
              <div class="card-char-symbol">{{ w.character }}</div>
              <div class="card-bottom-pill">
                <span class="card-trigger-name">{{ w.triggerName }}</span>
                <span v-if="getMasteryLevel(w.id) >= 2" class="gold-sparkle">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= TAB 2: 测验温故流水 ================= -->
      <div v-else-if="activeTab === 'quiz_logs'" class="tab-content logs-content">
        <div v-if="quizLogs.length === 0" class="empty-logs-view">
          <div class="empty-icon">🍵</div>
          <div class="empty-text">今日暂无温故测验记录</div>
          <div class="empty-sub">点击主界面的“🍵 考考眼力”，冲泡第一巡工夫茶吧！</div>
        </div>

        <div v-else class="logs-scroll-list">
          <div 
            v-for="log in quizLogs" 
            :key="log.id" 
            class="quiz-log-card"
          >
            <div class="log-card-left">
              <div class="log-time-tag">{{ formatLogTime(log.timestamp) }}</div>
              <div class="log-scene-badge">
                <span>{{ getSceneIcon(log.sceneId) }}</span>
                <span>{{ log.sceneName }}</span>
              </div>
            </div>

            <div class="log-card-center">
              <div class="log-cups-row">
                <span v-for="c in log.cupsEarned" :key="c" class="log-cup-icon">🍵</span>
                <span class="log-score-text">答对 {{ log.correctCount }} / {{ log.totalQuestions }} 题</span>
              </div>
              <div class="log-words-chips">
                <span v-for="wId in log.testedWordIds" :key="wId" class="log-word-tag">
                  {{ getWordChar(wId) }}
                </span>
              </div>
            </div>

            <div v-if="log.newBadgeUnlocked" class="log-card-right">
              <div class="log-badge-pill">
                <span>🏆</span>
                <span>点亮: {{ log.newBadgeUnlocked }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= TAB 3: 民俗勋章阁 ================= -->
      <div v-else-if="activeTab === 'badges'" class="tab-content badges-content">
        <div class="badges-grid-scroll">
          <div class="badges-gallery-grid">
            <div
              v-for="b in SCENE_BADGES"
              :key="b.id"
              class="badge-item-card"
              :class="{ 'is-unlocked': overall.unlockedBadgeIds.includes(b.id) }"
            >
              <div class="badge-card-icon">
                <span v-if="overall.unlockedBadgeIds.includes(b.id)">{{ b.icon }}</span>
                <span v-else class="locked-icon">🔒</span>
              </div>
              <div class="badge-card-name">{{ b.name }}</div>
              <div class="badge-card-desc">{{ b.description }}</div>
              <div class="badge-card-status">
                <span v-if="overall.unlockedBadgeIds.includes(b.id)" class="status-yes">✨ 已点亮</span>
                <span v-else class="status-no">{{ b.requirement }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= 弹层：单字详情高清画册与重播 ================= -->
      <div v-if="inspectedWord" class="word-inspect-overlay" @click.self="inspectedWord = null">
        <div class="word-inspect-card">
          <button class="inspect-close-btn" @click="inspectedWord = null">✕</button>

          <div class="inspect-photo-box" @click="playInspectedAudio">
            <img 
              v-if="inspectedWord.imageUrl && !inspectImgError" 
              :src="inspectedWord.imageUrl" 
              :alt="inspectedWord.triggerName"
              class="inspect-real-img"
              @error="inspectImgError = true"
            />
            <div v-else class="inspect-fallback-emblem">
              {{ getItemEmblem(inspectedWord.id) }}
            </div>
            <div class="inspect-tap-audio-pill">
              <span>🔊 点图重听潮音</span>
            </div>
          </div>

          <div class="inspect-info-group">
            <div class="inspect-char-title">
              {{ inspectedWord.character }}
            </div>
            <div class="inspect-name-tag">
              生活物品: <strong>{{ inspectedWord.triggerName }}</strong>
            </div>

            <div class="inspect-phonetics-row">
              <span class="inspect-ipa">潮音: {{ inspectedWord.teochewIPA }}</span>
              <span class="inspect-pinyin">国语: {{ inspectedWord.pinyin }}</span>
            </div>

            <!-- 掌握状态印章 -->
            <div class="inspect-mastery-status">
              <template v-if="getMasteryLevel(inspectedWord.id) === 3">
                <span class="stamp-gold">✨ 精通大功告成 (金榜题名)</span>
              </template>
              <template v-else-if="getMasteryLevel(inspectedWord.id) === 2">
                <span class="stamp-silver">🍵 熟练掌握 (已泡好茶)</span>
              </template>
              <template v-else-if="getMasteryLevel(inspectedWord.id) === 1">
                <span class="stamp-bronze">🌱 初识练习过</span>
              </template>
              <template v-else>
                <span class="stamp-empty">待临摹学习</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { WordItem, SceneConfig } from '../../types/literacy';
import type { OverallLearningProgress, QuizSessionRecord, WordProgress } from '../../types/quiz';
import { progressStorage, SCENE_BADGES } from '../../services/progressStorage';
import { getAllScenes } from '../../data';
import { audioService } from '../../services/audioService';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const activeTab = ref<'char_wall' | 'quiz_logs' | 'badges'>('char_wall');
const selectedSceneFilter = ref<string>('all');
const inspectedWord = ref<WordItem | null>(null);
const inspectImgError = ref<boolean>(false);

const overall = ref<OverallLearningProgress>(progressStorage.getOverallProgress());
const wordProgressMap = ref<Record<string, WordProgress>>(progressStorage.getWordProgressMap());
const quizLogs = ref<QuizSessionRecord[]>(progressStorage.getQuizLogs());

const scenesList = computed<SceneConfig[]>(() => {
  return getAllScenes().filter(s => s.id !== 'house_3d');
});

const allWordsList = computed<WordItem[]>(() => {
  const map = new Map<string, WordItem>();
  scenesList.value.forEach(scene => {
    Object.values(scene.words).forEach(w => {
      if (!map.has(w.id)) {
        map.set(w.id, w);
      }
    });
  });
  return Array.from(map.values());
});

const filteredWordsList = computed<WordItem[]>(() => {
  if (selectedSceneFilter.value === 'all') {
    return allWordsList.value;
  }
  const targetScene = scenesList.value.find(s => s.id === selectedSceneFilter.value);
  return targetScene ? Object.values(targetScene.words) : [];
});

const getMasteryLevel = (wordId: string): number => {
  return wordProgressMap.value[wordId]?.level ?? 0;
};

const getCharCardClass = (wordId: string): Record<string, boolean> => {
  const lvl = getMasteryLevel(wordId);
  return {
    'level-mastered': lvl === 3,
    'level-proficient': lvl === 2,
    'level-learned': lvl === 1,
    'level-untouched': lvl === 0
  };
};

const switchTab = (tab: 'char_wall' | 'quiz_logs' | 'badges') => {
  activeTab.value = tab;
  audioService.playCupClink();
};

const inspectWord = (word: WordItem) => {
  inspectedWord.value = word;
  inspectImgError.value = false;
  playInspectedAudio();
};

const playInspectedAudio = () => {
  if (!inspectedWord.value) return;
  audioService.playCupClink();
  if (inspectedWord.value.teochewAudio) {
    audioService.playTeochewAudio(inspectedWord.value.teochewAudio);
  }
};

const formatLogTime = (ts: number): string => {
  const d = new Date(ts);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const timeStr = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return isToday ? `今日 ${timeStr}` : `${d.getMonth() + 1}月${d.getDate()}日 ${timeStr}`;
};

const getSceneIcon = (sceneId: string): string => {
  const target = scenesList.value.find(s => s.id === sceneId);
  return target?.icon || '🍵';
};

const getWordChar = (wordId: string): string => {
  const found = allWordsList.value.find(w => w.id === wordId);
  return found?.character || '字';
};

const getItemEmblem = (id: string): string => {
  const map: Record<string, string> = {
    tea: '🍵', water: '💧', cup: '🍶', fire: '🔥', leaf: '🍃', sweet: '🫒', tray: '🪵',
    wok: '🍳', steam: '♨️', knife: '🔪', slice: '🪵', rice: '🍚', stirfry: '🥗', bowl: '🥣',
    guo: '🥟', mold: '🪵', red: '🔴', sugar: '🍬', bed: '🛏️', door: '🚪', incense: '🕯️'
  };
  return map[id] || '✨';
};

const handleClose = () => {
  audioService.stopAllAudio();
  audioService.playWaterDrip();
  emit('close');
};

onMounted(() => {
  overall.value = progressStorage.refreshOverallProgress();
  wordProgressMap.value = progressStorage.getWordProgressMap();
  quizLogs.value = progressStorage.getQuizLogs();
});
</script>

<style scoped>
.progress-modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 10, 8, 0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.progress-modal-container {
  width: 94%;
  max-width: 960px;
  height: 92%;
  max-height: 680px;
  background: linear-gradient(145deg, #241710, #140C07);
  border: 2.5px solid #D4AF37;
  border-radius: 28px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

/* 顶栏 */
.modal-top-bar {
  height: 62px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1.5px solid rgba(255, 215, 0, 0.25);
  background: rgba(0, 0, 0, 0.35);
}

.modal-back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: rgba(124, 83, 53, 0.9);
  border: 2px solid #d4af37;
  border-radius: 16px;
  color: #FFE082;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.modal-main-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: bold;
  color: #FFE082;
  letter-spacing: 1px;
}

.top-stat-badges {
  display: flex;
  gap: 8px;
}

.stat-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 14px;
  padding: 4px 10px;
  font-size: 13px;
  color: #FFF8E1;
  font-weight: bold;
}

.pill-icon {
  font-size: 16px;
}

/* 晚辈导读条 */
.family-guide-bar {
  background: rgba(60, 36, 20, 0.6);
  border-bottom: 1px solid rgba(255, 215, 0, 0.15);
  padding: 6px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #FFE082;
}

.guide-action-tip {
  color: #B2DFDB;
}

/* 标签导航栏 */
.tab-nav-bar {
  display: flex;
  gap: 12px;
  padding: 8px 20px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.tab-btn {
  padding: 8px 18px;
  border-radius: 16px;
  background: rgba(50, 32, 20, 0.6);
  border: 1.5px solid rgba(255, 215, 0, 0.3);
  color: #D7CCC8;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: #B71C1C;
  border-color: #FFD54F;
  color: #FFF8E1;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.4);
}

/* Tab 内容区通用 */
.tab-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* Tab 1: 金榜大图鉴 */
.char-wall-content {
  padding: 10px 18px;
}

.scene-filter-chips {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}

.scene-filter-chips::-webkit-scrollbar {
  display: none;
}

.filter-chip {
  flex-shrink: 0;
  padding: 5px 12px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 215, 0, 0.25);
  color: #D7CCC8;
  font-size: 13px;
  cursor: pointer;
}

.filter-chip.active {
  background: #FFB300;
  color: #1a100a;
  border-color: #FFF;
  font-weight: bold;
}

.char-grid-scroll-box {
  flex: 1;
  overflow-y: auto;
  margin-top: 6px;
  padding-right: 6px;
  -webkit-overflow-scrolling: touch;
}

.char-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 12px;
  padding-bottom: 20px;
}

.char-display-card {
  height: 94px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  touch-action: manipulation;
  transition: transform 0.15s ease;
  position: relative;
}

.char-display-card:active {
  transform: scale(0.95);
}

.card-char-symbol {
  font-size: 38px;
  font-weight: bold;
  line-height: 1.1;
  font-family: "Yuanti SC", "YouYuan", "Hiragino Maru Gothic ProN", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.card-bottom-pill {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  margin-top: 2px;
}

/* 卡片等级样式 */
.char-display-card.level-mastered {
  background: linear-gradient(135deg, #7F0000, #B71C1C);
  border: 2px solid #FFD54F;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.5);
  color: #FFF59D;
}

.char-display-card.level-proficient {
  background: rgba(140, 70, 30, 0.85);
  border: 1.5px solid #FFCA28;
  color: #FFE082;
}

.char-display-card.level-learned {
  background: rgba(60, 40, 25, 0.7);
  border: 1.5px solid rgba(255, 215, 0, 0.35);
  color: #D7CCC8;
}

.char-display-card.level-untouched {
  background: rgba(30, 20, 15, 0.5);
  border: 1px dashed rgba(255, 215, 0, 0.2);
  color: #757575;
}

/* Tab 2: 测验流水 */
.logs-content {
  padding: 14px 20px;
}

.empty-logs-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #FFE082;
}

.empty-icon {
  font-size: 56px;
}

.empty-text {
  font-size: 20px;
  font-weight: bold;
}

.empty-sub {
  font-size: 14px;
  color: #D7CCC8;
}

.logs-scroll-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 6px;
  -webkit-overflow-scrolling: touch;
}

.quiz-log-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(45, 28, 18, 0.75);
  border: 1.5px solid rgba(255, 215, 0, 0.3);
  border-radius: 18px;
  padding: 12px 18px;
}

.log-card-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.log-time-tag {
  font-size: 12px;
  color: #BDBDBD;
}

.log-scene-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: bold;
  color: #FFE082;
}

.log-card-center {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.log-cups-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.log-cup-icon {
  font-size: 18px;
}

.log-score-text {
  font-size: 14px;
  font-weight: bold;
  color: #FFD54F;
  margin-left: 6px;
}

.log-words-chips {
  display: flex;
  gap: 6px;
}

.log-word-tag {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  padding: 1px 8px;
  font-size: 14px;
  color: #FFF8E1;
  font-weight: bold;
}

.log-badge-pill {
  background: rgba(183, 28, 28, 0.7);
  border: 1.5px solid #FFD54F;
  border-radius: 12px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: bold;
  color: #FFF8E1;
}

/* Tab 3: 民俗勋章阁 */
.badges-content {
  padding: 16px 20px;
}

.badges-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
  padding-bottom: 20px;
}

.badges-grid-scroll {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.badge-item-card {
  background: rgba(30, 18, 12, 0.7);
  border: 1.5px solid rgba(255, 215, 0, 0.25);
  border-radius: 20px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}

.badge-item-card.is-unlocked {
  background: linear-gradient(135deg, rgba(80, 20, 15, 0.8), rgba(40, 15, 10, 0.9));
  border-color: #FFD54F;
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.3);
}

.badge-card-icon {
  font-size: 44px;
  line-height: 1;
}

.locked-icon {
  opacity: 0.4;
  font-size: 32px;
}

.badge-card-name {
  font-size: 17px;
  font-weight: bold;
  color: #FFF8E1;
}

.badge-card-desc {
  font-size: 12px;
  color: #D7CCC8;
}

.status-yes {
  font-size: 12px;
  color: #FFD54F;
  font-weight: bold;
}

.status-no {
  font-size: 11px;
  color: #9E9E9E;
}

/* 单字详情高清画册弹层 */
.word-inspect-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
  animation: fadeIn 0.15s ease-out;
}

.word-inspect-card {
  position: relative;
  width: 380px;
  background: linear-gradient(145deg, #2D1B12, #170E09);
  border: 2px solid #FFD54F;
  border-radius: 24px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.85);
}

.inspect-close-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 215, 0, 0.4);
  color: #FFE082;
  font-size: 16px;
  cursor: pointer;
}

.inspect-photo-box {
  position: relative;
  width: 220px;
  height: 180px;
  background: radial-gradient(circle, rgba(80, 50, 30, 0.5) 0%, rgba(20, 10, 5, 0.8) 100%);
  border: 1.5px solid rgba(255, 215, 0, 0.35);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

.inspect-real-img {
  width: 100%;
  height: 100%;
  max-width: 170px;
  max-height: 140px;
  object-fit: contain;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.8));
}

.inspect-fallback-emblem {
  font-size: 72px;
}

.inspect-tap-audio-pill {
  position: absolute;
  bottom: 6px;
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 12px;
  padding: 2px 10px;
  font-size: 12px;
  color: #FFE082;
}

.inspect-info-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.inspect-char-title {
  font-size: 64px;
  font-weight: bold;
  color: #FFD54F;
  line-height: 1;
  font-family: "Yuanti SC", "YouYuan", "Hiragino Maru Gothic ProN", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.inspect-name-tag {
  font-size: 16px;
  color: #FFF8E1;
}

.inspect-phonetics-row {
  display: flex;
  gap: 10px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 14px;
}

.inspect-ipa {
  color: #FFD54F;
  font-weight: bold;
}

.inspect-pinyin {
  color: #B2DFDB;
}

.inspect-mastery-status {
  margin-top: 4px;
}

.stamp-gold {
  color: #FFD54F;
  font-weight: bold;
  font-size: 14px;
}

.stamp-silver {
  color: #FFE082;
  font-size: 13px;
}

.stamp-bronze {
  color: #D7CCC8;
  font-size: 13px;
}

.stamp-empty {
  color: #9E9E9E;
  font-size: 13px;
}
</style>
