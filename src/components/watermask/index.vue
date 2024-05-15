<template>
  <div class="container">
    <img src="./123.png" alt="" v-watermask="{}" />
  </div>
</template>

<script>
export default {
  name: "Water",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.water-mark {
  display: inline-block;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-repeat: repeat;
}
.container {
  height: 60%;
  background-color: aquamarine;
}
img {
  width: 200px;
  height: 200px;
}
</style>
