<template>
  <div id="app">
    <!-- 上传组件 -->
    <el-upload
      action
      drag
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleChange"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">大小不超过 200M 的视频</div>
    </el-upload>

    <!-- 进度显示 -->
    <div class="progress-box">
      <span>上传进度：{{ percent.toFixed() }}%</span>
      <el-button type="primary" size="mini" @click="handleClickBtn">
        {{ upload | btnTextFilter }}
      </el-button>
    </div>

    <!-- 展示上传成功的视频 -->
    <div v-if="videoUrl">
      <video :src="videoUrl" controls />
    </div>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";
import axios from "axios";

export default {
  name: "App3",
  filters: {
    btnTextFilter(val) {
      return val ? "暂停" : "继续";
    },
  },
  data() {
    return {
      percent: 0,
      videoUrl: "",
      upload: true,
      percentCount: 0,
    };
  },
  methods: {
    async handleChange(file) {
      if (!file) return;
      this.percent = 0;
      this.videoUrl = "";
      // 获取文件并转成 ArrayBuffer 对象
      const fileObj = file.raw;
      let buffer;
      try {
        buffer = await this.fileToBuffer(fileObj);
      } catch (e) {
        console.log(e);
      }

      // 将文件按固定大小（2M）进行切片，注意此处同时声明了多个常量
      const chunkSize = 2097152,
        chunkList = [], // 保存所有切片的数组
        chunkListLength = Math.ceil(fileObj.size / chunkSize), // 计算总共多个切片
        suffix = /\.([0-9A-z]+)$/.exec(fileObj.name)[1]; // 文件后缀名

      // 根据文件内容生成 hash 值
      const spark = new SparkMD5.ArrayBuffer();
      spark.append(buffer);
      const hash = spark.end();

      // 生成切片，这里后端要求传递的参数为字节数据块（chunk）和每个数据块的文件名（fileName）
      let curChunk = 0; // 切片时的初始位置
      for (let i = 0; i < chunkListLength; i++) {
        const item = {
          chunk: fileObj.slice(curChunk, curChunk + chunkSize),
          fileName: `${hash}_${i}.${suffix}`, // 文件名规则按照 hash_1.jpg 命名
        };
        curChunk += chunkSize;
        chunkList.push(item);
      }
      this.chunkList = chunkList; // sendRequest 要用到
      this.hash = hash; // sendRequest 要用到
      this.sendRequest();
    },

    // 发送请求
    sendRequest() {
      const requestList = []; // 请求集合
      this.chunkList.forEach((item, index) => {
        const fn = () => {
          const formData = new FormData();
          formData.append("chunk", item.chunk);
          formData.append("filename", item.fileName);
          return axios({
            url: "/single3",
            method: "post",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          }).then((res) => {
            if (res.data.code === 0) {
              // 成功
              if (this.percentCount === 0) {
                // 避免上传成功后会删除切片改变 chunkList 的长度影响到 percentCount 的值
                this.percentCount = 100 / this.chunkList.length;
              }
              this.percent += this.percentCount; // 改变进度
              this.chunkList.splice(index, 1); // 一旦上传成功就删除这一个 chunk，方便断点续传
            }
          });
        };
        requestList.push(fn);
      });

      let i = 0; // 记录发送的请求个数
      // 文件切片全部发送完毕后，需要请求 '/merge' 接口，把文件的 hash 传递给服务器
      const complete = () => {
        axios({
          url: "/merge",
          method: "get",
          params: { hash: this.hash },
        }).then((res) => {
          if (res.data.code === 0) {
            // 请求发送成功
            this.videoUrl = res.data.path;
          }
        });
      };
      const send = async () => {
        if (!this.upload) return;
        if (i >= requestList.length) {
          // 发送完毕
          complete();
          return;
        }
        await requestList[i]();
        i++;
        send();
      };
      send(); // 发送请求
    },

    // 按下暂停按钮
    handleClickBtn() {
      this.upload = !this.upload;
      // 如果不暂停则继续上传
      if (this.upload) this.sendRequest();
    },

    // 将 File 对象转为 ArrayBuffer
    fileToBuffer(file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = (e) => {
          resolve(e.target.result);
        };
        fr.readAsArrayBuffer(file);
        fr.onerror = () => {
          reject(new Error("转换文件格式发生错误"));
        };
      });
    },
  },
};
</script>

<style scoped>
.progress-box {
  box-sizing: border-box;
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 8px 10px;
  background-color: #ecf5ff;
  font-size: 14px;
  border-radius: 4px;
}
</style>
