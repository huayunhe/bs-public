import request from '../utils/request';
import local_request from '../utils/local_request';

export const fetchData = query => {
    return local_request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
