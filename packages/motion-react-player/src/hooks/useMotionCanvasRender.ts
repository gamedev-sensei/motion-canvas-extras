import {Player, Stage} from "@motion-canvas/core";
import {useCallback, useEffect} from "react";

type UseMotionCanvasRenderProps = {
    stage: Stage
    player: Player
}

export const useMotionCanvasRender = ({ player, stage }: UseMotionCanvasRenderProps) => {
    const render = useCallback(
        () => stage.render(player.playback.currentScene, player.playback.previousScene),
        [stage, player]
    )
    useEffect(() => player.onRender.subscribe(render), [player, render]);
}