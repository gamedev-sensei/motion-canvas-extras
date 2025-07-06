import {Stage} from "@motion-canvas/core";
import {useDerived} from "@gamedev-sensei/react-extras";

export function useMotionCanvasStage(): Stage {
    return useDerived(() => new Stage(), [])
}