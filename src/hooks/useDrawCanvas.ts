import fabric, { Canvas } from "fabric/fabric-impl";
import { useEffect, useRef, useState } from "react";

type UseDrawCanvasState = {
  isDrawingMode: boolean;
};

export type UseDrawCanvasOptions = {
  canvasId?: string;
};

const DEFAULT_CANVAS_ID = "use-draw-canvas";

const INIT_DRAW_CANVAS_STATE: UseDrawCanvasState = {
  isDrawingMode: false,
};

export const useDrawCanvas = (options: UseDrawCanvasOptions) => {
  const { canvasId = DEFAULT_CANVAS_ID } = options;

  const [isReady, setIsReady] = useState(false);
  const [drawCanvasState, _setDrawCanvasState] = useState<UseDrawCanvasState>(
    INIT_DRAW_CANVAS_STATE
  );

  const canvasRef = useRef<Partial<Canvas>>({});

  const updateDrawCanvasState = (newState: Partial<UseDrawCanvasState>) => {
    _setDrawCanvasState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const resetDrawCanvasState = () => {
    _setDrawCanvasState(INIT_DRAW_CANVAS_STATE);
  };

  useEffect(() => {
    canvasRef.current = new fabric.Canvas(canvasId, {
      isDrawingMode: false,
    });
    setIsReady(true);
  }, [canvasId]);

  useEffect(() => {
    canvasRef.current = drawCanvasState;
  }, [drawCanvasState]);

  return {
    canvasRef,
    isReady,
    drawCanvasState,
    resetDrawCanvasState,
    handlers: {},
  };
};
