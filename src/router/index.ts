import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import Index from "@/index/index.vue";
import Login from '@/view/Login.vue';
import Welcome from "@/view/Welcome.vue";
import {useUserStore} from "@/stores/user.ts";

interface MenuRoute {
    path?: string
    children?: MenuRoute[]
}

const dynamicComponentMap: Record<string, RouteRecordRaw['component']> = {
    '/account/user': () => import('@/view/UserManage.vue'),
    '/dashboard/user/userManage': () => import('@/view/UserManage.vue'),
    '/role/list': () => import('@/view/RoleInfo.vue'),
    '/dashboard/role/roleInfo': () => import('@/view/RoleInfo.vue'),
    '/permission/list': () => import('@/view/PermissionManage.vue'),
    '/content/news': () => import('@/view/NewsManage.vue'),
    '/content/notice':             () => import('@/view/NoticeManage.vue'),
    '/content/activity':           () => import('@/view/ActivityManage.vue'),
    '/content/party':              () => import('@/view/PartyManage.vue'),
    '/content/studentnews':        () => import('@/view/StudentNewsManage.vue'),
}
const collectMenuPaths = (menus: MenuRoute[] = [], paths: string[] = []) => {
    menus.forEach(menu => {
        if (menu.path) {
            paths.push(menu.path)
        }
        if (menu.children?.length) {
            collectMenuPaths(menu.children, paths)
        }
    })

    return paths
}
const dynamicRouteNames = new Set<string>()

const getRouteNameByPath = (path: string) => `dynamic${path.replace(/[^a-zA-Z0-9]/g, '_')}`

export const registerDynamicRoutes = (menus: MenuRoute[] = []) => {
    let added = false
    const paths = collectMenuPaths(menus)

    paths.forEach(path => {
        const component = dynamicComponentMap[path]
        if (!component) return

        const routeName = getRouteNameByPath(path)
        if (router.hasRoute(routeName)) return

        router.addRoute('Dashboard', {
            path,
            name: routeName,
            component,
        })
        dynamicRouteNames.add(routeName)
        added = true
    })

    return added
}
export const resetDynamicRoutes = () => {
    dynamicRouteNames.forEach(routeName => {
        if (router.hasRoute(routeName)) {
            router.removeRoute(routeName)
        }
    })
    dynamicRouteNames.clear()
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'Login', component: Login, alias: '/login'},
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Index,
            redirect: '/dashboard/welcome',
            children: [
                {path: '/dashboard/welcome', name: 'Welcome', component: Welcome},
            ]
        }
    ],
})

router.beforeEach((to) => {
    const userStore = useUserStore()
    const isLoginPage = to.path === '/' || to.path === '/login'

    if (isLoginPage) {
        return true
    }

    if (!userStore.token) {
        return '/login'
    }

    const added = registerDynamicRoutes(userStore.userInfo?.menuTree || [])
    if (added) {
        return {...to, replace: true}
    }

    return true
})

export default router
