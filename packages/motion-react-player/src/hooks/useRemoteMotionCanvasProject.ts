import { Project } from "@motion-canvas/core"
import useSWR from "swr";

async function fetchProject(src: string): Promise<Project> {
    const module: { default: Project } = await import(/* @vite-ignore */src)
    return module.default
}

export const useRemoteMotionCanvasProject = (src: string) => {
    const { error, isLoading, data } = useSWR(["gamedev-sensei/motion-react-player/remote-project", src], () => fetchProject(src))

    return { error, isLoading, data }
}