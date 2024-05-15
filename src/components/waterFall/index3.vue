<template>
  <div
    class="fs-virtual-waterfall-container"
    ref="containerRef"
    @scroll="handleScroll"
  >
    <div class="fs-virtual-waterfall-list" :style="listStyle">
      <div
        v-if="isShow"
        class="fs-virtual-waterfall-item"
        v-for="{ item, style, imageHeight } in renderList"
        :key="item.id"
        :style="style"
      >
        <slot name="item" :item="item" :imageHeight="imageHeight"></slot>
      </div>
      <div id="temporary-list" v-else>
        <div
          v-for="{ item, style, imageHeight } in temporaryList"
          :style="style"
        >
          <slot name="item" :item="item" :imageHeight="imageHeight"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      loading: false, // 发送请求 loading 状态
      isFinish: false, // 请求数据是否已经结束（返回空数据）
      currentPage: 1, // 当前页数
      list: [], // 数据源
      viewWidth: 0,
      viewHeight: 0,
      start: 0,
      queueState: {
        // 存储当前视图上所有卡片
        queue: Array(this.column)
          .fill(0)
          .map(() => ({ list: [], height: 0 })),
        len: 0,
      },
    };
  },
  computed: {
    end: function () {
      return this.viewHeight + this.start;
    },
    computedHeight: function () {
      let minIndex = 0,
        minHeight = Infinity,
        maxHeight = -Infinity;
      this.queueState.queue.forEach(({ height }, index) => {
        if (height < minHeight) {
          minHeight = height;
          minIndex = index;
        }
        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      return {
        minIndex,
        minHeight,
        maxHeight,
      };
    },
    listStyle: function () {
      return {
        height: `${this.computedHeight.maxHeight}px`,
      };
    },
    cardList: () => {
      return this.queueState.queue.reduce((pre, { list }) => {
        return pre.concat(list);
      });
    },
    renderLit: () => {
      return this.cardList.value.filter(
        (i) => i.h + i.y > this.start && i.y < this.end
      );
    },
  },
  mounted() {},
  methods: {
    async loadDataList() {
      if (this.isFinish) return;
      const list = await this.fetchData(this.currentPage++, this.pageSize);
      if (!list.length) {
        this.isFinish = true;
        return;
      }
      this.list.push(...list);
      return list.length;
    },
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
  },
};
</script>

<style></style>
