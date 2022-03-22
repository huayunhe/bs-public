import request from '../utils/local_request';

export const getWaterLevelList = query => {
  return request({
    url: './water-level.json',
    method: 'get',
    params: query,
  });
}

export const getFloaterList = query => {
  return request({
    url: './camera.json',
    method: 'get',
    params: query,
  });
}

export const getAlarmRecordList = query => {
  return request({
    url: './alarm-record.json',
    method: 'get',
    params: query,
  });
}