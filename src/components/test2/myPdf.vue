<template>
  <div>
    <input id="fileinput" type="file" @change="uploadFile" />
    <div id="canvasCont">
      <canvas
        v-for="index in canvasTotalPage"
        :id="`myVancas${index}`"
        :key="index"
      ></canvas>
    </div>
  </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";
export default {
  data() {
    return {
      //pdf下载以及加载函数(异步)
      pdfLoadTask: null,
      //需要绘制pdf的总页数
      canvasTotalPage: 1,
      //引入pdf.js的字体，插件无法解析某些特殊字体
      cmapUrl: "https://unpkg.com/pdfjs-dist@2.6.347/cmaps/",
    };
  },
  methods: {
    uploadFile() {
      const file = document.getElementById("fileinput").files[0];
      const reader = new FileReader(); //创建一个FileReader实例来读取文件
      reader.readAsDataURL(file); //将文件内容转换为base64编码的url，方便pdfjs-dist插件加载pdf文档

      // FileReader读取文件完成后触发，此时拿到base64编码的url了
      reader.onload = () => {
        // 直接用atob代码ts会报错，因为网上说这个已经弃用了，但是在代码里面还是能用，不过ts会报错
        const data = window.atob(
          reader.result.substring(reader.result.indexOf(",") + 1)
        );
        // 拿到base64编码的url去加载pdf文档
        this.loadPdfData(data);
      };
    },
    //通过pdfjs-dist插件生产pdf
    loadPdfData(data) {
      // pdfjsLib.getDocument是获取pdf文档的方法，返回的是premise对象，对象包含一些pdf文档的信息以及操作pdf文档的api
      this.pdfLoadTask.value = pdfjsLib.getDocument({
        data: data,
        cMapUrl: this.cmapUrl.value,
        cMapPacked: true,
      });
      // 渲染页面,至少一页
      this.renderPage(1);
    },
    //渲染指定页码的pdf文档
    renderPage(num) {
      // 异步函数结束后返回pdf的基本信息以及一些api，是一个对象
      this.pdfLoadTask.value.promise.then((pdf) => {
        // 记录一下总页数，多页的情况，每页都需要新建一个画布
        canvasTotalPage.value = pdf.numPages;

        // 通过调用pdf对象的getPage方法，将指定的页码传入，可以获取传入页码的引用
        pdf.getPage(num).then((page) => {
          // 获取canvas的DOM对象
          const canvas = document.getElementById(`myVancas${num}`);

          // 获取canvas的渲染上下文(包含canvas的引用以及绘图功能)
          const ctx = canvas.getContext("2d");

          // 获取页面的像素比率
          const ratio = this.getRatio(ctx);

          // 页面的视口宽度，也就是元素的可视宽度
          // 不太理解用offsetWidth，可以看下这篇文章https://zhuanlan.zhihu.com/p/603633893
          const viewWidth = document.getElementById("canvasCont").offsetWidth;

          // pdf文档的宽度，不懂为啥用page.view[2]的话，可以打印一下page看看page返回的具体是啥信息
          const pdfWidth = page.view[2];

          // 根据视口的宽度/pdf文档宽度得到缩放比
          const scale = viewWidth / pdfWidth;

          // 获取pdf文档的缩放后基本信息
          const viewport = page.getViewport({ scale });

          // 画布的宽高需要根据实际像素调整，避免出现模糊的情况
          canvas.width = viewport.width * ratio;
          canvas.height = viewport.height * ratio;

          // 准备page.render()函数需要的参数
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };

          // 将数据渲染到画布上
          page.render(renderContext);

          // 多页pdf的情况
          if (num < pdf.numPages) {
            this.renderPage(num + 1);
          }
        });
      });
    },
    getRatio(ctx) {
      const dpr = window.devicePixelRatio || 1;
      const bsr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;

      return dpr / bsr;
    },
  },
};
</script>
