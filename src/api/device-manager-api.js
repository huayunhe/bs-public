import request from '../utils/request';

export const getVideoURLList = query => {
  return request({
    url: './video-url.json',
    method: 'get',
    params: query,
  });
}

export const getVideoCameraList = query => {
  return request({
    url: './camera.json',
    methom: 'get',
    params: query,
  });
}

export const cameraManager = () => {
  return request({
      url: '/camera/selectCameraAll',
      method: 'get',
      params: {
      }
  });
};
export const rulerToCameraManager = () => {
  return request({
      url: '/ruler/selectRulerToCameraAll',
      method: 'get',
      params: {
      }
  });
};
export const getVideoFloaterList = () => {
  return request({
      url: '/videoFloater/selectAll',
      method: 'get',
      params: {
      }
  });
};
export const addVideoFloater = (query) => {
  return request({
      url: '/videoFloater/add',
      method: 'post',
      data: {
        videoFloaterId:query.videoFloaterId,
        videoFloaterUrl:query.videoUrl,
        cameraId:query.cameraId,
      }
  });
};
export const getVideoWaterLevelList = () => {
  return request({
      url: '/videoWaterLevel/selectAll',
      method: 'get',
      params: {
      }
  });
};
export const getPictureWaterLevelList = () => {
  return request({
      url: '/pictureWaterLevel/selectAll',
      method: 'get',
      params: {
      }
  });
};