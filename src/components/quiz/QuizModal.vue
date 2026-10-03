<template>
  <div class="quiz-modal-backdrop" @click.self="handleClose">
    <div class="quiz-modal-container">
      <!-- 顶栏：返回、场景标牌、3杯工夫茶进度 -->
      <div class="quiz-header">
        <button class="quiz-back-btn" @click="handleClose">
          <span>🍵</span>
          <span>返回</span>
        </button>

        <div class="quiz-scene-title">
          <span class="scene-icon">{{ displaySceneIcon }}</span>
          <span>{{ displaySceneTitle }}</span>
        </div>

        <!-- 工夫茶动态注入指示器（依据总题数显示3杯或6杯工夫茶） -->
        <div class="tea-cups-progress" :title="`已泡好 ${correctCount} 杯茶`">
          <div 
            v-for="cupIdx in (questions.length || 3)" 
            :key="cupIdx" 
            class="progress-cup"
            :class="{ 'cup-filled': cupIdx <= correctCount, 'cup-filling': cupIdx === correctCount + 1 && isAnswering }"
          >
            <span class="cup-icon">🍵</span>
            <span v-if="cupIdx <= correctCount" class="steam-vapour">♨️</span>
          </div>
        </div>
      </div>

      <!-- ================= 答题主视区 ================= -->
      <div v-if="!isCompleted && currentQuestion" class="quiz-body">
        <!-- 进度与关卡提示 -->
        <div class="question-progress-label">
          第 {{ currentIndex + 1 }} 题 / 共 {{ questions.length }} 题
        </div>

        <!-- A. 题型 1：听音选字 -->
        <div v-if="currentQuestion.type === 'audio_to_word'" class="quiz-question-type-audio">
          <button class="listen-audio-hero-btn" @click="playCurrentAudio">
            <span class="speaker-pulse-icon">🔊</span>
            <span class="hero-audio-text">点我听潮州正音</span>
            <span class="hero-ipa-pill">{{ currentQuestion.targetWord.teochewIPA }}</span>
          </button>
          <div class="audio-prompt-hint">
            👇 请看下底，哪一个是这个字？
          </div>
        </div>

        <!-- B. 题型 2：看图认字 -->
        <div v-else class="quiz-question-type-image">
          <div class="showcase-photo-frame" @click="playCurrentAudio">
            <img 
              v-if="currentQuestion.targetWord.imageUrl && !imageLoadFailed" 
              :src="currentQuestion.targetWord.imageUrl" 
              :alt="'生活实物'"
              class="target-real-img"
              @error="imageLoadFailed = true"
            />
            <div v-else class="target-emblem-fallback">
              {{ getItemEmblem(currentQuestion.targetWord.id) }}
            </div>
            <div class="item-name-chip">
              <span>{{ getMaskedTriggerName(currentQuestion.targetWord) }}</span>
              <span class="audio-tip">🔊 点图重听</span>
            </div>
          </div>
          <div class="image-prompt-hint">
            👇 这是生活中的什么字？
          </div>
        </div>

        <!-- 备选大字卡片列表 (2~3 项，超大触控靶心) -->
        <div class="quiz-options-container">
          <button
            v-for="(opt, optIdx) in currentQuestion.options"
            :key="opt.id"
            class="quiz-option-card"
            :class="{
              'is-correct': selectedOptionId === opt.id && opt.id === currentQuestion.targetWord.id,
              'is-wrong-wobble': wrongAttemptId === opt.id,
              'is-guided-hint': showGentleHint && opt.id === currentQuestion.targetWord.id
            }"
            @click="handleSelectOption(opt)"
          >
            <div class="option-char-display">{{ opt.character }}</div>
            <div class="option-phonetics-row">
              <span class="opt-ipa">{{ opt.teochewIPA }}</span>
              <span class="opt-pinyin">{{ opt.pinyin }}</span>
            </div>
          </button>
        </div>

        <!-- 温和引导文案（点错时提示，绝无倒计时、绝无红叉） -->
        <div class="gentle-hint-message" :class="{ 'visible': showGentleHint }">
          💡 试多一次，或者点上方喇叭再听听潮音~
        </div>
      </div>

      <!-- ================= 测验结算盛典视图 ================= -->
      <div v-else-if="isCompleted" class="quiz-celebration-body">
        <div class="celebration-hero-pot">🫖</div>
        <div class="celebration-tea-tray">
          <span v-for="i in Math.min(6, Math.max(3, correctCount))" :key="i" class="tray-cup">🍵</span>
        </div>
        
        <h2 class="celebration-title">
          {{ props.quizMode === 'global' ? '🏆 连过数关！全厝老秀才大功告成！' : '✨ 大功告成！冲好一巡工夫茶！' }}
        </h2>
        <p class="celebration-subtitle">
          阿公阿婆真老力！今日考眼力答对 <strong>{{ correctCount }}</strong> 题 (共 {{ questions.length }} 题)
        </p>

        <!-- 新解锁勋章横幅 -->
        <div v-if="unlockedBadge" class="new-badge-spotlight">
          <div class="badge-icon-spin">{{ unlockedBadge.icon }}</div>
          <div class="badge-text-group">
            <div class="badge-tag">🏆 恭喜点亮民俗勋章</div>
            <div class="badge-name">{{ unlockedBadge.name }}</div>
            <div class="badge-desc">{{ unlockedBadge.description }}</div>
          </div>
        </div>

        <!-- 结算操作按钮 -->
        <div class="celebration-actions">
          <button class="action-btn retry-btn" @click="handleRestartQuiz">
            🔄 再来一巡
          </button>
          <button class="action-btn progress-btn" @click="handleOpenProgress">
            📜 看识字金榜
          </button>
          <button class="action-btn back-scene-btn" @click="handleClose">
            🍵 返回生活实景
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type { WordItem } from '../../types/literacy';
import type { QuizQuestion, BadgeItem } from '../../types/quiz';
import { progressStorage } from '../../services/progressStorage';
import { audioService } from '../../services/audioService';

