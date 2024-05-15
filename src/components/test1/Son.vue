<template>
  <GrandSon />
</template>

<script>
import GrandSon from "./GrandSon.vue";
export default {
  name: "Son",
  components: {
    GrandSon,
  },
  mounted() {
    console.log(this.$listeners);
  },
  data() {
    return {};
  },
};
</script>

<style></style>
