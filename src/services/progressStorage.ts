import type { WordItem } from '../types/literacy';
import type {
  WordProgress,
  QuizSessionRecord,
  BadgeItem,
  OverallLearningProgress,
  QuizQuestion,
  QuizType
} from '../types/quiz';
import { getScene, getAllScenes } from '../data';

const STORAGE_KEY_WORDS = 'chaoshan_word_progress_map_v1';
const STORAGE_KEY_LOGS = 'chaoshan_quiz_session_logs_v1';
const STORAGE_KEY_OVERALL = 'chaoshan_overall_progress_v1';

/**
 * 11 大生活实景专属民俗文化勋章
 */
export const SCENE_BADGES: BadgeItem[] = [
  { id: 'badge_tea', sceneId: 'tea_table', name: '紫砂孟臣罐', icon: '🫖', description: '细斟慢酌·工夫茶香', requirement: '完成【厝内工夫】温故' },
  { id: 'badge_kitchen', sceneId: 'kitchen', name: '柴火老铁鼎', icon: '🍳', description: '人间炊烟·老鼎飘香', requirement: '完成【灶下炊事】温故' },
  { id: 'badge_courtyard', sceneId: 'courtyard', name: '迎宾八仙桌', icon: '🪵', description: '大厅明亮·迎客清平', requirement: '完成【大厅天井】温故' },
  { id: 'badge_bedroom', sceneId: 'bedroom', name: '绣花同心被', icon: '🪡', description: '房内安详·暖被温存', requirement: '完成【房内起居】温故' },
  { id: 'badge_guo_table', sceneId: 'guo_table', name: '朱红桃粿印', icon: '🥟', description: '时年八节·红桃吉祥', requirement: '完成【做粿案台】温故' },
  { id: 'badge_altar', sceneId: 'altar', name: '祖厅双烛台', icon: '🕯️', description: '神台肃穆·祖德流芳', requirement: '完成【祖厅神台】温故' },
  { id: 'badge_porridge', sceneId: 'porridge', name: '白瓷食糜钵', icon: '🥣', description: '清早白糜·杂咸暖心', requirement: '完成【清早食糜】温故' },
  { id: 'badge_market', sceneId: 'market', name: '铜星称砣袋', icon: '⚖️', description: '墟市公平·买卖顺遂', requirement: '完成【墟市采买】温故' },
  { id: 'badge_farm', sceneId: 'farm', name: '春耕老水牛', icon: '🐂', description: '园头勤勉·禾穗丰登', requirement: '完成【园头田埂】温故' },
  { id: 'badge_medicine', sceneId: 'medicine', name: '百草保和匣', icon: '💊', description: '厝内药箱·身安体健', requirement: '完成【厝内药箱】温故' },
  { id: 'badge_family', sceneId: 'family', name: '堂前阖家福', icon: '🏡', description: '儿孙满堂·父慈子孝', requirement: '完成【堂前儿孙】温故' },
  { id: 'badge_scholar', sceneId: 'house_3d', name: '全厝探花扁', icon: '🏮', description: '全厝贯通·眼明心亮', requirement: '完成【全厝综合大闯关】考验' },
  { id: 'badge_early_tea', sceneId: 'daily_review', name: '晨起三品杯', icon: '🌅', description: '日日温故·持之以恒', requirement: '完成【每日智能晨茶温故】' },
  { id: 'badge_blind_calligraphy', sceneId: 'blind_write', name: '脱模神笔扁', icon: '🪶', description: '胸有成竹·脱模盲写', requirement: '独立完成汉字脱模盲写' }
];