const props = withDefaults(defineProps<{
  sceneId: string;
  sceneName: string;
  sceneIcon?: string;
  quizMode?: 'scene' | 'global' | 'daily_review';
  questionCount?: number;
}>(), {
  quizMode: 'scene',
  questionCount: 3
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'open-progress'): void;
}>();

const displaySceneIcon = computed(() => {
  if (props.quizMode === 'global') return '🏮';
  if (props.quizMode === 'daily_review') return '🌅';
  return props.sceneIcon || '🍵';
});

const displaySceneTitle = computed(() => {
  if (props.quizMode === 'global') return '全厝大闯关 · 跨场景综合大考';
  if (props.quizMode === 'daily_review') return '今日晨茶 · 智能温故';
  return `${props.sceneName} · 考考眼力`;
});

const questions = ref<QuizQuestion[]>([]);
const currentIndex = ref<number>(0);
const correctCount = ref<number>(0);
const isCompleted = ref<boolean>(false);
const isAnswering = ref<boolean>(false);
const imageLoadFailed = ref<boolean>(false);

const selectedOptionId = ref<string | null>(null);
const wrongAttemptId = ref<string | null>(null);
const showGentleHint = ref<boolean>(false);
const unlockedBadge = ref<BadgeItem | null>(null);

let audioTimeoutId: number | null = null;
let nextQuestionTimeoutId: number | null = null;

const currentQuestion = computed<QuizQuestion | null>(() => {
  return questions.value[currentIndex.value] || null;
});

const startNewQuiz = () => {
  if (props.quizMode === 'global') {
    questions.value = progressStorage.generateGlobalGrandQuiz(props.questionCount || 6);
  } else if (props.quizMode === 'daily_review') {
    questions.value = progressStorage.generateDailyReviewQuestions(props.questionCount || 3);
  } else {
    questions.value = progressStorage.generateQuizQuestions(props.sceneId, props.questionCount || 3);
  }
  currentIndex.value = 0;
  correctCount.value = 0;
  isCompleted.value = false;
  isAnswering.value = false;
  selectedOptionId.value = null;
  wrongAttemptId.value = null;
  showGentleHint.value = false;
  unlockedBadge.value = null;
  imageLoadFailed.value = false;

  if (questions.value.length > 0) {
    playCurrentAudio(600);
  }
};

