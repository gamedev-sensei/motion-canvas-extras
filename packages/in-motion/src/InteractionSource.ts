import {EventDispatcher, Subscribable} from "@motion-canvas/core";
import {Interaction, pointerInteractionFromEvent} from "./interactions";

type Handler<E extends keyof HTMLElementEventMap> = (e: HTMLElementEventMap[E]) => Interaction | undefined

const handlers = new Map<keyof HTMLElementEventMap, Handler<keyof HTMLElementEventMap>>()
function registerHandler<E extends keyof HTMLElementEventMap>(events: readonly E[], handler: Handler<E>) {
    events.forEach(e => handlers.set(e, handler))
}
function interactionFromEvent(e: Event): Interaction | undefined {
    const handler = handlers.get(e.type as keyof HTMLElementEventMap)
    return handler === undefined ? undefined : handler(e)
}

const pointerEvents = [ "pointerdown", "pointerup", "pointermove" ] as const
registerHandler(pointerEvents, pointerInteractionFromEvent)

export class InteractionSource {
    static readonly SupportedEvents = [...handlers.keys()]

    private dispatcher: EventDispatcher<Interaction> = new EventDispatcher<Interaction>()
    private eventHandler: (e: Event) => void = this.handleEvent.bind(this)

    public get subscribable(): Subscribable<Interaction> {
        return this.dispatcher.subscribable
    }

    public dispatch(interaction: Interaction) {
        this.dispatcher.dispatch(interaction)
    }

    public bind(element: HTMLElement) {
        InteractionSource.SupportedEvents.forEach(e => element.addEventListener(e, this.eventHandler))
    }
    public unbind(element: HTMLElement) {
        InteractionSource.SupportedEvents.forEach(e => element.removeEventListener(e, this.eventHandler))
    }
    public clear() {
        this.dispatcher.clear()
    }

    private handleEvent(e: Event) {
        const interaction = interactionFromEvent(e)
        if (interaction) this.dispatch(interaction)
    }
}