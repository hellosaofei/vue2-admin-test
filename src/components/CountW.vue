<template>
  <div
    id="numScroll"
    style="width: 300px; height: 300px; font-size: 20px; font-weight: bold"
  ></div>
  <!-- <h1 id="count1"></h1> -->
</template>

<script>
import CountUp from "countup.js";
export default {
  name: "CountW",
  mounted() {
    this.$nextTick(() => {
      this.numberScroll();
    });
  },
  methods: {
    numberScroll() {
      var count = new CountUp("numScroll", 24.02, 99.99);
      count.start();
    },
    start1() {
      var countUpOptions = {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: "",
      };
      var countUp = new CountUp("count1", 0, 1000, 0, 2.5, countUpOptions);
      countUp.start();
    },
  },
};
</script>
