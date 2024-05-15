<template>
  <div id="app">
    <water />
  </div>
</template>

<script>
import Water from "@/components/watermask/index.vue";
// import Coder from "@/components/QrCode/index.vue";
// import DragELe from "@/components/DragEle/index.vue";
export default {
  name: "App",
  components: {
    Water,
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
