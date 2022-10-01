import { useEffect, useState } from "react";
import { PenEvent } from "../types/common";
import { PenDeviceState } from "../types/device";
import { transformPenEventToPenState } from "../utils/transformPenEventToPenState";

export const usePenDevice = (): PenDeviceState => {
  const [penDeviceState, setPenDeviceState] = useState<PenDeviceState>({
    deviceType: "unknown",
    pressure: 0,
    id: null,
    client: {
      x: null,
      y: null,
    },
    tilt: {
      x: null,
      y: null,
    },
  });


  useEffect(() => {
    const updatePenDeviceState = (event: PenEvent) => {
      if (event) {
        const newPenState = transformPenEventToPenState(event);
        setPenDeviceState(newPenState);
      }
    };
    window.addEventListener("pointermove", updatePenDeviceState);

    return () => {
      window.removeEventListener("pointermove", updatePenDeviceState);
    };
  }, []);

  return penDeviceState;
};
