import BasicLayout from '@/layout/Index.vue'
export default [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: BasicLayout,
    meta: {
      title: '基础框架',
      hideInMenu: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          icon: 'pie-chart',
          title: '首页',
        },
        component: () => import('@/views/test1/test1.vue')
      }
    ]
  },
  {
    path: '/index',
    name: 'home',
    meta: {
      icon: 'pie-chart',
      title: '首页'
    },
    redirect: '/home'
  },
  {
    path: '/test2',
    name: 'test2',
    meta: {
      icon: 'pie-chart',
      title: '侧边栏2-1'
    },
    component: BasicLayout,
    children: [
      {
        path: '/test21',
        name: 'test21',
        component: () => import('@/views/test2/test21.vue'),
        meta: {
          icon: 'home',
          title: '侧边栏2-1'
        }
      },
      {
        path: '/test22', name: 'test22',
        component: () => import('@/views/test2/test22.vue'),
        meta: {
          icon: 'pie-chart',
          title: '侧边栏2-2'
        }
      }
    ]
  },
  {
    path: '/test3',
    name: 'test3',
    meta: {
      icon: 'pie-chart',
      title: '侧边栏3',
    },
    component: BasicLayout,
    children: [
      {
        path: '/test31',
        name: 'test31',
        component: () => import('@/views/test3/test31.vue'),
        meta: {
          title: '侧边栏3-1'
        }
      },
      {
        path: '/test32',
        name: 'test32',
        component: () => import('@/views/test3/test32.vue'),
        meta: {
          title: '侧边栏3-2'
        }
      },
    ]
  },
]