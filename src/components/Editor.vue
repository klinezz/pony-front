<template>
  <div v-if="editor" class="container">
    <div class="control-group">
      <div class="button-group">
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          H3
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          Toggle code block
        </button>
        <button
          @click="editor.chain().focus().setCodeBlock().run()"
          :disabled="editor.isActive('codeBlock')"
        >
          Set code block
        </button>
        <button
          @click="editor.chain().focus().setDetails().run()"
          :disabled="!editor.can().setDetails()"
        >
          Set details
        </button>
        <button
          @click="editor.chain().focus().unsetDetails().run()"
          :disabled="!editor.can().unsetDetails()"
        >
          Unset details
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          Toggle bullet list
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          Toggle ordered list
        </button>
        <button
          @click="editor.chain().focus().splitListItem('listItem').run()"
          :disabled="!editor.can().splitListItem('listItem')"
        >
          Split list item
        </button>
        <button
          @click="editor.chain().focus().sinkListItem('listItem').run()"
          :disabled="!editor.can().sinkListItem('listItem')"
        >
          Sink list item
        </button>
        <button
          @click="editor.chain().focus().liftListItem('listItem').run()"
          :disabled="!editor.can().liftListItem('listItem')"
        >
          Lift list item
        </button>

        <div class="button-group">
          <button
            @click="
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            "
          >
            Insert table
          </button>
          <button @click="editor.chain().focus().addColumnBefore().run()">
            Add column before
          </button>
          <button @click="editor.chain().focus().addColumnAfter().run()">
            Add column after
          </button>
          <button @click="editor.chain().focus().deleteColumn().run()">
            Delete column
          </button>
          <button @click="editor.chain().focus().addRowBefore().run()">
            Add row before
          </button>
          <button @click="editor.chain().focus().addRowAfter().run()">
            Add row after
          </button>
          <button @click="editor.chain().focus().deleteRow().run()">
            Delete row
          </button>
          <button @click="editor.chain().focus().deleteTable().run()">
            Delete table
          </button>
          <button @click="editor.chain().focus().mergeCells().run()">
            Merge cells
          </button>
          <button @click="editor.chain().focus().splitCell().run()">
            Split cell
          </button>
          <button @click="editor.chain().focus().toggleHeaderColumn().run()">
            Toggle header column
          </button>
          <button @click="editor.chain().focus().toggleHeaderRow().run()">
            Toggle header row
          </button>
          <button @click="editor.chain().focus().toggleHeaderCell().run()">
            Toggle header cell
          </button>
          <button @click="editor.chain().focus().mergeOrSplit().run()">
            Merge or split
          </button>
          <button
            @click="editor.chain().focus().setCellAttribute('colspan', 2).run()"
          >
            Set cell attribute
          </button>
          <button @click="editor.chain().focus().fixTables().run()">
            Fix tables
          </button>
          <button @click="editor.chain().focus().goToNextCell().run()">
            Go to next cell
          </button>
          <button @click="editor.chain().focus().goToPreviousCell().run()">
            Go to previous cell
          </button>
        </div>
        <div class="button-group">
          <button @click="addImage">Set image</button>
        </div>
      </div>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Strike from "@tiptap/extension-strike";
import { Editor } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { TableKit } from "@tiptap/extension-table";
import { Placeholder } from "@tiptap/extensions";
import {
  Details,
  DetailsContent,
  DetailsSummary,
} from "@tiptap/extension-details";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import { lowlight } from "lowlight/lib/core";
import css from "highlight.js/lib/languages/css";
import Image from "@tiptap/extension-image";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
const addImage = () => {
  let url = window.prompt("URL");

  if (url) {
    this.editor.chain().focus().setImage({ src: url }).run();
  }
};
const editor = useEditor({
  autofocus: true,
  editable: true,
  injectCSS: false,
  extensions: [
    StarterKit,
    Strike,
    TableKit.configure({
      table: { resizable: true },
    }),
    Image.configure({
      inline: true,
    }),
    CodeBlockLowlight.configure({
      HTMLAttributes: {
        class: "my-custom-class",
      },
      enableTabIndentation: true,
      languageClassPrefix: "language-",
      defaultLanguage: "plaintext",
      lowlight,
    }),
    Details.configure({
      persist: true,
      HTMLAttributes: {
        class: "details",
      },
    }),
    DetailsSummary,
    DetailsContent,
    ListItem,
    Heading.configure({
      levels: [1, 2, 3],
    }),
    Placeholder.configure({
      includeChildren: true,
      placeholder: ({ node }) => {
        if (node.type.name === "detailsSummary") {
          return "Summary";
        }

        return null;
      },
    }),
  ],

  content: `
        <h1>This is a 1st level heading</h1>
        <h2>This is a 2nd level heading</h2>
        <h3>This is a 3rd level heading</h3>
        <h4>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</h4>

      `,
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
  width: 100%;
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
  background-color: #616161;
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
</style>
