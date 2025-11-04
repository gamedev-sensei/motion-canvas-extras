import {Circle, makeScene2D, Txt} from '@motion-canvas/2d'
import {beginSlide, createRef, createSignal, loop} from '@motion-canvas/core'
import {createInteractionEffect} from "@gamedev-sensei/in-motion"
import {createDrag} from "@gamedev-sensei/in-motion";

export default makeScene2D(function* (view) {
    const circle = createSignal<Circle | null>(null)
    const txtRef = createRef<Txt>()

    createInteractionEffect(interaction => {
        if (interaction.type !== "pointer") return
        txtRef().text(interaction.position.toString())
    })

    createDrag(circle)

    view.add(<Circle ref={circle} size={320} fill={'lightseagreen'}/>)
    view.add(<Txt ref={txtRef} position={[0, 0]} fill="black" size={50}>Vector2(0, 0)</Txt>)

    yield loop(() => circle()?.scale(2, 2)?.to(1, 2))
    yield* beginSlide("end")
})
