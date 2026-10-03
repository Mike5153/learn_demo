import * as THREE from 'three';
import type { HouseViewMode, CameraWaypoint } from './types';

export class CameraDirector {
  private camera: THREE.PerspectiveCamera;
  private currentMode: HouseViewMode = 'overview';
  
  // 核心机位定义（覆盖老厝 8 大空间区域）
  private waypoints: Record<HouseViewMode, CameraWaypoint> = {
    overview: {
      position: new THREE.Vector3(0, 18, 25),
      target: new THREE.Vector3(0, 2.0, 0),
      fov: 46
    },
    courtyard: {
      position: new THREE.Vector3(0, 4.5, 13.5),
      target: new THREE.Vector3(0, 1.8, 8.0),
      fov: 44
    },
    tea_table: {
      position: new THREE.Vector3(0, 4.2, 5.0),
      target: new THREE.Vector3(0, 2.2, 0.0),
      fov: 42
    },
    altar: {
      position: new THREE.Vector3(0, 4.8, 1.0),
      target: new THREE.Vector3(0, 3.0, -4.8),
      fov: 42
    },
    kitchen: {
      position: new THREE.Vector3(-9.5, 4.2, 4.8),
      target: new THREE.Vector3(-9.5, 2.2, -0.2),
      fov: 42
    },
    guo_table: {
      position: new THREE.Vector3(-9.5, 4.5, -0.5),
      target: new THREE.Vector3(-9.5, 2.0, -4.5),
      fov: 42
    },
    bedroom: {
      position: new THREE.Vector3(9.5, 4.2, 4.8),
      target: new THREE.Vector3(9.5, 2.2, -0.2),
      fov: 42
    },
    farm: {
      position: new THREE.Vector3(0, 7.5, -9.5),
      target: new THREE.Vector3(0, 1.8, -16.0),
      fov: 44
    }
  };

  // 动画状态
  private isAnimating = false;
  private animStartTime = 0;
  private animDuration = 1200; // ms
  private startPos = new THREE.Vector3();
  private startTarget = new THREE.Vector3();
  private currentTarget = new THREE.Vector3();
  private endPos = new THREE.Vector3();
  private endTarget = new THREE.Vector3();

  // 适老化小幅度手势微调漫游 (防眩晕：水平 ±20°，垂直 ±10°)
  private basePosition = new THREE.Vector3();
  private baseTarget = new THREE.Vector3();
  public panOffset = { x: 0, y: 0 };
  private targetPanOffset = { x: 0, y: 0 };

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
    const initial = this.waypoints.overview;
    this.camera.position.copy(initial.position);
    this.currentTarget.copy(initial.target);
    this.basePosition.copy(initial.position);
    this.baseTarget.copy(initial.target);
    this.camera.lookAt(this.currentTarget);
  }

  public getMode(): HouseViewMode {
    return this.currentMode;
  }

  public setMode(mode: HouseViewMode, smooth = true, onComplete?: () => void) {
    this.currentMode = mode;
    const wp = this.waypoints[mode];
    this.targetPanOffset = { x: 0, y: 0 };

    if (!smooth) {
      this.camera.position.copy(wp.position);
      this.currentTarget.copy(wp.target);
      this.basePosition.copy(wp.position);
      this.baseTarget.copy(wp.target);
      this.camera.lookAt(this.currentTarget);
      this.isAnimating = false;
      if (onComplete) onComplete();
      return;
    }

    this.startPos.copy(this.camera.position);
    this.startTarget.copy(this.currentTarget);
    this.endPos.copy(wp.position);
    this.endTarget.copy(wp.target);
    this.basePosition.copy(wp.position);
    this.baseTarget.copy(wp.target);

    this.animStartTime = performance.now();
    this.isAnimating = true;

    this.onCompleteCallback = onComplete;
  }

  private onCompleteCallback?: () => void;

  public handleDrag(deltaX: number, deltaY: number) {
    if (this.isAnimating) return;
    // 缓速微调视角，最大位移受限
    const factor = 0.0035;
    this.targetPanOffset.x = Math.max(-1.8, Math.min(1.8, this.targetPanOffset.x - deltaX * factor));
    this.targetPanOffset.y = Math.max(-0.9, Math.min(0.9, this.targetPanOffset.y + deltaY * factor));
  }

  public resetPan() {
    this.targetPanOffset = { x: 0, y: 0 };
  }

  public update(): boolean {
    let hasChanged = false;

    // 1. 机位过渡平滑插值 (Ease-in-out Cosine)
    if (this.isAnimating) {
      const elapsed = performance.now() - this.animStartTime;
      const progress = Math.min(1, elapsed / this.animDuration);
      
      // 余弦平滑因子
      const ease = 0.5 * (1 - Math.cos(Math.PI * progress));

      this.camera.position.lerpVectors(this.startPos, this.endPos, ease);
      this.currentTarget.lerpVectors(this.startTarget, this.endTarget, ease);
      this.camera.lookAt(this.currentTarget);

      hasChanged = true;

      if (progress >= 1) {
        this.isAnimating = false;
        if (this.onCompleteCallback) {
          this.onCompleteCallback();
          this.onCompleteCallback = undefined;
        }
      }
    } else {
      // 2. 惯性微调偏移滤波 (防抖)
      const lerpSpeed = 0.12;
      this.panOffset.x += (this.targetPanOffset.x - this.panOffset.x) * lerpSpeed;
      this.panOffset.y += (this.targetPanOffset.y - this.panOffset.y) * lerpSpeed;

      if (Math.abs(this.targetPanOffset.x - this.panOffset.x) > 0.001 || Math.abs(this.targetPanOffset.y - this.panOffset.y) > 0.001) {
        hasChanged = true;
      }

      this.camera.position.x = this.basePosition.x + this.panOffset.x;
      this.camera.position.y = this.basePosition.y + this.panOffset.y;
      this.camera.lookAt(
        this.baseTarget.x + this.panOffset.x * 0.5,
        this.baseTarget.y + this.panOffset.y * 0.5,
        this.baseTarget.z
      );
    }

    return hasChanged;
  }
}