const playCurrentAudio = (delayMs = 0) => {
  if (audioTimeoutId) clearTimeout(audioTimeoutId);
  audioTimeoutId = window.setTimeout(() => {
    if (!currentQuestion.value?.targetWord) return;
    audioService.playCupClink();
    if (currentQuestion.value.targetWord.teochewAudio) {
      audioService.playTeochewAudio(currentQuestion.value.targetWord.teochewAudio);
    }
  }, delayMs);
};

const handleSelectOption = (opt: WordItem) => {
  if (isAnswering.value || !currentQuestion.value) return;

  const target = currentQuestion.value.targetWord;

  if (opt.id === target.id) {
    // 答对：茶盏碰杯 + 金光粒子 + 自动冲入一杯茶
    isAnswering.value = true;
    selectedOptionId.value = opt.id;
    wrongAttemptId.value = null;
    showGentleHint.value = false;
    correctCount.value++;

    audioService.playCupClink();
    audioService.playWaterDrip();
    progressStorage.recordWordQuizResult(target.id, true, target.character, props.sceneId);

    // 延迟 1.2 秒平滑步入下一题或结算
    nextQuestionTimeoutId = window.setTimeout(() => {
      if (currentIndex.value + 1 < questions.value.length) {
        currentIndex.value++;
        selectedOptionId.value = null;
        isAnswering.value = false;
        imageLoadFailed.value = false;
        playCurrentAudio(500);
      } else {
        finishQuiz();
      }
    }, 1200);
  } else {
    // 点错：零红叉、零刺耳报警！轻微震动 + 播放轻柔水滴声 + 开启金色引导微光
    wrongAttemptId.value = opt.id;
    audioService.playWaterDrip();
    showGentleHint.value = true;

    progressStorage.recordWordQuizResult(target.id, false, target.character, props.sceneId);

    setTimeout(() => {
      wrongAttemptId.value = null;
    }, 500);
  }
};

const finishQuiz = () => {
  isCompleted.value = true;
  isAnswering.value = false;
  audioService.playSuccessChime();

  const testedWordIds = questions.value.map(q => q.targetWord.id);
  const effectiveSceneId = props.quizMode === 'daily_review'
    ? 'daily_review'
    : (props.quizMode === 'global' ? 'house_3d' : props.sceneId);
  const effectiveSceneName = props.quizMode === 'daily_review'
    ? '今日晨茶温故'
    : (props.quizMode === 'global' ? '全厝综合大闯关' : props.sceneName);

  const result = progressStorage.recordQuizSession(
    effectiveSceneId,
    effectiveSceneName,
    questions.value.length,
    correctCount.value,
    testedWordIds
  );

  if (result.newBadge) {
    unlockedBadge.value = result.newBadge;
  }
};

const handleRestartQuiz = () => {
  audioService.playCupClink();
  startNewQuiz();
};

const handleOpenProgress = () => {
  audioService.playCupClink();
  emit('open-progress');
};

const handleClose = () => {
  audioService.stopAllAudio();
  audioService.playWaterDrip();
  emit('close');
};

const getItemEmblem = (id: string): string => {
  const map: Record<string, string> = {
    tea: '🍵', water: '💧', cup: '🍶', fire: '🔥', leaf: '🍃', sweet: '🫒', tray: '🪵',
    wok: '🍳', steam: '♨️', knife: '🔪', slice: '🪵', rice: '🍚', stirfry: '🥗', bowl: '🥣',
    guo: '🥟', mold: '🪵', red: '🔴', sugar: '🍬', bed: '🛏️', door: '🚪', incense: '🕯️'
  };
  return map[id] || '✨';
};

// 测验看图认字中掩膜目标汉字，答对后揭晓全名
const getMaskedTriggerName = (word: WordItem): string => {
  if (selectedOptionId.value === word.id) {
    return `${word.triggerName} ✨`;
  }
  const char = word.character;
  const name = word.triggerName;
  if (name.includes(char)) {
    return name.replaceAll(char, '（ ❓ ）');
  }
  return `${name} · （ ❓ ）`;
};

