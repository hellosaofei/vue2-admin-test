const globalCanvas = null;
const globalWaterMark = null;

function getDataUrl({
  font = "16px normal",
  fillStyle = "rgba(180, 180, 180, 0.3)",
  textAlign = "left",
  textBaseline = "middle",
  text = "请勿外传",
}) {
  const rotate = -20;
  const canvas = globalCanvas || document.createElement("canvas");
  canvas.height = 80;
  canvas.width = 100;
  const ctx = canvas.getContext("2d"); // 获取画布上下文

  ctx.rotate((rotate * Math.PI) / 180);
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  // ctx.height = 80;
  // ctx.width = 80;
  // console.log(ctx);
  ctx.fillText(text, 5, 60);

  return canvas.toDataURL("image/png");
}

export default {
  inserted(el, binding) {
    console.log(el, binding);
    // console.log(el.parentElement);
    const { parentElement } = el;
    // 获取对应的 canvas 画布相关的 base64 url
    const url = getDataUrl(binding.value);

    // 创建 waterMark 父元素
    const waterMark = globalWaterMark || document.createElement("div");
    waterMark.className = `water-mark`; // 方便自定义展示结果
    waterMark.setAttribute("style", `background-image: url(${url});`);

    // 将对应图片的父容器作为定位元素
    parentElement.setAttribute("style", "position: relative;");

    // 将图片元素移动到 waterMark 中
    parentElement.appendChild(waterMark);
  },
};
