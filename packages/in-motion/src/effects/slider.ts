import {SimpleSignal, Vector2} from "@motion-canvas/core";
import {Node} from "@motion-canvas/2d"
import {createDrag} from "./drag";

function clamp(v: number, min: number, max: number): number {
    return Math.max(Math.min(v, max), min)
}

type SliderParams<H extends Node, R extends Node> = {
    progress: SimpleSignal<number>
    handleRef: SimpleSignal<H | null>
    railRef: SimpleSignal<R | null>
}

export function createSlider<H extends Node, R extends Node>({ handleRef, railRef, progress }: SliderParams<H, R>) {
    createDrag(handleRef, pos => {
        const rail = railRef()
        if (!rail) return pos
        const localPos = pos.transformAsPoint(rail.worldToLocal())
        const bounds = rail.cacheBBox()

        const progressValue = clamp((localPos.x - bounds.x) / bounds.width, 0, 1)
        progress(progressValue)
        const localHandlePos = new Vector2([progressValue * bounds.width + bounds.x, bounds.y + bounds.height / 2])
        return localHandlePos.transformAsPoint(rail.localToWorld())
    })
}