watch(
  () => props.sceneId,
  () => {
    startNewQuiz();
  }
);

onMounted(() => {
  startNewQuiz();
});

onUnmounted(() => {
  if (audioTimeoutId) clearTimeout(audioTimeoutId);
  if (nextQuestionTimeoutId) clearTimeout(nextQuestionTimeoutId);
  audioService.stopAllAudio();
});
</script>

<style scoped>
.quiz-modal-backdrop {
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
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.quiz-modal-container {
  width: 92%;
  max-width: 920px;
  height: 90%;
  max-height: 660px;
  background: linear-gradient(145deg, #2A1A12, #180F0A);
  border: 2.5px solid #D4AF37;
  border-radius: 28px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

/* 顶栏 */
.quiz-header {
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1.5px solid rgba(255, 215, 0, 0.25);
  background: rgba(0, 0, 0, 0.3);
}

.quiz-back-btn {
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
  touch-action: manipulation;
}

.quiz-scene-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: bold;
  color: #FFE082;
  letter-spacing: 1px;
}

.tea-cups-progress {
  display: flex;
  gap: 10px;
  align-items: center;
}

.progress-cup {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(60, 40, 25, 0.7);
  border: 1.5px solid rgba(255, 215, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  opacity: 0.45;
  transition: all 0.3s ease;
}

.progress-cup.cup-filled {
  opacity: 1;
  background: #B71C1C;
  border-color: #FFD54F;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
  transform: scale(1.1);
}

.steam-vapour {
  position: absolute;
  top: -14px;
  font-size: 14px;
  animation: steamRise 1.2s ease-in-out infinite alternate;
}

@keyframes steamRise {
  from { transform: translateY(0) scale(0.9); opacity: 0.6; }
  to { transform: translateY(-4px) scale(1.1); opacity: 1; }
}

/* 答题主体区 */
.quiz-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 12px 24px;
  box-sizing: border-box;
}

.question-progress-label {
  font-size: 14px;
  color: #FFD54F;
  background: rgba(0, 0, 0, 0.4);
  padding: 3px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 215, 0, 0.2);
}

/* 听音题目区 */
.quiz-question-type-audio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.listen-audio-hero-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #B71C1C, #7F0000);
  border: 2.5px solid #FFD54F;
  border-radius: 36px;
  padding: 14px 32px;
  color: #FFF8E1;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
  touch-action: manipulation;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.listen-audio-hero-btn:active {
  transform: scale(0.96);
}

.speaker-pulse-icon {
  font-size: 32px;
  animation: pulseSpeaker 1.4s ease-in-out infinite;
}

@keyframes pulseSpeaker {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.25); }
}

.hero-audio-text {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
}

.hero-ipa-pill {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 215, 0, 0.4);
  border-radius: 14px;
  padding: 3px 10px;
  font-size: 18px;
  color: #FFE082;
}

.audio-prompt-hint, .image-prompt-hint {
  font-size: 18px;
  color: #FFE082;
  font-weight: 500;
  letter-spacing: 1px;
}

/* 看图题目区 */
.quiz-question-type-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.showcase-photo-frame {
  position: relative;
  width: 220px;
  height: 180px;
  background: radial-gradient(circle at center, rgba(80, 50, 30, 0.6) 0%, rgba(20, 10, 5, 0.85) 100%);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.7);
}

.target-real-img {
  width: 100%;
  height: 100%;
  max-width: 170px;
  max-height: 140px;
  object-fit: contain;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.8));
}

.target-emblem-fallback {
  font-size: 80px;
  line-height: 1;
}

.item-name-chip {
  position: absolute;
  bottom: 6px;
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 12px;
  padding: 2px 10px;
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  color: #FFE082;
  font-weight: bold;
}

.audio-tip {
  font-size: 12px;
  color: #B2DFDB;
}

/* 备选大字卡片容器 */
.quiz-options-container {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 6px;
}

