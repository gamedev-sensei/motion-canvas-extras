import React, {FC, HTMLProps, useEffect, useRef} from "react";
import {Stage} from "@motion-canvas/core";

export const MotionCanvasStage: FC<{ stage: Stage } & HTMLProps<HTMLDivElement>> = ({ stage, ref, ...props }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // append the external canvas into our div
        container.appendChild(stage.finalBuffer);

        // cleanup on unmount or externalCanvas change
        return () => {
            if (container.contains(stage.finalBuffer))
                container.removeChild(stage.finalBuffer)
        };
    }, [stage])

    return <div id="root" ref={r => {
        containerRef.current = r
        if (!ref) return
        if ("current" in ref) ref.current = r
        else ref(r)
    }} {...props}/>
}