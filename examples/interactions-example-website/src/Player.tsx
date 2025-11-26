import {
    MotionCanvasPresenter,
} from "@gamedev-sensei/motion-react-player";
import {type FC} from "react";
import {useRemoteMotionCanvasProject} from "./useRemoteMotionCanvasProject.ts";

export const Player: FC<{ src: string }> = ({ src }) => {
    const { data: project } = useRemoteMotionCanvasProject(src)

    if (!project) return null

    return <MotionCanvasPresenter project={project} loop />
}