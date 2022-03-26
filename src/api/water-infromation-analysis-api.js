import request from '../utils/local_request';

export const getWaterLevelAnalysisList = query => {
    console.log(789);
  return request({
    url: './water-level-analysis.json',
    method: 'get',
    params: query,
  });
}

export const getFloaterAnalysisList = query => {
  return request({
    url: './camera.json',
    method: 'get',
    params: query,
  });
}