// import { asyncRoutes, constantRoutes } from '@/router'
import { constantRoutes } from '@/router'
// import { getRouteList } from '@/api/route'
import Layout from '@/layout'
import index from '@/views/nested/menu2/index'

function setRoutes(item) {
  item.forEach(el => {
    el.component = index
    if (el.children && el.children.length > 0) {
      el.component = index
    }
  })
}
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      var routes = []
      // getRouteList().then(res => {
      // routes = [{
      //   path: '/nested',
      //   // component: Layout,
      //   redirect: '/nested/menu1',
      //   name: 'Nested',
      //   meta: {
      //     title: 'Nested',
      //     icon: 'nested'
      //   },
      //   children: [
      //     {
      //       path: 'menu1',
      //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
      //       name: 'Menu1',
      //       meta: { title: 'Menu1' },
      //       children: [
      //         {
      //           path: 'menu1-1',
      //           component: () => import('@/views/nested/menu1/menu1-1'),
      //           name: 'Menu1-1',
      //           meta: { title: 'Menu1-1' }
      //         },
      //         {
      //           path: 'menu1-2',
      //           component: () => import('@/views/nested/menu1/menu1-2'),
      //           name: 'Menu1-2',
      //           meta: { title: 'Menu1-2' },
      //           children: [
      //             {
      //               path: 'menu1-2-1',
      //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
      //               name: 'Menu1-2-1',
      //               meta: { title: 'Menu1-2-1' }
      //             },
      //             {
      //               path: 'menu1-2-2',
      //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
      //               name: 'Menu1-2-2',
      //               meta: { title: 'Menu1-2-2' }
      //             }
      //           ]
      //         },
      //         {
      //           path: 'menu1-3',
      //           component: () => import('@/views/nested/menu1/menu1-3'),
      //           name: 'Menu1-3',
      //           meta: { title: 'Menu1-3' }
      //         }
      //       ]
      //     },
      //     {
      //       path: 'menu2',
      //       component: () => import('@/views/nested/menu2/index'),
      //       meta: { title: 'menu2' }
      //     }
      //   ]
      // }

      // ]
      // routes.forEach(item => {
      //   item['component'] = Layout
      //   // this.$set(item, 'component', Layout)
      //   if (item.children && item.children.length > 0) {
      //     setRoutes(item.children)
      //   }
      // })
      routes = []
      console.log(routes, 'getRouteList ')
      commit('SET_ROUTES', routes)
      resolve(routes)
    })

    // let accessedRoutes
    // if (roles.includes('admin')) {
    //   accessedRoutes = asyncRoutes || []
    // } else {
    //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    // }
    // commit('SET_ROUTES', accessedRoutes)
    // resolve(accessedRoutes)
    // })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
