import React from "react";
import { useDrawCanvas } from "./hooks/useDrawCanvas";
// import { usePenDevice } from "./hooks/usePenDevice";
// import { useScrollLock } from "./hooks/useScrollLock";

const CANVAS_ID = "SAMPLE_ID";

function App() {
  const { isReady, reset, updateAndRenderAll } = useDrawCanvas({
    canvasId: CANVAS_ID,
    initialSettings: {
      isDrawingMode: true,
      backgroundColor: 'pink'
    },
  });
  // const { isLocked, toggleScrollLock } = useScrollLock({});
  return (
    <div>
      {/* <h3>Pen device demo</h3>
      <button onClick={toggleScrollLock}>
        {isLocked ? "Unlock" : "Lock"} scroll
      </button> */}
      {!isReady ? "Canvas is loading..." : <canvas id={CANVAS_ID} />}
    </div>
  );
}

export default App;
