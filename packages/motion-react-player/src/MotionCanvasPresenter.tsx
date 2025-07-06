import {PresenterSettings, Project, Vector2} from "@motion-canvas/core";
import React, {FC, HTMLProps, useEffect} from "react";
import {useMotionCanvasPresenter, useMotionCanvasStage} from "./hooks";
import {MotionCanvasStage} from "./MotionCanvasStage";

export type MotionCanvasPresenterProps = {
    project: Project
    width?: number
    height?: number
    resolutionScale?: number
} & Omit<HTMLProps<HTMLDivElement>, "height" | "width">

export const MotionCanvasPresenter: FC<MotionCanvasPresenterProps> = ({
    project,
    width,
    height,
    resolutionScale,
    ...props
}) => {
    const presenter = useMotionCanvasPresenter(project)
    const stage = useMotionCanvasStage()

    useEffect(() => {
        const projectSettings = project.meta.getFullRenderingSettings()

        const presenterSettings: PresenterSettings = {
            ...projectSettings,
            size: new Vector2(width ?? projectSettings.size.x, height ?? projectSettings.size.y),
            resolutionScale: resolutionScale ?? projectSettings.resolutionScale,
            name: "presenter",
            slide: null
        }

        stage.configure(presenterSettings)
        void presenter.present(presenterSettings)
    }, [width, height, resolutionScale, project, stage, presenter])

    return <MotionCanvasStage {...props} stage={presenter.stage} />
}