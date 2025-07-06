import {makeProject} from '@motion-canvas/core';
import {InMotionEditorPlugin} from "@gamedev-sensei/in-motion-editor";
import {InMotionPlugin} from "@gamedev-sensei/in-motion";
import example from './scenes/example.tsx?scene';

const scenes = [
    example
]

const editorPlugins = import.meta.env.PROD ? [] : [ InMotionEditorPlugin() ]

export default makeProject({
    name: "example",
    scenes,
    plugins: [ InMotionPlugin(), ...editorPlugins ],
    experimentalFeatures: true
})