import {
    MotionCanvasPresenter,
    useRemoteMotionCanvasProject
} from "@gamedev-sensei/motion-react-player";
import {type FC, useEffect, useMemo, useState} from "react";
import {InteractionSource, interactionSourceVariableKey} from "@gamedev-sensei/in-motion";

export const Player: FC<{ src: string }> = ({ src }) => {
    const { data: project } = useRemoteMotionCanvasProject(src)
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    const interactionSource = useMemo(() => new InteractionSource(), [])

    useEffect(() => {
        if (!ref) return

        interactionSource.bind(ref)
        return () => interactionSource.unbind(ref)
    }, [ref, interactionSource]);

    const projectWithVariables = useMemo(() => ({
        ...project,
        variables: {[interactionSourceVariableKey]: interactionSource.subscribable}
    }), [project, interactionSource])

    if (!project) return null

    return <MotionCanvasPresenter ref={setRef} project={projectWithVariables} loop />
}