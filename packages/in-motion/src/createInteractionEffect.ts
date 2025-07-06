import {
    createDeferredEffect,
    createEffect,
    createSignal,
    SubscribableEvent,
    useScene
} from "@motion-canvas/core"
import {config} from "./data";
import {Interaction} from "./interactions";
import { Scene2D } from "@motion-canvas/2d";

function adjustInteractionCoordinates(interaction: Interaction, scene: Scene2D): Interaction {
    const size = scene.getSize()
    switch (interaction.type) {
        case "pointer": return {
            ...interaction,
            position: scene.transformMousePosition(interaction.position.x * size.x, interaction.position.y * size.y)!
        }
        default: return interaction
    }
}

function noop(): void {}

export function createInteractionEffect(handler: (interaction: Interaction) => void): () => void {
    const scene = useScene()

    if (!(scene instanceof Scene2D)) return noop

    const scene2D = scene

    const interactionSource = scene.variables.get<SubscribableEvent<Interaction> | null>(config.interactionSourceVariableKey, null)

    const interactions = createSignal<Interaction[]>([])

    function storeInteraction(interaction: Interaction) {
        interactions([...interactions(), adjustInteractionCoordinates(interaction, scene2D)])
    }

    const cleanupSubscribe = createEffect(() => {
        const source = interactionSource()
        if (!source) return
        //subscribe only if interactionSource exists
        source.subscribe(storeInteraction)
    })
    const cleanupDispatch = createDeferredEffect(() => {
        for (const interaction of interactions()) handler(interaction)
        if (interactions().length > 0) interactions([])
    })

    return () => {
        cleanupSubscribe()
        cleanupDispatch()
    }
}