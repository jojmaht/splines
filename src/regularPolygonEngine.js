import { getPositionOffsets } from "./positionUtils";

export const getRegularPolygonPoints = (
  radius,
  shape,
  layerDimensions,
  rotation,
  precisePosition = { x: 0, y: 0 },
  quickPosition = "center"
) => {
  const points = [];
  const numPoints = shape === 0 ? 12 : shape;
  const angleStep = (Math.PI * 2) / numPoints;
  const { offsetX, offsetY } = getPositionOffsets(quickPosition);
  const { x: additionnalOffsetX, y: additionnalOffsetY } = precisePosition;

  for (let i = 1; i <= numPoints; i++) {
    const theta = i * angleStep + Math.PI * 2 * ((rotation - 90) / 360);

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
