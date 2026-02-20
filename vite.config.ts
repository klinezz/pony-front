import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  // 현재 모드(development/production)에 맞는 환경 변수를 불러옵니다.
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        // '@'를 현재 프로젝트의 'src' 폴더 경로로 매핑
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      //outDir: "../pony/src/main/resources/static",
      outDir: "dist",
      emptyOutDir: true,
      assetsDir: "assets",
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
  };
});
