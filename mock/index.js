// console.log(process.cwd());
// //E:\test_code\202404\admin-test\mock
import { handleMockArray } from "./utils";

function registerRoutes(app) {
  let mockLastIndex;
  const mockArr = handleMockArray();
  // mockArr.
}

function responseFake(url, type, response) {
  return {
    url: new RegExp(),
    type: type || "get",
    response(req, res) {
      res.status(200);
      if (JSON.stringify(req.body) !== "{}") {
      }
    },
  };
}
