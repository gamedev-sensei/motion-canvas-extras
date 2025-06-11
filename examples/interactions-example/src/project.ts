import {makeProject} from '@motion-canvas/core';
import {InteractionsPlugin} from "@gamedev-sensei/motion-canvas-interactions-plugin";
import example from './scenes/example.tsx?scene';

const scenes = [
    example
]

export default makeProject({ scenes, plugins: [InteractionsPlugin], experimentalFeatures: true });
