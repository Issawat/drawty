import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

export type UseDrawCanvasOptions = {
  canvasId: string;
  initialSettings?: fabric.ICanvasOptions;
};

export const useDrawCanvas = (options: UseDrawCanvasOptions) => {
  const fabricRef = useRef<fabric.Canvas>();
  const fabricCanvas = fabricRef.current;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fabricRef.current = new fabric.Canvas(
      options.canvasId,
      options.initialSettings
    );
    console.log(fabricRef.current)
    setIsReady(true);
  }, []);

  const updateAndRenderAll = (
    updateCallback: (canvas: fabric.Canvas) => void
  ) => {
    if (fabricCanvas) {
      updateCallback(fabricCanvas);
    }
    fabricCanvas?.renderAll();
  };

  const reset = () => {
    fabricCanvas?.clear();
  };

  return {
    isReady,
    updateAndRenderAll,
    reset,
  };
};
