import { EndPoint, Point, Segment } from './types';

const leftOf = (segment: Segment, point: Point) => {
  const cross = (segment.p2.x - segment.p1.x) * (point.y - segment.p1.y)
    - (segment.p2.y - segment.p1.y) * (point.x - segment.p1.x);
  return cross < 0;
};

const interpolate = (pointA: Point, pointB: Point, f: number) => {
  return new Point(
    pointA.x * (1 - f) + pointB.x * f,
    pointA.y * (1 - f) + pointB.y * f,
  );
};

export const segmentInFrontOf = (segmentA: Segment, segmentB: Segment, relativePoint: Point) => {
  const A1 = leftOf(segmentA, interpolate(segmentB.p1, segmentB.p2, 0.01));
  const A2 = leftOf(segmentA, interpolate(segmentB.p2, segmentB.p1, 0.01));
  const A3 = leftOf(segmentA, relativePoint);
  const B1 = leftOf(segmentB, interpolate(segmentA.p1, segmentA.p2, 0.01));
  const B2 = leftOf(segmentB, interpolate(segmentA.p2, segmentA.p1, 0.01));
  const B3 = leftOf(segmentB, relativePoint);

  if (B1 === B2 && B2 !== B3) {
    return true;
  }
  if (A1 === A2 && A2 === A3) {
    return true;
  }
  if (A1 === A2 && A2 !== A3) {
    return false;
  }
  if (B1 === B2 && B2 === B3) {
    return false;
  }

  return false;
};

export function lineIntersection(point1: Point, point2: Point, point3: Point, point4: Point): Point {
  const s = (
    (point4.x - point3.x) * (point1.y - point3.y) -
    (point4.y - point3.y) * (point1.x - point3.x)
  ) / (
    (point4.y - point3.y) * (point2.x - point1.x) -
    (point4.x - point3.x) * (point2.y - point1.y)
  );

  return new Point(point1.x + s * (point2.x - point1.x), point1.y + s * (point2.y - point1.y));
}

export function endpointCompare(pointA: EndPoint, pointB: EndPoint) {
  if (pointA.angle > pointB.angle) {
    return 1;
  }
  if (pointA.angle < pointB.angle) {
    return -1;
  }
  if (!pointA.beginsSegment && pointB.beginsSegment) {
    return 1;
  }
  if (pointA.beginsSegment && !pointB.beginsSegment) {
    return -1;
  }
  return 0;
}
