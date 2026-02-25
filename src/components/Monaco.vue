<template>
  <div
    ref="editorContainer"
    style="height: 600px; width: 100%; border: 1px solid #333"
  ></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as monaco from "monaco-editor";
import { listen } from "vscode-ws-jsonrpc";
import { MonacoLanguageClient } from "monaco-languageclient";
// createConnection 대신 아래의 직접적인 방식을 사용합니다.

const editorContainer = ref(null);
let editor = null;

onMounted(() => {
  // 1. 에디터 생성
  editor = monaco.editor.create(editorContainer.value, {
    value:
      "public class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
    language: "java",
    theme: "vs-dark",
    automaticLayout: true,
  });

  // 2. WebSocket 연결 (Spring Boot 주소 확인)
  const url = "ws://localhost:8080/lsp/java";
  const webSocket = new WebSocket(url);

  listen({
    webSocket,
    onConnection: (connection) => {
      // 최신 방식: 직접 connection을 주입하여 Client 생성
      const languageClient = new MonacoLanguageClient({
        name: "Java Language Client",
        clientOptions: {
          documentSelector: ["java"],
        },
        // 연결 제공자 설정
        connectionProvider: {
          get: () => Promise.resolve(connection),
        },
      });

      languageClient.start();

      connection.onClose(() => languageClient.stop());
    },
  });
});

onBeforeUnmount(() => {
  if (editor) editor.dispose();
});
</script>
