import {Presenter, Project} from "@motion-canvas/core";
import {useStateWithDeps} from "use-state-with-deps";

export const useMotionCanvasPresenter = (project: Project) => {
    const [presenter] = useStateWithDeps(() => new Presenter(project), [project])

    return presenter
}