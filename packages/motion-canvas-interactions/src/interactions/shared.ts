export type InteractionBase<Name extends string, Payload extends {}> = {
    type: Name
} & Payload