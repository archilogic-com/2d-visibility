import { Point, Segment } from './types';

const drawSegment = (ctx: CanvasRenderingContext2D, color: string, segment: Segment) => {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(segment.p1.x, segment.p1.y);
  ctx.lineTo(segment.p2.x, segment.p2.y);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
};

const drawVisibilityTriangles = (ctx: CanvasRenderingContext2D, color: string, lightSource: Point, visibilityOutput: Point[][]) => {
  ctx.save();
  ctx.strokeStyle = color;
  for (const points of visibilityOutput) {
    ctx.beginPath();
    ctx.moveTo(lightSource.x, lightSource.y);
    ctx.lineTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
};

export const drawScene = (ctx: CanvasRenderingContext2D, lightSource: Point, segments: Segment[], visibilityOutput: Point[][]) => {
  ctx.clearRect(-10000, -10000, 20000, 20000);
  for (const segment of segments) {
    drawSegment(ctx, 'blue', segment);
  }
 
  drawVisibilityTriangles(ctx, 'gray', lightSource, visibilityOutput);
};
