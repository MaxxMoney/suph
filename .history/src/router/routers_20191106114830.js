import BasicLayout from '@/layout/BasicLayout.vue'
export default [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    meta: {

    },
    childrens: [
      {
        path: '/test1',
        name: 'test1',
        meta: {
          icon: 'pie-chart',
          title: '测试1',
          hideInMenu: false
        },
        component: () => import('@/views/test1.vue'),
      }
    ]
  },
]