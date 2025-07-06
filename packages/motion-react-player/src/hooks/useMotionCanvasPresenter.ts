import {Presenter, Project} from "@motion-canvas/core";
import {useDerived} from "@gamedev-sensei/react-extras";
import {useEffect} from "react";

export const useMotionCanvasPresenter = (project: Project) => {
    const presenter = useDerived(() => new Presenter(project), [project])

    useEffect(() => {
        project.plugins.forEach(plugin => plugin.presenter?.(presenter))
    }, [ project, presenter ])

    return presenter
}