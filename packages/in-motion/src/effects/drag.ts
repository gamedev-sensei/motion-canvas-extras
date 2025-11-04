import {createEffect, createSignal, SimpleSignal, Vector2} from "@motion-canvas/core";
import {createInteractionEffect} from "../createInteractionEffect";
import {Node} from "@motion-canvas/2d";

function id<T>(v: T): T {
    return v
}

export function createDrag<T extends Node>(ref: SimpleSignal<T | null>, constraint: (pos: Vector2) => Vector2 = id) {
    const dragging = createSignal(false)
    const dragPos = createSignal<Vector2 | null>(null)
    const pos = createSignal(() => constraint(dragPos() ?? ref()?.absolutePosition() ?? Vector2.zero))

    createInteractionEffect(i => {
        if (i.type !== "pointer") return
        const elem = ref()
        if (!elem) return

        switch (i.action) {
            case "down": {
                const localPos = i.position.transformAsPoint(elem.worldToLocal())
                const box = elem.cacheBBox()

                dragging(box.includes(localPos))
                return
            }
            case "up": {
                dragging(false)
                return
            }
            case "move": {
                if (!dragging()) return

                dragPos(i.position)
            }
        }
    })

    createEffect(() => {
        const elem = ref()
        if (!elem) return
        elem.absolutePosition(pos)
    })

    return { dragging }
}