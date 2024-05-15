<template>
  <div class="container">
    <div class="fs-virtuallist-container" id="target" ref="virtualContainer">
      <div
        class="fs-virtuallist-list"
        ref="virtualList"
        @scroll="throttle(handleScroll)"
        :style="computedScrollStyle()"
      >
        <div
          ref="items"
          class="fs-virtuallist-item"
          v-for="item in renderList"
          :key="item"
          :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualList",
  data() {
    return {
      allData: [], // 所有的列表数据
      itemHeight: 100, // 每个listItem的高度
      viewHeight: 0, // container高度
      maxCount: 0, // 最多能显示的列表项的个数
      scrollStyle: {}, // list 动态样式（高度，偏移）
      startIndex: 0, // 当前视图列表在数据源中的起始索引
      endIndex: 0, // 当前视图列表在数据源中的末尾索引
      renderList: [], // 渲染在视图上的列表项
      lastStart: -1, //存储上一次刷新后的startIndex
    };
  },
  mounted() {
    this.init();
    this.addData();
    this.render();
    // document
    //   .querySelector("#target")
    //   .addEventListener("scroll", this.throttle(this.handleScroll));
  },
  methods: {
    rafThrottle(fn) {
      let lock = false;
      return function (...args) {
        window.requestAnimationFrame(() => {
          if (lock) return;
          lock = true;
          fn.apply(this, args);
          lock = false;
        });
      };
    },
    ThrottleScroll() {
      this.rafThrottle(this.handleScroll);
    },
    // 用于初始化列表，主要功能
    // 获取container高度viewHeight,计算maxCount
    // 添加模拟数据
    // 渲染视图
    init() {
      this.viewHeight = 600;
      //   this.viewHeight = this.$refs.virtualContainer.offsetHeight;
      this.maxCount = Math.ceil(this.viewHeight / this.itemHeight) + 1;
    },
    // 计算endIndex
    // 有了 startIndex 和 endIndex，我们就能够截取数据源来获取需要渲染在视图上的列表 renderList
    computedEndIndex() {
      const end = this.startIndex + this.maxCount;
      this.endIndex = Math.min(end, this.allData.length);
      if (this.endIndex >= this.allData.length - 5) {
        this.addData();
      }
    },
    // 获取渲染列表
    computedRenderList() {
      this.renderList = this.allData.slice(this.startIndex, this.endIndex);
    },
    // 动态计算样式
    computedScrollStyle() {
      return {
        height: `${
          this.allData.length * this.itemHeight -
          this.startIndex * this.itemHeight
        }px`,
        transform: `translate3d(0, ${this.startIndex * this.itemHeight}px, 0)`,
      };
    },
    render() {
      this.computedEndIndex();
      this.computedRenderList();
      this.computedScrollStyle();
    },
    handleScroll() {
      const { scrollTop } = this.$refs.virtualContainer;
      this.startIndex = Math.floor(scrollTop / this.itemHeight);
      if (this.startIndex !== this.lastStart) {
        this.render();
      }
      // 保存上一次的 startIndex
      this.lastStart = this.startIndex;
      console.log("触发了scroll");
    },
    addData() {
      for (let i = 0; i < 10; i++) {
        this.allData.push(this.allData.length + 1);
      }
    },
    throttle(fn) {
      let flag = true;
      return function () {
        if (flag) {
          setTimeout(() => {
            fn.call(this);
            flag = true;
          });
        }
        flag = false;
      };
    },
  },
};
</script>

<style>
/* 容器布局并设置具体的宽高 */
.container {
  width: 600px;
  height: 600px;
  margin: 100px auto;
  border: 1px solid red;
}

/* 作为虚拟列表组件宽高由父组件决定，注意这里需要保证垂直方向有滚动条 */
.fs-virtuallist-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

/* list 高度会用 JS 设置动态样式 */
.fs-virtuallist-list {
  width: 100%;
}

/* item 固定高度即可，其他样式仅为了做展示 */
.fs-virtuallist-item {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid #000;
  text-align: center;
  font-size: 20px;
  line-height: 100px;
}
</style>
