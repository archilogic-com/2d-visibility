import { loadMap } from "../load-map";
import { Point, PolygonWithHoles } from "../types";
import { calculateVisibility } from "../visibility";

describe("when computing visibility in an L shaped polygon", () => {
  const polygon: PolygonWithHoles = [
    [
      [0, 0],
      [200, 0],
      [200, 200],
      [400, 200],
      [400, 300],
      [0, 300],
    ],
  ];

  const point = new Point(100, 100);
  const { endPoints } = loadMap(polygon, point);
  const visibility = calculateVisibility(point, endPoints);
  it("creates creates a cut off shape", () => {
    expect(visibility).toMatchObject([
      [new Point(0, 300), new Point(0, 0)],
      [new Point(0, 0), new Point(200, 0)],
      [new Point(200, 0), new Point(200, 200)],
      [new Point(200, 200), new Point(200, 200)],
      [new Point(300, 300), new Point(0, 300)],
    ]);
  });
});
