import {Player, Project} from "@motion-canvas/core";
import {useDerived} from "@gamedev-sensei/react-extras";

export const useMotionCanvasPlayer = (project: Project) => {
    return useDerived(() => new Player(project), [project])
}