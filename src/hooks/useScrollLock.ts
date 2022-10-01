import { useEffect, useState } from "react";
export const useScrollLock = (defualtLocked = true) => {
  const [isLocked, setIsLocked] = useState(defualtLocked);

  useEffect(() => {
    const lockTouchScroll = (e: TouchEvent) => {
      if (isLocked) e.preventDefault();
    };

    document.addEventListener("touchstart", lockTouchScroll, false);
    document.addEventListener("touchmove", lockTouchScroll, false);
    window.document.body.style.overflow = isLocked ? "hidden" : "auto";

    return () => {
      document.removeEventListener("touchstart", lockTouchScroll, false);
      document.removeEventListener("touchmove", lockTouchScroll, false);
    };
  }, [isLocked]);

  return {
    toggleScrollLoack: () => setIsLocked((prev) => !prev),
    isLocked,
  };
};
