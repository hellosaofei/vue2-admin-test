import waterBgImg from "./123.png";

export default {
  bind(el) {
    const { clientWidth, clientHeight, parentElement } = el;
    const waterMark = document.createElement("div");
    const waterBg = document.createElement("div");
    // waterBg是子节点，且在最上层显示，
    waterMark.className = `water-mark`;

    waterMark.setAttribute(
      "style",
      `
        display: inline-block;
        overflow: hidden;
        position: relative;
        width: ${clientWidth}px; 
        height: ${clientHeight}px;`
    );
    waterBg.className = `water-mark-bg`; // 方便自定义展示结果
    waterBg.setAttribute(
      "style",
      `
            position: absolute;
            pointer-events: none;
            width: 100%;
            height: 100%;
            opacity: 0.2;
            background-image: url(${waterBgImg}); 
            background-repeat: repeat;`
    );

    waterMark.appendChild(waterBg);
    // 将 waterMark 插入到对应的位置
    parentElement?.insertBefore(waterMark, el);
    // 将图片元素移动到 waterMark 中
    waterMark.appendChild(el);
  },
};
