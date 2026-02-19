<template>
  <div v-if="editor" class="container">
    <EditorToolbar :editor="editor" :add-image="addImage" />
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extensions";
import Image from "@tiptap/extension-image";
import {
  Details,
  DetailsContent,
  DetailsSummary,
} from "@tiptap/extension-details";

// Lowlight 설정
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import Highlight from "@tiptap/extension-highlight";
import EditorToolbar from "./EditorToolbar.vue";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import { lowlight } from "lowlight/lib/core";
import { watch } from "vue";

const emit = defineEmits(["update"]);
const props = defineProps({
  placeholderText: {
    type: String,
    default: "일정을 입력하세요...",
  },
});

// 이미지 추가 함수 (ref인 editor에 접근하기 위해 .value 사용)
const addImage = () => {
  const url = window.prompt("URL");
  if (url && editor.value) {
    editor.value.chain().focus().setImage({ src: url }).run();
  }
};

const editor = useEditor({
  autofocus: true,
  editable: true,
  injectCSS: false,
  onUpdate({ editor }) {
    emit("update", editor.getHTML());
  },
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
      codeBlock: false,
    }),
    Highlight.configure({
      multicolor: true,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    TableKit.configure({
      table: { resizable: true },
    }),
    Image.configure({
      inline: true,
    }),
    CodeBlockLowlight.configure({
      lowlight,
      HTMLAttributes: { class: "code-block" },
    }),
    Details.configure({
      persist: true,
      HTMLAttributes: { class: "details" },
    }),
    TextStyle,
    Color,
    DetailsSummary,
    DetailsContent,
    Placeholder.configure({
      placeholder: ({ node }) => {
        return props.placeholderText;
      },
    }),
  ],
  content: "",
});

watch(
  () => props.placeholderText,
  (newText) => {
    if (editor.value) {
      editor.value.extensionManager.extensions.find(
        (ext) => ext.name === "placeholder",
      ).options.placeholder = newText;

      // 에디터 상태를 강제로 재렌더링하여 반영
      editor.value.view.dispatch(editor.value.state.tr);
    }
  },
);

defineExpose({
  editor,
});
</script>
<style scoped>
/* Basic editor styles */
:deep(.tiptap) :first-child {
  margin-top: 0;
}

:deep(.tiptap) pre {
  background: var(--black);
  border-radius: 0.5rem;
  color: var(--white);
  font-family: "JetBrainsMono", monospace;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
}

:deep(.tiptap) pre code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}

/* Code styling - Highlight.js */
:deep(.tiptap) pre .hljs-comment,
:deep(.tiptap) pre .hljs-quote {
  color: #616161;
}

:deep(.tiptap) pre .hljs-variable,
:deep(.tiptap) pre .hljs-template-variable,
:deep(.tiptap) pre .hljs-attribute,
:deep(.tiptap) pre .hljs-tag,
:deep(.tiptap) pre .hljs-name,
:deep(.tiptap) pre .hljs-regexp,
:deep(.tiptap) pre .hljs-link,
:deep(.tiptap) pre .hljs-selector-id,
:deep(.tiptap) pre .hljs-selector-class {
  color: #f98181;
}

:deep(.tiptap) pre .hljs-number,
:deep(.tiptap) pre .hljs-meta,
:deep(.tiptap) pre .hljs-built_in,
:deep(.tiptap) pre .hljs-builtin-name,
:deep(.tiptap) pre .hljs-literal,
:deep(.tiptap) pre .hljs-type,
:deep(.tiptap) pre .hljs-params {
  color: #fbbc88;
}

:deep(.tiptap) pre .hljs-string,
:deep(.tiptap) pre .hljs-symbol,
:deep(.tiptap) pre .hljs-bullet {
  color: #b9f18d;
}

:deep(.tiptap) pre .hljs-title,
:deep(.tiptap) pre .hljs-section {
  color: #faf594;
}

:deep(.tiptap) pre .hljs-keyword,
:deep(.tiptap) pre .hljs-selector-tag {
  color: #70cff8;
}

