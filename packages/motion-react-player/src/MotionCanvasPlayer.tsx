import React, {FC, HTMLProps, useEffect} from "react";
import {Project, Stage, Vector2} from "@motion-canvas/core";
import {useMotionCanvasPlayer, useMotionCanvasRender} from "./hooks";
import {MotionCanvasStage} from "./MotionCanvasStage";
import {useDerived} from "@gamedev-sensei/react-extras";
import * as R from "remeda";

export type MotionCanvasPlayerProps = {
    project: Project
    variables?: Record<string, unknown>
    width?: number
    height?: number
    resolutionScale?: number
    playing: boolean
    loop?: boolean
    speed?: number
    volume?: number
} & Omit<HTMLProps<HTMLDivElement>, "height" | "width">

export const MotionCanvasPlayer: FC<MotionCanvasPlayerProps> = ({
    project,
    variables,
    width,
    height,
    resolutionScale,
    playing,
    loop,
    speed,
    volume
}) => {
    const player = useMotionCanvasPlayer(project)
    const stage = useDerived(() => new Stage(), [])

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

    useEffect(() => player.setSpeed(speed ?? 1), [speed])
    useEffect(() => player.setAudioVolume(volume ?? 1), [volume])

    useEffect(() => player.setVariables(R.merge(project.variables, variables ?? {})), [variables])
    useMotionCanvasRender({ player, stage })

    useEffect(() => {
        player.activate()
        return () => player.deactivate()
    }, [player])

    useEffect(() => player.togglePlayback(playing), [player, playing])
    useEffect(() => player.toggleLoop(loop), [player, loop])

    return <MotionCanvasStage stage={stage} />
}