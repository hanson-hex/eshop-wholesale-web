// import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
// import { getRouters } from '@/api/menu'
import { getRouteList } from '@/api/route'
import { getMenu } from '@/api/user'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'
import { deepClone } from "@/utils/index"
import { isURL, validatenull } from '@/utils/validate'
import webiste from '@/utils/website'
import { Message } from 'element-ui';
// const Routes = () => {
//   return {
//     demo: () => import('@/views/demo/index.vue')
//   }
// }

function addPath(ele, first) {
    const menu = webiste.menu
    const propsConfig = menu.props
    const propsDefault = {
        label: propsConfig.label || 'name',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    }
    const icon = ele[propsDefault.icon]
    ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0
    if (!isChild) ele[propsDefault.children] = []
    if (!isChild && first && !isURL(ele[propsDefault.path])) {
        ele[propsDefault.path] = ele[propsDefault.path] + '/index'
    } else {
        ele[propsDefault.children].forEach(child => {
            addPath(child)
        })
    }
}

const ResetMenu = (d, index) => {
    let new_routes = []
    for (let i = 0; i < d.length; i++) {
        // console.log(d[i].rules)
        const { name, path, icon, children, showState } = d[i]
        let d_li = {
            name: path.substr(1).replaceAll('/', '_'),
            path: index == 0 ? path : path.substr(1),
            component: index == 0 ? 'Layout' : path.substr(1).replaceAll('-', '/'),
            hidden: showState == '1',
            meta: { title: name, icon }
        }
        if (children && children.length > 0) {
            d_li.children = ResetMenu(children, (index + 1))
            d_li.redirect = d_li.children[0].path
        }
        new_routes.push(d_li)
            // if (rules && rules.length > 0) {
            //   if (rules.includes(my_rule)) {
            //     // str = str.replaceAll('apples','oranges');
            //     let d_li = { name, path, hidden, component, meta }
            //     if (children && children.length > 0) {
            //       d_li.children = CheckRoles(children, my_rule)
            //     }
            //     new_routes.push(d_li)
            //   }
            // }
    }
    return new_routes
}

const CheckRoles = (d, my_rule) => {
    let new_routes = []
    for (let i = 0; i < d.length; i++) {
        // console.log(d[i].rules)
        const { rules, name, path, hidden, component, meta, children } = d[i]
        if (rules && rules.length > 0) {
            if (rules.includes(my_rule)) {
                let d_li = { name, path, hidden, component, meta }
                if (children && children.length > 0) {
                    d_li.children = CheckRoles(children, my_rule)
                }
                new_routes.push(d_li)
            }
        }
    }
    return new_routes
}

