export interface Point {
  x: number;
  y: number;
}

export interface StrokeMatchResult {
  isMatch: boolean;
  score: number; // 0 ~ 100
  reason?: 'direction_reverse' | 'start_far' | 'end_short' | 'shape_mismatch';
  message?: string;
  userPointsResampled?: Point[];
  targetPointsResampled?: Point[];
}

/**
 * 解析 SVG Path 中的所有控制点 (M x,y L x,y ...)
 */
export function parseSvgPathToPoints(pathStr: string): Point[] {
  const nums = pathStr.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
  const points: Point[] = [];
  for (let i = 0; i < nums.length; i += 2) {
    if (!isNaN(nums[i]) && !isNaN(nums[i + 1])) {
      points.push({ x: nums[i], y: nums[i + 1] });
    }
  }
  return points;
}

/**
 * 等距降采样算法：将任意稀疏/密集触控点归一化为 N 个等间距轨迹点
 */
export function resamplePoints(points: Point[], targetCount = 16): Point[] {
  if (points.length === 0) return [];
  if (points.length === 1) return Array(targetCount).fill({ ...points[0] });

  // 计算折线总长度
  let totalLen = 0;
  for (let i = 1; i < points.length; i++) {
    totalLen += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }

  if (totalLen <= 0.001) {
    return Array(targetCount).fill({ ...points[0] });
  }

  const step = totalLen / (targetCount - 1);
  const result: Point[] = [{ ...points[0] }];
  let segIdx = 0;
  let segStartDist = 0;

  for (let i = 1; i < targetCount - 1; i++) {
    const targetDist = i * step;

    while (segIdx < points.length - 1) {
      const segLen = Math.hypot(
        points[segIdx + 1].x - points[segIdx].x,
        points[segIdx + 1].y - points[segIdx].y
      );

      if (segStartDist + segLen >= targetDist) {
        const ratio = segLen > 0 ? (targetDist - segStartDist) / segLen : 0;
        result.push({
          x: points[segIdx].x + (points[segIdx + 1].x - points[segIdx].x) * ratio,
          y: points[segIdx].y + (points[segIdx + 1].y - points[segIdx].y) * ratio
        });
        break;
      }

      segStartDist += segLen;
      segIdx++;
    }
  }

  result.push({ ...points[points.length - 1] });
  return result;
}

/**
 * 屏幕物理坐标映射至 800×800 虚拟 SVG 坐标系
 */
export function clientToSvg(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  viewBoxWidth = 800,
  viewBoxHeight = 800
): Point {
  const scaleX = viewBoxWidth / (rect.width || 1);
  const scaleY = viewBoxHeight / (rect.height || 1);
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}

/**
 * 核心笔画比对器（针对老人家高容错定制，运行速度 < 2ms）
 */
export function matchStroke(
  rawUserPoints: Point[],
  targetStrokePath: string,
  options: {
    startTolerance?: number; // 允许起点偏差半径 (px)
    endTolerance?: number;   // 允许终点偏差半径 (px)
    minPassScore?: number;   // 及格分数线 (0~100)
  } = {}
): StrokeMatchResult {
  const {
    startTolerance = 95,
    endTolerance = 110,
    minPassScore = 58
  } = options;

  if (rawUserPoints.length < 2) {
    return { isMatch: false, score: 0, reason: 'end_short', message: '请划出完整线条' };
  }

  const targetRawPoints = parseSvgPathToPoints(targetStrokePath);
  if (targetRawPoints.length < 2) {
    return { isMatch: true, score: 100 };
  }

  // 1. 等距归一化采样 16 点
  const N = 16;
  const user = resamplePoints(rawUserPoints, N);
  const target = resamplePoints(targetRawPoints, N);

  // 2. 起点与终点距离校验
  const startDist = Math.hypot(user[0].x - target[0].x, user[0].y - target[0].y);
  const endDist = Math.hypot(user[N - 1].x - target[N - 1].x, user[N - 1].y - target[N - 1].y);

  // 3. 运笔主向量夹角 (防止逆向倒笔，例如右向左画横、底向上画竖)
  const userVec = { x: user[N - 1].x - user[0].x, y: user[N - 1].y - user[0].y };
  const targetVec = { x: target[N - 1].x - target[0].x, y: target[N - 1].y - target[0].y };

  const userVecMag = Math.hypot(userVec.x, userVec.y);
  const targetVecMag = Math.hypot(targetVec.x, targetVec.y);

  let cosTheta = 1;
  if (userVecMag > 15 && targetVecMag > 15) {
    cosTheta = (userVec.x * targetVec.x + userVec.y * targetVec.y) / (userVecMag * targetVecMag);
  }

  // 若夹角大于 75 度，判定为方向反了
  if (cosTheta < 0.25) {
    return {
      isMatch: false,
      score: 20,
      reason: 'direction_reverse',
      message: '笔画方向反了，顺着箭头划',
      userPointsResampled: user,
      targetPointsResampled: target
    };
  }

  // 4. 计算采样点对点平均欧氏距离
  let sumDist = 0;
  for (let i = 0; i < N; i++) {
    sumDist += Math.hypot(user[i].x - target[i].x, user[i].y - target[i].y);
  }
  const meanDist = sumDist / N;

  // 5. 适老化加权得分计算 (0~100)
  // 起点得分 (25%) + 终点得分 (25%) + 方向得分 (25%) + 轨迹形似度 (25%)
  const startScore = Math.max(0, 1 - startDist / (startTolerance * 1.5)) * 25;
  const endScore = Math.max(0, 1 - endDist / (endTolerance * 1.5)) * 25;
  const dirScore = Math.max(0, (cosTheta + 1) / 2) * 25;
  const shapeScore = Math.max(0, 1 - meanDist / 120) * 25;

  const totalScore = Math.round(startScore + endScore + dirScore + shapeScore);

  // 判定及格准则（宽容模式）
  const startOk = startDist <= startTolerance;
  const endOk = endDist <= endTolerance;
  const shapeOk = meanDist <= 85;

  if (startOk && endOk && shapeOk && totalScore >= minPassScore) {
    return {
      isMatch: true,
      score: totalScore,
      userPointsResampled: user,
      targetPointsResampled: target
    };
  }

  // 给出友好引导原因
  let reason: StrokeMatchResult['reason'] = 'shape_mismatch';
  let message = '跟着亮起的笔划划';

  if (!startOk) {
    reason = 'start_far';
    message = '从笔画起点起笔';
  } else if (!endOk) {
    reason = 'end_short';
    message = '笔画要划到位';
  }

  return {
    isMatch: false,
    score: totalScore,
    reason,
    message,
    userPointsResampled: user,
    targetPointsResampled: target
  };
}
