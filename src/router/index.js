import Vue from 'vue';
import Router from 'vue-router';
import {mapActions} from 'vuex';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        // {
        //     path: '/readme',
        //     component: resolve => require(['../components/common/Home.vue'], resolve),
        //     children:[
        //         {
        //             path: '/',
        //             component: resolve => require(['../components/page/Readme.vue'], resolve)
        //         },
        //         {
        //             path: '/basetable',
        //             component: resolve => require(['../components/page/BaseTable.vue'], resolve)
        //         },
        //         {
        //             path: '/vuetable',
        //             component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
        //         },
        //         {
        //             path: '/baseform',
        //             component: resolve => require(['../components/page/BaseForm.vue'], resolve)
        //         },
        //         {
        //             path: '/vueeditor',
        //             component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
        //         },
        //         {
        //             path: '/markdown',
        //             component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
        //         },
        //         {
        //             path: '/upload',
        //             component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
        //         },
        //         {
        //             path: '/basecharts',
        //             component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
        //         },
        //         {
        //             path: '/drag',
        //             component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
        //         }
        //     ]
        // },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/tableList',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { role: ['user'] },
            children: [
                {
                    path: '/',
                    component: resolve => require(['../components/page/TableList.vue'], resolve),
                    meta: { role: ['user'] }
                },
                {
                    path: '/newTable',
                    component: resolve => require(['../components/page/NewTable.vue'], resolve),
                    meta: { role: ['user'] }
                },
                {
                    path: '/editTable/:tableId',
                    component: resolve => require(['../components/page/EditTable.vue'], resolve),
                    meta: { role: ['user'] }
                },
                {
                    path: '/userList',
                    component: resolve => require(['../components/page/UserList.vue'], resolve),
                    meta: { role: ['user','admin'] }
                },
                {
                    path: '/newUser',
                    component: resolve => require(['../components/page/NewUser.vue'], resolve),
                    meta: { role: ['user','admin'] }
                },
                {
                    path: '/editUser/:userId',
                    component: resolve => require(['../components/page/EditUser.vue'], resolve),
                    meta: { role: ['user','admin'] }
                },
            ]
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve),
        },
        // { path: '*', redirect: '/404', hidden: true }
    ]
})

router.beforeEach((to, from, next) => {

    if(!to.meta.role || to.meta.role.length === 0){
        return next(); // 该页面不要求权限
    }
    if(!router.app.$store){
        return next({path: '/login'})
    }
    let user = router.app.$store.state.currentUser;
    // 通过state获取权限，登录成功时，获取列表
    if (!user || !user._id) {
        return next({path: '/login'})
    }
    // console.log(to);

    let permission = router.app.hasPermission(user.role, to.meta.role);

    if(!permission){
        // 没找到要求的权限
        router.app.$message.error('没有权限，请登录后重试');
        return next('/login');

    }
    next(); // 有所有要求的权限


});

export default router
