<template>
  <div ref="list" class="infinite-list-container" v-on:scroll="handleScroll">
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        ref="items"
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualList",
  data() {
    return {
      screenHeight: 800,
      startOffset: 0, // 控制渲染区域移动到可视区域
      start: 0, // 起始索引
      end: null, // 结束索引
    };
  },
  props: {
    //总数据列表
    listData: {
      type: Array,
      default: () => [],
    },
    //每个列表项的高度
    itemHeight: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    //总数据列表的高度
    listHeight() {
      return this.listData.length * this.itemHeight;
    },
    //真实显示的列表项  的 数量
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemHeight);
    },
    // 渲染偏移量，使用:style=""动态绑定
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //  真实显示的列表项
    // visibleData
    visibleData() {
      return this.listData.slice(
        this.start,
        Math.min(this.end, this.listData.length)
      );
    },
  },
  mounted() {
    // this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  methods: {
    //绑定滚动事件
    handleScroll() {
      let scrollTop = this.$refs.list.scrollTop;
      this.start = Math.floor(scrollTop / this.itemHeight);
      this.end = this.start + this.visibleCount;
      this.startOffset = scrollTop - (scrollTop % this.itemHeight);
    },
  },
};
</script>

<style scoped>
.infinite-list-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
.infinite-list {
  width: 100%;
}
.infinite-list-item {
  text-align: center;
  color: #000;
  background-color: darkcyan;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 20px;
}
</style>
