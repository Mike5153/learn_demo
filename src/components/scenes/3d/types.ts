import * as THREE from 'three';

export type HouseViewMode = 
  | 'overview'     // 老厝全景
  | 'courtyard'    // 前院大门天井
  | 'tea_table'    // 正厅茶席
  | 'altar'        // 祖厅神台与堂前
  | 'kitchen'      // 灶下炊事柴火灶
  | 'guo_table'    // 案台做粿与食糜
  | 'bedroom'      // 房内起居与药箱
  | 'farm';        // 屋后菜园与墟市

export interface Interactive3DItem {
  id: string;
  sceneId: string;
  character: string;
  triggerName: string;
  tier: 'basic' | 'advanced';
  group: THREE.Group;
  colliderMesh: THREE.Mesh;
  worldPosition: THREE.Vector3;
  screenPosition: { x: number; y: number; visible: boolean };
}

export interface CameraWaypoint {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov?: number;
}
