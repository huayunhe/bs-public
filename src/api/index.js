import request from '../utils/request';

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
