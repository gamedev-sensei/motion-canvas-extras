import {createSignal, SimpleSignal} from "@motion-canvas/core";
import {Node} from "@motion-canvas/2d";
import {createInteractionEffect} from "../createInteractionEffect";

export function createHover<T extends Node>(ref: SimpleSignal<T | null>): SimpleSignal<boolean> {
    const hovered = createSignal(false)

    createInteractionEffect(i => {
        if (i.type !== "pointer") return
        const elem = ref()

        if (!elem) return

        switch (i.action) {
            case "move": {
                const localPos = i.position.transformAsPoint(elem.worldToLocal())
                const box = elem.cacheBBox()

                hovered(box.includes(localPos))
                return
            }
        }
    })

    return hovered
}