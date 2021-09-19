import "./App.css";
import { useState } from "react";
import { Layer, Stage, Rect } from "react-konva";
import { SplineLayer } from "./SplineLayer";
import { useControls } from "leva";

function App() {
  const { layers, backgroundColor } = useControls({
    layers: 1,
    backgroundColor: "#000000",
  });

  const [childrenPaths, setChildrenPaths] = useState({});

  return (
    <div className="App" style={{ display: "flex" }}>
      <div
        style={{
          width: "100vh",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Stage
          width={1000}
          height={1000}
          style={{ position: "absolute", inset: 0 }}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={1000}
              height={1000}
              fill={backgroundColor}
              sceneFunc={(context, shape) => {
                const p = new Path2D("M0,0L1000,0L1000,1000L0,1000Z");
                context.fillStrokeShape(shape);
                context._context.lineWidth = 0;
                context._context.fill(p);
              }}
            />
            {Array.from({ length: layers }).map((item, index) => (
              <SplineLayer
                index={index}
                exportPaths={(path) => setChildrenPaths(path)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <div>
        <ExportSVG
          paths={childrenPaths}
          numberOfLayers={layers}
          backgroundColor={backgroundColor}
        />
      </div>
    </div>
  );
}

const ExportSVG = ({ paths, numberOfLayers, backgroundColor }) => {
  const [hover, setHover] = useState(false);

  const serializedSVG =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1000" height="1000" viewBox="0 0 1000 1000"><rect x="0" y="0" width="1000" height="1000" fill="${backgroundColor}"/>${[
        ...Object.keys(paths),
      ]
        .slice(0, numberOfLayers)
        .map((key) => paths[key])
        .flat()
        .map(({ path, thickness, color, isFilled }) => {
          return `<path
        d="${path}"
        stroke="${color}"
        stroke-width="${thickness}"
        fill="${isFilled ? color : "transparent"}"
      />`;
        })}</svg>`
    );

  return (
    <a
      href={serializedSVG}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      download="download.svg"
      style={{
        padding: "10px",
        width: "180px",
        margin: "10px",
        background: hover ? "#00c853" : "#009624",
        color: "#fff",
        borderRadius: "5px",
        fontFamily: "sans-serif",
        fontSize: "24px",
        textDecoration: "none",
        display: "block",
        textAlign: "center",
        transition: "background 0.2s ease-in",
      }}
    >
      Export to SVG
    </a>
  );
};

export default App;
