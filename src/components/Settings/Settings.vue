<template>
  <div class="editor-wrapper">
    <div class="toolbar">
      <select v-model="currentLang" @change="changeLanguage">
        <option value="java">Java (LSP)</option>
        <option value="javascript">JavaScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
    </div>
    <div ref="editorContainer" class="container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as monaco from "monaco-editor";
import { listen } from "vscode-ws-jsonrpc";
import { MonacoLanguageClient } from "monaco-languageclient";

const editorContainer = ref(null);
const currentLang = ref("java");
let editor = null;
let languageClient = null;

onMounted(() => {
  editor = monaco.editor.create(editorContainer.value, {
    value: "",
    language: currentLang.value,
    theme: "vs-dark",
    automaticLayout: true,
  });

  // Java일 경우에만 LSP 연결 시작
  if (currentLang.value === "java") {
    startJavaLsp();
  }
});

const startJavaLsp = () => {
  const url = "ws://localhost:8080/lsp/java";
  const webSocket = new WebSocket(url);

  listen({
    webSocket,
    onConnection: (connection) => {
      languageClient = new MonacoLanguageClient({
        name: "Java Language Client",
        clientOptions: { documentSelector: ["java"] },
        connectionProvider: { get: () => Promise.resolve(connection) },
      });
      languageClient.start();
    },
  });
};

const changeLanguage = () => {
  if (editor) {
    const model = editor.getModel();
    monaco.editor.setModelLanguage(model, currentLang.value);

    // Java로 바꿀 때만 LSP 서버 연결 (이미 연결되어 있지 않다면)
    if (currentLang.value === "java" && !languageClient) {
      startJavaLsp();
    }
  }
};
</script>

<style scoped>
.container {
  height: 600px;
  width: 100%;
  border: 1px solid #333;
}
.toolbar {
  padding: 10px;
  background: #1e1e1e;
  color: white;
}
</style>
