import { createRouter, createWebHashHistory } from 'vue-router'
import Cookie from 'js-cookie' 
import Login from './components/MyLogin.vue'
import Home from './components/MyHome.vue'
import index from './components/main/index.vue'
import Message from './components/main/message.vue'
import Test from './components/main/test.vue'
import info from './components/main/info.vue'
import Check from './components/main/check.vue'
// import Users from './components/menus/MyUsers.vue'
// import Demos from './components/menus/MyDemos.vue'
// import Projects from './components/menus/MyProjects.vue'
// import Documents from './components/menus/MyDocuments.vue'
// import Settings from './components/menus/MySettings.vue'

// 创建路由实例对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    {
      path: '/home',
      redirect: '/home/index',
      component: Home,
      name: 'home',
      children: [
        { path: 'index', component: index },
        { path: 'message', component: Message },
        { path: 'test', component: Test},
        { path: 'info', component: info },
        { path: 'check', component: Check },
        // { path: 'settings', component: Settings },
      ],
    },
  ],
})

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  // 判断用户访问的是否为登录页
  if (to.path === '/login') return next()
  // 获取 token 值
  const tokenStr = Cookie.get('token')
  if (!tokenStr) {
    next('/login')
  } else {
    next()
  }
})

export default router