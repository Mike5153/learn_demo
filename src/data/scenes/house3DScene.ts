import type { SceneConfig } from '../../types/literacy';
import { teaTableSceneConfig } from './teaTableScene';
import { kitchenSceneConfig } from './kitchenScene';
import { courtyardSceneConfig } from './courtyardScene';
import { bedroomSceneConfig } from './bedroomScene';
import { guo_tableSceneConfig } from './guo_tableScene';
import { altarSceneConfig } from './altarScene';
import { porridgeSceneConfig } from './porridgeScene';
import { marketSceneConfig } from './marketScene';
import { farmSceneConfig } from './farmScene';
import { medicineSceneConfig } from './medicineScene';
import { familySceneConfig } from './familyScene';

/**
 * 三维全景生活实景：“潮汕老厝大院” (下山虎院落格局)
 * 完整融合 11 大生活场景与 144 个核心生活汉字。
 */
export const house3DSceneConfig: SceneConfig = {
  id: 'house_3d',
  name: '老厝大院',
  subtitle: '三维全景',
  icon: '🏡',
  hintText: '👆 点物识字听音 · 漫游潮汕老厝',
  backText: '大院',
  liquidType: 'tea',
  defaultWordId: 'tea',
  words: {
    ...teaTableSceneConfig.words,
    ...kitchenSceneConfig.words,
    ...courtyardSceneConfig.words,
    ...altarSceneConfig.words,
    ...familySceneConfig.words,
    ...guo_tableSceneConfig.words,
    ...porridgeSceneConfig.words,
    ...bedroomSceneConfig.words,
    ...medicineSceneConfig.words,
    ...farmSceneConfig.words,
    ...marketSceneConfig.words
  }
};
