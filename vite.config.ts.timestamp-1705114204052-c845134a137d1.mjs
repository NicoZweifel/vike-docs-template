// vite.config.ts
import { defineConfig } from "file:///C:/dev/vike-docs-template/node_modules/.pnpm/vite@5.0.11_@types+node@20.11.0/node_modules/vite/dist/node/index.js";
import preact from "file:///C:/dev/vike-docs-template/node_modules/.pnpm/@preact+preset-vite@2.8.1_@babel+core@7.23.7_preact@10.19.3_vite@5.0.11/node_modules/@preact/preset-vite/dist/esm/index.mjs";
import ssr from "file:///C:/dev/vike-docs-template/node_modules/.pnpm/vike@0.4.156_vite@5.0.11/node_modules/vike/dist/esm/node/plugin/index.js";
import FullReload from "file:///C:/dev/vike-docs-template/node_modules/.pnpm/vite-plugin-full-reload@1.1.0/node_modules/vite-plugin-full-reload/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    preact({
      reactAliasesEnabled: true
    }),
    ssr({ prerender: true }),
    FullReload(["docs/**/*"])
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxkZXZcXFxcdmlrZS1kb2NzLXRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxkZXZcXFxcdmlrZS1kb2NzLXRlbXBsYXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9kZXYvdmlrZS1kb2NzLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcHJlYWN0IGZyb20gJ0BwcmVhY3QvcHJlc2V0LXZpdGUnO1xuaW1wb3J0IHNzciBmcm9tICd2aWtlL3BsdWdpbic7XG5pbXBvcnQgRnVsbFJlbG9hZCBmcm9tICd2aXRlLXBsdWdpbi1mdWxsLXJlbG9hZCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcHJlYWN0KHtcbiAgICAgIHJlYWN0QWxpYXNlc0VuYWJsZWQ6IHRydWUsXG4gICAgfSksXG4gICAgc3NyKHsgcHJlcmVuZGVyOiB0cnVlIH0pLFxuICAgIEZ1bGxSZWxvYWQoWydkb2NzLyoqLyonXSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVEsU0FBUyxvQkFBb0I7QUFDaFMsT0FBTyxZQUFZO0FBQ25CLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUd2QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxxQkFBcUI7QUFBQSxJQUN2QixDQUFDO0FBQUEsSUFDRCxJQUFJLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFBQSxJQUN2QixXQUFXLENBQUMsV0FBVyxDQUFDO0FBQUEsRUFDMUI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
