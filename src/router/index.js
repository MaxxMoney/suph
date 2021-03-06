import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开启
  next()
})

router.afterEach(() => {
  NProgress.done() // 进度条关闭
})
export default router
