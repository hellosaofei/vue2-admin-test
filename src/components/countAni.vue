<!-- 数字滚动 -->
<template>
  <div>
    <div id="numScroll"></div>
    <div>
      <el-col class="item" :md="8">
        <span>起始值</span>
        <el-input-number
          v-model="options.startVal"
          @change="handleChange"
          :min="0"
          :max="1000"
          :step="100"
        ></el-input-number>
      </el-col>
      <el-col class="item" :md="8">
        <span>终止值</span>
        <el-input-number
          v-model="endVal"
          @change="handleChange"
          :min="2000"
          :max="2200"
          :step="20"
        ></el-input-number>
      </el-col>
      <el-col class="item" :md="8">
        <span style="display: inline-block">持续时间</span>
        <el-input-number
          v-model="options.duration"
          @change="handleChange"
          :min="3"
          :max="8"
        ></el-input-number>
      </el-col>
      <el-col class="item" :md="8">
        <span>前置符号</span>
        <el-input
          v-model="options.prefix"
          @input="handleChange"
          placeholder="前置符号"
        ></el-input>
      </el-col>
      <el-col class="item" :md="8">
        <span>后置符号</span>
        <el-input
          v-model="options.suffix"
          @input="handleChange"
          placeholder="后置符号"
        ></el-input>
      </el-col>
      <el-col class="item" :md="8">
        <span>小数位数</span>
        <el-input-number
          v-model="options.decimalPlaces"
          @change="handleChange"
          :min="0"
          :max="2"
        ></el-input-number>
      </el-col>
    </div>
    <el-col :span="24">
      <el-button v-on:click="startAni">默认按钮</el-button>
    </el-col>
  </div>
</template>

<script>
import { CountUp } from "countup.js";
export default {
  name: "countAni",
  data() {
    return {
      endVal: 2000,
      countInstance: null,
      options: {
        startVal: 20, //起始值
        decimalPlaces: 0, //小数位数
        duration: 5, //动画持续时间
        // useGrouping: true, //是否采取分组形式，1,000或1000
        // useEasing: true, //平缓动画
        // smartEasingThreshold: 500, //达到哪个数字开始缓动动画
        // smartEasingAmount: 300, //缓动动画持续多少个数字
        separator: ",", //采用分组形式表示数字时，用什么符号进行分割，默认为逗号(,)
        // decimal: ".", //小数点
        prefix: "￥", //前缀，如￥12345
        suffix: "元", //后缀，如12345元
        // numerals: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"], //替换数字的符号
        // easgingFn: "(t: number, b: number, c: number, d: number) => number", //自定义缓动东海
        // onStartCallback: "()=>{}", //动画开始后的回调函数
        // onCompleteCallback: "()=>{}", //结束后的回调函数
      },
    };
  },
  mounted() {
    this.numberScroll();
  },
  methods: {
    numberScroll() {
      /**
         * target: DOM元素
            endVal: 结束值
            options?: 其他配置值
        */
      this.countInstance = new CountUp("numScroll", this.endVal, this.options);
    },
    handleChange() {
      this.countInstance = new CountUp("numScroll", this.endVal, this.options);
    },
    startAni() {
      this.countInstance.start();
    },
  },
};
</script>
<style>
#numScroll {
  font-size: 72px;
  font-weight: bold;
  /* background: -webkit-linear-gradient(45deg, blue, red); Chrome, Safari */
  background: linear-gradient(to right, #3a1c71, #ffaf7b);
  -webkit-background-clip: text; /* Chrome, Safari */
  background-clip: text;
  -webkit-text-fill-color: transparent; /* Chrome, Safari */
  color: transparent;
}
</style>
