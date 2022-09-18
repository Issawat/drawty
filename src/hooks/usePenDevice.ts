import { useEffect, useState } from "react";
import { PenEvent } from "../types/common";
import { PenDeviceState } from "../types/device";
import { transformPenEventToPenState } from "../utils/transformPenEventToPenState";

export const DEFAULT_PEN_DEVICE_STATE: PenDeviceState = {
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
};

export const usePenDevice = (lockScroll = true): PenDeviceState => {
  const [penDeviceState, setPenDeviceState] = useState<PenDeviceState>(
    DEFAULT_PEN_DEVICE_STATE
  );

  useEffect(() => {
    const lockTouchScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    const removeListener = () => {
      document.removeEventListener("touchstart", lockTouchScroll, false);
      document.removeEventListener("touchmove", lockTouchScroll, false);
    };
    const addListener = () => {
      document.addEventListener("touchstart", lockTouchScroll, false);
      document.addEventListener("touchmove", lockTouchScroll, false);
    };

    if (lockScroll) {
      addListener();
      window.document.body.style.overflow = "hidden";
    } else {
      removeListener();
      window.document.body.style.overflow = "";
    }

    return () => {
      if (lockScroll) {
        removeListener();
      }
    };
  }, [lockScroll]);

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
