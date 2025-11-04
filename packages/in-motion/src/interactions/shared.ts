import {Scene2D} from "@motion-canvas/2d";

export type InteractionBase<Name extends string = string, Payload extends {} = {}> = {
    type: Name
    adjustToScene(scene: Scene2D): InteractionBase<Name, Payload>
} & Payload