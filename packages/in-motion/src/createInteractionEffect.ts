import {createDeferredEffect, createEffect, createSignal, Scene, SubscribableEvent, useScene} from "@motion-canvas/core"
import {config} from "./data";
import {Interaction} from "./interactions";

function adjustInteractionCoordinates(interaction: Interaction, scene: Scene): Interaction {
    switch (interaction.type) {
        case "pointer": return {
            ...interaction,
            position: interaction.position.mul(scene.getSize())
        }
        default: return interaction
    }
}

export function createInteractionEffect(handler: (interaction: Interaction) => void) {
    const scene = useScene()
    const interactionSource = scene.variables.get<SubscribableEvent<Interaction> | null>(config.interactionSourceVariableKey, null)

    const interactions = createSignal<Interaction[]>([])

    function storeInteraction(interaction: Interaction) {
        interactions([...interactions(), adjustInteractionCoordinates(interaction, scene)])
    }

    createEffect(() => {
        //subscribe only if interactionSource exists
        interactionSource()?.subscribe(storeInteraction)
    })

    createDeferredEffect(() => {
        for (const interaction of interactions()) handler(interaction)
        if (interactions().length > 0) interactions([])
    })
}