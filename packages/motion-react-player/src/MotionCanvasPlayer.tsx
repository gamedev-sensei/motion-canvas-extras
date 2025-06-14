import {FC, HTMLProps, useEffect, useState} from "react";
import {Project, Stage, Vector2} from "@motion-canvas/core";
import {useMotionCanvasPlayer, useMotionCanvasRender} from "./hooks";
import React from "react";
import {MotionCanvasStage} from "./MotionCanvasStage";

export type MotionCanvasPlayerProps = {
    project: Project
    variables?: Record<string, unknown>
    width?: number
    height?: number
    resolutionScale?: number
    playing: boolean
    loop?: boolean
} & Omit<HTMLProps<HTMLDivElement>, "height" | "width">

export const MotionCanvasPlayer: FC<MotionCanvasPlayerProps> = ({
    project,
    variables,
    width,
    height,
    resolutionScale,
    playing,
    loop
}) => {
    const player = useMotionCanvasPlayer(project)
    const [stage] = useState(() => new Stage())

    useEffect(() => {
        const projectSettings = project.meta.getFullRenderingSettings()

        const playerSettings = {
            ...projectSettings,
            size: new Vector2(width ?? projectSettings.size.x, height ?? projectSettings.size.y),
            resolutionScale: resolutionScale ?? projectSettings.resolutionScale
        }

        stage.configure(playerSettings)
        void player.configure(playerSettings)
    }, [width, height, resolutionScale, project, stage, player])

    useEffect(() => player.setVariables(variables ?? {}), [variables]);
    useMotionCanvasRender({ player, stage })

    useEffect(() => {
        player.activate()
        return () => player.deactivate()
    }, [player]);

    useEffect(() => player.togglePlayback(playing), [player, playing]);
    useEffect(() => player.toggleLoop(loop), [player, loop]);

    return <MotionCanvasStage stage={stage} />
}