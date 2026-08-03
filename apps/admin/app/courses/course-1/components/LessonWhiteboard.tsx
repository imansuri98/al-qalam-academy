"use client";

import React, { useRef, useEffect } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

interface LessonWhiteboardProps {
  initialData?: any;
  onChange?: (data: any) => void;
}

export default function LessonWhiteboard({ initialData, onChange }: LessonWhiteboardProps) {
  const apiRef = useRef<any>(null);
  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      isMountedRef.current = true;
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden" style={{ height: 520 }}>
      <Excalidraw
        excalidrawAPI={(api) => { apiRef.current = api; }}
        initialData={initialData ?? {
          appState: {
            viewBackgroundColor: "#F8FAF6",
            currentItemFontFamily: 1,
          },
          elements: [],
        }}
        onChange={(elements, appState) => {
          if (isMountedRef.current && onChange) {
            onChange({ elements, appState });
          }
        }}
        UIOptions={{
          canvasActions: {
            export: false,
            loadScene: false,
          },
        }}
        langCode="en"
      />
    </div>
  );
}
