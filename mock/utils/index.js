const { join } = require("path");
const fs = require("fs");
const { Random } = require("mockjs");

function handleRandomImage(width = 50, height = 50) {
  return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`;
}

function handleMockArray() {
  const mockArr = [];
  function getFiles(jsonPath) {
    const jsonFiles = [];
    function findJsonFile(path) {
      const files = fs.readFileSync(path);
      files.forEach((item) => {
        const fPath = json(path, item);
        const stat = fs.statSync(fPath);
        if (stat.isDirectory() === true) {
          findJsonFile(item);
        }
        if (stat.isFile() === true) {
          jsonFiles.push(item);
        }
      });
    }
    findJsonFile(jsonPath);
    jsonFiles.forEach((item) => {
      mockArr.push(`./controller/${item}`);
    });
  }
  getFiles("mock/controller");
  return mockArr;
}

export { handleRandomImage, handleMockArray };