const permission = {
    state: {
        routes: [],
        addRoutes: [],
        defaultRoutes: [],
        topbarRouters: [],
        sidebarRouters: []
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes
            state.routes = constantRoutes.concat(routes)
        },
        SET_DEFAULT_ROUTES: (state, routes) => {
            state.defaultRoutes = constantRoutes.concat(routes)
        },
        SET_TOPBAR_ROUTES: (state, routes) => {
            state.topbarRouters = routes
        },
        SET_SIDEBAR_ROUTERS: (state, routes) => {
            state.sidebarRouters = routes
        },
    },
    actions: {
        // 生成路由
        GenerateRoutesb({ commit, dispatch, state }, obj) {
            const { id, type } = obj
            return new Promise(resolve => {
                getMenu(id).then(res => {
                    // res.data
                    console.log(res.data)
                    let rouertObj = {
                            icon: null,
                            id: "1629443280946235873",
                            keepAlive: "1",
                            label: "售后服务",
                            name: "售后服务",
                            parentId: "-1",
                            path: "/serve",
                            permission: null,
                            showState: null,
                            sortOrder: 16,
                            type: "0",
                            weight: 16,
                            children: [{
                                icon: "example",
                                id: "1629454490771456632",
                                keepAlive: "0",
                                label: "售后服务",
                                name: "售后服务",
                                parentId: "1629443280946235873",
                                path: "/sellingServe/index",
                                permission: null,
                                showState: null,
                                sortOrder: 1,
                                type: "0",
                                weight: 1
                            }]
                        }
                        // res.data.push(rouertObj)
                    if (res.data) {
                        let menu = ResetMenu(deepClone(res.data), 0)
                            // if (menu) {
                            //   menu.forEach(ele => {
                            //     addPath(ele)
                            //   })
                            //   let type = obj.type
                            //   // commit('SET_MENU', { type, menu })
                            // }
                            // console.log(menu)
                            // resolve(menu)
                            // resolve(res.data)
                            // let d = deepClone(res.data)
                            // let new_d = CheckRoles(d, routes[0])
                            // console.log(new_d)
                            // const sdata = JSON.parse(JSON.stringify(routers))
                        const sdata = deepClone(menu) || [] // routers res.data
                            // const rdata = JSON.parse(JSON.stringify(routers))
                        const rdata = deepClone(menu) || []
                            // const sidebarRoutes = filterAsyncRouter(routers)
                        const sidebarRoutes = filterAsyncRouter(sdata)
                        const rewriteRoutes = filterAsyncRouter(rdata, false, true)
                            // const rewriteRoutes = filterAsyncRouter(rdata, false, true)
                            // const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
                            // rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
                            // router.addRoutes(asyncRoutes);
                            // console.log(sidebarRoutes)
                        commit('SET_ROUTES', rewriteRoutes)
                        commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
                        commit('SET_DEFAULT_ROUTES', sidebarRoutes)
                        commit('SET_TOPBAR_ROUTES', sidebarRoutes)
                        resolve(rewriteRoutes)
                    } else {
                        const sidebarRoutes = filterAsyncRouter([])
                        const rewriteRoutes = filterAsyncRouter([], false, true)
                        commit('SET_ROUTES', rewriteRoutes)
                        commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
                        commit('SET_DEFAULT_ROUTES', sidebarRoutes)
                        commit('SET_TOPBAR_ROUTES', sidebarRoutes)
                        resolve(rewriteRoutes)
                        Message.error('用户未设置任何权限,请联系管理员')
                            // resolve([])
                            // dispatch('user/logout').then(res => {
                            //   router.push({ path: '/login' })
                            // })
                    }
                })
            })
        },
        // 生成路由
        GenerateRoutes({ commit, dispatch, state }) {
            return new Promise(resolve => {
                let routes = ['compamy']
                    // 向后端请求路由数据
                let routers = [
                        // {
                        //   "name": "Demo",
                        //   "path": "/demo",
                        //   "hidden": false,
                        //   // "redirect": "noRedirect",
                        //   "component": "Layout",
                        //   "alwaysShow": true,
                        //   "meta": {
                        //     "title": "测试栏目",
                        //     "icon": "system",
                        //     "noCache": false,
                        //     "link": null
                        //   },
                        //   "children": [
                        //     {
                        //       "name": "Demoa",
                        //       "path": "demoa",
                        //       "hidden": false,
                        //       component: "demo/index.vue",
                        //       "meta": {
                        //         "title": "测试子菜单",
                        //         "icon": "user",
                        //         "noCache": false,
                        //         "link": null
                        //       }
                        //     }
                        //   ]
                        // }
                        // {
                        //   path: '/nested',
                        //   component: "Layout",
                        //   redirect: '/nested/menu1',
                        //   name: 'Nested',
                        //   meta: {
                        //     title: 'Nested',
                        //     icon: 'nested'
                        //   },
                        //   children: [
                        //     {
                        //       path: 'menu1',
                        //       component: 'demo', // Parent router-view
                        //       name: 'Menu1',
                        //       meta: { title: 'Menu1' }
                        //     }
                        //   ]
                        // }
                    ]
                    // getRouters
                    // console.log('state', state)
                getRouteList().then(res => {
                    // res.data
                    // console.log(res.data)
                    // let d = deepClone(res.data)
                    // let new_d = CheckRoles(d, routes[0])
                    // console.log(new_d)
                    // const sdata = JSON.parse(JSON.stringify(routers))
                    const sdata = deepClone(res.data) // routers res.data
                        // const rdata = JSON.parse(JSON.stringify(routers))
                    const rdata = deepClone(res.data)
                        // const sidebarRoutes = filterAsyncRouter(routers)
                        // console.log(sidebarRoutes)
                    const sidebarRoutes = filterAsyncRouter(sdata)
                    const rewriteRoutes = filterAsyncRouter(rdata, false, true)
                        // const rewriteRoutes = filterAsyncRouter(rdata, false, true)
                        // const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
                        // rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
                        // router.addRoutes(asyncRoutes);
                    commit('SET_ROUTES', rewriteRoutes)
                    commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
                    commit('SET_DEFAULT_ROUTES', sidebarRoutes)
                    commit('SET_TOPBAR_ROUTES', sidebarRoutes)
                    resolve(rewriteRoutes)
                })
            })
        }
    }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
    return asyncRouterMap.filter(route => {
        // console.log('route', route)
        if (type && route.children) {
            route.children = filterChildren(route.children)
        }
        if (route.component) {
            // Layout ParentView 组件特殊处理
            if (route.component === 'Layout') {
                route.component = Layout
            } else if (route.component === 'ParentView') {
                route.component = ParentView
            } else if (route.component === 'InnerLink') {
                route.component = InnerLink
            } else {
                // console.log('component', route.component)
                route.component = loadView(route.component)
                    // console.log(Routes()['demo'])
                    // let routes = Routes();
                    // route.component = routes[route.component]
                    // Routes
            }
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, route, type)
        } else {
            delete route['children']
            delete route['redirect']
        }
        return true
    })
}

function filterChildren(childrenMap, lastRouter = false) {
    var children = []
    childrenMap.forEach((el, index) => {
        if (el.children && el.children.length) {
            if (el.component === 'ParentView' && !lastRouter) {
                el.children.forEach(c => {
                    c.path = el.path + '/' + c.path
                    if (c.children && c.children.length) {
                        children = children.concat(filterChildren(c.children, c))
                        return
                    }
                    children.push(c)
                })
                return
            }
        }
        if (lastRouter) {
            el.path = lastRouter.path + '/' + el.path
        }
        children = children.concat(el)
    })
    return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
    const res = []
    routes.forEach(route => {
        if (route.permissions) {
            if (auth.hasPermiOr(route.permissions)) {
                res.push(route)
            }
        } else if (route.roles) {
            if (auth.hasRoleOr(route.roles)) {
                res.push(route)
            }
        }
    })
    return res
}

export const loadView = (view) => {
    // console.log(`@/views/${view}.vue`)
    // console.log('113', view, process.env.NODE_ENV)
    return (resolve) => require([`@/views/${view}.vue`], resolve)
        // if (process.env.NODE_ENV === 'development') {
        //   // return (resolve) => require([`@/views/${view}`], resolve)
        //   return (resolve) => require([`@/views/${view}.vue`], resolve)
        //   // return () => require(`@/views/${view}`)
        //   // return () => import(`@/views/${view}`)
        // } else {
        //   // 使用 import 实现生产环境的路由懒加载
        //   // return () => import(`@/views/${view}`)
        //   return () => require(`@/views/${view}`)
        // }
}

export default permission