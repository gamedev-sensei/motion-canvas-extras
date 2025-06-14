import {Circle, makeScene2D, Node} from '@motion-canvas/2d'
import {beginSlide, createRef, createSignal, loop, Reference, useScene, Vector2} from '@motion-canvas/core'
import {createInteractionEffect} from "@gamedev-sensei/in-motion"

function useDrag<N extends Node>(ref: Reference<N>) {
    const dragging = createSignal(false)
    const offset = Vector2.createSignal(Vector2.zero)
    const scene = useScene()

    createInteractionEffect(interaction => {
        if (interaction.type !== "pointer") return
        const pointerPos = (new Vector2(interaction.position)).sub(scene.getSize().scale(0.5))

        switch (interaction.action) {
            case "down": {
                if (ref().hit(pointerPos) === null) return
                dragging(true)
                offset(ref().absolutePosition().sub(pointerPos))
                break
            }
            case "up": {
                dragging(false)
                break
            }
            case "move": {
                if (!dragging()) return
                ref().absolutePosition(pointerPos.add(offset()))
                break
            }
        }
    })
}

export default makeScene2D(function* (view) {
    const circle = createRef<Circle>()

    view.add(<Circle ref={circle} size={320} fill={'lightseagreen'} />)

    useDrag(circle)

    yield loop(() => circle().scale(2, 2).to(1, 2))
    yield* beginSlide("end")
})
