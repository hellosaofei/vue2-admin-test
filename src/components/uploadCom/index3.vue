<template>
  <div></div>
</template>

<script>
import { upload_2, complete_upload } from "@/api/upload.js";
export default {
  name: "",
  data() {
    return {
      i: 0, // 已经发送的请求个数
      percent: 0,
      videoUrl: "",
      isUploading: true, //文件上传是否已经停止
      percentCount: 0,
      chunkList: [], // 文件切片
      hash: null,
      requestList: null, //文件传输列表，每个元素是一个upload函数
    };
  },
  props: {
    chunkSize: {
      type: Number,
      default: 2 * 1024 * 1024,
    },
  },
  methods: {
    async handleChange(file) {
      // 没有文件
      if (!file) {
        return;
      }

      this.percent = 0;
      this.videoUrl = "";

      const fileObj = file.raw;
      let buffer;
      try {
        buffer = await this.fileToBuffer(fileObj);
      } catch (error) {
        console.log("发生错误", error);
        return;
      }

      this.createChunkList(fileObj);
      this.createRequestList();
      this.sendRequest();
    },
    createChunkList(fileObj) {
      const chunkList = [],
        chunkListLength = Math.ceil(fileObj.size / this.chunkSize), // chunk数量向上取整
        suffix = /\.([0-9A-z]+)$/.exec(fileObj.name)[1], // 文件后缀名
        spark = new SparkMD5.ArrayBuffer(),
        curChunk = 0;

      spark.append(buffer);
      const hash = spark.end();

      for (let i = 0; i < chunkListLength; i++) {
        const item = {
          chunk: fileObj.slice(curChunk, curChunk + this.chunkSize),
          fileName: `${hash}_${i}.${suffix}`,
        };
        curChunk += this.chunkSize;
        chunkList.push(item);
      }
      this.chunkList = chunkList;
      this.hash = hash;
    },
    createRequestList() {
      const requestList = [];
      this.chunkList.forEach((item, index) => {
        const fn = async () => {
          const formData = this.createFormData({
            chunk: item.chunk,
            filename: item.fileName,
          });
          const res = await upload_2(formData);
          if (res.code !== 0) {
            console.log("后端返回状态码非0， 接受文件出现问题");
            return;
          } else {
            //后端接收文件成功，本次上传成功
            this.percent += this.percentCount;
            this.chunkList.splice(index, 1);
          }
        };
        requestList.push(fn);
      });
      this.requestList = requestList;
    },
    async sendRequest() {
      if (!this.upload) {
        return;
      }
      if (this.i > requestList.length) {
        this.completeUpload();
        return;
      }
      await this.requestList[this.i]();
      this.i++;
      //   递归调用
      this.sendRequest();
    },
    async completeUpload() {
      const res = await complete_upload({
        params: {
          hash: this.hash,
        },
      });
      if (res.code === 0) {
        this.videoUrl = res.path;
      }
    },
    createFormData({ chunk, filename }) {
      const fd = new FormData();
      fd.append("filename", filename);
      fd.append("chunk", chunk);
      return fd;
    },
    handleStopBtnClick() {
      this.isUploading = !history.isUploading;
      if (this.isUploading) {
        this.sendRequest();
      }
    },
    fileToBuffer(file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();

        fr.readAsArrayBuffer(file);

        // 当文件成功读取时，执行load 事件
        fr.onload = (event) => {
          resolve(event.target.result);
        };

        fr.onerror = () => {
          reject(new Error("转换文件格式发生错误"));
        };
      });
    },
  },
};
</script>

<style></style>