.quiz-option-card {
  flex: 1;
  max-width: 230px;
  min-height: 150px;
  background: rgba(45, 28, 18, 0.85);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 22px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  cursor: pointer;
  touch-action: manipulation;
  transition: transform 0.15s ease, border-color 0.2s ease, background 0.2s ease;
}

.quiz-option-card:hover {
  border-color: rgba(255, 215, 0, 0.8);
}

.quiz-option-card:active {
  transform: scale(0.96);
}

.quiz-option-card.is-correct {
  background: #E65100;
  border-color: #FFF;
  box-shadow: 0 0 24px rgba(255, 215, 0, 0.9);
  transform: scale(1.05);
}

.quiz-option-card.is-wrong-wobble {
  animation: wobbleShake 0.4s ease;
  border-color: #8D6E63;
}

@keyframes wobbleShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

.quiz-option-card.is-guided-hint {
  border-color: #FFD54F;
  box-shadow: 0 0 16px rgba(255, 215, 0, 0.7);
  animation: hintBlink 1.2s ease-in-out infinite alternate;
}

@keyframes hintBlink {
  from { opacity: 0.85; }
  to { opacity: 1; transform: scale(1.02); }
}

.option-char-display {
  font-size: 64px;
  font-weight: bold;
  color: #FFD54F;
  line-height: 1.1;
  font-family: "Yuanti SC", "YouYuan", "Hiragino Maru Gothic ProN", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.option-phonetics-row {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 6px;
}

.opt-ipa {
  font-size: 16px;
  color: #FFE082;
}

.opt-pinyin {
  font-size: 14px;
  color: #B2DFDB;
}

.gentle-hint-message {
  font-size: 15px;
  color: #FFE082;
  opacity: 0;
  transition: opacity 0.3s ease;
  min-height: 22px;
}

.gentle-hint-message.visible {
  opacity: 1;
}

/* 结算盛典视图 */
.quiz-celebration-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  text-align: center;
}

.celebration-hero-pot {
  font-size: 72px;
  line-height: 1;
  animation: potPour 1.5s ease-in-out infinite alternate;
}

@keyframes potPour {
  from { transform: rotate(0deg); }
  to { transform: rotate(-10deg) translateY(-4px); }
}

.celebration-tea-tray {
  display: flex;
  gap: 16px;
}

.tray-cup {
  font-size: 38px;
  filter: drop-shadow(0 4px 10px rgba(255, 215, 0, 0.5));
}

.celebration-title {
  font-size: 28px;
  font-weight: bold;
  color: #FFD54F;
  margin: 0;
  letter-spacing: 2px;
}

.celebration-subtitle {
  font-size: 18px;
  color: #FFF8E1;
  margin: 0;
}

.new-badge-spotlight {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(183, 28, 28, 0.45);
  border: 2px solid #FFD54F;
  border-radius: 20px;
  padding: 10px 24px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  margin-top: 6px;
}

.badge-icon-spin {
  font-size: 44px;
}

.badge-text-group {
  text-align: left;
}

.badge-tag {
  font-size: 13px;
  color: #FFD54F;
  font-weight: bold;
}

.badge-name {
  font-size: 20px;
  font-weight: bold;
  color: #FFF8E1;
}

.badge-desc {
  font-size: 13px;
  color: #D7CCC8;
}

.celebration-actions {
  display: flex;
  gap: 16px;
  margin-top: 14px;
}

.action-btn {
  padding: 12px 24px;
  border-radius: 22px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  touch-action: manipulation;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
  transition: transform 0.15s ease;
}

.action-btn:active {
  transform: scale(0.96);
}

.retry-btn {
  background: #E65100;
  border: 2px solid #FFD54F;
  color: #FFF8E1;
}

.progress-btn {
  background: #4E342E;
  border: 2px solid #D7CCC8;
  color: #FFF8E1;
}

.back-scene-btn {
  background: rgba(0, 0, 0, 0.5);
  border: 1.5px solid rgba(255, 215, 0, 0.4);
  color: #FFE082;
}

@media (max-width: 768px) {
  .quiz-options-container {
    gap: 10px;
  }
  .quiz-option-card {
    min-height: 120px;
  }
  .option-char-display {
    font-size: 48px;
  }
}
</style>
