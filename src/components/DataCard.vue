<template>
  <div class="data-card">
    <el-card class="box-card">
      <div class="top-part">数据看板卡片</div>
      <div class="middle-part">
        <countCom v-bind="$attrs" />
      </div>
      <div class="right-icon">
        <i class="el-icon-help icon-a"></i>
      </div>
      <div class="bottom-part">
        <span style="display: inline-block">自上周以来增长</span>
        <i class="el-icon-top bottom-icon"></i>
        <span style="color: green">23%</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import countCom from "./other/countCom.vue";
export default {
  name: "DataCard",
  components: {
    countCom,
  },
};
</script>

<style>
.box-card {
  /* width: 250px; */
  position: relative;
}
.right-icon {
  position: absolute;
  width: 200px;
  top: 50px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(78, 136, 243, 0.1);
  color: #4e88f3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-a {
  font-size: 45px !important;
}
.middle-part {
  margin: 28px 0 28px;
}
.bottom-part {
  font-size: 12px;
}
.bottom-icon {
  font-size: 12px;
  border-radius: 50%;
  color: #4e88f3;
  background: rgba(78, 136, 243, 0.1);
  margin: 0 5px 0;
}
</style>
