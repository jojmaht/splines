import { getPositionOffsets } from "./positionUtils";

const getPointsFromSchlafli = ([p, q]) => {
  const indices = [0];
  for (let i = 1; i <= p; i++) {
    indices.push((q * i) % p);
  }
  return indices;
};

const starPolygonIndices = {
  3: [0, 1, 2, 0],
  4: [0, 2, 3, 1, 0],
  5: getPointsFromSchlafli([5, 2]),
  6: [0, 2, 5, 3, 1, 4, 0],
  7: getPointsFromSchlafli([7, 3]),
  8: getPointsFromSchlafli([8, 3]),
  9: getPointsFromSchlafli([9, 2]),
  10: getPointsFromSchlafli([10, 3]),
  11: getPointsFromSchlafli([11, 3]),
  12: getPointsFromSchlafli([12, 5]),
  13: getPointsFromSchlafli([13, 3]),
};

console.log(starPolygonIndices);

export const getStarPolygonPoints = (
  radius,
  shape,
  layerDimensions,
  rotation,
  precisePosition = { x: 0, y: 0 },
  quickPosition = "center"
) => {
  const points = [];
  const numPoints = Math.max(3, Math.min(shape, 13));
  const angleStep = (Math.PI * 2) / numPoints;
  const { offsetX, offsetY } = getPositionOffsets(quickPosition);
  const { x: additionnalOffsetX, y: additionnalOffsetY } = precisePosition;

  const pointIndices = starPolygonIndices[numPoints]
    ? starPolygonIndices[numPoints]
    : getPointsFromSchlafli([numPoints, 3]);

  for (let i = 1; i <= numPoints; i++) {
    const theta =
      angleStep * pointIndices[i] + Math.PI * 2 * ((rotation - 90) / 360);

    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;

    points.push(
      ...[
        {
          x: layerDimensions / 2 + offsetX + additionnalOffsetX + x,
          y: layerDimensions / 2 + offsetY + additionnalOffsetY + y,
          theta,
        },
      ]
    );
  }

  return points;
};
