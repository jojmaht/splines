import { Group, Shape } from "react-konva";
import { useControls, folder } from "leva";
import { spline } from "@georgedoescode/spline";

const getPoints = (radius, shape, layerDimensions, rotation, variance = 1) => {
  const points = [];
  const numPoints = shape === 0 ? 12 : shape;
  const angleStep = (Math.PI * 2) / numPoints;

  for (let i = 1; i <= numPoints; i++) {
    const theta = i * angleStep + Math.PI * 2 * ((rotation - 90) / 360);

    const x = layerDimensions / 2 + Math.cos(theta) * radius;
    const y = layerDimensions / 2 + Math.sin(theta) * radius;

    points.push(
      ...[
        {
          x,
          y,
          theta,
        },
      ]
    );
  }

  return points;
};

export const SplineLayer = ({ index }) => {
  const {
    shape,
    isFilled,
    color,
    tension,
    radius,
    thickness,
    variance,
    rotation,
  } = useControls({
    [`Layer ${index}`]: folder({
      shape: 4,
      isFilled: false,
      color: "#fff",
      tension: 0,
      radius: { value: 200, min: 0, max: 500, step: 1 },
      thickness: 1,
      rotation: { value: 0, min: -360, max: 360, step: 0.5 },
    }),
  });
  const width = 1000;

  const points = getPoints(radius, shape, width, rotation);
  const path = spline(points, tension, true);

  return (
    <Group zIndex={index} draggable={true}>
      <Shape
        stroke={color}
        strokeWidth={thickness}
        x={0}
        y={0}
        draggable={true}
        sceneFunc={(context, shape) => {
          const p = new Path2D(path);
          context.fillStrokeShape(shape);
          context._context.lineWidth = thickness;
          context._context.strokeStyle = color;
          context._context.fillStyle = isFilled ? color : "transparent";
          context._context.fill(p);
          context._context.stroke(p);
        }}
      ></Shape>
    </Group>
  );
};
