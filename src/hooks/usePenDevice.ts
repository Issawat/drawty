import { useEffect, useState } from "react";
import { PenEvent } from "../types/common";
import { PenDeviceState } from "../types/device";
import { transformPenEventToPenState } from "../utils/transformPenEventToPenState";

export const usePenDevice = (lockScroll = true): PenDeviceState => {
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
    const lockTouchScroll = (e: TouchEvent) => {
      e.preventDefault();
    };
    
    if (lockScroll) {
      document.addEventListener("touchstart", lockTouchScroll, false);
      document.addEventListener("touchmove", lockTouchScroll, false);
      window.document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("touchstart", lockTouchScroll, false);
      document.removeEventListener("touchmove", lockTouchScroll, false);
      window.document.body.style.overflow = "";
    }

    return () => {
      if (lockScroll) {
        document.removeEventListener("touchstart", lockTouchScroll, false);
        document.removeEventListener("touchmove", lockTouchScroll, false);
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
