import request from '../utils/request';

export const userLogin = (userPhone,userPassword) => {
    return request({
        url: '/user/login',
        method: 'get',
        params: 
        {
            userPhone,
            userPassword
        }
    });
};

export const listAllUsers = (query) => {
    return request({
        url: '/user/list',
        method: 'post',
        data: 
        {
            userInput:query.userInput,
            phoneInput:query.phoneInput,
            cardInput:query.cardInput,
            addrInput:query.addrInput
        }
    });
};

export const EditInfo = (user) => {
    return request({
        url: '/user/editInfo',
        method: 'post',
        data: 
        {
            userId: user.userId,
            userName: user.userName,
            userPhone: user.userPhone,
            userPassword: '',
            userCard: user.userCard,
            userAddr: user.userAddr,
            userAddrDetail: user.userAddrDetail,
            userCode: '',
        }
    });
};

export const EditPassword = (userId,userPassword) => {
    return request({
        url: '/user/editPassword',
        method: 'post',
        data: 
        {
            userId: userId,
            userName: '',
            userPhone: '',
            userPassword: userPassword,
            userCard: '',
            userAddr: '',
            userAddrDetail: '',
            userCode: '',
        }
    });
};

export const delUser = (userId) => {
    return request({
        url: '/user/del',
        method: 'get',
        params: 
        {
            userId,
        }
    });
};

export const addUser = (user) => {
    return request({
        url: '/user/add',
        method: 'post',
        data: 
        {
            userId: user.userId,
            userName: user.userName,
            userPhone: user.userPhone,
            userPassword: '',
            userCard: user.userCard,
            userAddr: user.userAddr,
            userAddrDetail: user.userAddrDetail,
            userCode: '',
        }
    });
};

export const listAllRepairUsers = () => {
    return request({
        url: '/user/listAllRepairUsers',
        method: 'get',
        params: 
        {
            
        }
    });
};

export const listAllUsersWithRole = () => {
    return request({
        url: '/user/listAllUsersWithRole',
        method: 'get',
        params: 
        {
            
        }
    });
};

export const listAllCheckUsers = () => {
    return request({
        url: '/user/listAllCheckUsers',
        method: 'get',
        params: 
        {
            
        }
    });
};