import { MutableRefObject, useEffect, useState } from "react";

type UseScrollLockParams = {
  defaultChecked?: boolean;
  targetRef?: MutableRefObject<any>;
};

export const useScrollLock = ({
  defaultChecked = true,
  targetRef = { current: window.document.body },
}: UseScrollLockParams) => {
  const [isLocked, setIsLocked] = useState(defaultChecked);

  useEffect(() => {
    const lockTouchScroll = (e: TouchEvent) => {
      if (isLocked) e.preventDefault();
    };

    document.addEventListener("touchstart", lockTouchScroll, false);
    document.addEventListener("touchmove", lockTouchScroll, false);
    targetRef.current.style.overflow = isLocked ? "hidden" : "auto";

    return () => {
      document.removeEventListener("touchstart", lockTouchScroll, false);
      document.removeEventListener("touchmove", lockTouchScroll, false);
    };
  }, [isLocked, targetRef]);

  return {
    toggleScrollLoack: () => setIsLocked((prev) => !prev),
    isLocked,
  };
};
