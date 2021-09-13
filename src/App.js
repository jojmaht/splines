import "./App.css";
import { Layer, Stage, Rect } from "react-konva";
import { SplineLayer } from "./SplineLayer";
import { useControls } from "leva";

function App() {
  const { layers, backgroundColor } = useControls({
    layers: 1,
    backgroundColor: "#000000",
  });

  return (
    <div className="App">
      <div style={{ width: "100vh", height: "100vh", position: "relative" }}>
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
              <SplineLayer index={index} />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;
