import {InteractionBase} from "./shared";
import {Vector2} from "@motion-canvas/core";

export type PointerInteraction = InteractionBase<"pointer", {
    position: Vector2
    action: "up" | "down" | "move" | "click"
}>

export function pointerInteractionFromEvent(e: PointerEvent): PointerInteraction {
    const target = e.target as HTMLElement

    if (target.hasPointerCapture(e.pointerId))
        target.releasePointerCapture(e.pointerId);

    function getAction() {
        switch (e.type) {
            case "pointerdown": return "down"
            case "pointerup": return "up"
            case "pointermove": return "move"
            default: throw new Error("internal error, invalid event type")
        }
    }

    const rect = target.getBoundingClientRect()
    const relativePosition = new Vector2(e.clientX - rect.left, e.clientY - rect.top)

    return {
        type: "pointer",
        action: getAction(),
        position: relativePosition.div(new Vector2([ rect.width, rect.height ]))
    }
}