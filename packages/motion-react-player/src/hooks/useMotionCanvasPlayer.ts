import {Player, Project} from "@motion-canvas/core";
import {useDerived} from "@gamedev-sensei/react-extras";
import {useEffect} from "react";

export const useMotionCanvasPlayer = (project: Project) => {
    const player = useDerived(() => new Player(project), [project])

    useEffect(() => {
        project.plugins.forEach(plugin => plugin.player?.(player))
    }, [ project, player ])

    return player
}