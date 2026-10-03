import type { WordItem } from './literacy';

export type QuizType = 'audio_to_word' | 'image_to_word';
export type WordMasteryLevel = 0 | 1 | 2 | 3; // 0:未学, 1:初识, 2:熟练, 3:精通

/**
 * 单字学习掌握度进度
 */
export interface WordProgress {
  wordId: string;
  character: string;
  sceneId: string;
  level: WordMasteryLevel;
  learnCount: number;         // 描红练习次数
  quizCorrectCount: number;   // 测验答对次数
  quizTotalCount: number;     // 测验总出现次数
  lastTestedAt?: number;      // 最近一次测验时间戳
}

/**
 * 测验单次流水记录
 */
export interface QuizSessionRecord {
  id: string;
  sceneId: string;
  sceneName: string;
  timestamp: number;
  totalQuestions: number;
  correctCount: number;
  testedWordIds: string[];
  cupsEarned: number;         // 获得的工夫茶杯数 (0~3)
  newBadgeUnlocked?: string;  // 本次新解锁的勋章名称
}

/**
 * 民俗点心/文化勋章
 */
export interface BadgeItem {
  id: string;
  sceneId: string;
  name: string;
  icon: string;
  description: string;
  requirement: string;
  unlockedAt?: number;
}

/**
 * 整体学习概览进度
 */
export interface OverallLearningProgress {
  totalMasteredWords: number; // 熟练(2)与精通(3)的字数
  totalLearnedWords: number;  // 初识(1)及以上的字数
  totalTeaRounds: number;     // 累计冲泡工夫茶巡数
  unlockedBadgeIds: string[]; // 已点亮勋章ID列表
  streakDays: number;         // 连续温故天数
  lastActiveDate: string;     // 最近活跃日期 YYYY-MM-DD
}

/**
 * 测验题目
 */
export interface QuizQuestion {
  id: string;
  type: QuizType;
  targetWord: WordItem;
  sceneId: string;
  promptText: string;
  options: WordItem[];        // 选项 (含正确项与干扰项)
}
