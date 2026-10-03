import type { StrokeItem, WordItem } from '../types/literacy';
import { teaTableSceneConfig } from '../data/scenes/teaTableScene';

export type { StrokeItem };
export type TeaWordItem = WordItem;
export const TEA_WORDS: Record<string, TeaWordItem> = teaTableSceneConfig.words;
