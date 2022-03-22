import request from '../utils/local_request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
export const userLogin = (userName,userPassword) => {
    return request({
        url: '/user/login',
        method: 'get',
        params: {
            userName,
            userPassword
        }
    });
};
export const videoUrlManager = () => {
    return request({
        url: '/video/selectAll',
        method: 'get',
        params: {
        }
    });
};
export const cameraToVideoManager = () => {
    return request({
        url: '/camera/selectCameraToVideoAll',
        method: 'get',
        params: {
        }
    });
};

