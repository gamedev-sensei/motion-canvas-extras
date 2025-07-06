import {Circle, makeScene2D, Node, Txt} from '@motion-canvas/2d'
import {beginSlide, createRef, createSignal, loop, Reference, Vector2} from '@motion-canvas/core'
import {createInteractionEffect} from "@gamedev-sensei/in-motion"

function useDrag<N extends Node>(ref: Reference<N>): () => void {
    const dragging = createSignal(false)
    const offset = Vector2.createSignal(Vector2.zero)

    return createInteractionEffect(interaction => {
        if (interaction.type !== "pointer") return
        const pointerPos = interaction.position

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
    const txtRef = createRef<Txt>()

    createInteractionEffect(interaction => {
        if (interaction.type !== "pointer") return
        txtRef().text(interaction.position.toString())
    })

    useDrag(circle)

    view.add(<Circle ref={circle} size={320} fill={'lightseagreen'}/>)
    view.add(<Txt ref={txtRef} position={[0, 0]} fill="black" size={50}>Vector2(0, 0)</Txt>)

    yield loop(() => circle().scale(2, 2).to(1, 2))
    yield* beginSlide("end")
})
