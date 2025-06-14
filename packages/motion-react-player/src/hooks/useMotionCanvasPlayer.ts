import {Player, Project} from "@motion-canvas/core";
import {useStateWithDeps} from "use-state-with-deps";

export const useMotionCanvasPlayer = (project: Project) => {
    const [player] = useStateWithDeps(() => new Player(project), [project])

    return player
}