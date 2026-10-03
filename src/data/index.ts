import type { SceneConfig } from '../types/literacy';
import { house3DSceneConfig } from './scenes/house3DScene';
import { teaTableSceneConfig } from './scenes/teaTableScene';
import { kitchenSceneConfig } from './scenes/kitchenScene';
import { courtyardSceneConfig } from './scenes/courtyardScene';
import { bedroomSceneConfig } from './scenes/bedroomScene';
import { guo_tableSceneConfig } from './scenes/guo_tableScene';
import { altarSceneConfig } from './scenes/altarScene';
import { porridgeSceneConfig } from './scenes/porridgeScene';
import { marketSceneConfig } from './scenes/marketScene';
import { farmSceneConfig } from './scenes/farmScene';
import { medicineSceneConfig } from './scenes/medicineScene';
import { familySceneConfig } from './scenes/familyScene';

export const SCENES: Record<string, SceneConfig> = {
  [house3DSceneConfig.id]: house3DSceneConfig,
  [teaTableSceneConfig.id]: teaTableSceneConfig,
  [kitchenSceneConfig.id]: kitchenSceneConfig,
  [courtyardSceneConfig.id]: courtyardSceneConfig,
  [bedroomSceneConfig.id]: bedroomSceneConfig,
  [guo_tableSceneConfig.id]: guo_tableSceneConfig,
  [altarSceneConfig.id]: altarSceneConfig,
  [porridgeSceneConfig.id]: porridgeSceneConfig,
  [marketSceneConfig.id]: marketSceneConfig,
  [farmSceneConfig.id]: farmSceneConfig,
  [medicineSceneConfig.id]: medicineSceneConfig,
  [familySceneConfig.id]: familySceneConfig
};

export const DEFAULT_SCENE_ID = house3DSceneConfig.id;

export function getScene(sceneId: string): SceneConfig {
  return SCENES[sceneId] || SCENES[DEFAULT_SCENE_ID];
}

export function getAllScenes(): SceneConfig[] {
  return Object.values(SCENES);
}
