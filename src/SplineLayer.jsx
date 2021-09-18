import { Group, Shape } from "react-konva";
import { useControls, folder, buttonGroup } from "leva";
import { spline } from "@georgedoescode/spline";

import { getRegularPolygonPoints } from "./regularPolygonEngine";
import { getStarPolygonPoints } from "./starPolygonEngine";

export const SplineLayer = ({ index }) => {
  const layerLabel = `Layer ${index}`;
  const {
    type,
    shape,
    isFilled,
    color,
    tension,
    radius,
    nested,
    nColor,
    nTension,
    nType,
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
      type: {
        options: ["polygon", "star"],
      },
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
          nType: {
            options: ["polygon", "star"],
          },
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

  const getPointsGetter = (type) => {
    if (type === "star") {
      return getStarPolygonPoints;
    } else return getRegularPolygonPoints;
  };

  const points = getPointsGetter(type)(
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
    ? points
        .map((point) => {
          const nestedType = useNestedParams ? nType : type;
          const nestedRadius = useNestedParams ? nRadius : radius / 2;
          const nestedRotation = useNestedParams ? nRotation : rotation / 4;
          const nestedShape = useNestedParams ? nShape : shape;
          const nestedTension = useNestedParams ? nTension : tension;
          const nestedThickness = useNestedParams ? nThickness : thickness;
          const nestedColor = useNestedParams ? nColor : color;

          const nestedPoints = getPointsGetter(nestedType)(
            nestedRadius,
            nestedShape,
            0,
            nestedRotation,
            point
          );

          return [
            {
              path: spline(nestedPoints, nestedTension, true),
              color: nestedColor,
              thickness: nestedThickness,
            },
          ].flat();
        })
        .flat()
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
