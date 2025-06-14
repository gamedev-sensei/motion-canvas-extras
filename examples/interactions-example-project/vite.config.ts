import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  plugins: [
    motionCanvas(),
    ffmpeg()
  ],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`
      }
    }
  }
})
