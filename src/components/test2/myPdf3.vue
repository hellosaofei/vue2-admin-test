<template>
  <div class="box">
    <div class="tool-bar">
      <div>{{ pdfParams.pageNumber }} / {{ pdfParams.total }}</div>
      <button
        type="primary"
        :disabled="pdfParams.pageNumber == pdfParams.total"
        @click="nextPage"
      >
        下一页
      </button>
      <button
        type="primary"
        :disabled="pdfParams.pageNumber == 1"
        @click="prevPage"
      >
        上一页
      </button>
    </div>
    <canvas id="pdf-render"></canvas>
  </div>
</template>

<script>
const pdfParams = reactive({
  pageNumber: 1, // 当前页
  total: 0, // 总页数
});

// 不要定义为ref或reactive格式，就定义为普通的变量
let pdfDoc = null;
// 这里必须使用异步去引用pdf文件，直接去import会报错，也不知道为什么
onMounted(async () => {
  let pdfjs = await import("pdfjs-dist/build/pdf");
  let pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  // 此文件位于public/test2.pdf
  let url = ref("/test2.pdf");
  pdfjs.getDocument(url.value).promise.then((doc) => {
    pdfDoc = doc;
    pdfParams.total = doc.numPages;
    getPdfPage(1);
  });
});

// 加载pdf的某一页
const getPdfPage = (number) => {
  pdfDoc.getPage(number).then((page) => {
    const viewport = page.getViewport();
    const canvas = document.getElementById("pdf-render");
    const context = canvas.getContext("2d");
    canvas.width = viewport.viewBox[2];
    canvas.height = viewport.viewBox[3];
    viewport.width = viewport.viewBox[2];
    viewport.height = viewport.viewBox[3];
    canvas.style.width = Math.floor(viewport.width) + "px";
    canvas.style.height = Math.floor(viewport.height) + "px";

    let renderContext = {
      canvasContext: context,
      viewport: viewport,
      // 这里transform的六个参数，使用的是transform中的Matrix(矩阵)
      transform: [1, 0, 0, -1, 0, viewport.height],
    };
    // 进行渲染
    page.render(renderContext);
  });
};
// 下一页功能
const prevPage = () => {
  if (pdfParams.pageNumber > 1) {
    pdfParams.pageNumber -= 1;
  } else {
    pdfParams.pageNumber = 1;
  }
  getPdfPage(pdfParams.pageNumber);
};
// 上一页功能
const nextPage = () => {
  if (pdfParams.pageNumber < pdfParams.total) {
    pdfParams.pageNumber += 1;
  } else {
    pdfParams.pageNumber = pdfParams.total;
  }
  getPdfPage(pdfParams.pageNumber);
};
</script>
