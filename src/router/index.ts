import {createRouter, createWebHistory} from 'vue-router'
import Index from "@/index/index.vue";
import UserManage from "@/view/UserManage.vue";
import Login from '@/view/Login.vue';
import RoleInfo from "@/view/RoleInfo.vue";
import Welcome from "@/view/Welcome.vue";
import PermissionManage from "@/view/PermissionManage.vue";
import NewsManage from "@/view/NewsManage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', component: Login},
        {path: '/role/list', redirect: '/dashboard/role/roleInfo'},
        {path: '/account/user', redirect: '/dashboard/user/userManage'},
        {path: '/account', redirect: '/dashboard/welcome'},

        {
            path: '/dashboard',
            component: Index,
            redirect: '/dashboard/welcome',
            children: [
                {path: '/dashboard/welcome', component: Welcome},
                {path: '/dashboard/user/userManage', component: UserManage},
                {path: '/dashboard/role/roleInfo', component: RoleInfo},
                {
                    path: '/permission/list',
                    name: 'PermissionManage',
                    component: PermissionManage
                },
                {
                    path: '/role/list',
                    name: 'RoleInfo',
                    component: RoleInfo
                },
                {
                    path: '/account/user',
                    name: 'UserManage',
                    component: UserManage
                },
                {path: '/content/news', component: () => import('@/view/NewsManage.vue')}
            ]
        }
    ],
})




export default router
