import React from "react";
import { usePenDevice } from "./hooks/usePenDevice";

function App() {
  const pen = usePenDevice();

  return (
    <div>
      <h3>Pen device demo</h3>
      <p>Device Type: {pen.deviceType}</p>
      <p>Pressure: {pen.pressure}</p>
      <p>Tilt: {JSON.stringify(pen.tilt)}</p>
      <p>Client: {JSON.stringify(pen.client)}</p>
      <p>Button: {pen.buttons ?? "There's no touch/click action yet"}</p>
    </div>
  );
}

export default App;
