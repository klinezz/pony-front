<template>
  <div class="toolbar-container">
    <div class="button-section">
      <MenuButton
        @click="editor.chain().focus().toggleBold().run()"
        :is-active="editor.isActive('bold')"
      >
        <font-awesome-icon icon="fa-solid fa-bold" />
      </MenuButton>
      <MenuButton
        @click="editor.chain().focus().toggleItalic().run()"
        :is-active="editor.isActive('italic')"
      >
        <font-awesome-icon icon="fa-solid fa-italic" />
      </MenuButton>

      <MenuButton
        @click="editor.chain().focus().toggleUnderline().run()"
        :is-active="editor.isActive('underline')"
      >
        <font-awesome-icon icon="fa-solid fa-underline" />
      </MenuButton>

      <MenuButton
        @click="editor.chain().focus().toggleStrike().run()"
        :is-active="editor.isActive('strike')"
      >
        <font-awesome-icon icon="fa-solid fa-strikethrough" />
      </MenuButton>
    </div>

    <div class="divider"></div>
    <div class="button-section">
      <label class="color-picker-container">
        <MenuButton :is-active="editor.isActive('textStyle')" title="글자 색상">
          <font-awesome-icon icon="fa-solid fa-palette" />
        </MenuButton>

        <input
          type="color"
          @input="editor.chain().focus().setColor($event.target.value).run()"
          :value="editor.getAttributes('textStyle').color || '#000000'"
          class="hidden-color-input"
        />
      </label>

      <MenuButton
        @click="editor.chain().focus().unsetColor().run()"
        title="색상 초기화"
      >
        <font-awesome-icon icon="fa-solid fa-eraser" />
      </MenuButton>
    </div>
    <div class="divider"></div>

    <div class="button-section">
      <MenuButton
        @click="editor.chain().focus().setTextAlign('left').run()"
        :is-active="editor.isActive({ textAlign: 'left' })"
      >
        <font-awesome-icon icon="fa-solid fa-align-left" />
      </MenuButton>
      <MenuButton
        @click="editor.chain().focus().setTextAlign('center').run()"
        :is-active="editor.isActive({ textAlign: 'center' })"
      >
        <font-awesome-icon icon="fa-solid fa-align-center" />
      </MenuButton>
      <MenuButton
        @click="editor.chain().focus().setTextAlign('right').run()"
        :is-active="editor.isActive({ textAlign: 'right' })"
      >
        <font-awesome-icon icon="fa-solid fa-align-right" />
      </MenuButton>
    </div>

    <div class="divider"></div>

    <div class="button-section">
      <MenuButton
        v-for="level in [1, 2, 3]"
        :key="level"
        @click="editor.chain().focus().toggleHeading({ level }).run()"
        :is-active="editor.isActive('heading', { level })"
      >
        <span class="h-label">H{{ level }}</span>
      </MenuButton>
    </div>

    <div class="divider"></div>

    <div class="button-section">
      <MenuButton
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :is-active="editor.isActive('codeBlock')"
      >
        <font-awesome-icon icon="fa-solid fa-code" />
      </MenuButton>
      <MenuButton
        @click="editor.chain().focus().setDetails().run()"
        :disabled="!editor.can().setDetails()"
        :is-active="editor.isActive('details')"
      >
        <font-awesome-icon icon="fa-solid fa-square-plus" />
      </MenuButton>

      <MenuButton
        @click="editor.chain().focus().unsetDetails().run()"
        :disabled="!editor.isActive('details')"
      >
        <font-awesome-icon icon="fa-solid fa-square-minus" />
      </MenuButton>
      <MenuButton @click="addImage">
        <font-awesome-icon icon="fa-solid fa-image" />
      </MenuButton>
    </div>

    <div class="divider"></div>

    <div class="button-section">
      <MenuButton
        @click="editor.chain().focus().toggleBulletList().run()"
        :is-active="editor.isActive('bulletList')"
      >
        <font-awesome-icon icon="fa-solid fa-list-ul" />
      </MenuButton>
      <MenuButton
        @click="editor.chain().focus().toggleOrderedList().run()"
        :is-active="editor.isActive('orderedList')"
      >
        <font-awesome-icon icon="fa-solid fa-list-ol" />
      </MenuButton>
    </div>

    <div class="button-section">
      <MenuButton
        @click="editor.chain().focus().sinkListItem('listItem').run()"
        :disabled="!editor.can().sinkListItem('listItem')"
      >
        <font-awesome-icon icon="fa-solid fa-indent" />
      </MenuButton>
      <MenuButton
        @click="editor.chain().focus().liftListItem('listItem').run()"
        :disabled="!editor.can().liftListItem('listItem')"
      >
        <font-awesome-icon icon="fa-solid fa-outdent" />
      </MenuButton>
    </div>

    <div class="divider"></div>

    <div class="button-section">
      <MenuButton
        @click="editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()"
      >
        <font-awesome-icon icon="fa-solid fa-table" />
      </MenuButton>
      <MenuButton
        @click="editor.chain().focus().deleteTable().run()"
        :disabled="!editor.isActive('table')"
      >
        <font-awesome-icon icon="fa-solid fa-trash-can" />
      </MenuButton>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBold,
  faItalic,
  faParagraph,
  faListUl,
  faListOl,
  faIndent,
  faOutdent,
  faTable,
  faTrashCan,
  faCode,
  faImage,
  faSquarePlus,
  faSquareMinus,
  faChevronDown, // Details 아이콘으로 사용
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faUnderline,
  faStrikethrough,
  faHighlighter,
  faPalette,
  faEraser,
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import MenuButton from "./MenuButton.vue";

// 아이콘 등록
library.add(
  faBold,
  faItalic,
  faParagraph,
  faListUl,
  faListOl,
  faIndent,
  faOutdent,
  faTable,
  faTrashCan,
  faCode,
  faImage,
  faChevronDown,
  faSquarePlus,
  faSquareMinus,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faUnderline,
  faStrikethrough,
  faHighlighter,
  faPalette,
  faEraser,
  faFont,
);

const props = defineProps({
  editor: Object,
  addImage: Function,
});
// 색상이 변경될 때 호출되는 함수
const onHighlightColorChange = (event) => {
  const color = event.target.value;
  props.editor.chain().focus().setHighlight({ color }).run();
};
</script>

<style scoped>
/* 이전 스타일 유지 */
.toolbar-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.button-section {
  display: flex;
  gap: 4px;
}
.divider {
  width: 1px;
  height: 20px;
  background: #eee;
  margin: 0 1px;
}
.h-label {
  font-weight: 800;
  font-size: 11px;
}
.color-picker-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.hidden-color-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0; /* 투명하게 만들어서 버튼 위에 겹침 */
  cursor: pointer;
}
</style>
