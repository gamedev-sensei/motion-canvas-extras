import {makeEditorPlugin} from "@motion-canvas/ui";
import {Presenter} from "@motion-canvas/core";
import {InteractionSource} from "@gamedev-sensei/in-motion";

export const InMotionEditorPlugin = makeEditorPlugin(() => {
    let canvas: HTMLCanvasElement | null = null
    let presenterOverlayCanvas: HTMLCanvasElement | null = null

    function passEvent(e: Event) {
        if (canvas === null) return

        const EventType = e.constructor as { new(type: string, init?: EventInit & Record<string, any>): Event }
        canvas.dispatchEvent(new EventType(e.type, e))
    }

    function setOverlayCanvas(newCanvas: HTMLCanvasElement) {
        if (presenterOverlayCanvas !== null)
            InteractionSource.SupportedEvents.forEach(e => presenterOverlayCanvas.removeEventListener(e, passEvent))
        presenterOverlayCanvas = newCanvas
        InteractionSource.SupportedEvents.forEach(e => presenterOverlayCanvas.addEventListener(e, passEvent))
    }

    return {
        name: "@gamedev-sensei/in-motion-editor",
        presenter(presenter: Presenter) {
            canvas = presenter.stage.finalBuffer
        },
        presenterOverlay: {
            drawHook: () => ctx => {
                setOverlayCanvas(ctx.canvas)
            }
        }
    }
})