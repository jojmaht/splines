import { Group, Shape } from "react-konva";
import { useControls, folder, buttonGroup } from "leva";
import { spline } from "@georgedoescode/spline";

const getPoints = (
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

    const x =
      layerDimensions / 2 +
      Math.cos(theta) * radius +
      offsetX +
      additionnalOffsetX;
    const y =
      layerDimensions / 2 +
      Math.sin(theta) * radius +
      offsetY +
      additionnalOffsetY;

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

const getPositionOffsets = (position) => {
  switch (position) {
    case "center":
      return { offsetX: 0, offsetY: 0 };
    case "top-left":
      return { offsetX: -500, offsetY: -500 };
    case "top-center":
      return { offsetX: 0, offsetY: -500 };
    case "top-right":
      return { offsetX: 500, offsetY: -500 };
    case "middle-left":
      return { offsetX: -500, offsetY: 0 };
    case "middle-right":
      return { offsetX: 500, offsetY: 0 };
    case "bottom-left":
      return { offsetX: -500, offsetY: 500 };
    case "bottom-center":
      return { offsetX: 0, offsetY: 500 };
    case "bottom-right":
      return { offsetX: 500, offsetY: 500 };
  }
};

export const SplineLayer = ({ index }) => {
  const layerLabel = `Layer ${index}`;
  const {
    shape,
    isFilled,
    color,
    tension,
    radius,
    nested,
    nColor,
    nTension,
    nShape,
    nRadius,
    nThickness,
    nRotation,
    useNestedParams,
    hideMainSpline,
    thickness,
    quickPosition,
    precisePosition,
    rotation,
  } = useControls({
    [layerLabel]: folder({
      shape: 4,
      isFilled: false,
      color: "#fff",
      tension: 0,
      radius: { value: 200, min: 0, max: 500, step: 1 },
      thickness: 1,
      rotation: { value: 0, min: -360, max: 360, step: 0.5 },
      quickPosition: {
        options: [
          "center",
          "top-left",
          "top-center",
          "top-right",
          "middle-left",
          "middle-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ],
      },
      precisePosition: { value: { x: 0, y: 0 }, step: 20 },
      nested: false,
      useNestedParams: {
        value: false,
        render: (get) => get(`${layerLabel}.nested`),
      },
      nestedParams: folder(
        {
          nShape: 3,
          nColor: "#ffffff",
          nTension: 0,
          nRadius: { value: 50, min: 0, max: 500, step: 1 },
          nThickness: { value: 1, min: 0, step: 1 },
          nRotation: { value: 0, min: -360, max: 360, step: 0.5 },
        },
        {
          render: (get) => get(`${layerLabel}.useNestedParams`),
        }
      ),
      hideMainSpline: {
        value: false,
        render: (get) => get(`${layerLabel}.nested`),
      },
    }),
  });
  const width = 1000;

  const points = getPoints(
    radius,
    shape,
    width,
    rotation,
    precisePosition,
    quickPosition
  );
  const mainPath = !hideMainSpline
    ? { path: spline(points, tension, true), color, thickness }
    : [];

  const nestedPaths = nested
    ? points.map((point) => {
        const nestedRadius = useNestedParams ? nRadius : radius / 4;
        const nestedRotation = useNestedParams ? nRotation : rotation / 4;
        const nestedShape = useNestedParams ? nShape : shape;
        const nestedTension = useNestedParams ? nTension : tension;
        const nestedThickness = useNestedParams ? nThickness : thickness;
        const nestedColor = useNestedParams ? nColor : color;

        return {
          path: spline(
            getPoints(nestedRadius, nestedShape, 0, nestedRotation, point),
            nestedTension,
            true
          ),
          color: nestedColor,
          thickness: nestedThickness,
        };
      })
    : [];

  const items = [mainPath, ...nestedPaths];

  return (
    <Group zIndex={index} draggable={true}>
      {items.map(({ path, color, thickness }) => (
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
      ))}
    </Group>
  );
};
