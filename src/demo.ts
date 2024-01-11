import { drawScene } from './draw-scene';
import { loadMap } from './load-map';
import { calculateVisibility } from './visibility';
import { Point, PolygonWithHoles } from './types';

// Prepare canvas
const canvas = document.getElementById('scene') as HTMLCanvasElement;
if (!canvas) {
  throw new Error('Could not get element');
}
const ctx = canvas.getContext('2d');
if (!ctx) {
  throw new Error('Could not get context');
}
const xOffset = 0.5;
const yOffset = 0.5;
ctx.translate(xOffset, yOffset);

const polygon: PolygonWithHoles = [
  [
    [0, 0],
    [200, 0],
    [200, 200],
    [220, 200],
    [220, 50],
    [700, 50],
    [700, 500],
    [600, 500],
    [600, 300],
    [400, 300],
    [400, 320],
    [580, 320],
    [580, 450],
    [0, 450],
  ],
  [
    [120, 100],
    [150, 100],
    [150, 250],
    [250, 250],
    [250, 270],
    [120, 270],
  ],
  [
    [400, 150],
    [500, 150],
    [500, 250],
    [400, 250]
  ]
];


const run = (point: Point) => {
  const { endPoints, segments} = loadMap(polygon, point);
  const visibility = calculateVisibility(point, endPoints);

  requestAnimationFrame(() =>
    drawScene(ctx, point, segments, visibility));
};

canvas.addEventListener('mousemove', ({ pageX, pageY }) => {
  run(new Point(pageX, pageY));
});

run(new Point(100, 100));
