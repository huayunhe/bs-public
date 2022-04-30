import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, 
            {
                path: "/PictureWaterLevelManager",
                name: "PictureWaterLevelManager",
                meta: {
                    title: '水位图片管理'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/device-manager/PictureWaterLevelManager.vue")
            }, {
                path: "/VideoWaterLevelManager",
                name: "VideoWaterLevelManager",
                meta: {
                    title: '水位视频管理'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/device-manager/VideoWaterLevelManager.vue")
            }, {
                path: "/VideoFloaterManager",
                name: "VideoFloaterManager",
                meta: {
                    title: '漂浮物视频管理'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/device-manager/VideoFloaterManager.vue")
            }, {
                path: "/RulerManager",
                name: "RulerManager",
                meta: {
                    title: '水尺信息管理'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/device-manager/RulerManager.vue")
            }, {
                path: "/CameraManager",
                name: "CameraManager",
                meta: {
                    title: '摄像头信息管理'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/device-manager/CameraManager.vue")
            }, {
                path: "/WaterLevelAnalysis",
                name: "WaterLevelAnalysis",
                meta: {
                    title: '水位检测分析'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/WaterLevelAnalysis.vue")
            },{
                path: "/FloaterAnalysis",
                name: "FloaterAnalysis",
                meta: {
                    title: '水面漂浮物检测分析'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/FloaterAnalysis.vue")
            },{
                path: "/WaterLevelManager",
                name: "WaterLevelManager",
                meta: {
                    title: '水位告警管理'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/WaterLevelManager.vue")
            }, {
                path: "/FloaterManager",
                name: "FloaterManager",
                meta: {
                    title: '水面漂浮物告警管理'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/FloaterManager.vue")
            }, {
                path: "/AlarmRecordManager",
                name: "AlarmRecordManager",
                meta: {
                    title: '告警记录上报管理'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/AlarmRecordManager.vue")
            }, {
                path: "/UserManager",
                name: "UserManager",
                meta: {
                    title: '用户管理',
                    permission: true,
                    roles: ['1','4'],
                },
                component: () => import ( /* webpackChunkName: "usermanage" */ "../views/system-manager/UserManager.vue")
            }, {
                path: "/RoleManager",
                name: "RoleManager",
                meta: {
                    title: '权限管理',
                    permission: true,
                    roles: ['1','4'],
                },
                component: () => import ( /* webpackChunkName: "rolemanage" */ "../views/system-manager/RoleManager.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import(/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const roleId = localStorage.getItem('roleId');
    console.log('beforeEach_roleId:',roleId)
    if (!roleId && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        if(to.meta.roles.includes(roleId)) next();
        else next('/403');
    } else {
        next();
    }
});

export default router;