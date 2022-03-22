import request from '../utils/local_request';

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