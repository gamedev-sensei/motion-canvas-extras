import {Presenter, Project} from "@motion-canvas/core";
import {useDerived} from "@gamedev-sensei/react-extras";

export const useMotionCanvasPresenter = (project: Project) => {
    return useDerived(() => new Presenter(project), [project])
}