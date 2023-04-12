import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, removeToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// no redirect whitelist
const whiteList = ["/login", "/register", "/mymerchantsettlementb"];

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start();

    // set page title
    document.title = getPageTitle(to.meta.title);
    next();
    // console.log(to) // query
    // if (to.path === "/login") {
    //     removeToken();
    // }
    // determine whether the user has logged in
    const hasToken = getToken();
    // console.log('hasToken', hasToken)
    // if (hasToken) {
    //   if (to.path === '/login') {
    //     // if is logged in, redirect to the home page
    //     next({ path: '/' })
    //     NProgress.done()
    //   } else {
    //     // determine whether the user has obtained his permission roles through getInfo
    //     const hasRoles = store.getters.roles && store.getters.roles.length > 0
    //     // console.log('store.getters.roles', store.getters.roles)
    //     if (hasRoles) {
    //       next()
    //     } else {
    //       store.dispatch('user/getInfo').then(() => {
    //         NProgress.done()
    //         store.dispatch('user/getStatus').then(() => {
    //           store.dispatch('GenerateRoutesb', { type: true, id: -1 }).then(accessRoutes => {
    //             // 根据roles权限生成可访问的路由表
    //             // console.log(accessRoutes)
    //             router.addRoutes(accessRoutes) // 动态添加可访问路由表
    //             // console.log('Routes', router.getRoutes())
    //             next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    //           })
    //         }).catch(() => {
    //           next(`/mymerchantsettlementb`)
    //           NProgress.done()
    //         })
    //       }).catch(err => {
    //         // console.log(err)
    //         Message.error(err || 'Has Error')
    //         store.dispatch('user/resetToken').then(res => {
    //           // next(`/login?redirect=${to.path}`)
    //           next(`/login`)
    //           NProgress.done()
    //         })
    //       })
    //       // try {
    //       //   // get user info
    //       //   // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    //       //   const { roles } = await store.dispatch('user/getInfo')

    //       //   // generate accessible routes map based on roles
    //       //   // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

    //       //   // dynamically add accessible routes
    //       //   // router.addRoutes([])
    //       //   // console.log(store, roles)
    //       //   store.dispatch('GenerateRoutes').then(accessRoutes => {
    //       //     // 根据roles权限生成可访问的路由表
    //       //     router.addRoutes(accessRoutes) // 动态添加可访问路由表
    //       //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    //       //   })

    //       //   // hack method to ensure that addRoutes is complete
    //       //   // set the replace: true, so the navigation will not leave a history record
    //       //   // next({ ...to, replace: true })
    //       // } catch (error) {
    //       //   // remove token and go to login page to re-login
    //       //   await store.dispatch('user/resetToken')
    //       //   Message.error(error || 'Has Error')
    //       //   next(`/login?redirect=${to.path}`)
    //       //   NProgress.done()
    //       // }
    //     }
    //   }
    // } else {
    //   /* has no token*/
    //   // const hasRoles = store.getters.roles && store.getters.roles.length > 0
    //   // if (hasRoles) {
    //   //   next()
    //   // } else {
    //   //   const { roles } = await store.dispatch('user/getInfo')
    //   //   // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
    //   //   // router.addRoutes([])
    //   //   store.dispatch('GenerateRoutes').then(accessRoutes => {
    //   //     // 根据roles权限生成可访问的路由表
    //   //     // console.log('addrouter', accessRoutes)
    //   //     router.addRoutes(accessRoutes) // 动态添加可访问路由表
    //   //     // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    //   //     next() // hack方法 确保addRoutes已完成
    //   //   })

    //   //   // next()
    //   // }

    //   if (whiteList.indexOf(to.path) !== -1) {
    //     // in the free login whitelist, go directly

    //     // generate accessible routes map based on roles

    //     // dynamically add accessible routes
    //     next()
    //   } else {
    //   //   // other pages that do not have permission to access are redirected to the login page.
    //     // next(`/login?redirect=${to.path}`)
    //     next(`/login`)
    //     NProgress.done()
    //   }
    // }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});