import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          return ['vscode-button',
            'vscode-divider',
            'vscode-dropdown',
            'vscode-option',
            'vscode-panel-tab',
            'vscode-panel-view',
            'vscode-panels',
            'vscode-text-field',
            'vscode-radio-group', 'vscode-radio', 'vscode-data-grid', 'vscode-data-grid-row', 'vscode-data-grid-cell', 'vscode-text-area'].indexOf(tag) > -1
        }
      }
    }
  })],
  build: {
    rollupOptions: {

      input: {
        "testcase": "./src/main.js"
      },
      output: {
        dir: "../vscode-otter-http-client/media/",
        entryFileNames: 'entry-[name].js',
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
})
