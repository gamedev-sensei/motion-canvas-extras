import {InteractionBase} from "./shared";
import {Vector2} from "@motion-canvas/core";
import {Scene2D} from "@motion-canvas/2d";

type Action = "up" | "down" | "move" | "click"

export class PointerInteraction implements InteractionBase<"pointer"> {
    type: "pointer" = "pointer"

    constructor(public action: Action, public position: Vector2) {}

    adjustToScene(scene: Scene2D): PointerInteraction {
        return new PointerInteraction(this.action, this.position.mul(scene.getSize()))
    }
}

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

    return new PointerInteraction(getAction(), relativePosition.div(new Vector2([ rect.width, rect.height ])))
}