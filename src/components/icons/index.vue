<template>
  <div id="app" class="icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">张三</el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div
            v-for="item of elementIcons"
            :key="item"
            @click="handleClipboard(generateElementIconCode(item), $event)"
          >
            <el-tooltip placement="top">
              <div slot="content">{{ generateElementIconCode(item) }}</div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from "../../utils/clipboard";
import { elementIcons } from "./script";
export default {
  name: "Icons",
  data() {
    return {
      elementIcons,
    };
  },
  methods: {
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`;
    },
    handleClipboard(text, event) {
      clipboard(text, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
