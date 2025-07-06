import {EventDispatcher, makePlugin, Presenter, Project} from "@motion-canvas/core";
import {InteractionSource} from "./InteractionSource";
import {config} from "./data";

export const InMotionPlugin = makePlugin(() => {
    const interactionSource = new InteractionSource()

    let presenterCanvas: HTMLCanvasElement | null = null

    const presenterCanvasDispatcher = new EventDispatcher<HTMLCanvasElement>()
    presenterCanvasDispatcher.subscribe(newCanvas => {
        if (presenterCanvas !== null) interactionSource.unbind(presenterCanvas)
        presenterCanvas = newCanvas
        interactionSource.bind(presenterCanvas)
    })

    return {
        name: "@gamedev-sensei/motion-canvas-interactions",
        presenter(presenter: Presenter) {
            presenterCanvasDispatcher.dispatch(presenter.stage.finalBuffer)
        },
        project(project: Project) {
            (project.variables ??= {})[config.interactionSourceVariableKey] = interactionSource.subscribable
        }
    }
})