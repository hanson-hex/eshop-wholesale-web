import { createWebHistory, createRouter } from 'vue-router';
/* Layout */
import Layout from '@/layout/index.vue';
// 公共路由
export const constantRoutes = [
  {
    name: 'index',
    path: '/',
    alwaysShow: true,
    component: Layout,
    hidden: false,
    meta: { title: '首页', icon: 'system', noCache: false, link: null },
    redirect: 'noRedirect',
    children: [
      {
        // component: '/index/index',
        component: () => import('@/views/index/index.vue'),
        hidden: false,
        meta: { title: '首页', icon: 'user', noCache: false, link: null },
        name: '首页',
        path: 'index',
      },
      {
        component: () => import('@/views/search/index.vue'),
        hidden: false,
        meta: { title: '搜索药品', icon: 'peoples', noCache: false, link: null },
        name: 'Search',
        path: 'search',
      },
    ],
  },
  {
    name: 'order',
    path: '/order',
    alwaysShow: true,
    component: Layout,
    hidden: false,
    meta: { title: '我的订单', icon: 'system', noCache: false, link: null },
    redirect: 'noRedirect',
    children: [
      {
        // component: '/index/index',
        component: () => import('@/views/order/index.vue'),
        hidden: false,
        meta: { title: '我的订单', icon: 'user', noCache: false, link: null },
        name: '我的订单',
        path: 'index',
      },
      // {
      // 	component: 'test/tpageb/index',
      // 	hidden: false,
      // 	meta: { title: 'testb', icon: 'peoples', noCache: false, link: null },
      // 	name: 'Tpageb',
      // 	path: 'tpageb',
      // },
    ],
  },
  {
    path: '/detail',
    component: () => import('@/views/detail/index.vue'),
  },
  {
    name: 'findMedicine',
    path: '/findMedicine',
    alwaysShow: true,
    component: Layout,
    hidden: false,
    meta: { title: '全球找药', icon: 'system', noCache: false, link: null },
    redirect: 'noRedirect',
    children: [
      {
        component: () => import('@/views/findMedicine/index.vue'),
        hidden: false,
        meta: { title: '全球找药', icon: 'user', noCache: false, link: null },
        name: '全球找药',
        path: 'index',
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  // {
  // 	path: '/register',
  // 	component: () => import('@/views/register.vue'),
  // 	hidden: true,
  // },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    hidden: true,
  },
  // {
  // 	path: '/401',
  // 	component: () => import('@/views/error/401.vue'),
  // 	hidden: true,
  // },
];
/*顶部导航路由 支持到两级 (第二级自动左边导航)*/
export const topNavRoutes = [
  // {
  //   name: 'Sample',
  //   path: '/sample',
  //   alwaysShow: true,
  //   component: 'Layout',
  //   hidden: false,
  //   meta: { title: '样式样例', icon: 'system', noCache: false, link: null },
  //   redirect: '/sample/home',
  //   children: [
  //     {
  //       component: 'sample/index',
  //       hidden: false,
  //       meta: { title: '样式样例', icon: 'dashboard', noCache: false, link: null },
  //       name: 'SampleHome',
  //       path: 'home',
  //     },
  //   ],
  // },
];

// 动态路由，基于用户权限动态去加载
//保留参考
// export const dynamicRoutes = [
// 	{
// 		path: '/system/user-auth',
// 		component: Layout,
// 		hidden: true,
// 		permissions: ['system:user:edit'],
// 		children: [
// 			{
// 				path: 'role/:userId(\\d+)',
// 				component: () => import('@/views/system/user/authRole.vue'),
// 				name: 'AuthRole',
// 				meta: { title: '分配角色', activeMenu: '/system/user' },
// 			},
// 		],
// 	},
// ];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
