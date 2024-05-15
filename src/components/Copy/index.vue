<template>
  <div>
    <el-input v-model="inputData" placeholder="请输入内容"></el-input>
    <el-button
      type="primary"
      v-clipboard:copy="inputData"
      v-clipboard:success="handleCopy"
    >
      点击复制
    </el-button>
  </div>
</template>

<script>
export default {
  name: "Copy",
  data() {
    return {
      inputData: "",
    };
  },
  methods: {
    handleCopy() {
      this.$message({
        message: "复制成功",
        type: "success",
        duration: 1500,
      });
    },
  },
};
</script>

<style></style>
