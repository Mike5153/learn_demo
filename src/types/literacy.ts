export interface StrokeItem {
  name: string;
  path: string;
  length: number;
}

export interface WordItem {
  id: string;
  character: string;
  pinyin: string;
  teochewIPA: string;
  teochewAudio: string;
  triggerName: string;
  imageUrl?: string;
  tier?: 'basic' | 'advanced';
  strokes: StrokeItem[];
  themeColor?: string;
}

export type StageType = 'scene' | 'learning' | 'completed';
export type TeachingStep = 'jieyang' | 'mandarin' | 'demo_strokes' | 'write_practice' | 'completed';

export interface SceneConfig {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  hintText: string;
  backText: string;
  liquidType?: 'tea' | 'water' | 'soup';
  words: Record<string, WordItem>;
  defaultWordId: string;
}
