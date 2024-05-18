<template>
  <div class="container">
    <div class="image-box">
      <img
        class="image"
        src="https://cdn.pixabay.com/photo/2024/04/22/17/03/ai-generated-8713076_1280.png"
        alt=""
      />
      <div v-if="style" class="magnifier" id="magnifier" :style="style"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Magnifier",
  data() {
    return {
      image: null,
      magnifier: null,
      imageUrl: null,
      style: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.image = document.querySelector(".image");
      this.magnifier = document.getElementById("magnifier");
      this.imageUrl = this.image.src;
      this.image.addEventListener("mouseover", function () {
        this.magnifier.style.visibility = "visible";
      });

      this.image.addEventListener("mouseout", function () {
        this.magnifier.style.visibility = "hidden";
      });
      this.image.addEventListener("mousemove", function (e) {
        const magnifierWidth = this.magnifier.offsetWidth;
        const magnifierHeight = this.magnifier.offsetHeight;
        const imageWidth = this.image.offsetWidth;
        const imageHeight = this.image.offsetHeight;
        // 将放大镜的背景图片放大两倍，使用两倍的图片大小以保证明显的放大效果
        const magnifierBackgroundSize = `${imageWidth * 2}px ${
          imageHeight * 2
        }px`;
        // 获取鼠标在图片上的位置坐标
        const offsetX = e.offsetX;
        const offsetY = e.offsetY;
        // 计算放大镜需要移动的位置
        const positionX = offsetX - magnifierWidth / 2;
        const positionY = offsetY - magnifierHeight / 2;
        // 计算图片背景的偏移量，这样放大的部分能够与原图对应
        const backgroundPositionX = -positionX * 2;
        const backgroundPositionY = -positionY * 2;
        // 将计算出的值应用于放大镜元素属性
        this.style = {
          background: `url(${this.imageUrl})`,
          backgroundSize: magnifierBackgroundSize,
          left: `${positionX}px`,
          top: `${positionY}px`,
          backgroundPositionX: `${backgroundPositionX}px`,
          backgroundPositionY: `${backgroundPositionY}px`,
        };
        // return style;
        // magnifier.style.background = `url(${imageUrl})`;
        // magnifier.style.backgroundSize = magnifierBackgroundSize;
        // magnifier.style.left = `${positionX}px`;
        // magnifier.style.top = `${positionY}px`;
        // magnifier.style.backgroundPositionX = `${backgroundPositionX}px`;
        // magnifier.style.backgroundPositionY = `${backgroundPositionY}px`;
      });
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.image-box {
  position: relative;
}

.image {
  display: block;
  max-width: 100%;
  height: 100vh;
}

.magnifier {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 50%;
  pointer-events: none;
  visibility: hidden;
  z-index: 1;
}
</style>
