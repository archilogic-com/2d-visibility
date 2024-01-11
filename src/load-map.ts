import { Point, EndPoint, Segment, PolygonWithHoles } from './types';

const calculateEndPointAngles = (lightSource: Point, segment: Segment) => {
  const { x, y } = lightSource;
  const dx = 0.5 * (segment.p1.x + segment.p2.x) - x;
  const dy = 0.5 * (segment.p1.y + segment.p2.y) - y;

  segment.d = (dx * dx) + (dy * dy);
  segment.p1.angle = Math.atan2(segment.p1.y - y, segment.p1.x - x);
  segment.p2.angle = Math.atan2(segment.p2.y - y, segment.p2.x - x);
};

const setSegmentBeginning = (segment: Segment) => {
  let dAngle = segment.p2.angle - segment.p1.angle;

  if (dAngle <= -Math.PI) {
    dAngle += 2 * Math.PI;
  }
  if (dAngle > Math.PI) {
    dAngle -= 2 * Math.PI;
  }

  segment.p1.beginsSegment = dAngle > 0;
  segment.p2.beginsSegment = !segment.p1.beginsSegment;
};

const processSegments = (lightSource: Point, segments: Segment[]) => {
  for (const segment of segments) {
    calculateEndPointAngles(lightSource, segment);
    setSegmentBeginning(segment);
  }

  return segments;
};

export function loadMap(polygon: PolygonWithHoles, point: Point): { endPoints: EndPoint[], segments: Segment[] } {
  const segments: Segment[] = [];
  for (const loop of polygon) {
    for (let i = 0; i < loop.length; i++) {
      const currentPoint = loop[i];
      const nextPoint = loop[i < loop.length - 1 ? i + 1 : 0];
      segments.push(new Segment(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1]));
    }
  }
  const endPoints: EndPoint[] = [];
  for (const segment of processSegments(point, segments)) {
    endPoints.push(segment.p1, segment.p2);
  }
  return { endPoints, segments };
}
