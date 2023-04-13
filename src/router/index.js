import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: "/login",
        component: () =>
            import ("@/views/login/index"),
        hidden: true,
    },
    {
        path: "/404",
        component: () =>
            import ("@/views/404"),
        hidden: true,
    },
    {
        path: "/",
        component: Layout,
        redirect: "/store",
        hidden: true,
        children: [{
                path: "store",
                name: "store",
                component: () =>
                    import ("@/views/store/index"),
                meta: { title: "首页", icon: "dashboard" },
            },
            {
                path: "storeAptitude",
                name: "storeAptitude",
                component: () =>
                    import ("@/views/storeAptitude/index.vue"),
                meta: { title: "资质审核", icon: "dashboard" },
            },
        ],
    },
    // {
    //     path: "/merchant",
    //     component: Layout,
    //     redirect: "/merchantsettlement",
    //     hidden: true,
    //     children: [{
    //         path: "merchantsettlement",
    //         name: "merchantsettlement",
    //         component: () =>
    //             import ("@/views/merchantsettlement/index.vue"),
    //         meta: { title: "资质审核", icon: "dashboard" },
    //     }, ],
    // },
    {
        path: "/user",
        component: Layout,
        redirect: "/user",
        hidden: true,
        children: [{
            path: "info",
            name: "info",
            component: () =>
                import ("@/views/user/index"),
            meta: { title: "个人中心", icon: "dashboard" },
        }, ],
    },
    {
        path: "/dashboard",
        component: Layout,
        redirect: "/drugprocurement/drugprocurement-buygoods",
        hidden: true,
    },
    {
        path: "/mymerchantsettlementb",
        name: "mymerchantSettlementb",
        component: () =>
            import ("@/views/merchantsettlement/index"),
        meta: { title: "我的资质管理", icon: "form" },
        hidden: true,
    },
    {
        path: "/",
        name: "store",
        component: () =>
            import ("@/views/store/index"),
        meta: { title: "首页", icon: "form" },
        hidden: true,
    },

    // 注释此处开始

    // {
    //   path: "/system",
    //   component: Layout,
    //   redirect: "/system",
    //   meta: { title: "系统管理", icon: "dashboard" },
    //   // hidden: true,
    //   children: [
    //     {
    //       path: "menus",
    //       name: "menus",
    //       component: () => import("@/views/system/menusList"),
    //       meta: { title: "菜单管理", icon: "dashboard" },
    //     },
    //     {
    //       path: "roles",
    //       name: "roles",
    //       component: () => import("@/views/system/rolesList"),
    //       meta: { title: "角色管理", icon: "dashboard" },
    //     },
    //     {
    //       path: "user",
    //       name: "user",
    //       component: () => import("@/views/system/userList"),
    //       meta: { title: "用户管理", icon: "dashboard" },
    //     },
    //   ],
    // },
    // {
    //   path: "/merchantsettlement",
    //   component: Layout,
    //   children: [
    //     {
    //       path: "merchantSettlement",
    //       name: "merchantSettlement",
    //       component: () => import("@/views/merchantsettlement/index"),
    //       meta: { title: "资质管理", icon: "form" },
    //     },
    //   ],
    // },
    // {
    //   path: "/drugprocurement",
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'drugprocurement',
    //       name: 'drugprocurement',
    //       component: () => import('@/views/drugprocurement/buygoods'),
    //       meta: { title: '春播药采', icon: 'form' }
    //     }
    //   ]
    // },
    // {
    //   path: '/shoppingcart',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'shoppingcart',
    //       name: 'shoppingcart',
    //       component: () => import('@/views/shoppingcart/shoppingcart'),
    //       meta: { title: '购物车', icon: 'form' }
    //     },
    //     {
    //       path: 'confirmOrder',
    //       name: 'confirmOrder',
    //       hidden: true,
    //       component: () => import('@/views/shoppingcart/confirmOrder'),
    //       meta: { title: '结算', icon: 'form' }
    //     }
    //   ]
    // },
    // {
    //   path: "/productManage",
    //   name: "productManage",
    //   meta: { title: "商品管理", icon: "form" },
    //   component: Layout,
    //   children: [
    //     {
    //       path: "/publishProduct",
    //       name: "publishProduct",
    //       component: () => import("@/views/publishProduct/index"),
    //       meta: { title: "发布商品", icon: "form" },
    //     },
    //     {
    //       path: "/publishProduct/add",
    //       component: () => import("@/views/publishProduct/addProduct"),
    //       meta: { title: "新增商品", icon: "form" },
    //       hidden: true,
    //     },
    //     {
    //       path: "/auditProduct",
    //       name: "auditProduct",
    //       component: () => import("@/views/auditProduct/index"),
    //       meta: { title: "审核中的商品", icon: "form" },
    //     },
    //     {
    //       path: "/auditProduct/edit",
    //       name: "auditProductEdit",
    //       component: () => import("@/views/auditProduct/edit"),
    //       hidden: true,
    //     },
    //     {
    //       path: "/publishProduct/shopingcart",
    //       component: () => import("@/views/publishProduct/shopingcart"),
    //       hidden: true,
    //     },
    //     {
    //       path: "/wareProduct",
    //       name: "WareProduct",
    //       component: () => import("@/views/wareProduct/index"),
    //       meta: { title: "仓库中的商品", icon: "form" },
    //     },
    //     {
    //       path: "sale",
    //       name: "sale",
    //       component: () => import("@/views/sale/index"),
    //       meta: { title: "出售中的商品", icon: "form" },
    //     },
    //   ],
    // },
    // {
    //   path: "/ordercenter",
    //   component: Layout,
    //   meta: { title: "订单中心", icon: "form" },
    //   children: [
    //     {
    //       path: "procurement",
    //       name: "procurement",
    //       component: () => import("@/views/ordercenter/procurement"),
    //       meta: { title: "我的采购订单", icon: "form" },
    //     },
    //     {
    //       path: "procurementDetail",
    //       name: "procurementDetail",
    //       hidden: true,
    //       component: () => import("@/views/ordercenter/procurementDetail"),
    //       meta: { title: "采购订单详情", icon: "form" },
    //     },
    //     {
    //       path: "sales",
    //       name: "sales",
    //       component: () => import("@/views/ordercenter/sales"),
    //       meta: { title: "我的销售订单", icon: "form" },
    //     },
    //     {
    //       path: "detail",
    //       name: "detail",
    //       hidden: true,
    //       component: () => import("@/views/ordercenter/detail"),
    //       meta: { title: "销售订单详情", icon: "form" },
    //     },
    //   ],
    // },
    // {
    //   path: "/financialcenter",
    //   component: Layout,
    //   meta: { title: "财务中心", icon: "form" },
    //   children: [
    //     {
    //       path: "toinvoice",
    //       name: "toinvoice",
    //       component: () => import("@/views/financialcenter/wait"),
    //       meta: { title: "待开发票", icon: "form" },
    //     },
    //     {
    //       path: "invoicelist",
    //       name: "invoicelist",
    //       component: () => import("@/views/financialcenter/invoicelist"),
    //       meta: { title: "开票记录", icon: "form" },
    //     },
    //     {
    //       path: "invoicehead",
    //       name: "invoicehead",
    //       component: () => import("@/views/financialcenter/invoicehead"),
    //       meta: { title: "发票抬头管理", icon: "form" },
    //     },
    //     {
    //       path: "invoicesetting",
    //       name: "invoicesetting",
    //       component: () => import("@/views/financialcenter/invoicesetting"),
    //       meta: { title: "发票设置", icon: "form" },
    //     },
    //     {
    //       path: "myincome",
    //       name: "myincome",
    //       component: () => import("@/views/financialcenter/myincome"),
    //       meta: { title: "我的收入", icon: "form" },
    //     },
    //   ],
    // },
    // {
    //   path: "/servicecenter",
    //   component: Layout,
    //   meta: { title: "服务中心", icon: "form" },
    //   children: [
    //     {
    //       path: "pendingPayment",
    //       name: "pendingPayment",
    //       component: () => import("@/views/servicecenter/pendingPayment"),
    //       meta: { title: "待付服务费", icon: "form" },
    //     },
    //     {
    //       path: "paidPayment",
    //       name: "paidPayment",
    //       component: () => import("@/views/servicecenter/paidPayment"),
    //       meta: { title: "应收服务费", icon: "form" },
    //     },
    //   ],
    // },
    // {
    //   path: "/basicmanagement",
    //   component: Layout,
    //   meta: { title: "基础管理", icon: "form" },
    //   children: [
    //     {
    //       path: "classificationmanagement",
    //       name: "classificationmanagement",
    //       component: () => import("@/views/classificationmanagement/index"),
    //       meta: { title: "药品分类管理", icon: "form" },
    //     },
    //   ],
    // },
    // {
    //   path: "/auditcenter",
    //   component: Layout,
    //   meta: { title: "审核中心", icon: "form" },
    //   children: [
    //     {
    //       path: "auditgoods",
    //       name: "auditgoods",
    //       component: () => import("@/views/auditcenter/auditgoods"),
    //       meta: { title: "商品审核", icon: "form" },
    //     },
    //     {
    //       path: "auditgoodsdetail",
    //       name: "auditgoodsdetail",
    //       hidden: true,
    //       component: () => import("@/views/auditcenter/auditgoodsdetail"),
    //       meta: { title: "商品审核详情", icon: "form" },
    //     },
    //     {
    //       path: "auditcompany",
    //       name: "auditcompany",
    //       component: () => import("@/views/auditcenter/auditcompany"),
    //       meta: { title: "企业资质审核", icon: "form" },
    //     },
    //     {
    //       path: "auditcompanydetail",
    //       name: "auditcompanydetail",
    //       hidden: true,
    //       component: () => import("@/views/auditcenter/auditcompanydetail"),
    //       meta: { title: "企业资质审核详情", icon: "form" },
    //     },
    //   ],
    // },
    // {
    //   path: "/commissionmanagement",
    //   component: Layout,
    //   meta: { title: "分佣管理", icon: "form" },
    //   children: [
    //     {
    //       path: "divisionrulemanagement",
    //       name: "divisionrulemanagement",
    //       component: () =>
    //         import("@/views/commissionmanagement/divisionrulemanagement"),
    //       meta: { title: "分账规则管理", icon: "form" },
    //     },
    //     {
    //       path: "divisionrule",
    //       name: "divisionrule",
    //       hidden: true,
    //       component: () => import("@/views/commissionmanagement/divisionrule"),
    //       meta: { title: "分账规则", icon: "form" },
    //     },
    //     {
    //       path: "relatedgoods",
    //       name: "relatedgoods",
    //       hidden: true,
    //       component: () => import("@/views/commissionmanagement/relatedgoods"),
    //       meta: { title: "关联商品", icon: "form" },
    //     },
    //   ],
    // },
    // {
    //   path: "/platformproductManage",
    //   component: Layout,
    //   meta: { title: "平台商品管理", icon: "form" },
    //   children: [
    //     {
    //       path: "commodityreference",
    //       name: "commodityreference",
    //       component: () => import("@/views/commodityreference/index"),
    //       meta: { title: "商品基准库", icon: "form" },
    //     },
    //     {
    //       path: "pricingmanagement",
    //       name: "pricingmanagement",
    //       component: () =>
    //         import(
    //           "@/views/commodityreference/pricingmanagement/pricingmanagement"
    //         ),
    //       meta: { title: "定价管理", icon: "form" },
    //     },
    //     {
    //       path: "goods",
    //       name: "goods",
    //       hidden: true,
    //       component: () =>
    //         import("@/views/commodityreference/pricingmanagement/goods"),
    //       meta: { title: "选择商品", icon: "form" },
    //     },
    //     {
    //       path: "pricingarea",
    //       name: "pricingarea",
    //       hidden: true,
    //       component: () =>
    //         import("@/views/commodityreference/pricingmanagement/pricingarea"),
    //       meta: { title: "定价区域", icon: "form" },
    //     },
    //     {
    //       path: "commodityreference/edit",
    //       name: "commodityreferenceedit",
    //       hidden: true,
    //       component: () => import("@/views/commodityreference/edit"),
    //       meta: { title: "商品基准库编辑", icon: "form" },
    //     },
    //     {
    //       path: "release",
    //       name: "release",
    //       component: () => import("@/views/release/index"),
    //       meta: { title: "批量发布商品", icon: "form" },
    //     },
    //   ],
    // },
    // {
    //   path: "/order",
    //   component: Layout,
    //   meta: { title: "订单", icon: "form" },
    //   children: [
    //     {
    //       path: "order",
    //       name: "order",
    //       component: () => import("@/components/service/index"),
    //       meta: { title: "订单", icon: "form" },
    //     },
    //   ],
    // }
    // 注释此处结束
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    // {
    //   path: "/nested",
    //   component: Layout,
    //   redirect: "/nested/menu1",
    //   name: "Nested",
    //   meta: {
    //     title: "Nested",
    //     icon: "nested",
    //   },
    //   children: [
    //     {
    //       path: "menu1",
    //       component: () => import("@/views/nested/menu1/index"), // Parent router-view
    //       name: "Menu1",
    //       meta: { title: "Menu1" },
    //       children: [
    //         {
    //           path: "menu1-1",
    //           component: () => import("@/views/nested/menu1/menu1-1"),
    //           name: "Menu1-1",
    //           meta: { title: "Menu1-1" },
    //         },
    //         {
    //           path: "menu1-2",
    //           component: () => import("@/views/nested/menu1/menu1-2"),
    //           name: "Menu1-2",
    //           meta: { title: "Menu1-2" },
    //           children: [
    //             {
    //               path: "menu1-2-1",
    //               component: () =>
    //                 import("@/views/nested/menu1/menu1-2/menu1-2-1"),
    //               name: "Menu1-2-1",
    //               meta: { title: "Menu1-2-1" },
    //             },
    //             {
    //               path: "menu1-2-2",
    //               component: () =>
    //                 import("@/views/nested/menu1/menu1-2/menu1-2-2"),
    //               name: "Menu1-2-2",
    //               meta: { title: "Menu1-2-2" },
    //             },
    //           ],
    //         },
    //         {
    //           path: "menu1-3",
    //           component: () => import("@/views/nested/menu1/menu1-3"),
    //           name: "Menu1-3",
    //           meta: { title: "Menu1-3" },
    //         },
    //       ],
    //     },
    //     {
    //       path: "menu2",
    //       component: () => import("@/views/nested/menu2/index"),
    //       meta: { title: "menu2" },
    //     },
    //   ],
    // },

    // 404 page must be placed at the end !!!
    { path: "*", redirect: "/404", hidden: true },
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
    // {
    //   path: '/system/user-auth',
    //   component: Layout,
    //   hidden: true,
    //   permissions: ['system:user:edit'],
    //   children: [
    //     {
    //       path: 'role/:userId(\\d+)',
    //       component: () => import('@/views/system/user/authRole'),
    //       name: 'AuthRole',
    //       meta: { title: '分配角色', activeMenu: '/system/user' }
    //     }
    //   ]
    // },
    // {
    //   path: '/system/role-auth',
    //   component: Layout,
    //   hidden: true,
    //   permissions: ['system:role:edit'],
    //   children: [
    //     {
    //       path: 'user/:roleId(\\d+)',
    //       component: () => import('@/views/system/role/authUser'),
    //       name: 'AuthUser',
    //       meta: { title: '分配用户', activeMenu: '/system/role' }
    //     }
    //   ]
    // },
    // {
    //   path: '/system/dict-data',
    //   component: Layout,
    //   hidden: true,
    //   permissions: ['system:dict:list'],
    //   children: [
    //     {
    //       path: 'index/:dictId(\\d+)',
    //       component: () => import('@/views/system/dict/data'),
    //       name: 'Data',
    //       meta: { title: '字典数据', activeMenu: '/system/dict' }
    //     }
    //   ]
    // },
    // {
    //   path: '/monitor/job-log',
    //   component: Layout,
    //   hidden: true,
    //   permissions: ['monitor:job:list'],
    //   children: [
    //     {
    //       path: 'index/:jobId(\\d+)',
    //       component: () => import('@/views/monitor/job/log'),
    //       name: 'JobLog',
    //       meta: { title: '调度日志', activeMenu: '/monitor/job' }
    //     }
    //   ]
    // },
    // {
    //   path: '/tool/gen-edit',
    //   component: Layout,
    //   hidden: true,
    //   permissions: ['tool:gen:edit'],
    //   children: [
    //     {
    //       path: 'index/:tableId(\\d+)',
    //       component: () => import('@/views/tool/gen/editTable'),
    //       name: 'GenEdit',
    //       meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
    //     }
    //   ]
    // }
];

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch((error) => error);
};

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes,
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;