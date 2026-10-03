<template>
  <div class="app-viewport" @touchstart="handleFirstTouch" @mousedown="handleFirstTouch">
    <!-- 4:3 视口容器 -->
    <div class="ipad-canvas-container">
      <!-- 阶段 1：生活实景态 -->
      <template v-if="!isLearning">
        <!-- 顶部场景快速切换胶囊（可在“厝内工夫”、“灶下炊事”等生活实景间无缝切换） -->
        <SceneSelector
          :scenes="allScenes"
          :active-scene-id="currentSceneId"
          @change-scene="handleSceneChange"
          @open-quiz="handleOpenQuiz"
          @open-progress="handleOpenProgress"
        />

        <!-- 动态生活场景组件 -->
        <component
          :is="currentSceneComponent"
          :scene-config="currentScene"
          :paused="isLearning"
          @select-word="handleSelectWord"
        />
      </template>

      <!-- 阶段 2：独立且通用的极简具身识字核心引擎 -->
      <LiteracyFocusView
        v-else
        :current-word="currentWord"
        :word-list="currentSceneWordList"
        :back-label="currentScene.backText"
        :liquid-type="currentScene.liquidType"
        @back="handleBackToScene"
        @switch-word="handleSwitchWord"
        @complete="handleWordCompleted"
        @open-quiz="handleOpenQuiz"
      />

      <!-- 考考眼力 / 全厝大闯关 / 每日晨茶温故 测验模态框 -->
      <QuizModal
        v-if="showQuiz"
        :scene-id="currentSceneId"
        :scene-name="currentScene.name"
        :scene-icon="currentScene.icon"
        :quiz-mode="currentQuizMode"
        :question-count="currentQuizMode === 'global' ? 6 : 3"
        @close="showQuiz = false"
        @open-progress="handleSwitchToProgress"
      />

      <!-- 厝内识字金榜与工夫茶档：学习记录档案模态框 -->
      <LearningProgressModal
        v-if="showProgress"
        @close="showProgress = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { audioService } from './services/audioService';
import { DEFAULT_SCENE_ID, getAllScenes, getScene } from './data';
import type { WordItem } from './types/literacy';

import SceneSelector from './components/common/SceneSelector.vue';
import ChaozhouHouse3DScene from './components/scenes/3d/ChaozhouHouse3DScene.vue';
import TeaTableScene from './components/scenes/TeaTableScene.vue';
import KitchenScene from './components/scenes/KitchenScene.vue';
import ChaozhouLifeScene from './components/scenes/ChaozhouLifeScene.vue';
import LiteracyFocusView from './components/literacy/LiteracyFocusView.vue';
import QuizModal from './components/quiz/QuizModal.vue';
import LearningProgressModal from './components/progress/LearningProgressModal.vue';
import { progressStorage } from './services/progressStorage';

// 场景组件字典：支持 3D 大院全景漫游、2D 独立特写与全量生活实景
const SCENE_COMPONENTS: Record<string, any> = {
  house_3d: ChaozhouHouse3DScene,
  tea_table: TeaTableScene,
  kitchen: KitchenScene,
  courtyard: ChaozhouLifeScene,
  bedroom: ChaozhouLifeScene,
  guo_table: ChaozhouLifeScene,
  altar: ChaozhouLifeScene,
  porridge: ChaozhouLifeScene,
  market: ChaozhouLifeScene,
  farm: ChaozhouLifeScene,
  medicine: ChaozhouLifeScene,
  family: ChaozhouLifeScene
};

const allScenes = getAllScenes();
const currentSceneId = ref<string>(DEFAULT_SCENE_ID);
const currentScene = computed(() => getScene(currentSceneId.value));
const currentSceneComponent = computed(() => SCENE_COMPONENTS[currentSceneId.value] || ChaozhouLifeScene);

// 当前场景的所有字列表
const currentSceneWordList = computed<WordItem[]>(() => Object.values(currentScene.value.words));

// 识字学习态控制
const isLearning = ref<boolean>(false);
const currentWordId = ref<string>(currentScene.value.defaultWordId);
const currentWord = computed<WordItem>(() => {
  return currentScene.value.words[currentWordId.value] || currentSceneWordList.value[0];
});

// 测验与学习记录档案弹窗控制
const showQuiz = ref<boolean>(false);
const showProgress = ref<boolean>(false);
const currentQuizMode = ref<'scene' | 'global' | 'daily_review'>('scene');

const handleOpenQuiz = (mode: 'scene' | 'global' | 'daily_review' = 'scene') => {
  audioService.playCupClink();
  currentQuizMode.value = mode;
  showQuiz.value = true;
};

const handleOpenProgress = () => {
  audioService.playCupClink();
  showProgress.value = true;
};

const handleSwitchToProgress = () => {
  showQuiz.value = false;
  showProgress.value = true;
};

const handleWordCompleted = (wordId: string) => {
  progressStorage.recordWordLearned(wordId, currentWord.value.character, currentSceneId.value);
};

// 全局任意首次触控均唤醒 iOS 12 Web Audio
const handleFirstTouch = () => {
  audioService.unlockAudio();
};

// 切换生活实景
const handleSceneChange = (sceneId: string) => {
  currentSceneId.value = sceneId;
  const newScene = getScene(sceneId);
  currentWordId.value = newScene.defaultWordId;
  isLearning.value = false;
};

// 点击实景中的物件，进入识字引擎
const handleSelectWord = (wordId: string) => {
  currentWordId.value = wordId;
  isLearning.value = true;
};

// 识字界面中切换字
const handleSwitchWord = (wordId: string) => {
  currentWordId.value = wordId;
};

// 从识字返回实景
const handleBackToScene = () => {
  isLearning.value = false;
};
</script>

<style scoped>
.app-viewport {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #1a1512;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  overflow: hidden;
}

/* 4:3 视口容器，锁定 iPad mini 2 物理比例 */
.ipad-canvas-container {
  position: relative;
  width: min(100vw, 133.33vh);
  height: min(75vw, 100vh);
  background: #19120e;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.9);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  user-select: none;
}
</style>
