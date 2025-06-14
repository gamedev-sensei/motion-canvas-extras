import {makeProject} from '@motion-canvas/core';
import {InteractionsPlugin} from "@gamedev-sensei/in-motion-editor";
import example from './scenes/example.tsx?scene';

const scenes = [
    example
]

const editorPlugins = import.meta.env.PROD ? [] : [ InteractionsPlugin() ]

export default makeProject({
    name: "example",
    scenes,
    plugins: editorPlugins,
    experimentalFeatures: true
})
