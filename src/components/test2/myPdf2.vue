<script>
export default {
  name: "MyPdf2",
  data() {
    return {
      pdfUrl: "",
      //   fileUrl: "/public/pdfJs-dist/web/viewer.html/?file=",
      fileUrl: "/public/pdfjs/web/viewer.html?file=",
    };
  },
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.pdfUrl = this.fileUrl + encodeURIComponent(this.url);
  },
};
</script>

<template>
  <div class="container">
    <iframe :src="pdfUrl" width="100%" height="100%"></iframe>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
</style>
