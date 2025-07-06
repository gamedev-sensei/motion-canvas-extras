import {makeEditorPlugin} from "@motion-canvas/ui";
import {EventDispatcher, Presenter} from "@motion-canvas/core";
import {InteractionSource} from "@gamedev-sensei/in-motion";

export const InMotionEditorPlugin = makeEditorPlugin(() => {
    let presenterCanvas: HTMLCanvasElement | null = null
    let presenterOverlayCanvas: HTMLCanvasElement | null = null

    function passEvent(e: Event) {
        if (presenterCanvas === null) return

        const EventType = e.constructor as { new(type: string, init?: EventInit & Record<string, any>): Event }

        presenterCanvas.dispatchEvent(new EventType(e.type, e))
    }

    const presenterCanvasDispatcher = new EventDispatcher<HTMLCanvasElement>()

    const presenterOverlayCanvasDispatcher = new EventDispatcher<HTMLCanvasElement>()
    presenterOverlayCanvasDispatcher.subscribe(newCanvas => {
        if (presenterOverlayCanvas !== null)
            InteractionSource.SupportedEvents.forEach(e => presenterOverlayCanvas.removeEventListener(e, passEvent))
        presenterOverlayCanvas = newCanvas
        InteractionSource.SupportedEvents.forEach(e => presenterOverlayCanvas.addEventListener(e, passEvent))
    })

    return {
        name: "@gamedev-sensei/in-motion-editor",
        presenter(presenter: Presenter) {
            presenterCanvasDispatcher.dispatch(presenter.stage.finalBuffer)
        },
        presenterOverlay: {
            drawHook: () => ctx => {
                presenterOverlayCanvasDispatcher.dispatch(ctx.canvas);
            }
        }
    }
})