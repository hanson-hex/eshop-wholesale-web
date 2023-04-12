import { loginByUsername, logout, getMenu, getInfo, getStatus } from '@/api/user'
// import { getStatus } from '@/api/user'
import { getToken, setToken, removeToken, getId, setId, removeId } from '@/utils/auth'
import { resetRouter } from '@/router'
import { encryption } from '@/utils/index'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { Message, Alert } from 'element-ui';

const getDefaultState = () => {
  return {
    token: getToken(),
    id: getId(),
    // access_token: '',
    name: '',
    avatar: '',
    user_info: {},
    // permissions: ['system:config:edit'],
    // permissions: ['system:config:add'],
    // permissions: ['system:config:add', 'system:config:edit'],
    permissions: ['*:*:*'],
    roles: []
    // roles: 'doctor'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_ID: (state, id) => {
    state.id = id
    setId(id)
  },
  SET_INFO: (state, info) => {
    state.user_info = info
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  setTokenNew({ commit }, access_token) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', access_token)
      resolve()
    })
  },
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const user = encryption({ data: userInfo, key: '8vkv0#e^D@mjv%VS', param: ['password'] })
      // console.log(user)
      loginByUsername(user.username, user.password, user.code, user.randomStr).then(data => {
        const { access_token, user_info } = data
        // console.log(user_info)
        commit('SET_TOKEN', access_token)
        // commit('SET_NAME', user_info.username)
        // commit('SET_ID', user_info.uid)
        // commit('SET_INFO', user_info)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMenus({ commit }, obj) {
    return new Promise((resolve, reject) => {
      const { id, type } = obj
      getMenu(id).then(res => {
        console.log(res)
        // const { access_token, user_info } = data
        // console.log(user_info)
        // commit('SET_TOKEN', access_token)
        // commit('SET_NAME', user_info.username)
        // commit('SET_INFO', user_info)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getStatus({ commit }, obj) {
    return new Promise((resolve, reject) => {
      // const { id, type } = obj
      getStatus().then(res => {
        const { code, data, msg } = res
        const { status } = data
        if (code == 0) {
          if (status == null) {
            this.$router.push({ path: '/mymerchantsettlementb' })
            return
          }
          if (status == 0) {
            // console.log(status)
            Message.info('资质正在审核中，请耐心等待')
            router.push({ path: '/mymerchantsettlementb' })
            reject(null)
            return
          }
          if (status == 1) {
            Alert('您的资质审核失败，请重新提交', '审核结果', {
              confirmButtonText: '确定',
              callback: () => {
                router.push({ path: '/mymerchantsettlementb' })
              }
            });
            reject(null)
            return
          }
          if (status == 2) {
            resolve()
            router.push({ path: '/' })
            return
          }
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.id).then(res => {
        if (res.code == 0) {
          // console.log('info', res)
          const { permissions, roles, sysUser } = res.data
          // const data = {
          //   roles: ['admin'],
          //   introduction: 'I am a super administrator',
          //   avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          //   name: 'Super Admin'
          // }

          // if (!data) {
          //   reject('Verification failed, please Login again.')
          // }

          // const { roles, name, avatar } = data

          // // roles must be a non-empty array
          // if (!roles || roles.length <= 0) {
          //   reject('getInfo: roles must be a non-null array!')
          // }

          commit('SET_ROLES', roles.length == 0 ? ['a'] : roles)
          // commit('SET_ROLES', ['admin', 'user'])
          commit('SET_NAME', sysUser.username)
          // let pp = { "cbmarket_goods_add": true, "base_sys_clinic_get": true, "base_sys_company_up": true, "cbmarket_goods_up": true, "sys_dept_del": true, "sys_role_import_export": true, "sys_post_get": true, "sys_post_import_export": true, "goodsPricing_fix_btn": true, "sys_user_edit": true, "sys_file_del": true, "sys_menu_del": true, "sys_role_edit": true, "base_sys_supplier_add": true, "invoice_output_check": true, "clinicProcurement_order_back": true, "sys_token_del": true, "sys_dept_add": true, "sys_role_del": true, "sys_dict_del": true, "sys_user_del": true, "sys_menu_add": true, "sys_log_import_export": true, "sys_client_add": true, "stock_order_close": true, "stock_form_detail": true, "sys_dept_edit": true, "market_commodity_up": true, "stock_order_put": true, "clinicProcurement_order_put": true, "sys_file_edit": true, "base_sys_supplier_edit": true, "sys_menu_edit": true, "invoice_income_check": true, "cbmarket_goods_update": true, "sys_user_add": true, "market_commodity_detail": true, "cbmarket_price_editor": true, "invoice_annul_edit": true, "base_sys_supplier_up": true, "sys_log_del": true, "sys_client_del": true, "sys_client_edit": true, "stock_form_buy": true, "base_sys_clinic_edit": true, "market_order_detail": true, "base_sys_clinic_del": true, "clinicProcurement_form_detail": true, "sys_dict_edit": true, "cbmarket_goods_detail": true, "market_sys_inventory_safety": true, "base_sys_company_edit": true, "sys_post_add": true, "market_sys_inventory_export": true, "gen_form_add": true, "gen_form_edit": true, "stock_order_card": true, "market_sys_drpList_export": true, "clinicProcurement_order_card": true, "sys_dict_add": true, "sys_role_add": true, "sys_file_add": true, "clinicProcurement_order_colse": true, "market_commodity_compant": true, "base_sys_company_add": true, "invoice_order_card": true, "clinicProcurement_form_add": true, "clinicProcurement_order_out": true, "stock_order_detail": true, "market_order_look": true, "market_sys_inventory_edit": true, "sys_post_del": true, "market_sys_inventory_import": true, "sys_role_perm": true, "clinicProcurement_form_buy": true, "base_sys_clinic_add": true, "clinicProcurement_order_detail": true, "sys_user_import_export": true, "market_order_out": true, "invoice_order_upload": true, "gen_form_del": true, "sys_post_edit": true, "market_order_fastmall": true, "stock_form_add": true }
          // commit('SET_PERMISSIONS', pp)
          let newPro = {}
          for (let i = 0; i < permissions.length; i++) {
            // const element = array[i];
            newPro[permissions[i]] = true
          }
          // commit('SET_PERMISSIONS', ['sys_menu_del', 'sys_menu_edit', 'sys_menu_add'])
          // commit('SET_PERMISSIONS', permissions)
          commit('SET_PERMISSIONS', newPro)
          commit('SET_INFO', sysUser)
          // commit('SET_NAME', name)
          // commit('SET_AVATAR', avatar)
          // console.log(data, 'data')
          // resolve(data)
          resolve()
        } else {
          commit('SET_TOKEN', '')
          router.push({ path: '/' })
          Message.error(res.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      removeToken() // must remove  token  first
      removeId()
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeId()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

