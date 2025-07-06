import {EventDispatcher, makePlugin, Presenter, Project} from "@motion-canvas/core";
import {InteractionSource} from "./InteractionSource";
import {config} from "./data";

export const InMotionPlugin = makePlugin(() => {
    const interactionSource = new InteractionSource()

    let presenterCanvas: HTMLCanvasElement | null = null

    const presenterDispatcher = new EventDispatcher<Presenter>()
    presenterDispatcher.subscribe(presenter => {
        if (presenterCanvas !== null) interactionSource.unbind(presenterCanvas)
        presenterCanvas = presenter.stage.finalBuffer
        interactionSource.bind(presenterCanvas)

        presenter.playback.onSceneChanged.subscribe(interactionSource.clear.bind(interactionSource))
    })

    return {
        name: "@gamedev-sensei/in-motion",
        presenter(presenter: Presenter) {
            presenterDispatcher.dispatch(presenter)
        },
        project(project: Project) {
            (project.variables ??= {})[config.interactionSourceVariableKey] = interactionSource.subscribable
        }
    }
})