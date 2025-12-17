import {createRouter, createWebHistory} from 'vue-router'

const HomePage = () => import('@/pages/HomePage/HomePage.vue')
const MainPage = () => import('@/pages/MainPage/MainPage.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/main',
            name: 'main',
            component: MainPage,
        },
    ],
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
})

router.beforeEach((_to, _from, next) => {
    next()
})
export default router
