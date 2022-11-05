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

    document.addEventListener("touchstart", lockTouchScroll, {passive: false});
    document.addEventListener("touchmove", lockTouchScroll, {passive: false});
    targetRef.current.style.overflow = isLocked ? "hidden" : "auto";

    return () => {
      document.removeEventListener("touchstart", lockTouchScroll);
      document.removeEventListener("touchmove", lockTouchScroll);
    };
  }, [isLocked, targetRef]);

  return {
    toggleScrollLock: () => setIsLocked((prev) => !prev),
    isLocked,
  };
};
