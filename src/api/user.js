import request from '@/utils/request'
import qs from 'qs'
import website from "@/utils/website";

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

const scope = 'server'
export const loginByUsername = (username, password, code, randomStr) => {
  const grant_type = 'password'
  let dataObj = qs.stringify({ 'username': username, 'password': password })

  let basicAuth = 'Basic ' + window.btoa(website.formLoginClient)

  return request({
    url: '/auth/oauth2/token',
    headers: {
      isLogin: true,
      Authorization: basicAuth
    },
    method: 'post',
    params: { randomStr, code, grant_type, scope },
    data: dataObj
  })
}

export const getStatus = () => {
  return request({
    url: '/shop/shop/status',
    method: 'get'
  })
}

export function getMenu(id) {
  return request({
    url: '/admin/menu',
    params: { parentId: id },
    method: 'get'
  })
}

export function getInfo(userId) {
  return request({
    // url: `member/manage/${userId}`,
    // url: 'admin/user/info',
    url: '/member/info/detailed',
    method: 'get',
    params: { }
  })
}

// export function getInfoa(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// export function getUserInfo(data) {
//   return request({
//     url: ``,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     method: "get",
//     data,
//   });
// }

export function imgUpload(data) {
  return request({
    url: `/shop/shopcertify/upload`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "post",
    data,
  });
}

// 用户详情查询
export function getUserInfo(data) {
  return request({
    url: "/admin/user/" + data,
    method: "get",
  })
}

// 修改密码
export function editPassword(data) {
  return request({
    // url: "/admin/user/modify/password",
    url: '/member/manage/modify/password',
    method: "put",
    data,
  })
}

// 修改密码
export function getRolesList(data) {
  return request({
    url: "/admin/role/shop/list",
    // url: '/member/manage/modify/password',
    method: "get",
    params: data,
  })
}
