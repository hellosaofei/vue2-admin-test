<template>
  <div id="app">
    <!-- <water /> -->
    <Magnifier />
  </div>
</template>

<script>
import Magnifier from "@/components/Magnifier/index2.vue";
// import Water from "@/components/watermask/index.vue";
// import Coder from "@/components/QrCode/index.vue";
// import DragELe from "@/components/DragEle/index.vue";
export default {
  name: "App",
  components: {
    Magnifier,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>
