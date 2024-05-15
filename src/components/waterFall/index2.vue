<template>
  <div class="waterfall-container" ref="containerRef" @scroll="handleScroll">
    <div class="waterfall-list">
      <div
        class="waterfall-item"
        v-for="(item, index) in cardList"
        :key="item.id"
        :style="{
          width: `${cardPosition[index].width}px`,
          height: `${cardPosition[index].height}px`,
          transform: `translate3d(${cardPosition[index].x}px, ${cardPosition[index].y}px, 0)`,
        }"
      >
        <slot name="item" :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { dataList } from "@/data/index.js";
import { throttle, debounce } from "@/utils/tool.js";
export default {
  name: "WaterFall",
  data() {
    return {
      containerWidth: 0,
      realCardWidth: 0,
      isFinish: false,
      isLoading: false,
      cardList: [],
      cardPosition: [],
      page: 1,
      columnHeight: new Array(this.column).fill(0), // 用于存放每一列的高度
      resizeObserver: null,
    };
  },
  props: {
    column: {
      type: Number,
      default: 4,
    },
    gap: {
      type: Number,
      default: 10,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    bottom: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    // 求this.columnHeight列表的最小元素及其索引
    // minColumn: function () {
    //   // let minIndex = -1;
    //   // let minHeight = Infinity;
    //   // this.columnHeight.forEach((item, index) => {
    //   //   if (item < minHeight) {
    //   //     minHeight = item;
    //   //     minIndex = index;
    //   //   }
    //   // });
    //   const minValue = Math.min(...this.columnHeight);
    //   return {
    //     minIndex: this.columnHeight.indexOf(minValue),
    //     minHeight: minValue,
    //   };
    // },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      this.resizeObserver.observe(this.$refs.containerRef);
    });
  },
  destroyed() {
    this.resizeObserver.unobserve(this.$refs.containerRef);
  },
  methods: {
    init() {
      this.containerWidth = this.$refs.containerRef.clientWidth;
      this.realCardWidth =
        (this.containerWidth - this.gap * (this.column - 1)) / this.column;
      this.getCardlist(this.page, this.pageSize);
    },
    handleScroll: throttle(function () {
      // console.log("节流函数中的this指向", this);
      const { scrollTop, clientHeight, scrollHeight } = this.$refs.containerRef;
      const bottom = scrollHeight - clientHeight - scrollTop;
      if (bottom <= this.bottom) {
        this.getCardlist(this.page, this.pageSize);
      }
    }),
    handleResize: debounce(function () {
      // console.log("防抖函数中的this指向", this);
      const containerWidth = this.$refs.containerRef.clientWidth;
      this.realCardWidth =
        (containerWidth - this.gap * (this.column - 1)) / this.column;
      this.columnHeight = new Array(this.column).fill(0);
      this.cardPosition = [];
      this.computedCardPos(this.cardList);
    }),
    // 处理渲染列表
    async getCardlist(page, pageSize) {
      if (this.isFinish) {
        console.log("没有更多数据了");
        return;
      }
      const list = await this.fetchData(page, pageSize);
      this.page++;
      if (!list.length) {
        this.isFinish = true;
        return;
      }
      this.cardList = [...this.cardList, ...list];
      this.computedCardPos(list);
    },
    // 请求数据
    fetchData(page, pageSize) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            dataList.slice(
              (page - 1) * pageSize,
              (page - 1) * pageSize + pageSize
            )
          );
        }, 1000);
      });
    },
    // 计算每一张卡片的位置
    computedCardPos(list) {
      list.forEach((item, index) => {
        // 计算真实的元素高度
        const realCardHeight = Math.floor(
          (item.height * this.realCardWidth) / item.width
        );
        // 判断元素是否处于第一行
        if (index < this.column && this.cardList.length <= this.pageSize) {
          this.cardPosition.push({
            width: this.realCardWidth,
            height: realCardHeight,
            // column=4时，0123%4=>0123
            x:
              index % this.column !== 0
                ? index * (this.realCardWidth + this.gap)
                : 0,
            y: 0,
          });
          // columnHeight 一共有四个元素，分别代表每列的高度
          this.columnHeight[index] = realCardHeight + this.gap;
        } else {
          const { minIndex, minHeight } = this.minColumn();
          this.cardPosition.push({
            width: this.realCardWidth,
            height: realCardHeight,
            x:
              minIndex % this.column !== 0
                ? minIndex * (this.realCardWidth + this.gap)
                : 0,
            y: minHeight,
          });
          this.columnHeight[minIndex] += realCardHeight + this.gap;
        }
      });
    },
    minColumn() {
      const minValue = Math.min(...this.columnHeight);
      return {
        minIndex: this.columnHeight.indexOf(minValue),
        minHeight: minValue,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.waterfall {
  &-container {
    width: 80%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  &-list {
    width: 100%;
    position: relative;
  }
  &-item {
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    transition: all 0.3s;
  }
}
</style>
