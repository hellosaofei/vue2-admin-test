<template>
  <Son @change="changeMT" @setData="changeData" />
</template>

<script>
import Son from "./Son.vue";
export default {
  name: "Parent",
  components: {
    Son,
  },
  methods: {
    changeMT() {
      console.log("触发了 change 事件，执行 changeMT 方法");
    },
    changeData() {
      console.log("触发了 setData 事件，执行 changeData 方法");
    },
  },
};
</script>

<style></style>
