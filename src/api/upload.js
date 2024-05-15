import request from "@/utils/request";

export function uploadVideo(data) {
  return request({
    url: "/upload_video",
    method: "post",
    data,
  });
}

export function upload_2(data) {
  return request({
    url: "/upload_2",
    method: "post",
    data,
  });
}

export function complete_upload(data) {
  return request({
    url: "/complete/upload",
    method: "post",
    data,
  });
}