class ProgressStorageService {
  /**
   * 获取所有单字学习掌握度字典
   */
  public getWordProgressMap(): Record<string, WordProgress> {
    try {
      const data = localStorage.getItem(STORAGE_KEY_WORDS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Load word progress error:', e);
    }
    return {};
  }

  public saveWordProgressMap(map: Record<string, WordProgress>): void {
    try {
      localStorage.setItem(STORAGE_KEY_WORDS, JSON.stringify(map));
    } catch (e) {
      console.warn('Save word progress error:', e);
    }
  }

  /**
   * 记录字学习过一次（单字临摹 / 练习完成）
   */
  public recordWordLearned(wordId: string, character: string, sceneId: string): void {
    const map = this.getWordProgressMap();
    const existing = map[wordId] || {
      wordId,
      character,
      sceneId,
      level: 0,
      learnCount: 0,
      quizCorrectCount: 0,
      quizTotalCount: 0
    };

    existing.learnCount++;
    if (existing.level === 0) {
      existing.level = 1; // 升级为初识
    }

    map[wordId] = existing;
    this.saveWordProgressMap(map);
    this.refreshOverallProgress();
  }

  /**
   * 记录脱模盲写成功（证明肌肉记忆独立提取，直接升级精通，并尝试点亮【脱模神笔扁】）
   */
  public recordBlindWriteSuccess(wordId: string, character: string, sceneId?: string): { newBadge?: BadgeItem } {
    const map = this.getWordProgressMap();
    const existing = map[wordId] || {
      wordId,
      character: character || '字',
      sceneId: sceneId || 'tea_table',
      level: 0,
      learnCount: 0,
      quizCorrectCount: 0,
      quizTotalCount: 0
    };

    existing.learnCount++;
    existing.quizTotalCount++;
    existing.quizCorrectCount++;
    existing.lastTestedAt = Date.now();
    existing.level = 3; // 脱模独立盲写成功，直接达到精通顶峰

    map[wordId] = existing;
    this.saveWordProgressMap(map);
    this.refreshOverallProgress();

    // 检查并点亮【脱模神笔扁】民俗勋章
    const newBadge = this.unlockCustomBadge('badge_blind_calligraphy');
    return { newBadge };
  }

  /**
   * 解锁指定勋章
   */
  public unlockCustomBadge(badgeId: string): BadgeItem | undefined {
    const overall = this.getOverallProgress();
    const targetBadge = SCENE_BADGES.find(b => b.id === badgeId);
    if (targetBadge && !overall.unlockedBadgeIds.includes(targetBadge.id)) {
      overall.unlockedBadgeIds.push(targetBadge.id);
      this.updateOverallStats(overall);
      return targetBadge;
    }
    return undefined;
  }

  /**
   * 记录单字测验结果
   */
  public recordWordQuizResult(wordId: string, isCorrect: boolean, character?: string, sceneId?: string): void {
    const map = this.getWordProgressMap();
    const existing = map[wordId] || {
      wordId,
      character: character || '字',
      sceneId: sceneId || 'tea_table',
      level: 0,
      learnCount: 0,
      quizCorrectCount: 0,
      quizTotalCount: 0
    };

    existing.quizTotalCount++;
    existing.lastTestedAt = Date.now();

    if (isCorrect) {
      existing.quizCorrectCount++;
      // 熟练度生长阶梯
      if (existing.quizCorrectCount >= 2 && existing.level >= 1) {
        existing.level = 3; // 精通大功告成 ✨
      } else if (existing.level < 2) {
        existing.level = 2; // 熟练
      }
    }

    map[wordId] = existing;
    this.saveWordProgressMap(map);
  }

  /**
   * 获取历史测验流水
   */
  public getQuizLogs(): QuizSessionRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_LOGS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Load quiz logs error:', e);
    }
    return [];
  }

  /**
   * 记录一次完整的温故测验
   */
  public recordQuizSession(
    sceneId: string,
    sceneName: string,
    totalQuestions: number,
    correctCount: number,
    testedWordIds: string[]
  ): { record: QuizSessionRecord; newBadge?: BadgeItem } {
    const timestamp = Date.now();
    const cupsEarned = Math.min(3, Math.max(1, Math.round((correctCount / Math.max(1, totalQuestions)) * 3)));
    
    // 检查是否点亮当前场景民俗勋章
    let newBadge: BadgeItem | undefined;
    const overall = this.getOverallProgress();
    const targetBadge = SCENE_BADGES.find(b => b.sceneId === sceneId);
    
    if (targetBadge && !overall.unlockedBadgeIds.includes(targetBadge.id)) {
      overall.unlockedBadgeIds.push(targetBadge.id);
      newBadge = targetBadge;
    }

    const record: QuizSessionRecord = {
      id: `quiz_${timestamp}_${Math.random().toString(36).substring(2, 7)}`,
      sceneId,
      sceneName,
      timestamp,
      totalQuestions,
      correctCount,
      testedWordIds,
      cupsEarned,
      newBadgeUnlocked: newBadge?.name
    };

    // 保存流水日志（保留最近 50 条）
    const logs = this.getQuizLogs();
    logs.unshift(record);
    if (logs.length > 50) logs.pop();
    
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
    } catch (e) {
      console.warn('Save quiz log error:', e);
    }

    // 更新大盘统计（3题测验答对2题得1巡茶；6题大闯关答对4题得2巡茶）
    const roundsEarned = totalQuestions >= 6 
      ? (correctCount >= 4 ? 2 : correctCount >= 2 ? 1 : 0)
      : (cupsEarned >= 2 ? 1 : 0);
    
    if (roundsEarned > 0) {
      overall.totalTeaRounds += roundsEarned;
    }
    this.updateOverallStats(overall);

    return { record, newBadge };
  }

  /**
   * 获取总体学习档案概览
   */
  public getOverallProgress(): OverallLearningProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEY_OVERALL);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          totalMasteredWords: parsed.totalMasteredWords || 0,
          totalLearnedWords: parsed.totalLearnedWords || 0,
          totalTeaRounds: parsed.totalTeaRounds || 0,
          unlockedBadgeIds: Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : [],
          streakDays: parsed.streakDays || 1,
          lastActiveDate: parsed.lastActiveDate || this.getTodayDateString()
        };
      }
    } catch (e) {
      console.warn('Load overall progress error:', e);
    }

    return {
      totalMasteredWords: 0,
      totalLearnedWords: 0,
      totalTeaRounds: 0,
      unlockedBadgeIds: [],
      streakDays: 1,
      lastActiveDate: this.getTodayDateString()
    };
  }

  private updateOverallStats(progress: OverallLearningProgress): void {
    const today = this.getTodayDateString();
    if (progress.lastActiveDate !== today) {
      const yesterday = this.getYesterdayDateString();
      if (progress.lastActiveDate === yesterday) {
        progress.streakDays++;
      } else {
        progress.streakDays = 1;
      }
      progress.lastActiveDate = today;
    }

    // 重新统计字数
    const map = this.getWordProgressMap();
    let learned = 0;
    let mastered = 0;
    Object.values(map).forEach(w => {
      if (w.level >= 1) learned++;
      if (w.level >= 2) mastered++;
    });
    progress.totalLearnedWords = learned;
    progress.totalMasteredWords = mastered;

    try {
      localStorage.setItem(STORAGE_KEY_OVERALL, JSON.stringify(progress));
    } catch (e) {
      console.warn('Save overall progress error:', e);
    }
  }

  public refreshOverallProgress(): OverallLearningProgress {
    const overall = this.getOverallProgress();
    this.updateOverallStats(overall);
    return overall;
  }

  /**
   * 判断单字是否到达艾宾浩斯复习节点
   */
  public isWordDueForReview(progress: WordProgress): boolean {
    if (progress.level === 0 && progress.learnCount === 0) return false;
    // 刚临摹过但从未测验的，优先复习
    if (progress.quizTotalCount === 0) return true;

    const now = Date.now();
    const elapsed = now - (progress.lastTestedAt || 0);
    const ONE_DAY = 24 * 60 * 60 * 1000;

    // 薄弱字（准确率低于 60%）：1 天后必须温故
    const accuracy = progress.quizCorrectCount / progress.quizTotalCount;
    if (accuracy < 0.6) {
      return elapsed >= ONE_DAY;
    }

    // 艾宾浩斯记忆周期：初识(1天) -> 熟练(3天) -> 精通(7天)
    const intervalDays = progress.level === 1 ? 1 : progress.level === 2 ? 3 : 7;
    return elapsed >= intervalDays * ONE_DAY;
  }

  /**
   * 获取今日到期需温故的字列表
   */
  public getDueReviewWords(): WordItem[] {
    const map = this.getWordProgressMap();
    const all = getAllScenes();
    const allWords = all.flatMap(s => Object.values(s.words));

    return allWords.filter(w => {
      const p = map[w.id];
      return p ? this.isWordDueForReview(p) : false;
    });
  }

  /**
   * 获取今日温故状态概览
   */
  public getDailyReviewStatus(): { hasDue: boolean; dueCount: number; words: WordItem[] } {
    const dueWords = this.getDueReviewWords();
    return {
      hasDue: dueWords.length > 0,
      dueCount: dueWords.length,
      words: dueWords
    };
  }

  /**
   * 工具：基于抽中的目标字列表构建测验题目
   */
  private buildQuestionsFromTargets(targets: WordItem[], sceneId: string, pool: WordItem[]): QuizQuestion[] {
    return targets.map((target, idx) => {
      // 轮换题型：交替使用【听音选字】与【看大图认字】
      const type: QuizType = idx % 2 === 0 ? 'audio_to_word' : 'image_to_word';

      // 选 2 个同池干扰项
      const distractors = pool.filter(w => w.id !== target.id);
      distractors.sort(() => Math.random() - 0.5);
      const pickedDistractors = distractors.slice(0, 2);

      const options = [target, ...pickedDistractors];
      options.sort(() => Math.random() - 0.5);

      const promptText = type === 'audio_to_word'
        ? `🔊 听地道潮音：请找一找哪个字是它？`
        : `🖼️ 看生活实物：这是什么字？`;

      return {
        id: `q_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 5)}`,
        type,
        targetWord: target,
        sceneId,
        promptText,
        options
      };
    });
  }

  /**
   * 生成【每日晨茶 · 智能温故】测验题目（3 题，1 巡茶）
   */
  public generateDailyReviewQuestions(count = 3): QuizQuestion[] {
    const map = this.getWordProgressMap();
    const all = getAllScenes();
    const allWords = all.flatMap(s => Object.values(s.words));

    const dueWords = this.getDueReviewWords();
    let targets: WordItem[] = [];

    if (dueWords.length >= count) {
      dueWords.sort(() => Math.random() - 0.5);
      targets = dueWords.slice(0, count);
    } else {
      targets = [...dueWords];
      // 补充不足：从已学过的字中选最久未温故的
      const learnedOthers = allWords.filter(w => {
        const p = map[w.id];
        return p && (p.level > 0 || p.learnCount > 0) && !targets.some(t => t.id === w.id);
      }).sort((a, b) => {
        const pa = map[a.id];
        const pb = map[b.id];
        return (pa.lastTestedAt || 0) - (pb.lastTestedAt || 0);
      });

      for (const w of learnedOthers) {
        if (targets.length >= count) break;
        targets.push(w);
      }

      // 若新用户尚未学习，从基础茶台与白糜字中补充
      if (targets.length < count) {
        const fallbackWords = allWords.filter(w => !targets.some(t => t.id === w.id));
        fallbackWords.sort(() => Math.random() - 0.5);
        for (const w of fallbackWords) {
          if (targets.length >= count) break;
          targets.push(w);
        }
      }
    }

    return this.buildQuestionsFromTargets(targets, 'daily_review', allWords);
  }

  /**
   * 生成【全厝综合大闯关】测验题目（6 题，2 巡茶，跨11实景抽测）
   */
  public generateGlobalGrandQuiz(count = 6): QuizQuestion[] {
    const all = getAllScenes();
    const allWords = all.flatMap(s => Object.values(s.words));
    const map = this.getWordProgressMap();

    // 优先加权：已初识/熟练但尚未精通的字，或随机从各大场景中抽样
    const sortedWords = [...allWords].sort((a, b) => {
      const pa = map[a.id]?.level ?? 0;
      const pb = map[b.id]?.level ?? 0;
      // 正在巩固中的字（1或2）优先级最高
      const scoreA = pa === 1 || pa === 2 ? -10 : pa === 0 ? -2 : 5;
      const scoreB = pb === 1 || pb === 2 ? -10 : pb === 0 ? -2 : 5;
      if (scoreA !== scoreB) return scoreA - scoreB;
      return Math.random() - 0.5;
    });

    const chosen = sortedWords.slice(0, count);
    chosen.sort(() => Math.random() - 0.5);

    return this.buildQuestionsFromTargets(chosen, 'house_3d', allWords);
  }

  /**
   * 生成单场景温故测试题目（3 ~ 5 题）
   */
  public generateQuizQuestions(sceneId: string, count = 3): QuizQuestion[] {
    if (sceneId === 'house_3d') {
      return this.generateGlobalGrandQuiz(count > 3 ? count : 6);
    }
    if (sceneId === 'daily_review') {
      return this.generateDailyReviewQuestions(count);
    }

    const scene = getScene(sceneId);
    let wordList = Object.values(scene.words);
    
    if (wordList.length === 0) {
      const all = getAllScenes();
      wordList = all.flatMap(s => Object.values(s.words));
    }

    if (wordList.length === 0) return [];

    const progressMap = this.getWordProgressMap();

    // 适老加权抽取算法：优先考察“未熟练”或“较久未温故”的汉字
    const sortedWords = [...wordList].sort((a, b) => {
      const pa = progressMap[a.id]?.level ?? 0;
      const pb = progressMap[b.id]?.level ?? 0;
      if (pa !== pb) return pa - pb; // 等级低的优先
      return Math.random() - 0.5;
    });

    const chosenTargets = sortedWords.slice(0, Math.min(count, sortedWords.length));
    chosenTargets.sort(() => Math.random() - 0.5);

    return this.buildQuestionsFromTargets(chosenTargets, sceneId, wordList);
  }

  private getTodayDateString(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private getYesterdayDateString(): string {
    const d = new Date(Date.now() - 86400000);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}

export const progressStorage = new ProgressStorageService();
