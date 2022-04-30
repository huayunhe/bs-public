import request from '../utils/request';

export const listRoles = () => {
    return request({
        url: '/role/list',
        method: 'get',
        params: {

        }
    });
};

export const addNewRole = (form) => {
    return request({
        url: '/role/addNewRole',
        method: 'post',
        data: {
            roleId: form.roleId,
            roleName: form.roleName,
            description: form.description,
        }
    });
};

export const delRole = (roleId) => {
    return request({
        url: '/role/delRole',
        method: 'get',
        params: {
            roleId
        }
    });
};

export const editRole = (form) => {
    return request({
        url: '/role/editRole',
        method: 'post',
        data: {
            roleId: form.roleId,
            roleName: form.roleName,
            description: form.description,
        }
    });
};

export const addRoleToUser = (userId,roleId) => {
    return request({
        url: '/role/addRoleToUser',
        method: 'get',
        params: {
            userId: userId,
            roleId: roleId,
        }
    });
};

export const delRoleToUser = (userId,roleId) => {
    return request({
        url: '/role/delRoleToUser',
        method: 'get',
        params: {
            userId: userId,
            roleId: roleId,
        }
    });
};