:deep(.tiptap) pre .hljs-emphasis {
  font-style: italic;
}

:deep(.tiptap) pre .hljs-strong {
  font-weight: 700;
}
/* Basic editor styles */
:deep(.tiptap) :first-child {
  margin-top: 0;
}

/* Table-specific styling */
:deep(.tiptap) table {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 80%;
}

:deep(.tiptap) table td,
:deep(.tiptap) table th {
  border: 1px solid #616161 !important;
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

:deep(.tiptap) table td > *,
:deep(.tiptap) table th > * {
  margin-bottom: 0;
}

:deep(.tiptap) table th {
  background-color: #eeeeee;
  font-weight: bold;
  text-align: left;
}

:deep(.tiptap) table .selectedCell:after {
  background: #616161;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

:deep(.tiptap) table .column-resize-handle {
  background-color: #616161;
  bottom: -2px;
  pointer-events: none;
  position: absolute;
  right: -2px;
  top: 0;
  width: 4px;
}

:deep(.tiptap) .tableWrapper {
  margin: 1.5rem 0;
  overflow-x: auto;
}

/* & 연산자를 클래스 결합으로 변환 */
:deep(.tiptap).resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
:deep(.tiptap) pre {
  background: var(--black);
  border-radius: 0.5rem;
  color: var(--white);
  font-family: "JetBrainsMono", monospace;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
}

:deep(.tiptap) pre code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}
:deep(.tiptap) .is-open button {
  align-items: center;
  background: transparent;
  border-radius: 4px;
  display: flex;
  font-size: 0.625rem;
  height: 1.25rem;
  justify-content: center;
  line-height: 1;
  margin-top: 0.1rem;
  padding: 0;
  width: 1.25rem;
}
:deep(.tiptap) .is-open button::before {
  content: "\25B6";
}
:deep(.tiptap) .details {
  display: flex;
  gap: 0.25rem;
  margin: 1.5rem 0;
  border: 1px solid var(--gray-3);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

:deep(.tiptap) .details summary {
  font-weight: 700;
}

:deep(.tiptap) .details > button {
  align-items: center;
  background: transparent;
  border-radius: 4px;
  display: flex;
  font-size: 0.625rem;
  height: 1.25rem;
  justify-content: center;
  line-height: 1;
  margin-top: 0.1rem;
  padding: 0;
  width: 1.25rem;
}

:deep(.tiptap) .details > button:hover {
  background-color: var(--gray-3);
}

:deep(.tiptap) .details > button::before {
  content: "\25B6"; /* 삼각형 화살표 아이콘 */
}

/* 열려있을 때 화살표 회전 */
:deep(.tiptap) .details.is-open > button::before {
  transform: rotate(90deg);
}

:deep(.tiptap) .details > div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

:deep(.tiptap) .details > div > [data-type="detailsContent"] > :last-child {
  margin-bottom: 0.5rem;
}

/* 중첩된 Details 스타일 (마진 축소) */
:deep(.tiptap) .details .details {
  margin: 0.5rem 0;
}

:deep(.tiptap) img {
  display: block;
  height: auto;
  margin: 1.5rem 0;
  max-width: 100%;
}
:deep(.tiptap) img.ProseMirror-selectednode {
  outline: 3px solid var(--purple);
}
:deep(.tiptap) {
  outline: none !important;
  border: none !important;
  min-height: 300px;
  border-radius: 5px;
  margin-top: 20px;
}

/* 추가로, 특정 브라우저에서 생길 수 있는 그림자 효과도 제거하고 싶을 때 */
:deep(.tiptap:focus) {
  box-shadow: none !important;
}
:deep(.tiptap) mark {
  border-radius: 2px;
  padding: 0 2px;
}

/* 특정 색상이 지정된 경우 */
:deep(.tiptap) mark[data-color] {
  background-color: var(
    --highlight-color
  ); /* Tiptap이 자동으로 인라인 스타일을 부여함 */
}

:deep(p.is-editor-empty:first-child::before) {
  color: var(--gray-4);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
