import {PresenterSettings, Project, Stage, Vector2} from "@motion-canvas/core";
import React, {FC, HTMLProps, useEffect, useState} from "react";
import {useMotionCanvasPresenter} from "./hooks";
import {MotionCanvasStage} from "./MotionCanvasStage";

export type MotionCanvasPresenterProps = {
    project: Project
    variables?: Record<string, unknown>
    width?: number
    height?: number
    resolutionScale?: number
} & Omit<HTMLProps<HTMLDivElement>, "height" | "width">

export const MotionCanvasPresenter: FC<MotionCanvasPresenterProps> = ({
    project,
    variables,
    width,
    height,
    resolutionScale,
    ...props
}) => {
    const presenter = useMotionCanvasPresenter({
        ...project,
        variables
    })
    const [stage] = useState(() => new Stage())

    useEffect(() => {
        for (const scene of presenter.playback.onScenesRecalculated.current) {
            scene.variables.updateSignals(variables)
        }
    }, [ variables, presenter ])

    useEffect(() => {
        const projectSettings = project.meta.getFullRenderingSettings()

        const presenterSettings: PresenterSettings = {
            ...projectSettings,
            size: new Vector2(width ?? projectSettings.size.x, height ?? projectSettings.size.y),
            resolutionScale: resolutionScale ?? projectSettings.resolutionScale,
            name: "presenter",
            slide: null
        }

        void presenter.present(presenterSettings)
    }, [width, height, resolutionScale, project, stage, presenter])

    return <MotionCanvasStage {...props} stage={presenter.stage} />
}