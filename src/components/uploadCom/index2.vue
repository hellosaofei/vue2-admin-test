<template>
  <div>
    <progress :value="uploaded_precent" :max="uploaded_max"></progress>

    <input type="file" ref="video_selector" value="选择视频" />

    <span>{{ uploadInfo }}</span>

    <button v-on:click="upload_">上传视频</button>
  </div>
</template>

<script>
// uploadVideo
import { uploadVideo } from "@/api/upload.js";
export default {
  name: "",
  data() {
    return {
      uploadInfo: "",
      uploaded_precent: 0,
      uploaded_max: 0,
      uploadedSize: 0,
      CHUNK_SIZE: 1024 * 1024,
    };
  },
  methods: {
    async upload_() {
      const file = this.$refs.video_selector.files[0];
      if (!file) {
        this.uploadInfo = "尚未选择文件";
        return;
      }

      const { name, type, size } = file;
      this.uploaded_max = size;
      this.uploadInfo = "文件正在上传中";
      while (this.uploadedSize < size) {
        const fileChunk = file.slice(
          this.uploadedSize,
          this.uploadedSize + this.CHUNK_SIZE
        );

        const formData = this.createFormData({
          name, //原始名称
          type, //文件类型video/mp4
          size, //大小，字节数
          uploadedSize: this.uploadedSize, //已经上传的大小
          file: fileChunk, //切分的文件数据
        });
        try {
          const uploadResult = await uploadVideo(formData);
          console.log(uploadResult);
        } catch (e) {
          this.uploadInfo = `文件上传出现错误${e}`;
          return;
        }
        this.uploadedSize += fileChunk.size;
      }
      this.uploadInfo = "文件上传成功";
    },
    createFormData({ name, type, size, uploadedSize, file }) {
      const fd = new FormData();

      fd.append("name", name);
      fd.append("type", type);
      fd.append("size", size);
      fd.append("uploadedSize", uploadedSize);
      fd.append("file", file);
      return fd;
    },
  },
};
</script>

<style></style>
